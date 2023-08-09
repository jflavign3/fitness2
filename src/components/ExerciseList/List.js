import React from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const List = ({ exercises }) => {
 
   // debugger;
  return (    
    <section>
         {exercises && exercises.map((exercise,i) => {
        return <ExerciseCard key={i} {...exercise} />;
      })}
   
    </section>
  );
};

export default List;
