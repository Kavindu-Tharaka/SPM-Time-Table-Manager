import React, { useState } from 'react';
import { useEffect } from 'react';
import Tag from '../../components/Tag/Tag';
import axios from 'axios';
import Swal from 'sweetalert2';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { Label } from 'reactstrap';

function StudentGroupsSubGroupIDs(props) {
    const [groupID, setGroupID] = useState('');
    const [groupIDList, setGroupIDList] = useState([]);

    const [subGroupID, setSubGroupID] = useState('');
    const [subGroupIDList, setSubGroupIDList] = useState([]);

    const [subGroupNumber, setSubGroupNumber] = useState('');
    const [subGroupNumberList, setSubGroupNumberList] = useState([]);

    const [year, setYear] = useState('1');
    const [semester, setSemester] = useState('1');

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        // props.setShowSubMenu(false);

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/groupids', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.groupids);
                    setGroupIDList(response.data.data.groupids);
                    // setGroupID(response.data.data.groupids[0].groupid);
                    // setGroupID(
                    //     response.data.data.groupids.map((item) => (
                    //         year === (item.yearsemestername).substring(1, 2) && semester ===  (item.yearsemestername).substring(4, 5)?
                    //             `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                    //         : null
                    //     ))
                    // );
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
                    
                    // setGroupID(response.data.data.groupids[0].groupid);
                    // setGroupID(
                    //     response.data.data.groupids.map((item) => (
                    //         year === (item.yearsemestername).substring(1, 2) && semester ===  (item.yearsemestername).substring(4, 5)?
                    //             `${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`
                    //         : null
                    //     ))
                    // );
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/subgroupnumbers', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    // console.log(response.data.data.subgroupnumbers);
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
    }, []);

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
                    subgroupnumber: subGroupNumber
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
                        <select className="custom-select" value={year} onChange={onInputChangeYear}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="col-2">
                    <Label>{'Semester'}</Label>
                        <select className="custom-select" value={semester} onChange={onInputChangeSemester}>
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
                            {
                            groupIDList.map((item) => (
                                year === (item.yearsemestername).substring(1, 2) && semester ===  (item.yearsemestername).substring(4, 5)?
                                <option key={item._id} value={`${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`}>
                                    {`${item.yearsemestername}.${item.specializationname}.${item.groupnumber}`}
                                </option>
                                : null
                            ))
                            }
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
            <div></div>
            <br />
            <ContentHeader label={'2nd Year'} />
            <div></div>
            <br />
            <ContentHeader label={'3rd Year'} />
            <div></div>
            <br />
            <ContentHeader label={'4th Year'} />
            <div></div>
        </div>
    );
}

export default StudentGroupsSubGroupIDs;
