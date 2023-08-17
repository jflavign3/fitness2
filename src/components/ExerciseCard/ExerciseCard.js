import "./exerciseCard.scss";
import {UpdateProgram} from "../../DAL/Program";
import {UpsertStat, GetAllStats} from "../../DAL/Stat";
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import {getToday, getMonday, getSunday} from "../../Common";
import { emoji, useReward } from 'react-rewards';




const ExerciseCard = ({ program, image, name, type, details }) => {
  
const [isExpanded, setIsExpanded] = useState(false);  
const [isCompleted, setIsCompleted] = useState(false);  
const [_program, setProgram] = useState(null);
const [isVisible, setIsVisible] = useState(false);
const { reward: confettiReward, isAnimating: isConfettiAnimating } = useReward('rewardId', 'confetti');
const { reward: emojiReward, isAnimating: isEmojiAnimating } = useReward('rewardId', 'emoji');

const checkIfCompleted = async ()=>{
  
  if (program.lastCompletionDate === null) return false;


  var today = getToday();  
  var monday = getMonday();
  var sunday = getSunday();

  let completionDate = new Date( program.lastCompletionDate);  
 
  setIsCompleted(completionDate >= monday && completionDate <= sunday);

}

const saveProgress = async ()=>{
     //update 
     
     let n = Math.random() * 2;
     if (n < 1){
     confettiReward();
    }else{
       emojiReward();
     }


     var date = getToday();
     program.lastCompletionDate = date;
     setIsCompleted(true);
     
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

   
    setIsVisible(true);
    setIsExpanded(!isExpanded);
    
   }   

   useEffect(()=>{ 
    setProgram(program);
    checkIfCompleted();
  },[]);

  
    return (

    
    <div className='exerciseSelection'>
  
 
      <article  id="rewardId" className='exercise' onClick={()=>{expandCard()}}> 
   
      {isCompleted ? 
          <Badge sx={{ "& .MuiBadge-badge": { fontSize: 20, height: 35, minWidth: 35, borderRadius:40 } }}
           badgeContent={'✓'} color="success" anchorOrigin={{vertical: 'top', horizontal: 'left',}}>
              <img src={image} alt={name} className='imgLineup' />
          </Badge> :
          <img src={image} alt={name} className='imgLineup' />
       }

        <div>
        {isCompleted}
          <h4>{name}</h4>
          <p>{type}</p>     
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
       {!isCompleted && <button         
          type='button'
          className='btn btn-block'
          onClick={() => saveProgress()}        >
          I'm Done!
        </button>}
        </div>
      }
      </div>
    );
  };
  export default ExerciseCard;
  