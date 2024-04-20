package com.api.api.backoffice.doctor;

import com.api.api.utils.hash;
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

        doctor.setPwd(hash.hashPwd(doctor.getPwd()));

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

}
