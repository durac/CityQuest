package com.cityquest.exception;

/**
 * Created by Dominik Schwarz on 18.09.2017.
 */
public class BadRequestException extends RuntimeException{

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable e) {
        super(message, e);
    }
}
