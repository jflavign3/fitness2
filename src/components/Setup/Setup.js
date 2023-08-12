import React, { useEffect, useState } from 'react';
import { Formik,Field, Form,  useFormik, ErrorMessage ,useField } from 'formik';
import {GetAllExercises} from "../../Exercises";
import {InsertExerciseDetails} from "../../DAL/ExerciseDetails";
import {InsertProgram} from "../../DAL/Program";
import "./styles.css";
import "./styles-custom.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Setup = () => {

  const [alignment, setAlignment] = React.useState('new');
  const [exercises, setExercises] = useState([]);  
  //set many at once
  const [details, setDetails] = useState({   
    reps:'',
    sets:'',
    seconds:'',
    lbs: ''
  });

  const handleChange = (e) => {
    setDetails({...details,[e.target.name]:e.target.value});
  }
  
  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  //console.log(sets, reps)
}
 

    const GetExercises = async()=>{
      
     //to do , keep in session storage
      let allExercises = await GetAllExercises();  
      setExercises(allExercises);
    }

    const loadDetails = async ()=>{

    }

const InsertItem = async (items)=>{
  let program = {"userId":Number(items.User),"weekday": Number(items.DayOfWeek),"exerciseId":items.Exercise, "lastCompletionDate": new Date(2001,1,1)};
 
  let reps = Number(items.reps);
  let sets =  Number(items.sets);
  let lbs =  Number(items.lbs);
  let seconds =  Number(items.seconds);
  let day = items.DayOfWeek;

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


   /* const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
          <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </div>
        );
      };*/
/*
      debugger;
      const ex = sessionStorage.getItem("Exercises");
      if (!ex){
        GetExercises();        
      }*/
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
  <input type='text' id='reps' className='form-input' value={details.reps} name="user" onChange={(e)=>{handleChange(e.target.value);}}></input>
</div>

<div className='form-row'>
  <label htmlFor='reps' className='form-label'>Reps</label>
  <input type='text' id='reps' className='form-input' value={details.reps} name="reps" onChange={(e)=>{handleChange(e.target.value);}}></input>
</div>
<div className='form-row'>
  <label htmlFor='sets' className='form-label'>Sets</label>
  <input type='text' id='sets' className='form-input' value={details.sets} name="sets" onChange={(e)=>{handleChange(e.target.value);}}></input>
</div>

<div>
  <button type='submit'>Submit</button>
</div>

</form>

        /*<Formik 
          initialValues={{ User: '', Exercise: '', reps: '', sets: '', lbs: '', seconds: '', DayOfWeek:'' }}
      
        
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //alert(JSON.stringify(values, null, 2));
              InsertItem(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MySelect label="User" name="User" >             
             <option value="1">Joelle</option>
             <option value="2">Samuel</option>
             <option value="3">JF</option>
             <option value="4">Alexane</option>   
             
           </MySelect>
       

           <MySelect label="Day Of Week" name="DayOfWeek" onClick={handleChange}>             
             <option value="1">Lundi</option>
             <option value="2">Mardi</option>
             <option value="3">Mercredi</option>
             <option value="4">Jeudi</option>
             <option value="5">Vendredi</option>
             <option value="6">Samedi</option>
             <option value="0">Dimanche</option>
             {alignment === 'update' && <option value="">All Days</option>}
           </MySelect>

            <MySelect label="Exercise" name="Exercise">             
             {exercises.map((e,i)=>{
                    return (<option key={i} value={e._id}>{e.name}</option>)
             })}
           </MySelect>

           {alignment === 'update' && 
           <div>
            <button className='btn-done' type="submit" >Find</button>
            </div>}

           <label htmlFor="reps">Reps</label>
            <Field name="reps" type="text" />
            
            <label htmlFor="sets">Sets</label>
            <Field name="sets" type="text" />
            
            <label htmlFor="lbs">Lbs</label>
            <Field name="lbs" type="text" />
            
            <label htmlFor="seconds">Seconds</label>
            <Field name="seconds" type="text" />           

            <div>
            <button className='btn-done' type="submit">Submit</button>
            </div>
          </Form>
        </Formik>*/
      ) : (<></>)};
      </div>

      );
};

export default Setup;