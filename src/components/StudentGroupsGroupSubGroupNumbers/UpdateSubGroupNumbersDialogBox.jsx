import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

import './updateSubGroupNumbersDialogBox.css';

const UpdateSubGroupNumbersDialogBox = (props) => {
    const [subGroupNumber, setSubGroupNumber] = useState(props.itemName);

    const subGroupNumberList = props.subGroupNumberList;
    const setSubGroupNumberList = props.setSubGroupNumberList;

    const [isSubGroupNumberValid, setIsSubGroupNumberValid] = useState(true);
    const [subGroupNumberErrorMsg, setSubGroupNumberErrorMsg] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubGroupNumberChange = (e) => {
        if (e.target.value > 0 || e.target.value === '')
            setSubGroupNumber(e.target.value);
        setIsSubGroupNumberValid(true);
        setSubGroupNumberErrorMsg('');
    };

    const editSubGroupNumber = (subGroupNumber, id) => {
        if (subGroupNumber === '' || subGroupNumber === '0') {
            setIsSubGroupNumberValid(false);
            setSubGroupNumberErrorMsg('Please Enter a Valid Sub Group Number!');
            setSubGroupNumber('');
        } else if (!/^[+]?\d+([.]\d+)?$/.test(subGroupNumber)) {
            setIsSubGroupNumberValid(false);
            setSubGroupNumberErrorMsg(
                'Group Number Should be a Positive Number!'
            );
            setSubGroupNumber('');
        } else {
            if (subGroupNumber !== props.itemName) {
                let isExist = false;
                setIsUpdating(true);

                subGroupNumberList.forEach((element) => {
                    if (
                        parseInt(element.subgroupnumber) ===
                        parseInt(subGroupNumber)
                    ) {
                        setIsSubGroupNumberValid(false);
                        setSubGroupNumberErrorMsg(
                            'The Sub Group Number You Entered is Already Exist!'
                        );
                        setSubGroupNumber('');
                        setIsUpdating(false);
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
                            setIsUpdating(false);
                            swal.close();
                            store.addNotification(
                                buildToast(
                                    'info',
                                    'Updated',
                                    'Sub-Group number Updated Successfully'
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
            <h5 className="text-left m-0">Update Sub-Group Number</h5>
            <hr />

            <div className="form-row">
                <div className="form-group col-12">
                    <input
                        type="number"
                        className={
                            isSubGroupNumberValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        placeholder="Sub Group Number"
                        onChange={onSubGroupNumberChange}
                        value={subGroupNumber}
                    />
                    <div
                        style={{ textAlign: 'left' }}
                        className="invalid-feedback"
                    >
                        {subGroupNumberErrorMsg}
                    </div>
                </div>
            </div>
            <hr />

            <button
                className="btn btn-info float-right mb-4"
                onClick={() => editSubGroupNumber(subGroupNumber, props.id)}
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

export default UpdateSubGroupNumbersDialogBox;
