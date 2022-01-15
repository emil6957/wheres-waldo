import { useState } from "react";
import "./Game.css";

export default function Game( {level } ) {
    const [currentCharater, setCurrentCharater] = useState("");
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

    function handleClick(e) {
        setDisplayDropdown(prevBool => !prevBool);
        setPositionX(`${((e.clientX / window.innerWidth) * 100) + 0.1}%`); // Adding 0.1 to each axis so that it doesnt instantly hover over the first option in dropdown
        setPositionY(`${((e.clientY / window.innerHeight) * 100) + 0.1}%`);
        console.log(e);
    }

    function checkForFind(charater) {
        if(charater === currentCharater) {
            console.log("Win");
        }
    }

    const styles = {
        display: displayDropdown ? "block" : "none",
        left: positionX,
        top: positionY,
    }

    const dropDownOptions = level.charaters.map(charater => <p onClick={() => checkForFind(charater)} className="dropdown__item">{charater}</p>)

    return (
        <div onClick={(e) => handleClick(e)} className="game">
            <div onClick={() => setCurrentCharater("waldo")} className="box"></div>
            <img onClick={() => setCurrentCharater("")} className="level__img" src={level.map} alt="Wheres waldo level" />
            <div className="game__dropdown" style={styles}>
                {dropDownOptions}
            </div>
        </div>
    )
}