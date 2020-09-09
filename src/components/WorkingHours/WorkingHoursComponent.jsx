import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import ContentHeader from "../ContentHeader/ContentHeader";
import WorkingHoursForm from "../../components/WorkingHours/WorkingHoursForm";
import WorkingHoursTable from "./WorkingHoursTable";
import Swal from "sweetalert2";
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import axios from "axios";
// import WorkingHoursModal from "./WorkingHoursModal";
function WorkingHoursComponent() {
  //   const [day, setDay] = useState();
  const [workingDay, setWorkingDay] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [dayType, setDayType] = useState("weekday");
  const [noOfWorkingDays, setNoOfWorkingDays] = useState(0);
  const [workingHours, setWorkingHours] = useState("");
  const [workingMins, setWorkingMins] = useState("");
  const [dayOfWork, setDayOfWork] = useState("monday");
  const [fromTime, setFromTime] = useState("00:00");
  const [toTime, setToTime] = useState("00:00");
  const [updateComponent, setUpdateComponent] = useState(0);

  //validating the time slot
  const [isTimeSlotValid, setTimeSlotValid] = useState(true);

  //useEffect

  useEffect(() => {
    getData();
  }, [updateComponent]);

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

  const refreshComponent = () => {
    setUpdateComponent(Math.random());
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

    let hasErrorDetected = false;

    if (workingHours === "") {
      setTimeSlotValid(false);
      hasErrorDetected = true;
    }

    if (workingMins === "") {
      setTimeSlotValid(false);
      hasErrorDetected = true;
    }

    if (hasErrorDetected) {
      console.log("error is here ---------------");
      return;
    }

    setTimeSlotValid(true);

    if (
      dayType == "" ||
      workingHours == "" ||
      workingMins == "" ||
      fromTime == "" ||
      toTime == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: `Please Enter the Required Fields`,
      });
    } else {
      axios
        .get(`http://localhost:8000/api/v1/workingDays/type/count/${dayType}`)
        .then((res) => {
          console.log(res.dat);
          console.log(dayType);

          if (
            (res.data < 5 && dayType === "weekday") ||
            (res.data < 7 && dayType === "weekend")
          ) {
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
                  store.addNotification(
                    buildToast('success', 'Success', 'Room Added Successfully')
                  );
                  clear();
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            console.log(res.data);
            Swal.fire({
              icon: "error",
              title: "Sorry",
              text: `You have Reach Maximum Entries for! ${dayType}`,
            });
            return false;
          }
        });
    }
  };

  const addWorkingDay = (values) => {
    values.timeSlot = values.workingHours + ":" + values.workingMins;
    console.log(values);
    setWorkingDay([...workingDay, values]);
  };

  const clear = () => {
    setDayType("weekday");
    setNoOfWorkingDays("");
    setWorkingHours();
    setWorkingMins();
    setDayOfWork("monday");
    setFromTime("00:00");
    setToTime("00:00");
  };

  return (
    <div>
      <ContentHeader header={"Working Time"} />

      <form onSubmit={onSubmitHandler} style={{ marginBottom: 20 }}>
        {" "}
        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col col-md-2">
            <h6>Day Type</h6>
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
            <h6>Number of working days</h6>
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
            <h6>From</h6>
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
            <h6>To</h6>
            <div className="">
              <input
                type="time"
                name=""
                value={toTime}
                onChange={(e) => onToTimeChange(e)}
              />
            </div>
          </div>
          <div className="col col-md-2" >
            <h6>Time Slot</h6>
            <div className="" >
              <input
              style={{
                width: "105px",
                height:'28px',
                display: 'inline-block'
              }}
                className={
                  isTimeSlotValid ? "form-control" : "form-control is-invalid"
                }
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
                disabled={edit ? true : false}
              />
              
              <input
               style={{
                width: "105px",
                height:'28px',
                display: 'inline-block'

              }}
                className={
                  isTimeSlotValid ? "form-control" : "form-control is-invalid"
                }
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
                disabled={edit ? true : false}
              />
              <div className="invalid-feedback">Please provide a Valid Time Slot</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <h6>Working Days</h6>
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
                  disabled={dayType === "weekday" ? true : false}
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
                  disabled={dayType === "weekday" ? true : false}
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
        refreshComponent={refreshComponent}
      />
    </div>
  );
}

export default WorkingHoursComponent;
