import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { FaSpinner } from 'react-icons/fa';
import moment from 'moment';
import { IoMdAdd, IoMdAddCircleOutline } from 'react-icons/io';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import ConstraintsUnOverlapSessionsTable from './ConstraintsUnOverlapSessionsTable';

function ConstraintsUnOverlapSessions() {
    let sessionIdTemp;
    let subjectIdTemp;
    let asString;

    const [year, setYear] = useState('1');
    const [semester, setSemester] = useState('1');
    const [subject, setSubject] = useState('');
    const [sessionIDbehalfOfName, setSessionIDBehalfOfName] = useState('');
    const [subjectIDbehalfOfName, setSubjectIDBehalfOfName] = useState('');
    const [sessions, setSessions] = useState([]);
    const [
        unoverlapSessionsConstraintsList,
        setUnOverlapSessionsConstraintsList,
    ] = useState([]);
    const [sessionAsString, setSessionAsString] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [updateComponent, setUpdateComponent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [sessionBucket, setSessionBucket] = useState([]);
    const [currentSession, setCurrentSession] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSessionvalid, setIsSessionValid] = useState(true);

    const refreshComponent = () => {
        setUpdateComponent(Math.random());
    };

    const onSessionChange = async (e) => {
        // setSessionIDBehalfOfName(e.target.value);

        // await axios
        //     .get(`http://localhost:8000/api/v1/sessions/${e.target.value}`)
        //     .then((res) => {
        //         setSessionAsString(res.data.data.session.asstring);
        //     })
        //     .catch((err) => console.log(err));

        const sessionName = document.querySelector('#autoCompleteInput').value;

        const session = sessions.find(
            (session) => session.asString === sessionName.trim()
        );

        setSessionIDBehalfOfName(session ? session._id : '');
    };

    const onInputChangeYear = (e) => {
        setYear(e.target.value);
    };
    const onInputChangeSemester = (e) => {
        setSemester(e.target.value);
    };
    const removeLabel = (id) => {
        setSessionBucket((sessionBucket) =>
            sessionBucket.filter((session) => session._id !== id)
        );
    };

    const addConstraint = () => {
        setIsAdding(true);

        axios
            .post('http://localhost:8000/api/v1/constraintsunoverlapsessions', {
                year: year,
                semester: semester,
                unoverlapsessions: sessionBucket,
            })
            .then((res) => {
                console.log(res.data.data.constraintsUnOverlapSession);
                setSessionBucket([]);
                refreshComponent();
                setIsAdding(false);
                store.addNotification(
                    buildToast(
                        'success',
                        'Success',
                        'Constraint Added Successfully'
                    )
                );
            })
            .catch((err) => console.log(err));
    };

    const addToBucket = async () => {
        console.log(sessionIDbehalfOfName);

        console.log(year);
        console.log(semester);
        console.log(subject + ' : ' + subjectIDbehalfOfName);
        console.log(sessionIDbehalfOfName);

        await axios
            .get(
                `http://localhost:8000/api/v1/session/${sessionIDbehalfOfName}`
            )
            .then((res) => {
                if (
                    !sessionBucket.find(
                        (session) => session._id === res.data.data.session._id
                    )
                )
                    setSessionBucket([...sessionBucket, res.data.data.session]);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        // console.log('Called UseEffect 1');

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .all(
                    [
                        axios.get('http://localhost:8000/api/v1/session'),
                        axios.get('http://localhost:8000/api/v1/subjects'),
                        axios.get(
                            'http://localhost:8000/api/v1/constraintsunoverlapsessions'
                        ),
                    ],
                    {
                        cancelToken: source.token,
                    }
                )
                .then((res) => {
                    setUnOverlapSessionsConstraintsList(
                        res[2].data.data.constraintsUnOverlapSessions
                    );

                    setSubjects(res[1].data.data.subjects);

                    subjectIdTemp = res[1].data.data.subjects.find(
                        (item) =>
                            year == item.offeredYear &&
                            semester == item.offeredSemester
                    );

                    setSubjectIDBehalfOfName(subjectIdTemp._id);
                    setSubject(subjectIdTemp.subjectCode);

                    setSessions(res[0].data.data.sessions);

                    sessionIdTemp = res[0].data.data.sessions.find(
                        (item) =>
                            year == item.grouporsubgroupid.substring(1, 2) &&
                            semester ==
                                item.grouporsubgroupid.substring(4, 5) &&
                            subject == item.subjectcode
                    );

                    setSessionIDBehalfOfName(sessionIdTemp._id);

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
            <ContentHeader header={'Un-Overlap Sessions'} />
            <div
                style={{
                    marginTop: '3%',
                    paddingLeft: '1%',
                    paddingRight: '1%',
                }}
            >
                <div
                    style={{
                        paddingRight: '4%',
                    }}
                    className="form-row"
                >
                    <div className="form-group col-md-1">
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
                    <div className="form-group col-md-1">
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
                    <div className="form-group col-md-9">
                        <label className="dialog-label">Session</label>

                        <TextInput
                            id="autoCompleteInput"
                            Component="input"
                            maxOptions={10}
                            matchAny={true}
                            placeholder={'Enter a Session'}
                            trigger=""
                            options={sessions.map(
                                (session) => session.asString
                            )}
                            onChange={onSessionChange}
                            style={{
                                height: 35,
                                width: '100%',
                                paddingLeft: 10,
                            }}
                        />
                    </div>
                    <div className="form-group col-md-1">
                        <button
                            style={{ marginTop: 32, marginRight: 20 }}
                            className="temp-add-btn bc-sm-ctrl-btn-upt"
                            onClick={addToBucket}
                            disabled={sessionIDbehalfOfName === ''}
                        >
                            <IoMdAdd />
                        </button>
                    </div>
                </div>
                <br />
                {sessionBucket.length ? (
                    <div
                        style={{
                            border: 'solid 1px #dddddd',
                            paddingTop: 10,
                            paddingLeft: '1%',
                            // marginRight: 350,
                            overflowY: 'auto',
                            marginLeft: 3,
                        }}
                        className="form-row col-md-12"
                    >
                        {sessionBucket.map((session) => {
                            return (
                                <div
                                    key={session._id}
                                    className="d-flex bd-highlight mb-3"
                                    style={{
                                        height: 42,
                                        borderRadius: 50,
                                        border: 'solid 1px gainsboro',
                                        marginRight: 5,
                                    }}
                                >
                                    <div className="mr-auto p-2 bd-highlight">
                                        <h6 style={{ display: 'inline' }}>
                                            {session.asString}
                                        </h6>
                                    </div>
                                    <div className="p-2 bd-highlight">
                                        <button
                                            style={{
                                                marginLeft: 5,
                                            }}
                                            className="sm-ctrl-btn sm-ctrl-btn-dlt"
                                            onClick={() =>
                                                removeLabel(session._id)
                                            }
                                        >
                                            <IoMdClose />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}

                {sessionBucket.length ? (
                    <div style={{ marginTop: 15 }} className="form-row">
                        <div className="form-group col-md-12">
                            <span className="float-right">
                                {' '}
                                <button
                                    className="btn btn-primary"
                                    onClick={addConstraint}
                                >
                                    {isAdding ? (
                                        <div>
                                            Adding{' '}
                                            <FaSpinner className="spin" />
                                        </div>
                                    ) : (
                                        'Add'
                                    )}
                                </button>
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>
            {sessions.length === 0 ? (
                <EmptyDataPlaceholder message="Constraint list is currently empty" />
            ) : (
                <ConstraintsUnOverlapSessionsTable
                    unoverlapSessionsConstraintsList={
                        unoverlapSessionsConstraintsList
                    }
                    refreshComponent={refreshComponent}
                    sessions={sessions}
                />
            )}
        </div>
    );
}

export default ConstraintsUnOverlapSessions;
