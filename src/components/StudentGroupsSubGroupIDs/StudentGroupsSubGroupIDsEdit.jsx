import React, { useState, useEffect } from 'react';
import { Label } from 'reactstrap';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import Swal from 'sweetalert2';

function StudentGroupsSubGroupIDsEdit(props) {
    const [groupID, setGroupID] = useState(props.groupIDInit);
    const [groupIDList, setGroupIDList] = useState(props.groupIDList);

    const [subGroupNumber, setSubGroupNumber] = useState(
        props.subGroupNumberInit
    );
    const [subGroupNumberList, setSubGroupNumberList] = useState(
        props.subGroupNumberList
    );

    const [year, setYear] = useState(props.year);
    const [semester, setSemester] = useState(props.semester);

    const onInputChangeYear = (e) => {
        setYear(e.target.value);
        console.log(year);
    };
    const onInputChangeSemester = (e) => {
        setSemester(e.target.value);
        console.log(semester);
    };
    const onInputChangeGroupID = (e) => {
        setGroupID(e.target.value);
        console.log(groupID);
    };
    const onInputChangeSubGroupNumber = (e) => {
        setSubGroupNumber(e.target.value);
        console.log(subGroupNumber);
    };

    const editSubGroupID = () => {
        if (`${groupID}.${subGroupNumber}` !== props.subgroupid) {
            let isExist = false;

            props.subGroupIDList.forEach((element) => {
                if (
                    `${element.groupid}.${element.subgroupnumber}` ===
                    `${groupID}.${subGroupNumber}`
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
        <div>
            <div className="col-12">
                <h5>{'Group ID'}</h5>
                <select
                    style={{ borderRadius: 0 }}
                    className="custom-select"
                    value={groupID}
                    onChange={onInputChangeGroupID}
                >
                    {groupIDList.map((item) =>
                        year === item.yearsemestername.substring(1, 2) &&
                        semester === item.yearsemestername.substring(4, 5) ? (
                            <option
                                key={item._id}
                                value={`${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`}
                            >
                                {item.groupnumber >= 10
                                    ? `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                    : `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`}
                            </option>
                        ) : null
                    )}
                </select>
            </div>
            <br />
            <div className="col-12">
                <h5>{'Sub-Group Number'}</h5>

                <select
                    style={{ borderRadius: 0 }}
                    className="custom-select"
                    value={subGroupNumber}
                    onChange={onInputChangeSubGroupNumber}
                >
                    {subGroupNumberList.map((item) => (
                        <option key={item._id} value={item.subgroupnumber}>
                            {item.subgroupnumber}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-12">
                <Label style={{ color: 'transparent' }}>{'.'}</Label> <br />
                <button
                    className="btn btn-primary"
                    style={{ borderRadius: 0 }}
                    onClick={editSubGroupID}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default StudentGroupsSubGroupIDsEdit;
