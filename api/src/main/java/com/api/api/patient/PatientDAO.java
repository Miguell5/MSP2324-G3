package com.api.api.patient;

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

}
