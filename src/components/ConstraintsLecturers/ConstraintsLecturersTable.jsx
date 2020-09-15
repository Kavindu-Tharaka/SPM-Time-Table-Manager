import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateSubGroupIDsDialogBox from './UpdateConstraintsLecturersDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';

const RoomsTable = (props) => {
	const onDeleteClick = (itemId, lecturer, day, from, to) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={deleteConstraint}
					itemId={itemId}
					itemName={`${lecturer} From: ${from} To: ${to} on ${day}`}
				/>
			),
		});
	};

	const deleteConstraint = (itemId) => {
		axios
			.delete(`http://localhost:8000/api/v1/constraintslecturers/${itemId}`)
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

	const onUpdateClick = (id, name, day, from, to) => {
		swal({
			buttons: false,
			content: (
				<UpdateSubGroupIDsDialogBox
					lecturers={props.lecturers}
					refreshComponent={props.refreshComponent}
					constraintsLectureList={props.constraintsLectureList}
					id = {id}
					name = {name}
					from = {from}
					to = {to}
					day = {day}
				/>
			),
		});
	};

	const columns = [
		{ name: 'ID', selector: '_id', omit: true },
		{ name: 'Lecturer Name', selector: 'lecturer.name', sortable: true },
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
							onUpdateClick(row._id, row.lecturer.name, row.day, row.from, row.to);
						}}
					>
						<IoMdCreate />
					</button>
					<button
						style={{marginRight:15}}
						className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt'
						onClick={() => {
							onDeleteClick(row._id, row.lecturer.name, row.day, row.from, row.to);
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
			title="Lecturers' Not Available Times"
			data={props.constraintsLectureList}
			columns={columns}
			noDataComponent = {<EmptyDataPlaceholder message={'No Data Found'} />}
			dense
			pagination
			highlightOnHover
		/>
	);
};

export default RoomsTable;
