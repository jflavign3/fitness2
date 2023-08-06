import "./exerciseCard.scss";
import { useState } from 'react';





const ExerciseCard = ({ image, name, type, details }) => {

  
const [isExpanded, setIsExpanded] = useState(false);  

const expandCard = ()=>{
    setIsExpanded(!isExpanded);
   }
   
  
    return (
    <div className='exerciseSelection'>
      <article className='exercise'>
        <img src={image} alt={name} className='img' />
        <div>
          <h4>{name}</h4>
          <p>{type}</p>
      
        <button
          type='button'
          className='btn btn-block'
          onClick={() => expandCard()}
        >
          Lets do it
        </button>
        </div>
        
      </article>
      
       { isExpanded &&
       
     
       <div className='exerciseDetails'>

  {details.map((detail, i)=>{
    return(
        <div key={i} className="detailRow">
          <div className='kpi'>
            <div>{detail.title}</div>
            <div className="kpiValue">{detail.value}</div>
          </div>
         
        </div>
        )
        })}



        </div>
      }
      </div>


    );
  };
  export default ExerciseCard;
  