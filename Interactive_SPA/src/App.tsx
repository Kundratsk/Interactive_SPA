import React, { useState, useEffect } from 'react';
import './App.css';
import ArtworkCard from './components/ArtworkCard';
import ArtworkForm from './components/ArtworkForm';

// 1. TypeScript Interface
export interface Artwork {
  id: number;
  title: string;
  artist: string;
  isFavorite: boolean;
}

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState<'all' | 'fav'>('all');

  // Funktsioonid
  const addArtwork = (title: string, artist: string) => {
    const newArt: Artwork = { id: Date.now(), title, artist, isFavorite: false };
    setArtworks([newArt, ...artworks]);
  };

  const toggleFav = (id: number) => {
    setArtworks(artworks.map(a => a.id === id ? { ...a, isFavorite: !a.isFavorite } : a));
  };

  const deleteArt = (id: number) => {
    setArtworks(artworks.filter(a => a.id !== id));
  };

  const filteredList = filter === 'all' ? artworks : artworks.filter(a => a.isFavorite);

  return (
    <div className="app-container">
      <header className="gallery-header">
        <h1>Moodne Kunstigalerii</h1>
        <p>Halda oma virtuaalset kollektsiooni</p>
      </header>

      <ArtworkForm onAdd={addArtwork} />

      <div className="filter-controls">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Kõik teosed</button>
        <button onClick={() => setFilter('fav')} className={filter === 'fav' ? 'active' : ''}>Lemmikud</button>
      </div>

      <main className="gallery-grid">
        {filteredList.length > 0 ? (
          filteredList.map(art => (
            <ArtworkCard 
              key={art.id} 
              art={art} 
              onToggleFav={toggleFav} 
              onDelete={deleteArt} 
            />
          ))
        ) : (
          <div className="empty-state">
            <p>{filter === 'all' ? 'Galerii on tühi. Lisa esimene teos!' : 'Lemmikuid veel pole.'}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
