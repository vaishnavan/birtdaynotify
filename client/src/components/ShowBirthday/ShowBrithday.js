/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getBirthday } from '../../service/birthday.service';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import './showbirth.css';

export default function ShowBrithday ({ showBirth }) {
    // const [show, setshow] = useState(false);
    const { setBirthData, birthData } = showBirth;
    const [searchName, setSearchName] = useState('');
    const [items, setItems] = useState(8);

    useEffect(() => {
        getBirthday().then(res => {
            setBirthData(res.data.posts);
        });
        handleShow();
    }, []);

    const handleShow = () => {
        const today = new Date();
        var currentmonth = today.getMonth();
        var currentday = today.getDate();

        const monthFinder = birthData.filter(data => {
            var dataString = new Date(data.dob);
            if (
                currentmonth === dataString.getMonth() &&
                currentday === dataString.getDate()
            ) {
                return data;
            }
            return 0;
        });
        setBirthData(monthFinder);
    };

    const handleSearch = e => {
        setSearchName(e.target.value);
    };

    const filterData = birthData.filter(data => {
        return data.username.toLowerCase().includes(searchName.toLowerCase());
    });

    const fetchMoreData = () => {
        setTimeout(() => {
            setItems(items => items + 5);
        }, 1500);
    };

    return (
        <div>
            <div className='today-birthday'>
                <button onClick={handleShow}>Today Birthday</button>
            </div>
            <div class='birthday-search'>
                <input
                    type='text'
                    placeholder='Search by name'
                    onChange={handleSearch}
                />
            </div>
            <InfiniteScroll
                dataLength={filterData.length}
                next={fetchMoreData}
                hasMore={true}
                // loader={<h4>Loading...</h4>}
            >
                <div className='main-birth'>
                    {filterData.length === 0 ? (
                        <p style={{ textTransform: 'capitalize' }}>
                            No one has birthbay in your friendList
                        </p>
                    ) : (
                        <>
                            {filterData
                                .sort((a, b) => (a._id < b._id ? 1 : -1))
                                .slice(0, items)
                                .map(data => {
                                    return (
                                        <>
                                            <div className='main-container'>
                                                <div className='birth-img'>
                                                    <img
                                                        src={data.profile}
                                                        alt='no'
                                                    />
                                                </div>
                                                <div className='brith-details'>
                                                    <div className='birth-name'>
                                                        <h3
                                                            style={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {data.username}
                                                        </h3>
                                                        <span>
                                                            {moment(
                                                                data.dob,
                                                            ).format('ll')}
                                                        </span>
                                                    </div>
                                                    <div className='bith-name'>
                                                        <h4
                                                            style={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {data.goal}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </>
                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}
