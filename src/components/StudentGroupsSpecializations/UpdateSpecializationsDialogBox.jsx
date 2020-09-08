import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';

import './updateSpecializationsDialogBox.css';

const UpdateSpecializationsDialogBox = (props) => {
    const [specialization, setSpecialization] = useState(props.itemName);

    const specializationList = props.itemList;
    const setSpecializationList = props.setItemList;

    const [isSpecializationNameValid, setIsSpecializationNameValid] = useState(
        true
    );
    const [specializationErrorMsg, setSpecializationErrorMsg] = useState('');

    const onSpecializationChange = (e) => {
        setSpecialization(e.target.value);
    };

    const editSpecializationName = (specializationName, id) => {
        if (specializationName === '') {
            setIsSpecializationNameValid(false);
            setSpecializationErrorMsg('Please Enter a Specialization!');
        } else {
            if (props.itemName !== specializationName) {
                let isExist = false;

                specializationList.forEach((element) => {
                    if (
                        element.specializationname ===
                        specializationName.toUpperCase()
                    ) {
                        setIsSpecializationNameValid(false);
                        setSpecializationErrorMsg(
                            'The Specialization You Entered is Already Exist!'
                        );
                        setSpecialization('');
                        isExist = true;
                    }
                });

                if (!isExist) {
                    axios
                        .patch(
                            `http://localhost:8000/api/v1/specializations/${id}`,
                            {
                                specializationname: specializationName.toUpperCase(),
                            }
                        )
                        .then((res) => {
                            setSpecializationList((prevlist) =>
                                prevlist.map((listItem) =>
                                    id === listItem._id
                                        ? {
                                              ...listItem,
                                              specializationname: specializationName.toUpperCase(),
                                          }
                                        : listItem
                                )
                            );
                            swal.close();
                        })
                        .catch((err) => console.log(err));
                }
            } else {
                swal.close();
            }
        }
    };

    return (
        <div className="dcdb-dialog-container">
            <h5 className="text-left m-0">Update Specialization</h5>
            <hr />

            <div className="form-row">
                <div className="form-group col-12">
                    <input
                        type="text"
                        className={
                            isSpecializationNameValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        placeholder="Specialization"
                        onChange={onSpecializationChange}
                        value={specialization}
                    />
                    <div
                        style={{ textAlign: 'left' }}
                        className="invalid-feedback"
                    >
                        {specializationErrorMsg}
                    </div>
                </div>
            </div>

            <button
                className="btn btn-info float-right mb-4"
                onClick={() => editSpecializationName(specialization, props.id)}
            >
                Update
            </button>
            <button
                className="btn btn-secondary float-right mb-4 mr-2"
                onClick={() => {
                    swal.close();
                }}
            >
                Cancel
            </button>
        </div>
    );
};

export default UpdateSpecializationsDialogBox;
