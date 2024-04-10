package com.api.api.backoffice.doctor;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository {
    DoctorDAO createDoctor(DoctorDAO doctorDAO);
    DoctorDAO updateDoctor(DoctorDAO doctorDAO);
    String deleteDoctor(String uuid);
    DoctorDAO getDoctor(String uuid);
}
