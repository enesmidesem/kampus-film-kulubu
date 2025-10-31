# Kampüs Film Kulübü (React + Vite)

[cite_start]Bu proje, Süleyman Demirel Üniversitesi Film Kulübü için [cite: 3] React ve Vite kullanılarak geliştirilmiş bir dizi arama uygulamasıdır. [cite_start]Proje, [TVMaze API'sini] [cite: 24] [cite_start]kullanarak dizileri arar [cite: 26][cite_start], filtreler ve kullanıcıların "Gösterime Girecekler" listesi oluşturmasına olanak tanır[cite: 4, 34].

## 🚀 Canlı Demo (Vercel)

Projenin canlı demosuna buradan ulaşabilirsiniz:

**[https://kampus-film-kulubu-jet3.vercel.app/](https://kampus-film-kulubu-jet3.vercel.app/)**

---

## 🛠️ Kullanılan Teknolojiler

* **React (Vite):** Modern bir JavaScript kütüphanesi ve hızlı geliştirme ortamı.
* [cite_start]**React Hooks:** `useReducer` (state yönetimi için) [cite: 10][cite_start], `useEffect` (veri çekme için) [cite: 9] ve `useMemo` (filtreleme/sayfalama optimizasyonu için).
* [cite_start]**React Router:** Detay sayfaları (`/show/:id`) arasında gezinme için[cite: 17].
* [cite_start]**Axios:** [TVMaze API'sinden] [cite: 24] [cite_start]veri çekmek için kullanılan HTTP istemcisi[cite: 8].
* **LocalStorage:** "Gösterime Girecekler" listesini sayfa yenilendiğinde kaybolmaması için tarayıcıda saklama.
* **CSS:** Modern, duyarlı ve demo sitesine benzer bir arayüz tasarımı.

