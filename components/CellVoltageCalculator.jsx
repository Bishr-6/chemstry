'use client';

import { useState } from 'react';
import { METALS, calculateCellVoltage, isSpontaneous } from '@/lib';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function CellVoltageCalculator() {
  const [cathode, setCathode] = useState('copper');
  const [anode, setAnode] = useState('zinc');
  const [voltage, setVoltage] = useState(null);
  const [spontaneous, setSpontaneous] = useState(null);

  const handleCalculate = () => {
    const cathodeData = METALS.find((m) => m.id === cathode);
    const anodeData = METALS.find((m) => m.id === anode);

    if (cathodeData && anodeData) {
      const cellVoltage = calculateCellVoltage(cathodeData.e0, anodeData.e0);
      setVoltage(cellVoltage);
      setSpontaneous(isSpontaneous(cellVoltage));
    }
  };

  const handleReset = () => {
    setCathode('copper');
    setAnode('zinc');
    setVoltage(null);
    setSpontaneous(null);
  };

  const cathodeData = METALS.find((m) => m.id === cathode);
  const anodeData = METALS.find((m) => m.id === anode);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">حاسبة جهد الخلية الفولتية</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Cathode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الكاثود (القطب الموجب)
          </label>
          <select
            value={cathode}
            onChange={(e) => setCathode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {METALS.map((metal) => (
              <option key={metal.id} value={metal.id}>
                {metal.name} (E° = {metal.e0}V)
              </option>
            ))}
          </select>
          {cathodeData && (
            <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
              <p className="text-gray-600">E° = <span className="font-bold">{cathodeData.e0}V</span></p>
            </div>
          )}
        </div>

        {/* Anode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الأنود (القطب السالب)
          </label>
          <select
            value={anode}
            onChange={(e) => setAnode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {METALS.map((metal) => (
              <option key={metal.id} value={metal.id}>
                {metal.name} (E° = {metal.e0}V)
              </option>
            ))}
          </select>
          {anodeData && (
            <div className="mt-2 p-3 bg-orange-50 rounded text-sm">
              <p className="text-gray-600">E° = <span className="font-bold">{anodeData.e0}V</span></p>
            </div>
          )}
        </div>
      </div>

      {/* Formula */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-center text-gray-700">
          <span className="font-bold">E°cell</span> = <span className="text-blue-600">E°cathode</span> - <span className="text-orange-600">E°anode</span>
        </p>
        {cathodeData && anodeData && (
          <p className="text-center text-sm text-gray-600 mt-2">
            = {cathodeData.e0} - ({anodeData.e0}) = ?
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleCalculate}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          احسب جهد الخلية
        </button>
        <button
          onClick={handleReset}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          إعادة تعيين
        </button>
      </div>

      {/* Result */}
      {voltage !== null && (
        <div className={`p-6 rounded-lg ${spontaneous ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
          <div className="mb-4">
            <p className="text-gray-600 text-sm">جهد الخلية القياسي</p>
            <p className="text-3xl font-bold">
              {voltage}V
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 text-sm">التلقائية:</p>
            <p className={`text-lg font-semibold ${spontaneous ? 'text-green-600' : 'text-red-600'}`}>
              {spontaneous ? '✓ تفاعل تلقائي' : '✗ تفاعل غير تلقائي'}
            </p>
          </div>

          {spontaneous && (
            <div className="bg-white p-3 rounded text-sm text-gray-700">
              <p className="font-semibold mb-1">اتجاه التفاعل:</p>
              <p>الإلكترونات تتدفق من {anodeData?.name} إلى {cathodeData?.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
