import './styles/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './providers/query-client';
import {RouterProvider} from "react-router-dom";
import {router} from "./providers/router.tsx";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
