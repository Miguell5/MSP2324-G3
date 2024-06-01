package com.api.api.patient;

import com.api.api.token.TokenJWT;
import com.api.api.token.TokenManager;
import com.api.api.utils.roles;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping(path = "/patient")
public class PatientController {

    private static final String PATIENT_ROLE = roles.PATIENT.getValue();

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createPatient(@RequestBody PatientDAO patient){

        if(!patient.isValidToCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        PatientDAO patientDAO = patientService.createPatient(patient);

        return ResponseEntity.ok("Patient: " + patientDAO.getEmail() + " has been created.");
    }

    @GetMapping(path = "/auth")
    public ResponseEntity<String> authPatient(@RequestBody PatientDAO patient){

        if(!patient.isValidAuth())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        return ResponseEntity.ok(patientService.auth(patient.getEmail(), patient.getPwd()));
    }

    @PutMapping(path = "/{email}/update", consumes = "application/json")
    public ResponseEntity<String> updatePatient(@RequestHeader("Authorization") String token,
                                                @RequestBody PatientDAO patient,
                                                @PathVariable String email){

        if(!patient.isValidToUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);
        if(tokenJWT == null  || !tokenJWT.getEmail().equals(email))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");


        PatientDAO patientDAO = patientService.updatePatient(patient);

        return ResponseEntity.ok("Patient: " + patientDAO.getEmail() + " has been updated.");
    }

    @DeleteMapping(path = "/{email}/delete")
    public ResponseEntity<String> deletePatient(@RequestHeader("Authorization") String token,
                                                @PathVariable String email){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);
        if(tokenJWT == null  || !tokenJWT.getEmail().equals(email))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        String patientEmail = patientService.deletePatient(email);

        return ResponseEntity.ok("User: " + patientEmail + " has been deleted.");
    }

    @GetMapping(path = "/{email}/get", produces = "application/json")
    public ResponseEntity<PatientDAO> getPatient(@RequestHeader("Authorization") String token,
                                                 @PathVariable String email){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);
        if(tokenJWT == null  || (!tokenJWT.getEmail().equals(email) && tokenJWT.getRole().equals(PATIENT_ROLE)))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        PatientDAO patientDAO = patientService.getPatient(email);

        return ResponseEntity.ok(patientDAO);
    }

}
