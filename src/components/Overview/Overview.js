import React from 'react';
import {GetAllExercises} from "../../Exercises";
import { useState, useEffect } from 'react';
import {GetProgramsByUserId} from "../../Program";
import DayView from './DayView';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {getToday, getMonday, getSunday, getDayName} from "../../Common";
import { BiHide } from "react-icons/bi";

const Overview = () => {


  const [exercises, setExercises] = useState([]);  
  const [isLoading, setIsLoading] = useState(false);  

  const cloneExercise = (exercise) => {
    let e = {};
    e.id = exercise.id;
    e.image = exercise.image;
    e.name = exercise.name;
    e.type = exercise.type;

    return e;
  }

  function compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  
  const GetWeekData = async () => {   

    setIsLoading(true);
    var userId = Number(sessionStorage.getItem("__userId"));

    console.log(`Getting week data`);
     //try to get db stuff here
     let allExercises = await GetAllExercises();
    
     
     let weekExercises = [];
     

      let programs = await GetProgramsByUserId(userId);   
      //loop program for each day
      
      for (var x = 1; x<8;x++){
        
        let day = x;
        let dayExercises = [];
        if (day===7){
          day=0;
        }
        let dayPrograms = programs.filter(x=> x.weekday === day);
        dayPrograms.forEach(element => {
                    
          let exercise = allExercises.filter(x=>x._id === element.exerciseId)[0];      
          let clone = cloneExercise(exercise); 
          let lastCompletionDate = new Date(element.lastCompletionDate);
          clone.isCompleted = (lastCompletionDate >= getMonday() && lastCompletionDate <= getSunday());
          dayExercises.push(clone);          
        });
        
        dayExercises.sort( compare );

        let e = {};
        e.day = getDayName(day, false);
        e.exercises = dayExercises;

        weekExercises.push(e);
      }

      //debugger;
    
      setExercises(weekExercises);
      setIsLoading(false);
    }

    useEffect(() => {
      
      console.log("Week - get data");
  
      GetWeekData();
    },[]);

      return (    
        <div className='main'>
          
  <section className='container'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}        
      >
        <CircularProgress color="inherit" />
      </Backdrop>

          {exercises && exercises.map((week) => {
            
            console.log(JSON.stringify(week));
            
            return (
              <div>
              <div className='lineupTitle'>
              <div className='weekDay'>{week.day}</div>
              <BiHide size={'1.5rem'}/>
              </div>
              
            <DayView exercises={week.exercises} day={week.day} />
            </div>
            )
          }
          
          )}
      </section>
        </div>
      );
    };

export default Overview;