package com.api.api.token;

public class TokenJWT {

    private String email;
    private String role;

    public TokenJWT(String email, String role){
        this.email = email;
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }
    public String getEmail(){
        return this.email;
    }




}
