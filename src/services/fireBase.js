import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const fireApp = initializeApp({
    apiKey: "AIzaSyA9BZVm5fFC5MTlcinTLtm-JwD-gUhnKSA",
    authDomain: "white-minutia-401619.firebaseapp.com",
    databaseURL: "https://white-minutia-401619-default-rtdb.firebaseio.com",
    projectId: "white-minutia-401619",
    storageBucket: "white-minutia-401619.appspot.com",
    messagingSenderId: "131773130546",
    appId: "1:131773130546:web:fb9370123cf91b0cc5d92b",
    measurementId: "G-KS78L6NZXV"
});
const db = getFirestore(fireApp);

export {db};
