import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import ContentHeader from '../ContentHeader/ContentHeader';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import axios from "axios";
import './lecturerContent.css';
import Swal from 'sweetalert2';

const LecturerContent = () => {

    const [name, setName] = useState("");
    const [faculty, setFaculty] = useState("Computing");
    const [center, setCenter] = useState("Malabe");
    const [level, setLevel] = useState("Professor");
    const [employeeId, setEmpId] = useState("");
    const [department, setDepartment] = useState("Department Of Information Technology");
    const [building, setBuilding] = useState("Main Building");
    const [lecturerDetails, setLecturerDetails] = useState("");
    const [rank, setRank] = useState(1);
    const [rankVal, setRankVal] = useState("");

    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onfacultyChange = (e) => {
        setFaculty(e.target.value)
    }
    const onCenterChange = (e) => {
        setCenter(e.target.value)
    }
    const onLevelChange = (e) => {
        setLevel(e.target.value)

        if (e.target.value === "Professor") {
            setRank(1);
        }
        else if (e.target.value === "Assistant Professor") {
            setRank(2);
        }
        else if (e.target.value === "Senior Lecturer(HG)") {
            setRank(3);
        }
        else if (e.target.value === "Senior Lecturer") {
            setRank(4);
        }
        else if (e.target.value === "Lecturer") {
            setRank(5);
        }
        else if (e.target.value === "Assistant Lecturer") {
            setRank(6);
        }
        else if (e.target.value === "Instructor") {
            setRank(7);
        }
    }
    const onEmpIdChange = (e) => {
        setEmpId(e.target.value)
        const rank_input = document.getElementById('rank-input');
        const eIn = document.getElementById('empId-input');
        rank_input.value = `${rank}.${eIn.value}`;
        setRankVal(`${rank}.${eIn.value}`);
    }
    const onDepartmentChange = (e) => {
        setDepartment(e.target.value)
    }
    const onBuildingChange = (e) => {
        setBuilding(e.target.value)
    }
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        axios
            .get("http://localhost:8000/api/v1/lecturers")
            .then((result) => {
                console.log("api response: ", result.data.data.lecturers);
                setLecturerDetails(result.data.data.lecturers);

            })
            .catch((e) => {
                console.error(e);
            });
    };
    const deleteLecturer = (rowID) => {
        console.log("id is: ", rowID);
        axios
            .delete(`http://localhost:8000/api/v1/lecturers/${rowID}`)
            .then((res) => {
                console.log(res);
                setLecturerDetails(
                    lecturerDetails.filter(lec => { return lec._id !== rowID })
                );
            })
            .catch((e) => console.error(e));
    }
    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' && employeeId === '') {
            Swal.fire('Please Enter a Name and Valid Employee Id!');
            setName('');
            setEmpId('');
        }
        else if (employeeId === '') {
            Swal.fire('Please Enter A Valid Employee Id!');
        }
        else if (name === '') {
            Swal.fire('Please Enter a Name!');
            setName('');
        }
        else if (employeeId.length !== 6) {
            Swal.fire('Employee Id should be 6 digit number');
            setEmpId('');
        }
        else {

            axios.post("http://localhost:8000/api/v1/lecturers", {
                name,
                faculty,
                center,
                level,
                employeeId,
                department,
                building,
                rankVal
            }).then((res) => {
                window.location.reload()
                //console.log("data added", res);
            }).catch((err) => {
                console.log("err is: ", err);
            });
        }
    }

    const columns = [
        {
            name: "ID",
            selector: "_id",
            sortable: true,
            omit: true,
        },
        {
            name: 'Lecturer',
            selector: 'name',
            sortable: true,
            cell: row => <div>{row.name}</div>
        },
        {
            name: 'EmployeeId',
            selector: 'employeeId',
            sortable: true,
        },
        {
            name: 'Faculty',
            selector: 'faculty',
            sortable: true,
            cell: row => <div>{row.faculty}</div>
        },
        {
            name: 'Department',
            selector: 'department',
            sortable: true,
            cell: row => <div>{row.department}</div>
        },
        {
            name: 'Center',
            selector: 'center',
            sortable: true,
        },
        {
            name: 'Building',
            selector: 'building',
            sortable: true,
            cell: row => <div>{row.building}</div>
        },
        {
            name: 'Level',
            selector: 'level',
            sortable: true,

        },
        {
            name: 'Rank',
            selector: 'rankVal',
        },
        {
            name: 'Action',
            selector: 'action',
            // right: true,
            cell:
                (row) => (
                    <div className="d-flex">
                        <button id="btn-edit" className="btn rounded-circle border-none btn-sm"><FaPencilAlt color="#1a1aff" /></button>&nbsp;
                        <button id="btn-remove" className="btn rounded-circle border-none btn-sm" onClick={() => deleteLecturer(row._id)}><FaTrashAlt color="#1a1aff" /></button>
                    </div>
                )
        },
    ];
    return (
        <div>
            <div>
                <ContentHeader header={'Lecturers'} />
                <br />
                <form onSubmit={onSubmit}>
                    <div className="d-flex ">

                        <div>
                            <p className="mb-1">Name</p>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => onNameChange(e)} />
                        </div>

                        <div id="faculty-container">
                            <p className="mb-1">Faculty</p>
                            <div className="">
                                <select onChange={(e) => onfacultyChange(e)} value={faculty} name="faculty" className="custom-select" id="faculty-select">
                                    <option value="Computing">Computing</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Business">Business</option>
                                    <option value="Humanities & Scienes">Humanities & Scienes</option>
                                    <option value="Graduate Studies & Research">Graduate Studies & Research</option>
                                    <option value="School of Architecture">School of Architecture</option>
                                    <option value="School of Law">School of Law</option>
                                    <option value="School of Hospitality & Culinary">School of Hospitality & Culinary</option>
                                </select>
                            </div>
                        </div>

                        <div id="center-container">
                            <p className="mb-1">Center</p>
                            <div className="">
                                <select onChange={(e) => onCenterChange(e)} value={center} name="center" className="custom-select" id="center-select">
                                    <option value="malabe">Malabe</option>
                                    <option value="Metro Campus">Metro Campus</option>
                                    <option value="SLIIT Academy">SLIIT Academy</option>
                                    <option value="Mathara">Mathara</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Kurunagala">Kurunagala</option>
                                    <option value="Jaffna">Jaffna</option>
                                </select>
                            </div>
                        </div>

                        <div id="level-container">
                            <p className="mb-1">Level</p>
                            <div>
                                <select value={level} onChange={(e) => onLevelChange(e)} name="level" className="custom-select" id="level-select">
                                    <option value="Professor">Professor</option>
                                    <option value="Assistant Professor">Assistant Professor</option>
                                    <option value="Senior Lecturer(HG)">Senior Lecturer(HG)</option>
                                    <option value="Senior Lecturer">Senior Lecturer</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Assistant Lecturer">Assistant Lecturer</option>
                                    <option value="Instructor">Instructors</option>
                                </select>
                            </div>
                        </div>

                    </div>{/*first row ends*/}
                    <br />
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="mb-1">Employee Id</p>
                            <input
                                id="empId-input"
                                type="number"
                                name="empId"
                                value={employeeId}
                                onChange={(e) => onEmpIdChange(e)}
                            />
                        </div>

                        <div id="department-container">
                            <p className="mb-1">Department</p>
                            <div className="">
                                <select value={department} onChange={(e) => onDepartmentChange(e)} name="department" className="custom-select" id="department-select" >
                                    <option value="Department Of Information Technology">Department Of Information Technology</option>
                                    <option value="Department Of COMPUTER SCIENCE & SOFTWARE ENGINEERING">Department Of COMPUTER SCIENCE & SOFTWARE ENGINEERING</option>
                                    <option value="Department Of COMPUTER SYSTEMS ENGINEERING">Department Of COMPUTER SYSTEMS ENGINEERING</option>
                                    <option value="Department Of ELECTRICAL & ELECTRONIC ENGINEERING">Department Of ELECTRICAL & ELECTRONIC ENGINEERING</option>
                                    <option value="Department Of MECHANICAL ENGINEERING">Department Of MECHANICAL ENGINEERING</option>
                                    <option value="Department Of MATERIALS ENGINEERING">Department Of MATERIALS ENGINEERING</option>
                                    <option value="Department Of CIVIL ENGINEERING">Department Of CIVIL ENGINEERING</option>
                                    <option value="Department Of QUANTITY SURVEYING">Department Of QUANTITY SURVEYING</option>
                                    <option value="SLIIT SCHOOL Of ARCHITECTURE">SLIIT SCHOOL Of ARCHITECTURE</option>
                                </select>
                            </div>
                        </div>
                        <div id="building-container">
                            <p className="mb-1">Building</p>
                            <div className="">
                                <select value={building} onChange={(e) => onBuildingChange(e)} name="building" className="custom-select" id="building-select">
                                    <option value="Main Building">Main Building</option>
                                    <option value="New Building">New Building</option>
                                    <option value="Engineering Building">Engineering Building</option>
                                    <option value="Buisnees Faculty Building">Buisnees Faculty Building</option>
                                    <option value="CAHM">CAHM</option>
                                </select>
                            </div>
                        </div>

                        <div id="rank-container">
                            <p className="mb-1">Rank</p>
                            <input
                                id="rank-input"
                                readOnly="readOnly"
                                
                            />
                        </div>

                    </div>{/* second row ends*/}

                    <div className="d-flex justify-content-end mt-2">
                        <button id="lec-insert" type="submit" className="btn btn-primary wk-submit-button">&nbsp; Add &nbsp;</button>
                    </div>
                </form>

                {/* data table */}
                <div className="mt-4">
                    <DataTable
                        columns={columns}
                        data={lecturerDetails}
                        pagination={true}
                        paginationTotalRows={7}
                        paginationPerPage={7}
                        highlightOnHover={true}
                        responsive={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default LecturerContent