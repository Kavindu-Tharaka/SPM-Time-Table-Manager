import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import ContentHeader from '../ContentHeader/ContentHeader';
import Label from '../Label/Label';
import UpdateSubGroupNumbersDialogBox from './UpdateSubGroupNumbersDialogBox';
import UpdateGroupNumbersDialogBox from './UpdateGroupNumbersDialogBox';

function StudentGroupsGroupSubGroupNumbers() {
    const [groupNumber, setGroupNumber] = useState('');
    const [groupNumberList, setGroupNumberList] = useState([]);
    const [subGroupNumber, setSubGroupNumber] = useState('');
    const [subGroupNumberList, setSubGroupNumberList] = useState([]);

    const [isGroupNumberValid, setIsGroupNumberValid] = useState(true);
    const [groupNumberErrorMsg, setGroupNumberErrorMsg] = useState('');

    const [isSubGroupNumberValid, setIsSubGroupNumberValid] = useState(true);
    const [subGroupNumberErrorMsg, setSubGroupNumberErrorMsg] = useState('');

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/groupnumbers', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.groupnumbers);
                    setGroupNumberList(response.data.data.groupnumbers);
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

    const handleKeyDownGroupNumber = (e) => {
        if (e.keyCode === 13) {
            addGroupNumber(e);
        }
    };

    const handleKeyDownSubGroupNumber = (e) => {
        if (e.keyCode === 13) {
            addSubGroupNumber(e);
        }
    };

    const addGroupNumber = (e) => {
        e.preventDefault();
        if (groupNumber === '' || groupNumber === '0') {
            setIsGroupNumberValid(false);
            setGroupNumberErrorMsg('Please Enter a Valid Group Number!');
            setGroupNumber('');
            return;
        } else if (!/^[+]?\d+([.]\d+)?$/.test(groupNumber)) {
            setIsGroupNumberValid(false);
            setGroupNumberErrorMsg('Group Number Should be a Positive Number!');
            setGroupNumber('');
            return;
        } else {
            let isExist = false;

            groupNumberList.forEach((element) => {
                if (parseInt(element.groupnumber) === parseInt(groupNumber)) {
                    setIsGroupNumberValid(false);
                    setGroupNumberErrorMsg('The Group Number You Entered is Already Exist!');
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .post('http://localhost:8000/api/v1/groupnumbers', {
                        groupnumber: groupNumber,
                    })
                    .then(function (response) {
                        console.log(response.data.data.groupnumber);
                        setGroupNumberList([
                            ...groupNumberList,
                            response.data.data.groupnumber,
                        ]);
                        setGroupNumber('');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        setGroupNumber('');
    };

    const addSubGroupNumber = (e) => {
        e.preventDefault();
        if (subGroupNumber === '' || subGroupNumber === '0') {
            setIsSubGroupNumberValid(false);
            setSubGroupNumberErrorMsg('Please Enter a Valid Sub Group Number!');
            setGroupNumber('');
        } else if (!/^[+]?\d+([.]\d+)?$/.test(subGroupNumber)) {
            setIsSubGroupNumberValid(false);
            setSubGroupNumberErrorMsg('Sub Group Number Should be a Positive Number!');
            setSubGroupNumber('');
        } else {
            let isExist = false;

            subGroupNumberList.forEach((element) => {
                if (
                    parseInt(element.subgroupnumber) ===
                    parseInt(subGroupNumber)
                ) {
                    setIsSubGroupNumberValid(false);
                    setSubGroupNumberErrorMsg('The Sub Group Number You Entered is Already Exist!');
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .post('http://localhost:8000/api/v1/subgroupnumbers', {
                        subgroupnumber: subGroupNumber,
                    })
                    .then(function (response) {
                        console.log(response.data.data.subgroupnumber);
                        setSubGroupNumberList([
                            ...subGroupNumberList,
                            response.data.data.subgroupnumber,
                        ]);
                        setSubGroupNumber('');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        setSubGroupNumber('');
    };

    const deleteGroupNumber = (groupNumberId) => {
        axios
            .delete(
                `http://localhost:8000/api/v1/groupnumbers/${groupNumberId}`
            )
            .then((res) => {
                swal.close();
                setGroupNumberList(
                    groupNumberList.filter((item) => {
                        return groupNumberId !== item._id;
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteSubGroupNumber = (subGroupNumberId) => {
        axios
            .delete(
                `http://localhost:8000/api/v1/subgroupnumbers/${subGroupNumberId}`
            )
            .then((res) => {
                swal.close();
                setSubGroupNumberList(
                    subGroupNumberList.filter((item) => {
                        return subGroupNumberId !== item._id;
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editGroupNumber = (groupNumber, id) => {
        if (groupNumber === '' || groupNumber === '0') {
            Swal.fire({
                text: 'Please Enter a Valid Group Number!',
                confirmButtonColor: '#205374',
            });
            setGroupNumber('');
        } else if (!/^[+]?\d+([.]\d+)?$/.test(groupNumber)) {
            Swal.fire({
                text: 'Group Number Should be a Positive Number!',
                confirmButtonColor: '#205374',
            });
            setGroupNumber('');
        } else {
            let isExist = false;

            groupNumberList.forEach((element) => {
                if (parseInt(element.groupnumber) === parseInt(groupNumber)) {
                    Swal.fire({
                        text: 'The Group Number You Entered is Already Exist!',
                        confirmButtonColor: '#205374',
                    });
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .patch(`http://localhost:8000/api/v1/groupnumbers/${id}`, {
                        groupnumber: groupNumber,
                    })
                    .then((res) => {
                        setGroupNumberList((prevlist) =>
                            prevlist.map((listItem) =>
                                id === listItem._id
                                    ? {
                                          ...listItem,
                                          groupnumber: groupNumber,
                                      }
                                    : listItem
                            )
                        );
                    })
                    .catch((err) => console.log(err));
            }
        }
        swal.close();
    };

    const editSubGroupNumber = (subGroupNumber, id) => {
        if (subGroupNumber === '' || subGroupNumber === '0') {
            Swal.fire({
                text: 'Please Enter a Valid Sub Group Number!',
                confirmButtonColor: '#205374',
            });
            setGroupNumber('');
        } else if (!/^[+]?\d+([.]\d+)?$/.test(subGroupNumber)) {
            Swal.fire({
                text: 'Group Number Should be a Positive Number!',
                confirmButtonColor: '#205374',
            });
            setSubGroupNumber('');
        } else {
            let isExist = false;

            subGroupNumberList.forEach((element) => {
                if (
                    parseInt(element.subgroupnumber) ===
                    parseInt(subGroupNumber)
                ) {
                    Swal.fire({
                        text:
                            'The Sub Group Number You Entered is Already Exist!',
                        confirmButtonColor: '#205374',
                    });
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .patch(
                        `http://localhost:8000/api/v1/subgroupnumbers/${id}`,
                        {
                            subgroupnumber: subGroupNumber,
                        }
                    )
                    .then((res) => {
                        setSubGroupNumberList((prevlist) =>
                            prevlist.map((listItem) =>
                                id === listItem._id
                                    ? {
                                          ...listItem,
                                          subgroupnumber: subGroupNumber,
                                      }
                                    : listItem
                            )
                        );
                    })
                    .catch((err) => console.log(err));
            }
        }
        swal.close();
    };

    const onInputChangeGroupNumber = (e) => {

        if(e.target.value > 0 || e.target.value === '')
            setGroupNumber(e.target.value);

        setIsGroupNumberValid(true);
        setGroupNumberErrorMsg('');
    };

    const onInputChangeSubGroupNumber = (e) => {

        if(e.target.value > 0 || e.target.value === '')
            setSubGroupNumber(e.target.value);

        setIsSubGroupNumberValid(true);
        setSubGroupNumberErrorMsg('');
    };

    return (
        <div>
            <div>
                <ContentHeader header={'Group Numbers'} />
                <form
                    style={{
                        marginLeft: '35%',
                        marginTop: '3%',
                    }}
                >
                    <div className="form-row">
                        <div className="col-md-5 mb-3">
                            {/* <label>First name</label> */}
                            <input
                                type="number"
                                className={
                                    isGroupNumberValid
                                        ? 'form-control'
                                        : 'form-control is-invalid'
                                }
                                placeholder="Group Number"
                                onChange={onInputChangeGroupNumber}
                                onKeyDown={handleKeyDownGroupNumber}
                                value={groupNumber}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Group number can be a positive number"
                            />
                            <div className="invalid-feedback">{groupNumberErrorMsg}</div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <button
                                className="btn btn-primary"
                                onClick={addGroupNumber}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
                {/* <div
                    style={{
                        width: '40%',
                        textAlign: 'center',
                        left: '50%',
                        padding: '20px',
                        transform: 'translate(-50%, 0)',
                    }}
                    className="input-group mb-3"
                >
                    <input
                        style={{ borderRadius: 0 }}
                        type="text"
                        className="form-control"
                        placeholder="Group Number"
                        onChange={onInputChangeGroupNumber}
                        onKeyDown={handleKeyDownGroupNumber}
                        value={groupNumber}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Group number can be a positive number"
                    />
                    <button
                        style={{ marginLeft: 20, borderRadius: 0 }}
                        type="button"
                        className="btn btn-primary"
                        onClick={addGroupNumber}
                    >
                        Add
                    </button>
                </div> */}

                <div
                    style={{
                        marginTop: '3%',
                        textAlign: 'center',
                        padding: '10px',
                        overflowY: 'auto',
                        height: '172px',
                    }}
                    className="row"
                >
                    {groupNumberList.length === 0 ? (
                        <div className="col">
                            {' '}
                            <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                                {' '}
                                There are no group numbers in the database!{' '}
                            </h1>{' '}
                        </div>
                    ) : (
                        groupNumberList.map((tag) => (
                            <div key={tag._id}>
                                <div className="col">
                                    <Label
                                        id={tag._id}
                                        deleteMethod={deleteGroupNumber}
                                        editMethod={editGroupNumber}
                                        tagName={
                                            tag.groupnumber < 10
                                                ? `${0}${tag.groupnumber}`
                                                : tag.groupnumber
                                        }
                                        component={UpdateGroupNumbersDialogBox}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <br />
            <br />

            <div>
                <ContentHeader header={'Sub-Group Numbers'} />
                <form
                    style={{
                        marginLeft: '35%',
                        marginTop: '3%',
                    }}
                >
                    <div className="form-row">
                        <div className="col-md-5 mb-3">
                            {/* <label>First name</label> */}
                            <input
                                type="number"
                                className={
                                    isSubGroupNumberValid
                                        ? 'form-control'
                                        : 'form-control is-invalid'
                                }
                                placeholder="Group Number"
                                onChange={onInputChangeSubGroupNumber}
                                onKeyDown={handleKeyDownSubGroupNumber}
                                value={subGroupNumber}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Sub Group number can be a positive number"
                            />
                            <div className="invalid-feedback">{subGroupNumberErrorMsg}</div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <button
                                className="btn btn-primary"
                                onClick={addSubGroupNumber}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
                {/* <div
                    style={{
                        width: '40%',
                        textAlign: 'center',
                        left: '50%',
                        padding: '10px',
                        transform: 'translate(-50%, 0)',
                    }}
                    className="input-group mb-3"
                >
                    <input
                        style={{ borderRadius: 0 }}
                        type="text"
                        className="form-control"
                        placeholder="Sub Group Number"
                        onChange={onInputChangeSubGroupNumber}
                        onKeyDown={handleKeyDownSubGroupNumber}
                        value={subGroupNumber}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Sub Group number can be a positive number"
                    />
                    <button
                        style={{ marginLeft: 20, borderRadius: 0 }}
                        type="button"
                        className="btn btn-primary"
                        onClick={addSubGroupNumber}
                    >
                        Add
                    </button>
                </div> */}

                <div
                    style={{
                        textAlign: 'center',
                        overflowY: 'auto',
                        height: '172px',
                    }}
                    className="row"
                >
                    {subGroupNumberList.length === 0 ? (
                        <div className="col">
                            {' '}
                            <h1 style={{ fontSize: 20, marginTop: '5%' }}>
                                {' '}
                                There are no sub group numbers in the database!{' '}
                            </h1>{' '}
                        </div>
                    ) : (
                        subGroupNumberList.map((tag) => (
                            <div key={tag._id}>
                                <div className="col">
                                    <Label
                                        id={tag._id}
                                        deleteMethod={deleteSubGroupNumber}
                                        editMethod={editSubGroupNumber}
                                        tagName={tag.subgroupnumber}
                                        component={
                                            UpdateSubGroupNumbersDialogBox
                                        }
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentGroupsGroupSubGroupNumbers;
