import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Tag from '../Tag/Tag';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import swal from '@sweetalert/with-react';


function StudentGroupsSpecializations(props) {
    const [specializationName, setSpecializationName] = useState('');
    const [specializationList, setSpecializationList] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/specializations', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.specializations);
                    setSpecializationList(response.data.data.specializations);
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

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            addSpecializationName(e);
        }
    };

    const addSpecializationName = (e) => {
        e.preventDefault();
        if (specializationName === '') {
            Swal.fire('Please Enter a Specialization Name!');
        } else {
            let isExist = false;

            specializationList.forEach((element) => {
                if (
                    element.specializationname ===
                    specializationName.toUpperCase()
                ) {
                    Swal.fire(
                        'The Group Number You Entered is Already Exist!!'
                    );
                    setSpecializationName('');
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .post('http://localhost:8000/api/v1/specializations', {
                        specializationname: specializationName.toUpperCase(),
                    })
                    .then(function (response) {
                        console.log(response.data.data.specialization);
                        setSpecializationList([
                            ...specializationList,
                            response.data.data.specialization,
                        ]);
                        setSpecializationName('');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };

    const deleteSpecializationName = (specializationId) => {
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
                        `http://localhost:8000/api/v1/specializations/${specializationId}`
                    )
                    .then((res) => {
                        swal.close();
                        setSpecializationList(
                            specializationList.filter((item) => {
                                return specializationId !== item._id;
                            })
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
        //     }
        // });
    };

    const editSpecializationName = (specializationName, id) => {
        Swal.mixin({
            input: 'text',
            inputValue: specializationName,
            confirmButtonText: 'Edit',
            confirmButtonColor: '#205374',
            showCancelButton: true,
        })
            .queue([
                {
                    title: 'Edit Specialization Name',
                },
            ])
            .then((result) => {
                if (result.value) {
                    const editedSpecializationName = result.value[0];
                    if (specializationName !== editedSpecializationName) {
                        let isExist = false;

                        specializationList.forEach((element) => {
                            if (
                                element.specializationname ===
                                editedSpecializationName.trim().toUpperCase()
                            ) {
                                Swal.fire(
                                    'The Specialization Name You Entered is Already Exist!!'
                                );
                                isExist = true;
                            }
                        });

                        if (!isExist) {
                            axios
                                .patch(
                                    `http://localhost:8000/api/v1/specializations/${id}`,
                                    {
                                        specializationname: editedSpecializationName.toUpperCase(),
                                    }
                                )
                                .then((res) => {
                                    setSpecializationList((prevlist) =>
                                        prevlist.map((listItem) =>
                                            id === listItem._id
                                                ? {
                                                      ...listItem,
                                                      specializationname: editedSpecializationName,
                                                  }
                                                : listItem
                                        )
                                    );
                                })
                                .catch((err) => console.log(err));
                        }
                    }
                }
            });
    };

    const onInputChange = (e) => {
        setSpecializationName(e.target.value);
    };

    return (
        <div className="container">
            <ContentHeader header={'Specializations'} />
            <div
                style={{
                    position: 'fixed',
                    width: '30%',
                    textAlign: 'center',
                    left: '60%',
                    padding: '20px',
                    transform: 'translate(-50%, 0)',
                }}
                className="input-group mb-3"
            >
                <input
                    style={{ borderRadius: 0 }}
                    type="text"
                    className="form-control"
                    placeholder="Specialization Name"
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    value={specializationName}
                    data-toggle="tooltip"
                    data-placement="top" 
                    title="Tag can be an acronym of a specialization."
                />
                <button
                    style={{ marginLeft: 20, borderRadius: 0 }}
                    type="button"
                    className="btn btn-primary"
                    onClick={addSpecializationName}
                >
                    Add
                </button>
            </div>

            <div
                style={{
                        // position: 'fixed',
                        // width: '95%',
                        textAlign: 'center',
                        marginTop: '10%',
                        // left: '50%',
                        padding: '10px',
                        // transform: 'translate(-50%, 0)',
                        overflowY: 'auto',
                        // height: '450px',
                }}
                className="row"
            >
                {specializationList.length === 0 ? (
                    <div
                        style={{
                            width: '100%',
                        }}
                    >
                        <EmptyDataPlaceholder message="Specialization List is Currently Empty" />
                    </div>
                ) : (
                    specializationList.map((tag) => (
                        <div key={tag._id}>
                            <div className="col">
                                <Tag
                                    id={tag._id}
                                    deleteMethod={deleteSpecializationName}
                                    editMethod={editSpecializationName}
                                    tagName={tag.specializationname}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default StudentGroupsSpecializations;
