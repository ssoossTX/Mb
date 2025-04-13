import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { BrowserRouter as Router } from 'react-router-dom';


// Настройка базового пути для GitHub Pages
const basePath = import.meta.env.MODE === 'production' ? '/Mb/' : '/';

// Создаем корневой элемент и рендерим приложение
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router basename={basePath}> {/* Added Router with basename */}
      <App />
    </Router>
  </QueryClientProvider>
);