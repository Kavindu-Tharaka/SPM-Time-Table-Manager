import React, { useState } from "react";
import "./Styles.css";

function WorkingHoursForm({addWorkingDay, day}) {
  const [dayType, setDayType] = useState('');
  const [noOfWorkingDays, setNoOfWorkingDays] = useState(1);
  const [workingHours, setWorkingHours] = useState(1);
  const [workingMins, setWorkingMins] = useState(0);
  const [dayOfWork,setDayOfWork] = useState('')
  const [fromTime, setFromTime] = useState()
  const [toTime,setToTime] = useState()


  

  const ondayTypeChange = (value) => {
    setDayType(value)
    if(value == 'weekday')
      setNoOfWorkingDays(5)
    else 
      setNoOfWorkingDays(7)
  };

  const onWorkingDayChange = (value) => {
    console.log(value)
    setDayOfWork(value)
  };

  const onFromTimeChange = e => {
    console.log(e.target.value, 'from Time')
    setFromTime(e.target.value)
  }

  const onToTimeChange = e => {
    console.log(e.target.value, "To time")
    setToTime(e.target.value)
  }


  const onSubmitHandler = (e) => {
    e.preventDefault()
    let newDay = {
      dayType,
      noOfWorkingDays,
      workingHours,
      workingMins,
      dayOfWork,
      fromTime,
      toTime
    }
    addWorkingDay(newDay)
   
  };



// Styles hadanna ona

  return (
    <div className="" style = {{width: "1100px"}}>
 
    </div>
  );
}

export default WorkingHoursForm;
