package com.example.demo.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Comment {
    @Id @GeneratedValue
    private Long id;
    private Long complaintId;
    private String content;
    private int upvotes;
    private int downvotes;
    private LocalDateTime timestamp;
}
