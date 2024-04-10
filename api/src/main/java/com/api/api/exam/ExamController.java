package com.api.api.exam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exam")
public class ExamController {

    private final ExamService examService;

    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createExam(@RequestBody ExamDAO exam){

        ExamDAO examDAO = examService.createExam(exam);

        return ResponseEntity.ok("Exam booked by " + examDAO.getPatient() + " for Doctor " + examDAO.getDoctor()
                + " on " + examDAO.getDate() + " has been created.");
    }

    @GetMapping(path = "/{id}/get", consumes = "application/json")
    public ResponseEntity<ExamDAO> getExam(@RequestBody String examID){

        ExamDAO examDAO = examService.getExam(examID);

        return ResponseEntity.ok(examDAO);
    }

    @PutMapping(path = "/{id}/update", consumes = "application/json")
    public ResponseEntity<String> updateExam(@RequestBody ExamDAO exam){

        ExamDAO examDAO = examService.updateExam(exam);

        return ResponseEntity.ok("Exam with ID " + examDAO.getId() + " has been updated.");
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<String> deleteExam(@PathVariable String id){

        String examID = examService.deleteExam(id);

        return ResponseEntity.ok("Exam with ID " + examID + " has been deleted.");
    }
}
