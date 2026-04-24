'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Beaker, Zap, Atom, Molecule2, TrendingUp, BookOpen } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { CATEGORIES } from '@/lib/constants';

export default function HomePage() {
  const [substances, setSubstances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // في الإصدار الأول، سيكون لدينا بيانات وهمية
    // لاحقاً سنربطها مع Supabase
    setLoading(false);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'أدوات الكيمياء الكهربائية',
      description: 'حاسبة جهد الخلية والتحليل الكهربائي',
      href: '/tools/electrochemistry',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Molecule2,
      title: 'الهيدروكربونات',
      description: 'مدرب التسمية والأيزومرات',
      href: '/tools/hydrocarbons',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Atom,
      title: 'مشتقات الهيدروكربونات',
      description: 'المجموعات الوظيفية والبوليمرات',
      href: '/tools/derivatives',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: BookOpen,
      title: 'قاعدة البيانات',
      description: 'الوصول إلى جميع المواد الكيميائية',
      href: '/substances',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  const handleSearch = async (query) => {
    // سيتم تنفيذ البحث لاحقاً مع Supabase
    console.log('Searching for:', query);
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">خزانة الكيمياء الرقمية</h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8">
            منصة تعليمية شاملة للكيمياء الكهربائية والعضوية
          </p>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <p className="text-blue-100">
            أدوات تفاعلية وقاعدة بيانات شاملة للمعلمين والطلاب
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          الأقسام الرئيسية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group"
            >
              <div className={`bg-gradient-to-br ${feature.color} p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 text-white h-full`}>
                <feature.icon className="w-12 h-12 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">الفئات</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(CATEGORIES).map((category) => (
              <Link
                key={category.id}
                href={`/substances?category=${category.id}`}
                className="group"
              >
                <div
                  className="p-6 rounded-lg text-white font-semibold text-center hover:shadow-lg transition transform hover:scale-105"
                  style={{ backgroundColor: category.color, opacity: 0.9 }}
                >
                  {category.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-blue-100">مادة كيميائية</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-blue-100">أداة تفاعلية</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="text-blue-100">أقسام رئيسية</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">∞</div>
              <p className="text-blue-100">إمكانيات التعلم</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">جاهز للبدء؟</h2>
          <p className="text-lg text-gray-600 mb-6">
            استكشف قاعدة البيانات الشاملة أو جرب الأدوات التفاعلية
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/substances"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              استكشف المواد
            </Link>
            <Link
              href="/tools"
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              جرب الأدوات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
