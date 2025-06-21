package com.example.demo.service;

import com.example.demo.model.Comment;
import com.example.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository repo;

    // ✅ Fetch all comments for a given complaint ID
    public List<Comment> getByComplaintId(Long id) {
        return repo.findByComplaintId(id);
    }

    // ✅ Save a comment and set current timestamp
    public Comment save(Comment comment) {
        comment.setTimestamp(LocalDateTime.now());
        return repo.save(comment);
    }

    // ✅ Find comment by ID (needed for voting)
    public Comment findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
    }
}
