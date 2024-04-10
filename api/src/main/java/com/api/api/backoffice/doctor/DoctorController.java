package com.api.api.backoffice.doctor;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createDoctor(@RequestBody DoctorDAO doctor){
        DoctorDAO doctorDAO = doctorService.createDoctor(doctor);

        return ResponseEntity.ok("Doctor account: " + doctorDAO.getEmail() + " has been created.");
    }

    @GetMapping(path = "/auth")
    public ResponseEntity<String> authPatient(){

        return null;
    }

    @PutMapping(path = "/update", consumes = "application/json")
    public ResponseEntity<String> updateDoctor(@RequestBody DoctorDAO doctor){

        DoctorDAO doctorDAO = doctorService.updateDoctor(doctor);

        return ResponseEntity.ok("Doctor account: " + doctorDAO.getEmail() + " has been updated.");
    }

    @DeleteMapping(path = "/{uuid}/delete")
    public ResponseEntity<String> deleteDoctor(@PathVariable String uuid){

        String doctorEmail = doctorService.deleteDoctor(uuid);

        return ResponseEntity.ok("Doctor account: " + doctorEmail + " has been deleted.");
    }

    @GetMapping(path = "/{uuid}/get", produces = "application/json")
    public ResponseEntity<DoctorDAO> DoctorDAO(@PathVariable String uuid){

        DoctorDAO doctorDAO  = doctorService.getDoctor(uuid);

        return ResponseEntity.ok(doctorDAO);
    }
}
