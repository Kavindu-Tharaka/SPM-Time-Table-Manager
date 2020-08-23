import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './updateGroupIDsDialogBox.css';

const UpdateGroupIDsDialogBox = (props) => {

	console.log(props.itemName)

    const [yearSemester, setYearSemester] = useState(
        `${props.itemName.split('.')[0]}.${props.itemName.split('.')[1]}`
    );

    const [specialization, setSpecialization] = useState(
        props.itemName.split('.')[2]
    );

    const [groupNumber, setGroupNumber] = useState(
        parseInt(props.itemName.split('.')[3])
    );

    const onInputChangeYearSemester = (e) => {
        setYearSemester(e.target.value);
        console.log(yearSemester);
    };
    const onInputChangeSpecialization = (e) => {
        setSpecialization(e.target.value);
        console.log(specialization);
    };
    const onInputChangeGroupNumber = (e) => {
        setGroupNumber(e.target.value);
        console.log(groupNumber);
    };

    const editGroupID = () => {
        if (
            `${yearSemester}.${specialization}.${groupNumber}` !==
                props.itemName 
        ) {
            let isExist = false;

            props.groupIDList.forEach((element) => {
                if (
                    `${element.yearsemestername}.${element.specializationname}.${element.groupnumber}` ===
                    `${yearSemester}.${specialization}.${groupNumber}`
                ) {
                    Swal.fire('The Group ID You Entered is Already Exists!!');
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .patch(
                        `http://localhost:8000/api/v1/groupids/${props.id}`,
                        {
                            yearsemestername: yearSemester,
                            specializationname: specialization,
                            groupnumber: groupNumber,
                        }
                    )
                    .then(function (response) {
                        props.setGroupIDList((prevlist) =>
                            prevlist.map((listItem) =>
                                props.id === listItem._id
                                    ? {
                                          ...listItem,
                                          yearsemestername: yearSemester,
                                          specializationname: specialization,
                                          groupnumber: groupNumber,
                                      }
                                    : listItem
                            )
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        swal.close();
    };

    return (
        <div className="dcdb-dialog-container">
            <h5 className="text-left m-0">{'Update Year & Semester'}</h5>
            <hr />

            <div className="form-row">
                <div className="form-group col">
                    <label className="dialog-label">{'Year & Semester'}</label>
                    <select
                        className="br-0 form-control form-control"
                        onChange={onInputChangeYearSemester}
                        value={yearSemester}
                    >
                        {props.yearSemesterList.map((item) => (
                            <option
                                key={item._id}
                                value={item.yearsemestername}
                            >
                                {item.yearsemestername}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label className="dialog-label">Specialization</label>
                    <select
                        className="br-0 form-control form-control"
                        onChange={onInputChangeSpecialization}
                        value={specialization}
                    >
                        {props.specializationList.map((item) => (
                            <option
                                key={item._id}
                                value={item.specializationname}
                            >
                                {item.specializationname}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label className="dialog-label">Group Number</label>
                    <select
                        className="br-0 form-control form-control"
                        onChange={onInputChangeGroupNumber}
                        value={groupNumber}
                    >
                        {props.groupNumberList.map((item) => (
                            <option key={item._id} value={item.groupnumber}>
                                {item.groupnumber}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                className="btn btn-info float-right mb-4"
                onClick={editGroupID}
            >
                Update
            </button>
            <button
                className="btn btn-secondary float-right mb-4 mr-2"
                onClick={() => {
                    swal.close();
                }}
            >
                Cancel
            </button>
        </div>
    );
};

export default UpdateGroupIDsDialogBox;
