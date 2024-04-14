package com.api.api.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/report")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createReport(@RequestBody ReportDAO report){

        ReportDAO reportDAO = reportService.createReport(report);

        return ResponseEntity.ok("Report made by " + reportDAO.getDoctor() + " for " + reportDAO.getPatient()
                + " for their " + reportDAO.getType() + " has been created.");
    }

    @GetMapping(path = "/{id}/get", consumes = "application/json")
    public ResponseEntity<ReportDAO> getReport(@RequestBody String id){

        ReportDAO reportDAO = reportService.getReport(id);

        return ResponseEntity.ok(reportDAO);
    }

    @PutMapping(path = "/{id}/update", consumes = "application/json")
    public ResponseEntity<String> updateReport(@RequestBody ReportDAO report){

        ReportDAO reportDAO = reportService.updateReport(report);

        return ResponseEntity.ok("Report with ID " + reportDAO.getId() + " has been updated.");
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<String> deleteReport(@PathVariable String id){

        reportService.deleteReport(id);

        return ResponseEntity.ok("Report with ID " + id + " has been deleted.");
    }

    @GetMapping(path = "/{id}/reportsPatient", consumes = "application/json")
    public ResponseEntity<List<ReportDAO>> getAppointmentsByPatient(@PathVariable String id) {

        return  ResponseEntity.ok(reportService.getReportsByPatient(id));
    }
}


