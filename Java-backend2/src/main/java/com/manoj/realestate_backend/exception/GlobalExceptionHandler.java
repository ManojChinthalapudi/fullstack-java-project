package com.manoj.realestate_backend.exception;

import org.springframework.core.convert.ConversionFailedException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Converts service exceptions into a stable JSON error shape so the
 * frontend always receives the real status and message instead of an
 * opaque Spring error page (or, previously, a 403 from the /error
 * security dispatch).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatus(
            ResponseStatusException ex) {

        HttpStatus status = HttpStatus.resolve(ex.getStatusCode().value());
        if (status == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        String message = ex.getReason() != null
                ? ex.getReason()
                : status.getReasonPhrase();

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", status.value());
        body.put("message", message);

        return ResponseEntity.status(status).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleUnreadableBody(
            HttpMessageNotReadableException ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("message", "Malformed or missing JSON request body");

        return ResponseEntity.badRequest().body(body);
    }

    /**
     * A path variable that cannot be converted (for example a non-hex
     * MongoDB ObjectId) used to surface as an opaque 500. It is a client
     * mistake, so return 400 instead.
     */
    @ExceptionHandler({
            ConversionFailedException.class,
            MethodArgumentTypeMismatchException.class
    })
    public ResponseEntity<Map<String, Object>> handleInvalidIdentifier(
            Exception ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("message", "Invalid identifier format");

        return ResponseEntity.badRequest().body(body);
    }

    /**
     * Prevent a race between the pre-check and save from becoming a 500
     * when a unique index rejects the duplicate.
     */
    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateKey(
            DuplicateKeyException ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.CONFLICT.value());
        body.put("message", "Record already exists");

        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }
}
