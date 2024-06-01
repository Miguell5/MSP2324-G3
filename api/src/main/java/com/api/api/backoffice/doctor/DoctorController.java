package com.api.api.backoffice.doctor;


import com.api.api.token.TokenJWT;
import com.api.api.token.TokenManager;
import com.api.api.utils.roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    private static final String DOCTOR_ROLE = roles.DOCTOR.getValue();

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createDoctor(@RequestBody DoctorDAO doctor){

        if(!doctor.isValidCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        DoctorDAO doctorDAO = doctorService.createDoctor(doctor);

        return ResponseEntity.ok("Doctor account: " + doctorDAO.getEmail() + " has been created.");
    }

    @GetMapping(path = "/auth")
    public ResponseEntity<String> authDoctor(@RequestBody DoctorDAO doctor){

        if(!doctor.isValidAuth())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        return ResponseEntity.ok(doctorService.auth(doctor.getEmail(), doctor.getPwd()));
    }

    @PutMapping(path = "/{email}/update", consumes = "application/json")
    public ResponseEntity<String> updateDoctor(@RequestHeader("Authorization") String token,
                                               @RequestBody DoctorDAO doctor,
                                               @PathVariable String email){

        if(!doctor.isValidUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);
        if(tokenJWT == null  || !tokenJWT.getEmail().equals(email))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        DoctorDAO doctorDAO = doctorService.updateDoctor(doctor);

        return ResponseEntity.ok("Doctor account: " + doctorDAO.getEmail() + " has been updated.");
    }

    @DeleteMapping(path = "/{email}/delete")
    public ResponseEntity<String> deleteDoctor(@RequestHeader("Authorization") String token,
                                               @PathVariable String email){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);
        if(tokenJWT == null  || !tokenJWT.getEmail().equals(email))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        String doctorEmail = doctorService.deleteDoctor(email);

        return ResponseEntity.ok("Doctor account: " + doctorEmail + " has been deleted.");
    }

    @GetMapping(path = "/{email}/get", produces = "application/json")
    public ResponseEntity<DoctorDAO> getDoctor(@RequestHeader("Authorization") String token,
                                               @PathVariable String email){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);
        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        DoctorDAO doctorDAO  = doctorService.getDoctor(email);

        return ResponseEntity.ok(doctorDAO);
    }
}
