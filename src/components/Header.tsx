import React from 'react';
import { Navbar, Container} from 'react-bootstrap';

const Header = () =>{
    return(
        <div className="ui secondary pointing menu">
            <img
                alt=""
                src="./logoQlip.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
        </div>
    );
};

export default Header;

// <>
//         <Navbar bg="dark" variant="dark">
//                 <Navbar.Brand href="#home">
//                     <img
//                         alt=""
//                         src="./logoQlip.png"
//                         width="30"
//                         height="30"
//                         className="d-inline-block align-top"
//                     />{' '}
//                     Qlip
//                 </Navbar.Brand>
//         </Navbar>
//         </>