package com.ddasoom.gateway_service.error;

public class InvalidAuthorizationHeaderException extends RuntimeException {

    public InvalidAuthorizationHeaderException() {
        super("Authorization 헤더가 유효하지 않습니다.");
    }
}