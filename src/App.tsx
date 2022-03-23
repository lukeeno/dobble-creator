import { createEffect, createSignal } from "solid-js";
import range from "lodash.range";

const originalSymbols = [
  "Anchor",
  "Apple",
  "Bomb",
  "Cactus",
  "Candle",
  "Carrot",
  "Cheese",
  "Chess knight",
  "Clock",
  "Clown",
  "Diasy flower",
  "Dinosaur",
  "Dolphin",
  "Dragon",
  "Exclamation mark",
  "Eye",
  "Fire",
  "Four leaf clover",
  "Ghost",
  "Green splats",
  "Hammer",
  "Heart",
  "Ice cube",
  "Igloo",
  "Key",
  "Ladybird",
  "Light bulb",
  "Lightning bolt",
  "Lock",
  "Maple leaf",
  "Milk bottle",
  "Moon",
  "No Entry sign",
  "Orange scarecrow man",
  "Pencil",
  "Purple bird",
  "Purple cat",
  "Purple dobble sign",
  "Question Mark",
  "Red lips",
  "Scissors",
  "Skull and crossbones",
  "Snowflake",
  "Snowman",
  "Spider",
  "Spider's web",
  "Sun",
  "Sunglasses",
  "Target",
  "Taxi",
  "Tortoise",
  "Treble clef",
  "Tree",
  "Water drop",
  "Dog",
  "Yin and Yang",
  "Zebra",
];

originalSymbols.sort();

function App() {
  const numberOfSymbolsOnCard = 8;
  const cards: number[][] = [];
  const n = numberOfSymbolsOnCard - 1;
  const numberOfCards = n ** 2 + n + 1;
  const [symbols, setSymbols] = createSignal(
    range(numberOfCards).map(() => "")
  );
  const [show, setShow] = createSignal(true);
  const [message, setMessage] = createSignal("");
  const [hover, setHover] = createSignal(-1);

  for (const i of range(n + 1)) {
    cards.push([1]);

    for (const j of range(n)) {
      cards[i].push(j + 1 + i * n + 1);
    }
  }

  for (const i of range(n)) {
    for (const j of range(n)) {
      cards.push([i + 2]);

      for (const k of range(n)) {
        const val = n + 1 + n * k + ((i * k + j) % n) + 1;
        cards[cards.length - 1].push(val);
      }
    }
  }

  function setSymbol(e: any, i: number) {
    const symbolList = symbols();
    symbolList[i] = e.target.value;
    symbolList.sort();
    setSymbols([...symbolList]);
  }

  function save() {
    localStorage.setItem("dobble-symbols", JSON.stringify(symbols()));
    setMessage("Successfully saved");
    setTimeout(() => setMessage(""), 3000);
  }

  function load() {
    const strItems = localStorage.getItem("dobble-symbols");
    if (!strItems) {
      return;
    }

    const items = JSON.parse(strItems);
    if (items) {
      setSymbols(items);

      setMessage("Successfully loaded");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  function loadOriginalSymbols() {
    setSymbols([...originalSymbols]);
  }

  function clear() {
    setSymbols(range(numberOfCards).map(() => ""));
  }

  createEffect(load, []);

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
            onClick={loadOriginalSymbols}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Load original symbols
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
            onClick={() => setShow(!show())}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            {show() ? "Hide" : "Show"}
          </button>
        </div>

        {message() && (
          <div className="bg-green-500 text-white p-4 rounded-lg">
            {message()}
          </div>
        )}

        {show() && (
          <div className="grid grid-cols-5 gap-2">
            {symbols().map((card, i) => {
              return (
                <input
                  className="w-full rounded-lg bg-white p-2"
                  type="text"
                  value={symbols()[i]}
                  onChange={(e) => setSymbol(e, i)}
                />
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-5 gap-2">
          {cards.map((card, i) => {
            return (
              <div className="rounded-lg bg-white py-2 px-1">
                {card.map((symbol) => (
                  <div
                    className={
                      (symbol === hover() ? "bg-purple-400" : "") +
                      " px-2 rounded"
                    }
                    onMouseEnter={() => setHover(symbol)}
                    onMouseLeave={() => setHover(-1)}
                  >
                    {symbols()[symbol - 1]}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
