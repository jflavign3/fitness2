import React, { useEffect, useState } from 'react';
import {GetAllExercises} from "../../Exercises";
import {InsertExerciseDetails} from "../../DAL/ExerciseDetails";
import {GetProgramsByUserId} from "../../Program";
import {GetAllExerciseDetails} from "../../DAL/ExerciseDetails";
import {UpdateExerciseDetails} from "../../DAL/ExerciseDetails";
import {InsertProgram, UpdateProgram} from "../../DAL/Program";
import "./styles.css";
import { toast } from "react-toastify";
import { getToday } from "../../Common";
//material////////////////
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
/////////////////////


const Setup = () => {

  const [alignment, setAlignment] = useState('new');
  const [exercises, setExercises] = useState([]);    
  const [weekday, setWeekday] = useState('');
  const [userId, setUserId] = useState('');
  const [exerciseId, setExerciseId] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [seconds, setSeconds] = useState('');
  const [lbs, setLbs] = useState('');
  const [multipleUpdatesLabel, setMultipleUpdatesLabel] = useState(false);
  const [programsToUpdate, setProgramsToUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const numbers15 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const numbersLbs = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,25,30,35,40,45,50,60,70];
  const seconds90 = [15,20,30,40,50,60,90];

  const handleWeekdayChange = (e) => {
    cleanUp();
    setWeekday(Number(e));
  }

  const handleUserChange = (e) => {

    cleanUp();
    setUserId(Number(e));
  }
  const handleExerciseChange = (e) => {
    cleanUp();
    setExerciseId(e);
  }

  const handleRepsChange = (e) => {
    setReps(Number(e));
  }

  const handleSetsChange = (e) => {
    setSets(Number(e));
  }

  const handleSecondsChange = (e) => {
    
    setSeconds(Number(e));
  }
  const handleLbsChange = (e) => {
    setLbs(Number(e));
  }

  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

 const handleSubmit = (e) => {    

  
  setIsLoading(true); 
   try {
      e.preventDefault();
  
 
  let msg = validateForm();
  if (msg){
   toast.error(msg);
  }else if (alignment === 'update' ){
    Update();
  }else if (alignment){
     InsertItem();
  }
}catch(e){
  console.log('error');  
}finally {
  setIsLoading(false); 
}

}
 
const cleanUp = () => {
  setMultipleUpdatesLabel(false);
  setReps('');
  setSeconds('');
  setSets('');
  setLbs('');
} 

const setDetails = (allDetails, program) => {

     let detail = allDetails.filter(x=>x.ProgramId === program._id && x.Title === 'Reps')[0];
     if (detail) {
            setReps(detail.Value);
        }
        detail = allDetails.filter(x=>x.ProgramId === program._id && x.Title === 'Sets')[0];
        if (detail) {
              setSets(detail.Value);
        }
        detail = allDetails.filter(x=>x.ProgramId === program._id && x.Title === 'Seconds')[0];
        if (detail) {
           setSeconds(detail.Value);
        }
        detail = allDetails.filter(x=>x.ProgramId === program._id && x.Title === 'Lbs')[0];
        if (detail){
           setLbs(detail.Value);
        }

}

    const GetExercises = async()=>{
      
     //to do , keep in session storage
      let allExercises = await GetAllExercises();  
      setExercises(allExercises);
    }

    const loadDetails = async ()=>{
    
      setIsLoading(true);
    
      let programs = await GetProgramsByUserId(userId);   
      let allDetails = await GetAllExerciseDetails();

      programs = programs.filter(x=>x.exerciseId === exerciseId );  
      
      if (programs.length === 0){
        toast.error(
          `Program not found.`
         );    
     
         setIsLoading(false);
        return;
      }
      var programArray = [];
      if (weekday !== "" || programs.length === 1 ){

        if ( programs.length === 1 ){
          var program = programs[0];

        }else{
        var program = programs.filter(x=>x.weekday === weekday)[0];    
        }
        programArray.push(program);        
        console.log("Program to update: " + JSON.stringify(program));
        setDetails(allDetails, program);
    
      }else{
        setMultipleUpdatesLabel(true);
        setDetails(allDetails, programs[0]);
        programArray = programs;
        console.log("Programs to update: " + JSON.stringify(programs));
      }

  
      setProgramsToUpdate(programArray);
      setIsLoading(false);
    }


    const Update = async ()=>{


      var updated = 0;
      var today = getToday();
      
      var details = [{"Title": "Reps", "Value": Number(reps)},
                         {"Title": "Sets", "Value": Number(sets)},
                         {"Title": "Seconds", "Value": Number(seconds)},
                         {"Title": "Lbs", "Value": Number(lbs)}]       

      ///debugger;
                         
     for(var i = 0; i < programsToUpdate.length; i++)
     {
         let program = programsToUpdate[i];
         updated++;
        for(var j = 0; j < details.length; j++)
        {
              let d = details[j];          
                 var exDetails = {"ProgramId": program._id, "Title":d.Title, "Value":d.Value, "LastUpdateDate": today};  
                 var p = await UpdateExerciseDetails(exDetails);
                console.log(`Updated or inserted detail for ${d.Title}` + JSON.stringify(p));
               
          
        
       }        
      }; 
      //debugger;
      toast.success(`Updated ${updated} program details`)

    }

const validateForm = () => {

  if (alignment==="update"){
    var valid = programsToUpdate.length > 0
    if (valid) return null;
    return "No programs are loaded."; 
   }else{
      valid = (weekday != '' && userId && exerciseId && (reps || sets || seconds || lbs)); 
      if (valid) return null;
      return "Missing values.";
   }
}


const InsertItem = async ()=>{
  
  let program = {userId, weekday,exerciseId, "lastCompletionDate": new Date(2001,1,1)};

  var p = await InsertProgram(program);
  console.log('Inserted program ' + JSON.stringify(p));
  var programId = p.insertedId;

  let details = [];
  if (reps > 0){
    let detail = {"Title":'Reps', "Value":reps, "ProgramId":programId, "LastUpdatedDate": new Date()};
    details.push(detail);
  }
  
  if (sets > 0){
    let detail = {"Title":'Sets', "Value":sets, "ProgramId":programId,  "LastUpdatedDate": new Date()};
    details.push(detail);
  }
  
  if (lbs > 0){
    let detail = {"Title":'Lbs', "Value":lbs, "ProgramId":programId, "LastUpdatedDate": new Date()};
    details.push(detail);
  }
  
  if (seconds > 0){
    let detail = {"Title":'Seconds', "Value":seconds, "ProgramId":programId,  "LastUpdatedDate": new Date()};
    details.push(detail);
  }

   var ed = await InsertExerciseDetails(details);   
 
   console.log('Inserted ExerciseDetails ' + JSON.stringify(ed));

}


useEffect(()=>{
     
        console.log("SETUP - Get all exercises");
        GetExercises();
      },[]);


return (
      <div className='main'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
     <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
    >
      <ToggleButton value="new">NEW</ToggleButton>
      <ToggleButton value="update">UPDATE</ToggleButton>      
      <ToggleButton value="delete">DELETE</ToggleButton>      
    </ToggleButtonGroup>

      {exercises ? (

<form className='form' onSubmit={handleSubmit}>


<div className='form-row'>
  <label htmlFor='user' className='form-label'>User</label>
  <select id='user' className='form-input' value={userId} onChange={(e)=>{handleUserChange(e.target.value);}}>
  <option value="">----</option>
  <option value="1">Joelle</option>
             <option value="2">Samuel</option>
             <option value="3">JF</option>
             <option value="4">Alexane</option>   
  </select>
</div>

<div className='form-row'>
  <label htmlFor='weekday' className='form-label'>Day</label>
  <select id='weekday' className='form-input'  value={weekday} onChange={(e)=>{handleWeekdayChange(e.target.value);}}>
  <option value="">----</option>
  <option value="1">Lundi</option>
             <option value="2">Mardi</option>
             <option value="3">Mercredi</option>
             <option value="4">Jeudi</option>
             <option value="5">Vendredi</option>
             <option value="6">Samedi</option>
             <option value="0">Dimanche</option>
  </select>
</div>

<div className='form-row'>
  <label htmlFor='exercise' className='form-label'>Exercise</label>
  <select id='exercise' className='form-input' value={exerciseId} onChange={(e)=>{handleExerciseChange(e.target.value);}}>
  <option value="">----</option>
  {exercises.map((e,i)=>{
                    return (<option key={i} value={e._id}>{e.name}</option>)
             })}
  </select>
</div>


{alignment === 'update' && 
           <div>            
            <Button type='button' onClick={()=>loadDetails()} variant="outlined">Load Details</Button>              
            </div>}
            {multipleUpdatesLabel && <div className="warningLabel">Mutiple programs loaded. Showing one.</div>}

{alignment !== 'delete' && (
  <>
<div className='form-row'>
  <label htmlFor='reps' className='form-label'>Reps</label>
  <select id='reps' className='form-input'  value={reps} onChange={(e)=>{handleRepsChange(e.target.value);}}>
  <option value="">----</option>
  {numbers15.map((number)=>{
    return   <option value={number.toString()}>{number}</option>
  })} 
  </select>
</div>


<div className='form-row'>
  <label htmlFor='sets' className='form-label'>Sets</label>
  <select id='sets' className='form-input'  value={sets} onChange={(e)=>{handleSetsChange(e.target.value);}}>
  <option value="">----</option>
  {numbers15.map((number)=>{
    return   <option value={number.toString()}>{number}</option>
  })} 
  </select>
</div>
<div className='form-row'>
  <label htmlFor='seconds' className='form-label'>Seconds</label>
  <select id='seconds' className='form-input'  value={seconds} onChange={(e)=>{handleSecondsChange(e.target.value);}}>
  <option value="">----</option>
  {seconds90.map((number)=>{
    return   <option value={number.toString()}>{number}</option>
  })} 
  </select>
</div>
<div className='form-row'>
  <label htmlFor='lbs' className='form-label'>Lbs</label>
  <select id='lbs' className='form-input'  value={lbs} onChange={(e)=>{handleLbsChange(e.target.value);}}>
  <option value="">----</option>
  {numbersLbs.map((number)=>{
    return   <option value={number.toString()}>{number}</option>
  })} 
  </select>
</div>
</>
)}

<div>
   <Button type='submit' variant="contained">Save</Button>  
</div>

</form>
     
      ) : (<></>)}
      </div>

      );
};

export default Setup;