import { useCookies } from 'react-cookie';
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Redirect from "../components/Redirect";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PokemonView from "../pages/PokemonView";
import { useDispatch } from 'react-redux';
import { setUserInfos } from '../app/store';
import UserModel from '../models/UserModel';

const MyRoutes = () => {

    const [cookies, setCookie] = useCookies()
    const dispatch = useDispatch()
    const userModel = new UserModel()

    useEffect(() => {
        if (typeof cookies['crossdex'] !== 'undefined') {
            userModel.getUserById(cookies['crossdex'])
                .then(res => dispatch(setUserInfos(res.data)))
                .catch(() => setCookie('crossdex', '', { expires: new Date(Date.now() - (3600 * 1000 * 25)) }))
        }
        //eslint-disable-next-line
    }, [])

    return <Routes>
        {typeof cookies['crossdex'] === 'undefined' && <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Redirect path="/login" />} />
        </>}
        {typeof cookies['crossdex'] !== 'undefined' && <>
            <Route exact path='/pokemon/:pokemonId' element={<PokemonView />} />
            <Route exact path='/' element={<Home />} />
            <Route path="*" element={<Redirect path="/" />} />
        </>}
    </Routes>
}

export default MyRoutes