import React from 'react'
import DataTable from 'react-data-table-component';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import'./LecturerContent.css';

const LecturerContent = () => {
    const data = [{ id: 1, lecturer: ' Barbarian', employeeId: '1982', faculty: 'Faculty of Computing', department: 'DEPARTMENT OF COMPUTER SCIENCE & SOFTWARE ENGINEERING', center: 'Malabe', building: 'Main building', level: 'Professor', rank: '1.1111', action: '' }];
    const columns = [
        {
            name: 'Lecturer',
            selector: 'lecturer',
            sortable: true,
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
            selector: 'rank',
        },
        {
            name: 'Action',
            selector: 'action',
            // right: true,
            cell: row =>
                <div className="d-flex">
                    <button id="btn-edit" className="btn rounded-circle border-none btn-sm"><FaPencilAlt color="#1a1aff" /></button>&nbsp;
                    <button id="btn-remove"  className="btn rounded-circle border-none btn-sm"><FaTrashAlt color="#1a1aff" /></button>
                </div>
        },
    ];
    return (
        <div>
             <div className="">
            <ContentHeader header={'Lecturers'} />
            <br />
            <div className="d-flex "> 

                <div>
                    <p className="mb-1">Name</p>
                    <input/>
                </div>

                <div id="faculty-container">
                    <p className="mb-1">Faculty</p>
                    <div className="">
                        <select className="custom-select" id="faculty-select">
                            <option selected value="1">Computing</option>
                            <option value="1">Engineering</option>
                            <option value="2">Business</option>
                            <option value="3">Humanities & Scienes</option>
                            <option value="3">Graduate Studies & Research</option>
                            <option value="3">School of Architecture</option>
                            <option value="3">School of Law</option>
                            <option value="3">School of Hospitality & Culinary</option>
                        </select>
                    </div>
                </div>

                <div id="center-container">
                    <p className="mb-1">Center</p>
                    <div className="">
                        <select className="custom-select" id="center-select">
                            <option selected value="1">Malabe</option>
                            <option value="1">Metro Campus</option>
                            <option value="2">SLIIT Academy</option>
                            <option value="3">Mathara</option>
                            <option value="3">Kandy</option>
                            <option value="3">Kurunagala</option>
                            <option value="3">Jaffna</option>
                        </select>
                    </div>
                </div>

                <div id="level-container">
                    <p className="mb-1">Level</p>
                    <div className="">
                        <select className="custom-select" id="level-select">
                            <option selected value="1">Professor</option>
                            <option value="1">Assistant Professor</option>
                            <option value="2">Senior Lecturer(HG)</option>
                            <option value="3">Senior Lecturer</option>
                            <option value="3">Lecturer</option>
                            <option value="3">Assistant Lecturer</option>
                            <option value="3">Instructors</option>
                        </select>
                    </div>
                </div>

            </div>{/*first row ends*/}
            <br />
            <div className="d-flex justify-content-between">
                <div>
                    <p className="mb-1">Employee Id</p>
                    <input />
                </div>

                <div id="department-container">
                    <p className="mb-1">Department</p>
                    <div className="">
                        <select className="custom-select" id="department-select" >
                            <option selected value="1">Department Of Information Technology</option>
                            <option value="1">Department Of COMPUTER SCIENCE & SOFTWARE ENGINEERING</option>
                            <option value="2">Department Of COMPUTER SYSTEMS ENGINEERING</option>
                            <option value="3">Department Of ELECTRICAL & ELECTRONIC ENGINEERING</option>
                            <option value="3">Department Of MECHANICAL ENGINEERING</option>
                            <option value="3">Department Of MATERIALS ENGINEERING</option>
                            <option value="3">Department Of CIVIL ENGINEERING</option>
                            <option value="3">Department Of QUANTITY SURVEYING</option>
                            <option value="3">SLIIT SCHOOL Of ARCHITECTURE</option>
                        </select>
                    </div>
                </div>
                <div id="building-container">
                    <p className="mb-1">Building</p>
                    <div className="">
                        <select className="custom-select" id="building-select">
                            <option selected value="1">Main Building</option>
                            <option value="1">New Building</option>
                            <option value="2">Engineering Building</option>
                            <option value="3">Buisnees Faculty Building</option>
                            <option value="3">CAHM</option>
                        </select>
                    </div>
                </div>

                <div>
                    <p className="mb-1">Rank</p>
                    <input readonly="readonly" />
                </div>

            </div>{/* second row ends*/}

            <div className="d-flex justify-content-end mt-2">
                <button id="lec-insert" type="button" className="btn btn-secondary btn-sm ">&nbsp; Add &nbsp;</button>
            </div>
            {/* inesrtion ends */}

            {/* data table */}
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
        </div>
    )
}

export default LecturerContent
