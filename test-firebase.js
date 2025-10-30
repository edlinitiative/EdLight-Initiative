// Test Firebase Connection
// Run this with: node test-firebase.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAZfEK1v56sc3XWrEsUaCiaJt2CqPXKb1U",
  authDomain: "kazino-7e373.firebaseapp.com",
  projectId: "kazino-7e373",
  storageBucket: "kazino-7e373.firebasestorage.app",
  messagingSenderId: "701247050480",
  appId: "1:701247050480:web:51f0eb74c6826c3cb02835"
};

async function testFirebase() {
  try {
    console.log('🔥 Testing Firebase connection...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('✅ Firebase initialized successfully');
    console.log('📊 Project ID:', firebaseConfig.projectId);
    
    // Test adding a document
    const testData = {
      test: true,
      message: 'Firebase connection test',
      timestamp: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'test'), testData);
    console.log('✅ Test document added with ID:', docRef.id);
    
    console.log('\n🎉 Firebase is working correctly!');
    console.log('📝 You can now use the ESLP application form.');
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    console.log('\n🔧 Make sure to:');
    console.log('1. Enable Firestore Database in Firebase Console');
    console.log('2. Set up Firestore security rules');
    console.log('3. Check your internet connection');
  }
}

testFirebase();
