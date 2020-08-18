import React, { Fragment } from 'react';
import { useEffect } from 'react';
import TagContent from '../../components/TagContent/TagContent';

function Tags(props) {
    useEffect(() => {
        props.setShowSubMenu(false);
    });

    return (
        <Fragment>
            <TagContent />
        </Fragment>
    );
}

export default Tags;
