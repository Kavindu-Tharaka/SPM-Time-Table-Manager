import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateConstraintsSubGroupsDialogBox from './UpdateConstraintsSubGroupsDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';

function ConstraintsSubGroupsTable(props) {
	const onDeleteClick = (itemId, subgroupid, day, from, to) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={deleteConstraint}
					itemId={itemId}
					itemName={`${subgroupid} From: ${from} To: ${to} on ${day}`}
				/>
			),
		});
	};

	const deleteConstraint = (itemId) => {
		axios
			.delete(
				`https://time-table-manager.herokuapp.com/api/v1/constraintssubgroups/${itemId}`
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

	const onUpdateClick = (id, subgroupid, day, from, to) => {
		swal({
			buttons: false,
			content: (
				<UpdateConstraintsSubGroupsDialogBox
					subgroups={props.subgroups}
					refreshComponent={props.refreshComponent}
					constraintsSubGroupList={props.constraintsSubGroupList}
					id={id}
					subgroupid={subgroupid}
					from={from}
					to={to}
					day={day}
				/>
			),
		});
	};

	const columns = [
		{ name: 'ID', selector: '_id', omit: true },
		{ name: 'Sub-Group', selector: 'subgroup.subgroupid', sortable: true },
		{ name: 'Day', selector: 'day', sortable: true },
		{ name: 'From', selector: 'from', sortable: true },
		{ name: 'To', selector: 'to', sortable: true },
		{
			name: 'Action',
			cell: (row) => (
				<div>
					<button
						style={{ marginRight: 15 }}
						className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt'
						onClick={() => {
							onUpdateClick(
								row._id,
								row.subgroup.subgroupid,
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
						className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt'
						onClick={() => {
							onDeleteClick(
								row._id,
								row.subgroup.subgroupid,
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
			title="Sub-Groups' Not Available Times"
			data={props.constraintsSubGroupList}
			columns={columns}
			noDataComponent={<EmptyDataPlaceholder message={'No Data Found'} />}
			dense
			pagination
			highlightOnHover
		/>
	);
}

export default ConstraintsSubGroupsTable;
