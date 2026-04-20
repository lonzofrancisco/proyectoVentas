import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [businessSlug, setBusinessSlug] = useState('');

  useEffect(() => {
    if (!loading && user) {
      navigate(`/${user.businessSlug}`);
    }
  }, [user, loading, navigate]);

  const handleAccessStore = (e) => {
    e.preventDefault();
    if (businessSlug.trim()) {
      navigate(`/${businessSlug.trim()}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sistema de Ventas SaaS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma multi-tienda para gestionar ventas en línea.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Crear Nueva Tienda */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Nueva Tienda</h2>
            </div>
            <Link
              to="/create-business"
              className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Crear Tienda
            </Link>
          </div>

          {/* Acceder a Tienda */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceder a Tienda</h2>
            </div>
            <form onSubmit={handleAccessStore} className="space-y-4">
              <input
                type="text"
                placeholder="Código de la tienda"
                value={businessSlug}
                onChange={(e) => setBusinessSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Acceder
              </button>
            </form>
          </div>

          {/* Iniciar Sesión */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Panel de Control</h2>
            </div>
            <Link
              to="/login"
              className="block w-full bg-purple-600 text-white text-center py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;