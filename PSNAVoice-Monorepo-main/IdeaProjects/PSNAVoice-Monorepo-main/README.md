# PSNA Student Feedback Platform 🚀

A digital platform to empower students of PSNA College to voice academic, facility, and campus-related complaints anonymously or openly—ensuring a transparent and responsive feedback system.

---

## 📌 Table of Contents

- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Voting & Sorting Logic](#voting--sorting-logic)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🧩 Problem Statement

Students often hesitate to raise concerns due to fear of exposure or lack of a proper channel. This platform solves that by providing an easy-to-use interface where complaints can be submitted **openly or anonymously**, and **engaged with publicly** through voting and comments.

---

## ✨ Features

- ✅ Post complaints anonymously or with name & department.
- ✅ Upvote/downvote system to highlight serious issues.
- ✅ Comment and reply under each complaint.
- ✅ Sorting mechanism inspired by Reddit’s Hot Ranking Algorithm.
- ✅ Automatic removal of spammy/low-quality complaints.
- ✅ Clean, responsive UI with Tailwind CSS and ReactJS.

---

## 🛠️ Tech Stack

| Category   | Technology                         |
|------------|------------------------------------|
| Frontend   | ReactJS, Tailwind CSS, Axios       |
| Backend    | Java, Spring Boot, Gradle          |
| Database   | MySQL                              |
| Hosting    | Localhost (can be deployed later)  |

---

## 🧪 Installation & Setup

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
cd backend
./gradlew bootRun
/backend
│
├── src/main/java/com/psna/
│   ├── config/            # Security config (optional)
│   ├── controller/        # REST API controllers
│   ├── service/           # Business logic
│   ├── repository/        # JPA repositories
│   ├── model/             # Entity classes
│   ├── dto/               # Data Transfer Objects
│   └── PSNAFeedbackApplication.java
🔁 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/complaints	Submit a new complaint
GET	/api/complaints	Get all complaints
PUT	/api/complaints/{id}/vote	Upvote/downvote a complaint
POST	/api/comments	Post a comment
GET	/api/comments/{id}	Get comments for a complaint🔢 Voting & Sorting Logic
A Reddit-inspired algorithm ranks posts by:

ini
Always show details

Copy
score = (upvotes - downvotes) + (comments × 2) + 100 / (age in hours + 2)
Post Filtering Rules:
❌ If downvotes ≥ 60% of total votes → Remove complaint

❌ If (votes + comments < 5) and post > 30 days old → Remove complaint

Cookies are used to prevent multiple votes per user.







```

# Project Summary: PSNA Student Feedback Platform
(Approx. 400 words)

The PSNA Student Feedback Platform is a digital complaints system designed to empower students to voice their concerns regarding academic, infrastructure, or administrative issues in a secure and constructive environment. Traditional complaint mechanisms in many institutions often discourage students from speaking up due to fear of exposure, lack of follow-up, or the absence of anonymity. This platform bridges that gap by enabling open or anonymous complaint submission while ensuring issues are appropriately highlighted and addressed.

At its core, the platform provides a user-friendly interface where students can submit their complaints either by identifying themselves or anonymously. Each submission includes a receiver (e.g., department or management), a short title (optional), and a detailed description (mandatory). The system also allows students to choose a custom recipient such as the Library or Cleaning Department, ensuring all campus areas are covered.

The complaint feed displays all submitted complaints in a sorted list based on a custom ranking algorithm. This algorithm prioritizes complaints with higher community engagement—measured via upvotes, downvotes, and comments—while also factoring in the post's age to keep the feed fresh and relevant. Posts that receive more than 60% downvotes or remain inactive for over 30 days are automatically removed to maintain quality and focus.

Each complaint includes interactive options like upvoting, downvoting, and a comment section where users can engage in discussions or suggest solutions. The comment system supports nested replies and individual comment voting, mimicking social platforms like Reddit or YouTube for familiarity.

From a technical perspective, the frontend is developed using ReactJS and Tailwind CSS, ensuring responsiveness and a modern UI/UX. The backend is built with Java (Spring Boot) and MySQL for robust performance and data handling. API integration is handled using Axios, with routing managed by React Router.

To manage voting without logins, the system uses browser cookies to store a user's vote per complaint, limiting users to a single upvote or downvote per post. While not foolproof (as users can clear cookies), it offers a lightweight, session-persistent solution.

The project aims to instill a culture of transparent feedback and collaborative problem-solving while ensuring user privacy and content moderation. It acts as a bridge between students and faculty/administration, promoting accountability and positive change within the college ecosystem.

TESTING
SPRING BOOT ERR-  https://chatgpt.com/share/681dd4ea-38fc-8001-8c1c-71d0d9f657a9
CONNECT FRO-BAC-  https://chatgpt.com/share/681dd549-f01c-8001-aee0-35a69bee6af7
ALGORITHM- https://chatgpt.com/share/682aca63-be04-8001-a324-a88d5e12b6c4
