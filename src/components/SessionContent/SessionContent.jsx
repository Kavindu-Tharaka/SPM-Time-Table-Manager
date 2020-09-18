import React, { useState, useEffect } from 'react'
import ContentHeader from '../ContentHeader/ContentHeader';
import DataTable from 'react-data-table-component';
import axios from "axios";
// import { Picky } from 'react-picky';
// import 'react-picky/dist/picky.css';
// import { Multiselect } from 'multiselect-react-dropdown';
// import './sessionContent.css';
import Select from "react-dropdown-select";
import { FaVideoSlash } from 'react-icons/fa';

// import Select from 'react-select';
import styled from "@emotion/styled";


const SessionContent = () => {

    const [lecturersArr, setLecturersArr] = useState([]);
    const [tagsArr, setTagsArr] = useState([]);
    const [grpsArr, setGrpsArr] = useState([]);
    const [subGrpsArr, seSubGrpsArr] = useState([]);
    const [subjectsArr, setSubjectsArr] = useState([]);

    const [lectures, setLectures] = useState([]);
    const [tag, setTag] = useState('');
    const [studentGrp, setStudentGrp] = useState('');
    const [subject, setSubject] = useState();
    const [numberOfStudent, setNumberOfStudent] = useState('');
    const [duration, setDuration] = useState('');

    const tagCombine = [''];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //lec
        try {
            const lecdata = await axios.get("http://localhost:8000/api/v1/lecturers");
            setLecturersArr(lecdata.data.data.lecturers); //.lecturers
            console.log("lec data: ", lecdata);
        } catch (e) {
            console.error(e);
        }

        //tags
        try {
            const tagdata = await axios.get("http://localhost:8000/api/v1/tags");
            setTagsArr(tagdata.data.data.tags);
            console.log("tag array: ", tagdata)
        } catch (e) {
            console.error(e);
        }


        //grps
        try {
            const subgrpdata = await axios.get("http://localhost:8000/api/v1/subgroupids");
            console.log("sub grp: ", subgrpdata);
            setGrpsArr(subgrpdata.data.data.subgroupids); //.groupid
            seSubGrpsArr(subgrpdata.data.data.subgroupids); //.subgroupid
        } catch (e) {
            console.error(e);
        }


        //subjetcs
        try {
            const subdata = await axios.get("http://localhost:8000/api/v1/subjects");
            setSubjectsArr(subdata.data.data.subjects);
        } catch (e) {
            console.error(e);
        }

    }

    const onChangeLecture = (list, i) => {
        console.log('fn called');
        setLectures(list);
        console.log("lisT:", list.target.value);
    }
    const onTagChange = (e) => {
        setTag(e.target.value);
    }
    const onstudentGrpChange = (e) => {
        setStudentGrp(e.target.value)
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

        try {
            axios.post("http://localhost:8000/api/v1/session", {
                lectures,
                tag,
                studentGrp,
                subject,
                numberOfStudent,
                duration
            })
            console.log("saved");
        } catch (e) {
            console.error(e);
        }
    }

    const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Year',
            selector: 'year',
            sortable: true,
            right: true,
        },
    ];


    return (
        <div>
            <ContentHeader header={'Sessions'} />
            <div>
                <form className="needs-validation">
                    <div className="form-row">

                        <div className="form-group col">
                            <p className="mb-1">Lecturer</p>
                            <div className="">

                                {/* <Multiselect
                                    options={lecturersArr}
                                    // onSelect={(l,i) => onChangeLecture(l,i)}//(l,i) => onChangeLecture(l,i)
                                    multiSelect
                                    displayValue="name"
                                    // id={`${lecturersArr._id}`}
                                /> */}

                                <StyledSelect
                                    multi={true}
                                    // values={lecturersArr}
                                    labelField="name"
                                    valueField="name"
                                    options={lecturersArr}
                                    searchable={false}
                                />




                            </div>
                        </div>

                        <div className="form-group col">
                            <p className="mb-1">Tag</p>
                            <div className="">
                                <select name="lecturer" value={tag} className="form-control" id="tagVal" onChange={(e) => onTagChange(e)}>
                                    {tagsArr.length > 0 ? tagsArr.map((data) => {
                                        return <option key={data._id} value={data.tagname}>{data.tagname}</option>
                                    }) : 'No Tags inserted'}
                                </select>
                            </div>
                        </div>

                        <div className="form-group col">
                            <p className="mb-1">Student Group</p>
                            <div className="">
                                <select name="lecturer" value={studentGrp} onChange={(e) => onstudentGrpChange(e)} className="form-control">
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
                                <select name="lecturer" value={subject} className="form-control" onChange={(e) => onSubjctChange(e)}>

                                    {subjectsArr.length > 0 ? subjectsArr.map((data) => {
                                        return <option key={data._id} value={data.subjectName}>{data.subjectName}</option>
                                    }) : 'No Subjectsinserted'}


                                </select>
                            </div>
                        </div>


                        <div className="form-group col">
                            <p className="mb-1">Number Of Students</p>
                            <input
                                id="empId-input"
                                type="number"
                                name="empId"
                                value={numberOfStudent}
                                className="form-control"
                                onChange={(e) => onNumOfStudenthange(e)}
                            />

                        </div>


                        <div className="form-group col">
                            <p className="mb-1">Duration</p>
                            <input
                                id="empId-input"
                                type="number"
                                name="empId"
                                className="form-control"
                                onChange={(e) => onDurationChange(e)}
                                value={duration}
                            />
                        </div>

                    </div>{/**second row ends here */}

                    <div className="d-flex justify-content-end mt-2">
                        <button id="lec-insert" type="submit" className="btn btn-primary wk-submit-button" onClick={(e) => onSubmit(e)} >{" "} {'Add'} {" "}</button>
                    </div>

                </form>
            </div>{/*form ends*/}

            <DataTable
                title="Session Details"
                columns={columns}
                data={data}
            />



        </div>
    )
}

export default SessionContent
