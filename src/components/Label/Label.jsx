import React, { Fragment } from 'react';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { IoMdClose, IoMdCreate } from 'react-icons/io';

function Label(props) {
    const onDeleteClick = () => {
        swal({
            buttons: false,
            content: (
                <DeleteConfirmationDialogBox
                    deleteEventWithIdHandler={props.deleteMethod}
                    itemName={props.tagName}
                    itemId={props.id}
                />
            ),
        });
    };

    const onEditClick = () => {
        swal({
            buttons: false,
            content: (
                <props.component
                    editEventHandler={props.editMethod}
                    itemName={props.tagName}
                    id={props.id}
                    yearSemesterList={props.yearSemesterList}
                    setYearSemesterList={props.setYearSemesterList}
                    specializationList={props.specializationList}
                    groupNumberList={props.groupNumberList}
                    setGroupNumberList={props.setGroupNumberList}
                    groupIDList={props.groupIDList}
                    setGroupIDList={props.setGroupIDList}
                    groupid={props.groupid}
                    yearSemesterInit={props.yearSemesterInit}
                    specializationInit={props.specializationInit}
                    groupNumberInit={props.groupNumberInit}
                    subGroupNumberList={props.subGroupNumberList}
                    setSubGroupNumberList={props.setSubGroupNumberList}
                    subGroupIDList={props.subGroupIDList}
                    setSubGroupIDList={props.setSubGroupIDList}
                />
            ),
        });
    };

    return (
        <Fragment>
            <div
                className="d-flex bd-highlight mb-3"
                style={{
                    width: props.width,
                    height: 42,
                    borderRadius: 50,
                    border: 'solid 1px gainsboro',
                }}
            >
                <div className="mr-auto p-2 bd-highlight">
                    <h6 style={{ display: 'inline' }}>{props.tagName}</h6>
                </div>
                <div className="p-2 bd-highlight">
                    <button
                        className="sm-ctrl-btn sm-ctrl-btn-upt"
                        onClick={onEditClick}
                    >
                        <IoMdCreate />
                    </button>
                    <button
                        style={{
                            marginLeft: 5,
                        }}
                        className="sm-ctrl-btn sm-ctrl-btn-dlt"
                        onClick={onDeleteClick}
                    >
                        <IoMdClose />
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default Label;
