package com.api.api.report;

import com.api.api.patient.PatientDAO;
import com.api.api.patient.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository, PatientRepository patientRepository){
        this.reportRepository = reportRepository;
        this.patientRepository = patientRepository;
    }

    public ReportDAO createReport(ReportDAO report){

        if(!report.isValidToCreate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST," Invalid parameters.");

        PatientDAO patientDAO = patientRepository.getPatient(report.getPatient());

        if(patientDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient: " + report.getPatient() + " do not exist.");

        return reportRepository.createReport(report);

    }

    public ReportDAO updateReport(ReportDAO report){

        if(!report.isValidToUpdate())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST," Invalid parameters.");

        ReportDAO reportDAO = reportRepository.getReport(report.getId());

        if(reportDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Report: " + report.getId() + " does not exist.");

        if(!reportDAO.getDoctor().equals(report.getDoctor()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"");

        return reportRepository.updateReport(report);
    }

    public String deleteReport(String reportId, String doctorEmail){

        ReportDAO reportDAO = reportRepository.getReport(reportId);

        if(reportDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Report: " + reportId + " does not exist.");

        if(!reportDAO.getDoctor().equals(doctorEmail))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        return reportRepository.deleteReport(reportId);
    }

    public ReportDAO getReport(String reportID, String email){

        ReportDAO reportDAO = reportRepository.getReport(reportID);

        if(reportDAO == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Report: " + reportID + " does not exist.");
        
        if(!reportDAO.getPatient().equals(email) && !reportDAO.getDoctor().equals(email))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "");

        return reportDAO;
    }

    public List<ReportDAO> getReportsByPatient(String patientId){

        return reportRepository.reportsByPatient(patientId);
    }



}
