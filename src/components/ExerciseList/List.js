import React from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const List = ({ exercises }) => {
 
    //debugger;
  return (    
    <section>
      {exercises.map((exercise) => {
        return <ExerciseCard key={exercise.id} {...exercise} />;
      })}
    </section>
  );
};

export default List;
