// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSZSGGEANePqfxr3bZMr8x0QPT8rhDXlQ",
    authDomain: "agme-77aa6.firebaseapp.com",
    databaseURL: "https://agme-77aa6-default-rtdb.firebaseio.com",
    projectId: "agme-77aa6",
    storageBucket: "agme-77aa6.firebasestorage.app",
    messagingSenderId: "1046914109128",
    appId: "1:1046914109128:web:89e8b79fbc98e7fea1dffd",
    measurementId: "G-QE9L0P0T73"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

// Function to display a message
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Handle User Sign-Up
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const profile = document.getElementById('profile').value;
  const firstName = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if(profile === 'disable_selected') {
    showMessage('please select a valid profile', 'SignUpMessage');
    return;
  }


  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        firstName: firstName,
        email: email,
        profile: profile,
        userId: user.uid,
      };

      const userRef = ref(db, `users/${user.uid}`);
      set(userRef, userData)
        .then(() => {
          showMessage('Account Created Successfully', 'signUpMessage');
        })
        .catch((error) => {
          console.error("Error writing to database", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});

// Handle User Login
const signIn = document.getElementById('loginButton');
signIn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Admin Default Credentials
  const adminEmail = 'admin123@gmail.com';
  const adminPassword = 'admin123';

  if (email === adminEmail && password === adminPassword) {
    showMessage('Admin Login Successful', 'signInMessage');
    localStorage.setItem('isAdmin', true);
    window.location.href = 'admin.html';
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem('loggedInUserId', userCredential.user.uid);
        window.location.href = 'index.html';
      })

      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        } else if (errorCode === 'auth/user-not-found') {
          showMessage('Account does not exist', 'signInMessage');
        } else {
          showMessage('Error during login', 'signInMessage');
        }
      });
  }
});
