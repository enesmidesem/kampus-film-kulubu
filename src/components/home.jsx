import React, { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';
import { reducer, initialState, ACTIONS } from '../reducer';
import SearchBox from './SearchBox';
import Filters from './Filters';
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';

// TVMaze Arama API Endpoint'i [cite: 26]
const API_URL = 'https://api.tvmaze.com/search/shows?q=';

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isLoading, isError, error, data, query, filters, pagination, watchlist } = state;

    // Veri çekme işlemi 
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: ACTIONS.FETCH_INIT });
            try {
                const result = await axios.get(`${API_URL}${query}`);
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: result.data });
            } catch (error) {
                dispatch({ type: ACTIONS.FETCH_FAILURE, payload: error.message });
            }
        };
        // Sadece query değiştiğinde API isteği at
        fetchData();
    }, [query]);

    useEffect(() => {
        try {
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        } catch (error) {
            console.error("localStorage'e yazılırken hata oluştu:", error);
        }
    }, [watchlist]); // Bağımlılık: Sadece 'watchlist' değiştiğinde çalışır

    // Filtreleme mantığı (client-side)
    const filteredData = useMemo(() => {
        return data
            .filter(item => {
                const show = item.show;

                // 1. KURAL: Puanı olmayanları (null, undefined veya 0) listeleme.
                if (!show.rating || !show.rating.average) {
                    return false;
                }

                // 2. KURAL: Puanı olanlar için filtreleri uygula
                const matchesGenre = filters.genre ? show.genres?.includes(filters.genre) : true;
                const matchesLang = filters.language ? show.language === filters.language : true;

                // Sadece puanı olanlar buraya geleceği için, minRating kontrolünü güvenle yapabiliriz.
                const matchesRating = show.rating.average >= filters.minRating;

                return matchesGenre && matchesLang && matchesRating;
            });
    }, [data, filters]);

    // Sayfalama mantığı (client-side)
    const paginatedData = useMemo(() => {
        const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
        const endIndex = startIndex + pagination.pageSize;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, pagination.currentPage, pagination.pageSize]);

    // Koşullu renderlama [cite: 20, 43]
    const renderContent = () => {
        if (isLoading) {
            return <div className="spinner">Yükleniyor...</div>; // [cite: 44]
        }
        if (isError) {
            return (
                <div className="error">
                    Hata oluştu: {error}
                    <button onClick={() => dispatch({ type: ACTIONS.SET_QUERY, payload: query })}>
                        Tekrar Dene
                    </button> {/* [cite: 45] */}
                </div>
            );
        }
        if (filteredData.length === 0) {
            return <div className="empty-state">Sonuç bulunamadı.</div>; // [cite: 46]
        }
        return (
            <TVList
                shows={paginatedData}
                dispatch={dispatch}
            />
        );
    };

    return (
        <div className="home-container">
            <header className="app-header">
                <h1>Kampüs Film Kulübü</h1>
                <SearchBox dispatch={dispatch} query={query} />

                <Filters dispatch={dispatch} filters={filters} />
                
            </header>

            <div className="main-content">
                <div className="shows-panel">
                    {renderContent()}
                    <Pagination
                        pagination={pagination}
                        totalResults={filteredData.length} // Toplam sonuç sayısı filtrelenmiş veriye göre olmalı
                        dispatch={dispatch}
                    />
                </div>
                <WatchlistPanel watchlist={watchlist} dispatch={dispatch} /> {/* [cite: 15] */}
            </div>
        </div>
    );
};

export default Home;