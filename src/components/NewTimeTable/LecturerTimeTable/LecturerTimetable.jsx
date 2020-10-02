import React, { useEffect, useState } from "react";
import ContentHeader from "../../ContentHeader/ContentHeader";
import EmptyDataPlaceholder from "../../EmptyDataPlacehoder/EmptyDataPlaceholder";
import Datatable from "react-data-table-component";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PreLoader from "../../PreLoader/PreLoader";


function LecturerTimetable({ days }) {
  const [lecturers, setLecturers] = useState([]);
  const [data, TableData] = useState();
  const [selectedLecturer, setSelectedLecturer] = useState("Nuwan Kodagoda");
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    getLecturers();
  }, []);

  const getLecturers = async () => {
    setLoading(true)
    try {
      const result = await axios.get("https://time-table-manager.herokuapp.com/api/v1/lecturers");
      console.log(result.data.data.lecturers);
      setLecturers(result.data.data.lecturers);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const getLectureTimeTable = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        "https://time-table-manager.herokuapp.com/api/v1/timetable/lecturer",
        {
          lecturer: selectedLecturer,
        }
      );
      console.log(result);
      TableData(result.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const onLecturerChange = (e) => {
    setSelectedLecturer(e.target.value);
  };

  const printDocument = () => {
    const input = document.getElementById("pdf");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <div>
       <PreLoader loading={loading} hasSideBar={true} />
      <ContentHeader header={"Lecturer Time Table"} />
      <div className="form-row">
        <div className="col-md-2 mb-3 ">
          <label>Lecturer Name:</label>
        </div>
        <div className="col-md-2 mb-3">
          <select onChange={(e) => onLecturerChange(e)}>
            {lecturers.map((lecturer, index) => {
              return <option key={index} value={lecturer.name}>{lecturer.name}</option>;
            })}
          </select>
        </div>
        <div className="col-md-2 mb-3 ml-3">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={getLectureTimeTable}
          >
            View
          </button>
        </div>
      </div>
      <div className=" mb-3">
        <button className="btn btn-primary" onClick={printDocument}>
          Print
        </button>
      </div>
      <div id="pdf">
        <Datatable
          columns={days}
          noDataComponent={<EmptyDataPlaceholder message={"No Data Found"} />}
          data={data}
        />
      </div>
    </div>
  );
}

export default LecturerTimetable;
