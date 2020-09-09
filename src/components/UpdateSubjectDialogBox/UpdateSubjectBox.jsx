import React, { useState } from 'react'
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const UpdateSubjectBox = (props) => {

    console.log("subject props: ",props);

    const [subjectCode, setSubjectCode] = useState(props.sub.subjectCode);
    const [offeredYear, setOfferedYear] = useState(props.sub.offeredYear);
    const [offeredSemester, setOfferedSemester] = useState(props.sub.offeredSemester);
    const [subjectName, setSubjetName] = useState(props.sub.subjectName);
    const [numberOfLecHrs, setNumberOfLecHrs] = useState(props.sub.numberOfLecHrs);
    const [numberOfTutorialHrs, setNumberOfTutorialHrs] = useState(props.sub.numberOfTutorialHrs);
    const [numberOfLabHrs, setNumberOfLabHrs] = useState(props.sub.numberOfLabHrs);
    const [numberOfEveluationHrs, setnumberOfEveluationHrs] = useState(props.sub.numberOfEveluationHrs);

    const onYearChange = (e) => {
        setOfferedYear(e.target.value);
    }
    const onLecHrsChange = (e) => {
        setNumberOfLecHrs(e.target.value);
    }
    const onSubjectCodeChange = (e) => {
        setSubjectCode(e.target.value);
    }
    const onLabHrsChange = (e) => {
        setNumberOfLabHrs(e.target.value);
    }
    const onSemesterChange = (e) => {
        setOfferedSemester(e.target.value);
    }
    const onSubjectNameChange = (e) => {
        setSubjetName(e.target.value);
    }
    const onTutorialHrsChange = (e) => {
        setNumberOfTutorialHrs(e.target.value);
    }
    const onEvelutionsChange = (e) => {
        setnumberOfEveluationHrs(e.target.value);
    }

    const onUpdateClick = () =>{
        axios.patch(`http://localhost:8000/api/v1/subjects/${props.sub._id}`, {
            subjectCode,
            offeredYear,
            offeredSemester,
            subjectName,
            numberOfLecHrs,
            numberOfTutorialHrs,
            numberOfLabHrs,
            numberOfEveluationHrs
        })
            .then((res) => {
                window.location.reload();
                store.addNotification(buildToast('success', '', 'Subject Updated'));
            })
            .catch((e) => {
                console.err(e);
                store.addNotification(buildToast('warning', '', 'Subject Update Error'));
            });
    }

    return (

        <div>
            <div>
                <div className='dcdb-dialog-container'>
                    <h5 className='text-left m-0'>Update Subject details</h5>
                    <hr />
                    <div className='form-row'>

                        <div className='form-group col'>
                            <label className='dialog-label'>Offered Year</label>
                            <select value={offeredYear} onChange={(e) => onYearChange(e)} name="level" className="form-control">
                                <option value="1">Professor</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>



                        <div className='form-group col'>
                            <label className='dialog-label'>Subject Code</label>
                            <input
                                type='text'
                                className='form-control'
                                // placeholder='Room Name'
                                value={subjectCode}
                                onChange={onSubjectCodeChange}
                            />
                        </div>

                    </div>

                    <div className='form-row'>

                        <div className='form-group col'>
                            <label className='dialog-label'> Lec Hrs</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={onLecHrsChange}
                                value={numberOfLecHrs}
                            />
                        </div>

                        <div className='form-group col'>
                            <label className='dialog-label'>Lab Hrs</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={onLabHrsChange}
                                value={numberOfLabHrs}
                            />
                        </div>
                    </div>

                    <div className='form-row'>
                        <div className='form-group col'>
                            <label className='dialog-label'>Offered Semester</label>
                            <select value={offeredSemester} onChange={(e) => onSemesterChange(e)} name="level" className="form-control">
                                <option name="S1" value="S1">S1</option>
                                <option name="S2" value="S2">S2</option>
                            </select>
                        </div>

                        <div className='form-group col'>
                            <label className='dialog-label'>Subject Name</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={onSubjectNameChange}
                                value={subjectName}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col'>
                            <label className='dialog-label'>Tutorial Hrs</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={onTutorialHrsChange}
                                value={numberOfTutorialHrs}
                            />
                        </div>
                        <div className='form-group col'>
                            <label className='dialog-label'>Evalution Hrs</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={onEvelutionsChange}
                                value={numberOfEveluationHrs}
                            />
                        </div>
                    </div>

                    {/* <p className='text-left'>{props.lec.name}</p> */}
                    <button
                        className='btn btn-info float-right mb-4'
                    onClick={onUpdateClick}
                    >
                        Update
			</button>
                    <button
                        className='btn btn-secondary float-right mb-4 mr-2'
                        onClick={() => {
                            swal.close();
                        }}
                    >
                        Cancel
			</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateSubjectBox
