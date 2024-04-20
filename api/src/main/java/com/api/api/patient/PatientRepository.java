package com.api.api.patient;


import com.api.api.utils.MongoCollections;
import com.api.api.utils.MongoClient;
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

@Repository
public class PatientRepository {

    private final MongoCollection<Document> patientsCollection;

    @Autowired
    public PatientRepository(){
        patientsCollection = MongoClient.getCollection(MongoCollections.PATIENTS);
    }

    public PatientDAO createPatient(PatientDAO patientDAO){

        Document patientDocument = PatientDAO.toDocument(patientDAO);

        try {
            patientsCollection.insertOne(patientDocument);
            return patientDAO;

        } catch (MongoWriteException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Patient: " + patientDAO.getEmail() + " already exists.");

        }catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }

    }
    public PatientDAO updatePatient(PatientDAO patientDAO){

        Document patientDocument = PatientDAO.toDocument(patientDAO);

        try{

            UpdateResult result = patientsCollection.replaceOne(Filters.eq("email", patientDAO.getEmail()), patientDocument, new ReplaceOptions().upsert(true));
            if (result.getModifiedCount() > 0 || result.getUpsertedId() != null) {
                return patientDAO;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Patient: " + patientDAO.getEmail() + " does not exist.");
            }
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }

    public String deletePatient(String email){
        try {

            DeleteResult result = patientsCollection.deleteOne(Filters.eq("email", email));

            if (result.getDeletedCount() > 0)
                return email;
            else
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Patient: " + email + " does not exist.");

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }
    public PatientDAO getPatient(String email){
        Document doc = patientsCollection.find(Filters.eq("email", email)).first();

        return doc == null ? null : PatientDAO.fromDocument(doc);
    }

}
