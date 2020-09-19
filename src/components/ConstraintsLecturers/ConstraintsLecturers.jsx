import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { FaSpinner } from 'react-icons/fa';
import ConstraintsLecturersTable from './ConstraintsLecturersTable';
import moment from 'moment';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

function ConstraintsLecturers() {
    const [lecturers, setLecturers] = useState([]);

    const [lecturerIDbehalfOfName, setLecturerIDBehalfOfName] = useState('');
    const [day, setDay] = useState('Monday');

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [updateComponent, setUpdateComponent] = useState(0);

    const [isFromValid, setIsFromValid] = useState(true);
    const [fromErrorMsg, setFromErrorMsg] = useState('');

    const [isToValid, setIsToValid] = useState(true);
    const [toErrorMsg, setToErrorMsg] = useState('');

    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [constraintsLectureList, setConstraintsLectureList] = useState([]);

    const [value, setValue] = useState('');

    const _isBefore = (from, to) => {
        const fromTime = moment(from, 'HH:mm');
        const toTime = moment(to, 'HH:mm');
        return fromTime.isBefore(toTime);
    };

    const refreshComponent = () => {
        setUpdateComponent(Math.random());
    };

    const onLecturerChange = (e) => {
        setErrorMsg('');

        const lecturerName = document.querySelector('#autoCompleteInput').value;

        const lecturer = lecturers.find(
            (lecturer) => lecturer.name === lecturerName.trim()
        );

        setLecturerIDBehalfOfName(lecturer ? lecturer._id : '');
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

    const onAddClick = (e) => {
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
            setIsAdding(true);

            let isExist = false;

            constraintsLectureList.forEach((element) => {
                if (
                    element.day === day &&
                    element.from === from &&
                    element.to === to &&
                    element.lecturer._id === lecturerIDbehalfOfName
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
                axios
                    .post('http://localhost:8000/api/v1/constraintslecturers', {
                        lecturer: lecturerIDbehalfOfName,
                        day: day,
                        from: from,
                        to: to,
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
                        console.log(constraintsLectureList);
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
                        axios.get('http://localhost:8000/api/v1/lecturers'),
                        axios.get(
                            'http://localhost:8000/api/v1/constraintsLecturers'
                        ),
                    ],
                    {
                        cancelToken: source.token,
                    }
                )
                .then((res) => {
                    setLecturers(res[0].data.data.lecturers);
                    if (res[0].data.data.lecturers.length !== 0) {
                        setLecturerIDBehalfOfName(
                            res[0].data.data.lecturers[0]._id
                        );
                    }

                    setConstraintsLectureList(
                        res[1].data.data.constraintsLecturers
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
    }, [updateComponent]);

    return (
        <div>
            <PreLoader loading={loading} hasSideBar={true} />
            <ContentHeader header="Lecturers" />
            <div
                style={{
                    marginTop: '3%',
                    paddingLeft: '10%',
                    paddingRight: '1%',
                }}
            >
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className='dialog-label'>Lecturer</label>
                        {/* <select
                            className="custom-select"
                            onChange={onLecturerChange}
                            value={lecturerIDbehalfOfName}
                        >
                            {lecturers.map((lecturer) => {
                                return (
                                    <option
                                        key={lecturer._id}
                                        value={lecturer._id}
                                    >
                                        {lecturer.name}
                                    </option>
                                );
                            })}
                        </select> */}

                        {/* <Autocomplete
                            items={lecturers}
                            shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.name}
                            renderItem={(item, highlighted) =>
                                <div
                                key={item._id}
                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                >
                                {item.name}
                                </div>
                            }
                            value={value}
                            onChange={e => {setValue(e.target.value); console.log(e.target.value)}}
                            onSelect={val => setValue(val)}
                        /> */}

                        <TextInput
                            id="autoCompleteInput"
                            Component="input"
                            maxOptions={10}
                            matchAny={true}
                            placeholder={'Enter Lecturer Name'}
                            trigger=""
                            options={lecturers.map((lecturer) => lecturer.name)}
                            onChange={onLecturerChange}
                            style={{height: 35, width: '100%', paddingLeft: 10}}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label>Day</label>
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
                    <div className="form-group col-md-2">
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
                    <div className="form-group col-md-2">
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
                    <div className="form-group col-md-2">
                        <button
                            className="btn btn-primary"
                            onClick={onAddClick}
                            style={{ marginTop: 31 }}
                        >
                            {isAdding ? (
                                <div>
                                    Adding <FaSpinner className="spin" />
                                </div>
                            ) : (
                                'Add'
                            )}
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        color: 'crimson',
                        fontSize: 13,
                        marginTop: '-15px',
                    }}
                >
                    {errorMsg}
                </div>
            </div>
            <br />

            {lecturers.length === 0 ? (
                <EmptyDataPlaceholder message="Constraint list is currently empty" />
            ) : (
                <div>
                    <ConstraintsLecturersTable
                        constraintsLectureList={constraintsLectureList}
                        refreshComponent={refreshComponent}
                        lecturers={lecturers}
                    />
                </div>
            )}
        </div>
    );
}

export default ConstraintsLecturers;
