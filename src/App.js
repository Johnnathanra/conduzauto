import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { InstructorProvider, useInstructor } from './contexts/InstructorContext';
import { CoursesProvider } from './contexts/CoursesContext';

// Componentes públicos
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { AuthPage } from './components/AuthPage';

// Componentes de aluno
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AulasPage } from './components/AulasPage';
import { SimuladosPage } from './components/SimuladosPage';
import { EstatisticasPage } from './components/EstatisticasPage';
import { ConfiguracoesPage } from './components/ConfiguracoesPage';

// Componentes de instrutor
import { InstructorSidebar } from './components/InstructorSidebar';
import { InstructorAuthPage } from './components/InstructorAuthPage';
import { InstructorDashboard } from './components/InstructorDashboard';
import { InstructorSettingsPage } from './components/InstructorSettingsPage';

// Rota protegida para alunos
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

// Rota protegida para instrutores
function ProtectedInstructorRoute({ children }) {
  const { instructor, loading } = useInstructor();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return <Navigate to="/instructor/auth" replace />;
  }

  return children;
}

function AppContent() {
  const { user, loading: studentLoading } = useAuth();
  const { instructor, loading: instructorLoading } = useInstructor();

  const loading = studentLoading || instructorLoading;

  console.log('📊 [AppContent] user:', user ? 'Logado' : 'Não logado');
  console.log('📊 [AppContent] instructor:', instructor ? 'Logado' : 'Não logado');
  console.log('📊 [AppContent] loading:', loading);

  // 🔴 NÃO renderize NADA enquanto carrega
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se instrutor está logado, mostrar dashboard do instrutor
  if (instructor) {
    console.log('🎓 [AppContent] Renderizando dashboard do instrutor');
    return (
      <div className="flex">
        <InstructorSidebar />
        <main className="flex-1 md:ml-64">
          <Routes>
            <Route path="/instructor/dashboard" element={<ProtectedInstructorRoute><InstructorDashboard /></ProtectedInstructorRoute>} />
            <Route path="/instructor/settings" element={<ProtectedInstructorRoute><InstructorSettingsPage /></ProtectedInstructorRoute>} />
            <Route path="/instructor/auth" element={<InstructorAuthPage />} />
            <Route path="*" element={<Navigate to="/instructor/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Se aluno está logado, mostrar dashboard do aluno
  if (user) {
    console.log('👨 [AppContent] Renderizando dashboard do aluno');
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
            <Route path="/auth" element={<AuthPage defaultMode="login" />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Se não está logado, mostrar home pública
  console.log('🏠 [AppContent] Renderizando home pública');
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
        <Route path="/instructor/auth" element={<InstructorAuthPage />} />
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
          <InstructorProvider>
            <Router>
              <AppContent />
            </Router>
          </InstructorProvider>
        </AuthProvider>
      </CoursesProvider>
    </ThemeProvider>
  );
}

export default App;