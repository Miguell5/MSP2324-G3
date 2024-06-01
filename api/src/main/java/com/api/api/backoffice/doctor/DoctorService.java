package com.api.api.backoffice.doctor;

import com.api.api.patient.PatientDAO;
import com.api.api.token.TokenManager;
import com.api.api.utils.hash;
import com.api.api.utils.roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public DoctorDAO createDoctor(DoctorDAO doctor){
        DoctorDAO doctorDAO = doctorRepository.getDoctor(doctor.getEmail());

        if(doctorDAO != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Already exists a Doctor with that ID");

        doctor.setPwd(doctor.getPwd());

        return doctorRepository.createDoctor(doctor);
    }

    public DoctorDAO updateDoctor(DoctorDAO doctor){
        DoctorDAO doctorDAO = doctorRepository.getDoctor(doctor.getEmail());

        if(doctorDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There is no Doctor with that ID.");

        // TODO update userDAO with new parameters

        return doctorRepository.updateDoctor(doctor);
    }

    public String deleteDoctor(String uuid){
        DoctorDAO doctorDAO = doctorRepository.getDoctor(uuid);

        if(doctorDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There is no Doctor with that ID.");

        return doctorRepository.deleteDoctor(uuid);
    }

    public DoctorDAO getDoctor(String uuid){

        DoctorDAO doctorDAO = doctorRepository.getDoctor(uuid);

        if(doctorDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There is no Doctor with that ID.");

        return doctorDAO;
    }

    public String auth(String email, String pwd){

        DoctorDAO doctor = doctorRepository.getDoctor(email);

        if(doctor == null || !pwd.equals(doctor.getPwd()) )
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username or password are incorrect.");

        return TokenManager.generateToken(email, roles.PATIENT.getValue());
    }

}
