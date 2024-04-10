package com.api.api.report;

public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createReport(@RequestBody ReportDAO report){

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
}
