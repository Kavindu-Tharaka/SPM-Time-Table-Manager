import React, { useState } from 'react';
import { useEffect } from 'react';
import LabelTag from '../../components/Label/Label';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import ContentHeader from '../ContentHeader/ContentHeader';
import { Label } from 'reactstrap';
import UpdateGroupIDsDialogBox from './UpdateGroupIDsDialogBox';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { FaSpinner } from 'react-icons/fa';

function StudentGroupsGroupIDs(props) {
    const [yearSemester, setYearSemester] = useState('');
    const [yearSemesterList, setYearSemesterList] = useState([]);

    const [specialization, setSpecialization] = useState('');
    const [specializationList, setSpecializationList] = useState([]);

    const [groupNumber, setGroupNumber] = useState('');
    const [groupNumberList, setGroupNumberList] = useState([]);

    const [groupIDList, setGroupIDList] = useState([]);

    const [errorMsg, setErrorMsg] = useState('');

    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {

            axios
                .all([
                    axios.get('http://localhost:8000/api/v1/yearsemesters', {
                        cancelToken: source.token,
                    }),
                    axios.get('http://localhost:8000/api/v1/groupnumbers', {
                        cancelToken: source.token,
                    }),
                    axios.get('http://localhost:8000/api/v1/specializations', {
                        cancelToken: source.token,
                    }),
                    axios.get('http://localhost:8000/api/v1/groupids', {
                        cancelToken: source.token,
                    }),
                ])
                .then((response) => {
                    setYearSemesterList(response[0].data.data.yearsemesters);
                    setYearSemester(
                        response[0].data.data.yearsemesters[0].yearsemestername
                    );

                    setGroupNumberList(response[1].data.data.groupnumbers);
                    setGroupNumber(
                        response[1].data.data.groupnumbers[0].groupnumber
                    );

                    setSpecializationList(
                        response[2].data.data.specializations
                    );
                    setSpecialization(
                        response[2].data.data.specializations[0]
                            .specializationname
                    );

                    setGroupIDList(response[3].data.data.groupids);
                    console.log(response[3].data.data.groupids);

                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };

        loadData();

        return () => {
            source.cancel();
        };
    }, []);

    const onInputChangeYearSemester = (e) => {
        setYearSemester(e.target.value);
        setErrorMsg('');
        console.log(yearSemester);
    };
    const onInputChangeSpecialization = (e) => {
        setSpecialization(e.target.value);
        setErrorMsg('');
        console.log(specialization);
    };
    const onInputChangeGroupNumber = (e) => {
        setGroupNumber(e.target.value);
        setErrorMsg('');
        console.log(groupNumber);
    };

    const addGroupID = (e) => {
        e.preventDefault();

        setIsAdding(true);

        let isExist = false;

        groupIDList.forEach((element) => {
            if (
                `${element.yearsemestername}.${element.specializationname}.${element.groupnumber}` ===
                `${yearSemester}.${specialization}.${groupNumber}`
            ) {
                // Swal.fire('The Group ID You Entered is Already Exists!');
                setErrorMsg('The Group ID You Entered is Already Exists!');
                isExist = true;
                setIsAdding(false);
            }
        });

        if (!isExist) {

            const groupid = groupNumber < 10 ? `${yearSemester}.${specialization}.0${groupNumber}` : `${yearSemester}.${specialization}.${groupNumber}`;

            axios
                .post('http://localhost:8000/api/v1/groupids', {
                    yearsemestername: yearSemester,
                    specializationname: specialization,
                    groupnumber: groupNumber,
                    groupid: groupid
                })
                .then(function (response) {
                    console.log(response.data.data.groupid);
                    setGroupIDList([
                        ...groupIDList,
                        response.data.data.groupid,
                    ]);
                    setIsAdding(false);
                    store.addNotification(
                        buildToast(
                            'success',
                            'Success',
                            'Group ID Added Successfully'
                        )
                    );
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
                store.addNotification(
                    buildToast(
                        'danger',
                        'Deleted',
                        'Group ID Deleted Successfully'
                    )
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            <PreLoader loading={loading} hasSideBar={true} />
            <ContentHeader header={'Generate Group IDs'} />
            <div
                style={{
                    left: '20%',
                    marginTop: '3%',
                    paddingLeft: '17%',
                    paddingRight: '25%',
                }}
            >
                <div className="form-row">
                    <div className="col-4">
                        <Label>{'Year & Semester'}</Label>
                        <select
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
                            onClick={addGroupID}
                        >
                            {isAdding ? (
                                <div>
                                    Adding <FaSpinner className="spin" />
                                </div>
                            ) : (
                                'Add'
                            )}
                        </button>
                    </div>
                </div>
                <div style={{ color: 'crimson', fontSize: 14 }}>{errorMsg}</div>
            </div>
            <br />
            <ContentHeader label={'1st Year'} />
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '2%',
                    paddingLeft: '5%',
                    overflowY: 'auto',
                    maxHeight: '160px',
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
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                            component={UpdateGroupIDsDialogBox}
                                            yearSemesterList={yearSemesterList}
                                            specializationList={
                                                specializationList
                                            }
                                            groupNumberList={groupNumberList}
                                            groupIDList={groupIDList}
                                            setGroupIDList={setGroupIDList}
                                        />
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
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
                    paddingLeft: '5%',
                    overflowY: 'auto',
                    maxHeight: '160px',
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
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                            component={UpdateGroupIDsDialogBox}
                                            yearSemesterList={yearSemesterList}
                                            specializationList={
                                                specializationList
                                            }
                                            groupNumberList={groupNumberList}
                                            groupIDList={groupIDList}
                                            setGroupIDList={setGroupIDList}
                                        />
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
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
                    paddingLeft: '5%',
                    overflowY: 'auto',
                    maxHeight: '160px',
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
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                            component={UpdateGroupIDsDialogBox}
                                            yearSemesterList={yearSemesterList}
                                            specializationList={
                                                specializationList
                                            }
                                            groupNumberList={groupNumberList}
                                            groupIDList={groupIDList}
                                            setGroupIDList={setGroupIDList}
                                        />
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
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
                    paddingLeft: '5%',
                    overflowY: 'auto',
                    maxHeight: '160px',
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
                                            tagName={
                                                item.groupnumber < 10
                                                    ? `${item.yearsemestername}.${item.specializationname}.0${item.groupnumber}`
                                                    : `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                                            }
                                            component={UpdateGroupIDsDialogBox}
                                            yearSemesterList={yearSemesterList}
                                            specializationList={
                                                specializationList
                                            }
                                            groupNumberList={groupNumberList}
                                            groupIDList={groupIDList}
                                            setGroupIDList={setGroupIDList}
                                        />
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })
                )}
            </div>
        </div>
    );
}

export default StudentGroupsGroupIDs;
