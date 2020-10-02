import React, { useState, useEffect } from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import TagForGenerate from "../Tag/TagForGenerate";
import axios from "axios";
import PreLoader from "../PreLoader/PreLoader";

function NewTimeTable() {
  const [yearsemesters, setYearSemester] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSemester();
    getYear();
    getLecturers();
    gethalls();
  }, []);

  const getSemester = async () => {
    setLoading(true);
    try {
      const result = await axios.get("https://time-table-manager.herokuapp.com/api/v1/session");
      console.log(result.data.data);
      setSessions(result.data.data.sessions);
      setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };

  const getYear = async () => {
    setLoading(true);

    try {
      const result = await axios.get(
        "https://time-table-manager.herokuapp.com/api/v1/yearsemesters"
      );
      console.log(result.data.data.yearsemesters);
      setYearSemester(result.data.data.yearsemesters);
      setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };

  const getLecturers = async () => {
    setLoading(true);

    try {
      const result = await axios.get("https://time-table-manager.herokuapp.com/api/v1/lecturers");
      console.log(result.data.data.lecturers);
      setLecturers(result.data.data.lecturers);
      setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };

  const gethalls = async () => {
    setLoading(true);

    try {
      const result = await axios.get("https://time-table-manager.herokuapp.com/api/v1/rooms");
      console.log(result.data.data.rooms);
      setHalls(result.data.data.rooms);
      setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };


  const onGenerate = async () => {
    setLoading(true);
    try {
      const result = await axios.post('https://time-table-manager.herokuapp.com/api/v1/timetable/lecturer',{
        year : ['Y1','Y2','Y3','Y4'],
        semester :['S1','S2'],
        department :['SE','IT','DS','CS','ISE']
      })
      setLoading(false);
      console.log(result)
    } catch (error) {
      
    }
  }


  return (
    <div>
      <PreLoader loading={loading} />

      <ContentHeader header={"Generate Time Table"} />
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: "5%",
          padding: "10px",
          overflowY: "auto",
        }}
        className="row"
      >
        {yearsemesters.length > 0 ? (
          <TagForGenerate id={"1"} deleteMethod={() => {}} tagName={"Year"} />
        ) : null}
        {lecturers.length > 0 ? (
          <TagForGenerate id={"1"} deleteMethod={() => {}} tagName={"Lecturer"} />
        ) : null}
        {sessions.length > 0 ? (
          <TagForGenerate id={"1"} deleteMethod={() => {}} tagName={"Sessions"} />
        ) : null}
        {halls.length > 0 ? (
          <TagForGenerate id={"1"} deleteMethod={() => {}} tagName={"Hall"} />
        ) : null}

        {/* <Tag id={"1"} deleteMethod={() => {}} tagName={"kdhsabdhbsa"} /> */}
      </div>
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: "5%",
          padding: "10px",
          overflowY: "auto",
        }}
        className="row"
      >
        <button className="btn btn-primary" onClick={onGenerate}>Generate</button>
      </div>
    </div>
  );
}

export default NewTimeTable;
