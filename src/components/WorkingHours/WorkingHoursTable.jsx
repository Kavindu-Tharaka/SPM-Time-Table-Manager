import React, { useEffect } from "react";
import DataTable from "react-data-table-component";

function WorkingHoursTable({ workingDay,updateWorkingDay }) {
  useEffect(() => {
    console.log(workingDay);
  }, []);
  const data = [{ id: 1, title: "Conan the Barbarian", year: "1982" }];
  const columns = [
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
    },
    {
      name: "Actions",
      selector: "action",
      cell: (row) => (
        <>
          <button className="btn btn-warning" onClick = {() => updateWorkingDay(row.dayType)} >Update</button>
          <button className="btn btn-danger">Delete</button>
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
        title="Working Hours"
        columns={columns}
        data={workingDay}
        pagination={true}
        paginationTotalRows={7}
        paginationPerPage={7}
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
