/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// Import the functions you need from the SDKs you need

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,

} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

import {
  getFirestore, collection, addDoc, getDocs,
} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCOgBS0CawN0G1YbGD9y-Yd8Fx1AyWfQl0',
  authDomain: 'kambalache-scl018.firebaseapp.com',
  projectId: 'kambalache-scl018',
  storageBucket: 'kambalache-scl018.appspot.com',
  messagingSenderId: '885086818843',
  appId: '1:885086818843:web:3778a32b3a0f5888dbdebe',
  measurementId: 'G-ZFMM9GB4C3',
};

// constantes que guardan datos de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Método para registrar un usuario nuevo
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => { // aquí en el then debería ir lo que sucede luego de registrarse
    // Signed in
    const user = userCredential.user;
    console.log(user);
    // función que envía email de verificación

    if (user != null) {
      sendEmailVerification(auth.currentUser)
        .then((configuracion) => {
          console.log('se envió email');
          alert('Hemos enviado un enlace de verificación a tu email');
          window.location.hash = '#/login';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });

// Método para loguear un usuario ya registrado
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    if (user.emailVerified === true) {
      window.location.hash = '#/home';
      console.log(user);
    } else {
      alert('Debes verificar tu email para poder ingresar');
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });

export const provider = new GoogleAuthProvider();

// Método para loguear a usuario con su cuenta de gmail
export const googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.hash = '#/home';

    // ...
    })
    .catch((error) => {
    // Handle Errors here.

    // ...
    }).catch((error) => {
    // Handle Errors here.

      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};

// Cierre de sesión
export const closeSession = () => signOut(auth)
  .then(() => {
  // Sign-out successful.
    window.location.hash = '#/login';
  }).catch((error) => {
  // An error happened.
  });

// Observador de estado
export const observer = () => {
  onAuthStateChanged(auth, (user) => {
    if ((user !== null || undefined) && user.emailVerified === true) {
      const uid = user.uid;
      console.log('user is signed in');
    } else {
      window.location.hash = '#/login';
      console.log('user is signed out');
    }
  });
};

// Crear post
// Add a new document with a generated id.
export const post = async (title, description) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    title,
    description,
  });
  console.log('Document written with ID: ', docRef.id);
  return docRef;
};

export const readData = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
};
