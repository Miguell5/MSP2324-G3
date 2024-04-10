package com.api.api.exam;

import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository {
    ExamDAO createExam(ExamDAO examDAO);
    ExamDAO updateExam(ExamDAO examDAO);
    String deleteExam(String id);
    ExamDAO getExam(String id);

}
