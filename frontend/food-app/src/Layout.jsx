import NavBar from "./Components/navBar.jsx";
import { Outlet } from "react-router-dom";


export default function Layout(){
    return(
        <>
         <NavBar/>
         <main>
            <Outlet/>
         </main>
        
        </>
    );
}