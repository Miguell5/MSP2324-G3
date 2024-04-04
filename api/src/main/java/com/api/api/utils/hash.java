package com.api.api.utils;

import org.mindrot.jbcrypt.BCrypt;

public class hash {

    public static String hashPwd(String pwd) {
        String salt = BCrypt.gensalt(12);

        return BCrypt.hashpw(pwd, salt);
    }
    public static boolean checkPwd(String pwd, String hashedPwd) {
        return BCrypt.checkpw(pwd, hashedPwd);
    }

}
