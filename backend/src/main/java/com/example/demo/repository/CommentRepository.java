package com.example.demo.repository;

import com.example.demo.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByComplaintId(Long complaintId);
    // Count the comments by complaint ID
    long countByComplaintId(Long complaintId);
}
