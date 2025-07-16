import { useState } from "react";
import ascending from '../assets/graph-up-arrow.svg'
import descending from '../assets/graph-down-arrow.svg'
import most from '../assets/chevron-double-up.svg'
import best from '../assets/star-fill.svg'

function SideBar({ratingValue, ratingCount, priceLtoH, priceHtoL}) {
    const [active, setActive] = useState(null);

    return (
        <div className="sideBar">
            <div>Filters</div>
            <div onClick={() => {
                ratingValue();
                setActive("highest");
            }} className = {active === "highest" ? "option active" : "option"}>
                <img src={best}></img>
                <span>Highest Ratings</span>
                
            </div>
            <div onClick={() => {
                ratingCount();
                setActive("most");
            }} className = {active === "most" ? "option active" : "option"}>
                <img src={most}></img>
                <span>Most Ratings</span>
            </div>
            <div onClick={() => {
                priceLtoH();
                setActive("hTol");
            }} className = {active === "hTol" ? "option active" : "option"}>
                <img src={descending}></img>
                <span>Price High to Low</span>
            </div>
            <div onClick={() => {
                priceHtoL();
                setActive("lToh");
            }} className = {active === "lToh" ? "option active" : "option"}>
                <img src={ascending}></img>
                <span>Price Low to High</span>
            </div>
        </div>
    );
}

export default SideBar