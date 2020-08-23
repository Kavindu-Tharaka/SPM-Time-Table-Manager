import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './updateSubGroupIDsDialogBox.css';

const UpdateSubGroupIDsDialogBox = (props) => {
    const [groupID, setGroupID] = useState(
        `${props.itemName.split('.')[0]}.${props.itemName.split('.')[1]}.${
            props.itemName.split('.')[2]
        }.${props.itemName.split('.')[3]}`
    );

    const [subGroupNumber, setSubGroupNumber] = useState(
        props.itemName.split('.')[4]
    );
    const [subGroupNumberList, setSubGroupNumberList] = useState(
        props.subGroupNumberList
    );

    const [year, setYear] = useState(props.year);
    const [semester, setSemester] = useState(props.semester);

    const onInputChangeGroupID = (e) => {
        setGroupID(e.target.value);
        console.log(groupID);
    };
    const onInputChangeSubGroupNumber = (e) => {
        setSubGroupNumber(e.target.value);
        console.log(subGroupNumber);
    };

    const editSubGroupID = () => {
        if (`${groupID}.${subGroupNumber}` !== props.itemName) {
            let isExist = false;

            props.subGroupIDList.forEach((element) => {
                if (
                    `${element.groupid}.${element.subgroupnumber}` ===
                        `${groupID}.${subGroupNumber}` ||
                    (element.groupid.split('.')[3] < 10 &&
                        `${element.groupid.split('.')[0]}.${
                            element.groupid.split('.')[1]
                        }.${element.groupid.split('.')[2]}.0${
                            element.groupid.split('.')[3]
                        }.${element.subgroupnumber}` ===
                            `${groupID}.${subGroupNumber}`)
                ) {
                    Swal.fire(
                        'The Sub Group ID You Entered is Already Exists!!'
                    );
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .patch(
                        `http://localhost:8000/api/v1/subgroupids/${props.id}`,
                        {
                            subgroupnumber: subGroupNumber,
                        }
                    )
                    .then(function (response) {
                        props.setSubGroupIDList((prevlist) =>
                            prevlist.map((listItem) =>
                                props.id === listItem._id
                                    ? {
                                          ...listItem,
                                          // groupid: groupID,
                                          subgroupnumber: subGroupNumber,
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
                    <label className="dialog-label">Group ID</label>
                    <select
                        className="br-0 form-control form-control"
                        onChange={onInputChangeGroupID}
                        value={groupID}
                    >
                        <option value={groupID}>{groupID}</option>
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col">
                    <label className="dialog-label">Sub-Group Number</label>
                    <select
                        className="br-0 form-control form-control"
                        onChange={onInputChangeSubGroupNumber}
                        value={subGroupNumber}
                    >
                        {subGroupNumberList.map((item) => (
                            <option key={item._id} value={item.subgroupnumber}>
                                {item.subgroupnumber}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                className="btn btn-info float-right mb-4"
                onClick={editSubGroupID}
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

export default UpdateSubGroupIDsDialogBox;
