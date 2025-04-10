package com.example.demo.service;

import com.example.demo.model.Complaint;
import com.example.demo.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository repo;

    // ✅ Fetch all complaints
    public List<Complaint> getAll() {
        return repo.findAll();
    }

    // ✅ Save a complaint with current timestamp
    public Complaint save(Complaint complaint) {
        complaint.setTimestamp(LocalDateTime.now());
        return repo.save(complaint);
    }

    // ✅ Find complaint by ID (used for voting)
    public Complaint findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
    }
}
