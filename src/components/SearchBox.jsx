import React, { useState, useEffect } from 'react';
import { ACTIONS } from '../reducer';

// 'initialQuery' prop'unun adını 'query' olarak değiştiriyoruz (Home.jsx'te de yapacağız)
const SearchBox = ({ dispatch, query }) => {
  // 'localTerm', kullanıcının anlık olarak girdiği değeri tutar
  const [localTerm, setLocalTerm] = useState(query);

  // Bu useEffect, 'query' (ana state'teki arama terimi) değiştiğinde
  // input'un içini günceller. (örn: filtre sıfırlama vb. için)
  useEffect(() => {
    setLocalTerm(query);
  }, [query]);

  // --- DEBOUNCING (GECİKMELİ TETİKLEME) ---
  // Bu useEffect, kullanıcı yazmayı durdurduğunda aramayı tetikler
  useEffect(() => {
    // Kullanıcı yazmayı bıraktıktan 500ms sonra çalışacak bir zamanlayıcı kur
    const timerId = setTimeout(() => {
      const trimmedTerm = localTerm.trim(); // "   " -> ""

      // 1. Durum: Kullanıcı kutuyu boşalttı veya sadece boşluk bıraktı
      if (trimmedTerm === '') {
        // Eğer mevcut arama zaten default değilse, default aramaya dön
        if (query !== 'friends') {
          dispatch({ type: ACTIONS.SET_QUERY, payload: 'friends' });
        }
      } 
      // 2. Durum: Kullanıcı geçerli bir terim girdi VE bu terim zaten aratılmamış
      else if (trimmedTerm !== query) {
        dispatch({ type: ACTIONS.SET_QUERY, payload: trimmedTerm });
      }
    }, 500); // 500 milisaniye bekle

    // Cleanup (Temizleme) fonksiyonu:
    // Kullanıcı 500ms dolmadan yeni bir harf yazarsa,
    // bir önceki zamanlayıcıyı iptal et ve yenisini başlat.
    return () => {
      clearTimeout(timerId);
    };

  }, [localTerm, query, dispatch]); // localTerm, query veya dispatch değiştiğinde çalışır

  // Input'a her harf girildiğinde SADECE localTerm'i güncelle
  const handleChange = (e) => {
    setLocalTerm(e.target.value);
  };

  // Kullanıcı "Enter"a basarsa zamanlayıcıyı bekleme, aramayı hemen yap
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = localTerm.trim();
    
    if (trimmedTerm === '') {
      if (query !== 'friends') {
        dispatch({ type: ACTIONS.SET_QUERY, payload: 'friends' });
      }
    } else if (trimmedTerm !== query) {
      dispatch({ type: ACTIONS.SET_QUERY, payload: trimmedTerm });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input 
        type="text" 
        value={localTerm} // Değer artık local state'ten geliyor
        onChange={handleChange} // Her harfte local state'i günceller
        placeholder="Bir dizi arayın..."
      />
      <button type="submit">Ara</button>
    </form>
  );
};

export default SearchBox;