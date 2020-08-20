import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RoomsTable = (props) => {
	const columns = [
        {name: 'ID', selector: '_id', omit: true },
		{ name: 'Room Name', selector: 'roomName', sortable: true },
		{ name: 'Floor', selector: 'floor', sortable: true },
		{ name: 'Capacity', selector: 'capacity', sortable: true },
		{ name: 'Room Type', selector: 'roomType', sortable: true },
	];

	return <DataTable title='Rooms' data={props.rooms} columns={columns} pagination />;
};

export default RoomsTable;
