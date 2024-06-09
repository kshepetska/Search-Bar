import React from 'react';
import { Coin } from '../coin';

interface TabButtonsProps {
  activeTab: 'All' | 'Favorites';
  setActiveTab: React.Dispatch<React.SetStateAction<'All' | 'Favorites'>>;
  setFilteredCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
  coins: Coin[];
  favorites: Coin[];
}

export const TabButtons: React.FC<TabButtonsProps> = ({
  activeTab,
  setActiveTab,
  setFilteredCoins,
  coins,
  favorites,
}) => (
  <div className="tab-buttons">
    <button
      className={activeTab === 'Favorites' ? 'active' : ''}
      onClick={() => {
        setActiveTab('Favorites');
        setFilteredCoins(favorites);
      }}
    >
      <span className="star">{'★'}</span>
      FAVORITES
    </button>

    <button
      className={activeTab === 'All' ? 'active' : ''}
      onClick={() => {
        setActiveTab('All');
        setFilteredCoins(coins);
      }}
    >
      ALL COINS
    </button>
  </div>
);

export default TabButtons;
