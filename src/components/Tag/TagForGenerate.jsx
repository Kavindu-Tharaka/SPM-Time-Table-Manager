import React, { Fragment } from 'react';
import swal from '@sweetalert/with-react';
import './tag.css';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { IoMdClose, IoMdCreate } from 'react-icons/io';

function TagForGenerate(props) {
    const deleteMethod = props.deleteMethod;

    const onDeleteClick = () => {
        // swal({
        //     buttons: false,
        //     content: (
        //         <DeleteConfirmationDialogBox
        //             deleteEventWithIdHandler={deleteMethod}
        //             itemName={props.tagName}
        //             itemId={props.id}
        //         />
        //     ),
        // });
    };

    const onEditClick = () => {
        // swal({
        //     buttons: false,
        //     content: (
        //         <props.component
        //             itemName={props.tagName}
        //             id={props.id}
        //             itemList={props.itemList}
        //             setItemList={props.setItemList}
        //         />
        //     ),
        // });
    };

    return (
        <Fragment>
            <div
                className="d-flex bd-highlight mb-3"
                style={{
                    width: 210,
                    borderRadius: 50,
                    border: 'solid 1px gainsboro',
                    boxShadow: '5px 5px 5px gainsboro',
                    padding: 10,
                }}
            >
                <div className="mr-auto p-2 bd-highlight">
                    <h6 style={{ display: 'inline' }}>{props.tagName}</h6>
                </div>
                <div className="p-2 bd-highlight">
                    <button
                        className="sm-ctrl-btn sm-ctrl-btn-upt"
                        // onClick={() => editMethod(props.tagName, props.id)}
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

export default TagForGenerate;
