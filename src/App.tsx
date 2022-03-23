import { useEffect, useState } from 'react';
import _ from 'lodash';

const originalSymbols = [
  'Anchor',
  'Apple',
  'Bomb',
  'Cactus',
  'Candle',
  'Carrot',
  'Cheese',
  'Chess knight',
  'Clock',
  'Clown',
  'Diasy flower',
  'Dinosaur',
  'Dolphin',
  'Dragon',
  'Exclamation mark',
  'Eye',
  'Fire',
  'Four leaf clover',
  'Ghost',
  'Green splats',
  'Hammer',
  'Heart',
  'Ice cube',
  'Igloo',
  'Key',
  'Ladybird',
  'Light bulb',
  'Lightning bolt',
  'Lock',
  'Maple leaf',
  'Milk bottle',
  'Moon',
  'No Entry sign',
  'Orange scarecrow man',
  'Pencil',
  'Purple bird',
  'Purple cat',
  'Purple dobble sign',
  'Question Mark',
  'Red lips',
  'Scissors',
  'Skull and crossbones',
  'Snowflake',
  'Snowman',
  'Spider',
  "Spider's web",
  'Sun',
  'Sunglasses',
  'Target',
  'Taxi',
  'Tortoise',
  'Treble clef',
  'Tree',
  'Water drop',
  'Dog',
  'Yin and Yang',
  'Zebra',
];

function App() {
  const numberOfSymbolsOnCard = 8;
  const cards: number[][] = [];
  const n = numberOfSymbolsOnCard - 1;
  const numberOfCards = n ** 2 + n + 1;
  const [symbols, setSymbols] = useState(_.range(numberOfCards).map(() => ''));
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');

  for (const i of _.range(n + 1)) {
    cards.push([1]);

    for (const j of _.range(n)) {
      cards[i].push(j + 1 + i * n + 1);
    }
  }

  for (const i of _.range(n)) {
    for (const j of _.range(n)) {
      cards.push([i + 2]);

      for (const k of _.range(n)) {
        const val = n + 1 + n * k + ((i * k + j) % n) + 1;
        cards[cards.length - 1].push(val);
      }
    }
  }

  function setSymbol(e: any, i: number) {
    symbols[i] = e.target.value;
    setSymbols([...symbols]);
  }

  function save() {
    localStorage.setItem('symbols', JSON.stringify(symbols));
    setMessage('Successfully saved');
    setTimeout(() => setMessage(''), 3000);
  }

  function load() {
    const strItems = localStorage.getItem('symbols');
    if (!strItems) {
      return;
    }

    const items = JSON.parse(strItems);
    if (items) {
      setSymbols(items);

      setMessage('Successfully loaded');
      setTimeout(() => setMessage(''), 3000);
    }
  }

  function clear() {
    setSymbols(_.range(numberOfCards).map(() => ''));
  }

  useEffect(load, []);

  return (
    <main className="bg-gray-200">
      <div className="mx-auto max-w-screen-lg p-4 min-h-screen space-y-4">
        <h1 className="text-2xl pt-8">Dobble Creator</h1>

        <div className="space-x-2">
          <button
            onClick={clear}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Clear
          </button>
          <button
            onClick={save}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </button>
          <button
            onClick={load}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Load
          </button>
          <button
            onClick={() => setShow(!show)}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>

        {message && (
          <div className="bg-green-500 text-white p-4 rounded-lg">
            {message}
          </div>
        )}

        {show && (
          <div className="grid grid-cols-5 gap-2">
            {symbols.map((card, i) => {
              return (
                <input
                  key={i}
                  className="w-full rounded-lg bg-white p-2"
                  type="text"
                  value={symbols[i]}
                  onChange={(e) => setSymbol(e, i)}
                />
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-5 gap-2">
          {cards.map((card, i) => {
            return (
              <div key={i} className="rounded-lg bg-white p-2">
                {card.map((symbol) => [symbols[symbol - 1], <br />])}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
