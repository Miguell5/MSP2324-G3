package com.api.api.exam;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository {
    ExamDAO createExam(ExamDAO examDAO);
    ExamDAO updateExam(ExamDAO examDAO);
    String deleteExam(String id);
    ExamDAO getExam(String id);
    List<ExamDAO> examsByPatient(String patient);

}
