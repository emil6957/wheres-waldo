import "./Header.css";
import waldoHeader from "../../Images/waldo.png";
import waldo from "../../Images/waldo.jpg";
import wenda from "../../Images/wenda.jpg";
import { useState } from "react";

export default function Header({ data }) {
    const [displayCharacters, setDisplayCharacters] = useState(false);

    const characters = data[0].characters.map(character => {
        let img;
        switch(character) {
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
                <img className="character__image" src={img} alt={character} />
                <p className="character__name">{character}</p>
            </div>
        )
    })
       
    return (
        <header>
            <div className="header__title">
                <img className="title__image" src={waldoHeader} alt="waldo" />
                <h2 className="title__text">Wheres Waldo</h2>
            </div>
            <div className="header__dropdown">
                <div onClick={() => setDisplayCharacters(prevBool => !prevBool)} className="dropdown__container">
                    <p className="characters-left">{data[0].characters.length}</p> 
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