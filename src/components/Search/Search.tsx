import React, { useState, useEffect, useRef } from 'react';
import { getCoins } from '../../api';
import { Coin } from '../../coin';
import { CoinsList } from '../CoinList';
import { TabButtons } from '../TabButtons';
import SearchIcon from '../../img/search.svg';
import './Search.css';

const Search: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<Coin[]>([]);
  const [removedItem, setRemovedItem] = useState<Coin | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [isSearchWindowVisible, setSearchWindowVisible] = useState(false);
  const [isInputClicked, setInputClicked] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Favorites'>('All');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinsData = await getCoins();
        setCoins(coinsData);
        setFilteredCoins(coinsData);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filterFunc = (coin: Coin) =>
      coin.name && coin.name.toLowerCase().includes(lowerCaseSearchTerm);

    const filtered = activeTab === 'Favorites' ? favorites.filter(filterFunc) : coins.filter(filterFunc);

    setFilteredCoins(filtered);
  }, [searchTerm, coins, favorites, activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchWindowVisible && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchWindowVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchWindowVisible]);

  const clearSearchQuery = () => setSearchTerm('');

  const handleSearchClick = () => {
    setActiveTab('All');
    setSearchWindowVisible(true);
  };

  const toggleFavorite = (coin: Coin) => {
    const updatedFavorites = favorites.includes(coin)
      ? favorites.filter(fav => fav !== coin)
      : [...favorites, coin];

    setFavorites(updatedFavorites);
    if (favorites.includes(coin)) {
      setRemovedItem(coin);
      setTimeout(() => setRemovedItem(null), 500);
    }
  };

  return (
    <div className="search-container">
      <button
        className={`search-button ${isSearchWindowVisible ? 'search-button-active' : ''}`}
        onClick={handleSearchClick}
      >
        <img className="search-icon" src={SearchIcon} alt="search icon" />
        SEARCH
      </button>
      {isSearchWindowVisible && (
        <div ref={searchRef} className="search-window">
          <div className="search-query">
            <img className="search-icon" src={SearchIcon} alt="search icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onClick={() => setInputClicked(true)}
            />
            {isInputClicked && searchTerm && (
              <button className="clear-button" onClick={clearSearchQuery}>
                &#x2716;
              </button>
            )}
          </div>
          <TabButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setFilteredCoins={setFilteredCoins}
            coins={coins}
            favorites={favorites}
          />
          <CoinsList
            filteredCoins={filteredCoins}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            removedItem={removedItem}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
