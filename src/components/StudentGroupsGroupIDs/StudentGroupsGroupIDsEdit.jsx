import React, { useState } from 'react';
import { Label } from 'reactstrap';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import Swal from 'sweetalert2';

function StudentGroupsGroupIDsEdit(props) {
    const [yearSemester, setYearSemester] = useState(props.yearSemesterInit);

    const [specialization, setSpecialization] = useState(
        props.specializationInit
    );

    const [groupNumber, setGroupNumber] = useState(
        parseInt(props.groupNumberInit)
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
        console.log(
            `edited GID: ${yearSemester}.${specialization}.${groupNumber}`
        );

        if (
            `${yearSemester}.${specialization}.${groupNumber}` !==
                props.groupid ||
            (groupNumber < 10 &&
                `${yearSemester}.${specialization}.0${groupNumber}` !==
                    props.groupid)
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
        <div>
            <div className="col-12">
                <h5>{'Year & Semester'}</h5>
                <select
                    style={{ borderRadius: 0 }}
                    className="custom-select"
                    value={yearSemester}
                    onChange={onInputChangeYearSemester}
                >
                    {props.yearSemesterList.map((item) => (
                        <option key={item._id} value={item.yearsemestername}>
                            {item.yearsemestername}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div className="col-12">
                <h5>{'Specialization'}</h5>
                <select
                    style={{ borderRadius: 0 }}
                    className="custom-select"
                    value={specialization}
                    onChange={onInputChangeSpecialization}
                >
                    {props.specializationList.map((item) => (
                        <option key={item._id} value={item.specializationname}>
                            {item.specializationname}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div className="col-12">
                <h5>{'Group Number'}</h5>

                <select
                    style={{ borderRadius: 0 }}
                    className="custom-select"
                    value={groupNumber}
                    onChange={onInputChangeGroupNumber}
                >
                    {props.groupNumberList.map((item) => (
                        <option key={item._id} value={item.groupnumber}>
                            {item.groupnumber}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-12">
                <Label style={{ color: 'transparent' }}>{'.'}</Label> <br />
                <button
                    style={{
                        marginRight: 5,
                        borderRadius: 0
                    }}
                    className="btn btn-primary"
                    onClick={editGroupID}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default StudentGroupsGroupIDsEdit;
