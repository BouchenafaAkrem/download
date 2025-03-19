import React, { useState } from 'react';
import { Download, Youtube, Music, Video, AlertCircle, History, Settings, Instagram, Twitter, Facebook, Twitch, Equal, Clock, Trash2 } from 'lucide-react';

interface DownloadHistory {
  id: string;
  url: string;
  format: string;
  quality: string;
  date: string;
  platform: string;
  status: 'completed' | 'failed' | 'processing';
}

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('720p');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<DownloadHistory[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate download process
    const newDownload: DownloadHistory = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      format,
      quality,
      date: new Date().toLocaleString(),
      platform: 'YouTube',
      status: 'processing'
    };
    
    setHistory(prev => [newDownload, ...prev]);

    setTimeout(() => {
      setIsLoading(false);
      setHistory(prev => 
        prev.map(item => 
          item.id === newDownload.id 
            ? { ...item, status: 'completed' } 
            : item
        )
      );
      alert('Cette fonctionnalité nécessite une implémentation backend');
    }, 1500);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Téléchargeur Vidéo Pro
            </h1>
            <p className="text-xl text-white/80">
              Téléchargez facilement vos vidéos depuis plusieurs plateformes
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="url" className="block text-gray-700 text-sm font-medium mb-2">
                  URL de la vidéo
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    id="url"
                    className="flex-1 rounded-lg border-gray-300 border-2 p-3 focus:border-purple-500 focus:ring focus:ring-purple-200 transition"
                    placeholder="Collez le lien de votre vidéo ici..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Format Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Format
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition
                        ${format === 'mp4' 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200 hover:border-purple-200'}`}
                      onClick={() => setFormat('mp4')}
                    >
                      <Video size={18} />
                      <span>MP4</span>
                    </button>
                    <button
                      type="button"
                      className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition
                        ${format === 'mp3' 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200 hover:border-purple-200'}`}
                      onClick={() => setFormat('mp3')}
                    >
                      <Music size={18} />
                      <span>MP3</span>
                    </button>
                  </div>
                </div>

                {/* Quality Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Qualité
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full rounded-lg border-gray-300 border-2 p-3 focus:border-purple-500 focus:ring focus:ring-purple-200 transition"
                  >
                    <option value="1080p">1080p HD</option>
                    <option value="720p">720p HD</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 mb-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Download size={20} />
                    Télécharger
                  </>
                )}
              </button>
            </form>

            {/* Supported Platforms */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-gray-700 font-medium mb-4">Plateformes supportées</h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Youtube size={24} className="text-red-600" />
                  <span>YouTube</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Instagram size={24} className="text-pink-600" />
                  <span>Instagram</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Facebook size={24} className="text-blue-600" />
                  <span>Facebook</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Twitter size={24} className="text-blue-400" />
                  <span>Twitter</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Twitch size={24} className="text-purple-600" />
                  <span>Twitch</span>
                </div>
              </div>
            </div>

            {/* History Toggle */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
              >
                <History size={20} />
                <span>Historique des téléchargements</span>
              </button>

              {/* Download History */}
              {showHistory && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-gray-700 font-medium">Téléchargements récents</h4>
                    <button
                      onClick={clearHistory}
                      className="text-red-500 hover:text-red-600 transition flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      <span>Effacer</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700 truncate">
                            {item.url}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <Equal size={14} />
                              {item.quality}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <div className={`ml-4 ${
                          item.status === 'completed' ? 'text-green-500' : 
                          item.status === 'failed' ? 'text-red-500' : 
                          'text-yellow-500'
                        }`}>
                          {item.status === 'completed' ? '✓' : 
                           item.status === 'failed' ? '✗' : 
                           '...'}
                        </div>
                      </div>
                    ))}
                    {history.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        Aucun téléchargement dans l'historique
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-2 text-sm text-gray-600 border-t border-gray-200 pt-6">
              <AlertCircle size={16} className="mt-1 flex-shrink-0" />
              <p>
                Ce service est destiné uniquement au téléchargement de contenu dont vous avez les droits 
                ou qui est libre de droits. Veuillez respecter les conditions d'utilisation des plateformes 
                et les droits d'auteur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;