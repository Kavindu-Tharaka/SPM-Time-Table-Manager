import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import SubNavLink from "../../models/SubNavLink";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar";
import NewTimeTable from "../../components/NewTimeTable/NewTimeTable";
import LecturerTimetable from "../../components/NewTimeTable/LecturerTimeTable/LecturerTimetable";
import StudentTimeTbale from "../../components/NewTimeTable/StudentTimeTable/StudentTimeTbale";
import HallTimeTable from "../../components/NewTimeTable/HallTimeTable/HallTimeTable";

function GenerateTimeTable(props) {
  const links = [
    new SubNavLink(
      "Generate New",
      "/timetables/generate-timetable",
      "generate-new"
    ),
    new SubNavLink(
      "Lecturer",
      "/timetables/lecturer-timetable",
      "lecturer-timetable"
    ),
    new SubNavLink(
      "Student",
      "/timetables/student-timetable",
      "student-timetable"
    ),
    new SubNavLink("Halls", "/timetables/hall-timetable", "hall-timetable"),
  ];

  useEffect(() => {
    props.setShowSubMenu(true);
  });

  const columns = [
    {
      name: "time",
      selector: "time",
      // cell: row => <div><div  >{row.title}</div>{row.monday.lectureName}</div>,
    },
    {
      name: "Monday",
      //selector: "monday",
      cell: (row) => (
        <div>
        
          <div className=""> {row.monday.lectureName}</div>
          <div className=""> {row.monday.hall}</div>
          <div className=""> {row.monday.session}</div>
        </div>
      ),
    },
    {
      name: "Tuesday",
      // selector: "tuesday",
      cell: (row) => (
        <div>
          
          <div className=""> {row.tuesday.lectureName}</div>
          <div className=""> {row.tuesday.hall}</div>
          <div className=""> {row.tuesday.session}</div>
        </div>
      ),
    },
    {
      name: "Wednesday",
      // selector: "wednesday",
      cell: (row) => (
        <div>
         
          <div className=""> {row.wednesday.lectureName}</div>
          <div className=""> {row.wednesday.hall}</div>
          <div className=""> {row.wednesday.session}</div>
        </div>
      ),
    },
    {
      name: "Thursday",
      // selector: "thursday",
      cell: (row) => (
        <div>
           
          <div className=""> {row.thursday.lectureName}</div>
          <div className=""> {row.thursday.hall}</div>
          <div className=""> {row.thursday.session}</div>
        </div>
      ),
    },
    {
      name: "Friday",
      // selector: "friday",
      cell: (row) => (
        <div>
          
          <div className=""> {row.friday.lectureName}</div>
          <div className=""> {row.friday.hall}</div>
          <div className=""> {row.friday.session}</div>
        </div>
      ),
    },
    {
      name: "Saturday",
      selector: "saturday",
    },
    {
      name: "Sunday",
      selector: "sunday",
    },
  ];

  return (
    <Fragment>
      <SubNavigationBar links={links} header="Time Tables" />
      <Switch>
        <Route
          path={"/timetables/generate-timetable"}
          component={NewTimeTable}
        />
        <Route
          path={"/timetables/lecturer-timetable"}
          component={() => <LecturerTimetable days={columns} />}
        />
        <Route
          path={"/timetables/student-timetable"}
          component={() => <StudentTimeTbale days={columns} />}
        />
        <Route
          path={"/timetables/hall-timetable"}
          component={() => <HallTimeTable days={columns} />}
        />
      </Switch>
    </Fragment>
  );
}

export default GenerateTimeTable;
