import React, { useState } from 'react';
import { useEffect } from 'react';
import LabelTag from '../../components/Label/Label';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import ContentHeader from '../ContentHeader/ContentHeader';
import { Label } from 'reactstrap';
import StudentGroupsGroupIDsEdit from './StudentGroupsGroupIDsEdit';

function StudentGroupsGroupIDs(props) {
    const [yearSemester, setYearSemester] = useState('');
    const [yearSemesterList, setYearSemesterList] = useState([]);

    const [specialization, setSpecialization] = useState('');
    const [specializationList, setSpecializationList] = useState([]);

    const [groupNumber, setGroupNumber] = useState('');
    const [groupNumberList, setGroupNumberList] = useState([]);

    const [groupIDList, setGroupIDList] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/yearsemesters', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    // console.log(response.data.data.yearsemesters);
                    setYearSemesterList(response.data.data.yearsemesters);
                    setYearSemester(
                        response.data.data.yearsemesters[0].yearsemestername
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/groupnumbers', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    setGroupNumberList(response.data.data.groupnumbers);
                    setGroupNumber(
                        response.data.data.groupnumbers[0].groupnumber
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/specializations', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    setSpecializationList(response.data.data.specializations);
                    setSpecialization(
                        response.data.data.specializations[0].specializationname
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/groupids', {
                    cancelToken: source.token,
                })
                .then(function async(response) {
                    console.log(response.data.data.groupids);
                    setGroupIDList(response.data.data.groupids);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        loadData();

        return () => {
            source.cancel();
        };
    }, []);

    const onInputChangeYearSemester = (e) => {
        setYearSemester(e.target.value);
        console.log(yearSemester);
    };
    const onInputChangeSpecialization = (e) => {
        setSpecialization(e.target.value);
        console.log(specialization);
    };
    const onInputChangeGroupNumber = (e) => {
        setGroupNumber(e.target.value);
        console.log(groupNumber);
    };

    const addGroupID = (e) => {
        e.preventDefault();

        let isExist = false;

        groupIDList.forEach((element) => {
            if (
                `${element.yearsemestername}.${element.specializationname}.${element.groupnumber}` ===
                `${yearSemester}.${specialization}.${groupNumber}`
            ) {
                Swal.fire('The Group ID You Entered is Already Exists!!');
                isExist = true;
            }
        });

        if (!isExist) {
            axios
                .post('http://localhost:8000/api/v1/groupids', {
                    yearsemestername: yearSemester,
                    specializationname: specialization,
                    groupnumber: groupNumber,
                })
                .then(function (response) {
                    console.log(response.data.data.groupid);
                    setGroupIDList([
                        ...groupIDList,
                        response.data.data.groupid,
                    ]);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const deleteGroupID = (id) => {
        axios
            .delete(`http://localhost:8000/api/v1/groupids/${id}`)
            .then(function (response) {
                swal.close();
                setGroupIDList(
                    groupIDList.filter((item) => {
                        return id !== item._id;
                    })
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const editedGroupID = (groupid, id) => {
        swal({
            buttons: false,
            content: (
                <StudentGroupsGroupIDsEdit
                    yearSemesterList={yearSemesterList}
                    specializationList={specializationList}
                    groupNumberList={groupNumberList}
                    groupIDList={groupIDList}
                    setGroupIDList={setGroupIDList}
                    id={id}
                    groupid={groupid}
                    yearSemesterInit={`${groupid.split('.')[0]}.${
                        groupid.split('.')[1]
                    }`}
                    specializationInit={groupid.split('.')[2]}
                    groupNumberInit={groupid.split('.')[3]}
                />
            ),
        });
    };

    return (
        <div>
            <ContentHeader header={'Generate Group IDs'} />
            <div
                style={{
                    left: '20%',
                    marginTop: '3%',
                    paddingLeft: '17%',
                    paddingRight: '25%',
                }}
            >
                <div className="row">
                    <div className="col-4">
                        <Label>{'Year & Semester'}</Label>
                        <select
                            style={{ borderRadius: 0 }}
                            className="custom-select"
                            value={yearSemester}
                            onChange={onInputChangeYearSemester}
                        >
                            {yearSemesterList.map((item) => (
                                <option
                                    key={item._id}
                                    value={item.yearsemestername}
                                >
                                    {item.yearsemestername}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-4">
                        <Label>{'Specialization'}</Label>
                        <select
                            style={{ borderRadius: 0 }}
                            className="custom-select"
                            value={specialization}
                            onChange={onInputChangeSpecialization}
                        >
                            {specializationList.map((item) => (
                                <option
                                    key={item._id}
                                    value={item.specializationname}
                                >
                                    {item.specializationname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-3">
                        <Label>{'Group Number'}</Label>

                        <select
                            style={{ borderRadius: 0 }}
                            className="custom-select"
                            value={groupNumber}
                            onChange={onInputChangeGroupNumber}
                        >
                            {groupNumberList.map((item) => (
                                <option key={item._id} value={item.groupnumber}>
                                    {item.groupnumber}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-1">
                        <Label style={{ color: 'transparent' }}>{'.'}</Label>{' '}
                        <br />
                        <button
                            className="btn btn-primary"
                            style={{ borderRadius: 0 }}
                            onClick={addGroupID}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <ContentHeader label={'1st Year'} />
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    paddingLeft: '7%',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.filter(
                    (item) =>
                        item.yearsemestername === 'Y1.S1' ||
                        item.yearsemestername === 'Y1.S2'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            1st Year Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    groupIDList.map((item) => {
                        if (
                            item.yearsemestername === 'Y1.S1' ||
                            item.yearsemestername === 'Y1.S2'
                        ) {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={200}
                                            id={item._id}
                                            deleteMethod={deleteGroupID}
                                            editMethod={editedGroupID}
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })
                )}
            </div>
            <br />
            <ContentHeader label={'2nd Year'} />
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    paddingLeft: '7%',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.filter(
                    (item) =>
                        item.yearsemestername === 'Y2.S1' ||
                        item.yearsemestername === 'Y2.S2'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            2nd Year Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    groupIDList.map((item) => {
                        if (
                            item.yearsemestername === 'Y2.S1' ||
                            item.yearsemestername === 'Y2.S2'
                        ) {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={200}
                                            id={item._id}
                                            deleteMethod={deleteGroupID}
                                            editMethod={editedGroupID}
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })
                )}
            </div>
            <br />
            <ContentHeader label={'3rd Year'} />
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    paddingLeft: '7%',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.filter(
                    (item) =>
                        item.yearsemestername === 'Y3.S1' ||
                        item.yearsemestername === 'Y3.S2'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            3rd Year Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    groupIDList.map((item) => {
                        if (
                            item.yearsemestername === 'Y3.S1' ||
                            item.yearsemestername === 'Y3.S2'
                        ) {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={200}
                                            id={item._id}
                                            deleteMethod={deleteGroupID}
                                            editMethod={editedGroupID}
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })
                )}
            </div>
            <br />
            <ContentHeader label={'4th Year'} />
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    paddingLeft: '7%',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.filter(
                    (item) =>
                        item.yearsemestername === 'Y4.S1' ||
                        item.yearsemestername === 'Y4.S2'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            4th Year Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    groupIDList.map((item) => {
                        if (
                            item.yearsemestername === 'Y4.S1' ||
                            item.yearsemestername === 'Y4.S2'
                        ) {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={200}
                                            id={item._id}
                                            deleteMethod={deleteGroupID}
                                            editMethod={editedGroupID}
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })
                )}
            </div>
        </div>
    );
}

export default StudentGroupsGroupIDs;
