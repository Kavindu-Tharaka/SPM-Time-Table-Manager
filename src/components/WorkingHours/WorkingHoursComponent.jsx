import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import ContentHeader from "../ContentHeader/ContentHeader";
import WorkingHoursForm from "../../components/WorkingHours/WorkingHoursForm";
import WorkingHoursTable from "./WorkingHoursTable";
import Swal from "sweetalert2";
import axios from "axios";
// import WorkingHoursModal from "./WorkingHoursModal";
function WorkingHoursComponent() {
  //   const [day, setDay] = useState();
  const [workingDay, setWorkingDay] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [dayType, setDayType] = useState("");
  const [noOfWorkingDays, setNoOfWorkingDays] = useState(0);
  const [workingHours, setWorkingHours] = useState();
  const [workingMins, setWorkingMins] = useState();
  const [dayOfWork, setDayOfWork] = useState("");
  const [fromTime, setFromTime] = useState("00:00");
  const [toTime, setToTime] = useState("00:00");

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
    // console.log( getDayTypeCount())
    e.preventDefault();
    // setId(Math.round(Math.random() * 10));
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
                  Swal.fire(
                    "Submited!",
                    "Entry has been sucessfuly submited.",
                    "success"
                  );
                  clear();
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

              Swal.fire("Updated!", "Your Entry has been updated.", "success");

              clear();
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

  const editWorkingDay = (updateDay) => {
    console.log("UPDATE DAY = ", updateDay);
    setWorkingDay(
      workingDay.map((day) => {
        console.log(day);
        if (day._id === updateDay._id) {
          day.dayType = updateDay.dayType;
          day.noOfWorkingDays = updateDay.noOfWorkingDays;
          day.workingHours = updateDay.workingHours;
          day.workingMins = updateDay.workingMins;
          day.dayOfWork = updateDay.dayOfWork;
        }
        console.log("updated day ==== ", day);
        return day;
      })
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`http://localhost:8000/api/v1/workingDays/${rowID}`)
          .then((res) => {
            console.log(res);
            setWorkingDay(
              workingDay.filter((day) => {
                return day._id !== rowID;
              })
            );
          })
          .catch((e) => console.log(e));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const clear = () => {
    setDayType("");
    setNoOfWorkingDays("");
    setWorkingHours();
    setWorkingMins();
    setDayOfWork(0);
    setFromTime("00:00");
    setToTime("00:00");
  };

  return (
    <div>
      {/* <WorkingHoursModal/>*/}
      {/* <HeaderComponent title={"Working Time"} /> */}
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
          <div className="col col-md-2">
            <h6>Time Slot</h6>
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
                disabled={edit ? true : false}
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
                disabled={edit ? true : false}
              />
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
                  checked={dayOfWork === "sunday" ? true : false} // (dayType === 'weekend' ? false : true)
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
        updateWorkingDay={updateWorkingDay}
        deleteWorkingDay={deleteWorkingDay}
      />
    </div>
  );
}

export default WorkingHoursComponent;
