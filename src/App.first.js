import './App.css';
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

const listItems = products.map(product =>
  <li
    key={product.id}
    style={{
      color: product.isFruit ? 'magenta' : 'darkgreen'
    }}
  >
    {product.title}
  </li>
);

function App() {
  return (
    <>
      <MyButton />
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
      <ul>{listItems}</ul>
      <div>
      <h1>Counters that update separately</h1>
      <MyButton2 />
      <MyButton2/>
    </div>
    </>
  );

  
}

function MyButton2() {
  const [count2, setCount2] = useState(0);

  function handleClick() {
    setCount2(count2 + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count2} times
    </button>
  );
}

export default App;
