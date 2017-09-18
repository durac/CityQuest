package com.cityquest.exception;

/**
 * Created by Dominik Schwarz on 18.09.2017.
 */
public class ApiException extends Exception{

    public ApiException(String message) {
        super(message);
    }

    public ApiException(String message, Throwable e) {
        super(message, e);
    }
}
