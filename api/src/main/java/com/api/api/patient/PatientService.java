package com.api.api.patient;


import com.api.api.token.TokenManager;
import com.api.api.utils.hash;
import com.api.api.utils.roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PatientService {


    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public PatientDAO createPatient(PatientDAO patient){
        PatientDAO patientDAO = patientRepository.getPatient(patient.getEmail());

        if(patientDAO != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Already exists an account with that email.");

        patient.setPwd(hash.hashPwd(patient.getPwd()));

        return patientRepository.createPatient(patient);
    }

    public String auth(String email, String pwd){

        PatientDAO patient = patientRepository.getPatient(email);

        if(patient == null || !hash.checkPwd(pwd,patient.getPwd()) )
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username or password are incorrect.");

        return TokenManager.generateToken(email, roles.PATIENT.getValue());
    }

    public PatientDAO updatePatient(PatientDAO patient){
        PatientDAO patientDAO = patientRepository.getPatient(patient.getEmail());

        if(patientDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There is no account with that email.");

        // TODO update userDAO with new parameters


        return patientRepository.updatePatient(patient);
    }

    public String deletePatient(String email){
        PatientDAO patientDAO = patientRepository.getPatient(email);

        if(patientDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There is no account with that email.");

        return patientRepository.deletePatient(email);
    }

    public PatientDAO getPatient(String email){

        PatientDAO patientDAO = patientRepository.getPatient(email);

        if(patientDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There is no account with that email.");

        return patientDAO;
    }

}
