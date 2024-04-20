package com.api.api.appointment;


import com.api.api.token.TokenJWT;
import com.api.api.token.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createAppointment(@RequestHeader("Authorization") String token,
                                                    @RequestBody AppointmentDAO appointment){

        if(!appointment.isValidToCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");


        appointment.setPatient(tokenJWT.getEmail());
        AppointmentDAO appointmentDAO = appointmentService.createAppointment(appointment);

        return ResponseEntity.ok("Appointment booked by " + appointmentDAO.getPatient() + " for Doctor " + appointmentDAO.getDoctor()
                + " on " + appointmentDAO.getDate() + " has been created.");
    }

    @GetMapping(path = "/{id}/get", consumes = "application/json")
    public ResponseEntity<AppointmentDAO> getAppointment(@RequestHeader("Authorization") String token,
                                                         @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        AppointmentDAO appointmentDAO = appointmentService.getAppointment(id, tokenJWT.getEmail());

        return ResponseEntity.ok(appointmentDAO);
    }

    @PutMapping(path = "/{id}/update", consumes = "application/json")
    public ResponseEntity<String> updateAppointment(@RequestHeader("Authorization") String token,
                                                    @RequestBody AppointmentDAO appointment,
                                                    @PathVariable String id){

        if(!appointment.isValidToUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        appointment.setId(id);
        appointment.setPatient(tokenJWT.getEmail());
        AppointmentDAO appointmentDAO = appointmentService.updateAppointment(appointment);

        return ResponseEntity.ok("Appointment with ID " + appointmentDAO.getId() + " has been updated.");
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<String> deleteAppointment(@RequestHeader("Authorization") String token,
                                                    @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        String appointmentID = appointmentService.deleteAppointment(id, tokenJWT.getEmail());

        return ResponseEntity.ok("Appointment with ID " + appointmentID + " has been deleted.");
    }

    @PutMapping(path = "/{id}/checkin")
    public ResponseEntity<String> checkin(@RequestHeader("Authorization") String token,
                                          @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        appointmentService.checkin(id, tokenJWT.getEmail());

        return ResponseEntity.ok("Patient that arrived for appointment with ID " + id + " has checked-in.");
    }

    @GetMapping(path = "/{patient}/appointmentsPatient", consumes = "application/json")
    public ResponseEntity<List<AppointmentDAO>> getAppointmentsByPatient(@RequestHeader("Authorization") String token,
                                                                         @PathVariable String patient) {

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null || !tokenJWT.getEmail().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        return  ResponseEntity.ok(appointmentService.getAppointmentsByPatient(patient));
    }
}
