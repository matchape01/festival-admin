import { useState, useRef } from 'react';
import { Download, Upload, RotateCcw } from 'lucide-react';
import type { AllData } from '../../utils/export';
import { downloadJSON, importJSON, validateImportedData } from '../../utils/export';

interface ExportImportPanelProps {
  data: AllData;
  onImport: (data: AllData) => void;
  onReset: () => void;
}

export function ExportImportPanel({ data, onImport, onReset }: ExportImportPanelProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      downloadJSON(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors de l\'export');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);

    try {
      const imported = await importJSON(file);
      if (!validateImportedData(imported)) {
        throw new Error('Format de fichier invalide');
      }
      onImport(imported);
      alert('Données importées avec succès !');
    } catch (err) {
      setError(`Erreur d'import: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les données ? Cette action ne peut pas être annulée.')) {
      onReset();
      localStorage.removeItem('festival-resources');
      localStorage.removeItem('festival-workshops');
      localStorage.removeItem('festival-schedule');
      localStorage.removeItem('festival-volunteers');
      alert('Données réinitialisées !');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Download size={20} />
          Exporter tout (JSON)
        </button>

        <button
          onClick={handleImportClick}
          disabled={isImporting}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          <Upload size={20} />
          {isImporting ? 'Import...' : 'Importer JSON'}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <RotateCcw size={20} />
          Réinitialiser
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Import JSON file"
      />

      <p className="text-xs text-gray-500 text-center">
        💾 Exporter régulièrement vos données pour les sauvegarder. Les données sont aussi automatiquement sauvegardées localement.
      </p>
    </div>
  );
}
