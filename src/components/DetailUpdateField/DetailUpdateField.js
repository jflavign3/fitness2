import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./detailUpdateField.scss";
import {UpdateExerciseDetails, UpdateExerciseDetailById} from "../../DAL/ExerciseDetails";
import {GetProgramsByUserId} from "../../Program";
import {getToday, getMonday, getSunday} from "../../Common";
import { toast } from "react-toastify";
import { LuSave, LuSaveAll } from "react-icons/lu";

const DetailUpdateField = ({ detail, userId, exerciseId }) => {

  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(0);

  console.log('detail ' + JSON.stringify(detail));

  const handleValueChange = (e) => {
    setValue(Number(e));
  }

const _setEditMode = () => {
  setEditMode(!editMode);

}

  const save = async (saveAll)=>{
    
    if (!value > 0){
      toast.error(`Must update the value`)
      return;
    }

    var updated = 0;
    var today = getToday();
        
    if (saveAll){
      let programs = await GetProgramsByUserId(userId);   

      programs = programs.filter(x=>x.exerciseId === exerciseId );  
      debugger;
      for (const program of programs){
      
        /*if (detail.ProgramId === '6512ef6abccf0f568022d151'){
           debugger;
        }*/
          var exDetails = {"ProgramId": program._id, "Title":detail.Title, "Value":value, "LastUpdateDate": today};  
          var d = await UpdateExerciseDetails(exDetails);
      };
      
      toast.success(`Updated ${programs.length} program details`)

    }
    else{
       var exDetail = {"_id": detail._id, "Title":detail.Title, "Value":value, "LastUpdateDate": today};         
       var d = await UpdateExerciseDetailById(exDetail);
       toast.success(`Updated ${d.modifiedCount} program details`)
    }
    detail.Value = value;

    setEditMode(false);
    console.log(`Updated ${d.Title}` + JSON.stringify(d));                            
   

  }


  
  return (    
    <div className='valueAndButtons'>
      {!editMode ?
       <div className="kpiValue">
     <div className='valueLabel' onClick={()=>{_setEditMode();}} >{detail.Value}</div>
     </div> :
     <>
     <TextField className='detailTextbox' id="standard-basic" defaultValue={detail.Value} onChange={(e)=>{handleValueChange(e.target.value);}} variant="standard" /> 
     <div className='saves'>
     <LuSaveAll size={'1.5rem'} onClick={()=>save(true)} />   
     <LuSave size={'1.5rem'}  onClick={()=>save(false)} />   
     
     </div>
     </>
      }
    </div>
  );
};

export default DetailUpdateField;
