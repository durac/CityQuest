package com.cityquest.exception;

/**
 * Created by Dominik Schwarz on 18.09.2017.
 */
public class ApiException extends RuntimeException{

    public ApiException(String message) {
        super(message);
    }

    public ApiException(String message, Throwable e) {
        super(message, e);
    }
}
