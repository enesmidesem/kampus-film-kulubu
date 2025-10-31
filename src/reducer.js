export const ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_QUERY: 'SET_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_WATCHLIST: 'SET_WATCHLIST', // Bu PDF'te var ancak kullanımı belirsiz, ADD/REMOVE daha mantıklı.
  SET_PAGE_SIZE: 'SET_PAGE_SIZE',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
  REMOVE_WATCHLIST: 'REMOVE_WATCHLIST',
  CLEAR_WATCHLIST: 'CLEAR_WATCHLIST',
  SET_PAGE: 'SET_PAGE' // Sayfalama için ekliyoruz
};

const getInitialWatchlist = () => {
  try {
    const storedWatchlist = localStorage.getItem('watchlist');
    // Eğer localStorage'de veri varsa onu parse et, yoksa boş dizi döndür
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  } catch (error) {
    // Hata olursa (örn: bozuk veri) konsola yazdır ve boş dizi döndür
    console.error("localStorage'den okunurken hata oluştu:", error);
    return [];
  }
};

export const initialState = {
  isLoading: true, // Açılışta veri yükleneceği için true başlıyoruz
  isError: false,
  error: null,
  data: [], // API'den gelen tüm sonuçlar
  query: 'friends', // Açılıştaki varsayılan sorgu
  filters: {
    genre: '',
    language: '',
    minRating: 0
  },
  watchlist: getInitialWatchlist(), // Boş dizi '[]' yerine bu fonksiyonu çağırdık
  pagination: {
    currentPage: 1,
    pageSize: 6, // Her sayfada 6 dizi olacak
    totalResults: 0
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        pagination: {
          ...state.pagination,
          totalResults: action.payload.length,
          currentPage: 1 // Yeni veri setinde 1. sayfaya dön
        }
      };
    case ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload // Hata mesajını sakla
      };
    case ACTIONS.SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1 } // Filtre değişince 1. sayfaya dön
      };
    case ACTIONS.ADD_WATCHLIST:
      // Zaten ekli değilse ekle
      if (!state.watchlist.find(item => item.show.id === action.payload.show.id)) {
        return {
          ...state,
          watchlist: [...state.watchlist, action.payload]
        };
      }
      return state;
    case ACTIONS.REMOVE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.show.id !== action.payload) // payload olarak ID bekliyoruz
      };
    case ACTIONS.CLEAR_WATCHLIST:
        return {
            ...state,
            watchlist: []
        };
    case ACTIONS.SET_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload
        }
      };
    case ACTIONS.SET_PAGE_SIZE:
        return {
            ...state,
            pagination: {
                ...state.pagination,
                pageSize: action.payload,
                currentPage: 1 // Sayfa boyutu değişince 1'e dön
            }
        };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};