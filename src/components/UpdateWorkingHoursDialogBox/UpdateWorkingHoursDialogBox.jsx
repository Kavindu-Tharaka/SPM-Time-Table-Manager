import React, { useState } from "react";
import swal from "@sweetalert/with-react";
import axios from "axios";
function UpdateWorkingHoursDialogBox({ row, refreshComponent }) {
  const [id, setId] = useState(row._id);
  const [dayType, setDayType] = useState(row.dayType);
  const [noOfWorkingDays, setNoOfWorkingDays] = useState(row.noOfWorkingDays);
  const [workingHours, setWorkingHours] = useState(row.workingHours);
  const [workingMins, setWorkingMins] = useState(row.workingMins);
  const [dayOfWork, setDayOfWork] = useState(row.dayOfWork);
  const [fromTime, setFromTime] = useState(row.fromTime);
  const [toTime, setToTime] = useState(row.toTime);

  const onUpdateClick = () => {
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
        swal.close();
        refreshComponent()
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="dcdb-dialog-container">
      <h5 className="text-left m-0">Update Workind Days</h5>
      <hr />

      <div className="form-row">
        <label className="dialog-label">Room Type</label>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            name="daytype"
            className="custom-control-input"
            checked={dayType === "weekday" ? true : false}
            onChange={(e) => setDayType(e.target.value)}
          />
          <label className="custom-control-label" htmlFor="customRadioInline1">
            Week Day
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            name="daytype"
            className="custom-control-input"
            checked={dayType === "weekend" ? true : false}
            onChange={(e) => setDayType(e.target.value)}
          />
          <label className="custom-control-label" htmlFor="customRadioInline2">
            Week End
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <label className="dialog-label">From</label>
          <input
            type="time"
            className="form-control"
            placeholder="Room Name"
            onChange={(e) => setFromTime(e.target.value)}
            value={fromTime}
          />
        </div>
        <div className="form-group col">
          <label className="dialog-label">To</label>
          <input
            type="time"
            className="form-control"
            placeholder="Room Name"
            onChange={(e) => setToTime(e.target.value)}
            value={toTime}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col">
          <label className="dialog-label">Working Day</label>
          <select
            className="br-0 form-control form-control"
            onChange={(e) => setDayOfWork(e.target.value)}
            value={dayOfWork}
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
      </div>
      <button className="btn btn-info float-right mb-4" onClick={onUpdateClick}>
        Update
      </button>
      <button
        className="btn btn-secondary float-right mb-4 mr-2"
        onClick={() => {
          swal.close();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default UpdateWorkingHoursDialogBox;
