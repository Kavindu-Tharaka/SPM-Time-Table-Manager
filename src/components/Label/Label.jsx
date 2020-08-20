import React, { Fragment } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';

function Label(props) {
    const editMethod = props.editMethod;
    const deleteMethod = props.deleteMethod;

    const onDeleteClick = () => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventHandler={deleteMethod}
                    itemName={props.tagName}
                    id={props.id}
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
                    // marginRight: -10,
                    // marginLeft: 10
                    // boxShadow: '5px 5px 5px gainsboro',
                    // padding: 3,
                }}
            >
                <div className="mr-auto p-2 bd-highlight">
                    <h6
                        style={{ display: 'inline' }}
                        // className="card-title mr-auto p-2 bd-highlight"
                    >
                        {props.tagName}
                    </h6>
                </div>
                <div className="p-2 bd-highlight">
                    <MdModeEdit
                        style={{
                            display: 'inline',
                            backgroundColor: 'gainsboro',
                            padding: 3,
                            borderRadius: 50,
                            marginRight: 5,
                        }}
                        size="23px"
                        color="#205374"
                        onClick={() => editMethod(props.tagName, props.id)}
                    />
                    <MdDelete
                        style={{
                            display: 'inline',
                            backgroundColor: 'gainsboro',
                            padding: 3,
                            borderRadius: 50,
                        }}
                        size="23px"
                        color="#205374"
                        onClick={onDeleteClick}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Label
