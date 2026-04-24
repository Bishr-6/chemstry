import Header from '@/components/Header';
import Link from 'next/link';
import { BarChart3, Plus, Users, Database, Settings } from 'lucide-react';

export const metadata = {
  title: 'لوحة تحكم المعلم - خزانة الكيمياء الرقمية',
  description: 'لوحة تحكم خاصة بالمعلمين لإدارة البيانات',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 size={32} />
            <h1 className="text-4xl font-bold">لوحة تحكم المعلم</h1>
          </div>
          <p className="text-lg opacity-90">
            إدارة قاعدة البيانات والمحتوى التعليمي
          </p>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المواد</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">148</p>
              </div>
              <Database className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الطلاب المسجلين</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">245</p>
              </div>
              <Users className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">التجارب المضافة</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">23</p>
              </div>
              <BarChart3 className="text-purple-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">التحديثات الأخيرة</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">اليوم</p>
              </div>
              <Settings className="text-orange-600" size={32} />
            </div>
          </div>
        </div>

        {/* Actions Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">الإجراءات المتاحة</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Substance */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <Plus className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">إضافة مادة جديدة</h3>
            <p className="text-gray-600 text-sm mb-4">
              أضف مادة كيميائية جديدة إلى قاعدة البيانات
            </p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              إضافة
            </button>
          </div>

          {/* Manage Categories */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <Database className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">إدارة الفئات</h3>
            <p className="text-gray-600 text-sm mb-4">
              إنشاء وتعديل فئات المواد الكيميائية
            </p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
              إدارة
            </button>
          </div>

          {/* Add Experiments */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <Beaker className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">إضافة تجربة</h3>
            <p className="text-gray-600 text-sm mb-4">
              أضف تجربة عملية جديدة للطلاب
            </p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
              إضافة
            </button>
          </div>

          {/* Manage Users */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <Users className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">إدارة المستخدمين</h3>
            <p className="text-gray-600 text-sm mb-4">
              إدارة حسابات الطلاب والمدرسين
            </p>
            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold">
              إدارة
            </button>
          </div>

          {/* View Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <BarChart3 className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">عرض التحليلات</h3>
            <p className="text-gray-600 text-sm mb-4">
              مشاهدة إحصائيات الاستخدام والنتائج
            </p>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
              عرض
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <Settings className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">الإعدادات</h3>
            <p className="text-gray-600 text-sm mb-4">
              إدارة إعدادات التطبيق والأمان
            </p>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold">
              تغيير
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6">الأنشطة الأخيرة</h2>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-right p-4 font-semibold">النوع</th>
                <th className="text-right p-4 font-semibold">الوصف</th>
                <th className="text-right p-4 font-semibold">الوقت</th>
                <th className="text-right p-4 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    إضافة
                  </span>
                </td>
                <td className="p-4">إضافة مادة "الإيثانول"</td>
                <td className="p-4">قبل 2 ساعة</td>
                <td className="p-4">
                  <span className="text-green-600 font-semibold">نجح</span>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                    تعديل
                  </span>
                </td>
                <td className="p-4">تحديث بيانات "الميثان"</td>
                <td className="p-4">قبل 5 ساعات</td>
                <td className="p-4">
                  <span className="text-green-600 font-semibold">نجح</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                    حذف
                  </span>
                </td>
                <td className="p-4">حذف فئة قديمة</td>
                <td className="p-4">أمس</td>
                <td className="p-4">
                  <span className="text-green-600 font-semibold">نجح</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Import missing icon
import { Beaker } from 'lucide-react';
