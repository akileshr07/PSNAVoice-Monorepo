package com.example.demo.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Complaint {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String department;
    private String content;
    private String authorName;
    private LocalDateTime timestamp;
    private int upvotes;
    private int downvotes;
}
