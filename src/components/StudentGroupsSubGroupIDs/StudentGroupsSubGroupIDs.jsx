import React, { useState } from 'react';
import { useEffect } from 'react';
import LabelTag from '../../components/Label/Label';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { Label } from 'reactstrap';
import StudentGroupsSubGroupIDsEdit from './StudentGroupsSubGroupIDsEdit';

function StudentGroupsSubGroupIDs(props) {
    let groupIdTemp;
    const [groupID, setGroupID] = useState('');
    const [groupIDList, setGroupIDList] = useState([]);

    const [subGroupIDList, setSubGroupIDList] = useState([]);

    const [subGroupNumber, setSubGroupNumber] = useState('');
    const [subGroupNumberList, setSubGroupNumberList] = useState([]);

    const [year, setYear] = useState('1');
    const [semester, setSemester] = useState('1');

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/groupids', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.groupids);
                    setGroupIDList(response.data.data.groupids);

                    groupIdTemp = response.data.data.groupids.find(
                        (item) =>
                            year === item.yearsemestername.substring(1, 2) &&
                            semester === item.yearsemestername.substring(4, 5)
                    );

                    setGroupID(
                        `${groupIdTemp.yearsemestername}.${groupIdTemp.specializationname}.${groupIdTemp.groupnumber}`
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/subgroupids', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.subgroupids);
                    setSubGroupIDList(response.data.data.subgroupids);
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/subgroupnumbers', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.subgroupnumbers);
                    setSubGroupNumberList(response.data.data.subgroupnumbers);
                    setSubGroupNumber(
                        response.data.data.subgroupnumbers[0].subgroupnumber
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        loadData();

        return () => {
            source.cancel();
        };
    }, [year, semester]);

    const onInputChangeYear = (e) => {
        setYear(e.target.value);
    };
    const onInputChangeSemester = (e) => {
        setSemester(e.target.value);
    };
    const onInputChangeGroupID = (e) => {
        setGroupID(e.target.value);
    };
    const onInputChangeSubGroupNumber = (e) => {
        setSubGroupNumber(e.target.value);
    };

    const addSubGroupID = (e) => {
        e.preventDefault();

        let isExist = false;

        subGroupIDList.forEach((element) => {
            if (
                `${element.groupid}.${element.subgroupnumber}` ===
                `${groupID}.${subGroupNumber}`
            ) {
                Swal.fire('The Sub Group ID You Entered is Already Exists!!');
                isExist = true;
            }
        });

        if (!isExist) {
            axios
                .post('http://localhost:8000/api/v1/subgroupids', {
                    groupid: groupID,
                    subgroupnumber: subGroupNumber,
                })
                .then(function (response) {
                    console.log(response.data.data.subgroupid);
                    setSubGroupIDList([
                        ...subGroupIDList,
                        response.data.data.subgroupid,
                    ]);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const deleteSubGroupID = (tagId) => {
        axios
            .delete(`http://localhost:8000/api/v1/subgroupids/${tagId}`)
            .then(function (response) {
                swal.close();
                setSubGroupIDList(
                    subGroupIDList.filter((item) => {
                        return tagId !== item._id;
                    })
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const editSubGroupID = (subgroupid, id) => {
        swal({
            buttons: false,
            content: (
                <StudentGroupsSubGroupIDsEdit
                    year={subgroupid.split('.')[0].substring(1, 2)}
                    semester={subgroupid.split('.')[1].substring(1, 2)}
                    groupIDList={groupIDList}
                    subGroupNumberList={subGroupNumberList}
                    subGroupIDList={subGroupIDList}
                    setSubGroupIDList={setSubGroupIDList}
                    id={id}
                    subGroupIDList={subGroupIDList}
                    subgroupid={subgroupid}
                    groupIDInit={`${subgroupid.split('.')[0]}.${
                        subgroupid.split('.')[1]
                    }.${subgroupid.split('.')[2]}.${subgroupid.split('.')[3]}`}
                    subGroupNumberInit={subgroupid.split('.')[4]}
                />
            ),
        });
    };

    return (
        <div>
            <ContentHeader header={'Generate Sub-Group IDs'} />
            <div
                style={{
                    left: '20%',
                    marginTop: '3%',
                    paddingLeft: '14%',
                    paddingRight: '20%',
                }}
                className=""
            >
                <div className="row">
                    <div className="col-2">
                        <Label>{'Year'}</Label>
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
                    <div className="col-2">
                        <Label>{'Semester'}</Label>
                        <select
                            className="custom-select"
                            value={semester}
                            onChange={onInputChangeSemester}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <Label>{'Group ID'}</Label>
                        <select
                            style={{ borderRadius: 0 }}
                            className="custom-select"
                            value={groupID}
                            onChange={onInputChangeGroupID}
                        >
                            {groupIDList.map((item) =>
                                year ===
                                    item.yearsemestername.substring(1, 2) &&
                                semester ===
                                    item.yearsemestername.substring(4, 5) ? (
                                    <option
                                        key={item._id}
                                        value={`${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`}
                                    >
                                        {item.groupnumber >= 10
                                            ? `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            : `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`}
                                    </option>
                                ) : null
                            )}
                        </select>
                    </div>
                    <div className="col-4">
                        <Label>{'Sub-Group Number'}</Label>

                        <select
                            style={{ borderRadius: 0 }}
                            className="custom-select"
                            value={subGroupNumber}
                            onChange={onInputChangeSubGroupNumber}
                        >
                            {subGroupNumberList.map((item) => (
                                <option
                                    key={item._id}
                                    value={item.subgroupnumber}
                                >
                                    {item.subgroupnumber}
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
                            onClick={addSubGroupID}
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
                {subGroupIDList.filter(
                    (item) => item.groupid.substring(1, 2) === '1'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            1st Year Sub Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    subGroupIDList.map((item) => {
                        if (item.groupid.substring(1, 2) === '1') {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={205}
                                            id={item._id}
                                            deleteMethod={deleteSubGroupID}
                                            editMethod={editSubGroupID}
                                            tagName={
                                                item.groupid.split('.')[3] >= 10
                                                    ? `${item.groupid}.${item.subgroupnumber}`
                                                    : `${
                                                          item.groupid.split(
                                                              '.'
                                                          )[0]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[1]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[2]
                                                      }.0${
                                                          item.groupid.split(
                                                              '.'
                                                          )[3]
                                                      }.${item.subgroupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                        else{return null}
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
                {subGroupIDList.filter(
                    (item) => item.groupid.substring(1, 2) === '2'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            2nd Year Sub Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    subGroupIDList.map((item) => {
                        if (item.groupid.substring(1, 2) === '2') {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={205}
                                            id={item._id}
                                            deleteMethod={deleteSubGroupID}
                                            editMethod={editSubGroupID}
                                            tagName={
                                                item.groupid.split('.')[3] >= 10
                                                    ? `${item.groupid}.${item.subgroupnumber}`
                                                    : `${
                                                          item.groupid.split(
                                                              '.'
                                                          )[0]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[1]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[2]
                                                      }.0${
                                                          item.groupid.split(
                                                              '.'
                                                          )[3]
                                                      }.${item.subgroupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                        else{return null}
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
                {subGroupIDList.filter(
                    (item) => item.groupid.substring(1, 2) === '3'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            3rd Year Sub Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    subGroupIDList.map((item) => {
                        if (item.groupid.substring(1, 2) === '3') {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={205}
                                            id={item._id}
                                            deleteMethod={deleteSubGroupID}
                                            editMethod={editSubGroupID}
                                            tagName={
                                                item.groupid.split('.')[3] >= 10
                                                    ? `${item.groupid}.${item.subgroupnumber}`
                                                    : `${
                                                          item.groupid.split(
                                                              '.'
                                                          )[0]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[1]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[2]
                                                      }.0${
                                                          item.groupid.split(
                                                              '.'
                                                          )[3]
                                                      }.${item.subgroupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                        else{return null}
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
                {subGroupIDList.filter(
                    (item) => item.groupid.substring(1, 2) === '4'
                ).length === 0 ? (
                    <div style={{ paddingLeft: '30%' }}>
                        {' '}
                        <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                            {' '}
                            4th Year Sub Group ID List is Currently Empty!{' '}
                        </h1>{' '}
                    </div>
                ) : (
                    subGroupIDList.map((item) => {
                        if (item.groupid.substring(1, 2) === '4') {
                            return (
                                <div key={item._id}>
                                    <div className="col">
                                        <LabelTag
                                            width={205}
                                            id={item._id}
                                            deleteMethod={deleteSubGroupID}
                                            editMethod={editSubGroupID}
                                            tagName={
                                                item.groupid.split('.')[3] >= 10
                                                    ? `${item.groupid}.${item.subgroupnumber}`
                                                    : `${
                                                          item.groupid.split(
                                                              '.'
                                                          )[0]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[1]
                                                      }.${
                                                          item.groupid.split(
                                                              '.'
                                                          )[2]
                                                      }.0${
                                                          item.groupid.split(
                                                              '.'
                                                          )[3]
                                                      }.${item.subgroupnumber}`
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        }
                        else{return null}
                    })
                )}
            </div>
        </div>
    );
}

export default StudentGroupsSubGroupIDs;
