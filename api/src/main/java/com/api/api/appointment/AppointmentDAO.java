package com.api.api.appointment;


import org.bson.Document;

import java.util.UUID;

public class AppointmentDAO {
    private String id;
    private String patient;
    private String doctor;
    private String date;
    private boolean checkIn;

    public AppointmentDAO(){}

    public AppointmentDAO(String patient, String doctor, String date) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.id = UUID.randomUUID().toString();
        this.checkIn = false;
    }

    public boolean isValidToCreate(){
        return this.patient != null  && this.doctor != null
            && this.date != null;
    }

    public boolean isValidToUpdate(){
        return this.date != null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatient() {
        return patient;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isCheckIn() {
        return checkIn;
    }

    public void setCheckIn(boolean checkIn) {
        this.checkIn = checkIn;
    }

    public static AppointmentDAO fromDocument(Document doc){

        AppointmentDAO appointmentDAO = new AppointmentDAO();
        appointmentDAO.setDate(doc.getString("date"));
        appointmentDAO.setDoctor(doc.getString("doctor"));
        appointmentDAO.setCheckIn(doc.getString("checkin").equals("true"));
        appointmentDAO.setPatient(doc.getString("patient"));
        appointmentDAO.setId(doc.getString("id"));
        return appointmentDAO;
    }

    public static Document toDocument(AppointmentDAO appointment){

        return new Document("date", appointment.getDate())
                .append("doctor", appointment.getDoctor())
                .append("checkin", appointment.isCheckIn())
                .append("patient", appointment.getPatient())
                .append("id", appointment.getId());
    }
}
