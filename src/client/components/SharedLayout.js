
import { Outlet } from "react-router-dom"
import Navbar from "./navbar";
import Home from './Home'
const SharedLayout = () =>{
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}

export default SharedLayout;