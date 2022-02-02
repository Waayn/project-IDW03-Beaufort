import React from 'react';
import { Image } from 'react-bootstrap';
import Logo from '../assets/images/logo-crossdex.png'

const Loader = () => {
    return <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
        <Image src={Logo} alt="Logo Crossdex" className="mw-100" />
    </div>;
};

export default Loader;