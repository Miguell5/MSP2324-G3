package com.api.api.appointment;

import com.api.api.backoffice.doctor.DoctorDAO;
import com.api.api.backoffice.doctor.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository,  DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
    }

    public AppointmentDAO createAppointment(AppointmentDAO appointment){

        if(!appointment.isValidToCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parameters are not valid.");

        DoctorDAO doctorDAO = doctorRepository.getDoctor(appointment.getDoctor());

        if(doctorDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor " + appointment.getDoctor() +  " does not exist.");

        // TODO verificar horarios de compatibilidade com o doctor

        return appointmentRepository.createAppointment(appointment);

    }
    public AppointmentDAO updateAppointment(AppointmentDAO appointment){

        if(!appointment.isValidToUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parameters are not valid.");

        AppointmentDAO appointmentDAO = appointmentRepository.getAppointment(appointment.getId());

        if(appointmentDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment " + appointment.getId() +  " does not exist.");

        if(!appointmentDAO.getPatient().equals(appointment.getPatient()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        // TODO verificar novos horarios de compatibilidade com o doctor
        // TODO update AppointmentDAO with appointment new data

        return appointmentRepository.updateAppointment(appointmentDAO);
    }
    public String deleteAppointment(String id, String patient){

        AppointmentDAO appointmentDAO = appointmentRepository.getAppointment(id);

        if(appointmentDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment " + id +  " does not exist.");

        if(!appointmentDAO.getPatient().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        return appointmentRepository.deleteAppointment(id);

    }
    public AppointmentDAO getAppointment(String id, String patient){
        AppointmentDAO appointmentDAO = appointmentRepository.getAppointment(id);

        if(appointmentDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment " + id +  " does not exist.");

        if(!appointmentDAO.getPatient().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        return appointmentDAO;
    }

    public boolean checkin(String appointmentId, String patient){

        AppointmentDAO appointmentDAO = appointmentRepository.getAppointment(appointmentId);

        if(appointmentDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment " + appointmentId +  " does not exist.");

        if(!appointmentDAO.getPatient().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        // TODO verificar se esta quase na hora que o exame esta marcado

        appointmentDAO.setCheckIn(true);

        return true;
    }

    public List<AppointmentDAO> getAppointmentsByPatient(String patient){
        return appointmentRepository.appointmentsByPatient(patient);
    }
}
