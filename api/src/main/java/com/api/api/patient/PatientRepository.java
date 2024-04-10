package com.api.api.patient;


import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository {
    PatientDAO createPatient(PatientDAO patientDAO);
    PatientDAO updatePatient(PatientDAO patientDAO);
    String deleteUser(String email);
    PatientDAO getPatient(String email);

}
