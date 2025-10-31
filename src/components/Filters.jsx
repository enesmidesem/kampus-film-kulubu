import React from 'react';
import { ACTIONS } from '../reducer';

// 'dispatch' yanına 'filters' prop'unu da ekliyoruz
const Filters = ({ dispatch, filters }) => {

  // Bu fonksiyon artık tüm filtre değişikliklerini anında reducer'a gönderecek
  const handleFilterChange = (e) => {
    dispatch({ 
      type: ACTIONS.SET_FILTERS, 
      payload: { [e.target.name]: e.target.value }
    });
  };

  return (
    // Form ve Filtrele butonunu kaldırıyoruz
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="genre">Tür</label>
        <select 
          name="genre" 
          id="genre" 
          onChange={handleFilterChange}
          value={filters.genre} // Değeri ana state'ten al
        >
          <option value="">Tümü</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Science-Fiction">Science-Fiction</option>
          <option value="Action">Action</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="language">Dil</label>
        <select 
          name="language" 
          id="language" 
          onChange={handleFilterChange}
          value={filters.language} // Değeri ana state'ten al
        >
          <option value="">Tümü</option>
          <option value="English">English</option>
          <option value="Turkish">Turkish</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>
      
      <div className="filter-group">
        {/* Etiketi ana state'ten okuyarak anlık güncelliyoruz */}
        <label htmlFor="minRating">Min Puan: {filters.minRating}</label>
        <input 
          type="range" 
          name="minRating" 
          id="minRating"
          min="0" 
          max="10" 
          step="0.1" 
          value={filters.minRating} // Değeri ana state'ten al
          onChange={handleFilterChange} // 'onChange' anında dispatch'i tetikler
        />
      </div>
      {/* "Filtrele" butonu buradan kaldırıldı */}
    </div>
  );
};

export default Filters;