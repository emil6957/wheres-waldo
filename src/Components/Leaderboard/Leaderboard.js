import { collection, getDocs, getFirestore } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState();
    const [loaded, setLoaded] = useState(false);

    const db = getFirestore();
    const leaderboardRef = collection(db, "leaderboard");
    function getLeaderboard() {
        getDocs(leaderboardRef)
        .then(snapshot => {
            let scores = [];
            snapshot.docs.forEach(doc => {
                scores.push({ ...doc.data(), id: doc.id })
            })
            console.log(scores);
            setLeaderboard(scores);
            setLoaded(true);
        })
    }
    
    useEffect(() => {
        getLeaderboard();
    }, [])
    
    const leaderboardElements = loaded ? leaderboard.map(player => {
        return (
            <div key={nanoid()}>
                <p>{player.name}</p>
                <p>{player.score}</p>
            </div>
        )
    }) : <p></p>

    return (
        <div>
            {leaderboardElements}
        </div>
    )
}