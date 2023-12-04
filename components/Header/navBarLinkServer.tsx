import NavbarComponent from "./NavBarComponent";

const NavBar = async ({ session} : {session: any}) => {  
    return ( 
        <div>
            {/* Links here */}
            
            {session &&  <NavbarComponent/>}
            {/* Button for Login and Logout */}
        </div>
     );
}
 
export default NavBar;
