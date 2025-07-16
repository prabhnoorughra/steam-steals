import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Card from "./components/Card";


function SearchPage({handleAddToCart, searchTerm, cart}) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [gameResult, setGameResult] = useState([]);

    let empty = false;
    if(searchTerm === '' || gameResult.length === 0) {
        empty = true;
    }

    useEffect(() => { //searching for items to buy
        if(searchTerm != '') {
            setLoading(true);
            //const url1 = `https://www.cheapshark.com/api/1.0/games?title=${searchTerm}`;
            const url1 = `https://www.cheapshark.com/api/1.0/deals?title=${searchTerm}`; //prices and data of game from here
            const url2 = `https://api.isthereanydeal.com/games/lookup/v1?key=db2e4e21c81d1d62ccec52ac639f0d22b6d41e7e&appid=`;
            //url2 used for better images of games, only display games with valid SteamID's

            fetch(url1, {mode: "cors"})
            .then((response) => {
                if(response.status >= 400 || !response.ok) {
                    throw new Error("Server Error");
                }
                return response.json();
            })
            .then(async (response) => {
                const filtered = response.filter((game) => game.steamAppID != null);

                const promises = filtered.map(async (game) => {
                    const url3 = url2 + game.steamAppID;
                    const fetchITADResponse = await fetch(url3, {mode: "cors"});
                    const ITADresult = await fetchITADResponse.json();
                    if(ITADresult.found === false) {
                        return "remove me";
                    }
                    return {
                        id:        game.gameID,
                        name:      game.title,
                        price:     game.salePrice,
                        imageURL:  ITADresult.game.assets.boxart || ITADresult.game.assets.banner400,
                        ratingValue: game.steamRatingPercent,
                        ratingCount: game.steamRatingCount,
                    };
                });

                const results = await Promise.all(promises);
                const cleanResults = results.filter((game) => typeof(game) != "string");
                const seen = new Set();
                const uniqueGames = cleanResults.filter(game => {
                    if (seen.has(game.id)) {
                        return false;       // drop this duplicate
                    } else {
                        seen.add(game.id);
                        return true;        // keep the first occurrence
                    }
                });
                setGameResult(uniqueGames);
            })
            .catch((error) => {
                setError(error);
                console.log("Error is: ", error);
            })
            .finally(() => setLoading(false))
        }
    }, [searchTerm]);

    function sortRatingValue() {
        setGameResult(current => {
            return [...current].sort((a, b) => b.ratingValue - a.ratingValue);
        });
    }

    function sortRatingCount() {
        setGameResult(current => {
            return [...current].sort((a, b) => b.ratingCount - a.ratingCount);
        });
    }

    function sortPriceAscending() {
        setGameResult(current => {
            return [...current].sort((a, b) => b.price - a.price);
        });
    }

    function sortPriceDescending() {
        setGameResult(current => {
            return [...current].sort((a, b) => a.price - b.price);
        });
    }


    return(
        <>
            <SideBar ratingCount={sortRatingCount} ratingValue={sortRatingValue}
                priceHtoL={sortPriceDescending} priceLtoH={sortPriceAscending}
                key={searchTerm}
            />
            {loading && 
                <div className="loading">
                    Loading...
                </div>
            }
            {empty && !loading &&
                <div className="emptySearch">
                    <p>We Couldn't Find Any Games Matching Your Search Term.</p>
                    <p>Please Try Again!</p>
                </div>
            }
            {error != null && 
                <div className="error">
                    Network Error Encountered
                </div>
            }
            {!empty && !loading && !error &&
                <div className="searchResults">
                    {gameResult.map((game) => 
                    <Card key={game.id} gameID={game.id} name={game.name} 
                    imageURL={game.imageURL} lowestPrice={game.price} 
                    ratingValue={game.ratingValue} ratingCount={game.ratingCount}
                    handleClick={handleAddToCart} cart={cart}
                    />)}
                </div>
            }
        </>
    );
}


export default SearchPage