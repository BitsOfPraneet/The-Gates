The Gates - Spirit Carving 🎃
A full-stack, Halloween-themed user authentication system built with Firebase and Vanilla JavaScript.
Welcome to The Gates! This project is a complete, single-page web application that provides a full user authentication and profile management experience, all wrapped in an immersive and spooky Halloween theme.


✨ Features
This application demonstrates a full CRUD (Create, Read, Update, Delete) user cycle with modern, professional features.

User Authentication: Secure user signup and login using Firebase Authentication (Email & Password).

Forgot Password: "Lost your spirit?" functionality to send password reset emails.

Client-Side Validation: Robust, real-time checks for valid email formats and password strength.

Real-Time Profile Management: A dedicated profile page ("The Crypt") where users can update their bio and see changes reflected instantly without a page refresh, thanks to Firestore's real-time listener.

Optimized Image Uploads: Users can upload a profile picture ("Apparition"). The image is resized and compressed on the client-side before being uploaded to Firebase Storage for a fast and efficient experience.

Responsive & Thematic UI/UX: A mobile-first, dark-mode design with custom fonts, spooky animations, and a cohesive Halloween theme built with Tailwind CSS.

🛠️ Tech Stack
This project was built using a lightweight and powerful stack, focusing on a serverless architecture.

Frontend: HTML5, Tailwind CSS, Vanilla JavaScript (ES6+)

Backend: Google Firebase

Authentication: For user management.

Firestore Database: For storing user profile data in real-time.

Firebase Storage: For hosting user-uploaded profile pictures.

Deployment: Vercel

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need a code editor (like VS Code) and a web browser. No npm or node installation is required for this project.

Setup & Configuration
Clone the repository:

git clone [https://github.com/your-username/the-gates.git](https://github.com/your-username/the-gates.git)

Create a Firebase Project:

Go to the Firebase Console and create a new project.

Add a new Web App to your project to get your configuration keys.

Enable Firebase Services:

In the Firebase console, go to the "Build" section.

Enable Authentication and select the "Email/Password" sign-in method.

Enable Firestore Database and create it in Test Mode.

Enable Firebase Storage and create it using the default settings.

Connect Your Keys:

In your Firebase project settings, find your firebaseConfig object.

Open the index.html file in your code editor.

Navigate to the <script type="module"> tag at the bottom of the file.

Replace the placeholder firebaseConfig object with your actual keys.

Run Locally:

The easiest way to run the project is with a live server extension. In VS Code, right-click the index.html file and select "Open with Live Server."

🌐 Deployment
This project was deployed to the web using Vercel.

The process is straightforward:

Push your code to a GitHub repository.

Connect your GitHub account to Vercel.

Import the project from your GitHub repository.

Vercel automatically detects the static HTML/CSS/JS setup and deploys the site. No special build configuration is needed.
