package com.manoj.realestate_backend.controller;

import com.manoj.realestate_backend.model.Residency;
import com.manoj.realestate_backend.service.ResidencyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/residency")
public class ResidencyController {

    private final ResidencyService residencyService;

    public ResidencyController(ResidencyService residencyService) {
        this.residencyService = residencyService;
    }

    // POST /api/residency/create
    @PostMapping("/create")
    public ResponseEntity<?> createResidency(
            @RequestBody Map<String, Residency> request) {

        Residency residency = request.get("data");

        if (residency == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Missing residency data"));
        }

        Residency saved = residencyService.createResidency(residency);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of(
                        "message", "Residency created successfully",
                        "residency", saved
                )
        );
    }

    // GET /api/residency/allresd
    @GetMapping("/allresd")
    public ResponseEntity<List<Residency>> getAllResidencies() {
        return ResponseEntity.ok(
                residencyService.getAllResidencies()
        );
    }

    // GET /api/residency/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Residency> getResidency(
            @PathVariable String id) {

        return ResponseEntity.ok(
                residencyService.getResidencyById(id)
        );
    }

}
