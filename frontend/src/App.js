// src/App.js
import React from 'react';
import AlbumsList from './components/AlbumsList';
import AddAlbums from './components/AddAlbums';

const App = () => {
    return (
        <div>
            <h1>Discografia</h1>
            <AddAlbums />
            <AlbumsList />
        </div>
    );
};

export default App;
