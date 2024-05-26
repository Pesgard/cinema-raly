// @ts-nocheck

// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, } from 'firebase/auth'
import { getFirestore, doc,  setDoc, } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvmZq6nnysodZUMksFO4L45I6ExFDJuZc",
    authDomain: "raly-cinemas.firebaseapp.com",
    projectId: "raly-cinemas",
    storageBucket: "raly-cinemas.appspot.com",
    messagingSenderId: "82931632972",
    appId: "1:82931632972:web:f6477cc72c9b77b60ddde9",
    measurementId: "G-97NJX2Y1MG"
};
// Initialize Firebase
let firebaseApp;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}

// Obtener Auth
export const auth = getAuth(firebaseApp)

//Inicializar Firestore
const db = getFirestore(firebaseApp);

export async function createUser(email, password, firstName, lastName) {
    try {
        // Crea el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Enviar correo de verificación
        await sendEmailVerification(userCredential.user);

        const user = userCredential.user;

        // Guarda la información del usuario en Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: email,
            firstName: firstName,
            lastName: lastName
        });

        // Muestra un mensaje de éxito con SweetAlert2


        window.location.href = '/'

    } catch (error) {
        // Muestra un mensaje de error con SweetAlert2
    
    }
}
