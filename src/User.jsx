import React, { useState, useEffect } from 'react';
import Artist from './Artist';
import LeftNavbar from './LeftNavbar';
import TopNavbar from './TopNavbar';
import Header from './Header';
import Track from './Track';

function User(props) {
    const [topData, setTopData] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');
    const [selectedButton, setSelectedButton] = useState('1');
    const [leftButton, setLeftButton] = useState('artists'); 
    const [synced, setsynced] = useState('artists'); 

    useEffect(() => {
        fetchTopData(selectedTimeRange, leftButton);
    }, [props.token, selectedTimeRange, leftButton]);

    async function fetchTopData(timeRange, contentType) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/top/${contentType}?time_range=${timeRange}&limit=50`, {
                method: "GET",
                headers: { Authorization: `Bearer ${props.token}` },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch top ${contentType}`);
            }
    
            const data = await response.json();
            // Check if the contentType is 'tracks', then set the top tracks data
            if (contentType === 'tracks') {
                await setTopData(data.items);
                await setsynced('tracks');
            } else {
                // Otherwise, if it's 'artists', set the top artists data
                await setTopData(data.items);
                await setsynced('artists');
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    const handleButtonClick = async (timeRange, buttonId) => {
        setSelectedButton(buttonId);
        setSelectedTimeRange(timeRange);
    };

    const handleLeftButtonClick = (buttonId) => {
        setLeftButton(buttonId); 
    };

    return (
        <div className="top-content">
            <Header leftButton={leftButton} />
            <LeftNavbar leftButton={leftButton} handleLeftButtonClick={handleLeftButtonClick} />
            <TopNavbar selectedButton={selectedButton} handleButtonClick={handleButtonClick} />
            <div className="main-content">
                {leftButton === 'artists' && synced ==='artists' &&(
                    <div className="artist-container">
                        {topData.map(data => (
                            <Artist key={data.id} artist={data} />
                        ))}
                    </div>
                )}
                {leftButton === 'tracks' && synced ==='tracks' &&(
                    <div  className="track-container">
                        {topData.map(track => (
                            <Track key={track.id}  trackData={track}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
