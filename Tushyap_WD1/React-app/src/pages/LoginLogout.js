import React, { useState } from 'react'

function LoginLogout() {
    // create useState to set the true & false
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // create function which will be called after onClick event Listener
    const handleLogin = () => {
        setIsLoggedIn(false);
    };
    const handleLogOut = () => {
        setIsLoggedIn(true);
    };
    return (
        <>
        {/* use conditional rendering of react by using ternary operator */}
            {
                isLoggedIn === true ? (<button onClick={handleLogin}>logout</button>) : (<button onClick={handleLogOut}>login</button>)
            }
        </>
    )
}

export default LoginLogout