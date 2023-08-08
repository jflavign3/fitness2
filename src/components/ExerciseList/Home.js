import { useState, useEffect } from 'react';
import "../../App.scss";
import {GetAllExercises} from "../../Exercises";
import {GetAllExerciseDetails} from "../../DAL/ExerciseDetails";
import {GetAllUserExercises} from "../../DAL/UserExercise";
import {GetProgramsByUserId} from "../../Program";
import List from "./List";

const Home = () => {

  const [exercises, setExercises] = useState([]);  

  const GetHomeData = async () => {
    
    var userId = Number(sessionStorage.getItem("__userId"));

    console.log(`Getting home data`);
     //try to get db stuff here
     let allExercises = await GetAllExercises();
     let userExercises = await GetAllUserExercises();
     let details = await GetAllExerciseDetails();
     //console.log('all details: ' + JSON.stringify(details));
     let todayExercises = [];
 
     const d = new Date();
     var day = 1;//d.getDay();
      let programs = await GetProgramsByUserId(userId);   
      var todayProgram = programs.filter(x=>x.weekday === day);  

    //  debugger;
      todayProgram.forEach(programItem => {
        let exercise = allExercises.filter(x=>x.id === programItem.exerciseId)[0];
       // console.log('current exercise: ' + JSON.stringify(exercise));
        let currentUserExercise = userExercises.filter(x=>x.userId === userId && x.exerciseId === programItem.exerciseId)[0];
        //console.log('current user exercises: ' + JSON.stringify(currentUserExercise));
        
        if (currentUserExercise){
           let currentDetails = details.filter(x=>x.UserExerciseId === currentUserExercise.id);
           todayExercises.details = currentDetails;
           todayExercises.push(exercise);
        }
      });

      console.log("Setting program: " + JSON.stringify(todayExercises));
 
      setExercises(todayExercises);
    }

    useEffect(() => {
      console.log("HOME - get home data");
      GetHomeData();
    },[]);

    //debugger;
  return (    
    <main>    
      <section className='container'>
        <h3>{exercises.length} exercises today</h3>
        {exercises ?
        (<List exercises={exercises} />) : (<> </>)}
     
       
      </section>
    </main>
  );
};

export default Home;
