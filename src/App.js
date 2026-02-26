import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CoursesProvider } from './contexts/CoursesContext';

// Importar componentes com named exports
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { AulasPage } from './components/AulasPage';
import { SimuladosPage } from './components/SimuladosPage';
import { EstatisticasPage } from './components/EstatisticasPage';
import { ConfiguracoesPage } from './components/ConfiguracoesPage';
import { Sidebar } from './components/Sidebar';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
}

function AppContent() {
  const { user } = useAuth();

  // Se usuário está logado, mostrar dashboard com rotas protegidas
  if (user) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/aulas" element={<ProtectedRoute><AulasPage /></ProtectedRoute>} />
            <Route path="/simulados" element={<ProtectedRoute><SimuladosPage /></ProtectedRoute>} />
            <Route path="/estatisticas" element={<ProtectedRoute><EstatisticasPage /></ProtectedRoute>} />
            <Route path="/configuracoes" element={<ProtectedRoute><ConfiguracoesPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Se não está logado, mostrar home
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection onGetStarted={() => window.location.href = '/auth'} />
              <BenefitsSection />
              <PricingSection />
              <FAQSection />
              <CTASection onGetStarted={() => window.location.href = '/auth'} />
            </>
          }
        />
        <Route path="/auth" element={<AuthPage defaultMode="login" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CoursesProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </CoursesProvider>
    </ThemeProvider>
  );
}

export default App;