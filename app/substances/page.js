import Header from '@/components/Header';
import Link from 'next/link';
import { Database, Plus, Edit2, Trash2 } from 'lucide-react';

export const metadata = {
  title: 'قاعدة البيانات - خزانة الكيمياء الرقمية',
  description: 'استكشف قاعدة بيانات المواد الكيميائية الشاملة',
};

export default function SubstancesPage() {
  // في الإصدار الأول، سيكون لدينا بيانات وهمية
  // سيتم الربط مع Supabase لاحقاً

  const mockSubstances = [
    {
      id: 1,
      name: 'ميثان',
      formula: 'CH₄',
      category: 'ألكان',
      bp: -161,
      mp: -182,
      uses: 'وقود، غاز طبيعي',
    },
    {
      id: 2,
      name: 'إيثانول',
      formula: 'C₂H₅OH',
      category: 'كحول',
      bp: 78,
      mp: -114,
      uses: 'مشروب، مذيب، وقود',
    },
    {
      id: 3,
      name: 'حمض الخليك',
      formula: 'CH₃COOH',
      category: 'حمض كربوكسيلي',
      bp: 118,
      mp: 16.6,
      uses: 'الخل، مذيب',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Database size={32} />
            <h1 className="text-4xl font-bold">قاعدة البيانات</h1>
          </div>
          <p className="text-lg opacity-90">
            قاعدة بيانات شاملة تحتوي على أكثر من 100 مادة كيميائية
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="ابحث عن مادة..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">جميع الفئات</option>
              <option value="alkane">ألكان</option>
              <option value="alkene">ألكين</option>
              <option value="alcohol">كحول</option>
              <option value="acid">حمض</option>
            </select>
          </div>

          {/* Substances Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="text-right p-4 font-semibold">الاسم</th>
                  <th className="text-right p-4 font-semibold">الصيغة</th>
                  <th className="text-right p-4 font-semibold">الفئة</th>
                  <th className="text-right p-4 font-semibold">درجة الغليان</th>
                  <th className="text-right p-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {mockSubstances.map((substance) => (
                  <tr key={substance.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="p-4">{substance.name}</td>
                    <td className="p-4 font-mono">{substance.formula}</td>
                    <td className="p-4">{substance.category}</td>
                    <td className="p-4">{substance.bp}°C</td>
                    <td className="p-4">
                      <Link
                        href={`/substances/${substance.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        عرض
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">السابق</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">التالي</button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">الإحصائيات</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center border-l-4 border-blue-500">
              <p className="text-3xl font-bold text-blue-600">100+</p>
              <p className="text-gray-600 mt-2">مادة كيميائية</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center border-l-4 border-green-500">
              <p className="text-3xl font-bold text-green-600">12</p>
              <p className="text-gray-600 mt-2">فئة رئيسية</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg text-center border-l-4 border-purple-500">
              <p className="text-3xl font-bold text-purple-600">30+</p>
              <p className="text-gray-600 mt-2">مشتقة عضوية</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg text-center border-l-4 border-orange-500">
              <p className="text-3xl font-bold text-orange-600">7</p>
              <p className="text-gray-600 mt-2">بوليمر شائع</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
