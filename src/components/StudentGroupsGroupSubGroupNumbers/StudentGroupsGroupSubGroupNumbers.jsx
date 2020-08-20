import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import ContentHeader from '../ContentHeader/ContentHeader';
import Label from '../Label/Label';

function StudentGroupsGroupSubGroupNumbers() {
    const [groupNumber, setGroupNumber] = useState('');
    const [groupNumberList, setGroupNumberList] = useState([]);
    const [subGroupNumber, setSubGroupNumber] = useState('');
    const [subGroupNumberList, setSubGroupNumberList] = useState([]);

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
            Swal.fire('Please Enter a Valid Group Number!');
            setGroupNumber('');
        } else if (!/^[+]?\d+([.]\d+)?$/.test(groupNumber)) {
            Swal.fire('Group Number Should be a Positive Number!');
            setGroupNumber('');
        } else {
            let isExist = false;

            groupNumberList.forEach((element) => {
                if (parseInt(element.groupnumber) === parseInt(groupNumber)) {
                    Swal.fire(
                        'The Group Number You Entered is Already Exist!!'
                    );
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
            Swal.fire('Please Enter a Valid Sub Group Number!');
            setGroupNumber('');
        } else if (!/^[+]?\d+([.]\d+)?$/.test(subGroupNumber)) {
            Swal.fire('Group Number Should be a Positive Number!');
            setSubGroupNumber('');
        } else {
            let isExist = false;

            subGroupNumberList.forEach((element) => {
                if (
                    parseInt(element.subgroupnumber) ===
                    parseInt(subGroupNumber)
                ) {
                    Swal.fire(
                        'The Sub Group Number You Entered is Already Exist!!'
                    );
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
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     // icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#205374',
        //     // cancelButtonColor: '#3085d6',
        //     confirmButtonText: 'Delete',
        // }).then((result) => {
        //     if (result.value) {
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
        //     }
        // });
    };

    const deleteSubGroupNumber = (subGroupNumberId) => {
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     // icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#205374',
        //     // cancelButtonColor: '#3085d6',
        //     confirmButtonText: 'Delete',
        // }).then((result) => {
        //     if (result.value) {
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
        //     }
        // });
    };

    const editGroupNumber = (groupNumber, id) => {
        Swal.mixin({
            input: 'text',
            inputValue:
                groupNumber < 10 ? groupNumber.substring(1, 2) : groupNumber,
            confirmButtonText: 'Edit',
            confirmButtonColor: '#205374',
            showCancelButton: true,
        })
            .queue([
                {
                    title: 'Edit Group Number',
                },
            ])
            .then((result) => {
                if (result.value) {
                    const editedGroupNumber = result.value[0];
                    if (!/^[+]?\d+([.]\d+)?$/g.test(editedGroupNumber.trim())) {
                        Swal.fire('Group Number Should be a Positive Number!');
                    } else {
                        if (groupNumber.toString() !== editedGroupNumber.toString()) {
                        if (groupNumber < 10 && (groupNumber.toString().substring(1, 2) !== editedGroupNumber.toString())) {
                            let isExist = false;
                            groupNumberList.forEach((element) => {
                                if (
                                    parseInt(element.groupnumber) ===
                                    parseInt(editedGroupNumber.trim())
                                ) {
                                    Swal.fire(
                                        'The Group Number You Entered is Already Exist!!'
                                    );
                                    isExist = true;
                                }
                            });

                            if (!isExist) {
                                axios
                                    .patch(
                                        `http://localhost:8000/api/v1/groupnumbers/${id}`,
                                        {
                                            groupnumber: editedGroupNumber,
                                        }
                                    )
                                    .then((res) => {
                                        setGroupNumberList((prevlist) =>
                                            prevlist.map((listItem) =>
                                                id === listItem._id
                                                    ? {
                                                          ...listItem,
                                                          groupnumber: editedGroupNumber,
                                                      }
                                                    : listItem
                                            )
                                        );
                                    })
                                    .catch((err) => console.log(err));
                            }
                        }
                    }
                    }
                }
            });
    };

    const editSubGroupNumber = (subGroupNumber, id) => {
        Swal.mixin({
            input: 'text',
            inputValue: subGroupNumber,
            confirmButtonText: 'Edit',
            confirmButtonColor: '#205374',
            showCancelButton: true,
        })
            .queue([
                {
                    title: 'Edit Sub-Group Number',
                },
            ])
            .then((result) => {
                if (result.value) {
                    const editedSubGroupNumber = result.value[0];
                    if (
                        !/^[+]?\d+([.]\d+)?$/g.test(editedSubGroupNumber.trim())
                    ) {
                        Swal.fire(
                            'Sub Group Number Should be a Positive Number!'
                        );
                    } else {
                        if (subGroupNumber.toString() !== editedSubGroupNumber.toString()) {
                        let isExist = false;

                        subGroupNumberList.forEach((element) => {
                            if (
                                parseInt(element.subgroupnumber) ===
                                parseInt(editedSubGroupNumber.trim())
                            ) {
                                Swal.fire(
                                    'The Sub Group Number You Entered is Already Exist!!'
                                );
                                isExist = true;
                            }
                        });

                        if (!isExist) {
                                axios
                                    .patch(
                                        `http://localhost:8000/api/v1/subgroupnumbers/${id}`,
                                        {
                                            subgroupnumber: editedSubGroupNumber,
                                        }
                                    )
                                    .then((res) => {
                                        setSubGroupNumberList((prevlist) =>
                                            prevlist.map((listItem) =>
                                                id === listItem._id
                                                    ? {
                                                          ...listItem,
                                                          subgroupnumber: editedSubGroupNumber,
                                                      }
                                                    : listItem
                                            )
                                        );
                                    })
                                    .catch((err) => console.log(err));
                            
                        }
                    }
                }
                }
            });
    };

    const onInputChangeGroupNumber = (e) => {
        setGroupNumber(e.target.value);
    };

    const onInputChangeSubGroupNumber = (e) => {
        setSubGroupNumber(e.target.value);
    };

    return (
        <div>
            <div>
                <ContentHeader header={'Group Numbers'} />
                <div
                    style={{
                        // position: 'fixed',
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
                </div>

                <div
                    style={{
                        // position: 'fixed',
                        // width: '95%',
                        textAlign: 'center',
                        // top: '15%',
                        // left: '50%',
                        padding: '10px',
                        // transform: 'translate(-50%, 0)',
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
                <div
                    style={{
                        // position: 'fixed',
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
                </div>

                <div
                    style={{
                        // position: 'fixed',
                        // width: '95%',
                        textAlign: 'center',
                        // top: '25%',
                        // left: '50%',
                        // padding: '20px',
                        // transform: 'translate(-50%, 0)',
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
