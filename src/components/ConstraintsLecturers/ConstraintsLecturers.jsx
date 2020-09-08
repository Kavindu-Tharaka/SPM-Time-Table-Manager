import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import ConstraintsLecturersTable from './ConstraintsLecturersTable';


function ConstraintsLecturers() {
    const [lecturers, setLecturers] = useState([]);

    const [lecturerName, setLecturerName] = useState('');
    const [day, setDay] = useState('Monday');

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [updateComponent, setUpdateComponent] = useState(0);

    const refreshComponent = () => {
        setUpdateComponent(Math.random());
    };

    const onLecturerChange = (e) => {
        setLecturerName(e.target.value);
    };

    const onDayChange = (e) => {
        setDay(e.target.value);
    };
    
    const onFromChange = (e) => {
        setFrom(e.target.value);
    };

    const onToChange = (e) => {
        setTo(e.target.value);
    };

    const onAddClick = (e) => {

        console.log('lecturer: '+lecturerName);
        console.log('day: '+day);
        console.log('from: '+from);
        console.log('to: '+to);
        // axios
        //     .post('http://localhost:8000/api/v1/rooms', {
        //         lecturer: lecturerName,
        //         day,
        //         floor,
        //         capacity,
        //         roomType,
        //     })
        //     .then((res) => {
        //         setRooms([...rooms, res.data.data.room]);
        //         // TODO: Clear input fields
        //     })
        //     .catch((err) => {
        //         console.log(err.response);
        //     });
    };

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
        axios
            .get('http://localhost:8000/api/v1/lecturers', {
                cancelToken: source.token,
            })
            .then((res) => {
                setLecturers(res.data.data.lecturers);
                if (res.data.data.lecturers.length !== 0) {
                    setLecturerName(res.data.data.lecturers[0].name);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
        }

        loadData();

        return () => {
            source.cancel();
        };

    }, [updateComponent]);

    return (
        <div>
            <ContentHeader header="Lecturers" />

            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>Select Lecturer</label>
                    <select
                        className="custom-select"
                        onChange={onLecturerChange}
                        value={lecturerName}
                    >
                        {lecturers.map((lecturer) => {
                            return (
                                <option key={lecturer._id} value={lecturer.name}>
                                    {lecturer.name}
                                </option>
                            );
                        })}
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
                        className="form-control"
                        placeholder="00"
                        onChange={onFromChange}
                        value={from}
                    />
                </div>
                <div className="form-group col-md-2">
                    <label>To</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="00"
                        onChange={onToChange}
                        value={to}
                    />
                </div>
                <div className="form-group col-md-2">
                    <button
                        className="btn btn-primary float-right mt-4"
                        onClick={onAddClick}
                    >
                        Add
                    </button>
                </div>
            </div>
            <br />

            {lecturers.length === 0 ? (
                <EmptyDataPlaceholder message="Room list is currently empty" />
            ) : (
                <ConstraintsLecturersTable
                    // rooms={rooms}
                    // buildings={buildings}
                    lecturers={lecturers}
                    refreshComponent={refreshComponent}
                />
            )}
        </div>
    );
}

export default ConstraintsLecturers;
