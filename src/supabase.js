// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB9CvEI6-b6k1swdpYuB9ngfJcN70firiE",
//   authDomain: "agenda-app-ed54f.firebaseapp.com",
//   projectId: "agenda-app-ed54f",
//   storageBucket: "agenda-app-ed54f.firebasestorage.app",
//   messagingSenderId: "917843577264",
//   appId: "1:917843577264:web:b27666ebb980dd2732ae75"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const storage = getStorage(app);

import { createClient }
from "@supabase/supabase-js";

const supabaseUrl =
  "https://eggfkftmqrbhdmaedmza.supabase.co";

const supabaseKey =
  "sb_publishable_p4hnijZLd4Rk9ZfKkkUdVA_B4u7Ppvg";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );