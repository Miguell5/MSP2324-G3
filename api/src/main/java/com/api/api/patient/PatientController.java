package com.api.api.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/patient")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createPatient(@RequestBody PatientDAO patient){
        PatientDAO patientDAO = patientService.createPatient(patient);

        return ResponseEntity.ok("Patient: " + patientDAO.getEmail() + " has been created.");
    }

    @GetMapping(path = "/auth")
    public ResponseEntity<String> authPatient(PatientDAO patient){

        return null;
    }

    @PutMapping(path = "/{email}/update", consumes = "application/json")
    public ResponseEntity<String> updatePatient(@RequestBody PatientDAO patient){

        PatientDAO patientDAO = patientService.updatePatient(patient);

        return ResponseEntity.ok("Patient: " + patientDAO.getEmail() + " has been updated.");
    }

    @DeleteMapping(path = "/{email}/delete")
    public ResponseEntity<String> deletePatient(@PathVariable String email){

        String patientEmail = patientService.deletePatient(email);

        return ResponseEntity.ok("User: " + patientEmail + " has been deleted.");
    }

    @GetMapping(path = "/{email}/get", produces = "application/json")
    public ResponseEntity<PatientDAO> getPatient(@PathVariable String email){

        PatientDAO patientDAO = patientService.getPatient(email);

        return ResponseEntity.ok(patientDAO);
    }

}
