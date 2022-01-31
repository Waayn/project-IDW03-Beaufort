import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = ({ path }) => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate(path)
        //eslint-disable-next-line
    }, [])

    return <></>
}

export default Redirect
