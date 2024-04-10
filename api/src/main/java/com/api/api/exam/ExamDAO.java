package com.api.api.exam;

import java.util.UUID;

public class ExamDAO {
    private String id;
    private String patient;
    private String doctor;
    private String date;
    private String examType;

    public ExamDAO(){}

    public ExamDAO(String patient, String doctor, String date, String examType){
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.examType = examType;
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

    public String getPatient() {
        return patient;
    }

    public String getDoctor() {
        return doctor;
    }

    public String getDate() {
        return date;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setExamType(String examType) {
        this.examType = examType;
    }

    public String getExamType() {
        return examType;
    }
}
