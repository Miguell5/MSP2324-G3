package com.api.api.utils;

public enum MongoCollections {
    APPOINTMENTS("appointments"),
    EXAMS("exams"),
    REPORTS("reports"),
    DOCTORS("doctors"),
    PATIENTS("patients");


    private final String value;
    MongoCollections(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}