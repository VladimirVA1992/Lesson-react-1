import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyAMKV2giRVf9v-uee4ztWtxJ-jLw6GakLM",
	authDomain: "myproject-64160.firebaseapp.com",
	projectId: "myproject-64160",
	storageBucket: "myproject-64160.appspot.com",
	messagingSenderId: "548749026981",
	appId: "1:548749026981:web:7b7bf329d2225f96e58f4c",
	databaseURL:
		"https://myproject-64160-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
