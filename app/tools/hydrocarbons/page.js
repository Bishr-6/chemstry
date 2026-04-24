import Header from '@/components/Header';
import IUPACNamingTrainer from '@/components/IUPACNamingTrainer';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'أدوات الهيدروكربونات - خزانة الكيمياء الرقمية',
  description: 'مدرب التسمية IUPAC والأيزومرات',
};

export default function HydrocarbonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">أدوات الهيدروكربونات</h1>
          <p className="text-lg opacity-90">
            استكشف تسمية الهيدروكربونات والأيزومرات والمركبات الأروماتية
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* IUPAC Naming */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-purple-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">مدرب التسمية IUPAC</h2>
            </div>
            <IUPACNamingTrainer />
          </div>

          {/* Isomerism */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الأيزومرات</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الأيزومرية البنائية</h3>
                <p className="text-gray-700 text-sm mb-4">
                  نفس الصيغة الجزيئية مع ترتيب مختلف للذرات
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900 mb-2">مثال:</p>
                  <p className="text-gray-600">C₄H₁₀ يمكن أن يكون بيوتان عادي أو أيزوبيوتان</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الأيزومرية الفراغية (Cis-Trans)</h3>
                <p className="text-gray-700 text-sm mb-4">
                  اختلاف في موقع المجموعات حول رابطة ثنائية
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900 mb-2">مثال:</p>
                  <p className="text-gray-600">بيوت-2-ين يوجد بشكل Cis و Trans</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الأيزومرية الضوئية</h3>
                <p className="text-gray-700 text-sm mb-4">
                  صور مرآة بلا تطابق (D و L أو +/-)
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900 mb-2">التطبيق:</p>
                  <p className="text-gray-600">الأحماض الأمينية والسكريات</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الأيزومرات الموضعية</h3>
                <p className="text-gray-700 text-sm mb-4">
                  اختلاف في موقع المجموعات الجانبية
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900 mb-2">مثال:</p>
                  <p className="text-gray-600">1-بروبانول vs 2-بروبانول</p>
                </div>
              </div>
            </div>
          </div>

          {/* Aromatic Compounds */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">المركبات الأروماتية</h2>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-4">البنزين وحلقاته</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-indigo-200">
                  <p className="font-semibold text-gray-900 mb-2">التركيب:</p>
                  <p className="text-gray-600 text-sm">
                    حلقة من 6 ذرات كربون مع 6 إلكترونات π موزعة على الحلقة
                  </p>
                </div>

                <div className="bg-white p-4 rounded border border-indigo-200">
                  <p className="font-semibold text-gray-900 mb-2">الثبات:</p>
                  <p className="text-gray-600 text-sm">
                    أكثر ثباتاً من الألكينات بسبب الاستقرار الأروماتي (Resonance)
                  </p>
                </div>

                <div className="bg-white p-4 rounded border border-indigo-200">
                  <p className="font-semibold text-gray-900 mb-2">الخصائص:</p>
                  <p className="text-gray-600 text-sm">
                    رائحة مميزة، قابلية التفاعلات الاستبدالية
                  </p>
                </div>

                <div className="bg-white p-4 rounded border border-indigo-200">
                  <p className="font-semibold text-gray-900 mb-2">الاستخدامات:</p>
                  <p className="text-gray-600 text-sm">
                    وقود، مذيب، مادة أساسية للصبغات والأدوية
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Properties */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ملخص الخصائص</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-right p-3 font-semibold">المركب</th>
                  <th className="text-right p-3 font-semibold">الصيغة العامة</th>
                  <th className="text-right p-3 font-semibold">نوع الرابطة</th>
                  <th className="text-right p-3 font-semibold">الاستخدام</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3">ألكان</td>
                  <td className="p-3 font-mono">CₙH₂ₙ₊₂</td>
                  <td className="p-3">C-C (σ)</td>
                  <td className="p-3">وقود</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">ألكين</td>
                  <td className="p-3 font-mono">CₙH₂ₙ</td>
                  <td className="p-3">C=C (σ+π)</td>
                  <td className="p-3">بلمرة</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">ألكاين</td>
                  <td className="p-3 font-mono">CₙH₂ₙ₋₂</td>
                  <td className="p-3">C≡C (σ+2π)</td>
                  <td className="p-3">لحام</td>
                </tr>
                <tr>
                  <td className="p-3">أروماتي</td>
                  <td className="p-3 font-mono">CₙHₙ (ن≥6)</td>
                  <td className="p-3">حلقة مستقرة</td>
                  <td className="p-3">صبغات</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
