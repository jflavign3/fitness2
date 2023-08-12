import "./exerciseCard.scss";
import {UpdateProgram} from "../../DAL/Program";
import {UpsertStat, GetAllStats} from "../../DAL/Stat";
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';


var offset = -300; //Timezone offset for EST in minutes.
const ExerciseCard = ({ program, image, name, type, details }) => {
  
const [isExpanded, setIsExpanded] = useState(false);  
const [isCompleted, setIsCompleted] = useState(false);  
const [_program, setProgram] = useState(null);


const checkIfCompleted = async ()=>{
  
  if (program.lastCompletionDate === null) return false;
 
  let dt = new Date(); 
  var today = new Date(dt.getTime() + offset*60*1000);    
  today = today.toISOString().split('T')[0];
 
  let completionDate = new Date( program.lastCompletionDate);
  completionDate = completionDate.toISOString().split('T')[0];
 
  if (today === completionDate){  
    setIsCompleted(true);
  }
}

const saveProgress = async ()=>{
     //update 
     
     const dt = new Date();
     var date = new Date(dt.getTime() + offset*60*1000); 
     var formattedDate = date.toISOString().split('T')[0];
     program.lastCompletionDate = formattedDate;
     setIsCompleted(true);
     expandCard();
     var p = await UpdateProgram(program);       
     console.log('===>Updated program ' + JSON.stringify(p));

  //to do, put stats in session
  let stats = await GetAllStats(); 

  let currentStat = stats.filter(s=>s.exerciseId === program.exerciseId && s.userId === program.userId)[0];
    
    let todayReps = details.filter(v=>v.Title === "Reps")[0]?.Value;
    let todaySets = details.filter(v=>v.Title === "Sets")[0]?.Value;
    let todayLbs = details.filter(v=>v.Title === "Lbs")[0]?.Value;
    let todaySeconds = details.filter(v=>v.Title === "Seconds")[0]?.Value;
    let todayTotalReps = todayReps * todaySets;
  
    //initialize object if new
    if (!currentStat){  
    currentStat = {};
    currentStat.userId = program.userId;
    currentStat.exerciseId = program.exerciseId;
  }  
  
  var totalReps = currentStat.totalReps ?? 0;
  currentStat.totalReps = totalReps + todayTotalReps;

  var completions = currentStat.totalCompletions ?? 0;
  currentStat.totalCompletions = completions + 1;
  currentStat.lastUpdateDate = date;
  var r = await UpsertStat(currentStat);
  console.log('===>Updated stats ' + JSON.stringify(r));
 
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
          className='btn-done'
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
  