import React, { useState, useEffect } from 'react'
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from "axios";
import DataTable from 'react-data-table-component';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateSubjectDialogBox from '../UpdateSubjectDialogBox/UpdateSubjectBox';

import './SubjectContent.css';


const SubjectContent = () => {

    const [subjectCode, setSubjectCode] = useState("");
    const [offeredYear, setOfferedYear] = useState("1");
    const [offeredSemester, setOfferedSemester] = useState("1");
    const [subjectName, setSubjetName] = useState("");
    const [numberOfLecHrs, setNumberOfLecHrs] = useState("");
    const [numberOfTutorialHrs, setNumberOfTutorialHrs] = useState("");
    const [numberOfLabHrs, setNumberOfLabHrs] = useState("");
    const [numberOfEveluationHrs, setnumberOfEveluationHrs] = useState("");
    const [subjectData, setSubjectData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState();
    const [loading, setloading] = useState(true);

    const [isCodevalid, setIsCodeValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isLecHrsValid, setIsLecHrsValid] = useState(true);
    const [isTutHrsValid, setIsTutHrsValid] = useState(true);
    const [isEveHrsValid, setIsEveHrsValid] = useState(true);
    const [isLabHrsValid, setIsLabHrsValid] = useState(true);

    const [refresh,setRefresh] = useState(false);

    const onOfferedYearChange = (e) => {
        setOfferedYear(e.target.value)
    }
    const onCodeChange = (e) => {
        setSubjectCode(e.target.value)
    }
    const onLecHrschange = (e) => {
        setNumberOfLecHrs(e.target.value)
    }
    const onLabHrschange = (e) => {
        setNumberOfLabHrs(e.target.value)
    }
    const onSemesterChange = (e) => {
        setOfferedSemester(e.target.value)
    }
    const onNamechange = (e) => {
        setSubjetName(e.target.value)
    }
    const onTutorialHrsChange = (e) => {
        setNumberOfTutorialHrs(e.target.value)
    }
    const onEveluationHrschange = (e) => {
        setnumberOfEveluationHrs(e.target.value)
    }

    const onUpdateClick = (data) => {

        swal({
            buttons: false,
            content: (
                <UpdateSubjectDialogBox
                    sub={data}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            ),
        });
    }


    const onSubmit = (e) => {
        e.preventDefault();

        let errDeteted = false;

        if (subjectName === '') {
            setIsNameValid(false);
            errDeteted = true;
        }
        if (subjectCode === '') {
            setIsCodeValid(false);
            errDeteted = true;
        }
        if (numberOfLecHrs === '') {
            setIsLecHrsValid(false);
            errDeteted = true;
        }
        if (numberOfTutorialHrs === '') {
            setIsTutHrsValid(false);
            errDeteted = true;
        }
        if (numberOfLabHrs === '') {
            setIsLabHrsValid(false); 
            errDeteted = true;
        }
        if (numberOfEveluationHrs === '') {
            setIsEveHrsValid(false);
            errDeteted = true;
        }
        if (errDeteted) {
            return;
        }
        // else if (!update) {

        axios.post("http://localhost:8000/api/v1/subjects", {
            subjectCode,
            offeredYear,
            offeredSemester,
            subjectName,
            numberOfLecHrs,
            numberOfTutorialHrs,
            numberOfLabHrs,
            numberOfEveluationHrs
        }).then((res) => {
            store.addNotification(buildToast('success', '', 'Subject Added Successfully'));
            setRefresh(true);
            clear();
        }).catch((err) => {
            console.log(err);
        });

        const clear = () =>{
            setOfferedYear("1");
            setOfferedSemester("1");
            setSubjectCode("");
            setSubjetName("");
            setNumberOfLabHrs("");
            setNumberOfLecHrs("");
            setNumberOfTutorialHrs("");
            setnumberOfEveluationHrs("");
            setRefresh(false);
        }
        // }
        // else {

        //     axios.patch(`http://localhost:8000/api/v1/subjects/${id}`, {
        //         subjectCode,
        //         offeredYear,
        //         offeredSemester,
        //         subjectName,
        //         numberOfLecHrs,
        //         numberOfTutorialHrs,
        //         numberOfLabHrs,
        //         numberOfEveluationHrs
        //     })
        //         .then((res) => {
        //             setUpdate(false);
        //             window.location.reload();
        //             store.addNotification(buildToast('warning', '', 'Subject Updated'));
        //         })
        //         .catch((e) => {
        //             console.err(e);
        //         });
        // }
    }

    useEffect(() => {
        loadData();
    }, [refresh]);

    const loadData = () => {
        axios
            .get("http://localhost:8000/api/v1/subjects")
            .then((result) => {
                setSubjectData(result.data.data.subjects);
                setloading(false);
            })
            .catch((e) => {
                console.log(e);
                setloading(false);
            });
    }

    const updateSubject = (value, e) => {
        setUpdate(true)
        setSubjectCode(value.subjectCode)
        setOfferedYear(value.offeredYear)
        setOfferedSemester(value.offeredSemester)
        setSubjetName(value.subjectName)
        setNumberOfLecHrs(value.numberOfLecHrs)
        setNumberOfTutorialHrs(value.numberOfTutorialHrs)
        setNumberOfLabHrs(value.numberOfLabHrs)
        setnumberOfEveluationHrs(value.numberOfEveluationHrs)
        // setSubjectData(value)
        setId(value._id)
    }

    // const onDeleteClick = (id, name) = {
    //     swal({
    // 		buttons: false,
    // 		content: (
    // 			<DeleteConfirmationDialogBox
    // 				deleteEventWithIdHandler={deleteSubject}
    // 				itemId={id}
    // 				itemName={name}
    // 			/>
    // 		),
    // 	});
    // }
    const onDeleteClick = (id, name) => {
        swal({
            buttons: false,
            content: (
                <DeleteConfirmationDialogBox
                    deleteEventWithIdHandler={deleteSubject}
                    itemId={id}
                    itemName={name}
                />
            ),
        });
    };

    const deleteSubject = (id) => {
        axios
            .delete(`http://localhost:8000/api/v1/subjects/${id}`)
            .then((res) => {
                console.log(res);
                setSubjectData(
                    subjectData.filter(subject => { return subject._id !== id })
                );
                swal.close()
                store.addNotification(buildToast('danger', '', 'Subject Deleted'))
            })
            .catch((e) => console.error(e));
    }

    const columns = [
        {
            name: "ID",
            selector: "_id",
            sortable: true,
            omit: true,
        },
        {
            name: 'Name',
            selector: 'subjectName',
            sortable: true,
            cell: row => <div>{row.subjectName}</div>
        },
        {
            name: 'Code',
            selector: 'subjectCode',
            sortable: true,
            cell: row => <div>{row.subjectCode}</div>
        },
        {
            name: 'Offered Year',
            selector: 'offeredYear',
            sortable: true,
            center: true,
        },
        {
            name: 'Semester',
            selector: 'offeredSemester',
            sortable: true,
            center: true,
        },
        {
            name: 'Lec Hrs',
            selector: 'numberOfLecHrs',
            sortable: true,
            center: true,
        },
        {
            name: 'Tutorial Hrs',
            selector: 'numberOfTutorialHrs',
            sortable: true,
            center: true,
        },
        {
            name: 'Lab Hrs',
            selector: 'numberOfLabHrs',
            sortable: true,
            center: true,
        },
        {
            name: 'Eveluation Hrs',
            selector: 'numberOfEveluationHrs',
            sortable: true,
            center: true,
        },
        {
            name: 'Action',
            selector: 'action',
            center: true,
            cell:
                (row) => (
                    <div className="d-flex">
                        <button id="btn-edit" className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt' onClick={() => onUpdateClick(row)}><IoMdCreate /></button>{""}
                        <button id="btn-remove" className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt' onClick={() => onDeleteClick(row._id, row.subjectName)}><IoMdClose /></button>
                    </div>
                )
        },
    ];
    return (
        <div>
            <PreLoader loading={loading} />
            <ContentHeader header={'Subjects'} />
            <br />
            <form>
                <div className="form-row">
                    <div className="form-group col">
                        <p className="mb-1">{'Offered Year'}</p>
                        <select
                            onChange={(e) => onOfferedYearChange(e)}
                            id="offerdYear"
                            style={{ borderRadius: 0 }}
                            className="form-control"
                            value={offeredYear}
                        >
                            <option name="1" value="1">1</option>
                            <option name="2" value="2">2</option>
                            <option name="3" value="3">3</option>
                            <option name="4" value="4">4</option>

                        </select>
                    </div>
                    <div className="form-group col">
                        <p className="mb-1">{'Subject Code'}</p>
                        <input
                        type="text"
                            onChange={(e) => onCodeChange(e)}
                            value={subjectCode}
                            className={
                                isCodevalid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                        />
                        <div className='invalid-feedback'>
                            Please enter a subjet code
					</div>
                    </div>
                    <div className="form-group col">
                        <p className="mb-1">{'Number Of Lecture Hrs'}</p>
                        <input
                        type="number"
                            onChange={(e) => onLecHrschange(e)}
                            value={numberOfLecHrs}
                            className={
                                isLecHrsValid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                        />
                        <div className='invalid-feedback'>
                            Please provide lecture duration
					</div>
                    </div>
                    <div className="form-group col">
                        <p className="mb-1">{'Number Of Lab Hrs'}</p>
                        <input
                        type="number"
                            onChange={(e) => onLabHrschange(e)}
                            value={numberOfLabHrs}
                            className={
                                isLabHrsValid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                        />
                        <div className='invalid-feedback'>
                            Please enter lab duration
					</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col">
                        <p className="mb-1">{'Offered Semester'}</p>
                        <select
                        type="number"
                            id="offerdSemester"
                            style={{ borderRadius: 0 }}
                            className="form-control"
                            onChange={(e) => onSemesterChange(e)}
                            value={offeredSemester}
                        >
                            <option name="S1" value="1">S1</option>
                            <option name="S2" value="2">S2</option>

                        </select>
                    </div>
                    <div className="form-group col">
                        <p className="mb-1">{'Subject Name'}</p>
                        <input
                        type="text"
                            onChange={(e) => onNamechange(e)}
                            value={subjectName}
                            className={
                                isNameValid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                        />
                        <div className='invalid-feedback'>
                            Please provide a subject name
					</div>
                    </div>
                    <div className="form-group col">
                        <p className="mb-1">{'Number Of Tutorial Hrs'}</p>
                        <input
                        type="number"
                            onChange={(e) => onTutorialHrsChange(e)}
                            value={numberOfTutorialHrs}
                            className={
                                isTutHrsValid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            } />
                        <div className='invalid-feedback'>
                            Please provide tutorial duration
					</div>
                    </div>
                    <div className="form-group col">
                        <p className="mb-1">{'number Of Evluation Hrs'}</p>
                        <input
                        type="number"
                            onChange={(e) => onEveluationHrschange(e)}
                            value={numberOfEveluationHrs}
                            className={
                                isEveHrsValid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                        />
                        <div className='invalid-feedback'>
                            Please provide evelution duration
					</div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary wk-submit-button mt-2" onClick={onSubmit}> {'Add'}</button>
                </div>
            </form>

            <div className="mt-4">
                <DataTable
                    title="Subject Details"
                    columns={columns}
                    data={subjectData}
                    pagination={true}
                    paginationTotalRows={7}
                    paginationPerPage={7}
                    highlightOnHover={true}
                    responsive={true}
                />
            </div>
        </div>
    )
}

export default SubjectContent
