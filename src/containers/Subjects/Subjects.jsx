import React, { Fragment, useEffect } from 'react'
import SubjectContent from '../../components/SubjectContent/SubjectContent';

const Subjects = (props) => {

    useEffect(() => {
        props.setShowSubMenu(false);
    }
    );


    return (
        <Fragment>
            <SubjectContent/>
        </Fragment>
    )
}

export default Subjects
