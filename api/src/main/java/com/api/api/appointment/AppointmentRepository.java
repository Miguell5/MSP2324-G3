package com.api.api.appointment;

import com.api.api.utils.MongoClient;
import com.api.api.utils.MongoCollections;
import com.mongodb.MongoWriteException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.ReplaceOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class AppointmentRepository {

    private final MongoCollection<Document> appointmentsCollection;


    public AppointmentRepository(){
        appointmentsCollection = MongoClient.getCollection(MongoCollections.APPOINTMENTS);
    }


    public AppointmentDAO createAppointment(AppointmentDAO appointmentDAO){

        Document appointmentDocument = AppointmentDAO.toDocument(appointmentDAO);

        try {
            appointmentsCollection.insertOne(appointmentDocument);
            return appointmentDAO;

        } catch (MongoWriteException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Appointment: " + appointmentDAO.getId() + " already exists.");

        }catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }

    public AppointmentDAO updateAppointment(AppointmentDAO appointmentDAO){
        Document appointmentDocument = AppointmentDAO.toDocument(appointmentDAO);

        try{

            UpdateResult result = appointmentsCollection.replaceOne(Filters.eq("id", appointmentDAO.getId()), appointmentDocument, new ReplaceOptions().upsert(true));
            if (result.getModifiedCount() > 0 || result.getUpsertedId() != null) {
                return appointmentDAO;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Appointment: " + appointmentDAO.getId() + " does not exist.");
            }
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }

    public String deleteAppointment(String id){


        DeleteResult result = appointmentsCollection.deleteOne(Filters.eq("id", id));
        try{
            if (result.getDeletedCount() > 0)
                return id;
            else
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment: " + id + " does not exist.");
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error.");
        }

    }
    public AppointmentDAO getAppointment(String id){
        Document doc = appointmentsCollection.find(Filters.eq("id", id)).first();

        return doc == null ? null : AppointmentDAO.fromDocument(doc);
    }
    public List<AppointmentDAO> appointmentsByPatient(String patient){
        List<Document> docs = appointmentsCollection.find(Filters.eq("patient", patient)).into(new ArrayList<>());

        return docs.stream().map(AppointmentDAO:: fromDocument).collect(Collectors.toList());
    }

    public List<AppointmentDAO> appointmentsByDoctor(String doctor){
        List<Document> docs = appointmentsCollection.find(Filters.eq("doctor", doctor)).into(new ArrayList<>());

        return docs.stream().map(AppointmentDAO:: fromDocument).collect(Collectors.toList());
    }
}
