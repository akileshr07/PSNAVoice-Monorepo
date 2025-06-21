package com.example.demo.controller;

import com.example.demo.model.Complaint;
import com.example.demo.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    @Autowired
    private ComplaintService service;

    // ✅ GET all complaints
    @GetMapping
    public List<Complaint> getAll() {
        return service.getAll();
    }

    // ✅ POST a new complaint
    @PostMapping
    public Complaint save(@RequestBody Complaint complaint) {
        return service.save(complaint);
    }

    // ✅ PATCH a vote (accepts upvotes and downvotes from frontend)
    @PatchMapping("/{id}/vote")
    public Complaint updateVotes(@PathVariable Long id, @RequestBody Complaint updatedData) {
        Complaint existing = service.findById(id);
        existing.setUpvotes(Math.max(0, updatedData.getUpvotes()));
        existing.setDownvotes(Math.max(0, updatedData.getDownvotes()));
        return service.save(existing);
    }

}
