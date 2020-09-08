import React, { Fragment,useEffect } from 'react'
import './Lecturers.css';
import LecturerContent from '../../components/LecturerContent/LecturerContent';


const Lecturers = (props) => {
    useEffect(() => {
        props.setShowSubMenu(false);
    });

    return (
        <Fragment>
            <LecturerContent/>
        </Fragment>
    )
}

export default Lecturers
