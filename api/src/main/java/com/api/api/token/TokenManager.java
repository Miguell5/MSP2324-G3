package com.api.api.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class TokenManager {

    private static final String myIssuer = "myIssuer";
    private static final String secretKey = "mySecretKey";


    public static String generateToken(String email, String role) {
        long expiryInMillis = 3600000*2; // 2 hour

        return Jwts.builder()
                .setSubject(email)
                .claim("role",role)
                .setIssuer(myIssuer)
                .setExpiration(new Date(System.currentTimeMillis() + expiryInMillis))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static TokenJWT isTokenValid(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            Date expirationDate = claims.getExpiration();
            Date now = new Date();
            String issuer = claims.getIssuer();
            if (!myIssuer.equals(issuer)) {
                return null;
            }
            if(!expirationDate.before(now)){

                String email = claims.getSubject();
                String role = (String) claims.get("role");


                TokenJWT tokenJWT = new TokenJWT(email,role);
                return tokenJWT;

            }
            return null;
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }

}
