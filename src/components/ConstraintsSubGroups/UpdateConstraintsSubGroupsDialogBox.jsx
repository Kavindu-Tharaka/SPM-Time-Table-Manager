import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import './updateConstraintsSubGroupsDialogBox.css';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import moment from 'moment';

function UpdateConstraintsSubGroupsDialogBox(props) {
    const [currentSubGroupName, setCurrentSubGroupName] = useState(props.subgroupid);
    const [subgroupIDbehalfOfName, setSubGroupIDBehalfOfName] = useState(
        props.subgroups.find((element) => element.subgroupid === props.subgroupid)._id
    );
    const [day, setDay] = useState(props.day);

    const [from, setFrom] = useState(props.from);
    const [to, setTo] = useState(props.to);

    const [isConstraintValid, setIsConstraintValid] = useState(true);

    const [year, setYear] = useState(props.subgroupid.substring(1,2));
    const [semester, setSemester] = useState(props.subgroupid.substring(4,5));

    const [isFromValid, setIsFromValid] = useState(true);
    const [fromErrorMsg, setFromErrorMsg] = useState('');

    const [isToValid, setIsToValid] = useState(true);
    const [toErrorMsg, setToErrorMsg] = useState('');

    const [isUpdating, setIsUpdating] = useState(false);

    const _isBefore = (from, to) => {
        const fromTime = moment(from, 'HH:mm');
        const toTime = moment(to, 'HH:mm');
        return fromTime.isBefore(toTime);
    };

    const onSubGroupChange = (e) => {
        setCurrentSubGroupName(e.target.value);
        setIsConstraintValid(true);

        setSubGroupIDBehalfOfName(
            props.subgroups.find((element) => element.subgroupid === e.target.value)._id
        );

        // console.log(subgroupIDbehalfOfName);
    };

    const onDayChange = (e) => {
        setDay(e.target.value);
        setIsConstraintValid(true);
    };

    const onFromChange = (e) => {
        setFrom(e.target.value);
        setIsToValid(true);
        setIsFromValid(true);
        setToErrorMsg('');
        setFromErrorMsg('');
        setIsConstraintValid(true);
    };

    const onToChange = (e) => {
        setTo(e.target.value);
        setIsFromValid(true);
        setIsToValid(true);
        setFromErrorMsg('');
        setToErrorMsg('');
        setIsConstraintValid(true);
    };

    const onInputChangeYear = (e) => {
        setYear(e.target.value);
        setIsFromValid(true);
        setIsToValid(true);
        setFromErrorMsg('');
        setToErrorMsg('');
        setIsConstraintValid(true);
    };
    const onInputChangeSemester = (e) => {
        setSemester(e.target.value);
        setIsFromValid(true);
        setIsToValid(true);
        setFromErrorMsg('');
        setToErrorMsg('');
        setIsConstraintValid(true);
    };

    const editConstraint = () => {
        if (from === '') {
            setIsFromValid(false);
            setFromErrorMsg('Please Enter a starting time!');
        }
        if (to === '') {
            setIsToValid(false);
            setToErrorMsg('Please Enter a ending time!');
        } else if (!_isBefore(from, to)) {
            setIsFromValid(false);
            setFromErrorMsg('From-time should be before to To-time!');
            setIsToValid(false);
            setToErrorMsg('To-time should be after to From-time!');
        } else {
            setIsUpdating(true);

            let isExist = false;

            console.log(day)
            console.log(from)
            console.log(to)
            console.log(subgroupIDbehalfOfName)
            console.log(currentSubGroupName)

            props.constraintsSubGroupList.forEach((element) => {
                if (
                    element.day === day &&
                    element.from === from &&
                    element.to === to &&
                    element.subgroup._id === subgroupIDbehalfOfName
                ) {
                    setIsConstraintValid(false);
                    isExist = true;
                    setIsUpdating(false);
                }
            });

            if (!isExist) {
                axios
                    .patch(
                        `http://localhost:8000/api/v1/constraintssubgroups/${props.id}`,
                        {
                            subgroup: subgroupIDbehalfOfName,
                            day: day,
                            from: from,
                            to: to,
                        }
                    )
                    .then(function (response) {
                        props.refreshComponent();
                        setIsUpdating(false);
                        store.addNotification(
                            buildToast(
                                'info',
                                'Updated',
                                'Constraint Updated Successfully'
                            )
                        );
                        swal.close();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };

    return (
        <div className="dcdb-dialog-container">
            <h5 className="text-left m-0">
                {"Update Sub-Groups' Not Available Time"}
            </h5>
            <hr />

            {!isConstraintValid ? (
                <div
                    style={{
                        color: 'crimson',
                        textAlign: 'left',
                        fontSize: 14,
                    }}
                >
                    The Constraint You Entered is Already Exists!
                </div>
            ) : null}

            <div className="form-row">
                <div className="form-subgroup col-md-6">
                    <label className="dialog-label">{'Year'}</label>
                    <select
                        className="custom-select"
                        value={year}
                        onChange={onInputChangeYear}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="form-subgroup col-md-6">
                    <label className="dialog-label">{'Semester'}</label>
                    <select
                        className="custom-select"
                        value={semester}
                        onChange={onInputChangeSemester}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </div>
            <br/>
            <div className="form-row">
                <div className="form-subgroup col-md-12">
                    <label className="dialog-label">Select SubGroup</label>
                    <select
                        className="custom-select"
                        onChange={onSubGroupChange}
                        value={currentSubGroupName}
                    >
                        {props.subgroups.map((item) =>
                            year === item.subgroupid.substring(1, 2) &&
                            semester ===
                                item.subgroupid.substring(4, 5) ? (
                                <option
                                    key={item._id}
                                    value={item.subgroupid}
                                >
                                    {item.subgroupid}
                                </option>
                            ) : null
                        )}
                    </select>
                </div>
            </div>
            <br/>
            <div className="form-row">
                <div className="form-subgroup col-md-4">
                    <label className="dialog-label">Day of Week</label>
                    <select
                        className="custom-select"
                        onChange={onDayChange}
                        value={day}
                    >
                        <option >Monday</option>
                        <option >Tuesday</option>
                        <option >Wednesday</option>
                        <option >Thursday</option>
                        <option >Friday</option>
                        <option >Saturday</option>
                        <option >Sunday</option>
                    </select>
                </div>
                <div className="form-subgroup col-md-4">
                    <label className="dialog-label">From</label>
                    <input
                        type="time"
                        className={
                            isFromValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        onChange={onFromChange}
                        value={from}
                    />
                    <div className="invalid-feedback">{fromErrorMsg}</div>
                </div>
                <div className="form-subgroup col-md-4">
                    <label className="dialog-label">To</label>
                    <input
                        type="time"
                        className={
                            isToValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        onChange={onToChange}
                        value={to}
                    />
                    <div className="invalid-feedback">{toErrorMsg}</div>
                </div>
            </div>
            <br/>
            <button
                className="btn btn-info float-right mb-4"
                onClick={editConstraint}
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
}

export default UpdateConstraintsSubGroupsDialogBox
