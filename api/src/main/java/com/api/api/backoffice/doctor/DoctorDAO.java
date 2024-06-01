package com.api.api.backoffice.doctor;
import com.api.api.patient.PatientDAO;
import org.bson.Document;

import java.util.UUID;

public class DoctorDAO {

    private String email;
    private String pwd;
    private String firstName;
    private String lastName;
    private String expertise;

    public DoctorDAO(){}

    public DoctorDAO(String email, String pwd, String firstName, String lastName, String expertise){
        this.email = email;
        this.pwd = pwd;
        this.firstName = firstName;
        this.lastName = lastName;
        this.expertise = expertise;
    }

    public DoctorDAO(String email, String pwd){
        this.email = email;
        this.pwd = pwd;
    }

    public boolean isValidCreate(){

        //TODO verify email ,names and pwd validity
        return this.email != null && this.pwd != null && this.firstName != null && this.lastName != null;
    }

    public boolean isValidAuth(){
        return this.email != null && this.pwd != null;
    }

    public boolean isValidUpdate(){
        // TODO verify parameters that can be updated
        return this.email == null && (this.pwd != null || this.expertise != null);
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPwd() {
        return pwd;
    }
    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getExpertise() {
        return expertise;
    }
    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public static DoctorDAO fromDocument(Document doc){

        DoctorDAO doctorDAO = new DoctorDAO();
        doctorDAO.setEmail(doc.getString("email"));
        doctorDAO.setFirstName(doc.getString("firstName"));
        doctorDAO.setPwd(doc.getString("pwd"));
        doctorDAO.setLastName(doc.getString("lastName"));
        doctorDAO.setExpertise(doc.getString("expertise"));

        return doctorDAO;
    }

    public static Document toDocument(DoctorDAO doctor){

        return new Document("email", doctor.getEmail())
                .append("firstName", doctor.getFirstName())
                .append("pwd", doctor.getPwd())
                .append("lastName", doctor.getLastName())
                .append("expertise", doctor.getExpertise());
    }

}
