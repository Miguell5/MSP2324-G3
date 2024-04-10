package com.api.api.report;

import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository {

    ReportDAO createReport(ReportDAO reportDAO);
    ReportDAO updateReport(ReportDAO reportDAO);
    String deleteReport(String id);
    ReportDAO getReport(String id);
}
