import "./exerciseCard.scss";
import {UpdateProgram} from "../../DAL/Program";
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';


const ExerciseCard = ({ program, image, name, type, details }) => {
  
const [isExpanded, setIsExpanded] = useState(false);  
const [isCompleted, setIsCompleted] = useState(false);  
const [_program, setProgram] = useState(null);


const checkIfCompleted = async ()=>{
  
  if (program.lastCompletionDate === null) return false;
  //debugger;
  let today = new Date();    
  today = today.toISOString().split('T')[0];
 
  let completionDate = new Date( program.lastCompletionDate);
  completionDate = completionDate.toISOString().split('T')[0];
 
  if (today === completionDate){  
    setIsCompleted(true);
  }
}

const saveProgress = async ()=>{
     //update 
     
     var offset = -300; //Timezone offset for EST in minutes.
     const dt = new Date();
     var date = new Date(dt.getTime() + offset*60*1000); 
     program.lastCompletionDate = date.toISOString().split('T')[0];
     setIsCompleted(true);
    expandCard();
  var p = await UpdateProgram(program);     
  console.log('===>Updated program ' + JSON.stringify(p));
  
     //stats
}

const expandCard = ()=>{
    setIsExpanded(!isExpanded);
   }
   

   useEffect(()=>{
    
    setProgram(program);
    checkIfCompleted();
  },[]);

  
    return (

    
    <div className='exerciseSelection'>

      <article className='exercise'> 
      {isCompleted ? 
          <Badge badgeContent={'✓'} color="success" anchorOrigin={{vertical: 'top', horizontal: 'left',}}>
              <img src={image} alt={name} className='img' />
          </Badge> :
          <img src={image} alt={name} className='img' />
       }

        <div>
          <h4>{name}</h4>
          <p>{type}</p>
      
      {!isCompleted &&
        <button
          type='button'
          className='btn btn-block'
          onClick={() => expandCard()}
        >
          Lets do it
        </button>
      }
        </div>
        
      </article>
      
       { isExpanded &&      
     
       <div className='exerciseDetails'>

  {details.map((detail, i)=>{
    return(
        <div key={i} className="detailRow">
          <div className='kpi'>
            <div>{detail.Title}</div>
            <div className="kpiValue">{detail.Value}</div>
          </div>          
        </div>
        )
        })}
        <button
          type='button'
          className='btn-block'
          onClick={() => saveProgress()}
        >
          I'm Done!
        </button>
         



        </div>
      }
      </div>


    );
  };
  export default ExerciseCard;
  