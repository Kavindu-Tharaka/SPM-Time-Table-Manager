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
    new SubNavLink("Generate New", "/timetables/generate-timetable", "generate-new"),
    new SubNavLink("Lecturer", "/timetables/lecturer-timetable", "lecturer-timetable"),
    new SubNavLink("Student", "/timetables/student-timetable", "student-timetable"),
    new SubNavLink("Halls", "/timetables/hall-timetable", "hall-timetable"),
  ];

  useEffect(() => {
    props.setShowSubMenu(true);
  });

  const columns = [
    {
      name: "Monday",
      selector: "monday",
    },
    {
      name: "Tuesday",
      selector: "tuesday",
    },
    {
      name: "Wednesday",
      selector: "wednesday",
    },
    {
      name: "Thursday",
      selector: "thursday",
    },
    {
      name: "Friday",
      selector: "friday",
    },
    {
      name: "Saturday",
      selector: "saturday",
    },
    {
      name: "Sunday",
      selector: "sunday",
    },
  ]




  return (
    <Fragment>
      <SubNavigationBar links={links} header="Time Tables" />
      <Switch>
        <Route path={"/timetables/generate-timetable"} component={NewTimeTable} />
        <Route path={"/timetables/lecturer-timetable"} component={() => <LecturerTimetable days = {columns}/>} />
        <Route path={"/timetables/student-timetable"} component={() =>  <StudentTimeTbale days = {columns}/>} />
        <Route path={"/timetables/hall-timetable"} component={() => <HallTimeTable days= {columns} />} />
      </Switch>
    </Fragment>
  );
}

export default GenerateTimeTable;
