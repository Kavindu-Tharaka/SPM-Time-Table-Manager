import React, { useState } from 'react'
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const UpdateLecturerDialogBox = (props) => {

    const [name, setName] = useState(props.lec.name);
    const [faculty, setFaculty] = useState(props.lec.faculty);
    const [center, setCenter] = useState(props.lec.center);
    const [level, setLevel] = useState(props.lec.level);
    const [department, setDepartment] = useState(props.lec.department);
    const [building, setBuilding] = useState(props.lec.building);
    const [employeeId, setEmployeeId] = useState(props.lec.employeeId);
    const [rank, setRank] = useState(1);
    const [rankVal, setRankVal] = useState("");

    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onFacultyChange = (e) => {
        setFaculty(e.target.value)
    }
    const onCenterChange = (e) => {
        setCenter(e.target.value);
    }
    const onLevelChange = (e) => {

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
        setLevel(e.target.value);
        // setRankVal(`${rank}.${employeeId}`);
    }
    const onEmpIdChange = (e) =>{
        setEmployeeId(e.target.value);
        setRankVal(`${rank}.${employeeId}`);
    }
    const onDepartmentChange = (e) =>{
        setDepartment(e.target.value)
    }
    const onBuildingChange = (e) => {
        setBuilding(e.target.value);
    }

    const onUpdateClick = () => {
        axios
            .patch(`http://localhost:8000/api/v1/lecturers/${props.lec._id}`, {
                name,
                faculty,
                center,
                level,
                employeeId,
                department,
                building,
                rankVal
            })
            .then((res) => {
                window.location.reload();
                swal.close();
                store.addNotification(buildToast('success', 'Success', 'Lecturer Added Successfully'));
            })
            .catch((err) => {
                console.log(err.response);
                store.addNotification(buildToast('danger', 'Failed!', 'Error Updating Data!'));
            });
    };

    return (
        <div>
            <div className='dcdb-dialog-container'>
                <h5 className='text-left m-0'>Update Lecturer</h5>
                <hr />
                <div className='form-row'>

                    <div className='form-group col'>
                        <label className='dialog-label'>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={name}
                            onChange={onNameChange}
                        />
                    </div>



                    <div className='form-group col'>
                        <label className='dialog-label'>Faculty</label>
                        <input
                            type='text'
                            className='form-control'
                            // placeholder='Room Name'
                            value={faculty}
                            onChange={onFacultyChange}
                        />
                    </div>

                </div>

                <div className='form-row'>

                    <div className='form-group col-6'>
                        <label className='dialog-label'>Center</label>
                        <input
                            type='text'
                            className='form-control'
                            // placeholder='00'
                            onChange={onCenterChange}
                            value={center}
                        />
                    </div>
                    <div className='form-group col-6'>
                        <label className='dialog-label'>Level</label>
                        <select value={level} onChange={(e) => onLevelChange(e)} name="level" className="form-control" id="level-select">
                                    <option value="Professor">Professor</option>
                                    <option value="Assistant Professor">Assistant Professor</option>
                                    <option value="Senior Lecturer(HG)">Senior Lecturer(HG)</option>
                                    <option value="Senior Lecturer">Senior Lecturer</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Assistant Lecturer">Assistant Lecturer</option>
                                    <option value="Instructor">Instructor</option>
                                </select>
                    </div>

                </div>

                <div className='form-row'> {/*second row */}
                    <div className='form-group col-6'>
                        <label className='dialog-label'>Employee Id</label>
                        <input
                            type='text'
                            className='form-control'
                            // placeholder='00'
                            onChange={onEmpIdChange}
                            value={employeeId}
                        />
                    </div>

                    <div className='form-group col-6'>
                        <label className='dialog-label'>Department</label>
                        <input
                            type='text'
                            className='form-control'
                            // placeholder='00'
                            onChange={onDepartmentChange}
                            value={department}
                        />
                    </div>

                    <div className='form-group col-6'>
                        <label className='dialog-label'>Building</label>
                        <input
                            type='text'
                            className='form-control'
                            // placeholder='00'
                            onChange={onBuildingChange}
                            value={building}
                        />
                    </div>
                </div>

                {/* <p className='text-left'>{props.lec.name}</p> */}
                <button
                    className='btn btn-info float-right mb-4'
                    onClick={onUpdateClick}
                >
                    Update
			</button>
                <button
                    className='btn btn-secondary float-right mb-4 mr-2'
                    onClick={() => {
                        swal.close();
                    }}
                >
                    Cancel
			</button>
            </div>
        </div>
    )
}

export default UpdateLecturerDialogBox
