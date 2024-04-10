package com.api.api.Appointment;

import java.util.UUID;

public class AppointmentDAO {
    private String id;
    private String patient;
    private String doctor;
    private String date;

    public AppointmentDAO(){}

    public AppointmentDAO(String patient, String doctor, String date) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.id = UUID.randomUUID().toString();
    }

    public boolean isValidToCreate(){
        //TODO
        return true;
    }

    public boolean isValidToUpdate(){
        //TODO
        return true;
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

}
