
package com.manoj.realestate_backend.service;

import com.manoj.realestate_backend.model.RejectResidency;
import com.manoj.realestate_backend.repository.RejectResidencyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class RejectResidencyService {

    private final RejectResidencyRepository repository;

    public RejectResidencyService(RejectResidencyRepository repository) {
        this.repository = repository;
    }

    public List<RejectResidency> getAllRejectResidencies() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public RejectResidency getRejectResidencyById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Reject residency not found"
                ));
    }

    public RejectResidency createRejectResidency(
            RejectResidency residency) {

        boolean alreadyExists = repository
                .findByAddressAndUserEmail(
                        residency.getAddress(),
                        residency.getUserEmail()
                )
                .isPresent();

        if (alreadyExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Reject residency already exists for this user and address"
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
