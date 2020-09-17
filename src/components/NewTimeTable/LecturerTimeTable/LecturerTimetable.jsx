import React from "react";
import ContentHeader from "../../ContentHeader/ContentHeader";

function LecturerTimetable() {
  return (
    <div>
      <ContentHeader header={"Lecturer Time Table"} />
      <div
        className="form-row"
        style={{
          
        }}
      >
        <div className="col-md-2 mb-3">
          <label>Lecturer Name:</label>
        </div>
        <div className="col-md-2 mb-3">
          <select>
            <option>Dr. Nuwan Kodagoda</option>
            <option>Dr. Saman Gunawardhena</option>
            <option>Mr. Jagath</option>
            <option>Mr. Kamal Perera</option>
            <option>Mr. Sunil Perera</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <button  className="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
    </div>
  );
}

export default LecturerTimetable;
