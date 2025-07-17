import PropTypes from "prop-types";

function Card({gameID, name, imageURL, lowestPrice, handleClick, ratingValue, ratingCount, cart}) {
    let added = false;
    for(const game of cart) {
        if(game.id === gameID) {
            added = true;
        }
    }

    function onClick() {
        const gameObj = {
            id: gameID,
            name: name,
            imageURL: imageURL,
            price: +lowestPrice
        }
        handleClick(gameObj);
    }

    return (
        <div className="card">
            <img src={imageURL}></img>
            <div className="cardActions">
                {!added && <button onClick={onClick} className="cardAdd">
                    Add to Cart
                </button>}
                {added && <div className="cardAdded">
                    Added
                </div>}
                <div className="cardPrice">
                    {lowestPrice}
                </div>
            </div>
            <div className="cardSteamStats">
                <div className={ratingValue >= 80 ? "cardRating great" : 
                    ratingValue >= 70 ? "cardRating good" :
                    ratingValue >= 40 ? "cardRating mid" :
                    ratingValue >= 20 ? "cardRating bad" :
                    "cardRating horrible"
                }>
                    <span className="ratingLabel">Rating:</span> {ratingValue}%
                    </div>
                <div className="cardRatings">Ratings: {ratingCount}</div>
            </div>
            <div className="cardName">{name}</div>
        </div>
    );
}


Card.propTypes = {
    gameID:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name:         PropTypes.string.isRequired,
    imageURL:     PropTypes.string.isRequired,
    lowestPrice:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleClick:  PropTypes.func.isRequired,
    ratingValue:  PropTypes.number.isRequired,
    ratingCount:  PropTypes.number.isRequired,
    cart:         PropTypes.arrayOf(PropTypes.shape({
        id:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name:     PropTypes.string.isRequired,
        price:    PropTypes.number.isRequired,
        imageURL:   PropTypes.string.isRequired
    })).isRequired,
};


export default Card