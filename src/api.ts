import { Coin } from './coin';

const API_URL = 'https://api-eu.okotoki.com/coins';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getCoins(): Promise<Coin[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    })
    .then((data: string[]) =>
      data.filter(coin => coin).map((coin: string) => ({ name: coin })),
    );
}
