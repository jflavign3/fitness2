const ExerciseCard = ({ image, name, type }) => {
    return (
      <article className='exercise'>
        <img src={image} alt={name} className='img' />
        <div>
          <h4>{name}</h4>
          <p>{type}</p>
        </div>
      </article>
    );
  };
  export default ExerciseCard;
  