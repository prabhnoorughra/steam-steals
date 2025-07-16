import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import SearchPage from './SearchPage';
import HomePage from './HomePage';
import NavBar from './components/NavBar';
import videoSrc from './assets/batman.mp4'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [searchPage, setSearchPage] = useState(false);


  function handleSearch(term) {
    setSearchTerm(term);
    setSearchPage(true);
  }

  function handleAddToCart(obj) {
    setCart(prev => [...prev, obj]);
  }

  function handleRemoveFromCart(obj) {
    setCart(cart.filter((game) => game.id != obj.id));
  }

  function handleHome() {
    setSearchPage(false);
    setSearchTerm('');
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      {!searchPage && 
        <video
                className="bg-video"
                autoPlay
                muted
                loop
                playsInline
                src={videoSrc}
        />
      }
      <>
        <NavBar handleSearch={handleSearch} cart={cart} handleRemove={handleRemoveFromCart}
            handleHome={handleHome} clearCart={clearCart}></NavBar>
        {searchPage &&
              <SearchPage handleAddToCart={handleAddToCart} searchTerm={searchTerm} cart={cart} />
        }
        {!searchPage &&
            <HomePage />
        }
      </>
    </>
  )
}

export default App
