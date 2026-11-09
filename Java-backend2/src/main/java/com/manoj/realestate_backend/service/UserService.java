
package com.manoj.realestate_backend.service;

import com.manoj.realestate_backend.model.User;
import com.manoj.realestate_backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User registerUser(User user) {

        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "User already registered"
            );
        }

        if (user.getBookedVisits() == null) {
            user.setBookedVisits(new ArrayList<>());
        }

        if (user.getFavResidenciesID() == null) {
            user.setFavResidenciesID(new ArrayList<>());
        }

        return repository.save(user);
    }


    public String bookVisit(String residencyId, String email, String date) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        if (user.getBookedVisits() == null) {
            user.setBookedVisits(new ArrayList<>());
        }

        boolean alreadyBooked = user.getBookedVisits().stream()
                .anyMatch(booking ->
                        residencyId.equals(String.valueOf(booking.get("id")))
                );

        if (alreadyBooked) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "This residency is already Booked by you"
            );
        }

        Map<String, Object> booking = new HashMap<>();
        booking.put("id", residencyId);
        booking.put("date", date);

        user.getBookedVisits().add(booking);
        repository.save(user);

        return "Your visit is booked successfully";
    }

    public String cancelBooking(String residencyId, String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        if (user.getBookedVisits() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Booking not found"
            );
        }

        boolean removed = user.getBookedVisits().removeIf(
                booking -> residencyId.equals(
                        String.valueOf(booking.get("id"))
                )
        );

        if (!removed) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Booking not found"
            );
        }

        repository.save(user);

        return "Booking cancelled successfully";
    }


    public List<Map<String, Object>> getAllBookings(String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return user.getBookedVisits() == null
                ? new ArrayList<>()
                : user.getBookedVisits();
    }

    public Map<String, Object> toggleFavourite(
            String residencyId, String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        if (user.getFavResidenciesID() == null) {
            user.setFavResidenciesID(new ArrayList<>());
        }

        boolean removed = user.getFavResidenciesID()
                .remove(residencyId);

        if (removed) {
            repository.save(user);

            return Map.of(
                    "message", "Removed from favourites",
                    "user", user
            );
        }

        user.getFavResidenciesID().add(residencyId);
        repository.save(user);

        return Map.of(
                "message", "Added to favourites",
                "user", user
        );
    }

    public Map<String, Object> getAllFavourites(String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        List<String> favourites = user.getFavResidenciesID() == null
                ? new ArrayList<>()
                : user.getFavResidenciesID();

        return Map.of("favResidenciesID", favourites);
    }


}
