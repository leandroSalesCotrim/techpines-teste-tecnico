import React, { useState } from 'react';
import AlbumsList from './components/AlbumsList';
import AddAlbums from './components/AddAlbums';
import './App.css';

const App = () => {
    const [showAddAlbums, setShowAddAlbums] = useState(false); // Estado para controle do modal

    return (
        <div>
            <h1>Discofy</h1>
            <AlbumsList />
            {showAddAlbums && (
                <AddAlbums onClose={() => setShowAddAlbums(false)} /> // Modal de adicionar álbum
            )}
           {/* Botão para abrir a modal de adicionar álbum */}
           <button className="add-album-button" onClick={() => setShowAddAlbums(true)}>
                +
            </button>

        </div>
    );
};

export default App;
