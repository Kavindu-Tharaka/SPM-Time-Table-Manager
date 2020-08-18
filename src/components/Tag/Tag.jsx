import React, { Fragment } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';

import './tag.css';

function Tag(props) {
    const editMethod = props.editMethod;
    const deleteMethod = props.deleteMethod;

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
                        size="25px"
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
                        size="25px"
                        color="#205374"
                        onClick={() => deleteMethod(props.id)}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default Tag;
