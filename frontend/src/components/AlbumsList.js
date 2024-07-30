// src/components/albumsList.js
import React, { useEffect, useState } from 'react';
import { getAlbums } from '../services/api';

const AlbumsList = () => {
    const [albums, setalbums] = useState([]);

    useEffect(() => {
        const fetchalbums = async () => {
            try {
                const response = await getAlbums();
                setalbums(response.data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchalbums();
    }, []);

    return (
        <div>
            <h1>Álbuns</h1>
            <ul>
                {albums.map(albums => (
                    <li key={albums.id}>
                        {albums.nome} - {albums.artista}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumsList;
