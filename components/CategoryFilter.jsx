'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CategoryFilter({ categories, onCategorySelect }) {
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (categoryId) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter((id) => id !== categoryId)
      : [...selected, categoryId];
    setSelected(newSelected);
    if (onCategorySelect) {
      onCategorySelect(newSelected);
    }
  };

  return (
    <div className="relative inline-block w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition"
      >
        <span className="text-gray-700">
          {selected.length > 0 ? `${selected.length} فئة مختارة` : 'اختر الفئات'}
        </span>
        <ChevronDown
          size={20}
          className={`transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition"
            >
              <input
                type="checkbox"
                checked={selected.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="ml-3 w-4 h-4 rounded"
              />
              <span
                className="w-3 h-3 rounded-full ml-2"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-gray-700">{category.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
