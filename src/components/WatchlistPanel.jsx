import React from 'react';
import { ACTIONS } from '../reducer';

const WatchlistPanel = ({ watchlist, dispatch }) => {
  return (
    <aside className="watchlist-panel">
      <h2>Gösterime Girecekler</h2>
      {watchlist.length === 0 ? (
        <p>Listeniz boş.</p>
      ) : (
        <ul className="watchlist-items"> {/* CSS için sınıf adı eklendi */}
          {watchlist.map(item => {
            const show = item.show;
            // Puanı formatla (örn: 7.8)
            const formattedRating = show.rating?.average ? (show.rating.average).toFixed(1) : 'N/A';

            return (
              <li key={show.id} className="watchlist-item"> {/* CSS için sınıf adı eklendi */}
                <img 
                  src={show.image?.medium || 'https://via.placeholder.com/60x84.png?text=No+Img'} 
                  alt={show.name} 
                  className="watchlist-item-img"
                />
                <div className="watchlist-item-info">
                  <span className="watchlist-item-title">{show.name}</span>
                  <span className="watchlist-item-rating">
                    IMDb: {formattedRating}
                  </span>
                </div>
                <button 
                  className="btn-remove-text"
                  onClick={() => dispatch({ type: ACTIONS.REMOVE_WATCHLIST, payload: show.id })}
                >
                  Kaldır
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {watchlist.length > 0 && (
         <button 
            className="btn-clear"
            onClick={() => dispatch({ type: ACTIONS.CLEAR_WATCHLIST })}
         >
            Listeyi Temizle
         </button>
      )}
    </aside>
  );
};

export default WatchlistPanel;