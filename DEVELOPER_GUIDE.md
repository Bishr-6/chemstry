# دليل المطور (Developer Guide)

## نظرة عامة على العمارة

### بنية المكونات (Component Architecture)

```
Header (Layout)
├── Navigation Links
├── Search Bar
└── Mobile Menu

Pages
├── Home (/)
├── Tools (/tools)
│   ├── Electrochemistry
│   ├── Hydrocarbons
│   └── Derivatives
├── Substances Database
└── Teacher Dashboard
```

### تدفق البيانات (Data Flow)

```
User Interaction
    ↓
React Component (Client)
    ↓
State Management (useState)
    ↓
Supabase API Call
    ↓
PostgreSQL Database
    ↓
Response → Component → UI Update
```

## دليل الكود

### إضافة أداة تفاعلية جديدة

#### 1. إنشاء المكون

```javascript
'use client';  // استخدم client component

import { useState } from 'react';
import { someIcon } from 'lucide-react';

export default function NewToolComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);

  const handleCalculate = () => {
    // أضف منطق الحساب
    const result = performCalculation(input);
    setOutput(result);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* مكون الأداة */}
    </div>
  );
}
```

#### 2. إضافة الأداة إلى الصفحة

```javascript
// في app/tools/section/page.js

import NewToolComponent from '@/components/NewToolComponent';

export default function SectionPage() {
  return (
    <section className="...">
      <div>
        <h2>عنوان الأداة</h2>
        <NewToolComponent />
      </div>
    </section>
  );
}
```

### إضافة مادة إلى قاعدة البيانات

#### عبر Supabase Dashboard

```sql
INSERT INTO substances (
  name, name_ar, formula, molar_mass, 
  category_id, boiling_point, uses
) VALUES (
  'Substance Name',
  'اسم المادة',
  'C₂H₆O',
  46.07,
  (SELECT id FROM categories WHERE name = 'Alcohol'),
  78.37,
  'استخدامات المادة'
);
```

#### عبر API (مستقبلاً)

```javascript
const addSubstance = async (substanceData) => {
  const { data, error } = await supabase
    .from('substances')
    .insert([substanceData]);
  
  if (error) console.error(error);
  return data;
};
```

### استخدام ثوابت البيانات

```javascript
import { 
  CATEGORIES, 
  METALS, 
  FUNCTIONAL_GROUPS,
  POLYMERS 
} from '@/lib/constants';

// استخدام الفئات
Object.values(CATEGORIES).map(cat => (
  <option key={cat.id} value={cat.id}>
    {cat.label}
  </option>
))

// استخدام المعادن
METALS.map(metal => ({
  ...metal,
  display: `${metal.name} (E° = ${metal.e0}V)`
}))
```

### استخدام دوال الحسابات

```javascript
import {
  calculateCellVoltage,
  isSpontaneous,
  generateIUPACName,
  calculateMolarMass
} from '@/lib/calculations';

// حساب جهد الخلية
const voltage = calculateCellVoltage(0.34, -0.76);  // 1.10V

// التحقق من التلقائية
const isSpon = isSpontaneous(voltage);  // true

// توليد اسم IUPAC
const name = generateIUPACName(4, 'alkane');  // بيوتان

// حساب الوزن المولي
const mass = calculateMolarMass('C₂H₅OH');  // 46.07
```

## نمط Tailwind CSS المستخدم

### الألوان الرئيسية

```css
/* من الأزرق إلى البنفسج */
from-blue-600 to-purple-600

/* درجات مختلفة */
bg-blue-50   /* فاتح جداً */
bg-blue-100  /* فاتح */
bg-blue-600  /* أساسي */
bg-blue-700  /* غامق */
```

### نمط الأزرار

```javascript
// زر أساسي
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
  نص الزر
</button>

// زر ثانوي
<button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
  نص الزر
</button>
```

### نمط البطاقات

```javascript
<div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
  {/* محتوى البطاقة */}
</div>
```

## معايير الكود

### التسمية

```javascript
// ✓ صحيح
const substanceList = [];
const calculateVoltage = () => {};
const METAL_CONSTANTS = {};

// ✗ خاطئ
const list = [];
const calc = () => {};
const metalConstant = {};
```

### البنية

```javascript
// ✓ ترتيب صحيح
'use client';

import dependencies
import local modules
import constants

export default function Component() {
  const [state, setState] = useState();
  
  const handleAction = () => {};
  
  return JSX;
}

// ✗ عدم الترتيب
import random stuff everywhere
no 'use client' at top
```

### التعليقات

