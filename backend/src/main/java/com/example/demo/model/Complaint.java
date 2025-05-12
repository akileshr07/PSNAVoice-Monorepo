package com.example.demo.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.Transient;  // Use @Transient for a non-persistent field

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
    private LocalDateTime createdAt;
    private int upvotes;
    private int downvotes;

    @Transient  // This annotation prevents commentCount from being stored in the database
    private long commentCount;  // Store the comment count here
}
