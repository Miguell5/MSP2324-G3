package com.api.api.report;

import com.api.api.token.TokenJWT;
import com.api.api.token.TokenManager;
import com.api.api.utils.roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "/report")
public class ReportController {

    private static final String DOCTOR_ROLE = roles.DOCTOR.getValue();
    private static final String PATIENT_ROLE = roles.PATIENT.getValue();

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createReport(@RequestHeader("Authorization") String token,
                                               @RequestBody ReportDAO report){
        if(!report.isValidToCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null || !tokenJWT.getRole().equals(DOCTOR_ROLE))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        report.setDoctor(tokenJWT.getEmail());
        ReportDAO reportDAO = reportService.createReport(report);

        return ResponseEntity.ok("Report made by " + reportDAO.getDoctor() + " for " + reportDAO.getPatient()
                + " for their " + reportDAO.getType() + " has been created.");
    }

    @GetMapping(path = "/{id}/get", consumes = "application/json")
    public ResponseEntity<ReportDAO> getReport(@RequestHeader("Authorization") String token,
                                               @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        ReportDAO reportDAO = reportService.getReport(id, tokenJWT.getEmail());

        return ResponseEntity.ok(reportDAO);
    }

    @PutMapping(path = "/{id}/update", consumes = "application/json")
    public ResponseEntity<String> updateReport(@RequestHeader("Authorization") String token,
                                               @RequestBody ReportDAO report,
                                               @PathVariable String id){

        if(!report.isValidToUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null || !tokenJWT.getRole().equals(DOCTOR_ROLE))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        report.setId(id);
        report.setDoctor(tokenJWT.getEmail());

        ReportDAO reportDAO = reportService.updateReport(report);

        return ResponseEntity.ok("Report with ID " + reportDAO.getId() + " has been updated.");
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<String> deleteReport(@RequestHeader("Authorization") String token,
                                               @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null || !tokenJWT.getRole().equals(DOCTOR_ROLE))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        reportService.deleteReport(id, tokenJWT.getEmail());

        return ResponseEntity.ok("Report with ID " + id + " has been deleted.");
    }

    @GetMapping(path = "/{patient}/reportsPatient", consumes = "application/json")
    public ResponseEntity<List<ReportDAO>> getAppointmentsByPatient(@RequestHeader("Authorization") String token,
                                                                    @PathVariable String patient) {

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null || (!tokenJWT.getEmail().equals(patient) && tokenJWT.getRole().equals(PATIENT_ROLE)))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        return  ResponseEntity.ok(reportService.getReportsByPatient(patient));
    }
}


