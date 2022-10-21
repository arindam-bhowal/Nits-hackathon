import React, { useEffect, useState } from 'react';
import Notice from "../../components/notice/Notice";
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import './dashboard.scss';

const Dashboard = () => {
    const [user, setUser] = useState()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('Student'))
        const getUserDetails = async () => {
            const reqUser = await axios.get(`${process.env.REACT_APP_HOST}/student/get/${userInfo.student_id}`, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.accessToken //the token is a variable which holds the token
                }
            })
            setUser(reqUser.data)
        }
        getUserDetails()
    }, [])

    return (
        <div>
            {/* hello - {user && user.deptName} */}
            <Sidebar />
            <div className="topbar">
                <h1>NITS Toolkit</h1>
                <span className='StudentName'>{user && user.name}</span>
                <br />
                <span className="CourseSemBranch">{user && user.courseName}. {user && user.semester} - {user && user.deptName}</span>
            </div>
            <div className="dashBody">
                <div className="dashBody__content">

                    <div className="flexabout">
                    </div>
                    <div className="about">
                        <ul className="cards">
                            <li className="cards__item">
                                <div className="card">
                                    <div className="card__image card__image--fence" />
                                    <div className="card__content">
                                        <div className="card__title">Flex</div>
                                        <p className="card__text">This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto. </p>
                                        {/* <button className="btn btn--block card__btn">Button</button> */}
                                    </div>
                                </div>
                            </li>
                            <li className="cards__item">
                                <div className="card">
                                    <div className="card__image card__image--river" />
                                    <div className="card__content">
                                        <div className="card__title">Flex Grow</div>
                                        <p className="card__text">This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up.</p>
                                        {/* <button className="btn btn--block card__btn">Button</button> */}
                                    </div>
                                </div>
                            </li>
                            <li className="cards__item">
                                <div className="card">
                                    <div className="card__image card__image--record" />
                                    <div className="card__content">
                                        <div className="card__title">Flex Shrink</div>
                                        <p className="card__text">This defines the ability for a flex item to shrink if necessary. Negative numbers are invalid.</p>
                                        {/* <button className="btn btn--block card__btn">Button</button> */}
                                    </div>
                                </div>
                            </li>
                            <li className="cards__item">
                                <div className="card">
                                    <div className="card__image card__image--flowers" />
                                    <div className="card__content">
                                        <div className="card__title">Flex Basis</div>
                                        <p className="card__text">This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means "look at my width or height property."</p>
                                        {/* <button className="btn btn--block card__btn">Button</button> */}
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>


                </div>
                <div className="notices">
                    <h1>Notices</h1>
                    <Notice />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
