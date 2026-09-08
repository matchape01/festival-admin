import { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginModalProps {
  onLogin: (password: string) => void;
}

export function LoginModal({ onLogin }: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin(password);
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Lock size={48} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Back Office Festival</h2>
        <p className="text-gray-600 text-center mb-6">Connectez-vous pour accéder à l'administration</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Entrez le mot de passe"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          Mot de passe: admin123
        </p>
      </div>
    </div>
  );
}
