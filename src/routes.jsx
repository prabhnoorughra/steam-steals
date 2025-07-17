import App from "./App";
import SearchPage from "./SearchPage";
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage";



const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <HomePage />},

            {path: "search", element: <SearchPage />},
        ],
    },
    {
        path: "*", 
        element: <ErrorPage />,
    },
];

export default routes