import React, { useState, useEffect, useMemo } from 'react'
import ContentHeader from '../ContentHeader/ContentHeader';
import DataTable from 'react-data-table-component';
import axios from "axios";
import Select from "react-dropdown-select";
import styled from "@emotion/styled";
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
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
    const [isNumOfStudentValid, setIsNumOfStudntValid] = useState(true);
    const [isDurationValid, setIsDurationValid] = useState(true);
    const [isLectureValid, setIsLectureValid] = useState(true);

    useEffect(() => {
        // setNames([]);
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
        list.map(d => setLectures([...lecturers, d.name])) //...lecturers,
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
        const asString = `${lecturers} / ${subject} / ${tag} / ${studentGroup}`;
        let errDetected = false;

        if (numberOfStudents == '') {
            errDetected = true;
            setIsNumOfStudntValid(false);
        }
        if (duration == '') {
            errDetected = true;
            setIsDurationValid(false);
        }

        if (lecturers.length == 0) {
            errDetected = true;
            setIsLectureValid(false);
        }
        if (errDetected) {
            return;
        }

        axios.post("http://localhost:8000/api/v1/session", {
            lecturers,
            tag,
            studentGroup,
            subject,
            numberOfStudents,
            duration,
            asString
        }).then((res) => {
            clear();
            setRefresh(true);
            store.addNotification(buildToast('success', 'Success', 'Session Added Successfully'));
        }).catch((err) => {
            console.log("err is: ", err);
        });

    }

    const clear = () => {
        setLectures([]);
        setNames([]);
        setTag('Lecture');
        setStudentGrp('Y1.S1.IT.01');
        setSubject('Introduction to Programming');
        setNumberOfStudent('');
        setDuration('');
        setRefresh(false);
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
    //filter fn
    const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <div className='row'>
            {/* <div className="col"> */}
            <input id="search" type="text" placeholder="Search..." aria-label="Search Input" value={filterText} onChange={onFilter} />
            {/* </div> */}
            {/* <div className="col">
            <button className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt' onClick={onClear}><IoMdCloseCircle/></button>
            </div> */}
        </div>
    );

    const Table = () => {
        const [filterText, setFilterText] = useState('');
        const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
        const filteredItems = filterText == '' ? sessionDetails : sessionDetails.filter(item =>
            item.lecturers == `${filterText}` || item.duration == `${filterText}` || item.numberOfStudents == `${filterText}` || item.studentGroup == `${filterText}` || item.subject == `${filterText}` || item.tag == `${filterText}`)

        const subHeaderComponentMemo = useMemo(() => {
            const handleClear = () => {
                if (filterText) {
                    setResetPaginationToggle(!resetPaginationToggle);
                    setFilterText('');
                }
            };

            return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
        }, [filterText, resetPaginationToggle]);

        return (
            <DataTable
                title="Session Details"
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                // selectableRows
                persistTableHead
                paginationTotalRows={7}
                paginationPerPage={7}
                dense
                responsive={true}
                fixedHeader={true}
            />
        );
    };

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
            grow:4,
            sortable: true,
        cell: row => row.lecturers.map(name => <div>{`${name},`}</div>)
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
            grow:2,
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
            center: true,
            grow:1
        },
        {
            name: 'Action',
            selector: 'action',
            center: true,
            width:"65px",
            cell:
                (row) => (
                    <div className="d-flex">
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
                                        values={names}// values={lecturers}  names
                                        labelField="name"
                                        valueField="name"
                                        options={lecturersArr}
                                        searchable={false}
                                        onChange={(l) => onChangeLecture(l)}
                                        name="lecturers"
                                        className={isLectureValid ? null : 'form-control is-invalid'}
                                        clearOnSelect={false}

                                    />
                                    <div className='invalid-feedback'>
                                        Please provide a lecturer name
					                </div>
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
                                    className={isNumOfStudentValid ? 'form-control' : 'form-control is-invalid'}
                                    onChange={(e) => onNumOfStudenthange(e)}
                                />
                                <div className='invalid-feedback'>
                                    Please provide student count
					                </div>
                            </div>


                            <div className="form-group col">
                                <p className="mb-1">Duration</p>
                                <input
                                    type="number"
                                    name="duration"
                                    className={isDurationValid ? 'form-control' : 'form-control is-invalid'}
                                    onChange={(e) => onDurationChange(e)}
                                    value={duration}
                                />
                                <div className='invalid-feedback'>
                                    Please provide session duration
					                </div>
                            </div>

                        </div>{/**second row ends here */}

                        <div className="d-flex justify-content-end mt-2">
                            <button id="session-insert" type="submit" className="btn btn-primary wk-submit-button" onClick={(e) => onSubmit(e)} >{" "} {'Add'} {" "}</button>
                        </div>

                    </form>
                </div>{/*form ends*/}

                {/* <DataTable
                    title="Session Details"
                    columns={columns}
                    data={sessionDetails}
                    pagination={true}
                    paginationTotalRows={7}
                    paginationPerPage={7}
                    highlightOnHover={true}
                    responsive={true}
                /> */}
                <Table />
            </div>
        </div>
    )
}

export default SessionContent
