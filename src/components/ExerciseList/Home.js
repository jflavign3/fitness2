import { useState, useEffect } from 'react';
import "../../App.scss";
import "./home.scss";
import {GetAllExercises} from "../../Exercises";
import {GetAllExerciseDetails} from "../../DAL/ExerciseDetails";
import {GetProgramsByUserId} from "../../Program";
import List from "./List";
//material
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
////////


const Home = ({updatePoints}) => {

  const [exercises, setExercises] = useState([]);  
  const [isLoading, setIsLoading] = useState(false);  
  const [userName, setUserName] = useState("");  
  const [alignment, setAlignment] = useState("1");  
  const [isToday, setIsToday] = useState(true);
  const [dayOfWeek, setDayOfWeek] = useState("");


  
  const handleToggleChange = (event, i) => {
    let day = Number(i);
    const d = new Date();
    
    setIsToday(day === d.getDay());    
    setAlignment(day.toString());
    setDayOfWeek(getDayName(day));
    GetHomeData(day);
  };

  const getDayName = (id) =>{

    const d = new Date();
    if (d.getDay()===id){
      return "Aujourd'hui";
    }
    switch(id){
      case 1: return('Lundi');
      case 2: return('Mardi');
      case 3: return('Mercredi');
      case 4: return('Jeudi');
      case 5: return('Vendredi');
      case 6: return('Samedi');
      case 0: return('Dimanche');
     }
     

  }

  const GetHomeData = async (day) => {   
  
    setIsLoading(true);
    var userId = Number(sessionStorage.getItem("__userId"));

    console.log(`Getting home data for day `+ day);
     //try to get db stuff here
     let allExercises = await GetAllExercises();
     let details = await GetAllExerciseDetails();
     
     //console.log('all details: ' + JSON.stringify(details));
     let todayExercises = [];
 
      let programs = await GetProgramsByUserId(userId);   
      //debugger;
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
           let currentDetails = details.filter(x=>x.ProgramId === currentProgram._id && x.Value > 0);
           exercise.details = currentDetails;
           exercise.program = programItem;     
                 
           todayExercises.push(exercise);
        }
      });

      /*todayExercises.forEach((e) =>{
        console.log("Setting program" + JSON.stringify(e));
      });*/
      
      setExercises(todayExercises);
      setIsLoading(false);
    }

    useEffect(() => {
      
      console.log("HOME - get data");
      
     const d = new Date();
     let day = d.getDay();
     console.log("HOME - set day " + day);
      setDayOfWeek(getDayName(day));
      setAlignment(day.toString());
      setUserName(sessionStorage.getItem("userName"));   
      GetHomeData(day);
    },[]);

    //debugger;
  return (    
    <div className='main'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      

  <section className='container'>

  <div className='weekButtons'>
      <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"   >
      <ToggleButton value="1">L</ToggleButton>
      <ToggleButton value="2">M</ToggleButton>      
      <ToggleButton value="3">M</ToggleButton>
      <ToggleButton value="4">J</ToggleButton>   
      <ToggleButton value="5">V</ToggleButton>
      <ToggleButton value="6">S</ToggleButton>   
      <ToggleButton value="0">D</ToggleButton>        
  </ToggleButtonGroup>
  </div>

  
        <div className='welcome'>
        {(!isLoading) ? <>      
      
        <div className='HomeTitle'>{dayOfWeek} {userName==='Joelle' && alignment===1 ? "LOWER BODY day":''}
                                                       {userName==='Joelle' && alignment===3 ? "UPPER BODY day":''}
                                                       {userName==='Joelle' && alignment===6 ? "FULL BODY day":''}
                                                       
 
        </div>        
        {(isToday) && <div className='totalExercise'>Tu as {exercises.length} exercises.</div>} </>
                
        :
        (<div className='HomeTitle'>Un instant {userName}, je cherche tes activites...</div>)        
       }      

        </div>

        {exercises.length > 0 &&
        (<List exercises={exercises} updatePoints={updatePoints}/>)}
        {(exercises.length === 0 && !isLoading) &&
           (<img src={'./images/rest.png'} alt='rest' className='img' />)}
       
      </section>
    </div>
  );
};

export default Home;
