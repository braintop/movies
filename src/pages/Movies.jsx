import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getMovies } from "../api/moviesApi";


export default function Movies() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    
    const fetchMovies = async () => {
        try {
            const data = await getMovies();
            setMovies(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login", { replace: true });
            } else {
                setLoading(false);
                fetchMovies();
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
            <h1>Movies</h1>
            {movies.length === 0 ? (
                <p>No movies yet.</p>
            ) : (
                <ul>
                    {movies.map((m) => (
                        <li key={m.id}>
                            <strong>{m.title}</strong> - {m.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
