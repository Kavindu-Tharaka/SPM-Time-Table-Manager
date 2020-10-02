import React, { useEffect, useState } from "react";
import ContentHeader from "../../ContentHeader/ContentHeader";
import EmptyDataPlaceholder from "../../EmptyDataPlacehoder/EmptyDataPlaceholder";
import { data_ } from "../../../containers/dummydata";
import axios from "axios";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PreLoader from "../../PreLoader/PreLoader";

function StudentTimeTbale({ days }) {
  const [data, setData] = useState();
  const [year, setYear] = useState();
  const [department, setDepartment] = useState();
  const [semester, setSemester] = useState();
const[loading,setLoading] = useState(false)
  // useEffect(() => {
  //   getTimeTableDetails();
  // }, []);

  // const getTimeTableDetails = async () => {

  // };

  const onSubmit = async () => {
    console.log(year);
    console.log(department);
    console.log(semester);
    setLoading(true)
    try {
      const result = await axios.post(
        "http://localhost:8000/api/v1/timetable",
        {
          year: year,
          department: department,
          semester: semester,
        }
      );
      console.log(result?.data);
      setData(result?.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const onDepartmentChange = (e) => {
    console.log(e.target.value);
    setDepartment(e.target.value);
  };

  const onYearChange = (e) => {
    console.log(e.target.value);
    setYear(e.target.value);
  };

  const onSemesterChange = (e) => {
    console.log(e.target.value);
    setSemester(e.target.value);
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
      <ContentHeader header={"Student Time Table"} />
      <div className="form-row" style={{}}>
        <div className="col-md-2 mb-3">
          <label>Student Group:</label>
        </div>
        <div className="col-md-2 mb-3">
          <select onChange={(e) => onDepartmentChange(e)}>
            <option value="SE">Software Engineering</option>
            <option value="DS">Data Science</option>
            <option value="IT">Information Technology</option>
            <option value="CS">Cyber Security</option>
            <option value="ISE">Information Systems Engineering</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <select onChange={(e) => onYearChange(e)}>
            <option value="Y1">1st Year</option>
            <option value="Y2">2nd Year</option>
            <option value="Y3">3rd Year</option>
            <option value="Y4">4th Year</option>
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <input
            type="radio"
            name="semester"
            value="S1"
            onChange={(e) => onSemesterChange(e)}
          />
          Semester 1
        </div>
        <div className="col-md-2 mb-3">
          <input
            type="radio"
            name="semester"
            value="S2"
            onChange={(e) => onSemesterChange(e)}
          />
          Semester 2
        </div>
        <div className="col-md-1 mb-3" style={{ marginRight: "10px" }}>
          <button className="btn btn-primary" type="submit" onClick={onSubmit}>
            View
          </button>
        </div>{" "}
      </div>
      <div className=" mb-3">
        <div>
          <button className="btn btn-primary" onClick={printDocument}>
            Print
          </button>
        </div>
      </div>
      <div id="pdf" >
        <DataTable
          columns={days}
          noDataComponent={<EmptyDataPlaceholder message={"No Data Found"} />}
          data={data}
        />
      </div>
    </div>
  );
}

export default StudentTimeTbale;
