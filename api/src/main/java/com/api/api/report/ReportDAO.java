package com.api.api.report;

public class ReportDAO {

    private String id;
    private String title;
    private String description;
    private String doctor;
    private String patient;

    public ReportDAO(){}

    public ReportDAO(String id, String title, String description, String doctor, String patient) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.doctor = doctor;
        this.patient = patient;
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
}
