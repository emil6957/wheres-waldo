import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore";
import level1 from "./Images/2687205.png";
import Game from "./Components/Game/Game";
import Header from "./Components/Header/Header";
import Win from "./Components/Win/Win";

const firebaseConfig = {
  apiKey: "AIzaSyDxrchOljCr1rWlH86XsGqmLKGyCxKx3rs",
  authDomain: "whereswaldo-a0622.firebaseapp.com",
  projectId: "whereswaldo-a0622",
  storageBucket: "whereswaldo-a0622.appspot.com",
  messagingSenderId: "58972944763",
  appId: "1:58972944763:web:ecb546c5cd4da44f7f25de"
}

initializeApp(firebaseConfig);

const level = {
  map: level1,
  characters: ["waldo", "wenda"],
}

function App() {
  const [hasWon, setHasWon] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState();

    function getData(level) {
        const db = getFirestore();
        const levelsRef = collection(db, "levels");
        getDocs(levelsRef)
          .then(snapshot => {
            const data = { ...snapshot.docs[level - 1].data(), id: snapshot.docs[level-1].id }
            setData(data);
            setLoaded(true);
        })
  }

  useEffect(() => {
    getData(1);
  }, [])

  function setCharacterFound(char) {
    setData(prevData => {
      const newCharacters = prevData.characters.map(character => character.name === char ? { ...character, beenFound: true } : character)
      return { ...prevData, characters: newCharacters }
    }) 
  }

  function gameWon() {
    setHasWon(true);
  }

  return (
    <div className="App">
      {loaded && <Header data={data} gameWon={gameWon} />}
      {loaded && <Game setCharacterFound={setCharacterFound} data={data} getData={getData} level={level} />}
      {hasWon && <Win />}
    </div>
  );
}

export default App;
