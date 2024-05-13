import React from 'react';
import Spotify_Icon from './Images/Spotify_Icon.png';
import Microphone from './Images/microphone.png';
import Music_Note from './Images/musical_note.png';

function LeftNavbar({ leftButton, handleLeftButtonClick }) {
    return (
        <div className="left-navbar">
            <img className='spotify-icon' src={Spotify_Icon} alt="Spotify Icon" />
            <button className={leftButton === 'artists' ? 'artists-tracks-button-clicked' : 'artists-tracks-button'} onClick={() => handleLeftButtonClick('artists')}>
                <img className='icon' src={Microphone} alt="Microphone Icon" />
                Top Artists
            </button>
            <button className={leftButton === 'tracks' ? 'artists-tracks-button-clicked' : 'artists-tracks-button'} onClick={() => handleLeftButtonClick('tracks')}>
                <img className='icon' src={Music_Note} alt="Music Note Icon" />
                Top Tracks
            </button>
            <a className="logout-button" href="/auth/logout" >
                    Logout 
            </a>
        </div>
    );
}

export default LeftNavbar;
