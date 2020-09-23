import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { FaSpinner } from 'react-icons/fa';
import moment from 'moment';
import ConstraintsSubGroupsTable from './ConstraintsSubGroupsTable'

function ConstraintsSubSubGroups() {
    let subGroupIdTemp;
    const [subgroups, setSubGroups] = useState([]);

    const [subgroupIDbehalfOfName, setSubGroupIDBehalfOfName] = useState('');
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

    const [constraintsSubGroupList, setConstraintsSubGroupList] = useState([]);

    const _isBefore = (from, to) => {
        const fromTime = moment(from, 'HH:mm');
        const toTime = moment(to, 'HH:mm');
        return fromTime.isBefore(toTime);
    };

    const refreshComponent = () => {
        setUpdateComponent(Math.random());
    };

    const onSubGroupChange = (e) => {
        setSubGroupIDBehalfOfName(e.target.value);
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

            constraintsSubGroupList.forEach((element) => {
                if (
                    element.day === day &&
                    element.from === from &&
                    element.to === to &&
                    element.subgroup._id === subgroupIDbehalfOfName
                ) {
                    setErrorMsg(
                        'The Constraint You Entered is Already Exists!'
                    );
                    isExist = true;
                    setIsAdding(false);
                }
            });

            if (!isExist) {
                axios
                    .post('http://localhost:8000/api/v1/constraintssubgroups', {
                        subgroup: subgroupIDbehalfOfName,
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
                        setYear('1')
                        setSemester('1')
                        setDay('Monday')
                        setFrom('')
                        setTo('')
                        
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
                        axios.get('http://localhost:8000/api/v1/subgroupids'),
                        axios.get(
                            'http://localhost:8000/api/v1/constraintssubgroups'
                        ),
                    ],
                    {
                        cancelToken: source.token,
                    }
                )
                .then((res) => {
                    setSubGroups(res[0].data.data.subgroupids);


                    subGroupIdTemp = res[0].data.data.subgroupids.find(
                        (item) =>
                            year === item.subgroupid.substring(1, 2) &&
                            semester === item.subgroupid.substring(4, 5)
                    );

                    setSubGroupIDBehalfOfName(subGroupIdTemp._id);

                    setConstraintsSubGroupList(res[1].data.data.constraintsSubGroups);

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
    }, [year, semester, updateComponent]);

    return (
        <div>
            <PreLoader loading={loading} hasSideBar={true} />
            <ContentHeader header="Student Sub-Groups" />

            <div
                style={{
                    marginTop: '3%',
                    paddingLeft: '3%',
                }}
            >
                <div className="form-row">
                <div className="form-subgroup col-md-1">
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
                    <div className="form-subgroup col-md-1">
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
                    <div className="form-subgroup col-md-2">
                        <label>Sub-Group</label>
                        <select
                            className="custom-select"
                            onChange={onSubGroupChange}
                            value={subgroupIDbehalfOfName}
                        >
                            {subgroups.map((item) =>
                                year ===
                                    item.subgroupid.substring(1, 2) &&
                                semester ===
                                    item.subgroupid.substring(4, 5) ? (
                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.subgroupid}
                                    </option>
                                ) : null
                            )}
                        </select>
                    </div>
                    <div className="form-subgroup col-md-2">
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
                    <div className="form-subgroup col-md-2">
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
                    <div className="form-subgroup col-md-2">
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
                    <div className="form-subgroup col-md-2">
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
                    }}
                >
                    {errorMsg}
                </div>
            </div>
            <br />

            {subgroups.length === 0 ? (
                <EmptyDataPlaceholder message="Constraint list is currently empty" />
            ) : 
            <ConstraintsSubGroupsTable
                constraintsSubGroupList={constraintsSubGroupList}
                refreshComponent={refreshComponent}
                subgroups={subgroups}
            />
            }
        </div>
    );
}

export default ConstraintsSubSubGroups
