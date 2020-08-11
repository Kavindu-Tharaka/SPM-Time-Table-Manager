import React,{useState} from "react";
import './Styles.css'

function WorkingHoursForm() {

  const [weekDay,setWeekDay] = useState(false);
  const [weekEnd,setWeekEnd] = useState(false);
  const [noOfWorkingDays, setNoOfWorkingDays] = useState(1);
  const [workingHours,setWorkingHours] = useState(1);
  const [workingMins,setWorkingMins] = useState(0);
  const [workingMonday,setWorkingMonday] = useState(false)
  const [workingTuesday,setWorkingTuesday] = useState(false)
  const [workingWednesday,setWorkingWednesday] = useState(false)
  const [workingThursday,setWorkingThursday] = useState(false)
  const [workingFriday,setWorkingFriday] = useState(false)
  const [workingSaturday,setWorkingSaturday] = useState(false)
  const [workingSunday,setWorkingSunday] = useState(false)





  return (
    <div className="container" >
      <form>
        {" "}
        {/*onSubmit={onSubmitHandler} */}
        <div className="row">
          <div className="col col-md-6">
            <h5>Day Type</h5>
            <div className="">
              <div className="wh-inputs_block">
                <label htmlFor="">Week Day</label>{" "}
                <input type="radio" name="dayType" />{" "}
                {/*onChange={ondayTypeChange} */}
              </div>

              <div className="wh-inputs_block">
                <label htmlFor="">Week End</label>{" "}
                <input type="radio" name="dayType" />{" "}
                {/* onChange={ondayTypeChange} */}
              </div>
            </div>
          </div>
          <div className="col col-md-6" >
            <h5>Number of working days</h5>
            <div className="">
              <input
                type="number"
                name=""
                min={1}
                max={7}
                // value={workingDays}
              />
            </div>
          </div>
          <div className="col col-md-6">
            <h5>Time Slot</h5>
            <div className="" style = {{backgroundColor: 'red'}}>
              <input
                type="number"
                name=""
                min={1}
                max={24}
                placeholder="hours"
                // value={hours}
                // onChange={(e) => {
                //   setHours(e.target.value);
                //   console.log(hours);
                // }}
              />
              <input
                type="number"
                name=""
                min={0}
                max={59}
                placeholder="mins"
                // value={mins}
                // onChange={(e) => {
                //   setMins(e.target.value);
                //   console.log(mins);
                // }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <h5>Working Days</h5>
            <div className="">
              <div className="wh-inputs_block">
                <label>Monday</label> <input type="radio" name="day" />{" "}
                
              </div>

              <div className="wh-inputs_block">
                <label>Tuesday</label> <input type="radio" name="day" />{" "}
                
              </div>

              <div className="wh-inputs_block"></div>

              <div className="wh-inputs_block">
                <label>Wednesday</label> <input type="radio" name="day" />{" "}
                
              </div>

              <div className="wh-inputs_block">
                <label>Thursday</label> <input type="radio" name="day" />{" "}
                
              </div>

              <div className="wh-inputs_block">
                <label>Friday</label> <input type="radio" name="day" />{" "}
                
              </div>

              <div className="wh-inputs_block">
                <label>Saturday</label> <input type="radio" name="day" />{" "}
                
              </div>

              <div className="wh-inputs_block">
                <label>Sunday</label> <input type="radio" name="day" />{" "}
                
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col  ">
            <button className="btn btn-primary wk-submit-button">Submit</button>{" "}
            {/*onClick = {addWorkList}*/}
          </div>
        </div>
      </form>
    </div>
  );
}

export default WorkingHoursForm;
