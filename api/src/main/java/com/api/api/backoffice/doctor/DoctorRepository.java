package com.api.api.backoffice.doctor;

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
public class DoctorRepository {

    private final MongoCollection<Document> doctorsCollection;

    @Autowired
    public DoctorRepository(){
        doctorsCollection = MongoClient.getCollection(MongoCollections.DOCTORS);
    }



    public DoctorDAO createDoctor(DoctorDAO doctorDAO){
        Document doctorDocument = DoctorDAO.toDocument(doctorDAO);

        try {
            doctorsCollection.insertOne(doctorDocument);
            return doctorDAO;

        } catch (MongoWriteException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Doctor: " + doctorDAO.getEmail() + " already exists.");

        }catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }


    public DoctorDAO updateDoctor(DoctorDAO doctorDAO){

        Document doctorDocument = DoctorDAO.toDocument(doctorDAO);

        try{

            UpdateResult result = doctorsCollection.replaceOne(Filters.eq("email", doctorDAO.getEmail()), doctorDocument, new ReplaceOptions().upsert(true));
            if (result.getModifiedCount() > 0 || result.getUpsertedId() != null) {
                return doctorDAO;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Patient: " + doctorDAO.getEmail() + " does not exist.");
            }
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }


    public String deleteDoctor(String email){
        try {

            DeleteResult result = doctorsCollection.deleteOne(Filters.eq("email", email));

            if (result.getDeletedCount() > 0)
                return email;
            else
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Doctor: " + email + " does not exist.");

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }

    public DoctorDAO getDoctor(String email){
        Document doc = doctorsCollection.find(Filters.eq("email", email)).first();

        return doc == null ? null : DoctorDAO.fromDocument(doc);
    }

    public List<DoctorDAO> getDoctorByExpertise(String expertise){
        List<Document> docs = doctorsCollection.find(Filters.eq("expertise", expertise)).into(new ArrayList<>());

        return docs.stream().map(DoctorDAO:: fromDocument).collect(Collectors.toList());
    }

}
