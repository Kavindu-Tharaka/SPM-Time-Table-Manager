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
  return (
    <Fragment>
      <SubNavigationBar links={links} header="Time Tables" />
      <Switch>
        <Route path={"/timetables/generate-timetable"} component={NewTimeTable} />
        <Route path={"/timetables/lecturer-timetable"} component={LecturerTimetable} />
        <Route path={"/timetables/student-timetable"} component={StudentTimeTbale} />
        <Route path={"/timetables/hall-timetable"} component={HallTimeTable} />
      </Switch>
    </Fragment>
  );
}

export default GenerateTimeTable;
