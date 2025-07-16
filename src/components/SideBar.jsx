import { useState } from "react";

function SideBar({ratingValue, ratingCount, priceLtoH, priceHtoL}) {
    const [active, setActive] = useState(null);

    return (
        <div className="sideBar">
            <div>Filters</div>
            <div onClick={() => {
                ratingValue();
                setActive("highest");
            }} className = {active === "highest" ? "option active" : "option"}>
                Highest Ratings</div>
            <div onClick={() => {
                ratingCount();
                setActive("most");
            }} className = {active === "most" ? "option active" : "option"}>
                Most Ratings</div>
            <div onClick={() => {
                priceLtoH();
                setActive("hTol");
            }} className = {active === "hTol" ? "option active" : "option"}>
                Price High to Low</div>
            <div onClick={() => {
                priceHtoL();
                setActive("lToh");
            }} className = {active === "lToh" ? "option active" : "option"}>
                Price Low to High</div>
        </div>
    );
}

export default SideBar