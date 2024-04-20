package com.api.api.exam;

import org.bson.Document;

import java.util.UUID;

public class ExamDAO {
    private String id;
    private String patient;
    private String doctor;
    private String date;
    private String examType;
    private boolean checkIn;

    public ExamDAO(){}

    public ExamDAO(String patient, String doctor, String date, String examType){
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.examType = examType;
        this.id = UUID.randomUUID().toString();
        this.checkIn = false;
    }

    public boolean isValidToCreate(){
        return this.patient != null  && this.doctor != null
                && this.date != null && this.id != null
                && this.examType != null;
    }

    public boolean isValidToUpdate(){
        return this.id == null && this.examType == null && (this.patient != null  || this.doctor != null
                || this.date != null);
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

    public boolean isCheckIn() {
        return checkIn;
    }

    public void setCheckIn(boolean val) {
        this.checkIn = val;
    }

    public static ExamDAO fromDocument(Document doc){

        ExamDAO examDAO = new ExamDAO();
        examDAO.setCheckIn(doc.getString("checkin").equals("true"));
        examDAO.setDate(doc.getString("date"));
        examDAO.setExamType(doc.getString("examType"));
        examDAO.setDoctor(doc.getString("doctor"));
        examDAO.setId(doc.getString("id"));
        examDAO.setPatient(doc.getString("patient"));
        return examDAO;
    }

    public static Document toDocument(ExamDAO exam){

        return new Document("id", exam.getId())
                .append("examType", exam.getExamType())
                .append("doctor", exam.getDoctor())
                .append("checkin", exam.isCheckIn())
                .append("patient", exam.getPatient())
                .append("date", exam.getDate());
    }
}
