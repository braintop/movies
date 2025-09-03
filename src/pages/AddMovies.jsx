import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { addMovie } from "../api/moviesApi";


export default function AddMovies() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return;
        try {
            await addMovie(title, description);
            setTitle("");
            setDescription("");
            navigate("/movies");
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login", { replace: true });
            } else {
                setLoading(false);
            }
        });
        
        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Add Movies</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Movie Title" />
                <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Movie Description" />
                <button type="submit">Add Movie</button>
            </form>
        </div>
    )
}
