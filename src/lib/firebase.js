// @ts-nocheck

// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, } from 'firebase/auth'
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";
import Swal from 'sweetalert2'

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

        window.location.href = '/'

    } catch (error) {
        // Muestra un mensaje de error con SweetAlert2
        console.log(error)
    }
}

export async function createPurchase(email, pelicula, dia, hora, asientos, total) {
    try {
        // Guarda la información de la compra en Firestore
        await addDoc(collection(db, 'compras'), {
            email: email,
            pelicula: pelicula,
            dia: dia,
            hora: hora,
            asientos: asientos,
            total: total
        });

        // Muestra un mensaje de éxito con SweetAlert2
        Swal.fire({
            title: 'Compra realizada',
            text: 'Tu compra ha sido realizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = '/dashboard'
        })

    } catch (error) {
        return console.log(error)
    }
}