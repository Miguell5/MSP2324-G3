package com.api.api.exam;

import com.api.api.backoffice.doctor.DoctorDAO;
import com.api.api.backoffice.doctor.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ExamService {

    private final ExamRepository examRepository;
    private final DoctorRepository doctorRepository;

    @Autowired
    public ExamService(ExamRepository examRepository, DoctorRepository doctorRepository) {
        this.examRepository = examRepository;
        this.doctorRepository = doctorRepository;
    }

    public ExamDAO createExam(ExamDAO exam) {

        if(!exam.isValidToCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parameters are not valid.");

        DoctorDAO doctorDAO = doctorRepository.getDoctor(exam.getDoctor());

        if(doctorDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor " + exam.getDoctor() +  " does not exist.");

        // TODO verificar horarios de compatibilidade com o doctor

        return examRepository.createExam(exam);
    }

    public ExamDAO updateExam(ExamDAO exam){

        if(!exam.isValidToUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parameters are not valid.");

        ExamDAO examDAO = examRepository.getExam(exam.getId());

        if(examDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam " + exam.getId() +  " does not exist.");

        if(!examDAO.getPatient().equals(exam.getPatient()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        // TODO verificar novos horarios de compatibilidade com o doctor
        // TODO update examDAO with exam new data

        return examRepository.updateExam(examDAO);
    }

    public ExamDAO getExam(String id, String patient){

        ExamDAO examDAO = examRepository.getExam(id);

        if(examDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam " + id +  " does not exist.");

        if(!examDAO.getPatient().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        return examDAO;


    }

    public String deleteExam(String id, String patient){

        ExamDAO examDAO = examRepository.getExam(id);

        if(examDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam " + id +  " does not exist.");

        if(!examDAO.getPatient().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        return examRepository.deleteExam(id);

    }

    public boolean checkin(String examId, String patient){

        ExamDAO examDAO = examRepository.getExam(examId);

        if(examDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam " + examId +  " does not exist.");

        if(!examDAO.getPatient().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        // TODO verificar se esta quase na hora que o exame esta marcado

        examDAO.setCheckIn(true);

        return true;

    }

    public List<ExamDAO> getExamsByPatient(String patient){
        return examRepository.examsByPatient(patient);

    }
}
