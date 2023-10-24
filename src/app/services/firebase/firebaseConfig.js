import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAs7UBIpMDBV1vZmeN0szF367ctLJMh7kM",
  authDomain: "pokewallet-a03ef.firebaseapp.com",
  databaseURL: "https://pokewallet-a03ef-default-rtdb.firebaseio.com",
  projectId: "pokewallet-a03ef",
  storageBucket: "pokewallet-a03ef.appspot.com",
  messagingSenderId: "819835590475",
  appId: "1:819835590475:web:89b975f9eb5b2fd0c87ace",
};

export const app = initializeApp(firebaseConfig);
