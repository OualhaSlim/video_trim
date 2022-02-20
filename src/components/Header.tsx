import React from 'react';

const Header = (props:any) =>{
    return(
        <div className="ui secondary pointing menu">
            <img
                alt=""
                src="./logoQlip.png"
                width="60"
                height="60"
                className="d-inline-block align-top"
                onClick={()=> props.setDisplayVideoDetails(false)}
            />
        </div>
    );
};

export default Header;