import React, { useEffect, useState } from 'react';
import {GetAllExercises} from "../../Exercises";
import {InsertExerciseDetails} from "../../DAL/ExerciseDetails";
import {GetProgramsByUserId} from "../../Program";
import {GetAllExerciseDetails} from "../../DAL/ExerciseDetails";
import {UpdateExerciseDetails} from "../../DAL/ExerciseDetails";
import {InsertProgram, UpdateProgram} from "../../DAL/Program";
//import "./styles.css";
//import "./styles-custom.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { toast } from "react-toastify";
import { getToday } from "../../Common";


const Setup = () => {

  const [alignment, setAlignment] = React.useState('new');
  const [exercises, setExercises] = useState([]);    
  const [weekday, setWeekday] = useState('');
  const [userId, setUserId] = useState('');
  const [exerciseId, setExerciseId] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [seconds, setSeconds] = useState('');
  const [lbs, setLbs] = useState('');
  const [multipleUpdates, setMultipleUpdates] = useState(false);
  const [programsToUpdate, setProgramsToUpdate] = useState([]);

  
  const handleWeekdayChange = (e) => {
    setWeekday(Number(e));
  }
  const handleUserChange = (e) => {

    setUserId(Number(e));
  }
  const handleExerciseChange = (e) => {
    setExerciseId(e);
  }

  const handleRepsChange = (e) => {
    setReps(Number(e.target.value));
  }

  const handleSetsChange = (e) => {
    setSets(Number(e.target.value));
  }

  const handleSecondsChange = (e) => {
    
    setSeconds(Number(e.target.value));
  }
  const handleLbsChange = (e) => {
    setLbs(Number(e.target.value));
  }

  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = (e) => {    
  e.preventDefault();

  if (alignment === 'update' ){
    Update();
  }else if (alignment){
     InsertItem();
  }
}
 

    const GetExercises = async()=>{
      
     //to do , keep in session storage
      let allExercises = await GetAllExercises();  
      setExercises(allExercises);
    }

    const loadDetails = async ()=>{

    
      let programs = await GetProgramsByUserId(userId);   
      let allDetails = await GetAllExerciseDetails();

      programs = programs.filter(x=>x.exerciseId === exerciseId );  
      
      if (programs.length === 0){
        toast.error(
          `Program not found.`
         );    
     
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
      }else{
        setMultipleUpdates(true);
        programArray = programs;
        console.log("Programs to update: " + JSON.stringify(programs));
      }

  
      setProgramsToUpdate(programArray);
      
     


      //get program or programs with day and user and exercise



    }


    const Update = async ()=>{

      var updated = 0;
      var today = getToday();
      
      var details = [{"Title": "Reps", "Value": Number(reps)},
                         {"Title": "Sets", "Value": Number(sets)},
                         {"Title": "Seconds", "Value": Number(seconds)},
                         {"Title": "Lbs", "Value": Number(lbs)}]       

      
                         
     for(var i = 0; i < programsToUpdate.length; i++)
     {
         let program = programsToUpdate[i];
         updated++;
        for(var j = 0; j < details.length; j++)
        {
              let d = details[j];          
              if (d.Value){
                 var exDetails = {"ProgramId": program._id, "Title":d.Title, "Value":d.Value, "LastUpdateDate": today};  
                 var p = await UpdateExerciseDetails(exDetails);
                console.log(`Updated or inserted detail for ${d.Title}` + JSON.stringify(p));
               
              }
        
       }        
      }; 
      toast.success(`Updated ${updated} program details`)

    }


const isSubmitDisabled = ()=>
{
 //debugger;
  if (alignment==="update"){
    return programsToUpdate.length === 0;

  }else{
    return false;
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
     
     <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
    >
      <ToggleButton value="new">NEW</ToggleButton>
      <ToggleButton value="update">UPDATE</ToggleButton>      
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
            <button className='btn-done' onClick={()=>loadDetails()} type="button" >Load Details</button>
            </div>}
            {multipleUpdates && <div>No data show. Mutiple programs to update.</div>}


<div className='form-row'>
  <label htmlFor='reps' className='form-label'>Reps</label>
  <input type='text' id='reps' className='form-input' value={reps}  onChange={handleRepsChange}></input>
</div>
<div className='form-row'>
  <label htmlFor='sets' className='form-label'>Sets</label>
  <input type='text' id='sets' className='form-input' value={sets}  onChange={handleSetsChange}></input>
</div>
<div className='form-row'>
  <label htmlFor='seconds' className='form-label'>Seconds</label>
  <input type='text' id='seconds' className='form-input' value={seconds} onChange={handleSecondsChange}></input>
</div>
<div className='form-row'>
  <label htmlFor='lbs' className='form-label'>Lbs</label>
  <input type='text' id='lbs' className='form-input' value={lbs}  onChange={handleLbsChange}></input>
</div>

<div>
  <button type='submit' disabled={isSubmitDisabled()}  className='btn-done' >Submit</button>
</div>

</form>
     
      ) : (<></>)}
      </div>

      );
};

export default Setup;