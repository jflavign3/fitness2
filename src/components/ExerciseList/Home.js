import { useState, useEffect } from 'react';
import "../../App.scss";
import "./home.scss";
import {GetAllExercises} from "../../Exercises";
import {GetAllExerciseDetails} from "../../DAL/ExerciseDetails";
import {GetProgramsByUserId} from "../../Program";
import List from "./List";
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { FaSpinner } from "react-icons/fa";

const Home = () => {

  const [exercises, setExercises] = useState([]);  
  const [isLoaded, setIsLoaded] = useState(false);  
  const [userName, setUserName] = useState("");  
  const [alignment, setAlignment] = useState("1");
  
  const [isToday, setIsToday] = useState(true);

  const handleToggleChange = (event, i) => {
    let day = Number(i);
    const d = new Date();
    
    setIsToday(day === d.getDay());
    setAlignment(day);
    GetHomeData(day);
  };


  const GetHomeData = async (day) => {
    setIsLoaded(false);
    var userId = Number(sessionStorage.getItem("__userId"));

    console.log(`Getting home data for day `+ day);
     //try to get db stuff here
     let allExercises = await GetAllExercises();
     let details = await GetAllExerciseDetails();
     //console.log('all details: ' + JSON.stringify(details));
     let todayExercises = [];
 
     //const d = new Date();
     //var day = d.getDay();
      let programs = await GetProgramsByUserId(userId);   
      var todayProgram = programs.filter(x=>x.weekday === day);  

      todayProgram.forEach(programItem => {
        
        var exercise = allExercises.filter(x=>x._id === programItem.exerciseId)[0];
        if (exercise == null){
          console.log("Error with program:" + JSON.stringify(todayProgram));
          return;
        }
       // console.log('current exercise: ' + JSON.stringify(exercise));
        var currentProgram = programs.filter(x=>x.userId === userId && x.exerciseId === programItem.exerciseId && x.weekday === day)[0];
        //console.log('current user exercises: ' + JSON.stringify(currentUserExercise));
       // exercise.ddd =1;
       // debugger;
        if (currentProgram){
           let currentDetails = details.filter(x=>x.ProgramId === currentProgram._id);
           exercise.details = currentDetails;
           exercise.program = programItem;           
           todayExercises.push(exercise);
        }
      });

      console.log("Setting programs ");// + JSON.stringify(todayExercises));
 
      setExercises(todayExercises);
      setIsLoaded(true);
    }

    useEffect(() => {
      
      console.log("HOME - get data");
      
     const d = new Date();
     let day = d.getDay();
     console.log("HOME - set day " + day);
     setAlignment(day);
      setUserName(sessionStorage.getItem("userName"));   
      GetHomeData(day);
    },[]);

    //debugger;
  return (    
    <main>    
      <section className='container'>
        
        {(isLoaded) ? <>
        <div className='HomeTitle'>Bonjour {userName}.</div>
        {(isToday) && <div className='HomeTitle'>You have {exercises.length} exercises today</div>} </> :
        (<div className='HomeTitle'>Bonjour {userName}. Getting your activities...
        {/* <FaSpinner icon="spinner" className="spinner" />*/}
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
        </div>)}
      
        <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
    >
      <ToggleButton value="1">L</ToggleButton>
      <ToggleButton value="2">M</ToggleButton>      
      <ToggleButton value="3">M</ToggleButton>
      <ToggleButton value="4">J</ToggleButton>   
      <ToggleButton value="5">V</ToggleButton>
      <ToggleButton value="6">S</ToggleButton>   
      <ToggleButton value="0">D</ToggleButton>        
  </ToggleButtonGroup>

        {exercises.length > 0 &&
        (<List exercises={exercises} />)}
        {(exercises.length === 0 && isLoaded) &&
           (<img src={'./images/rest.png'} alt='rest' className='img' />)}
        
     
       
      </section>
    </main>
  );
};

export default Home;
