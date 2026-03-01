import React, { useState, useEffect } from 'react';
import { useInstructor } from '../contexts/InstructorContext';
import { useTheme } from '../contexts/ThemeContext';
import { InstructorSidebar } from '../components/InstructorSidebar';
import { Copy, Check, Trash2, Plus } from 'lucide-react';

export const InstructorInvitesPage = () => {
  const { instructor } = useInstructor();
  const { isDark } = useTheme();
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    loadInvites();
  }, []);

  const loadInvites = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('conduzauto_instrutor_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/invites/my-invites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar convites');
      }
      
      const data = await response.json();
      console.log('✅ [InstructorInvitesPage] Convites carregados:', data.invites);
      setInvites(data.invites || []);
    } catch (error) {
      console.error('❌ [InstructorInvitesPage] Erro:', error);
      alert('Erro ao carregar convites');
    } finally {
      setLoading(false);
    }
  };

  const generateInvite = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('conduzauto_instrutor_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/invites/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ [InstructorInvitesPage] Convite gerado:', data);
        alert(`✅ Convite gerado com sucesso!\n\n${data.inviteLink}`);
        loadInvites();
      } else {
        alert('❌ Erro ao gerar convite');
      }
    } catch (error) {
      console.error('❌ [InstructorInvitesPage] Erro:', error);
      alert('❌ Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (link, index) => {
    navigator.clipboard.writeText(link);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const revokeInvite = async (code) => {
    if (!window.confirm('Tem certeza que deseja revogar este convite?')) return;
    
    try {
      const token = sessionStorage.getItem('conduzauto_instrutor_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/invites/revoke/${code}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log('✅ [InstructorInvitesPage] Convite revogado');
        loadInvites();
      }
    } catch (error) {
      console.error('❌ [InstructorInvitesPage] Erro ao revogar:', error);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <InstructorSidebar />

      <div className="md:ml-64 pt-20 md:pt-0">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-6`}>
          <div className="max-w-7xl mx-auto">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Meus Convites 🎫
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Gere e gerencie convites para seus alunos
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={generateInvite}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-3 px-6 rounded-lg mb-8 flex items-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5" />
            {loading ? 'Gerando...' : 'Gerar Novo Convite'}
          </button>

          {invites.length === 0 ? (
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-8 text-center`}>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum convite gerado ainda. Clique em "Gerar Novo Convite" para começar!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {invites.map((invite, index) => (
                <div
                  key={invite.code}
                  className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Link do Convite:
                      </p>
                      <p className={`font-mono text-sm break-all ${isDark ? 'text-gray-400 bg-gray-700' : 'text-gray-600 bg-gray-100'} p-3 rounded`}>
                        {invite.link}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Usos
                        </p>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {invite.usageCount}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Expira em
                        </p>
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {new Date(invite.expiresAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => copyToClipboard(invite.link, index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        copied === index
                          ? 'bg-green-600 text-white'
                          : `${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`
                      }`}
                    >
                      {copied === index ? (
                        <>
                          <Check className="w-4 h-4" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copiar Link
                        </>
                      )}
                    </button>

                    {invite.isActive && (
                      <button
                        onClick={() => revokeInvite(invite.code)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          isDark ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-100 hover:bg-red-200 text-red-700'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" /> Revogar
                      </button>
                    )}

                    {!invite.isActive && (
                      <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                        ❌ Revogado
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorInvitesPage;