import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { FaSpinner } from 'react-icons/fa';
import moment from 'moment';
import ConstraintsGroupsTable from './ConstraintsGroupsTable'

function ConstraintsGroups() {
    let groupIdTemp;
    const [groups, setGroups] = useState([]);

    const [groupIDbehalfOfName, setGroupIDBehalfOfName] = useState('');
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

    const [constraintsGroupList, setConstraintsGroupList] = useState([]);

    const _isBefore = (from, to) => {
        const fromTime = moment(from, 'HH:mm');
        const toTime = moment(to, 'HH:mm');
        return fromTime.isBefore(toTime);
    };

    const refreshComponent = () => {
        setUpdateComponent(Math.random());
    };

    const onGroupChange = (e) => {
        setGroupIDBehalfOfName(e.target.value);
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

            constraintsGroupList.forEach((element) => {
                if (
                    element.day === day &&
                    element.from === from &&
                    element.to === to &&
                    element.group._id === groupIDbehalfOfName
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
                    .post('http://localhost:8000/api/v1/constraintsGroups', {
                        group: groupIDbehalfOfName,
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
                        console.log(constraintsGroupList);
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
                        axios.get('http://localhost:8000/api/v1/groupids'),
                        axios.get(
                            'http://localhost:8000/api/v1/constraintsgroups'
                        ),
                    ],
                    {
                        cancelToken: source.token,
                    }
                )
                .then((res) => {
                    setGroups(res[0].data.data.groupids);
                    console.log(res[0].data.data.groupids);

                    groupIdTemp = res[0].data.data.groupids.find(
                        (item) =>
                            year === item.groupid.substring(1, 2) &&
                            semester === item.groupid.substring(4, 5)
                    );

                    setGroupIDBehalfOfName(groupIdTemp._id);

                    setConstraintsGroupList(res[1].data.data.constraintsGroups);

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
            <ContentHeader header="Student Groups" />

            <div
                style={{
                    marginTop: '3%',
                    paddingLeft: '3%',
                }}
            >
                <div className="form-row">
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
                    <div className="form-group col-md-2">
                        <label>Select Group</label>
                        <select
                            className="custom-select"
                            onChange={onGroupChange}
                            value={groupIDbehalfOfName}
                        >
                            {groups.map((item) =>
                                year ===
                                    item.yearsemestername.substring(1, 2) &&
                                semester ===
                                    item.yearsemestername.substring(4, 5) ? (
                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.groupnumber >= 10
                                            ? `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            : `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`}
                                    </option>
                                ) : null
                            )}
                        </select>
                    </div>
                    <div className="form-group col-md-2">
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

            {groups.length === 0 ? (
                <EmptyDataPlaceholder message="Constraint list is currently empty" />
            ) : 
            <ConstraintsGroupsTable
                constraintsGroupList={constraintsGroupList}
                refreshComponent={refreshComponent}
                groups={groups}
            />
            }
        </div>
    );
}

export default ConstraintsGroups;
