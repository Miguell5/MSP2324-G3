package com.api.api.exam;

import com.api.api.utils.MongoClient;
import com.api.api.utils.MongoCollections;
import com.mongodb.MongoWriteException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.ReplaceOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ExamRepository {

    private final MongoCollection<Document> examsCollection;

    @Autowired
    public ExamRepository(){
        examsCollection = MongoClient.getCollection(MongoCollections.EXAMS);
    }


    public ExamDAO createExam(ExamDAO examDAO){
        Document examDocument = ExamDAO.toDocument(examDAO);

        try {
            examsCollection.insertOne(examDocument);
            return examDAO;

        } catch (MongoWriteException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Exam: " + examDAO.getId() + " already exists.");

        }catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }
    public ExamDAO updateExam(ExamDAO examDAO){

        Document reportDocument = ExamDAO.toDocument(examDAO);

        try{

            UpdateResult result = examsCollection.replaceOne(Filters.eq("id", examDAO.getId()), reportDocument, new ReplaceOptions().upsert(true));
            if (result.getModifiedCount() > 0 || result.getUpsertedId() != null) {
                return examDAO;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Exam: " + examDAO.getId() + " does not exist.");
            }
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }

    public String deleteExam(String id){

        DeleteResult result = examsCollection.deleteOne(Filters.eq("id", id));
        try{
            if (result.getDeletedCount() > 0)
                return id;
            else
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Exam: " + id + " does not exist.");
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error.");
        }
    }
    public ExamDAO getExam(String id){
        Document doc = examsCollection.find(Filters.eq("id", id)).first();

        return doc == null ? null : ExamDAO.fromDocument(doc);
    }

    public List<ExamDAO> examsByPatient(String patient){
        List<Document> docs = examsCollection.find(Filters.eq("patient", patient)).into(new ArrayList<>());

        return docs.stream().map(ExamDAO :: fromDocument).collect(Collectors.toList());
    }

    public List<ExamDAO> examsByDoctor(String doctor){
        List<Document> docs = examsCollection.find(Filters.eq("doctor", doctor)).into(new ArrayList<>());

        return docs.stream().map(ExamDAO :: fromDocument).collect(Collectors.toList());
    }


}
