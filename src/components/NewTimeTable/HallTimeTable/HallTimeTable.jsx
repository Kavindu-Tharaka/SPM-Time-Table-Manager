import React from 'react'
import ContentHeader from '../../ContentHeader/ContentHeader'
import DataTable from "react-data-table-component";
import EmptyDataPlaceholder from '../../EmptyDataPlacehoder/EmptyDataPlaceholder'

function HallTimeTable({days}) {
 

    return (
        <div>
           <ContentHeader header={'Hall Time Table'} />
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
            <option>401-D</option>
            <option>402-D</option>
            <option>501-D</option>
            <option>N3B</option>
            <option>N4B</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <select>
            <option>New Building</option>
            <option>IT Faculty</option>
            <option>BM Faculty</option>
            <option>Engineering Faculty</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <select>
            <option>Floor 1</option>
            <option>Floor 2</option>
            <option>Floor 3</option>
            <option>Floor 4</option>
          </select>
        </div>
        
        <div className="col-md-2 mb-3">
          <button  className="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
      <DataTable columns = {days}  noDataComponent = {<EmptyDataPlaceholder message={'No Data Found'} />}/>
        </div>
    )
}

export default HallTimeTable
