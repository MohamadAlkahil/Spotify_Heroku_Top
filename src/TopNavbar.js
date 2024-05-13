import React from 'react';

function TopNavbar({ selectedButton, handleButtonClick }) {
    return (
        <div className="navbar">
            <button className={selectedButton === '1' ? 'top-nav-bar-clicked' : 'top-nav-bar-normal'} onClick={() => handleButtonClick('short_term', '1')}>Last 4 Weeks</button>
            <button className={selectedButton === '2' ? 'top-nav-bar-clicked' : 'top-nav-bar-normal'} onClick={() => handleButtonClick('medium_term', '2')}>Last 6 Months</button>
            <button className={selectedButton === '3' ? 'top-nav-bar-clicked' : 'top-nav-bar-normal'} onClick={() => handleButtonClick('long_term', '3')}>All Time</button>
        </div>
    );
}

export default TopNavbar;
