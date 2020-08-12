
import React, { useState } from 'react';
import { useEffect } from 'react';
import Tag from '../../components/Tag/Tag';
import axios from 'axios';
import Swal from 'sweetalert2';

import './tags.css';
import ContentHeader from '../../components/ContentHeader/ContentHeader';

function Tags(props) {
    const [tagName, setTagName] = useState('');
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        props.setShowSubMenu(false);

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/tags', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    // console.log(response.data.data.tags);
                    setTagList(response.data.data.tags);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        loadData();

        return () => {
            source.cancel();
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            addTagName(e);
        }
    };

    const addTagName = (e) => {
        e.preventDefault();
        if (tagName === '') {
            Swal.fire('Please Enter a Tag Name!');
        } else {
            axios
                .post('http://localhost:8000/api/v1/tags', {
                    tagname: tagName,
                })
                .then(function (response) {
                    console.log(response.data.data.tag);
                    setTagList([...tagList, response.data.data.tag]);
                    setTagName('');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const deleteTagName = (tagId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.value) {
                axios
                    .delete(`http://localhost:8000/api/v1/tags/${tagId}`)
                    .then((res) => {
                        setTagList(
                            tagList.filter((item) => {
                                return tagId !== item._id;
                            })
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    const editTagName = (tagName, id) => {
        Swal.mixin({
            input: 'text',
            inputValue: tagName,
            confirmButtonText: 'Edit',
            showCancelButton: true,
        })
            .queue([
                {
                    title: 'Edit Tag Name',
                },
            ])
            .then((result) => {
                if (result.value) {
                    const editedTagName = result.value[0];
                    if (tagName !== editedTagName) {
                        axios
                            .patch(`http://localhost:8000/api/v1/tags/${id}`, {
                                tagname: editedTagName,
                            })
                            .then((res) => {
                                setTagList((prevlist) =>
                                    prevlist.map((listItem) =>
                                        id === listItem._id
                                            ? {
                                                  ...listItem,
                                                  tagname: editedTagName,
                                              }
                                            : listItem
                                    )
                                );
                            })
                            .catch((err) => console.log(err));
                    }
                }
            });
    };

    const onInputChange = (e) => {
        setTagName(e.target.value);
    };

    return (
        <div className="container">
            <ContentHeader header={'Tags'} />
            <div
                style={{
                    position: 'fixed',
                    width: '30%',
                    textAlign: 'center',
                    left: '50%',
                    padding: '20px',
                    transform: 'translate(-50%, 0)',
                }}
                className="input-group mb-3"
            >
                <input
                    style={{ borderRadius: 0 }}
                    type="text"
                    className="form-control"
                    placeholder="Tag Name"
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    value={tagName}
                />
                <button
                    style={{ marginLeft: 20, borderRadius: 0 }}
                    type="button"
                    className="btn btn-primary"
                    onClick={addTagName}
                >
                    Add
                </button>
            </div>

            <div
                style={{
                    position: 'fixed',
                    // width: '95%',
                    textAlign: 'center',
                    top: '25%',
                    // left: '50%',
                    padding: '20px',
                    // transform: 'translate(-50%, 0)',
                    overflowY: 'auto',
                    height: '450px',
                }}
                className="row"
            >
                {tagList.map((tag) => (
                    <div key={tag._id}>
                        <div className="col">
                            <Tag
                                id={tag._id}
                                deleteMethod={deleteTagName}
                                editMethod={editTagName}
                                tagName={tag.tagname}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tags;
