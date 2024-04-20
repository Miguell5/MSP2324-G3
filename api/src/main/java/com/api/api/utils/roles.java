package com.api.api.utils;

public enum roles {
    DOCTOR("doctor"),
    PATIENT("patient");

    private final String value;
    roles(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }


}
