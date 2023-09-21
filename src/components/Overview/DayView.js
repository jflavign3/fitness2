import * as React from 'react';
import "./overview.scss";
import Badge from '@mui/material/Badge';

export default function DayView({exercises, day}) {
  return (
    <div className='main'>
      <section className='containerLineup'>
      
      <div className='dailyExerciseRow'>
        
        {exercises.map((exercise)=>{

           return(
            <div>
              <div id='card'>
              <div className='labelName'>{exercise.name}</div>

              {exercise.isCompleted ? 
          <Badge sx={{ "& .MuiBadge-badge": { fontSize: 8, height: 15, width: 15, borderRadius:60, marginTop:1.5, marginLeft:1 } }}
           badgeContent={'✓'} color="success" anchorOrigin={{vertical: 'top', horizontal: 'left',}}>
              <img src={exercise.image} alt={exercise.image} className='imgLineup' />
          </Badge> :
              <img src={exercise.image} alt={exercise.image} className='imgLineup' />
       }

       
                
                </div>
                

                </div>
                )
        })}


    </div>
    </section>
    </div>
  );
}
