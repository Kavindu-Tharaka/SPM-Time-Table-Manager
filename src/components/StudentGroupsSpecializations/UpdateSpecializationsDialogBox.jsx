import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

import './updateSpecializationsDialogBox.css';

const UpdateSpecializationsDialogBox = (props) => {
    const [specialization, setSpecialization] = useState(props.itemName);

    const specializationList = props.itemList;
    const setSpecializationList = props.setItemList;

    const [isSpecializationNameValid, setIsSpecializationNameValid] = useState(
        true
    );
    const [specializationErrorMsg, setSpecializationErrorMsg] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const onSpecializationChange = (e) => {
        setSpecialization(e.target.value);
        setSpecializationErrorMsg('');
    };

    const editSpecializationName = (specializationName, id) => {
        if (specializationName === '') {
            setIsSpecializationNameValid(false);
            setSpecializationErrorMsg('Please Enter a Specialization!');
        } else if (!/^[a-zA-Z]+$/.test(specializationName)) {
            setIsSpecializationNameValid(false);
            setSpecializationErrorMsg(
                'Specialization can not include numbers!'
            );
            setSpecialization('');
            return;
        } else {
            if (props.itemName !== specializationName) {
                let isExist = false;
                setIsUpdating(true);

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
                        setIsUpdating(false);
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
                            setIsUpdating(false);
                            swal.close();
                            store.addNotification(
                                buildToast(
                                    'info',
                                    'Updated',
                                    'Specialization Updated Successfully'
                                )
                            );
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
                {isUpdating ? (
                    <div>
                        Updating <FaSpinner className="spin" />
                    </div>
                ) : (
                    'Update'
                )}
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
