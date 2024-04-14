package com.api.api.appointment;

import com.api.api.exam.ExamDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> createAppointment(@RequestBody AppointmentDAO appointment){

        AppointmentDAO appointmentDAO = appointmentService.createAppointment(appointment);

        return ResponseEntity.ok("Appointment booked by " + appointmentDAO.getPatient() + " for Doctor " + appointmentDAO.getDoctor()
                + " on " + appointmentDAO.getDate() + " has been created.");
    }

    @GetMapping(path = "/{id}/get", consumes = "application/json")
    public ResponseEntity<AppointmentDAO> getAppointment(@RequestBody String id){

        AppointmentDAO appointmentDAO = appointmentService.getAppointment(id);

        return ResponseEntity.ok(appointmentDAO);
    }

    @PutMapping(path = "/{id}/update", consumes = "application/json")
    public ResponseEntity<String> updateAppointment(@RequestBody AppointmentDAO appointment){

        AppointmentDAO appointmentDAO = appointmentService.updateAppointment(appointment);

        return ResponseEntity.ok("Appointment with ID " + appointmentDAO.getId() + " has been updated.");
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<String> deleteAppointment(@PathVariable String id){

        String appointmentID = appointmentService.deleteAppointment(id);

        return ResponseEntity.ok("Appointment with ID " + appointmentID + " has been deleted.");
    }

    @PutMapping(path = "/{id}/checkin")
    public ResponseEntity<String> checkin(@PathVariable String id){

        appointmentService.checkin(id);

        return ResponseEntity.ok("Patient that arrived for appointment with ID " + id + " has checked-in.");
    }

    @GetMapping(path = "/{id}/appointmentsPatient", consumes = "application/json")
    public ResponseEntity<List<AppointmentDAO>> getAppointmentsByPatient(@PathVariable String id) {

        return  ResponseEntity.ok(appointmentService.getAppointmentsByPatient(id));
    }
}
