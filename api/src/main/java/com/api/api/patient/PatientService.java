package com.api.api.patient;


import com.api.api.utils.hash;
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
