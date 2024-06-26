import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DotLoader } from "react-spinners";


export default function Profile() {

    const [loading, setLoading] = useState(true)
    const handleLogout = (event) => {
        event.preventDefault()
        axios.get('http://localhost:8000/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                localStorage.removeItem('access_token')
                navigate('/login')
            })
            .catch(err => {
                console.log(err);
            })
    }
    const [profile, setProfile] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setLoading(false)
                setProfile(res.data.data)
                console.log(profile);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                    navigate('/login?message = ' + encodeURIComponent('anda belum login'))

                }
            })
    }, [])


    return (
        <Case>
            {
                loading === true ?
                    <div className="flex justify-center items-center min-h-screen">
                        <DotLoader color="#ffffffff" /> <p className="text-white font-bold">Loading...</p>
                    </div>
                    :
                    <div className="block m-auto mt-10 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-10 pt-10">
                            <FontAwesomeIcon icon="fa-solid fa-user" className="w-20 h-20 mb-3 text-gray-500" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{profile.username}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</span>
                            <div className="flex mt-4 md:mt-6">
                                <Link to="/dashboard">
                                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dashboard</a>
                                </Link>

                                <a href="#" onClick={handleLogout} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</a>
                            </div>
                        </div>
                    </div>
            }

        </Case>
    )
}