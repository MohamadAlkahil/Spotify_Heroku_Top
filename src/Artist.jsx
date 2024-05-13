import React, { useState } from 'react';

function Artist({ artist }) {
  // const [imageLoaded, setImageLoaded] = useState(false);

  // const handleImageLoad = () => {
  //   setImageLoaded(true);
  // };

  return (
    // <div className="artist-wrapper">
    //     {!imageLoaded && (
    //         <div className="placeholder-image"></div>
    //     )}
    //     <img 
    //         className={`artist-image ${imageLoaded ? 'loaded' : 'loading'}`} 
    //         src={artist.images && artist.images.length > 0 ? artist.images[0].url : ''} 
    //         alt={artist.name} 
    //         onLoad={handleImageLoad} 
    //     />
    //     <h2 className="artist-name">{artist.name}</h2>
    // </div>
    <div className="artist-wrapper">
        <img className="artist-image"src={artist.images[0].url} alt={artist.name} />
        <h2 className="artist-name">{artist.name}</h2>
    </div>
  );
}

export default Artist;
