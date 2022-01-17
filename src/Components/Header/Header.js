import "./Header.css";
import waldoHeader from "../../Images/waldo.png";
import waldo from "../../Images/waldo.jpg";
import wenda from "../../Images/wenda.jpg";
import { useState } from "react";

export default function Header({ data, gameWon }) {
    const [displayCharacters, setDisplayCharacters] = useState(false);

    const characters = data[0].characters.map(character => {
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
            <div className="character">
                <img className="character__image" src={img} alt={character.name} />
                <p className="character__name">{character.name}</p>
            </div>
        )
    })

    function getAmmountOfCharactersLeft() {
        let count = 0;
        data[0].characters.forEach(character => {
            if(character.beenFound === false) {
                count++;
            }
        })
        checkWin(count);
        return count;
    }

    function checkWin(count) {
        if(count === 0) {
            console.log("WIN");
            gameWon();
        }
    }
       
    return (
        <header>
            <div className="header__title">
                <img className="title__image" src={waldoHeader} alt="waldo" />
                <h2 className="title__text">Wheres Waldo</h2>
            </div>
            <div className="header__dropdown">
                <div onClick={() => setDisplayCharacters(prevBool => !prevBool)} className="dropdown__container">
                    <p className="characters-left">{getAmmountOfCharactersLeft()}</p> 
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