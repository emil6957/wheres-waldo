import level1 from "./Images/2687205.png";
import { initializeApp } from "firebase/app"
import Game from "./Components/Game/Game";
import Header from "./Components/Header/Header";

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
  return (
    <div className="App">
      <Header />
      <Game level={level} />
    </div>
  );
}

export default App;
