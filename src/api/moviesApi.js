import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export async function addMovie(title, description) {
    if (!title || !description) {
        throw new Error("Both title and description are required");
    }

    const docRef = await addDoc(collection(db, "movies"), {
        title,
        description,
        createdAt: serverTimestamp()
    });

    return { id: docRef.id };
}

export async function getMovies() {
    const snapshot = await getDocs(collection(db, "movies"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

