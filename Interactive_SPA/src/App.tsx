import './App.css'
import React, { useState, type KeyboardEvent } from 'react';
import { Plus, Trash2, Heart, Palette } from 'lucide-react'; // Eeldab: npm install lucide-react

// 1. TypeScript Interface
interface Artwork {
  id: number;
  title: string;
  artist: string;
  isFavorite: boolean;
}

const App: React.FC = () => {
  // 2. State haldus
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  // 3. Funktsioonid
  const addArtwork = () => {
    if (inputValue.trim() === '') return;
    
    const newArt: Artwork = {
      id: Date.now(),
      title: inputValue,
      artist: 'Tundmatu autor',
      isFavorite: false,
    };
    
    setArtworks([...artworks, newArt]);
    setInputValue('');
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') addArtwork();
  };

  const deleteArtwork = (id: number) => {
    setArtworks(artworks.filter(art => art.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setArtworks(artworks.map(art => 
      art.id === id ? { ...art, isFavorite: !art.isFavorite } : art
    ));
  };

  const filteredList = filter === 'all' 
    ? artworks 
    : artworks.filter(art => art.isFavorite);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-2xl mx-auto">
        
        {/* Päis */}
        <header className="flex items-center gap-3 mb-8">
          <Palette className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-bold tracking-tight">Minu Digigalerii</h1>
        </header>

        {/* Lisamine */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Lisa uue teose nimi..."
            className="flex-1 px-4 py-2 outline-none"
          />
          <button 
            onClick={addArtwork}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors flex items-center gap-2 px-4"
          >
            <Plus size={20} /> Lisa
          </button>
        </div>

        {/* Filtrid */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Kõik teosed
          </button>
          <button 
            onClick={() => setFilter('favorites')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === 'favorites' ? 'bg-pink-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Lemmikud
          </button>
        </div>

        {/* Listi kuvamine */}
        <div className="space-y-3">
          {filteredList.length > 0 ? (
            filteredList.map(art => (
              <div 
                key={art.id} 
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group"
              >
                <div>
                  <h3 className="font-semibold text-lg">{art.title}</h3>
                  <p className="text-slate-400 text-sm">{art.artist}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleFavorite(art.id)}
                    className={`p-2 rounded-full transition ${art.isFavorite ? 'text-pink-500 bg-pink-50' : 'text-slate-300 hover:text-pink-400'}`}
                  >
                    <Heart fill={art.isFavorite ? "currentColor" : "none"} size={20} />
                  </button>
                  <button 
                    onClick={() => deleteArtwork(art.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
              <p>Galerii on tühi. Lisa esimene meistriteos!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
