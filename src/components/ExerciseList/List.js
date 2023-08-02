import React from 'react';
import Exercise from '../../components/ExerciseCard';

const List = ({ exercises }) => {
 
    debugger;
  return (    
    <section>
      {exercises.map((exercise) => {
        return <Exercise key={exercise.id} {...exercise} />;
      })}
    </section>
  );
};

export default List;
