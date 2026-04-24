-- تفعيل إضافة توليد المعرفات الفريدة (UUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. جدول الطلاب (Students)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    class_id TEXT,
    usage_metrics JSONB DEFAULT '{}'::jsonb, -- لتخزين تحليلات الاستخدام مثل (مرات استخدام المحاكي، الأخطاء في المجموعات الوظيفية)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. جدول الواجبات (Assignments)
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    assignment_type TEXT, -- نوع الواجب: تسمية IUPAC، موازنة معادلات، حساب التلقائية
    teacher_id UUID NOT NULL, -- يربط بمعرف المعلم في نظام المصادقة
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. جدول التسليمات (Submissions)
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_id UUID REFERENCES students(id) ON DELETE SET NULL, -- اختياري للربط المباشر
    grade NUMERIC,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. جدول تقارير المختبر الافتراضي (Lab Reports) - إضافي لدعم المختبر
CREATE TABLE lab_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    experiment_type TEXT NOT NULL, -- نوع التجربة: "خلية فولتية"، "تحليل غازات"، "تحضير إستر"
    anode TEXT, -- فلز الأنود
    cathode TEXT, -- فلز الكاثود
    measured_voltage NUMERIC, -- جهد الخلية المقاس
    error_percentage NUMERIC, -- النسبة المئوية للخطأ
    observations TEXT, -- ملاحظات الطالب (مثل: رائحة الإستر، الفقاعات)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- إعدادات الأمان (Row Level Security - RLS)
-- ==========================================

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_reports ENABLE ROW LEVEL SECURITY;

-- سياسات جدول الطلاب
CREATE POLICY "يمكن للجميع قراءة بيانات الطلاب" ON students FOR SELECT USING (true);
CREATE POLICY "يمكن للطلاب إدراج أسمائهم" ON students FOR INSERT WITH CHECK (true);

-- سياسات جدول الواجبات
CREATE POLICY "يمكن للطلاب رؤية الواجبات" ON assignments FOR SELECT USING (true);
-- ملاحظة: يجب تعديل سياسة الإضافة لتقتصر على المعلمين فقط بناءً على إعدادات الـ Auth
CREATE POLICY "يمكن للمعلمين إضافة واجبات" ON assignments FOR INSERT WITH CHECK (true); 

-- سياسات جدول التسليمات
CREATE POLICY "يمكن للطلاب تسليم الواجبات" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "يمكن للمعلمين رؤية التسليمات" ON submissions FOR SELECT USING (true);

-- سياسات جدول تقارير المختبر
CREATE POLICY "يمكن للطلاب إرسال تقارير المختبر" ON lab_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "يمكن للمعلمين رؤية تقارير المختبر" ON lab_reports FOR SELECT USING (true);
