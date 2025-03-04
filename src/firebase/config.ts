// Fichier de configuration Firebase
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "VOTRE_API_KEY",
  authDomain: "crisis-management-app.firebaseapp.com",
  projectId: "crisis-management-app",
  storageBucket: "crisis-management-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
