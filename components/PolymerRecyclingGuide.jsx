'use client';

import { useState } from 'react';
import { POLYMERS, getPolymerRecyclingInfo } from '@/lib';
import { Recycle } from 'lucide-react';

export default function PolymerRecyclingGuide() {
  const [selectedCode, setSelectedCode] = useState('1');
  const [polymerInfo, setPolymerInfo] = useState(null);

  const handleSelectCode = (code) => {
    setSelectedCode(code);
    const info = getPolymerRecyclingInfo(code);
    setPolymerInfo(info);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <Recycle className="text-green-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">دليل إعادة تدوير البوليمرات</h2>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">رموز إعادة التدوير الشائعة:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['1', '2', '3', '4', '5', '6', '7'].map((code) => (
            <button
              key={code}
              onClick={() => handleSelectCode(code)}
              className={`p-4 rounded-lg font-bold text-lg transition ${
                selectedCode === code
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Polymer Information */}
      {polymerInfo && (
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
          <h3 className="font-bold text-lg text-gray-900 mb-4">{polymerInfo.name}</h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">الراتينج:</p>
              <p className="text-gray-900">{polymerInfo.resin}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">الاستخدامات الشائعة:</p>
              <p className="text-gray-900">{polymerInfo.uses}</p>
            </div>
          </div>
        </div>
      )}

      {/* Polymers Database */}
      <div className="mt-8 border-t pt-6">
        <h3 className="font-bold text-lg text-gray-900 mb-4">قاعدة بيانات البوليمرات</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {POLYMERS.map((polymer) => (
            <div key={polymer.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900">{polymer.name}</p>
              <p className="text-sm text-gray-600">الرمز: {polymer.code}</p>
              <p className="text-sm text-gray-600">المونومر: {polymer.monomer}</p>
              <p className="text-sm text-blue-600">{polymer.uses}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
