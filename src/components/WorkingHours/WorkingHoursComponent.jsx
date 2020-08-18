import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import WorkingHoursForm from "../../components/WorkingHours/WorkingHoursForm";
import WorkingHoursTable from "./WorkingHoursTable";
import axios from "axios";
// import WorkingHoursModal from "./WorkingHoursModal";
function WorkingHoursComponent() {
  //   const [day, setDay] = useState();
  const [workingDay, setWorkingDay] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [dayType, setDayType] = useState("");
  const [noOfWorkingDays, setNoOfWorkingDays] = useState(1);
  const [workingHours, setWorkingHours] = useState(1);
  const [workingMins, setWorkingMins] = useState(0);
  const [dayOfWork, setDayOfWork] = useState("");
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();

  //useEffect

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:8000/api/v1/workingDays")
      .then((result) => {
        console.log(result.data);
        setWorkingDay(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const ondayTypeChange = (value) => {
    setDayType(value);
    if (value == "weekday") setNoOfWorkingDays(5);
    else setNoOfWorkingDays(7);
  };

  const onWorkingDayChange = (value) => {
    console.log(value);
    setDayOfWork(value);
  };

  const onFromTimeChange = (e) => {
    console.log(e.target.value, "from Time");
    setFromTime(e.target.value);
  };

  const onToTimeChange = (e) => {
    console.log(e.target.value, "To time");
    setToTime(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // setId(Math.round(Math.random() * 10));

    if (!edit) {
      axios
        .post("http://localhost:8000/api/v1/workingDays", {
          id,
          dayType,
          noOfWorkingDays,
          workingHours,
          workingMins,
          dayOfWork,
          fromTime,
          toTime,
        })
        .then((res) => {
          console.log(res);
          addWorkingDay(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Im editing");
      const updateDay = {
        dayType,
        noOfWorkingDays,
        workingHours,
        workingMins,
        dayOfWork,
        fromTime,
        toTime,
      };
      axios
        .patch(`http://localhost:8000/api/v1/workingDays/${id}`, {
          dayType,
          noOfWorkingDays,
          workingHours,
          workingMins,
          dayOfWork,
          fromTime,
          toTime,
        })
        .then((res) => {
          console.log(res.data);
          editWorkingDay(res.data);
          setEdit(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const addWorkingDay = (values) => {
    values.timeSlot = values.workingHours + ":" + values.workingMins;
    console.log(values);
    setWorkingDay([...workingDay, values]);
  };

  const editWorkingDay = (updateDay) => {
    setWorkingDay( workingDay.map((day) => {
          if (day.id === updateDay.id) {
            day.id = updateDay.id;
            day.dayType = updateDay.dayType;
            day.noOfWorkingDays = updateDay.noOfWorkingDays;
            day.workingHours = updateDay.workingHours;
            day.workingMins = updateDay.workingMins;
            day.dayOfWork = updateDay.dayOfWork;
            //   day.fromTime = updateDay.fromTime;
            //   day.toTime = updateDay.toTime;
          }
          console.log("updated day ==== ", day);
          return day;
        }),
      
    );
  };

  const updateWorkingDay = (value, e) => {
    setId(value._id);
    setDayType(value.dayType);
    setNoOfWorkingDays(value.noOfWorkingDays);
    setWorkingHours(value.workingHours);
    setWorkingMins(value.workingMins);
    setDayOfWork(value.dayOfWork);
    setFromTime(value.fromTime);
    setToTime(value.toTime);
    setEdit(true);
  };

  //deleting a working day
  const deleteWorkingDay = (rowID) => {
    console.log(rowID);
    axios
      .delete(`http://localhost:8000/api/v1/workingDays/${rowID}`)
      .then((res) => {
        console.log(res);
        setWorkingDay(
            workingDay.filter(day => {return day._id !== rowID})
        );
      })
      .catch((e) => console.log(e));

    // return setWorkingDay([
    //   workingDay,
    //   workingDay.filter((day) => day.id !== id),
    // ]);
  };

  return (
    <div className="">
      {/* <WorkingHoursModal/>*/}
      <HeaderComponent title={"Working Time"} />

      <form onSubmit={onSubmitHandler} style = {{marginBottom:20}}>
        {" "}
        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col col-md-2">
            <h5>Day Type</h5>
            <div className="">
              <div className="wh-inputs_block">
                <label htmlFor="">Week Day</label>{" "}
                <input
                  type="radio"
                  name="dayType"
                  value="weekday"
                  checked={dayType === "weekday" ? true : false}
                  onChange={(e) => ondayTypeChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label htmlFor="">Week End</label>{" "}
                <input
                  id="rd_weekend"
                  type="radio"
                  name="dayType"
                  value="weekend"
                  checked={dayType === "weekend" ? true : false}
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
                disabled={true}
              />
            </div>
          </div>
          <div className="col col-md-2">
            <h5>From</h5>
            <div className="">
              <input
                type="time"
                name=""
                value={fromTime}
               
                onChange={(e) => onFromTimeChange(e)}
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
                onChange={(e) => onToTimeChange(e)}
              />
            </div>
          </div>
          <div className="col col-md-2">
            <h5>Time Slot</h5>
            <div className="">
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
                step={30}
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
                  checked={dayOfWork === "monday" ? true : false}
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Tuesday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="tuesday"
                  checked={dayOfWork === "tuesday" ? true : false}
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
                  checked={dayOfWork === "wednesday" ? true : false}
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Thursday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="thursday"
                  checked={dayOfWork === "thursday" ? true : false}
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Friday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="friday"
                  checked={dayOfWork === "friday" ? true : false}
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Saturday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="saturday"
                  checked={dayOfWork === "saturday" ? true : false}
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                  disabled = {dayType === 'weekday' ? true : false}

                />{" "}
              </div>

              <div className="wh-inputs_block">
                <label>Sunday</label>{" "}
                <input
                  type="radio"
                  name="day"
                  value="sunday"
                  checked={dayOfWork === "sunday" ? true : false}
                  onChange={(e) => onWorkingDayChange(e.target.value)}
                  disabled = {dayType === 'weekday' ? true : false}
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col  ">
            <button className="btn btn-primary wk-submit-button">
              {edit ? "Edit" : "Submit"}
            </button>{" "}
          </div>
        </div>
      </form>

      <WorkingHoursForm addWorkingDay={addWorkingDay} />
      <WorkingHoursTable
        workingDay={workingDay}
        updateWorkingDay={updateWorkingDay}
        deleteWorkingDay={deleteWorkingDay}
      />
    </div>
  );
}

export default WorkingHoursComponent;
