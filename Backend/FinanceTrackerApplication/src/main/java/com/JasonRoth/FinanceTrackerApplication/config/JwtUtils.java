package com.JasonRoth.FinanceTrackerApplication.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecureDigestAlgorithm;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

public class JwtUtils {
    private static final byte[] bytes = Decoders.BASE64.decode(JwtConstants.SECRET);
    private static final Key key = Keys.hmacShaKeyFor(bytes);
    private static final SecretKey sKey = Keys.hmacShaKeyFor(bytes);

    public static String generateToken(String username) {
            return Jwts.builder()
                    .subject(username)
                    .expiration(new Date(System.currentTimeMillis() + JwtConstants.EXPIRATION_TIME))
                    .signWith(key)
                    .compact();
    }

    public static Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(sKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }

    public static boolean validateToken(String token) {
        try{
            Jwts.parser().verifyWith(sKey).build().parseSignedClaims(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }


}
