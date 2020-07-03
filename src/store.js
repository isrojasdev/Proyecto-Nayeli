//integracion de firestore en el proyecto
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

// configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyCnQ_tfWTUGioabsgbpiIndhG7ol7xvpQA",
    authDomain: "sistemasexpertos-99e46.firebaseapp.com",
    databaseURL: "https://sistemasexpertos-99e46.firebaseio.com",
    projectId: "sistemasexpertos-99e46",
    storageBucket: "sistemasexpertos-99e46.appspot.com",
    messagingSenderId: "74965784697",
    appId: "1:74965784697:web:c04ea165dfea070a6ddca8"
}

//configuracion de react-redux
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

// inicializar firebase
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

// crear el anlace con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// state inicial
const initialState = {};

//crear el store
const store = createStoreWithFirebase(rootReducer, initialState)


export default store;