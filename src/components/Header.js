import React from 'react';
import './Header.css';

export default ({black})=> {
    return (
        <header className={black ? 'black' : ""}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/1024px-Netflix_logo.svg.png" alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmX1IYrleu5pZkTWvD6cBrp4E0knysir8f-A&usqp=CAU" alt="Usuario" />
                </a>
            </div>
        </header>
    )
}