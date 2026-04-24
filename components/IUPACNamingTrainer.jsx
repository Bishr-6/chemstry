'use client';

import { useState } from 'react';
import { generateIUPACName, IUPAC_NAMING_RULES } from '@/lib';
import { BookOpen, HelpCircle } from 'lucide-react';

export default function IUPACNamingTrainer() {
  const [carbonCount, setCarbonCount] = useState(4);
  const [category, setCategory] = useState('alkane');
  const [generatedName, setGeneratedName] = useState('');
  const [showRules, setShowRules] = useState(false);

  const handleGenerate = () => {
    const name = generateIUPACName(carbonCount, category);
    setGeneratedName(name);
  };

  const categories = [
    { id: 'alkane', label: 'ألكان' },
    { id: 'alkene', label: 'ألكين' },
    { id: 'alkyne', label: 'ألكاين' },
    { id: 'alcohol', label: 'كحول' },
    { id: 'ether', label: 'إيثر' },
    { id: 'amine', label: 'أمين' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-purple-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">مدرب التسمية IUPAC</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Carbon Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عدد ذرات الكربون
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={carbonCount}
            onChange={(e) => setCarbonCount(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-blue-600">{carbonCount}</span>
            <span className="text-gray-600"> ذرة كربون</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الفئة
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold mb-6"
      >
        أنشئ اسم IUPAC
      </button>

      {/* Result */}
      {generatedName && (
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500 mb-6">
          <p className="text-gray-600 text-sm mb-2">الاسم الصحيح:</p>
          <p className="text-2xl font-bold text-purple-600">{generatedName}</p>
        </div>
      )}

      {/* Rules */}
      <div className="border-t pt-6">
        <button
          onClick={() => setShowRules(!showRules)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
        >
          <HelpCircle size={20} />
          قواعد التسمية IUPAC
        </button>

        {showRules && (
          <div className="space-y-3">
            {IUPAC_NAMING_RULES.map((rule) => (
              <div key={rule.rule_id} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">القاعدة {rule.rule_id}:</p>
                <p className="text-gray-700 mb-2">{rule.rule}</p>
                <p className="text-sm text-blue-600 italic">{rule.example}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
