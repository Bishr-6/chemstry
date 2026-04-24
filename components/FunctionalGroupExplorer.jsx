'use client';

import { useState } from 'react';
import { FUNCTIONAL_GROUPS } from '@/lib/constants';
import { Zap } from 'lucide-react';

export default function FunctionalGroupExplorer() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="text-pink-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">كاشف المجموعات الوظيفية</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Groups List */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-gray-900 mb-4">المجموعات الوظيفية</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Object.values(FUNCTIONAL_GROUPS).map((group) => (
              <button
                key={group.id}
                onClick={() => handleSelectGroup(group)}
                className={`w-full text-right p-3 rounded-lg transition ${
                  selectedGroup?.id === group.id
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <p className="font-semibold">{group.name}</p>
                <p className="text-sm opacity-75">{group.formula}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="lg:col-span-2">
          {selectedGroup ? (
            <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedGroup.name}</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">الصيغة:</p>
                  <p className="text-lg font-mono bg-white p-3 rounded border border-pink-200">
                    {selectedGroup.formula}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600">الفئة:</p>
                  <p className="text-gray-900">{selectedGroup.category}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600">اتجاه درجة الغليان:</p>
                  <p className="text-gray-900">{selectedGroup.bp_trend}</p>
                </div>

                <div className="bg-white p-4 rounded border border-pink-200">
                  <p className="text-sm text-gray-600">
                    المجموعات الوظيفية تحدد خصائص المركبات العضوية مثل درجة الغليان والذوبان والنشاط الكيميائي.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-600">اختر مجموعة وظيفية لعرض تفاصيلها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
