import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

    const user = useSelector(state => state.user)

    return <div>
        <h1>Welcome {user.username}</h1>
    </div>
};

export default Home;
