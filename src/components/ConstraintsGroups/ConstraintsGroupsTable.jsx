import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateConstraintsGroupsDialogBox from './UpdateConstraintsGroupsDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';

const ConstraintsGroupsTable = (props) => {
	const onDeleteClick = (itemId, groupid, day, from, to) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={deleteConstraint}
					itemId={itemId}
					itemName={`${groupid} From: ${from} To: ${to} on ${day}`}
				/>
			),
		});
	};

	const deleteConstraint = (itemId) => {
		axios
			.delete(`http://localhost:8000/api/v1/constraintsgroups/${itemId}`)
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

	const onUpdateClick = (id, groupid, from, to, day) => {
		swal({
			buttons: false,
			content: (
				<UpdateConstraintsGroupsDialogBox
					groups={props.groups}
					refreshComponent={props.refreshComponent}
					constraintsGroupList={props.constraintsGroupList}
					id = {id}
					groupid = {groupid}
					from = {from}
					to = {to}
					day = {day}
				/>
			),
		});
	};

	const columns = [
		{ name: 'ID', selector: '_id', omit: true },
		{ name: 'Group', selector: 'group.groupid', sortable: true },
		{ name: 'Day', selector: 'day', sortable: true },
		{ name: 'From', selector: 'from', sortable: true },
		{ name: 'To', selector: 'to', sortable: true },
		{
			name: 'Action',
			cell: (row) => (
				<div>
					<button
						style={{marginRight:15}}
						className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt'
						onClick={() => {
							onUpdateClick(row._id, row.group.groupid, row.from, row.to, row.day);
						}}
					>
						<IoMdCreate />
					</button>
					<button
						style={{marginRight:15}}
						className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt'
						onClick={() => {
							onDeleteClick(row._id, row.group.groupid, row.from, row.to, row.day);
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
			title="Groups' Not Available Times"
			data={props.constraintsGroupList}
			columns={columns}
			noDataComponent = {<EmptyDataPlaceholder message={'No Data Found'} />}
			dense
			pagination
			highlightOnHover
		/>
	);
};

export default ConstraintsGroupsTable;
