import React from "react";
import ReactDOM from "react-dom";
import "./timer.css";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const Timer = ({seconds, onTimerOver}) => {

    
  const renderTime = ({ remainingTime }) => {
    
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };


 return (
    <div className="main">
<div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={seconds}
          colors={    ["#004777", "#0066ff", "#33cc33",     "#e6e600",    "#F7B801",   "#ff9900", "#A30000",  "#ff0066",      "#cc33ff","#ff9999"]}
          colorsTime={[seconds *.9, seconds *.8, seconds * .7, seconds * .6,  seconds * .5, seconds * .4,  seconds *.3, seconds *.2, seconds *.1, 0]}
          onComplete={() => onTimerOver()}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      </div>
  );

};

export default Timer;