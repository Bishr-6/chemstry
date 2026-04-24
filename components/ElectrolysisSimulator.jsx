'use client';

import { useState } from 'react';
import { LABORATORY_SALTS } from '@/lib/constants';
import { Zap } from 'lucide-react';

export default function ElectrolysisSimulator() {
  const [selectedSalt, setSelectedSalt] = useState('nacl');
  const [electrolysisType, setElectrolysisType] = useState('molten');
  const [products, setProducts] = useState([]);

  const handleAnalyze = () => {
    const salt = LABORATORY_SALTS.find((s) => s.id === selectedSalt);
    if (salt) {
      const resultProducts = electrolysisType === 'molten' ? salt.molten_products : salt.aqueous_products;
      setProducts(resultProducts);
    }
  };

  const salt = LABORATORY_SALTS.find((s) => s.id === selectedSalt);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="text-yellow-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">محاكي التحليل الكهربائي</h2>
      </div>

      <div className="space-y-6">
        {/* Salt Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اختر المادة
          </label>
          <select
            value={selectedSalt}
            onChange={(e) => setSelectedSalt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LABORATORY_SALTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.formula})
              </option>
            ))}
          </select>
        </div>

        {/* Electrolysis Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع التحليل
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="molten"
                checked={electrolysisType === 'molten'}
                onChange={(e) => setElectrolysisType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">مصهور</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="aqueous"
                checked={electrolysisType === 'aqueous'}
                onChange={(e) => setElectrolysisType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">محلول مائي</span>
            </label>
          </div>
        </div>

        {/* Information */}
        {salt && (
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">{salt.name}</span>
              <br />
              الصيغة: <span className="font-mono">{salt.formula}</span>
              <br />
              {salt.notes && <span className="text-blue-600">{salt.notes}</span>}
            </p>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-semibold"
        >
          حلل التحليل الكهربائي
        </button>

        {/* Results */}
        {products.length > 0 && (
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-4">النواتج:</h3>
            <div className="space-y-2">
              {products.map((product, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">{product}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
