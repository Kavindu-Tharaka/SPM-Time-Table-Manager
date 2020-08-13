import React, { useState } from "react";
import "./Styles.css";

function WorkingHoursForm({addWorkingDay}) {
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
    <div className="container" style = {{width: "1100px"}}>
      <form  onSubmit={onSubmitHandler}>
        {" "}
       
        <div className="row" style={{marginBottom : '30px'}}>
          <div className="col col-md-2">
            <h5>Day Type</h5>
            <div className="">
              <div className="wh-inputs_block">
                <label htmlFor="">Week Day</label>{" "}
                <input
                  type="radio"
                  name="dayType"
                  value="weekday"
                  onChange={(e) => ondayTypeChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label htmlFor="">Week End</label>{" "}
                <input
                  type="radio"
                  name="dayType"
                  value="weekend"
                  onChange={(e) => ondayTypeChange(e.target.value)}
                />{" "}
              </div>
            </div>
          </div>
          <div className="col col-md-2">
            <h5>Number of working days</h5>
            <div className="">
              <input
                type="number"
                name=""
                min={1}
                max={7}
                value={noOfWorkingDays}
              />
            </div>
          </div>
          <div className="col col-md-2">
            <h5>From</h5>
            <div className="">
              <input
                type="time"
                name=""
                value = {fromTime}
                onChange={e => onFromTimeChange(e)}
              />
            </div>
          </div>
          <div className="col col-md-2">
            <h5>To</h5>
            <div className="">
              <input
                type="time"
                name=""
                value={toTime}
                onChange={e => onToTimeChange(e)}
              />
            </div>
          </div>
          <div className="col col-md-2">
            <h5>Time Slot</h5>
            <div className="" >
              <input
                type="number"
                name=""
                min={1}
                max={24}
                placeholder="hours"
                value={workingHours}
                onChange={(e) => {
                  setWorkingHours(e.target.value);
                  console.log(workingHours);
                }}
              />
              <input
                type="number"
                name=""
                min={0}
                max={59}
                step = {30}
                placeholder="mins"
                value={workingMins}
                onChange={(e) => {
                  setWorkingMins(e.target.value);
                  console.log(workingMins);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <h5>Working Days</h5>
            <div className="">
              <div className="wh-inputs_block">
                <label>Monday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="monday"
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Tuesday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="tuesday"
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block"></div>

              <div className="wh-inputs_block">
                <label>Wednesday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="wednesday"
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Thursday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="thursday"
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Friday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="friday"
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Saturday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="saturday"
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Sunday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="sunday"
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col  ">
            <button className="btn btn-primary wk-submit-button">Submit</button>{" "}
           
          </div>
        </div>
      </form>
    </div>
  );
}

export default WorkingHoursForm;
