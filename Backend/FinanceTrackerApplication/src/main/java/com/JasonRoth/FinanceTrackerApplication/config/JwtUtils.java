package com.JasonRoth.FinanceTrackerApplication.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

public class JwtUtils {

    public static String generateToken(String username) {
            return Jwts.builder()
                    .subject(username)
                    .expiration(new Date(System.currentTimeMillis() + JwtConstants.EXPIRATION_TIME))
                    .signWith(key())
                    .compact();
    }

    private static Key key(){
        System.out.println(JwtConstants.SECRET);
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JwtConstants.SECRET));
    }

    public static Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static boolean validateToken(String token) {
        try{
            Jwts.parser().verifyWith((SecretKey) key()).build().parse(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }


}
