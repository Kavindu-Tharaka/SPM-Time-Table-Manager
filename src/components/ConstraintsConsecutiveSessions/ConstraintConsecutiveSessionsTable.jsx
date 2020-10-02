import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';

function ConstraintConsecutiveSessionsTable(props) {
	const onDeleteClick = (itemId) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={deleteConstraint}
					itemId={itemId}
				/>
			),
		});
	};

	const deleteConstraint = (itemId) => {
		axios
			.delete(
				`https://time-table-manager.herokuapp.com/api/v1/constraintsconsecutivesessions/${itemId}`
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

	const columns = [
		{ name: 'ID', selector: '_id', omit: true },
		{ name: 'Year', selector: 'year', omit: true },
		{ name: 'Semester', selector: 'semester', omit: true },
		{
			name: 'Subject',
			selector: 'subject.subjectCode',
			omit: true,
		},
		{
			name: 'Sessions',
			sortable: true,
			grow: 10,
			cell: (row) => (
				<div style={{ paddingTop: 10 }}>
					{[...row.consecutivesessions].map((session) => {
						return (
							<div key={session._id}>
								{session.asString} <br /> <br />{' '}
							</div>
						);
					})}
				</div>
			),
		},
		{
			name: '',
			cell: (row) => (
				<div>
					<button
						style={{ marginRight: '50%', marginTop: '50%' }}
						className='sm-ctrl-btn sm-ctrl-btn-dlt'
						onClick={() => {
							onDeleteClick(row._id);
						}}
					>
						<IoMdClose />
					</button>
				</div>
			),

			button: true,
			grow: 1,
		},
	];

	return (
		<DataTable
			title='Consecutive Sessions'
			data={props.consecutiveSessionsConstraintsList}
			columns={columns}
			noDataComponent={<EmptyDataPlaceholder message={'No Data Found'} />}
			pagination
			highlightOnHover
		/>
	);
}

export default ConstraintConsecutiveSessionsTable;
