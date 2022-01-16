import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react";
import "./Game.css";

export default function Game( { data, level } ) {
    const [displayTargetingBox, setDisplayTargetingBox] = useState(false);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

    function handleClick(e) {
        setDisplayTargetingBox(prevBool => !prevBool);
        setDisplayDropdown(prevBool => !prevBool);
        setPositionX(`${((e.clientX / window.innerWidth) * 100) + 0.1}%`); // Adding 0.1 to each axis so that it doesnt instantly hover over the first option in dropdown
        setPositionY(`${((e.clientY / window.innerHeight) * 100) + 0.1}%`);
    }

    function checkIfFound(char) {
        data[0].characters.forEach(character => {
            if(char === character) {
                const characterPositionX = parseFloat(data[0].positions[char].positionX);
                const characterPositionY = parseFloat(data[0].positions[char].positionY);
                const currentPositionX = parseFloat(positionX);
                const currentPositionY = parseFloat(positionY);
                if(characterPositionX - 1.2 <= currentPositionX && characterPositionX + 1.2 >= currentPositionX && characterPositionY - 3.5 <= currentPositionY && characterPositionY + 3.5 >= currentPositionY) {
                    console.log("Char found");
                }
            }
        })
    }

    const dropdownStyles = {
        left: positionX,
        top: positionY,
    }

    const targetBoxStyles = {
        left: positionX,
        top: positionY,
        transform: "translate(-50%,-50%)",
    }

    const dropDownOptions = level.characters.map(character => <p onClick={() => checkIfFound(character)} className="dropdown__item">{character}</p>)

    return (
        <div onClick={(e) => handleClick(e)} className="game">
            <img className="level__img" src={level.map} alt="Wheres waldo level" />
            {displayDropdown && 
                <div className="game__dropdown" style={dropdownStyles}>
                    {dropDownOptions}
                </div>
            }
            {displayTargetingBox && <div className="game__targeting-box" style={targetBoxStyles}/>}
        </div>
    )
}