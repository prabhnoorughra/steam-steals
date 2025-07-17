import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchPage from './SearchPage';
import HomePage from './HomePage';
import NavBar from './components/NavBar';
import videoSrc from './assets/batman.mp4'
import './App.css'

function App() {
  const location = useLocation();
  const [cart, setCart] = useState(() => {
    // initialize from localStorage (if present)
    const json = localStorage.getItem("cart");
    return json ? JSON.parse(json) : [];
  });
  //any time `cart` changes, write it out
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  //above helps keep the cart data safe when users search for a game with the URl rather then the text input
  
  const navigate = useNavigate();

  function handleAddToCart(obj) {
    setCart(prev => [...prev, obj]);
  }

  function handleRemoveFromCart(obj) {
    setCart(cart.filter((game) => game.id != obj.id));
  }

  function handleHome() {
    navigate('/');
  }

  function clearCart() {
    setCart([]);
  }

  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && (
        <video
          className="bg-video"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        />
      )}
      <>
        <NavBar cart={cart} handleRemove={handleRemoveFromCart}
            handleHome={handleHome} clearCart={clearCart}></NavBar>
        <Outlet
          context={{
            cart,
            handleAddToCart,
          }}
        />
      </>
    </>
  )
}

export default App
