package com.api.api.exam;

import com.api.api.token.TokenJWT;
import com.api.api.token.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/exam")
public class ExamController {

    private final ExamService examService;

    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<String> createExam(@RequestHeader("Authorization") String token,
                                             @RequestBody ExamDAO exam){

        if(!exam.isValidToCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        exam.setPatient(tokenJWT.getEmail());
        ExamDAO examDAO = examService.createExam(exam);

        return ResponseEntity.ok("Exam booked by " + examDAO.getPatient() + " for Doctor " + examDAO.getDoctor()
                + " on " + examDAO.getDate() + " has been created.");
    }

    @GetMapping(path = "/{id}/get", consumes = "application/json")
    public ResponseEntity<ExamDAO> getExam(@RequestHeader("Authorization") String token,
                                           @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        ExamDAO examDAO = examService.getExam(id, tokenJWT.getEmail());

        return ResponseEntity.ok(examDAO);
    }

    @PutMapping(path = "/{id}/update", consumes = "application/json")
    public ResponseEntity<String> updateExam(@RequestHeader("Authorization") String token,
                                             @RequestBody ExamDAO exam,
                                             @PathVariable String id){

        if(!exam.isValidToUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong parameters.");

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        exam.setPatient(tokenJWT.getEmail());
        exam.setId(id);
        ExamDAO examDAO = examService.updateExam(exam);

        return ResponseEntity.ok("Exam with ID " + examDAO.getId() + " has been updated.");
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<String> deleteExam(@RequestHeader("Authorization") String token,
                                             @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        String examID = examService.deleteExam(id, tokenJWT.getEmail());

        return ResponseEntity.ok("Exam with ID " + examID + " has been deleted.");
    }

    @PutMapping(path = "/{id}/checkin")
    public ResponseEntity<String> checkin(@RequestHeader("Authorization") String token,
                                          @PathVariable String id){

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        boolean val = examService.checkin(id, tokenJWT.getEmail());

        return ResponseEntity.ok("Patient that arrived for exam with ID " + id + " has checked-in.");
    }

    @GetMapping(path = "/{patient}/getExamsPatient", consumes = "application/json")
    public ResponseEntity<List<ExamDAO>> getExamsByPatient(@RequestHeader("Authorization") String token,
                                                           @PathVariable String patient) {

        TokenJWT tokenJWT = TokenManager.isTokenValid(token);

        if(tokenJWT == null || !tokenJWT.getEmail().equals(patient))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not allowed.");

        return  ResponseEntity.ok(examService.getExamsByPatient(patient));
    }
}
