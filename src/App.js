import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { StudentProvider, useStudent } from './contexts/StudentContext';
import { InstructorProvider, useInstructor } from './contexts/InstructorContext';
import { CoursesProvider } from './contexts/CoursesContext';

// Componentes Públicos
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';

// Páginas de Autenticação
import StudentLoginPage from './pages/StudentLoginPage';
import StudentSignupPage from './pages/StudentSignupPage';
import { InstructorAuthPage } from './components/InstructorAuthPage';
import InviteLandingPage from './pages/InviteLandingPage';

// Componentes de Aluno
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AulasPage } from './components/AulasPage';
import { SimuladosPage } from './components/SimuladosPage';
import { EstatisticasPage } from './components/EstatisticasPage';
import { ConfiguracoesPage } from './components/ConfiguracoesPage';

// Componentes de Instrutor
import { InstructorSidebar } from './components/InstructorSidebar';
import { InstructorDashboard } from './components/InstructorDashboard';
import { InstructorSettingsPage } from './components/InstructorSettingsPage';
import { InstructorInvitesPage } from './pages/InstructorInvitesPage';

function AppContent() {
  const { user, loading: studentLoading } = useStudent();
  const { instructor, loading: instructorLoading } = useInstructor();
  const location = useLocation();
  const loading = studentLoading || instructorLoading;

  console.log('📊 [AppContent] studentLoading:', studentLoading, '| instructorLoading:', instructorLoading);
  console.log('📊 [AppContent] user:', user ? '✅' : '❌');
  console.log('📊 [AppContent] instructor:', instructor ? '✅' : '❌');
  console.log('📊 [AppContent] current path:', location.pathname);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Verificar se é rota de convite (sem autenticação necessária)
  const isInvitePage = location.pathname.match(/^\/join-instructor\/[^/]+\/[^/]+$/);
  if (isInvitePage) {
    console.log('📧 [AppContent] Renderizando PÁGINA DE CONVITE');
    return (
      <Routes>
        <Route path="/join-instructor/:slug/:code" element={<InviteLandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Instrutor logado
  if (instructor) {
    console.log('👨‍🏫 [AppContent] Renderizando DASHBOARD DO INSTRUTOR');
    return (
      <div className="flex">
        <InstructorSidebar />
        <main className="flex-1 md:ml-64">
          <Routes>
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/settings" element={<InstructorSettingsPage />} />
            <Route path="/instructor/invites" element={<InstructorInvitesPage />} />
            <Route path="/instructor/auth" element={<InstructorAuthPage />} />
            <Route path="*" element={<Navigate to="/instructor/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Aluno logado
  if (user) {
    console.log('👨 [AppContent] Renderizando DASHBOARD DO ALUNO');
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aulas" element={<AulasPage />} />
            <Route path="/simulados" element={<SimuladosPage />} />
            <Route path="/estatisticas" element={<EstatisticasPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Público (não autenticado)
  console.log('🏠 [AppContent] Renderizando HOME PÚBLICA');
  return (
    <>
      <Header />
      <Routes>
        {/* Rotas de autenticação SEM footer */}
        <Route path="/auth" element={<StudentLoginPage />} />
        <Route path="/signup" element={<StudentSignupPage />} />
        <Route path="/instructor/auth" element={<InstructorAuthPage />} />

        {/* Rota home COM footer */}
        <Route
          path="/"
          element={
            <>
              <HeroSection onGetStarted={() => window.location.href = '/signup'} />
              <BenefitsSection />
              <PricingSection />
              <FAQSection />
              <CTASection onGetStarted={() => window.location.href = '/signup'} />
              <Footer />
            </>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <CoursesProvider>
          <StudentProvider>
            <InstructorProvider>
              <AppContent />
            </InstructorProvider>
          </StudentProvider>
        </CoursesProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;