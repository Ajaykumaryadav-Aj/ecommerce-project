import React, { useState,useEffect, useRef } from "react";
import BannerImage from "../../assets/banner.jpg";
const Banner = () => {

const initialTime = 5 * 60 * 60;
// const [timeLeft, setTimeLeft] = useState();


// const formatTime = (time) =>{
// const hours = time / 3600;
// const minute = (time % 3600 ) /60;
// const seconds = time % 60;

// return {
//   hours: String(hours).padStart(2,"0"),
//   minute:String(minute).padStart(2,"0"),
//   seconds:String(seconds).padStart(2,"0")
// }

// }

// const [timer, setTimer] = useState("00:00:00")
//   const Ref = useRef()

//   function getTimeRemaining(e) {
//     const total = Date.parse(e) - Date.parse(new Date())
//     const hour = Math.floor(total(1000*60*60) %24);
//     const seconds = Math.floor((total / 1000) % 60);
//     const minute = Math.floor((total / 1000 / 60) % 60);
//     return {total,hour,minute,seconds}
//   }
//   function startTimer(e) {
//     let {total, hour, minute, seconds} = getTimeRemaining(e);
//     if (total >= 0) {
//       setTimer(
//         (hour > 9 ? hour : '0' + hour) + ':' +
//         (minute > 9 ? minute : '0' + minute) + ':' +
//         (seconds > 9 ? seconds : '0' + seconds)
//       )
//     }
//   }
//   function clearTimer(e) {
//     setTimer("00:00:00")
//     if (Ref.current) clearInterval(Ref.current); 
//       const id = setInterval(() => {
//         startTimer(e)
//       }, 1000)
//       Ref.current= id;
//     }
// function getDeadTime() {
//   let deadline = new Date();
//   deadline.setSeconds(deadline.getSeconds() + 10);
//   return deadline;
// }
// useEffect(() => {
//  clearTimer(getDeadTime())

 
// }, [])


//   }

 const [timer, setTimer] = useState("00:00:00");
  const Ref = useRef();

  // Function to get time remaining
  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date()); // Time left in milliseconds
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24); // Hours
    const minutes = Math.floor((total / 1000 / 60) % 60); // Minutes
    const seconds = Math.floor((total / 1000) % 60); // Seconds
    return { total, hours, minutes, seconds };
  }

  // Function to start the timer
  function startTimer(deadline) {
    let { total, hours, minutes, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );
    } else {
      clearInterval(Ref.current); // Clear the interval when time is up
    }
  }

  // Function to initialize the timer
  function clearTimer(deadline) {
    setTimer("00:00:00"); // Reset timer display
    if (Ref.current) clearInterval(Ref.current); // Clear any existing interval

    const id = setInterval(() => {
      startTimer(deadline); // Start the timer
    }, 1000);
    Ref.current = id; // Store the interval ID
  }

  // Function to calculate the deadline (example: 10 seconds from now)
  function getDeadTime() {
    let deadline = new Date();
    deadline.setHours(deadline.getHours() + 5); // Set deadline 10 seconds from now
    return deadline;
  }

  // Start the timer when the component mounts
  useEffect(() => {
    clearTimer(getDeadTime()); // Start timer with the deadline

    // Cleanup the interval when the component unmounts
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);


  return (
    
    <section
      className="h-[60vh] mt-[14vh] bg-cover bg-top"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <div className="max-w-[1300px] mx-auto px-12 h-100 flex flex-col justify-center gap-3">
        <h1 className="text-red-600 text-9xl uppercase font-bold tracking-tight">
          Big Sale!
        </h1>
        <h2 className="text-zinc-800 text-3xl">
          Up to 50% OFF Limited Time Only!
        </h2>
        {/* <div className="text-5xl font-bold text-zinc-800 gap-x-5 mt-5">
          <span className="text-white bg-zinc-800">{hours}</span>:
          <span className="text-white bg-zinc-800">{minutes}</span>:
          <span className="text-white bg-zinc-800">{seconds}</span>
        </div> */}
        <h3 className="text-5xl font-bold text-zinc-800 gap-x-5 mt-5">{timer}</h3>
      </div>
    </section>
  );

}
export default Banner;
