import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder'
import './workingHours.css'
import { IoMdClose, IoMdCreate } from 'react-icons/io';

import Swal from "sweetalert2";
function WorkingHoursTable({ workingDay, updateWorkingDay, deleteWorkingDay }) {
  useEffect(() => {
    console.log(workingDay);
  }, []);

  const columns = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
      omit: true,
    },
    {
      name: "Day Type",
      selector: "dayType",
      sortable: true,
    },
    {
      name: "Day of Work",
      selector: "dayOfWork",
      sortable: true,
    },

    {
      name: "From",
      selector: "fromTime",
    },
    {
      name: "To",
      selector: "toTime",
    },
    {
      name: "Time Slot",
      selector: "timeSlot",
      sortable : true
    },
    {
      name: "Actions",
      selector: "action",
      cell: (row) => (
        <>
          <button
            className="sm-ctrl-btn sm-ctrl-btn-upt"
            style = {style.button}
            onClick={() => updateWorkingDay(row)}
          >
          	<IoMdCreate />
          </button>
          <button
            style = {style.button}
            className="sm-ctrl-btn sm-ctrl-btn-dlt"
            onClick={() => deleteWorkingDay(row._id)}
          >
         	<IoMdClose />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <>
      <DataTable
        noDataComponent = {<EmptyDataPlaceholder message={'No Data Found'} />}
        
        subHeader = {true}
        title="Working Hours"
        columns={columns}
        data={workingDay}
        pagination={true}
        paginationTotalRows={7}
        paginationPerPage={7}
        highlightOnHover={true}
        responsive={true}
      />
    </>
  );
}

export default WorkingHoursTable;

// {workingDay.map((day) => (
//   <div>
//     <li>{day.dayOfWork}</li>
//     <li>{day.dayType}</li>
//     <li>{day.noOfWorkingDays}</li>
//     <li>{day.workingHours}</li>
//     <li>{day.workingMins}</li>
//   </div>
// ))}


const style = {
  button : {
    borderRadius : '50%',
    paddingBottom:10,
    // backgroundColor : 'lightgray',
    border:'none',
    marginRight:10,
  
    
  } 
}