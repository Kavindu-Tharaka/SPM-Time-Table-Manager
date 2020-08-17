import React, { useState, Fragment } from 'react';
import { useEffect } from 'react';
import LabelTag from '../../components/Label/Label';
import axios from 'axios';
import Swal from 'sweetalert2';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { Label } from 'reactstrap';

function StudentGroupsGroupIDs(props) {
    const [yearSemester, setYearSemester] = useState('');
    const [yearSemesterList, setYearSemesterList] = useState([]);

    const [specialization, setSpecialization] = useState('');
    const [specializationList, setSpecializationList] = useState([]);

    const [groupNumber, setGroupNumber] = useState('');
    const [groupNumberList, setGroupNumberList] = useState([]);

    const [groupID, setGroupID] = useState('');
    const [groupIDList, setGroupIDList] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        // props.setShowSubMenu(false);

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/yearsemesters', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.yearsemesters);
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
                    console.log(response.data.data.groupnumbers);
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
                    console.log(response.data.data.specializations);
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
                .then(function (response) {
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

    const deleteTagName = (tagId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#205374',
            // cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.value) {
                axios
                    .delete(`http://localhost:8000/api/v1/groupids/${tagId}`)
                    .then(function (response) {
                        setGroupIDList(
                            groupIDList.filter((item) => {
                                return tagId !== item._id;
                            })
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    };

    const editTagName = (groupNumber, id) => {
        // const { value: formValues } =  Swal.fire({
        //     title: 'Edit Group ID',
        //     html:
        //     '<div class="row">' +
        //         '<div class="col-12">' +
        //              '<input id="swal-input1" type="text" class="form-control">' +
        //         '</div>' +
        //     '</div>' +
        //     '<br/>' +
        //     '<div class="row">' +
        //         '<div class="col-12">' +
        //             '<input id="swal-input2" type="text" class="form-control">' +
        //         '</div>' +
        //     '</div>',
        //     focusConfirm: true,
        //     confirmButtonText: 'Edit',
        //     confirmButtonColor: '#205374',
        //     preConfirm: () => {
        //       return [
        //         document.getElementById('swal-input1').value,
        //         document.getElementById('swal-input2').value
        //       ]
        //     }
        //   })
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
                            className="form-control form-control-sm"
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
                            className="form-control form-control-sm"
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
                            className="form-control form-control-sm"
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
                    // position: 'fixed',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    // marginLeft: '10%',
                    paddingLeft: '7%',
                    // transform: 'translate(-50%, 0)',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            There are no 1st Year Group IDs in the database!{' '}
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
                                            width={190}
                                            id={item._id}
                                            deleteMethod={deleteTagName}
                                            editMethod={editTagName}
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
                    // position: 'fixed',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    // marginLeft: '10%',
                    paddingLeft: '7%',

                    // transform: 'translate(-50%, 0)',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            There are no 2nd Year Group IDs in the database!{' '}
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
                                            width={190}
                                            id={item._id}
                                            deleteMethod={deleteTagName}
                                            editMethod={editTagName}
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
                    // position: 'fixed',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    // marginLeft: '10%',
                    paddingLeft: '7%',

                    // transform: 'translate(-50%, 0)',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            There are no 3rd Year Group IDs in the database!{' '}
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
                                            width={190}
                                            id={item._id}
                                            deleteMethod={deleteTagName}
                                            editMethod={editTagName}
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
                    // position: 'fixed',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    // marginLeft: '10%',
                    paddingLeft: '7%',

                    // transform: 'translate(-50%, 0)',
                    overflowY: 'auto',
                    maxHeight: '100px',
                    marginBottom: '3%',
                }}
                className="row"
            >
                {groupIDList.length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            There are no 4th Year Group IDs in the database!{' '}
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
                                            width={190}
                                            id={item._id}
                                            deleteMethod={deleteTagName}
                                            editMethod={editTagName}
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
