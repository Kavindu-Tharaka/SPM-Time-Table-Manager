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

    const [subGroupNumber, setSubGroupNumber] = useState('');
    const [subGroupNumberList, setSubGroupNumberList] = useState([]);

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
                    setGroupID(response.data.data.groupids[0].groupid);
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
    }, []);

    const onInputChangeGroupID = (e) => {
        setGroupID(e.target.value);
    };
    const onInputChangeSubGroupNumber = (e) => {
        setSubGroupNumber(e.target.value);
    };

    const addSubGroupID = (e) => {
        e.preventDefault();
        console.log(groupID);
        console.log(subGroupNumber);
    };

    return (
        <div>
            <ContentHeader header={'Generate Sub-Group IDs'} />
            <div
                style={{
                    left: '20%',
                    marginTop: '3%',
                    paddingLeft: '25%',
                    paddingRight: '25%',
                }}
                className=""
            >
                <div className="row">
                    <div className="col-5">
                        <Label>{'Group ID'}</Label>
                        <select
                            style={{ borderRadius: 0 }}
                            className="form-control form-control-sm"
                            value={groupID}
                            onChange={onInputChangeGroupID}
                        >
                            {groupIDList.map((item) => (
                                <option key={item._id} value={item.groupid}>
                                    {item.groupid}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-4">
                        <Label>{'Sub-Group Number'}</Label>

                        <select
                            style={{ borderRadius: 0 }}
                            className="form-control form-control-sm"
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
