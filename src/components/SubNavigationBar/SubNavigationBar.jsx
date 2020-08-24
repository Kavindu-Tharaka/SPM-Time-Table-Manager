import React from 'react';
import { Link } from 'react-router-dom';

import './subNavigationBar.css';
import { useState } from 'react';
import { useEffect } from 'react';

const SubNavigationBar = (props) => {
    let url = window.location.href;
    const [selectedMenu, setSelectedMenu] = useState('lecturers');

    useEffect(() => {
        setSelectedMenu(url.substring(url.lastIndexOf('/') + 1));
    }, [url]);

    return (
        <div className="snb-nav-container">
            <div className="snb-nav-header">
                <p>{props.header}</p>
            </div>
            <div className="snb-nav-content">
                {props.links.map((link) => {
                    if (link.id === 'notAvailabilities') {
                        return (
                            // <div key={link.name}>
                            //     <button
                            //         data-toggle="collapse"
                            //         href="#collapseExample"
                            //         role="button"
                            //         aria-expanded="false"
                            //         aria-controls="collapseExample"
                            //         className="btn btn-link"
                            //         style={{
                            //             textDecoration: 'none',
                            //             background: 'none',
                            //             border: 'none',
                            //             padding: 0,
                            //             cursor: 'pointer',
                            //             width: '100%',
                            //             textAlign: 'left',
                            //             outline: 'none',
                            //             boxShadow: 'none',
                            //         }}
                            //     >
                            //         <p
                            //             className={
                            //                 selectedMenu === link.id
                            //                     ? 'snb-nav-content-link-active'
                            //                     : null
                            //             }
                            //         >
                            //             {link.name}
                            //         </p>
                            //     </button>

                            //     <div
                            //         style={{ color: '#881212' }}
                            //         className="collapse"
                            //         id="collapseExample"
                            //     >
                            //         <ul className="list-group">
                            //             <Link to={'lecturers'}>
                            //                 <li className="list-group-item">
                            //                     Lecturers
                            //                 </li>
                            //             </Link>

                            //             <Link to={'sessions'}>
                            //                 <li className="list-group-item">
                            //                     Sessions
                            //                 </li>
                            //             </Link>

                            //             <Link to={'groups'}>
                            //                 <li className="list-group-item">
                            //                     Groups
                            //                 </li>
                            //             </Link>

                            //             <Link to={'sub-group'}>
                            //                 <li className="list-group-item">
                            //                     Sub-Groups
                            //                 </li>
                            //             </Link>
                            //         </ul>
                            //     </div>
							// </div>
							
							<div key={link.name}>
							<button
								className="btn btn-link"
								style={{
									textDecoration: 'none',
									background: 'none',
									border: 'none',
									padding: 0,
									cursor: 'pointer',
									width: '100%',
									textAlign: 'left',
									outline: 'none',
									boxShadow: 'none',
								}}
							>
								<p
									className={
										selectedMenu === link.id
											? 'snb-nav-content-link-active'
											: null
									}
								>
									{link.name}
								</p>
							</button>

							<div>
								<ul className="list-group">
									<Link to={'lecturers'}>
										<li style={{ color: '#444', border: 'none', fontSize:15 }} className="list-group-item">
											Lecturers
										</li>
									</Link>

									<Link to={'sessions'}>
										<li style={{ color: '#444', border: 'none', fontSize:15 }} className="list-group-item">
											Sessions
										</li>
									</Link>

									<Link to={'groups'}>
										<li style={{ color: '#444', border: 'none', fontSize:15 }} className="list-group-item">
                                            Student Groups
										</li>
									</Link>

									<Link to={'sub-groups'}>
										<li style={{ color: '#444', border: 'none', fontSize:15 }} className="list-group-item">
                                            Student Sub-Groups
										</li>
									</Link>
								</ul>
							</div>
						</div>
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
