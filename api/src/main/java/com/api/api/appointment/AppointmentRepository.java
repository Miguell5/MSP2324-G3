package com.api.api.appointment;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository {

    AppointmentDAO createAppointment(AppointmentDAO appointmentDAO);
    AppointmentDAO updateAppointment(AppointmentDAO appointmentDAO);
    String deleteAppointment(String id);
    AppointmentDAO getAppointment(String id);
    List<AppointmentDAO> appointmentsByPatient(String patient);
}
