import "./Header.css";
import waldoHeader from "../../Images/waldo.png";
import waldo from "../../Images/waldo.jpg";
import wenda from "../../Images/wenda.jpg";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function Header({ data, gameWon }) {
    const [displayCharacters, setDisplayCharacters] = useState(false);
    const [charactersLeft, setCharactersLeft] = useState();

    const characters = data.characters.map(character => {
        let img;
        switch(character.name) {
            case "waldo": 
                img = waldo;
                break;
            case "wenda":
                img = wenda;
                break;
            default:
                img = null;
                break;
        }

        return (
            <div key={nanoid()} className="character">
                <img className="character__image" src={img} alt={character.name} />
                <p className="character__name">{character.name}</p>
            </div>
        )
    })

    function getAmmountOfCharactersLeft() {
        let count = 0;
        data.characters.forEach(character => {
            if(character.beenFound === false) {
                count++;
            }
        })
        checkWin(count);
        setCharactersLeft(count);
    }

    function checkWin(count) {
        if(count === 0) {
            console.log("WIN");
            gameWon();
        }
    }

    useEffect(() => {
        getAmmountOfCharactersLeft();
    })

       
    return (
        <header>
            <div className="header__title">
                <img className="title__image" src={waldoHeader} alt="waldo" />
                <h2 className="title__text">Wheres Waldo</h2>
            </div>
            <div className="header__dropdown">
                <div onClick={() => setDisplayCharacters(prevBool => !prevBool)} className="dropdown__container">
                    <p className="characters-left">{charactersLeft}</p> 
                    {displayCharacters && 
                        <div className="characters">
                            {characters}
                        </div>
                    } 
                </div> 
            </div>
        </header>
    )
}