package com.api.api.report;

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
public class ReportRepository {

    private final MongoCollection<Document> reportsCollection;


    @Autowired
    public ReportRepository(){
        reportsCollection = MongoClient.getCollection(MongoCollections.REPORTS);
    }

    public ReportDAO createReport(ReportDAO reportDAO){
        Document reportDocument = ReportDAO.toDocument(reportDAO);

        try {
            reportsCollection.insertOne(reportDocument);
            return reportDAO;

        } catch (MongoWriteException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Report: " + reportDAO.getId() + " already exists.");

        }catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }
    public ReportDAO updateReport(ReportDAO reportDAO){

        Document reportDocument = ReportDAO.toDocument(reportDAO);

        try{

            UpdateResult result = reportsCollection.replaceOne(Filters.eq("id", reportDAO.getId()), reportDocument, new ReplaceOptions().upsert(true));
            if (result.getModifiedCount() > 0 || result.getUpsertedId() != null) {
                return reportDAO;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Report: " + reportDAO.getId() + " does not exist.");
            }
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error.");
        }
    }


    public String deleteReport(String id) {
        DeleteResult result = reportsCollection.deleteOne(Filters.eq("id", id));
        try{
            if (result.getDeletedCount() > 0)
                return id;
            else
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Report: " + id + " does not exist.");
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error.");
        }
    }

    public ReportDAO getReport(String id){
        Document doc = reportsCollection.find(Filters.eq("id", id)).first();

        return doc == null ? null : ReportDAO.fromDocument(doc);
    }

    public List<ReportDAO> reportsByPatient(String patient){
        List<Document> docs = reportsCollection.find(Filters.eq("patient", patient)).into(new ArrayList<>());

        return docs.stream().map(ReportDAO :: fromDocument).collect(Collectors.toList());
    }

    public List<ReportDAO> reportsByDoctor(String doctor){
        List<Document> docs = reportsCollection.find(Filters.eq("doctor", doctor)).into(new ArrayList<>());

        return docs.stream().map(ReportDAO :: fromDocument).collect(Collectors.toList());
    }
}
