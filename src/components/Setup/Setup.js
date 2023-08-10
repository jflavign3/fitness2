import React, { useEffect, useState } from 'react';
import { Formik,Field, Form, ErrorMessage ,useField } from 'formik';
import {GetAllExercises} from "../../Exercises";
import {InsertExerciseDetails} from "../../DAL/ExerciseDetails";
import {InsertProgram} from "../../DAL/Program";
import "./styles.css";
import "./styles-custom.css";

const Setup = () => {


  const [exercises, setExercises] = useState([]);  


    const GetExercises = async()=>{
      
     //to do , keep in session storage
      let allExercises = await GetAllExercises();  
      setExercises(allExercises);
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
    let detail = {"Title":'Reps', "Value":reps, "ProgramId":programId};
    details.push(detail);
  }
  
  if (sets > 0){
    let detail = {"Title":'Sets', "Value":sets, "ProgramId":programId};
    details.push(detail);
  }
  
  if (lbs > 0){
    let detail = {"Title":'Lbs', "Value":lbs, "ProgramId":programId};
    details.push(detail);
  }
  
  if (seconds > 0){
    let detail = {"Title":'Seconds', "Value":seconds, "ProgramId":programId};
    details.push(detail);
  }

   var ed = await InsertExerciseDetails(details);   
   console.log('Inserted ExerciseDetails ' + JSON.stringify(ed));

}

    const MySelect = ({ label, ...props }) => {
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
      };
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
      <>
     
      {exercises ? (
        <Formik
          initialValues={{ User: '', Exercise: '', reps: '', sets: '', lbs: '', seconds: '', DayOfWeek:'' }}
       /*   validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
          })}*/
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //alert(JSON.stringify(values, null, 2));
               InsertItem(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MySelect label="User" name="User">
             <option value="">Select a user</option>
             <option value="1">Joelle</option>
             <option value="2">Samuel</option>
             <option value="3">JF</option>
             <option value="4">Alexane</option>             
           </MySelect>

            <MySelect label="Exercise" name="Exercise">
             <option value="">Select</option>
             {exercises.map((e,i)=>{
                    return (<option key={i} value={e._id}>{e.name}</option>)
             })}
           </MySelect>

           <label htmlFor="reps">Reps</label>
            <Field name="reps" type="text" />
            
            <label htmlFor="sets">Sets</label>
            <Field name="sets" type="text" />
            
            <label htmlFor="lbs">Lbs</label>
            <Field name="lbs" type="text" />
            
            <label htmlFor="seconds">Seconds</label>
            <Field name="seconds" type="text" />
            


            <MySelect label="Day Of Week" name="DayOfWeek">
             <option value="">Select a day</option>
             <option value="1">Lundi</option>
             <option value="2">Mardi</option>
             <option value="3">Mercredi</option>
             <option value="4">Jeudi</option>
             <option value="5">Vendredi</option>
             <option value="6">Samedi</option>
             <option value="0">Dimanche</option>
           </MySelect>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      ) : (<></>)};
      </>

      );
};

export default Setup;