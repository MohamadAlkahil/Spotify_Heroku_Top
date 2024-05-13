import React from 'react';

function Header({ leftButton }) {
    return (
        <div className="header">
            <h1>{leftButton === '1' ? 'Top Artists' : 'Top Tracks'}</h1>
        </div>
    );
}

export default Header;
