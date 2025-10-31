import React from 'react';
import { ACTIONS } from '../reducer';

// Sayfa numarası dizisini oluşturan yardımcı fonksiyon
const getPaginationWindow = (currentPage, totalPages, maxPagesToShow = 5) => {
  // 1. Durum: Toplam sayfa, göstermek istediğimizden azsa (örn: 3 sayfa var)
  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3]
  }

  // 2. Durum: Toplam sayfa çoksa (kayan pencere)
  // Pencerenin başlaması gereken sayfayı hesapla
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  
  // Pencerenin bitmesi gereken sayfayı hesapla
  let endPage = startPage + maxPagesToShow - 1;

  // Eğer bitiş sayfası toplam sayfayı aşıyorsa (sona dayandık)
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - maxPagesToShow + 1; // Başlangıcı geriye çek
  }

  // Başlangıç ve bitişe göre diziyi oluştur
  return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
};

const Pagination = ({ pagination, totalResults, dispatch }) => {
  const { currentPage, pageSize } = pagination;
  const totalPages = Math.ceil(totalResults / pageSize);

  // Hiç sayfa yoksa veya sadece 1 sayfa varsa, sayfalama bileşenini gösterme
  if (totalPages < 1) return null;

  const goToPage = (page) => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: page });
  };

  // Gösterilecek sayfa numaralarını hesapla (örn: [2, 3, 4, 5, 6])
  const pageNumbers = getPaginationWindow(currentPage, totalPages, 5); // Max 5 sayfa

  return (
    <div className="pagination">
      {/* PDF'te istenen "İlk" ve "Geri" butonları */}
      <button 
        className="pagination-item"
        onClick={() => goToPage(1)} 
        disabled={currentPage === 1}
      >
        İlk
      </button>
      <button 
        className="pagination-item"
        onClick={() => goToPage(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Geri
      </button>

      {/* --- YENİ TIKLANABİLİR SAYFA NUMARALARI --- */}
      {pageNumbers.map(page => (
        <button
          key={page}
          // Mevcut sayfa ise 'selected' sınıfını ekle
          className={`pagination-item ${page === currentPage ? 'selected' : ''}`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}
      {/* --- SAYFA NUMARALARI BİTTİ --- */}

      {/* PDF'te istenen "İleri" ve "Son" butonları */}
      <button 
        className="pagination-item"
        onClick={() => goToPage(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        İleri
      </button>
      <button 
        className="pagination-item"
        onClick={() => goToPage(totalPages)} 
        disabled={currentPage === totalPages}
      >
        Son
      </button>
    </div>
  );
};

export default Pagination;