import React from 'react';
import { Link } from 'react-router-dom';

import './subNavigationBar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';

const SubNavigationBar = (props) => {
    let url = window.location.href;
    const [selectedMenu, setSelectedMenu] = useState('lecturers');

    useEffect(() => {
        setSelectedMenu(url.substring(url.lastIndexOf('/') + 1));

        console.log(url.substring(url.lastIndexOf('/') + 1));
    }, [url]);

    return (
        <div className="snb-nav-container">
            <div className="snb-nav-header">
                <p>{props.header}</p>
            </div>
            <div className="snb-nav-content">
                {props.links.map((link) => {
                    if (link.id === 'not-availabilities') {
                        return (
                            <Fragment key={link.name}>
                                <Link to={link.url} key={link.name}>
                                    <p
                                        // className={
                                        //     // selectedMenu === 'lecturers' || 'sessions' || 'groups' || 'sub-groups'
                                        //     selectedMenu === 'lecturers' || 'sessions' || 'groups' || 'sub-groups'
                                        //         ? 'snb-nav-content-link-active'
                                        //         : null
                                        // }
                                    >
                                        {link.name}
                                    </p>
                                </Link>

                                {props.sublinks.map((sublink) => {
                                    return (
                                        <Link
                                            to={sublink.url}
                                            key={sublink.name}
                                        >
                                            <div
                                                className={
                                                    selectedMenu === sublink.id
                                                        ? 'snb-sub-sub-nav-content-link-active'
                                                        : 'snb-sub-sub-nav-content-link'
                                                }
                                            >
                                                {sublink.name}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </Fragment>
                        );
                    } else {
                        return (
                            <Link to={link.url} key={link.name}>
                                <p
                                    className={
                                        selectedMenu === link.id
                                            ? 'snb-nav-content-link-active'
                                            : null
                                    }
                                >
                                    {link.name}
                                </p>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default SubNavigationBar;
