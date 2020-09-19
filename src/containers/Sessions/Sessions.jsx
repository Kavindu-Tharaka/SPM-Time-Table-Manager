import React, { Fragment,useEffect } from 'react'
import SessionContent from '../../components/SessionContent/SessionContent';

const Sessions = (props) => {
    useEffect(() => {
        props.setShowSubMenu(false);
    });

    return (
        <Fragment>
            <SessionContent/>
        </Fragment>
    )
}

export default Sessions