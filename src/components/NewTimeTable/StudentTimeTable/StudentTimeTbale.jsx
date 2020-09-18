import React from "react";
import ContentHeader from "../../ContentHeader/ContentHeader";
import EmptyDataPlaceholder from '../../EmptyDataPlacehoder/EmptyDataPlaceholder'

import DataTable from 'react-data-table-component'
function StudentTimeTbale({days}) {
  return (
    <div>
      <ContentHeader header={"Student Time Table"} />
      <div className="form-row" style={{}}>
        <div className="col-md-2 mb-3">
          <label>Student Group:</label>
        </div>
        <div className="col-md-2 mb-3">
          <select>
            <option>Software Engineering</option>
            <option>Data Science</option>
            <option>Information Technology</option>
            <option>Cyber Security</option>
            <option>Information Systems Engineering</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <select>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
            <input type = 'radio' name ='semester'/>Semester 1 
        </div>
        <div className="col-md-2 mb-3">
            <input type = 'radio' name ='semester'/>Semester 2 
        </div>
        <div className="col-md-2 mb-3">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </div>
      <DataTable columns = {days} noDataComponent = {<EmptyDataPlaceholder message={'No Data Found'} />}/>
    </div>
  );
}

export default StudentTimeTbale;
