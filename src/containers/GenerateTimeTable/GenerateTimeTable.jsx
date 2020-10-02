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
          {row.monday === undefined ? (
            <div>*</div>
          ) : (
            <>
              <div className=""> {row.monday.lecturers[0]}</div>
              <div className=""> {row.monday.subject}</div>
              <div className=""> {row.monday.tag}</div>
            </>
          )}
        </div>
      ),
    },
    {
      name: "Tuesday",
      // selector: "tuesday",
      cell: (row) => (
        <div>
          {row.tuesday === undefined ? (
            <div>*</div>
          ) : (
            <>
              <div className=""> {row.tuesday.lecturers[0]}</div>
              <div className=""> {row.tuesday.subject}</div>
              <div className=""> {row.tuesday.tag}</div>
            </>
          )}
        </div>
      ),
    },
    {
      name: "Wednesday",
      // selector: "wednesday",
      cell: (row) => (
        <div>
          {row.wednesday === undefined ? (
            <div>*</div>
          ) : (
            <>
              <div className=""> {row.wednesday.lecturers[0]}</div>
              <div className=""> {row.wednesday.subject}</div>
              <div className=""> {row.wednesday.tag}</div>
            </>
          )}
        </div>
      ),
    },
    {
      name: "Thursday",
      // selector: "thursday",
      cell: (row) => (
        <div>
        {row.thursday === undefined ? (
          <div>*</div>
        ) : (
          <>
            <div className=""> {row.thursday.lecturers[0]}</div>
            <div className=""> {row.thursday.subject}</div>
            <div className=""> {row.thursday.tag}</div>
          </>
        )}
      </div>
      ),
    },
    {
      name: "Friday",
      // selector: "friday",
      cell: (row) => (
        <div>
        {row.friday === undefined ? (
          <div>*</div>
        ) : (
          <>
            <div className=""> {row.friday.lecturers[0]}</div>
            <div className=""> {row.friday.subject}</div>
            <div className=""> {row.friday.tag}</div>
          </>
        )}
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
