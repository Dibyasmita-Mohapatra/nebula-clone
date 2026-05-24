// src/firebase/config.ts

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlfnn1qJnbbtHwXe7A1QLS-37FkQ5woRI",

  authDomain: "nebula-3423c.firebaseapp.com",

  projectId: "nebula-3423c",

  storageBucket:
    "nebula-3423c.firebasestorage.app",

  messagingSenderId:
    "1076364860158",

  appId: "1:1076364860158:web:8e2e922360c7783998a3a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);