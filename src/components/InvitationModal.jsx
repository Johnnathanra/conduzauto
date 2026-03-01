import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Copy, Plus, X, Check } from 'lucide-react';
import { apiInstrutor } from '../api';

export default function InvitationModal({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchInvitations();
    }
  }, [isOpen]);

  const fetchInvitations = async () => {
    setLoading(true);
    setError('');
    try {
      const token = sessionStorage.getItem('conduzauto_instrutor_token');
      console.log('📋 [InvitationModal] Buscando convites ativos');
      
      const response = await apiInstrutor.get('/invites/my-invites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('✅ [InvitationModal] Convites carregados:', response.data.invites);
      setInvitations(response.data.invites || []);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao carregar convites';
      console.error('❌ [InvitationModal] Erro:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const generateInvitation = async () => {
    setGenerating(true);
    setError('');
    try {
      const token = sessionStorage.getItem('conduzauto_instrutor_token');
      console.log('🎫 [InvitationModal] Gerando novo convite');
      
      const response = await apiInstrutor.post('/invites/generate', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('✅ [InvitationModal] Convite gerado:', response.data);
      
      // Adicionar novo convite à lista
      const newInvite = {
        slug: response.data.slug,
        code: response.data.code,
        link: response.data.inviteLink,
        isActive: true,
        createdAt: new Date().toISOString(),
        expiresAt: response.data.expiresAt,
        usageCount: 0,
        usagesRemaining: null
      };
      
      setInvitations([newInvite, ...invitations]);
      setError('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao gerar convite';
      console.error('❌ [InvitationModal] Erro ao gerar:', errorMsg);
      setError(errorMsg);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (link, code) => {
    navigator.clipboard.writeText(link);
    console.log('📋 [InvitationModal] Link copiado:', code);
    setCopied(code);
    setTimeout(() => setCopied(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl max-h-96 overflow-y-auto p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Gerenciar Convites
          </h2>
          <button 
            onClick={onClose} 
            className={`p-1 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className={`mb-4 p-3 rounded-lg border ${isDark ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-300 text-red-700'}`}>
            <p className="text-sm font-semibold">Erro: {error}</p>
          </div>
        )}

        {/* Botão Gerar Novo Convite */}
        <button
          onClick={generateInvitation}
          disabled={generating}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg mb-6 transition-all"
        >
          {generating ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Gerar Novo Convite</span>
            </>
          )}
        </button>

        {/* Lista de Convites */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-6 h-6 border-3 border-orange-600 border-t-transparent rounded-full"></div>
            <span className={`ml-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Carregando convites...</span>
          </div>
        ) : invitations.length === 0 ? (
          <div className={`p-6 rounded-lg text-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Nenhum convite ativo. Gere um novo para começar!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {invitations.map((inv) => (
              <div 
                key={inv.code} 
                className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Informações do Convite */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <code className={`text-sm font-mono font-bold px-2 py-1 rounded ${isDark ? 'bg-gray-900 text-orange-400' : 'bg-gray-200 text-orange-600'}`}>
                        {inv.code}
                      </code>
                      {inv.usageCount > 0 && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Usado ({inv.usageCount})
                        </span>
                      )}
                      {!inv.isActive && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">
                          Revogado
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Criado em {new Date(inv.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      Expira em {new Date(inv.expiresAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  {/* Botão Copiar Link */}
                  <button
                    onClick={() => copyToClipboard(inv.link, inv.code)}
                    disabled={!inv.isActive || inv.usageCount > 0}
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg font-semibold transition-all ${
                      !inv.isActive || inv.usageCount > 0
                        ? isDark
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                    title={!inv.isActive ? 'Convite revogado' : inv.usageCount > 0 ? 'Convite já foi utilizado' : 'Copiar link de convite'}
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">
                      {copied === inv.code ? 'Copiado!' : 'Copiar'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={`mt-6 p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 <strong>Dica:</strong> Copie o link e compartilhe com seus alunos. Quando clicarem, serão vinculados automaticamente à sua conta.
          </p>
        </div>
      </div>
    </div>
  );
}
