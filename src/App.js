import { useState, useEffect } from 'react';
import List from './components/ExerciseList/List';
import "./App.scss";
import MenuBar from "./components/MenuBar/MenuBar";
//import GetAll from "./DAL/Exercises";
import {GetAllExercises} from "./Exercises";
import {GetAllUsers} from "./Users";
import Login from './components/Login/Login';




function App() {
  const [exercises, setExercises] = useState([]);  
  const [users, setUsers] = useState([]);  
  const [userId, setUserId] = useState(0);  

  const GetData = async () => {
 
    //debugger;
   
    let allUsers = await GetAllUsers();
    setUsers(allUsers);    
  
    let allExercises = await GetAllExercises();
    setExercises(allExercises);    

  };

  console.log('user id:' + (window.sessionStorage.getItem("userId")));

  useEffect(() => {
    
  setUserId(window.sessionStorage.getItem("userId"));
    GetData();  
}, []);



  return (   

<>
    {
        !userId 
          ? <Login users={users}></Login>
          : (
           

    <main>
    <div className="leftMenuForBigScreen">
      <MenuBar></MenuBar>
    </div>

    <section className='container'>
        <h3>{exercises.length} exercises today</h3>
        
        <List exercises={exercises} />
        <button
          type='button'
          className='btn btn-block'
          onClick={() => setExercises([])}
        >
          Lets do it
        </button>
      </section>

      <div id="bottomMenuForSmallScreen">
        <div id="spacer"></div>
        <MenuBar></MenuBar>
      </div>

    </main>)}
    </>
    )
}

export default App;
