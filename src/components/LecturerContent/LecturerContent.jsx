import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import ContentHeader from '../ContentHeader/ContentHeader';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import axios from "axios";
// import Swal from 'sweetalert2';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateLecturerDialogBox from '../UpdateLecturerDialogBox/UpdateLecturerDialogBox';

const LecturerContent = () => {

    const [name, setName] = useState("");
    const [faculty, setFaculty] = useState("");
    const [center, setCenter] = useState("");
    const [level, setLevel] = useState("Professor");
    const [employeeId, setEmpId] = useState("");
    const [department, setDepartment] = useState("");
    const [building, setBuilding] = useState("Main Building");
    const [lecturerDetails, setLecturerDetails] = useState([]);
    const [rank, setRank] = useState(1);
    const [rankVal, setRankVal] = useState("");
    const [loading, setloading] = useState(true);
    const [buildings, setBuildings] = useState([]);

    const [isNameVaid, setIsNameValid] = useState(true);
    const [isFacultyValid, setIsFacultyValid] = useState(true);
    const [isCenterValid, setIsCenterValid] = useState(true);
    const [isEmpIdValid, setIsEmpIdValid] = useState(true);
    const [isDepartmentValid, setIsDepartmentValid] = useState(true);

    const [refresh,setRefresh] = useState(false);
 

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
        // setBuildings(e.target.value)
    }
    useEffect(() => {
        loadData();
        axios
            .get('http://localhost:8000/api/v1/buildings')
            .then((res) => {
                // console.log("lec building: ",res.data.data.buildings);
                // let list = [];
                // list.push(res.data.data.buildings);
                setBuildings(res.data.data.buildings);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [refresh]);


    const loadData = () => {
        axios
            .get("http://localhost:8000/api/v1/lecturers")
            .then((result) => {
                setLecturerDetails(result.data.data.lecturers);
                setloading(false);

            })
            .catch((e) => {
                console.error(e);
                setloading(false);
            });
    };

    const onDeleteClick = (id, name) => {
        swal({
            buttons: false,
            content: (
                <DeleteConfirmationDialogBox
                    deleteEventWithIdHandler={deleteLecturer}
                    itemId={id}
                    itemName={name}
                />
            ),
        });
    };

    const deleteLecturer = (rowID) => {
        axios
            .delete(`http://localhost:8000/api/v1/lecturers/${rowID}`)
            .then((res) => {
                setLecturerDetails(
                    lecturerDetails.filter(lec => { return lec._id !== rowID })
                );
                swal.close()
                store.addNotification(buildToast('danger', '', 'Lecturer deleted'));
            })
            .catch((e) => console.error(e));
    }
    const updateLecturer = (data) => {
        // setUpdate(true)
        // setId(data._id)
        // setName(data.name)
        // setFaculty(data.faculty)
        // setCenter(data.center)
        // setLevel(data.level)
        // setEmpId(data.employeeId)
        // setDepartment(data.department)
        // setBuilding(data.building)

        swal({
            buttons: false,
            content: (
                <UpdateLecturerDialogBox
                    lec={data}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            ),
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();

        let errDeteted = false;

        if (name === '') {
            setIsNameValid(false);
            errDeteted = true;
        }
        if (center === '') {
            setIsCenterValid(false);
            errDeteted = true;
        }
        if (faculty === '') {
            setIsFacultyValid(false); 
            errDeteted = true; 
        }
        if (employeeId.length !== 6 || employeeId === '') {
            setIsEmpIdValid(false); 
            errDeteted = true;
        }
        if (department === '') {
            setIsDepartmentValid(false);
            errDeteted = true;
        }
        if(errDeteted){
            return;
        }
        //  if (!update) {

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
        
            store.addNotification(buildToast('success', 'Success', 'Lecturer Added Successfully'));
            setRefresh(true);
            clear();
        }).catch((err) => {
            console.log("err is: ", err);
        });

        const clear = () =>{
            setName('');
            setFaculty('');
            setCenter('');
            setLevel('Professor');
            setBuilding('Main building');
            setEmpId('');
            setRankVal('');
            setDepartment('');
            const rank_input = document.getElementById('rank-input');
            rank_input.value= '';
            setRefresh(false);
        }
        // }
        // else {
        //     axios.patch(`http://localhost:8000/api/v1/lecturers/${id}`, {
        //         name,
        //         faculty,
        //         center,
        //         level,
        //         employeeId,
        //         department,
        //         building,
        //         rankVal
        //     })
        //         .then((res) => {
        //             console.log(res.data);
        //             // console.log("lecturer update executed succesfully")
        //             setUpdate(false);
        //             window.location.reload();
        //             store.addNotification(buildToast('warning', '', 'Lecturer Updated Successfully'));
        //         })
        //         .catch((e) => {
        //             console.err(e);
        //         });
        // }
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
            cell: row => <div>{row.faculty}<br/></div>
        },
        {
            name: 'Department',
            selector: 'department',
            sortable: true,
            cell: row => <div className="">{row.department}</div>
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
            cell: row => <div>{row.level}</div>

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
                        <button id="btn-edit" className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt' onClick={() => updateLecturer(row)}><IoMdCreate /></button>{""}
                        <button id="btn-remove" className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt ' onClick={() => onDeleteClick(row._id, row.name)}><IoMdClose /></button>
                    </div>
                )
        },
    ];
    return (
        <div>
            <PreLoader loading={loading} />
            <div>
                <ContentHeader header={'Lecturers'} />
                <br />
                <form className="needs-validation">
                    <div className="form-row">

                        <div className="form-group col">
                            <p className="mb-1">Name</p>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                className={
                                    isNameVaid
                                        ? 'form-control'
                                        : 'form-control is-invalid'
                                }
                                onChange={(e) => onNameChange(e)} />
                            <div className='invalid-feedback'>
                                Please provide a lecturer name
					</div>
                        </div>

                        <div id="faculty-container" className="form-group col">
                            <p className="mb-1">Faculty</p>
                            <div className="">
                                {/* <select onChange={(e) => onfacultyChange(e)} value={faculty} name="faculty" className="custom-select" id="faculty-select">
                                    <option value="Computing">Computing</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Business">Business</option>
                                    <option value="Humanities & Scienes">Humanities & Scienes</option>
                                    <option value="Graduate Studies & Research">Graduate Studies & Research</option>
                                    <option value="School of Architecture">School of Architecture</option>
                                    <option value="School of Law">School of Law</option>
                                    <option value="School of Hospitality & Culinary">School of Hospitality & Culinary</option>
                                </select> */}

                                <input
                                type="text"
                                    onChange={(e) => onfacultyChange(e)}
                                    value={faculty}
                                    name="faculty"
                                    className={
                                        isFacultyValid
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                // id="faculty-select"
                                />
                                <div className='invalid-feedback'>
                                    Please enter a faculty
					</div>
                            </div>
                        </div>

                        <div id="center-container" className="form-group col">
                            <p className="mb-1">Center</p>
                            <div className="">
                                {/* <select onChange={(e) => onCenterChange(e)} value={center} name="center" className="custom-select" id="center-select">
                                    <option value="malabe">Malabe</option>
                                    <option value="Metro Campus">Metro Campus</option>
                                    <option value="SLIIT Academy">SLIIT Academy</option>
                                    <option value="Mathara">Mathara</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Kurunagala">Kurunagala</option>
                                    <option value="Jaffna">Jaffna</option>
                                </select> */}
                                <input
                                type="text"
                                    onChange={(e) => onCenterChange(e)}
                                    value={center}
                                    name="center"
                                    className={
                                        isCenterValid
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                />
                                <div className='invalid-feedback'>
                                    Please provide a center
					</div>
                            </div>
                        </div>

                        <div id="level-container" className="form-group col">
                            <p className="mb-1">Level</p>
                            <div>
                                <select value={level} onChange={(e) => onLevelChange(e)} name="level" className="form-control" id="level-select">
                                    <option value="Professor">Professor</option>
                                    <option value="Assistant Professor">Assistant Professor</option>
                                    <option value="Senior Lecturer(HG)">Senior Lecturer(HG)</option>
                                    <option value="Senior Lecturer">Senior Lecturer</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Assistant Lecturer">Assistant Lecturer</option>
                                    <option value="Instructor">Instructor</option>
                                </select>
                                {/* <input value={level} onChange={(e) => onLevelChange(e)} name="level" className="form-control" /> */}
                            </div>
                        </div>

                    </div>{/*first row ends*/}
                    <br />
                    <div className="form-row">{/*d-flex justify-content-between*/}
                        <div className="form-group col">
                            <p className="mb-1">Employee Id</p>
                            <input
                                id="empId-input"
                                type="number"
                                name="empId"
                                value={employeeId}
                                className={
                                    isEmpIdValid
                                        ? 'form-control'
                                        : 'form-control is-invalid'
                                }
                                placeholder="6 digit number"
                                onChange={(e) => onEmpIdChange(e)}
                            />
                            <div className='invalid-feedback'>
                                Please provide a employee id of 6 digit
					</div>
                        </div>

                        <div id="department-container" className="form-group col">
                            <p className="mb-1">Department</p>
                            <div className="">
                                {/* <select value={department} onChange={(e) => onDepartmentChange(e)} name="department" className="custom-select" id="department-select" >
                                    <option value="Department Of Information Technology">Department Of Information Technology</option>
                                    <option value="Department Of COMPUTER SCIENCE & SOFTWARE ENGINEERING">Department Of COMPUTER SCIENCE & SOFTWARE ENGINEERING</option>
                                    <option value="Department Of COMPUTER SYSTEMS ENGINEERING">Department Of COMPUTER SYSTEMS ENGINEERING</option>
                                    <option value="Department Of ELECTRICAL & ELECTRONIC ENGINEERING">Department Of ELECTRICAL & ELECTRONIC ENGINEERING</option>
                                    <option value="Department Of MECHANICAL ENGINEERING">Department Of MECHANICAL ENGINEERING</option>
                                    <option value="Department Of MATERIALS ENGINEERING">Department Of MATERIALS ENGINEERING</option>
                                    <option value="Department Of CIVIL ENGINEERING">Department Of CIVIL ENGINEERING</option>
                                    <option value="Department Of QUANTITY SURVEYING">Department Of QUANTITY SURVEYING</option>
                                    <option value="SLIIT SCHOOL Of ARCHITECTURE">SLIIT SCHOOL Of ARCHITECTURE</option>
                                </select> */}
                                <input
                                    value={department}
                                    onChange={(e) => onDepartmentChange(e)}
                                    name="department"
                                    className={
                                        isDepartmentValid
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                />
                                <div className='invalid-feedback'>
                                    Please provide a department
					</div>
                            </div>
                        </div>
                        <div id="building-container" className="form-group col">
                            <p className="mb-1">Building</p>
                            <div className="">
                                <select value={building} onChange={(e) => onBuildingChange(e)} name="building" className="form-control" id="building-select">

                                    {buildings.length > 0? buildings.map((name) => {
                                        return <option key={name._id} value={name.buildingName}>{name.buildingName}</option>
                                    }) : <option>Insert a building!</option>}


                                    {/* <option value="New Building">New Building</option>
                                    <option value="Engineering Building">Engineering Building</option>
                                    <option value="Buisnees Faculty Building">Buisnees Faculty Building</option>
                                    <option value="CAHM">CAHM</option> */}
                                </select>
                                {/* <input value={building} onChange={(e) => onBuildingChange(e)} name="building" className="form-control" /> */}
                            </div>
                        </div>

                        <div id="rank-container" className="form-group col">
                            <p className="mb-1">Rank</p>
                            <input
                                id="rank-input"
                                readOnly="readOnly"
                                className="form-control"
                            />
                        </div>

                    </div>{/* second row ends*/}

                    <div className="d-flex justify-content-end mt-2">

                        <button id="lec-insert" className="btn btn-primary wk-submit-button" onClick={onSubmit} >{" "} {'Add'} {" "}</button>
                    </div>
                </form>

                {/* data table */}
                <div className="mt-4">
                    <DataTable
                        title="Lecturer Details"
                        columns={columns}
                        data={lecturerDetails}
                        pagination
                        dense
                    />
                </div>
            </div>
        </div>
    )
}

export default LecturerContent