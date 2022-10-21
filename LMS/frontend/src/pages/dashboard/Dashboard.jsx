import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
            hello - {user && user.deptName}
        </div>
    )
}

export default Dashboard
