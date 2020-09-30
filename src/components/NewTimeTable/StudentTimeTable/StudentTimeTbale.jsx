import React, { useEffect, useState } from "react";
import ContentHeader from "../../ContentHeader/ContentHeader";
import EmptyDataPlaceholder from "../../EmptyDataPlacehoder/EmptyDataPlaceholder";
import { data_ } from "../../../containers/dummydata";
import axios from "axios";
import DataTable from "react-data-table-component";

function StudentTimeTbale({ days }) {
  const [data, setData] = useState();
  const [year, setYear] = useState();
  const [department, setDepartment] = useState();
  const [semester, setSemester] = useState();

  // useEffect(() => {
  //   getTimeTableDetails();
  // }, []);

  // const getTimeTableDetails = async () => {

  // };

  const onSubmit = async () => {
    console.log(year);
    console.log(department);
    console.log(semester);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/v1/timetable",
        {
          year: year,
          department:department,
          semester:semester
        }
      );
      console.log(result?.data);
      setData(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDepartmentChange = (e) => {
    console.log(e.target.value);
    setDepartment(e.target.value);
  };

  const onYearChange = (e) => {
    console.log(e.target.value);
    setYear(e.target.value);
  };

  const onSemesterChange = (e) => {
    console.log(e.target.value);
    setSemester(e.target.value);
  };

  return (
    <div>
      <ContentHeader header={"Student Time Table"} />
      <div className="form-row" style={{}}>
        <div className="col-md-2 mb-3">
          <label>Student Group:</label>
        </div>
        <div className="col-md-2 mb-3">
          <select onChange={(e) => onDepartmentChange(e)}>
            <option value='SE'>Software Engineering</option>
            <option value='DS'>Data Science</option>
            <option value ='IT'>Information Technology</option>
            <option value='CS'>Cyber Security</option>
            <option value ='ISE'>Information Systems Engineering</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <select onChange={(e) => onYearChange(e)}>
            <option value="Y1">1st Year</option>
            <option value="Y2">2nd Year</option>
            <option value="Y3">3rd Year</option>
            <option value="Y4">4th Year</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <input
            type="radio"
            name="semester"
            value="S1"
            onChange={(e) => onSemesterChange(e)}
          />
          Semester 1
        </div>
        <div className="col-md-2 mb-3">
          <input
            type="radio"
            name="semester"
            value="S2"
            onChange={(e) => onSemesterChange(e)}
          />
          Semester 2
        </div>
        <div className="col-md-2 mb-3">
          <button className="btn btn-primary" type="submit" onClick={onSubmit}>
            Add
          </button>
        </div>
      </div>
      <DataTable
        columns={days}
        noDataComponent={<EmptyDataPlaceholder message={"No Data Found"} />}
        data={data}
      />
    </div>
  );
}

export default StudentTimeTbale;
