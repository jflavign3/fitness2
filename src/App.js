import { useState } from 'react';
import "./App.scss";
import MenuBar from "./components/MenuBar/MenuBar.js";

function App() {
  const [exercises, setExercises] = useState();
  
  return (
   
    <main>

    <div className="leftMenuForBigScreen">
      <MenuBar></MenuBar>
    </div>
    </main>
  )
}

export default App;
