import React from 'react';
import ExerciseCard from '../../components/ExerciseCard';

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
