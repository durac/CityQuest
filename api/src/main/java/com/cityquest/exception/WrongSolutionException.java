package com.cityquest.exception;

/**
 * Created by Dominik Schwarz on 18.09.2017.
 */
public class WrongSolutionException extends RuntimeException{

    public WrongSolutionException(String message) {
        super(message);
    }

    public WrongSolutionException(String message, Throwable e) {
        super(message, e);
    }
}
