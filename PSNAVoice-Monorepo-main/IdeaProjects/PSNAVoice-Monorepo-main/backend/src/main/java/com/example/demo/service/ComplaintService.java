package com.example.demo.service;

import com.example.demo.repository.CommentRepository;
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

    @Autowired
    private CommentRepository commentRepo;  // Add this to access comments

    // ✅ Fetch all complaints with comment count
    public List<Complaint> getAll() {
        List<Complaint> complaints = repo.findAll();
        for (Complaint complaint : complaints) {
            // Count comments related to each complaint
            long commentCount = commentRepo.countByComplaintId(complaint.getId());
            // Set the comment count (assuming you add a setter method)
            complaint.setCommentCount(commentCount); // You will need to add this setter to the Complaint model
        }
        return complaints;
    }

    // ✅ Save a complaint with current timestamp
    public Complaint save(Complaint complaint) {
        if (complaint.getId() == null) {
            complaint.setCreatedAt(LocalDateTime.now()); // Only set if it's a new complaint
        } else {
            // preserve the original timestamp
            Complaint existing = repo.findById(complaint.getId())
                    .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaint.getId()));
            complaint.setCreatedAt(existing.getCreatedAt());
        }
        return repo.save(complaint);
    }

    // ✅ Find complaint by ID (used for voting)
    public Complaint findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
    }
}
