import { collection, getDocs, getFirestore } from "firebase/firestore";
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
    
    const leaderboardElements = loaded ? leaderboard[0].scores.map(score => {
        return (
            <div>
                <p>{score.name}</p>
                <p>{score.time}</p>
            </div>
        )
    }) : <p></p>

    return (
        <div>
            {leaderboardElements}
        </div>
    )
}