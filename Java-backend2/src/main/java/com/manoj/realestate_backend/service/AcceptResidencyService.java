
package com.manoj.realestate_backend.service;

import com.manoj.realestate_backend.model.AcceptResidency;
import com.manoj.realestate_backend.repository.AcceptResidencyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class AcceptResidencyService {

    private final AcceptResidencyRepository repository;

    public AcceptResidencyService(AcceptResidencyRepository repository) {
        this.repository = repository;
    }

    public List<AcceptResidency> getAllAcceptResidencies() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public AcceptResidency getAcceptResidencyById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Accept residency not found"
                ));
    }

    public AcceptResidency createAcceptResidency(
            AcceptResidency residency) {

        boolean alreadyExists = repository
                .findByAddressAndUserEmail(
                        residency.getAddress(),
                        residency.getUserEmail()
                )
                .isPresent();

        if (alreadyExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Accept residency already exists for this user and address"
            );
        }

        if (residency.getImage() == null ||
                residency.getImage().isBlank()) {
            residency.setImage("/logo1.png");
        }

        Instant now = Instant.now();
        residency.setCreatedAt(now);
        residency.setUpdatedAt(now);

        return repository.save(residency);
    }
}
