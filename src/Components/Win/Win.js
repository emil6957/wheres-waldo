import { useState } from "react";
import Leaderboard from "../Leaderboard/Leaderboard";
import "./Win.css";

export default function Win() {
    const [userName, setUserName] = useState("Anonymous");

    return (
        <div className="win">
            <h3 className="win__text">You Win!</h3>
            <Leaderboard />
            <input className="win__input" type="text" placeholder="Enter Name..." />
        </div>
    )
}