import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3vOlGMU-JmFdX_RyGsbPQlHY4ileJKpY",
  authDomain: "the-movie-vault-980ce.firebaseapp.com",
  projectId: "the-movie-vault-980ce",
  storageBucket: "the-movie-vault-980ce.appspot.com",
  messagingSenderId: "624425373149",
  appId: "1:624425373149:web:ad23abe166830cc338fa34",
  measurementId: "G-CKL57520X5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider(); // We can rename this googleProvider
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// DATABASES
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    // if user data doesn't exist
    // create/ set the document with the data from the userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // if user data exists
  // return userDocREf
  return userDocRef;
};

/**
 * Sign up functions
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in with email and password
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

/** SIGN OUT */
export const signOutUser = async () => {
  signOut(auth);
  window.location.reload(true);
};

/** Observer Pattern */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * TRANSFERRING OUR DATA COMPLETELY TO FIRESTORE INSTEAD OF RELYING ON A JSON FILE
 */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // We don't need db here because we got collectionRef from calling db
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("DONE WITH CATEGOREIS");
};

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, "new categories");

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

/**
 * Storing user's movie data.
 */
export const addMoviesToUserDocument = async (userAuth, movies = []) => {
  if (movies.length < 1) return;
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  movies.forEach(async (movie) => {
    await updateDoc(userDocRef, {
      movies: arrayUnion(`${movie.id}`),
    });
  });

  // if user data exists
  // return userDocREf
  return userDocRef;
};

export const removeMoviesFromUserDocument = async (userAuth, movies = []) => {
  if (movies.length < 1) return;
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  movies.forEach(async (movie) => {
    updateDoc(userDocRef, {
      movies: arrayRemove(`${movie.id}`),
    });
  });

  // if user data exists
  // return userDocREf
  return userDocRef;
};

export const getFavoritesIds = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data();

  const favoriteMoviesIds = userData.movies;

  return favoriteMoviesIds;
};

// A function that receives firebase user auth and returns the seenMovies array
export const getSeenMoviesIds = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data();

  const seenMoviesIds = userData.seenMovies;

  return seenMoviesIds;
};

// A function that receives firebase user auth and a movie id and creates a data field called seen movies in the user document
export const addSeenMoviesToUserDocument = async (userAuth, movies = []) => {
  if (movies.length < 1) return;
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  movies.forEach(async (movie) => {
    await updateDoc(userDocRef, {
      seenMovies: arrayUnion(`${movie.id}`),
    });

    return userDocRef;
  });

  // console.log("userDocRef", userDocRef);
  // console.log("movies", movies);
  return userDocRef;
};

export const removeSeenMoviesFromUserDocument = async (
  userAuth,
  movies = []
) => {
  if (movies.length < 1) return;
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  movies.forEach(async (movie) => {
    updateDoc(userDocRef, {
      seenMovies: arrayRemove(`${movie.id}`),
    });
  });

  // console.log("We removed it");

  return userDocRef;
};
