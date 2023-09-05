import "./exerciseCard.scss";
import {UpdateProgram} from "../../DAL/Program";
import {UpsertStat, GetAllStats} from "../../DAL/Stat";
import {UpdatePoints} from "../../DAL/User";
import { useState, useEffect } from 'react';
import {getToday, getMonday, getSunday} from "../../Common";
import { useReward } from 'react-rewards';
import { toast } from "react-toastify";
import Timer from "../Timer/timer";
import { BsStopwatch,BsCheck2Square } from "react-icons/bs";

///MATERIAL
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';


const ExerciseCard = ({ updatePoints, program, image, name, type, details, reorderMode }) => {
  
const [isExpanded, setIsExpanded] = useState(false);  
const [isCompleted, setIsCompleted] = useState(false);  
const [_program, setProgram] = useState(null);
const [order, setOrder] = useState(0);
const [showTimer, setShowTimer] = useState(false);
const [currentStat, setCurrentStat] = useState([])
const [timerSeconds, setTimerSeconds] = useState(false);

const { reward: confettiReward } = 
         useReward('rewardId', 'confetti',{lifetime:600, elementCount:120, startVelocity:15, zIndex:100, angle:120});
const { reward: emojiReward } = 
         useReward('rewardId', 'emoji', {lifetime:300,startVelocity:20, zIndex:100, angle:120});

//const detailOrder = [{'Reps':1,'Sets':2,'Lbs':3,'Seconds':4}];


const checkIfCompleted = async ()=>{
  
  if (program.lastCompletionDate === null) return false;
  
  var monday = getMonday();
  var sunday = getSunday();

  let completionDate = new Date( program.lastCompletionDate);  
 
  setIsCompleted(completionDate >= monday && completionDate <= sunday);

}

const onTimerOver = ()=>{
  setShowTimer(false);
};

const updateOrder = async () =>{ 
  program.order = Number(order);
  var p = await UpdateProgram(program);   
  toast.success('Updated order');
  console.log("==>Updated order. " + JSON.stringify(p));

}


const saveProgress = async ()=>{
     //update 
     var bonus = 0;
     let n = Math.random() * 60;
     console.log('random:' + n);
     if (n >1){
        confettiReward()     
    }else{
       bonus = 50;
       emojiReward();
    }

     var date = getToday();
     program.lastCompletionDate = date;
     setIsCompleted(true);
     
     var p = await UpdateProgram(program);       
     console.log('===>Updated program ' + JSON.stringify(p));

    
    let todayReps = details.filter(v=>v.Title === "Reps")[0]?.Value;
    let todaySets = details.filter(v=>v.Title === "Sets")[0]?.Value ?? 1;    
    let todaySeconds = details.filter(v=>v.Title === "Seconds")[0]?.Value;
    let todayTotalReps = todayReps * todaySets;
    let todayTotalSeconds = todaySeconds * todaySets;
  
    //initialize object if new
    let _currentStat = {};
    if (!currentStat){     
    _currentStat.userId = program.userId;
    _currentStat.exerciseId = program.exerciseId;
  }else{
    _currentStat = currentStat;
  }  
  
  var totalReps = _currentStat.totalReps ?? 0;
  _currentStat.totalReps = totalReps + todayTotalReps;

  var totalSeconds = _currentStat.totalSeconds ?? 0;
  _currentStat.totalSeconds = totalSeconds + todayTotalSeconds;

  var completions = _currentStat.totalCompletions ?? 0;
  _currentStat.totalCompletions = completions + 1;
  _currentStat.lastUpdateDate = date;  


  let currentPoints = sessionStorage.getItem('userPoints');
  let newPoints = Number(currentPoints) + Number(todaySets) + bonus;
  await UpdatePoints(program.userId, newPoints);
  updatePoints(newPoints);
  sessionStorage.setItem('userPoints', newPoints);

  var r = await UpsertStat(_currentStat);  
  setCurrentStat(_currentStat);

  console.log('===>Updated stats ' + JSON.stringify(r));
  expandCard(false);
  
     //stats
}

/*
const deleteProgram_ = async (detail) =>{
  setShowTimer(true);
  await deleteProgram(detail.ProgramId);
  toast.success('deleted');

}*/

const initStats = async () => {
    
  let stats = await GetAllStats(); 
  let stat = stats.filter(s=>s.exerciseId === program.exerciseId && s.userId === program.userId)[0];
     setCurrentStat(stat);
}
const setDetailOrder = (details) => {
  
     details.forEach((detail)=> {
      switch (detail.Title){
        case 'Reps': detail.order = 1; break;
        case 'Sets': detail.order = 2; break;
        case 'Lbs': detail.order = 3; break;
        case 'Seconds': detail.order = 4; break;
        default : detail.order = 1;
      }  
    });

}
const expandCard = ()=>{
   
   // setIsVisible(true);
    setIsExpanded(!isExpanded);    
   }   

   useEffect(()=>{ 
    setProgram(program);
    setDetailOrder(details);
    initStats();
     
    setTimerSeconds(details.find((x)=>x.Title === 'Seconds')?.Value);
    checkIfCompleted();
  },[]);

  
    return (

    
    <div className='exerciseSelection'>
  
      <article  className='exercise' onClick={()=>{expandCard()}}> 
   
      {isCompleted ? 
          <Badge sx={{ "& .MuiBadge-badge": { fontSize: 20, height: 35, minWidth: 35, borderRadius:40 } }}
           badgeContent={'✓'} color="success" anchorOrigin={{vertical: 'top', horizontal: 'left',}}>
              <img src={image} alt={name} className='imgLineup' />
          </Badge> :
          <img src={image} alt={name} className='imgLineup' />
       }

        <div>
        {isCompleted}
          <h4 id="rewardId"   >{name}</h4>
          <p>{type}</p>     
        </div>

{showTimer && timerSeconds > 0 &&
        <Timer seconds={timerSeconds} onTimerOver={onTimerOver} />}
        
      </article>
      
       { isExpanded &&      
     
       <div className='exerciseDetails'>
<div className="kpis">
  {details
  .sort((a,b) => a.order > b.order ? 1 : -1)
  .map((detail, i)=>{
    return(
        <div key={i} className="detailRow">
          <div className='kpi'>
            <div >{detail.Title}</div>
            <div className="kpiValue">{detail.Value}</div>
          </div>          
        </div>
        )
   })}

        { timerSeconds > 0 &&
        <button      
          className='btn-timer'
          type='button'
          onClick={() => setShowTimer(!showTimer)} >
             <BsStopwatch size={'1.5rem'} />
  </button>}
  
  </div>

<div className="leftOfDetails">
<div>
       {!isCompleted && 
        <BsCheck2Square color="#d946ef" size={'3.0rem'}  onClick={() => saveProgress()} />}
        </div>
<div>
       {reorderMode && <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '6ch', padding:'3px' },
      }}
      noValidate
      autoComplete="off"
    >
     <TextField type="number"  inputProps={{min: 0, style: { textAlign: 'center' }}}
                  size="small" id="outlined-basic" defaultValue={program.order}  
                  onChange={(event) => { setOrder(event.target.value); }}
                  variant="outlined" />
    <Button type='button' onClick={()=>updateOrder(_program)}  variant="outlined">save</Button>   
    </Box>     
    }

    </div>
    </div>

       {/*
       <button         
          type='button'
          onClick={() => deleteProgram_(details[0])}        >
          X  
       </button>}
       {
       <button         
       type='button'
       onClick={() => console.log('stats:' + JSON.stringify(currentStat)) }        >
       Stats  
       </button>*/}
    </div>

     
      }

      </div>
    );
  };
  export default ExerciseCard;
  