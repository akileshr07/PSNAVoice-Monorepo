package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints/{complaintId}/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // ✅ GET all comments for a complaint
    @GetMapping
    public List<Comment> getComments(@PathVariable Long complaintId) {
        return commentService.getByComplaintId(complaintId);
    }

    // ✅ POST a new comment under a complaint
    @PostMapping
    public Comment addComment(@PathVariable Long complaintId, @RequestBody Comment comment) {
        comment.setComplaintId(complaintId);
        return commentService.save(comment);
    }

    // ✅ POST a vote on a comment (upvote or downvote)
    @PostMapping("/{commentId}/vote")
    public Comment voteComment(@PathVariable Long complaintId, @PathVariable Long commentId, @RequestParam String type) {
        Comment comment = commentService.findById(commentId);
        if ("up".equalsIgnoreCase(type)) {
            comment.setUpvotes(comment.getUpvotes() + 1);
        } else {
            comment.setDownvotes(comment.getDownvotes() + 1);
        }
        return commentService.save(comment);
    }
}
