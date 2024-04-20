package com.api.api.patient;

import org.bson.Document;

public class PatientDAO {

    private String email;
    private String pwd;
    private String firstName;
    private String lastName;


    public PatientDAO(){}

    public PatientDAO(String email, String pwd, String firstName, String lastName){
        this.email = email;
        this.pwd = pwd;
        this.firstName = firstName;
        this.lastName = lastName;
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
        return false;
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

    public static PatientDAO fromDocument(Document doc){

        PatientDAO patientDAO = new PatientDAO();
        patientDAO.setEmail(doc.getString("email"));
        patientDAO.setFirstName(doc.getString("firstName"));
        patientDAO.setPwd(doc.getString("pwd"));
        patientDAO.setLastName(doc.getString("lastName"));
        return patientDAO;
    }

    public static Document toDocument(PatientDAO patient){

        return new Document("email", patient.getEmail())
                .append("firstName", patient.getFirstName())
                .append("pwd", patient.getPwd())
                .append("lastName", patient.getLastName());
    }

}
