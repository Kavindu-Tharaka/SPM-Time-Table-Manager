import React from 'react';

import './contentHeader.css'

const ContentHeader = (props) => {
    return (
        <div className="ch-header-container">
            <h3>{props.header}</h3>
            <hr/>
        </div>
    );
};

export default ContentHeader;