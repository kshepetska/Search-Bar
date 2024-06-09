import React from 'react';
import { Coin } from '../coin';

export const CoinsList: React.FC<{
  filteredCoins: Coin[];
  toggleFavorite: (coin: Coin) => void;
  favorites: Coin[];
  removedItem: Coin | null;
}> = ({ filteredCoins, toggleFavorite, favorites, removedItem }) => {
  const coinsToShow = removedItem
    ? filteredCoins.filter(coin => coin !== removedItem)
    : filteredCoins;

  return (
    <div className="coins-list">
      <ul>
        {coinsToShow.map(coin => (
          <li className="coin" key={coin.name}>
            <span className="star" onClick={() => toggleFavorite(coin)}>
              {favorites.includes(coin) ? '★' : '☆'}
            </span>
            <span className="coin-name">{coin.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
