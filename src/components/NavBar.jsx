import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import searchIcon from '../assets/search.svg'
import cartIcon from '../assets/cart3.svg'
import steam from '../assets/steamTransparent.png'



function NavBar({cart, handleRemove, handleHome, clearCart}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isCartOpen, setCartOpen] = useState(false);

    const paramQuery = searchParams.get("query") ?? "";
    const [query, setQuery] = useState(paramQuery);

    useEffect(() => {
        setQuery(paramQuery);
    }, [paramQuery]);

    const navigate = useNavigate();

    let totalPrice = 0;
    for(const game of cart) {
        totalPrice += game.price;
    }

    const prettyPrice = totalPrice.toFixed(2);

    function onSubmit(e) {
        e.preventDefault();
        navigate(`/search`);
        setSearchParams({query: query});
    }

    function onClick(obj) {
        handleRemove(obj);
    }

    function onHomeClick() {
        handleHome();
        setQuery("");
    }

    return (
        <>
            <div className="navBar">
                <div className="logo" onClick={onHomeClick}>
                    <img src={steam}></img>
                    <div className="logoText">Steam Steals!</div>
                </div>
                <form className="searchbar" onSubmit={onSubmit}>
                    <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
                    <button type='submit' className='searchbtn'>
                        <img src={searchIcon}></img>
                    </button>
                </form>
                <div className="navButtons">
                    <img src={cartIcon} onClick={() => setCartOpen(true)}/>
                    <div className="itemCount">{cart.length}</div>
                    {console.log(cart)}
                </div>
            </div>

             {/* Cart sidebar modal */}
            {isCartOpen && (
                <div className="cartOverlay" onClick={() => setCartOpen(false)}>
                <div className="cart-modal" onClick={e => e.stopPropagation()}>
                    {cart.length === 1 ? (
                        <h2 className='cartTitle'>{cart.length} Game</h2>
                    ) : (
                        <h2 className='cartTitle'>{cart.length} Games</h2>
                    )}
                    {cart.length === 0 ? ( 
                        <div className="emptyCart">
                            <div className="emptyText">Add a Game to Your Cart!</div>
                            <div className='emptyTotal'>
                                Total: ${prettyPrice}
                            </div>
                        </div>
                    ) : (
                    <div className='fullCart'>
                        <ul>
                            {cart.map((game) => (
                            <li key={game.id} className='cartCard'>
                                <img src={game.imageURL} alt={game.name} width={40} />
                                <div className="cartCardName">{game.name}</div>
                                <div className="cartCardActions">
                                    <div className="cartCardPrice">${game.price.toFixed(2)}</div>
                                    <button className="removeCard" onClick={() => onClick(game)}>🗑️</button>
                                </div>
                            </li>
                            ))}
                        </ul>
                        <div className='cartActions'>
                            <div className="cartPrice">Total: ${prettyPrice}</div>
                            <button className="clearCart" onClick={clearCart}>Clear Cart</button>
                        </div>
                    </div>
                    )}
                    <button className='cartClose' onClick={() => setCartOpen(false)}>✖</button>
                </div>
                </div>
            )}
        </>
    );
}


export default NavBar