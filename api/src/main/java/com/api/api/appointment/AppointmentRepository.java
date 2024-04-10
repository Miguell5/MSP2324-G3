package com.api.api.Appointment;

import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository {

    AppointmentDAO createAppointment(AppointmentDAO appointmentDAO);
    AppointmentDAO updateAppointment(AppointmentDAO appointmentDAO);
    String deleteAppointment(String id);
    AppointmentDAO getAppointment(String id);
}
