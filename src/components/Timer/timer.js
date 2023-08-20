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
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => onTimerOver()}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      </div>
  );

};

export default Timer;