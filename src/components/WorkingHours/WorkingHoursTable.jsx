import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
function WorkingHoursTable({ workingDay, updateWorkingDay, deleteWorkingDay }) {
  useEffect(() => {
    console.log(workingDay);
  }, []);

  const [day, setDay] = useState();

  // const onEditClick = async (v) => {
  // row.dayType,
  //             row.dayOfWork,
  //             row.dayOfWork,
  //             row.dayOfWork,
  //             row.fromTime,
  //             row.toTime,
  //             row.timeSlot
  //   console.log(v.dayType);
  //   setDay(v);
  //   console.log(day);
  //   try {
  //     const { value: formValues } = await Swal.fire({
  //       title: "Multiple inputs",
  //       html:
  //         `<input type = radio id="swal-input1"  name ='day' checked=${v.dayType === 'weekday' ? true: false}>` +
  //         `<input type = radio id="swal-input1"  name ='day' value=${true}>` +
  //         `<input id="swal-input1" class="swal2-input" value=${v.dayType}>` +
  //         '<input id="swal-input1" class="swal2-input" value="John">' +
  //         '<input id="swal-input1" class="swal2-input">' +
  //         '<input id="swal-input2" class="swal2-input">',
  //       focusConfirm: false,
  //       preConfirm: () => {
  //         return [
  //           document.getElementById("swal-input1").value,
  //           document.getElementById("swal-input2").value,
  //         ];
  //       },
  //     });
  //     if (formValues) {
  //       Swal.fire(JSON.stringify(formValues));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
    },
    {
      name: "Actions",
      selector: "action",
      cell: (row) => (
        <>
          <button
            className="btn btn-warning"
            onClick={() => updateWorkingDay(row)}
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteWorkingDay(row._id)}
          >
            Delete
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
