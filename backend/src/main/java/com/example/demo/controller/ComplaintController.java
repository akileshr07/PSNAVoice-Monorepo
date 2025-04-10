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

    // ✅ PATCH a vote (upvote or downvote)
    @PatchMapping("/{id}/vote")
    public Complaint vote(@PathVariable Long id, @RequestParam String type) {
        Complaint complaint = service.findById(id);
        if ("up".equalsIgnoreCase(type)) {
            complaint.setUpvotes(complaint.getUpvotes() + 1);
        } else {
            complaint.setDownvotes(complaint.getDownvotes() + 1);
        }
        return service.save(complaint);
    }
}
