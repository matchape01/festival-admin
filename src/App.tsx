import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginModal } from './components/Auth/LoginModal';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Resources } from './pages/Resources';
import { Workshops } from './pages/Workshops';
import { Planning } from './pages/Planning';
import { Volunteers } from './pages/Volunteers';
import './App.css';

function App() {
  const { isAuthenticated, loading, login, logout } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <LoginModal onLogin={login} />;
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onLogout={logout} />
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/volunteers" element={<Volunteers />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
