import React, { useState } from 'react'
import { Label } from 'reactstrap';

function StudentGroupsGroupIDsEdit(props) {

    const [yearSemester, setYearSemester] = useState(props.yearSemesterInit);

    const [specialization, setSpecialization] = useState(props.specializationInit);

    const [groupNumber, setGroupNumber] = useState(props.groupNumberInit);
    
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
        console.log(`edited GID: ${yearSemester}.${specialization}.${groupNumber}`);
    };

    return (
        <div
        // style={{
        //     left: '20%',
        //     marginTop: '3%',
        //     paddingLeft: '17%',
        //     paddingRight: '25%',
        // }}
    >
        <div className="row">
            <div className="col-12">
                <Label>{'Year & Semester'}</Label>
                <select
                    style={{ borderRadius: 0 }}
                    className="custom-select"
                    value={yearSemester}
                    onChange={onInputChangeYearSemester}
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
            <div className="col-12">
                <Label>{'Specialization'}</Label>
                <select
                    style={{ borderRadius: 0 }}
                    className="custom-select"
                    value={specialization}
                    onChange={onInputChangeSpecialization}
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
            <div className="col-12">
                <Label>{'Group Number'}</Label>

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
                <Label style={{ color: 'transparent' }}>{'.'}</Label>{' '}
                <br />
                <button
                    className="btn btn-primary"
                    style={{ borderRadius: 0 }}
                    onClick={editGroupID}
                >
                    Edit
                </button>
            </div>
        </div>
    </div>
    )
}

export default StudentGroupsGroupIDsEdit
