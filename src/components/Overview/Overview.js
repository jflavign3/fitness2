import React from 'react';
import {GetAllExercises} from "../../Exercises";
import { useState, useEffect } from 'react';
import {GetProgramsByUserId} from "../../Program";
import DayView from './DayView';
import {getToday, getMonday, getSunday, getDayName} from "../../Common";
//material
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//

const Overview = () => {

  const [exercises, setExercises] = useState([]);  
  const [isLoading, setIsLoading] = useState(false);  
  const [tricepEnabled, setTricepEnabled] = useState(false);  
  const [bicepEnabled, setBicepEnabled] = useState(true);  
  const [calfEnabled, setCalfEnabled] = useState(false);  
  const [quadEnabled, setQuadEnabled] = useState(false);  
  const [coreEnabled, setCoreEnabled] = useState(false);  
  const [harmstringEnabled, setHarmstringEnabled] = useState(false);  
  const [shoulderEnabled, setShoulderEnabled] = useState(false);  

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

  const filteredIn = (type)=>{

    switch(type){
      case 'calf': return calfEnabled;
      case 'tricep': return tricepEnabled ;
      case 'bicep': return bicepEnabled;
      case 'quad': return quadEnabled;
      default: return false;
     }
     


  }

  const test =()=>{
    setBicepEnabled(!bicepEnabled);
    //debugger;
    GetWeekData();
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
          if (filteredIn(exercise.type)){    
            let clone = cloneExercise(exercise); 
            let lastCompletionDate = new Date(element.lastCompletionDate);
            clone.isCompleted = (lastCompletionDate >= getMonday() && lastCompletionDate <= getSunday());
            dayExercises.push(clone);         
          } 
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
          
  <section className='containerMain'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}        
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <Chip label="bicep" color="primary" onClick={()=>test()} variant={bicepEnabled ? "" : "outlined"} />
        <Chip label="tricep" color="primary" onClick={()=>setTricepEnabled(!tricepEnabled)} variant={tricepEnabled ? "" : "outlined"} />
        <Chip label="quad" color="primary" onClick={()=>setQuadEnabled(!quadEnabled)} variant={quadEnabled ? "" : "outlined"} />
        {/*
        <Chip label="calf" color="calf" onClick={()=>setCalfEnabled(!calfEnabled)} variant={calfEnabled ? "" : "outlined"} />
        <Chip label="core" color="core" onClick={()=>setCoreEnabled(!coreEnabled)} variant={coreEnabled ? "" : "outlined"} />
        <Chip label="harmstring" color="harmstring" onClick={()=>setHarmstringEnabled(!harmstringEnabled)} variant={harmstringEnabled ? "" : "outlined"} />
        <Chip label="shoudler" color="shoulder" onClick={()=>setShoulderEnabled(!shoulderEnabled)} variant={shoulderEnabled ? "" : "outlined"} />
      */}

        </Stack>
      </Stack>

          {exercises && exercises.map((week) => {
            
            console.log(JSON.stringify(week));
            
            return (
             
              <div>  
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