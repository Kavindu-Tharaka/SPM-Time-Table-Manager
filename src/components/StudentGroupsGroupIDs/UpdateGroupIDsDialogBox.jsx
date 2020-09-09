import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import './updateGroupIDsDialogBox.css';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const UpdateGroupIDsDialogBox = (props) => {
    const [yearSemester, setYearSemester] = useState(
        `${props.itemName.split('.')[0]}.${props.itemName.split('.')[1]}`
    );

    const [specialization, setSpecialization] = useState(
        props.itemName.split('.')[2]
    );

    let [groupNumber, setGroupNumber] = useState(
        parseInt(props.itemName.split('.')[3])
    );

    const [isGroupIDValid, setIsGroupIDValid] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const onInputChangeYearSemester = (e) => {
        setYearSemester(e.target.value);
        setIsGroupIDValid(true);
        console.log(yearSemester);
    };
    const onInputChangeSpecialization = (e) => {
        setSpecialization(e.target.value);
        setIsGroupIDValid(true);
        console.log(specialization);
    };
    const onInputChangeGroupNumber = (e) => {
        setGroupNumber(e.target.value);
        setIsGroupIDValid(true);
        console.log(groupNumber);
    };

    const editGroupID = () => {
        let yearSemesterGroupNumber = `${yearSemester}.${specialization}.0${groupNumber}`;

        if (groupNumber < 10) {
            yearSemesterGroupNumber = `${yearSemester}.${specialization}.0${groupNumber}`;
        } else {
            yearSemesterGroupNumber = `${yearSemester}.${specialization}.${groupNumber}`;
        }

        console.log(props.itemName === yearSemesterGroupNumber);

        if (yearSemesterGroupNumber !== props.itemName) {
            let isExist = false;
            setIsUpdating(true);

            props.groupIDList.forEach((element) => {
                if (
                    `${element.yearsemestername}.${element.specializationname}.${element.groupnumber}` ===
                    `${yearSemester}.${specialization}.${groupNumber}`
                ) {
                    setIsGroupIDValid(false);
                    setIsUpdating(false);
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
                        setIsUpdating(false);
                        swal.close();
                        store.addNotification(
                            buildToast(
                                'info',
                                'Updated',
                                'Group ID Updated Successfully'
                            )
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            swal.close();
        }
    };

    return (
        <div className="dcdb-dialog-container">
            <h5 className="text-left m-0">{'Update Year & Semester'}</h5>
            <hr />

            {!isGroupIDValid ? (
                <div
                    style={{
                        color: 'crimson',
                        textAlign: 'left',
                        fontSize: 14,
                    }}
                >
                    The Group ID You Entered is Already Exists!
                </div>
            ) : null}

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
                {isUpdating ? (
                    <div>
                        Updating <FaSpinner className="spin" />
                    </div>
                ) : (
                    'Update'
                )}
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
