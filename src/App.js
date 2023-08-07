import { useState, useEffect } from 'react';
import List from './components/ExerciseList/List';
import "./App.scss";
import MenuBar from "./components/MenuBar/MenuBar";
//import GetAll from "./DAL/Exercises";
import {GetAllExercises} from "./Exercises";
import {GetAllExerciseDetails} from "./DAL/ExerciseDetails";
import {GetAllUserExercises} from "./DAL/UserExercise";
import {GetAllUsers} from "./Users";
import {GetProgramsByUserId} from "./Program";
import Login from './components/Login/Login';





function App() {
  const [exercises, setExercises] = useState([]);  
  const [users, setUsers] = useState([]);  
  //const [userId, setUserId] = useState(0);  
  const [isUserLogged, setIsUserLogged] = useState(false);  

  const GetData = async () => {
   
    let allUsers = await GetAllUsers();
    setUsers(allUsers);    
   
 
  };

  const SetCurrentUser = async (userId) => {
    
     console.log('user was selected. getting program');
     //setUserId(id);
     sessionStorage.setItem("__userId",userId);

     //try to get db stuff here
     let allExercises = await GetAllExercises();
     let userExercises = await GetAllUserExercises();
     let details = await GetAllExerciseDetails();
     console.log('all details: ' + JSON.stringify(details));
     let todayExercises = [];
 
     const d = new Date();
     var day = 1;//d.getDay();
      let programs = await GetProgramsByUserId(userId);   
      var todayProgram = programs.filter(x=>x.weekday === day);  

      debugger;
      todayProgram.forEach(programItem => {
        let exercise = allExercises.filter(x=>x.id === programItem.exerciseId)[0];
       // console.log('current exercise: ' + JSON.stringify(exercise));
        let currentUserExercise = userExercises.filter(x=>x.userId === userId && x.exerciseId === programItem.exerciseId)[0];
        //console.log('current user exercises: ' + JSON.stringify(currentUserExercise));
        
        if (currentUserExercise){
        let currentDetails = details.filter(x=>x.UserExerciseId === currentUserExercise.id);
        //console.log('current details: ' + JSON.stringify(currentDetails));
       // let details = [ {title:"Reps", value:46}, {title:"Sets", value:46}]
        exercise.details = currentDetails;     

        todayExercises.push(exercise);

        }
      });

      console.log("Setting program: " + JSON.stringify(todayExercises));
 
      setExercises(todayExercises);

     setIsUserLogged(true);
  };

  console.log('rerendering. user id:' + (window.sessionStorage.getItem("userId")));

  useEffect(() => {
    
  //setUserId(window.sessionStorage.getItem("userId"));
  GetData();  //get only users
  console.log('inside useEffect');
}, []);

//cannot put getPrograms in useEffect, beacaue of dependency on UserId..
if (isUserLogged){
  //debugger;
   // GetPrograms(userId);  
    
}

  return (   

<>  
    {
        !isUserLogged 
          ? <main> <section className='containerLogin'>
            <Login users={users} setCurrentUser={SetCurrentUser}></Login>
          </section></main>: (
           

    <main>
    <div className="leftMenuForBigScreen">
      <MenuBar></MenuBar>
    </div>

    <section className='container'>
        <h3>{exercises.length} exercises today</h3>
        
        <List exercises={exercises} />
       
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
