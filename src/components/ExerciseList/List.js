import React from 'react';
import Exercise from './Exercise.js';

const List = ({ exercises }) => {
 
  return (    
    <section>
      {exercises.map((exercise) => {
        return <Exercise key={exercise.id} {...exercise} />;
      })}
    </section>
  );
};

export default List;
