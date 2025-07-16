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



export default Card