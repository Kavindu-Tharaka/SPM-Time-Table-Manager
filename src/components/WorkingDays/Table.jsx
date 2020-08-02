import React, { Component } from "react";
import DataTable from "react-data-table-component";

const data = [
  { id: 1, title: "Conan the Barbarian", year: "1982", action: "Action" },
  { id: 2, title: "Conan the Barbarian", year: "1984", action: "Action" },
  { id: 3, title: "Conan the Barbarian", year: "1986", action: "Action" },
  { id: 4, title: "Conan the Barbarian", year: "198", action: "Action" },
  { id: 5, title: "Conan the Barbarian", year: "1982", action: "Action" },
  { id: 6, title: "Conan the Barbarian", year: "1984", action: "Action" },
  { id: 7, title: "Conan the Barbarian", year: "1986", action: "Action" },
  { id: 8, title: "Conan the Barbarian", year: "198", action: "Action" },
  { id: 1, title: "Conan the Barbarian", year: "1982", action: "Action" },
  { id: 2, title: "Conan the Barbarian", year: "1984", action: "Action" },
  
];
const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
    right: true,
  },
  {
    name: "Action",
    cell: () => (
        <button className="btn btn-primary">Update</button>
    ),

    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export default class Table extends Component {
  render() {
    return (
      <DataTable
        title="Arnold Movies"
        columns={columns}
        data={data}
        pagination={true}
        paginationPerPage={5}
      />
    );
  }
}
