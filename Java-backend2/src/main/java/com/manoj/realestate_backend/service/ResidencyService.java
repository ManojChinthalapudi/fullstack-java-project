package com.manoj.realestate_backend.service;


import com.manoj.realestate_backend.model.Residency;
import com.manoj.realestate_backend.repository.ResidencyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class ResidencyService {

    private final ResidencyRepository residencyRepository;

    public ResidencyService(ResidencyRepository residencyRepository) {
        this.residencyRepository = residencyRepository;
    }

    // Get all residencies
    public List<Residency> getAllResidencies() {
        return residencyRepository.findAllByOrderByCreatedAtDesc();
    }

    // Get residency by ID
    public Residency getResidencyById(String id) {
        return residencyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Residency not found"
                ));
    }

    // Get residencies created by a particular user
    public List<Residency> getResidenciesByUserEmail(String email) {
        return residencyRepository.findByUserEmail(email);
    }

    // Create a new residency
    public Residency createResidency(Residency residency) {

        // Check whether the same user already added this address
        boolean alreadyExists = residencyRepository
                .findByAddressAndUserEmail(
                        residency.getAddress(),
                        residency.getUserEmail()
                )
                .isPresent();

        if (alreadyExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Residency already exists for this user and address"
            );
        }

        Instant now = Instant.now();

        residency.setCreatedAt(now);
        residency.setUpdatedAt(now);

        return residencyRepository.save(residency);
    }

    // Update an existing residency
    public Residency updateResidency(String id, Residency updatedResidency) {

        Residency existing = getResidencyById(id);

        // Check for duplicate address if the address has changed
        if (!existing.getAddress().equals(updatedResidency.getAddress())) {

            boolean alreadyExists = residencyRepository
                    .findByAddressAndUserEmail(
                            updatedResidency.getAddress(),
                            existing.getUserEmail()
                    )
                    .isPresent();

            if (alreadyExists) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Another residency already exists at this address"
                );
            }
        }

        existing.setTitle(updatedResidency.getTitle());
        existing.setDescription(updatedResidency.getDescription());
        existing.setPrice(updatedResidency.getPrice());
        existing.setAddress(updatedResidency.getAddress());
        existing.setCity(updatedResidency.getCity());
        existing.setCountry(updatedResidency.getCountry());
        existing.setImage(updatedResidency.getImage());

        // Preserve the original owner and creation date
        existing.setUpdatedAt(Instant.now());

        return residencyRepository.save(existing);
    }

    // Delete a residency
    public void deleteResidency(String id) {
        Residency existing = getResidencyById(id);
        residencyRepository.delete(existing);
    }
}
