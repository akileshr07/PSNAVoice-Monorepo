# PSNA Student Feedback Platform

A modern web application for students to submit and discuss feedback about various departments at PSNA College.

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Lucide React (for icons)
- js-cookie (for vote tracking)
- date-fns (for date formatting)

### Backend (to be implemented)
- Spring Boot (Java)
- Gradle
- MySQL Database
- Spring Security
- Spring Data JPA

## Features

- Submit feedback for different departments
- Upvote/downvote system for feedback and comments
- Comment and reply to feedback
- Sorting algorithm that prioritizes popular and recent feedback
- Automatic filtering of low-quality content

## Project Structure

The project is organized into modular components:

```
/src
  /components
    /CommentSection
      CommentForm.jsx
      CommentItem.jsx
      index.jsx
    /ComplaintCard
      ComplaintContent.jsx
      ComplaintFooter.jsx
      ComplaintHeader.jsx
      index.jsx
    /ComplaintFeed
      index.jsx
    /ComplaintForm
      index.jsx
    /VotingSystem
      index.jsx
    Footer.jsx
    Navbar.jsx
  /utils
    sortingAlgorithm.js
  /types
    index.js
  App.jsx
  main.jsx
  index.css
```

## Backend Integration Points

The frontend is designed to work with a Spring Boot backend. Key integration points:

1. **Complaints API**
   - `GET /api/complaints` - Fetch all complaints
   - `POST /api/complaints` - Submit a new complaint
   - `POST /api/complaints/{id}/vote` - Vote on a complaint

2. **Comments API**
   - `GET /api/complaints/{id}/comments` - Fetch comments for a complaint
   - `POST /api/complaints/{id}/comments` - Add a comment to a complaint
   - `POST /api/comments/{id}/vote` - Vote on a comment

## Deployment

- Frontend: Vercel
- Backend: AWS EC2
- Database: AWS RDS (MySQL)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Backend Development (TODO)

1. Set up Spring Boot project with Gradle
2. Create MySQL database schema
3. Implement RESTful API endpoints
4. Add authentication and authorization
5. Deploy to AWS

## Database Schema (Planned)

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,
  department VARCHAR(50) NOT NULL,
  author_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id VARCHAR(36) PRIMARY KEY,
  content TEXT NOT NULL,
  complaint_id VARCHAR(36) NOT NULL,
  author_id VARCHAR(36),
  parent_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id),
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (parent_id) REFERENCES comments(id)
);

CREATE TABLE votes (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  target_id VARCHAR(36) NOT NULL,
  target_type ENUM('complaint', 'comment') NOT NULL,
  is_upvote BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (user_id, target_id, target_type),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```