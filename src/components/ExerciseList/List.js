import React from 'react';
import { useState } from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import Button from '@mui/material/Button';

const List = ({ exercises, updatePoints }) => {

  const [reorderMode, setReorderMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  return (    
    <section>
         {exercises && exercises
         .sort((a,b) => a.program.order > b.program.order ? 1 : -1)
         .map((exercise) => {
         console.log('..' + JSON.stringify(exercise));
        return <ExerciseCard key={exercise.program._id} deleteMode={deleteMode} reorderMode={reorderMode} updatePoints={updatePoints} {...exercise} />;
      })}
   
    <Button type='button' onClick={()=>setReorderMode(!reorderMode)} variant="outlined">Reorder</Button>   
    <Button type='button' onClick={()=>setDeleteMode(!deleteMode)} variant="outlined">Delete</Button>   
    </section>
  );
};

export default List;
