package com.api.api.report;

import java.util.UUID;

public class ReportDAO {

    private String id;
    private String title;
    private String description;
    private String doctor;
    private String patient;
    private String type; //exam report or appointment report

    public ReportDAO(){}

    public ReportDAO(String id, String title, String description, String doctor, String patient, String type) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.description = description;
        this.doctor = doctor;
        this.patient = patient;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getPatient() {
        return patient;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
