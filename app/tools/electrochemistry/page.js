import Header from '@/components/Header';
import CellVoltageCalculator from '@/components/CellVoltageCalculator';
import ElectrolysisSimulator from '@/components/ElectrolysisSimulator';
import { Zap, Droplet, Shield } from 'lucide-react';

export const metadata = {
  title: 'أدوات الكيمياء الكهربائية - خزانة الكيمياء الرقمية',
  description: 'أدوات تفاعلية لحساب جهد الخلية والتحليل الكهربائي',
};

export default function ElectrochemistryPage() {
  const tools = [
    {
      id: 'voltage',
      title: 'حاسبة جهد الخلية الفولتية',
      description: 'احسب جهد الخلية وحدد التلقائية',
      icon: Zap,
    },
    {
      id: 'electrolysis',
      title: 'محاكي التحليل الكهربائي',
      description: 'اكتشف نواتج التحليل الكهربائي',
      icon: Droplet,
    },
    {
      id: 'corrosion',
      title: 'دليل منع التآكل',
      description: 'تعرف على طرق حماية الفلزات',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">أدوات الكيمياء الكهربائية</h1>
          <p className="text-lg opacity-90">
            استكشف الخلايا الفولتية والتحليل الكهربائي من خلال محاكاة تفاعلية
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Voltage Calculator */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-yellow-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">حاسبة جهد الخلية</h2>
            </div>
            <CellVoltageCalculator />
          </div>

          {/* Electrolysis Simulator */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Droplet className="text-blue-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">التحليل الكهربائي</h2>
            </div>
            <ElectrolysisSimulator />
          </div>

          {/* Corrosion Prevention */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-red-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">دليل منع التآكل</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الجلفنة (Galvanization)</h3>
                <p className="text-gray-700 text-sm mb-4">
                  تغطية الحديد بطبقة من الخارصين لحماية السطح من الأكسدة
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900">العملية:</p>
                  <p className="text-gray-600">الخارصين أكثر نشاطاً من الحديد، لذا يتأكسد بدلاً من الحديد</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الحماية بالتضحية (Sacrificial)</h3>
                <p className="text-gray-700 text-sm mb-4">
                  استخدام معدن أكثر نشاطاً للحماية من التآكل
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900">الأمثلة:</p>
                  <p className="text-gray-600">خارصين، ماغنيسيوم، ألومنيوم</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الطلاء (Coating)</h3>
                <p className="text-gray-700 text-sm mb-4">
                  عزل المعدن عن الهواء والماء بطبقة حماية
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900">الطرق:</p>
                  <p className="text-gray-600">طلاء زيتي، لاكيه، بلاستيك</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">الحماية الكاثودية</h3>
                <p className="text-gray-700 text-sm mb-4">
                  جعل المعدن الكاثود في خلية كهربائية
                </p>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900">التطبيق:</p>
                  <p className="text-gray-600">خطوط الأنابيب، الهياكل البحرية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
