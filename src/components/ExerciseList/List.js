import React from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const List = ({ exercises }) => {
     
  return (    
    <section>
         {exercises && exercises.map((exercise) => {
        return <ExerciseCard key={exercise.program._id} {...exercise} />;
      })}
   
    </section>
  );
};

export default List;
