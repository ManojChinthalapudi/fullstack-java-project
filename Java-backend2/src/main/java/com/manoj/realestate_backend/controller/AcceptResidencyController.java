
package com.manoj.realestate_backend.controller;

import com.manoj.realestate_backend.model.AcceptResidency;
import com.manoj.realestate_backend.service.AcceptResidencyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/residency")
public class AcceptResidencyController {

    private final AcceptResidencyService service;

    public AcceptResidencyController(AcceptResidencyService service) {
        this.service = service;
    }

    @PostMapping("/acceptCreate")
    public ResponseEntity<?> createAcceptResidency(
            @RequestBody Map<String, AcceptResidency> request) {

        AcceptResidency residency = request.get("data");

        if (residency == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Missing residency data"));
        }

        AcceptResidency saved = service.createAcceptResidency(residency);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Accept Residency created successfully",
                        "AcceptResidency", saved
                )
        );
    }

    @GetMapping("/allAcceptresd")
    public ResponseEntity<List<AcceptResidency>> getAllAcceptResidencies() {
        return ResponseEntity.ok(service.getAllAcceptResidencies());
    }

    @GetMapping("/acceptResidency/{id}")
    public ResponseEntity<?> getAcceptResidency(@PathVariable String id) {

        AcceptResidency residency = service.getAcceptResidencyById(id);

        return ResponseEntity.ok(
                Map.of(
                        "message", "AcceptResidency fetched successfully",
                        "AcceptResidency", residency
                )
        );
    }
}
