import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Dizi detaylarını çek
        const showResult = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(showResult.data);
        
        // 2. Bölüm verilerini ayrı API çağrısıyla çek
        const episodesResult = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
        setEpisodes(episodesResult.data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="spinner">Yükleniyor...</div>;
  if (error) return <div className="error">Hata: {error}</div>;
  if (!show) return <div>Dizi bulunamadı.</div>;

  const stripHtml = (html) => {
     let doc = new DOMParser().parseFromString(html, 'text/html');
     return doc.body.textContent || "";
  }

  return (
    <div className="show-detail">
      <Link to="/" className="back-link">&larr; Anasayfaya Dön</Link>
      
      {/* --- YENİ DÜZEN (LAYOUT) BURADA BAŞLIYOR --- */}
      <div className="show-detail-layout">
        
        {/* Sol Taraf: Resim */}
        <img 
          src={show.image?.original || 'https://via.placeholder.com/300x420.png?text=No+Image'} 
          alt={show.name} 
        />
        
        {/* Sağ Taraf: Bilgiler */}
        <div className="show-detail-content">
          <h1>{show.name}</h1>
          <p>{stripHtml(show.summary)}</p>
          <p><strong>Türler:</strong> {show.genres?.join(', ')}</p>
          <p><strong>Puan:</strong> {show.rating?.average}</p>
          <p><strong>Dil:</strong> {show.language}</p>
          <p><strong>Durum:</strong> {show.status}</p>
        </div>
      </div>
      {/* --- YENİ DÜZEN BURADA BİTİYOR --- */}

      
      {/* Bölüm Listesi (Layout'un dışında) */}
      <div className="episodes-list">
        <h2>Bölümler</h2>
        <ul>
          {episodes.map(ep => (
            <li key={ep.id}>
              <strong>S{ep.season}E{ep.number}:</strong> {ep.name} 
              <span>(Puan: {ep.rating?.average || 'N/A'})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDetail;