# SpookyAuth: A Halloween-Themed Firebase Authentication System

A hauntingly beautiful, professional-grade user authentication system with an immersive Halloween theme. Built with React, TypeScript, Tailwind CSS, and Firebase, featuring real-time profile updates, image uploads, and spooky aesthetics.

## 🎃 Live Demo

[Link to your Vercel deployment]

## ✨ Features

- **🔐 Complete Authentication System**
  - User registration ("Join the Coven")
  - User login ("Enter the Abyss") 
  - Password reset ("Lost your spirit?")
  - Real-time authentication state management

- **👻 Profile Management ("The Crypt")**
  - Real-time profile updates
  - Profile picture upload to Firebase Storage
  - Bio/legend editing with instant sync
  - User information display

- **🎨 Halloween Theme & UX**
  - Professional dark mode with blood-red accents
  - Spooky fonts (Creepster for headers, Lato for body)
  - Animated loading states with pumpkin/ghost SVGs
  - Themed error messages and notifications
  - Responsive design with Halloween aesthetics
  - Subtle background effects and hover animations

- **⚡ Real-time Features**
  - Instant profile picture updates via Firestore listeners
  - Real-time bio synchronization
  - Live authentication state changes

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore, Firebase Storage
- **Build Tool**: Vite
- **UI Components**: Custom Halloween-themed components
- **Icons**: Lucide React
- **Notifications**: Sonner (themed)

## 🚀 Setup & Configuration

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd spooky-auth
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "spooky-auth")
4. Follow the setup wizard (you can disable Google Analytics if not needed)

### 4. Enable Firebase Services

In your Firebase project:

1. **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Click "Save"

2. **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" (you can configure security rules later)
   - Select a location for your database

3. **Firebase Storage**:
   - Go to Storage
   - Click "Get started"
   - Choose "Start in test mode"
   - Select a location for your storage bucket

### 5. Get Your Firebase Configuration

1. In the Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname
5. Copy the `firebaseConfig` object that appears

### 6. Update the Code

1. Open `src/lib/firebase.ts`
2. Find the placeholder `firebaseConfig` object (around line 7)
3. Replace it with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 7. Run the Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:8080`

## 🌙 Deployment on Vercel

### Method 1: GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it as a Vite project
6. Click "Deploy"
7. Your site will be live at the provided Vercel domain

### Method 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy your project.

## 🔧 Environment Setup

No environment variables are needed! The Firebase configuration is included directly in the code. For production applications, consider using environment variables for sensitive configuration.

## 🎭 Customization

The app uses a comprehensive design system with Halloween-themed colors and components. You can customize:

- Colors in `src/index.css` (CSS custom properties)
- Component variants in individual component files
- Spooky messages and text throughout the app
- Background effects and animations

## 📱 Features Overview

### Authentication Flow
- **Sign Up**: Creates user account and Firestore document
- **Sign In**: Authenticates existing users
- **Password Reset**: Sends reset email via Firebase Auth
- **Auto-login**: Remembers authenticated state

### Profile Features
- **Profile Pictures**: Upload and display via Firebase Storage
- **Bio/Legend**: Editable text with real-time sync
- **User Info**: Display account details and creation date
- **Logout**: Clean sign-out with feedback

### Design Elements
- **Responsive**: Works on all device sizes
- **Accessible**: Proper labels and keyboard navigation
- **Animated**: Subtle Halloween-themed animations
- **Professional**: Production-ready code and UX

## 🐛 Troubleshooting

- **Firebase errors**: Check your Firebase configuration and ensure services are enabled
- **Build errors**: Run `npm install` to ensure all dependencies are installed
- **Styling issues**: Check that Tailwind CSS is properly configured

## 📄 License

This project is open source and available under the MIT License.

---

*Built with 🎃 for the Halloween season*