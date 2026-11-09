
package com.manoj.realestate_backend.controller;

import com.manoj.realestate_backend.model.User;
import com.manoj.realestate_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        User savedUser = service.registerUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of(
                        "message", "User registered successfully!!",
                        "user", savedUser
                )
        );
    }

    @PostMapping("/bookvisit/{id}")
    public ResponseEntity<?> bookVisit(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String date = request.get("date");

        if (email == null || email.isBlank() ||
                date == null || date.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and date are required"));
        }

        String result = service.bookVisit(id, email, date);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/cancelBooking/{id}")
    public ResponseEntity<?> cancelBooking(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        String result = service.cancelBooking(id, email);

        return ResponseEntity.ok(result);
    }


    @PostMapping("/allBookings")
    public ResponseEntity<?> getAllBookings(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        return ResponseEntity.ok(service.getAllBookings(email));
    }

    @PostMapping("/toFav/{rid}")
    public ResponseEntity<?> toggleFavourite(
            @PathVariable String rid,
            @RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        return ResponseEntity.ok(service.toggleFavourite(rid, email));
    }

    @PostMapping("/allFav")
    public ResponseEntity<?> getAllFavourites(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        return ResponseEntity.ok(service.getAllFavourites(email));
    }

}
