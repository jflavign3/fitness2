import React from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const List = ({ exercises, updatePoints }) => {
  
     
  return (    
    <section>
         {exercises && exercises.map((exercise) => {
        return <ExerciseCard key={exercise.program._id} updatePoints={updatePoints} {...exercise} />;
      })}
   
    </section>
  );
};

export default List;
