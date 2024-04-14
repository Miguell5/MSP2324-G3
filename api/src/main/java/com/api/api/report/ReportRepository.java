package com.api.api.report;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository {

    ReportDAO createReport(ReportDAO reportDAO);
    ReportDAO updateReport(ReportDAO reportDAO);
    String deleteReport(String id);
    ReportDAO getReport(String id);
    List<ReportDAO> reportsByPatient(String patient);
}
