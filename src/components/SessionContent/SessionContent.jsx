import React, { useState, useEffect } from 'react'
import ContentHeader from '../ContentHeader/ContentHeader';
import DataTable from 'react-data-table-component';
import axios from "axios";
import Select from "react-dropdown-select";
import styled from "@emotion/styled";
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import PreLoader from '../PreLoader/PreLoader';


const SessionContent = () => {
    //   fetchData();
    const [lecturersArr, setLecturersArr] = useState([]);
    const [tagsArr, setTagsArr] = useState([]);
    const [grpsArr, setGrpsArr] = useState([]);
    const [subGrpsArr, seSubGrpsArr] = useState([]);
    const [subjectsArr, setSubjectsArr] = useState([]);
    // const loadedTags = [];
    // tagsArr.map(d => loadedTags.push(d.tagname));
    // console.log("loadedTags: ",loadedTags)
    // const loadedGrp = [];

    const [lecturers, setLectures] = useState([]);
    const [tag, setTag] = useState('Lecture');
    // if (tag == 'Practical' || tag == 'practical') {
    //     subGrpsArr.map(d => loadedGrp.push(d.subgroupid));
    // } else {
    //     subGrpsArr.map(d => loadedGrp.push(d.groupid));
    // }
    const [studentGroup, setStudentGrp] = useState('Y1.S1.IT.01');
    // const loadedSubject = [];
    // subjectsArr.map(d=> loadedSubject.push(d.subjectName));
    // console.log("loadedSubject ",loadedSubject)
    const [subject, setSubject] = useState('Introduction to Programming');
    const [numberOfStudents, setNumberOfStudent] = useState('');
    const [duration, setDuration] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [names, setNames] = useState([]);
    const [loading, setloading] = useState(true);

    const [sessionDetails, setSessionDeatils] = useState([]);

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const fetchData = async () => {
        //lec
        try {
            const lecdata = await axios.get("http://localhost:8000/api/v1/lecturers");
            setLecturersArr(lecdata.data.data.lecturers);
        } catch (e) {
            console.error(e);
        }

        //tags
        try {
            const tagdata = await axios.get("http://localhost:8000/api/v1/tags");
            setTagsArr(tagdata.data.data.tags);
        } catch (e) {
            console.error(e);
        }


        //grps
        try {
            const subgrpdata = await axios.get("http://localhost:8000/api/v1/subgroupids");
            setGrpsArr(subgrpdata.data.data.subgroupids); //.groupid
            seSubGrpsArr(subgrpdata.data.data.subgroupids); //.subgroupid
        } catch (e) {
            console.error(e);
        }


        //subjetcs
        try {
            const subdata = await axios.get("http://localhost:8000/api/v1/subjects");
            setSubjectsArr(subdata.data.data.subjects);
            setloading(false);
        } catch (e) {
            console.error(e);
            setloading(false);
        }


        try {
            const sessiondata = await axios.get("http://localhost:8000/api/v1/session");
            setSessionDeatils(sessiondata.data.data.sessions);
            setloading(false);
        } catch (e) {
            console.error(e);
            setloading(false);
        }
    }
    const onChangeLecture = (list) => {
        list.map(d => setLectures([...lecturers, d.name]))
        setNames(list);
    }
    const onTagChange = (e) => {
        setTag(e.target.value);
    }
    const onstudentGrpChange = (e) => {
        setStudentGrp(e.target.value);
    }
    const onSubjctChange = (e) => {
        setSubject(e.target.value);
    }
    const onNumOfStudenthange = (e) => {
        setNumberOfStudent(e.target.value);
    }
    const onDurationChange = (e) => {
        setDuration(e.target.value);
    }

    const StyledSelect = styled(Select)`
  .react-dropdown-select-input {
    display: none;
  }

  .react-dropdown-select-content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
`;


    const onSubmit = (e) => {
        e.preventDefault();
        // try {
        //     axios.post("http://localhost:8000/api/v1/session", {
        //         lectures,
        //         tag,
        //         studentGrp,
        //         subject,
        //         numberOfStudent,
        //         duration
        //     })
        //     console.log("saved");
        //     setLectures('');
        // } catch (e) {
        //     console.error(e);
        //     console.log("not saved");
        // }
        if (subject == 'undefined') {
            fetchData()
        }

        axios.post("http://localhost:8000/api/v1/session", {
            lecturers,
            tag,
            studentGroup,
            subject,
            numberOfStudents,
            duration
        }).then((res) => {
            console.log("saved");
            setNames([]);
            setTag('');
            setStudentGrp('');
            setSubject('');
            setNumberOfStudent('');
            setDuration('');
            setRefresh(true);
        }).catch((err) => {
            console.log("err is: ", err);
        });

    }

    const onDeleteClick = (id, name) => {
        swal({
            buttons: false,
            content: (
                <DeleteConfirmationDialogBox
                    deleteEventWithIdHandler={deleteSession}
                    itemId={id}
                    itemName={name}
                />
            ),
        });
    }

    const deleteSession = (rowID) => {
        axios
            .delete(`http://localhost:8000/api/v1/session/${rowID}`)
            .then((res) => {
                setSessionDeatils(
                    sessionDetails.filter(ses => { return ses._id !== rowID })
                );
                swal.close()
                store.addNotification(buildToast('danger', '', 'Session deleted'));
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
            name: 'Lecturer',
            selector: 'lecturers',
            sortable: true,
            cell: row => <div>{row.lecturers}</div>
        },
        {
            name: 'Tag',
            selector: 'tag',
            sortable: true,

        },
        {
            name: 'Student Group',
            selector: 'studentGroup',
            sortable: true,
        },
        {
            name: 'Subject',
            selector: 'subject',
            sortable: true,
            cell: row => <div>{row.subject}</div>
        },
        {
            name: 'No of Student',
            selector: 'numberOfStudents',
            sortable: true,
            center: true
        },
        {
            name: 'Duration',
            selector: 'duration',
            sortable: true,
            center: true
        },
        {
            name: 'Action',
            selector: 'action',
            center: true,
            cell:
                (row) => (
                    <div className="d-flex">
                        {/* <button id="btn-edit" className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt' onClick={() => updateLecturer(row)}><IoMdCreate /></button>{""} */}
                        <button id="btn-remove" className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt' onClick={() => onDeleteClick(row._id, row.name)}><IoMdClose /></button>
                    </div>
                )
        }
    ];


    return (
        <div> <PreLoader loading={loading} />
            <div>
                <ContentHeader header={'Sessions'} />
                <div>
                    <form className="needs-validation">
                        <div className="form-row">

                            <div className="form-group col">
                                <p className="mb-1">Lecturer</p>
                                <div className="">

                                    <StyledSelect
                                        multi={true}
                                        values={names}// values={lecturers}
                                        labelField="name"
                                        valueField="name"
                                        options={lecturersArr}
                                        searchable={false}
                                        onChange={(l) => onChangeLecture(l)}
                                        name="lecturers"
                                    />

                                </div>
                            </div>

                            <div className="form-group col">
                                <p className="mb-1">Tag</p>
                                <div className="">
                                    <select name="lecturer" name="tag" value={tag} className="form-control" id="tagVal" onChange={(e) => onTagChange(e)}>
                                        {tagsArr.length > 0 ? tagsArr.map((data) => {
                                            return <option key={data._id} value={data.tagname}>{data.tagname}</option>
                                        }) : 'No Tags inserted'}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col">
                                <p className="mb-1">Student Group</p>
                                <div className="">
                                    <select name="lecturer" name="studentGroup" id="student-grp" value={studentGroup} onChange={(e) => onstudentGrpChange(e)} className="form-control">
                                        {tagsArr.length > 0 ?

                                            (
                                                tag == 'Practical' ?
                                                    grpsArr.map((data) => {
                                                        return <option key={data._id} value={data.groupid}>{data.subgroupid}</option>
                                                    })
                                                    : tagsArr.tagname == 'Practicle' ?
                                                        grpsArr.map((data) => {
                                                            return <option key={data._id} value={data.groupid}>{data.subgroupid}</option>
                                                        })
                                                        :
                                                        grpsArr.map((data) => {
                                                            return <option key={data._id} value={data.groupid}>{data.groupid}</option>
                                                        })

                                            )
                                            :
                                            <option>No tag records found</option>
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>{/**first row ends*/}


                        <div className="form-row">


                            <div className="form-group col">
                                <p className="mb-1">Subject</p>
                                <div className="">
                                    <select name="subject" value={subject} className="form-control" onChange={(e) => onSubjctChange(e)}>

                                        {subjectsArr.length > 0 ? subjectsArr.map((data) => {
                                            return <option key={data._id} value={data.subjectName}>{data.subjectName}</option>
                                        }) : 'No Subjects inserted'}


                                    </select>
                                </div>
                            </div>


                            <div className="form-group col">
                                <p className="mb-1">Number Of Students</p>
                                <input
                                    type="number"
                                    name="numberOfStudents"
                                    value={numberOfStudents}
                                    className="form-control"
                                    onChange={(e) => onNumOfStudenthange(e)}
                                />

                            </div>


                            <div className="form-group col">
                                <p className="mb-1">Duration</p>
                                <input
                                    type="number"
                                    name="duration"
                                    className="form-control"
                                    onChange={(e) => onDurationChange(e)}
                                    value={duration}
                                />
                            </div>

                        </div>{/**second row ends here */}

                        <div className="d-flex justify-content-end mt-2">
                            <button id="session-insert" type="submit" className="btn btn-primary wk-submit-button" onClick={(e) => onSubmit(e)} >{" "} {'Add'} {" "}</button>
                        </div>

                    </form>
                </div>{/*form ends*/}

                <DataTable
                    title="Session Details"
                    columns={columns}
                    data={sessionDetails}
                />
            </div>
        </div>
    )
}

export default SessionContent
