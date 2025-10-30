# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `edlight-eslp` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" icon (</>) 
4. Register app with name: `edlight-eslp-web`
5. Copy the Firebase configuration object

## Step 4: Create Environment Variables

Create a file named `.env.local` in your project root with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Replace the values with your actual Firebase project credentials.

## Step 5: Set Up Firestore Security Rules

In Firebase Console > Firestore Database > Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to ESLP applications
    match /eslp_applications/{document} {
      allow read, write: if true; // For development - restrict in production
    }
  }
}
```

## Step 6: Test the Integration

1. Run your Next.js app: `npm run dev`
2. Go to the ESLP application form
3. Fill out and submit the form
4. Check Firebase Console > Firestore Database to see the data

## Production Security Rules

For production, update Firestore rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /eslp_applications/{document} {
      allow write: if true; // Allow form submissions
      allow read: if false; // Restrict reading (admin only)
    }
  }
}
```
