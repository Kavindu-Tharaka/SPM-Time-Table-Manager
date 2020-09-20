import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import './updateConstraintsSessionsDialogBox.css';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import moment from 'moment';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

function UpdateConstraintsSessionsDialogBox(props) {
    let asStringg;

    const [sessions, setSessions] = useState(props.sessions);

    const [currentSessionName, setCurrentsessionName] = useState(props.session);

    const [sessionIDbehalfOfName, setSessionIDBehalfOfName] = useState(
        sessions.find((element) => element.asString === props.session)._id)


    const [day, setDay] = useState(props.day);

    const [from, setFrom] = useState(props.from);
    const [to, setTo] = useState(props.to);

    const [isConstraintValid, setIsConstraintValid] = useState(true);

    const [year, setYear] = useState(
        sessions
            .find((element) => element.asString === props.session)
            .studentGroup.substring(1, 2)
    );
    const [semester, setSemester] = useState(
        sessions
            .find((element) => element.asString === props.session)
            .studentGroup.substring(4, 5)
    );


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

    const onSessionChange = (e) => {
        // setCurrentsessionName(e.target.value);
        // setIsConstraintValid(true);

        // setSessionIDBehalfOfName(
        //     props.sessions.find((element) => element.asstring === e.target.value)._id
        // );

        setIsConstraintValid(true);

        const sessionName = document.querySelector('#autoCompleteInputSession').value;

        const session = sessions.find(
            (session) => session.asstring == sessionName.trim()
        );

        setSessionIDBehalfOfName(session ? session._id : '');
        console.log(session)

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

    const editConstraint = async () => {
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

            console.log(day);
            console.log(from);
            console.log(to);
            console.log(sessionIDbehalfOfName);
            console.log(currentSessionName);


            props.constraintsSessionList.forEach((element) => {
                if (
                    element.day === day &&
                    element.from === from &&
                    element.to === to &&
                    element.session._id === sessionIDbehalfOfName
                ) {
                    setIsConstraintValid(false);
                    isExist = true;
                    setIsUpdating(false);
                }
            });

            if (!isExist) {
                await axios
                    .get(
                        `http://localhost:8000/api/v1/session/${sessionIDbehalfOfName}`
                    )
                    .then((res) => {
                        asStringg = res.data.data.session.asString;
                    })
                    .catch((err) => console.log(err));

                axios
                    .patch(
                        `http://localhost:8000/api/v1/constraintssessions/${props.id}`,
                        {
                            year: year,
                            semester: semester,
                            session: sessionIDbehalfOfName,
                            day: day,
                            from: from,
                            to: to,
                            sessionasstring: asStringg,
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
                {"Update Groups' Not Available Time"}
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
                <div className="form-group col-md-6">
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
                <div className="form-group col-md-6">
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
            <div className="form-row">
                <div className="form-group col-md-12">

                    <label className="dialog-label">Session</label>

                    <TextInput
                        id="autoCompleteInputSession"
                        Component="input"
                        maxOptions={10}
                        matchAny={true}
                        defaultValue={currentSessionName}
                        trigger=""
                        options={sessions.map(
                            
                            (session) => session.asString
                        )}

                        onChange={onSessionChange}
                        style={{ height: 35, width: '100%', paddingLeft: 10 }}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-4">
                    <label className="dialog-label">Day of Week</label>
                    <select
                        className="custom-select"
                        onChange={onDayChange}
                        value={day}
                    >
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>

                    </select>
                </div>
                <div className="form-group col-md-4">
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
                <div className="form-group col-md-4">
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

export default UpdateConstraintsSessionsDialogBox;
