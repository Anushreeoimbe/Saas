import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />

        <div className="app-main">
          <Navbar />

          <main className="app-content">
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;