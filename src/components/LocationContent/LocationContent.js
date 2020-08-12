import React from 'react';
import ContentHeader from '../ContentHeader/ContentHeader';

const LocationContent = (props) => {
    return (
        <div>
            <ContentHeader header='Buildings'/>

            <ContentHeader header='Rooms' label='All'/>
        </div>
    );
};

export default LocationContent;