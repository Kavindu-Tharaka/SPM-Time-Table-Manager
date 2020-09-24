import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateConstraintsSessionsDialogBox from './UpdateConstraintsSessionsDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';

const ConstraintsSessionsTable = (props) => {
    const onDeleteClick = (itemId, session, day, from, to) => {
        swal({
            buttons: false,
            content: (
                <DeleteConfirmationDialogBox
                    deleteEventWithIdHandler={deleteConstraint}
                    itemId={itemId}
                    itemName={`${session} From: ${from} To: ${to} on ${day}`}
                />
            ),
        });
    };

    const deleteConstraint = (itemId) => {
        axios
            .delete(
                `http://localhost:8000/api/v1/constraintssessions/${itemId}`
            )
            .then((res) => {
                swal.close();
                props.refreshComponent();
                store.addNotification(
                    buildToast(
                        'danger',
                        'Deleted',
                        'Constraint Deleted Successfully'
                    )
                );
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const onUpdateClick = (id, session, day, from, to) => {
        swal({
            buttons: false,
            content: (
                <UpdateConstraintsSessionsDialogBox
                    sessions={props.sessions}
                    refreshComponent={props.refreshComponent}
                    constraintsSessionList={props.constraintsSessionList}
                    id={id}
                    session={session}
                    from={from}
                    to={to}
                    day={day}
                />
            ),
        });
    };

    const columns = [
        { name: 'ID', selector: '_id', omit: true },
        {
            name: 'Session',
            // selector: 'session.asString',
            selector: 'session.asString',
            sortable: true,
            grow: 7,
        },
        { name: 'Day', selector: 'day', sortable: true },
        { name: 'From', selector: 'from', sortable: true },
        { name: 'To', selector: 'to', sortable: true },
        {
            name: 'Action',
            cell: (row) => (
                <div>
                    <button
                        style={{ marginRight: 15 }}
                        className="sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt"
                        onClick={() => {
                            onUpdateClick(
                                row._id,
                                row.session.asString,
                                row.day,
                                row.from,
                                row.to
                            );
                        }}
                    >
                        <IoMdCreate />
                    </button>
                    <button
                        style={{ marginRight: 15 }}
                        className="sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt"
                        onClick={() => {
                            onDeleteClick(
                                row._id,
                                row.session.asString,
                                row.day,
                                row.from,
                                row.to
                            );
                        }}
                    >
                        <IoMdClose />
                    </button>
                </div>
            ),
            button: true,
        },
    ];

    return (
        <DataTable
            title="Sessions' Not Available Times"
            data={props.constraintsSessionList}
            columns={columns}
            noDataComponent={<EmptyDataPlaceholder message={'No Data Found'} />}
            dense
            pagination
            highlightOnHover
        />
    );
};

export default ConstraintsSessionsTable;
