import React, { useState } from "react";
import Swal from 'sweetalert2'
import "./style.css";

function Form() {
  const [weekDay, setWeekDay] = useState(true);
  const [weekEnd, setWeekEnd] = useState(false);
  const [workingDays, setWorkingDays] = useState(1);
  const [hours, setHours] = useState();
  const [mins, setMins] = useState();

  const ondayTypeChange = () => {
   setWeekDay(!weekDay)
   setWeekEnd(weekDay)

   if(weekDay){
    setWorkingDays(5)
   } else{
    setWorkingDays(7)
   }


   console.log("week day :",weekDay)
   console.log("week end ", weekEnd)

  }


  const onCheckBoxClick = () => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Question 1',
        text: 'Chaining swal2 modals is easy'
      },
      'Question 2',
      'Question 3'
    ]).then((result) => {
      if (result.value) {
        const answers = JSON.stringify(result.value)
        Swal.fire({
          title: 'All done!',
          html: `
            Your answers:
            <pre><code>${answers}</code></pre>
          `,
          confirmButtonText: 'Lovely!'
        })
      }
    })
  }

  return (
    <div className="container">
      <form action="">
        <div className="row">
          <div className="col col-md-4">
            <h5>Day Type</h5>
            <div className="">
              <div className="inputs_block">
                <label htmlFor="">Week Day</label>{" "}
                <input type="radio" name="dayType" onChange={ondayTypeChange} />
              </div>

              <div className="inputs_block">
                <label htmlFor="">Week End</label>{" "}
                <input type="radio" name="dayType" onChange={ondayTypeChange} />
              </div>
            </div>
          </div>
          <div className="col col-md-4">
            <h5>Number of working days</h5>
            <div className="">
              <input type="number" name="" min={1} max={7} value={workingDays}/>
            </div>
          </div>
          <div className="col col-md-4">
            <h5>Time Slot</h5>
            <div className="">
              <input
                type="number"
                name=""
                min={1}
                max={24}
                placeholder="hours"
                value={hours}
                onChange={(e) => {
                  setHours(e.target.value)
                  console.log(hours)
                }}
              />
              <input
                type="number"
                name=""
                min={0}
                max={59}
                placeholder="mins"
                value={mins}
                onChange={(e) => {
                  setMins(e.target.value)
                  console.log(mins)
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <h5>Working Days</h5>
            <div className="">
              <div className="inputs_block">
                <label>Monday</label> <input type="checkbox" name="" onChange = {onCheckBoxClick}/>
              </div>

              <div className="inputs_block">
                <label>Tuesday</label> <input type="checkbox" name="" onChange = {onCheckBoxClick}/>
              </div>

              <div className="inputs_block"></div>

              <div className="inputs_block">
                <label>Wednesday</label> <input type="checkbox" name="" onChange = {onCheckBoxClick}/>
              </div>

              <div className="inputs_block">
                <label>Thursday</label> <input type="checkbox" name="" onChange = {onCheckBoxClick}/>
              </div>

              <div className="inputs_block">
                <label>Friday</label> <input type="checkbox" name="" onChange = {onCheckBoxClick}/>
              </div>

              <div className="inputs_block">
                <label>Saturday</label> <input type="checkbox" name="" onChange = {onCheckBoxClick}/>
              </div>

              <div className="inputs_block">
                <label>Sunday</label> <input type="checkbox" name="" onChange = {onCheckBoxClick}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col  ">
            <button className="btn btn-primary ">Submit</button>
          </div>
        </div>
      </form>

      <hr />
    </div>
  );
}

export default Form;
