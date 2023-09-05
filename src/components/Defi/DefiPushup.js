import * as React from 'react';
import { useState, useEffect } from 'react';
import { useReward } from 'react-rewards';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import "./defi.scss";
import {getMonday, getSunday} from '../../Common';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import {UpdateDefi,GetAllDefis} from "../../DAL/Defi";



         
const DefiPushUp = () => {


  const { reward: confettiReward } = 
  useReward('rewardId', 'confetti',{lifetime:600, elementCount:200, startVelocity:15, zIndex:100});



const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


const [progressValue, setProgressValue] = useState(0); 
const [currentData, setCurrentData] = useState({}); 
  
const setData = async ()=>{
  
 var uId = Number(sessionStorage.getItem("__userId"));   
  let defis = await GetAllDefis(); 
  let data = defis.filter(s=>s.userId === uId)[0];
  data = defis.filter(s=>s.name === "100 Push Ups")[0];
  if (!data) return;
 
  setCurrentData(data);

  if (data.endDate < getMonday()){
    //new week
  }else{
    setProgressValue(data.total);
  }
  
}

const setNewValue = async () => {

 if (progressValue >= 100) return;
  
  var newVal = progressValue+5;
  
  console.log("pushup:" + newVal);

  if (newVal >= 100){
    confettiReward();
  }
  setProgressValue(newVal);
  currentData.total = newVal;
  var r = await UpdateDefi(currentData);
  console.log("===>UPDATED pushup" );
   
  


}
useEffect(()=>{ 
  setData();
},[]);



  return (
    <div className='main'>
      
  <section className='container'>
    <Box sx={{ flexGrow: 1 }}>
    <div>Defi de la semaine: 100 Push Ups ({progressValue})</div> { progressValue >= 100 && <>REUSSI</>}
    <BorderLinearProgress variant="determinate" value={progressValue} />
    
    <div className='btnPlaceholder'> 
    <div id="rewardId" className={progressValue < 100 ? 'button' : 'buttonDisabled'} onClick={()=>setNewValue()} variant="contained">+ 5</div>  
    </div>
   
   
    </Box>
    
    </section>
    </div>
  );
}


export default DefiPushUp;