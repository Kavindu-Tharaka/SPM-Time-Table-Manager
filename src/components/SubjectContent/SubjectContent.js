import React, { useState, useEffect } from 'react'
import ContentHeader from '../ContentHeader/ContentHeader';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import axios from "axios";
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';


import './SubjectContent.css';

const SubjectContent = () => {

    const [subjectCode, setSubjectCode] = useState("");
    const [offeredYear, setOfferedYear] = useState("1");
    const [offeredSemester, setOfferedSemester] = useState("S1");
    const [subjectName, setSubjetName] = useState("");
    const [numberOfLecHrs, setNumberOfLecHrs] = useState("");
    const [numberOfTutorialHrs, setNumberOfTutorialHrs] = useState("");
    const [numberOfLabHrs, setNumberOfLabHrs] = useState("");
    const [numberOfEveluationHrs, setnumberOfEveluationHrs] = useState("");
    const [subjectData, setSubjectData] = useState(" ");
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState();

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



    const onSubmit = (e) => {
        e.preventDefault();
        if (subjectName === '' || subjectCode === " " || numberOfLecHrs === " " || numberOfTutorialHrs === " " || numberOfLabHrs === " " || numberOfEveluationHrs === " ") {
            Swal.fire('An Input Filed Is Empty!');
        }
        else if (!update) {

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
                window.location.reload()
                console.log("subject data added", res);
            }).catch((err) => {
                console.log("sub data err: ", err);
            });
        }
        else {

            axios.patch(`http://localhost:8000/api/v1/subjects/${id}`, {
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
                    console.log(res.data);
                    console.log("subject update executed succesfully")
                    setUpdate(false)
                })
                .catch((e) => {
                    console.err(e);
                });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        axios
            .get("http://localhost:8000/api/v1/subjects")
            .then((result) => {
                console.log("subject api response: ", result.data.data.subjects);
                setSubjectData(result.data.data.subjects);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    const updateSubject = (value, e) => {
        console.log("fncalled update");
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

    const deleteSubject = (id) => {
        console.log("delete fn called");
        axios
            .delete(`http://localhost:8000/api/v1/subjects/${id}`)
            .then((res) => {
                console.log(res);
                setSubjectData(
                    subjectData.filter(subject => { return subject._id !== id })
                );
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
                        <button id="btn-edit" className="btn rounded-circle border-none btn-sm" onClick={() => updateSubject(row)}><FaPencilAlt color="#1a1aff" /></button>{""}
                        <button id="btn-remove" className="btn rounded-circle border-none btn-sm" onClick={() => deleteSubject(row._id)}><FaTrashAlt color="#1a1aff" /></button>
                    </div>
                )
        },
    ];
    return (
        <div>
            <ContentHeader header={'Subjects'} />
            <br />
            <form onSubmit={onSubmit}>
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="mb-1">{'Offered Year'}</p>
                        <select
                            onChange={(e) => onOfferedYearChange(e)}
                            id="offerdYear"
                            style={{ borderRadius: 0 }}
                            className="form-control form-control-sm"
                            value={offeredYear}
                        >
                            <option name="1" value="1">1</option>
                            <option name="2" value="2">2</option>
                            <option name="3" value="3">3</option>
                            <option name="4" value="4">4</option>

                        </select>
                    </div>
                    <div>
                        <p className="mb-1">{'Subject Code'}</p>
                        <input
                            onChange={(e) => onCodeChange(e)}
                            value={subjectCode} />
                    </div>
                    <div>
                        <p className="mb-1">{'Number Of Lecture Hrs'}</p>
                        <input
                            onChange={(e) => onLecHrschange(e)}
                            value={numberOfLecHrs} />
                    </div>
                    <div>
                        <p className="mb-1">{'Number Of Lab Hrs'}</p>
                        <input
                            onChange={(e) => onLabHrschange(e)}
                            value={numberOfLabHrs} />
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <div>
                        <p className="mb-1">{'Offered Semester'}</p>
                        <select
                            id="offerdSemester"
                            style={{ borderRadius: 0 }}
                            className="form-control form-control-sm"
                            onChange={(e) => onSemesterChange(e)}
                            value={offeredSemester}
                        >
                            <option name="S1" value="1">S1</option>
                            <option name="S2" value="2">S2</option>

                        </select>
                    </div>
                    <div>
                        <p className="mb-1">{'Subject Name'}</p>
                        <input
                            onChange={(e) => onNamechange(e)}
                            value={subjectName}
                        />
                    </div>
                    <div>
                        <p className="mb-1">{'Number Of Tutorial Hrs'}</p>
                        <input
                            onChange={(e) => onTutorialHrsChange(e)}
                            value={numberOfTutorialHrs} />
                    </div>
                    <div>
                        <p className="mb-1">{'number Of Evluation Hrs'}</p>
                        <input
                            onChange={(e) => onEveluationHrschange(e)}
                            value={numberOfEveluationHrs} />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary wk-submit-button mt-2">{update ? 'Edit' : 'Add'}</button>
                </div>
            </form>

            <div className="mt-4">
                <DataTable
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
