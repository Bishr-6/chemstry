import Header from '@/components/Header';
import Link from 'next/link';
import { Beaker, BookOpen, Zap, FlaskConical as Molecule2, Atom } from 'lucide-react';

export const metadata = {
  title: 'الأدوات - خزانة الكيمياء الرقمية',
  description: 'مجموعة شاملة من الأدوات التفاعلية للكيمياء',
};

export default function ToolsPage() {
  const tools = [
    {
      category: 'الكيمياء الكهربائية',
      items: [
        {
          title: 'حاسبة جهد الخلية',
          description: 'احسب جهد الخلية الفولتية وحدد التلقائية',
          href: '/tools/electrochemistry#voltage',
          icon: Zap,
          color: 'from-yellow-400 to-orange-500',
        },
        {
          title: 'محاكي التحليل الكهربائي',
          description: 'اكتشف نواتج التحليل الكهربائي للأملاح',
          href: '/tools/electrochemistry#electrolysis',
          icon: Zap,
          color: 'from-blue-400 to-cyan-500',
        },
        {
          title: 'دليل منع التآكل',
          description: 'طرق حماية الفلزات من الأكسدة والتآكل',
          href: '/tools/electrochemistry#corrosion',
          icon: Beaker,
          color: 'from-red-400 to-pink-500',
        },
      ],
    },
    {
      category: 'الهيدروكربونات',
      items: [
        {
          title: 'مدرب التسمية IUPAC',
          description: 'تعلم قواعد تسمية الهيدروكربونات',
          href: '/tools/hydrocarbons#naming',
          icon: BookOpen,
          color: 'from-purple-400 to-pink-500',
        },
        {
          title: 'كاشف الأيزومرات',
          description: 'استكشف الأيزومرات البنائية والفراغية',
          href: '/tools/hydrocarbons#isomers',
          icon: Molecule2,
          color: 'from-green-400 to-emerald-500',
        },
        {
          title: 'المركبات الأروماتية',
          description: 'البنزين ومشتقاته والخصائص',
          href: '/tools/hydrocarbons#aromatic',
          icon: Atom,
          color: 'from-indigo-400 to-blue-500',
        },
      ],
    },
    {
      category: 'مشتقات الهيدروكربونات',
      items: [
        {
          title: 'كاشف المجموعات الوظيفية',
          description: 'فهرس شامل للمجموعات الوظيفية',
          href: '/tools/derivatives#functional',
          icon: Atom,
          color: 'from-pink-400 to-rose-500',
        },
        {
          title: 'دليل إعادة تدوير البوليمرات',
          description: 'رموز التدوير والمونومرات والاستخدامات',
          href: '/tools/derivatives#polymers',
          icon: Beaker,
          color: 'from-green-400 to-teal-500',
        },
        {
          title: 'الكيمياء في حياتنا',
          description: 'تطبيقات الكيمياء في الحياة اليومية',
          href: '/tools/derivatives#chemistry-life',
          icon: BookOpen,
          color: 'from-blue-400 to-indigo-500',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">الأدوات التفاعلية</h1>
          <p className="text-xl opacity-90">
            مجموعة شاملة من الأدوات لاستكشاف الكيمياء بشكل تفاعلي
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {tools.map((category) => (
          <div key={category.category} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{category.category}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((tool) => (
                <Link key={tool.title} href={tool.href} className="group">
                  <div className={`bg-gradient-to-br ${tool.color} p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 text-white h-full`}>
                    <tool.icon className="w-12 h-12 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                    <p className="text-sm opacity-90">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Coming Soon Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">قريباً...</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center border-l-4 border-blue-500">
              <p className="font-bold text-gray-900 mb-2">فلاش كاردز</p>
              <p className="text-sm text-gray-600">بطاقات تفاعلية للمفردات الكيميائية</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center border-l-4 border-green-500">
              <p className="font-bold text-gray-900 mb-2">مختبر البيانات</p>
              <p className="text-sm text-gray-600">رفع وتحليل نتائج التجارب</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg text-center border-l-4 border-purple-500">
              <p className="font-bold text-gray-900 mb-2">نماذج ثلاثية الأبعاد</p>
              <p className="text-sm text-gray-600">نماذج تفاعلية للجزيئات</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg text-center border-l-4 border-orange-500">
              <p className="font-bold text-gray-900 mb-2">اختبارات ذكية</p>
              <p className="text-sm text-gray-600">اختبارات موازية SAT وAdult</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
