
Student Feedback Platform 🚀

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
🔹 Backend Setup
bash
Always show details

cd backend
./gradlew bootRun


/frontend
│
├── public/
├── src/
│   ├── components/        # Reusable UI elements
│   ├── pages/             # Home, ComplaintForm, Comments
│   ├── services/          # API service calls
│   ├── hooks/             # Custom React hooks
│   ├── context/           # Global state management
│   └── App.jsx, main.jsx


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
GET	/api/comments/{id}	Get comments for a complaint

🔢 Voting & Sorting Logic
A Reddit-inspired algorithm ranks posts by:

ini
Always show details

Copy
score = (upvotes - downvotes) + (comments × 2) + 100 / (age in hours + 2)
Post Filtering Rules:
❌ If downvotes ≥ 60% of total votes → Remove complaint

❌ If (votes + comments < 5) and post > 30 days old → Remove complaint

Cookies are used to prevent multiple votes per user.
 







