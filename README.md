# Steam Steals

A responsive React application that helps users discover the best Steam game deals across multiple platforms.  
Built with **React (Vite)** and **vanilla CSS**, the app fetches live pricing data from public APIs and allows users to search, filter, and save games to a personal cart (stored locally).

---

## Features

- **Search Games** – Search for Steam titles with real-time price lookups.  
- **Filter Results** – Narrow down games by store, price, and discount level.  
- **Responsive Design** – Fully responsive UI with custom CSS (no frameworks).  
- **React Router** – Navigate between pages seamlessly (e.g., Home, Deals, Cart).  
- **Cart with LocalStorage** – Add/remove games from a cart that persists across sessions.  
- **External APIs** – Integrates with:
  - [CheapShark API](https://apidocs.cheapshark.com/) for deals & store listings  
  - [IsThereAnyDeal API](https://isthereanydeal.com/) for information regarding the games 

---

## Tech Stack

- **React (Vite)** – Component-based frontend framework for speed & modularity  
- **Vanilla CSS** – Custom responsive styling without frameworks  
- **React Router** – Client-side routing  
- **LocalStorage** – Persistence for user cart  
- **Public APIs** – CheapShark + IsThereAnyDeal  

---

## Future Improvements
- Implement a custom backend to store Cart information and allow users to create/log into accounts
- Look for deals for games on third-party stores that may have better prices