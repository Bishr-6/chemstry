import Header from '@/components/Header';
import FunctionalGroupExplorer from '@/components/FunctionalGroupExplorer';
import PolymerRecyclingGuide from '@/components/PolymerRecyclingGuide';
import { Atom, Recycle } from 'lucide-react';

export const metadata = {
  title: 'مشتقات الهيدروكربونات - خزانة الكيمياء الرقمية',
  description: 'المجموعات الوظيفية والبوليمرات وإعادة التدوير',
};

export default function DerivativesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">مشتقات الهيدروكربونات</h1>
          <p className="text-lg opacity-90">
            استكشف المجموعات الوظيفية والبوليمرات والتطبيقات العملية
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Functional Groups */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Atom className="text-pink-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">كاشف المجموعات الوظيفية</h2>
            </div>
            <FunctionalGroupExplorer />
          </div>

          {/* Polymers */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Recycle className="text-green-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">البوليمرات وإعادة التدوير</h2>
            </div>
            <PolymerRecyclingGuide />
          </div>

          {/* Chemistry in Life */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الكيمياء في حياتنا</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-gray-900 mb-2">الفورمالدهيد</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">الصيغة:</span> HCHO
                </p>
                <p className="text-gray-600 text-sm">
                  حفظ العينات البيولوجية والتطهير والعقاقير
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-lg border-l-4 border-pink-500">
                <h3 className="font-bold text-gray-900 mb-2">الإسترات</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">الأمثلة:</span> خلات الإيثيل
                </p>
                <p className="text-gray-600 text-sm">
                  الروائح الطبيعية والنكهات (موز، أناناس، برتقال)
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-900 mb-2">الأمينات</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">الأمثلة:</span> تريميثيل أمين
                </p>
                <p className="text-gray-600 text-sm">
                  رائحة الكائنات الميتة والمستخدمة في التحقيقات الجنائية
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-gray-900 mb-2">حمض الفورميك</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">الصيغة:</span> HCOOH
                </p>
                <p className="text-gray-600 text-sm">
                  إفراز النمل والحشرات كوسيلة دفاعية، وسم النحل
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-gray-900 mb-2">الإيثين</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">الصيغة:</span> C₂H₄
                </p>
                <p className="text-gray-600 text-sm">
                  هرمون نبات، يسبب نضج الفاكهة والتأثيرات المخدرة
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-gray-900 mb-2">البنزين</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">الصيغة:</span> C₆H₆
                </p>
                <p className="text-gray-600 text-sm">
                  مذيب صناعي، مادة أساسية للأصباغ والأدوية والبلاستيك
                </p>
              </div>
            </div>
          </div>

          {/* Professional Careers */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">المسارات الوظيفية</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">فني النفط والغاز</h3>
                <p className="text-gray-600 text-sm mb-4">
                  استخراج ومعالجة النفط والغاز الطبيعي
                </p>
                <div className="bg-white p-3 rounded text-xs text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">المتطلبات:</p>
                  <p>كيمياء عضوية، كيمياء كهربائية، هندسة</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">أخصائي الطاقة البديلة</h3>
                <p className="text-gray-600 text-sm mb-4">
                  تطوير الوقود الحيوي والطاقة الخضراء
                </p>
                <div className="bg-white p-3 rounded text-xs text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">المتطلبات:</p>
                  <p>كيمياء عضوية، بيوتكنولوجي، الاستدامة</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">كيميائي البوليمرات</h3>
                <p className="text-gray-600 text-sm mb-4">
                  تطوير وتحسين المواد البلاستيكية والمركبات
                </p>
                <div className="bg-white p-3 rounded text-xs text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">المتطلبات:</p>
                  <p>كيمياء عضوية، مواد علم، بحث وتطوير</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">كيميائي الأدوية</h3>
                <p className="text-gray-600 text-sm mb-4">
                  تطوير الأدوية والعقاقير الطبية
                </p>
                <div className="bg-white p-3 rounded text-xs text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">المتطلبات:</p>
                  <p>كيمياء عضوية، علم الأدوية، علم الحياة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