```javascript
// ✓ تعليق مفيد
// حساب جهد الخلية باستخدام جهود الاختزال
const cellVoltage = calculateCellVoltage(cathode, anode);

// ✗ تعليق غير مفيد
// تعيين المتغير
const voltage = 1.1;
```

## اختبار الأدوات

### اختبار يدوي

```javascript
// افتح Browser Console
console.log(calculateCellVoltage(0.34, -0.76));
// يجب أن تطبع: 1.1

console.log(isSpontaneous(1.1));
// يجب أن تطبع: true

console.log(generateIUPACName(4, 'alkane'));
// يجب أن تطبع: بيوتان
```

### اختبار الحسابات

```javascript
// اختبرات يجب أن تمر:

// جهد الخلية
calculateCellVoltage(0.34, -0.76) === "1.10"
calculateCellVoltage(-0.76, 0.34) === "-1.10"

// التلقائية
isSpontaneous("1.10") === true
isSpontaneous("-1.10") === false

// الأوزان المولية
calculateMolarMass('CH4') === "16.04"
calculateMolarMass('C2H5OH') === "46.07"
```

## التعامل مع البيانات من Supabase

### قراءة البيانات

```javascript
import { supabase } from '@/lib/supabase';

const fetchSubstances = async () => {
  const { data, error } = await supabase
    .from('substances')
    .select('*')
    .eq('category_id', categoryId);
  
  if (error) {
    console.error('Error fetching:', error);
    return [];
  }
  
  return data;
};
```

### البحث

```javascript
const searchSubstances = async (query) => {
  const { data, error } = await supabase
    .from('substances')
    .select('*')
    .or(
      `name.ilike.%${query}%,
       name_ar.ilike.%${query}%,
       formula.ilike.%${query}%`
    );
  
  return data || [];
};
```

### إضافة بيانات

```javascript
const addNewSubstance = async (substanceData) => {
  const { data, error } = await supabase
    .from('substances')
    .insert([{
      name: substanceData.name,
      name_ar: substanceData.nameAr,
      formula: substanceData.formula,
      molar_mass: substanceData.molarMass,
      category_id: substanceData.categoryId,
      boiling_point: substanceData.boilingPoint,
      uses: substanceData.uses
    }])
    .select();
  
  if (error) throw error;
  return data[0];
};
```

## البيئات والمتغيرات

### متغيرات البيئة المطلوبة

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# (اختياري) API الخارجية
NEXT_PUBLIC_OPENAI_KEY=xxxxx
```

## الأداء والتحسين

### تحسين البحث

```javascript
// ✗ بطيء
const results = allSubstances.filter(s => 
  s.name.includes(query) || s.formula.includes(query)
);

// ✓ أسرع
const { data } = await supabase
  .from('substances')
  .select('*')
  .ilike('name', `%${query}%`)
  .limit(20);
```

### استخدام useMemo

```javascript
import { useMemo } from 'react';

export default function Component({ substances }) {
  // لا تحسبها في كل رندر
  const sortedSubstances = useMemo(() => {
    return [...substances].sort((a, b) => 
      a.boiling_point - b.boiling_point
    );
  }, [substances]);
  
  return <div>{sortedSubstances.map(...)}</div>;
}
```

## النشر والإنتاج

### قبل النشر

```bash
# 1. تحقق من الأخطاء
npm run lint

# 2. بناء الإصدار الإنتاجي
npm run build

# 3. اختبر الإصدار المحلي
npm run start

# 4. تحقق من السرعة
npx lighthouse
```

### على Vercel

```bash
# 1. ادفع إلى GitHub
git add .
git commit -m "نص التغيير"
git push

# 2. Vercel سيبني تلقائياً
# 3. تحقق من الـ Deployment في Vercel Dashboard
```

## الأخطاء الشائعة

### 1. نسيان 'use client'
```javascript
// ✗ خطأ: useState في Server Component
export default function Component() {
  const [state, setState] = useState();
}

// ✓ صحيح
'use client';

export default function Component() {
  const [state, setState] = useState();
}
```

### 2. عدم معالجة الأخطاء
```javascript
// ✗ قد يتعطل
const { data } = await supabase.from('table').select();

// ✓ آمن
const { data, error } = await supabase.from('table').select();
if (error) {
  console.error(error);
  return null;
}
```

### 3. الصيغ الكيميائية
```javascript
// ✗ خطأ: بدون subscripts
"CH4"

// ✓ صحيح: مع subscripts
"CH₄"
```

## المراجع والموارد

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Hooks](https://react.dev/reference/react)

---

**آخر تحديث**: 2024
**الإصدار**: 1.0.0
