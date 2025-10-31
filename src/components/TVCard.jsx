import React from 'react';
import { Link } from 'react-router-dom';
import { ACTIONS } from '../reducer';

const TVCard = ({ item, dispatch }) => {
  const { show } = item;

  // Puanı formatla (Demo sitedeki gibi 7.8 -> 78)
  const formattedRating = show.rating?.average ? Math.round(show.rating.average * 10) : 'N/A';
  
  // Puan rengini belirle
  const getRatingColor = (rating) => {
    if (rating >= 80) return 'rating-high'; // Yeşil
    if (rating >= 60) return 'rating-medium'; // Sarı
    if (rating > 0) return 'rating-low'; // Kırmızı
    return 'rating-none'; // Gri
  };

  return (
    <div className="tv-card">
      <div className="card-image-container">
        <img 
          src={show.image?.medium || 'https://via.placeholder.com/210x295.png?text=No+Image'} 
          alt={show.name} 
        />
        
        {/* Resmin üzerindeki overlay (hover ile görünecek) */}
        <div className="card-overlay">
          <div className="overlay-content">
            <h3>{show.name}</h3>
            <p><strong>Dil:</strong> {show.language || 'N/A'}</p>
            <p><strong>Tür:</strong> {show.genres?.join(', ') || 'N/A'}</p>
            <div className="tv-card-actions">
              <Link to={`/show/${show.id}`} className="btn btn-detail">
                Detay
              </Link>
              <button 
                className="btn btn-add-list"
                onClick={(e) => {
                  e.stopPropagation(); // Link'e tıklamayı engelle
                  dispatch({ type: ACTIONS.ADD_WATCHLIST, payload: item });
                }}
              >
                Listeye Ekle
              </button>
            </div>
          </div>
        </div>

        {/* Puan Göstergesi (Demo'daki gibi) */}
        {formattedRating !== 'N/A' && (
           <div className={`card-rating ${getRatingColor(formattedRating)}`}>
             {formattedRating}
           </div>
        )}
      </div>

      {/* Kartın altındaki içerik */}
      <div className="card-content">
        <h4>{show.name}</h4>
        <p>{show.genres?.[0] || 'Genel'}</p>
      </div>
    </div>
  );
};

export default TVCard;