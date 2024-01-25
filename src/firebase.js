import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC21WTm8Kxuq_MknW1D9gfmO1yRcbNTK6Q",
  authDomain: "smart-services-1da9b.firebaseapp.com",
  projectId: "smart-services-1da9b",
  storageBucket: "smart-services-1da9b.appspot.com",
  messagingSenderId: "830214780663",
  appId: "1:830214780663:web:9fae37e7d0c4fb278045f2",
  measurementId: "G-XSZP23C6RX",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage }; // Corrected export
