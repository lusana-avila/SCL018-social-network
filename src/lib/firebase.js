/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

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
  updateProfile,

} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  Timestamp,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,

} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js';

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
export const auth = getAuth(app);
const db = getFirestore(app); // esta es la base de datos
export const provider = new GoogleAuthProvider();

export const createUser = (email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      updateProfile(auth.currentUser, {
        name: auth.currentUser.displayName,
      });

      if (user != null) {
        sendEmailVerification(auth.currentUser)
          .then(() => {
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
};

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified === true) {
        window.location.hash = '#/home';
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
};

// Método para loguear a usuario con su cuenta de gmail
export const googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.hash = '#/home';
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// Cierre de sesión
export const closeSession = () => signOut(auth)
  .then(() => {
    window.location.hash = '#/login';
  }).catch((error) => {
  });

// Observador de estado
export const observer = () => {
  onAuthStateChanged(auth, (user) => {
    if ((user !== null || undefined) && user.emailVerified === true) {
      const uid = user.uid;
      console.log('user is signed in');
    } else if (window.location.hash === '#/home') {
      closeSession();
      console.log('user is signed out');
    }
  });
};

const postDate = Timestamp.fromDate(new Date());

export const addPostToCollection = async (a, b) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    userId: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    title: a,
    description: b,
    postDate: Date(Date.now()),
    likes: [],
    likesCounter: 0,
  });
  console.log('Document written with ID: ', docRef.id);
  return docRef;
};

// la siguiente función activa "objetos de escucha de instantáneas" al momento de escribir
export const readData = (collectionName, callback) => {
  const q = query(collection(db, collectionName), orderBy('postDate', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((_doc) => {
      posts.push({ ..._doc.data(), id: _doc.id });
    });
    callback(posts);
  });
};

export const deleteData = async (id) => {
  console.log(id);
  const confirm = window.confirm('¿Quieres eliminar esta publicación?');
  if (confirm) {
    await deleteDoc(doc(db, 'posts', id));
  }
};

export const updateLikes = async (id) => {
  const userIdentifier = auth.currentUser.uid;
  const postRef = doc(db, 'posts', id);
  const docSnap = await getDoc(postRef);
  const postData = docSnap.data();
  const likesCount = postData.likesCounter;

  if ((postData.likes).includes(userIdentifier)) {
    await updateDoc(postRef, {
      likes: arrayRemove(userIdentifier),
      likesCounter: likesCount - 1,
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(userIdentifier),
      likesCounter: likesCount + 1,
    });
  }
};
