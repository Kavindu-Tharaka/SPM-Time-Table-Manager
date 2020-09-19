import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { FaSpinner } from 'react-icons/fa';
import moment from 'moment';
import ConstraintsSessionsTable from './ConstraintsSessionsTable';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';


function ConstraintsSessions() {
    let sessionIdTemp;
    let asString;
    const [sessions, setSessions] = useState([]);

    const [sessionIDbehalfOfName, setSessionIDBehalfOfName] = useState('');
    const [day, setDay] = useState('Monday');

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [year, setYear] = useState('1');
    const [semester, setSemester] = useState('1');

    const [updateComponent, setUpdateComponent] = useState(0);

    const [isFromValid, setIsFromValid] = useState(true);
    const [fromErrorMsg, setFromErrorMsg] = useState('');

    const [isToValid, setIsToValid] = useState(true);
    const [toErrorMsg, setToErrorMsg] = useState('');

    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [constraintsSessionList, setConstraintsSessionList] = useState([]);

    const _isBefore = (from, to) => {
        const fromTime = moment(from, 'HH:mm');
        const toTime = moment(to, 'HH:mm');
        return fromTime.isBefore(toTime);
    };

    const refreshComponent = () => {
        setUpdateComponent(Math.random());
    };

    const onSessionChange = (e) => {
        // setSessionIDBehalfOfName(e.target.value);
        // console.log(e.target.value);

        setErrorMsg('');

        const sessionName = document.querySelector('#autoCompleteInput').value;

        const session = sessions.find(
            (session) => session.asstring === sessionName.trim()
        );

        setSessionIDBehalfOfName(session ? session._id : '');


        setErrorMsg('');
    };

    const onDayChange = (e) => {
        setDay(e.target.value);
        setErrorMsg('');
    };

    const onFromChange = (e) => {
        setFrom(e.target.value);
        setIsToValid(true);
        setIsFromValid(true);
        setToErrorMsg('');
        setFromErrorMsg('');
        setErrorMsg('');
    };

    const onToChange = (e) => {
        setTo(e.target.value);
        setIsFromValid(true);
        setIsToValid(true);
        setFromErrorMsg('');
        setToErrorMsg('');
        setErrorMsg('');
    };

    const onInputChangeYear = (e) => {
        setYear(e.target.value);
        setIsFromValid(true);
        setIsToValid(true);
        setFromErrorMsg('');
        setToErrorMsg('');
        setErrorMsg('');
    };
    const onInputChangeSemester = (e) => {
        setSemester(e.target.value);
        setIsFromValid(true);
        setIsToValid(true);
        setFromErrorMsg('');
        setToErrorMsg('');
        setErrorMsg('');
    };

    const onAddClick = async (e) => {
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
        }
        // else if (!_isBefore(from, to)) {
        //     setIsFromValid(false);
        //     setFromErrorMsg('From-time should be before to To-time!');
        //     setIsToValid(false);
        //     setToErrorMsg('To-time should be after to From-time!');
        // }
        else {
            setIsAdding(true);

            let isExist = false;

            constraintsSessionList.forEach((element) => {
                if (
                    element.day === day &&
                    element.from === from &&
                    element.to === to &&
                    element.session._id === sessionIDbehalfOfName
                ) {
                    setErrorMsg(
                        'The Constraint You Entered is Already Exists!'
                    );
                    isExist = true;
                    // setTagName('');
                    setIsAdding(false);
                }
            });

            if (!isExist) {
                await axios
                    .get(
                        `http://localhost:8000/api/v1/tempsessions/${sessionIDbehalfOfName}`
                    )
                    .then((res) => {
                        asString = res.data.data.tempSession.asstring;
                    })
                    .catch((err) => console.log(err));


                axios
                    .post('http://localhost:8000/api/v1/constraintssessions', {
                        year: year,
                        semester: semester,
                        session: sessionIDbehalfOfName,
                        day: day,
                        from: from,
                        to: to,
                        sessionasstring: asString,
                    })
                    .then(function (response) {
                        refreshComponent();
                        setIsAdding(false);
                        store.addNotification(
                            buildToast(
                                'success',
                                'Success',
                                'Constraint Added Successfully'
                            )
                        );
                        console.log(constraintsSessionList);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .all(
                    [
                        axios.get('http://localhost:8000/api/v1/tempsessions'),
                        axios.get(
                            'http://localhost:8000/api/v1/constraintssessions'
                        ),
                    ],
                    {
                        cancelToken: source.token,
                    }
                )
                .then((res) => {
                    setSessions(res[0].data.data.tempSessions);

                    sessionIdTemp = res[0].data.data.tempSessions.find(
                        (item) =>
                            year === item.grouporsubgroupid.substring(1, 2) &&
                            semester === item.grouporsubgroupid.substring(4, 5)
                    );

                    setSessionIDBehalfOfName(sessionIdTemp._id);

                    setConstraintsSessionList(
                        res[1].data.data.constraintsSessions
                    );

                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };

        loadData();

        return () => {
            source.cancel();
        };
    }, [updateComponent, year, semester]);

    return (
        <div>
            <PreLoader loading={loading} hasSideBar={true} />
            <ContentHeader header="Sessions" />

            <div
                style={{
                    marginTop: '3%',
                    paddingLeft: '3%',
                    paddingRight: '3%',
                }}
            >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label>{'Year'}</label>
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
                    <div className="form-group col-md-2">
                        <label>{'Semester'}</label>
                        <select
                            className="custom-select"
                            value={semester}
                            onChange={onInputChangeSemester}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>

                    <div className="form-group col-md-8">


                        <label className="dialog-label">Session</label>
                        <TextInput
                            id="autoCompleteInput"
                            Component="input"
                            maxOptions={10}
                            matchAny={true}
                            placeholder={'Enter a Session'}
                            trigger=""
                            options={sessions.map((session) => session.asstring)}
                            onChange={onSessionChange}
                            style={{
                                height: 35,
                                width: '100%',
                                paddingLeft: 10,
                            }}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Day</label>

                        <label>Day of Week</label>
                        <select
                            className="custom-select"
                            onChange={onDayChange}
                            value={day}
                        >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>From</label>
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
                        <label>To</label>
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
                {errorMsg ? (
                    <div
                        className="form-row"
                        style={{
                            color: 'crimson',
                            fontSize: 13,
                            marginLeft: '3px'
                        }}
                    >
                        {errorMsg}
                    </div>
                ) : null}
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <span className="float-right">
                            {' '}
                            <button
                                className="btn btn-primary"
                                onClick={onAddClick}
                            >
                                {isAdding ? (
                                    <div>
                                        Adding <FaSpinner className="spin" />
                                    </div>
                                ) : (
                                    'Add'
                                )}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <br />

            {sessions.length === 0 ? (
                <EmptyDataPlaceholder message="Constraint list is currently empty" />
            ) : (
                <ConstraintsSessionsTable
                    constraintsSessionList={constraintsSessionList}
                    refreshComponent={refreshComponent}
                    sessions={sessions}
                />
            )}

        </div>
    );
}

export default ConstraintsSessions;
