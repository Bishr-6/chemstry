-- Supabase Database Schema for Chemistry Database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  name_ar VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Functional Groups
CREATE TABLE IF NOT EXISTS functional_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  formula VARCHAR(255),
  category_id UUID REFERENCES categories(id),
  boiling_point_trend VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: Substances (Main Table)
CREATE TABLE IF NOT EXISTS substances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  iupac_name VARCHAR(255),
  iupac_name_ar VARCHAR(255),
  formula VARCHAR(255) NOT NULL,
  molar_mass DECIMAL(10, 2),
  category_id UUID REFERENCES categories(id),
  boiling_point DECIMAL(10, 2),
  melting_point DECIMAL(10, 2),
  density DECIMAL(10, 4),
  solubility_in_water VARCHAR(100),
  state_at_25c VARCHAR(50),
  reduction_potential DECIMAL(10, 2),  -- للكيمياء الكهربائية
  uses TEXT,
  fun_facts TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Hydrocarbons (Specific)
CREATE TABLE IF NOT EXISTS hydrocarbons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  substance_id UUID NOT NULL REFERENCES substances(id) ON DELETE CASCADE,
  hydrocarbon_type VARCHAR(50),  -- alkane, alkene, alkyne, aromatic
  carbon_count INT,
  octane_number INT,
  isomerism_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Polymers
CREATE TABLE IF NOT EXISTS polymers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  code VARCHAR(10),  -- Recycling code
  monomer VARCHAR(255),
  monomer_ar VARCHAR(255),
  uses TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 6: Electrochemistry (Metals)
CREATE TABLE IF NOT EXISTS metals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  symbol VARCHAR(3) NOT NULL,
  reduction_potential DECIMAL(10, 2),  -- E° value
  reactivity_series INT,
  uses TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 7: Electrolysis Products
CREATE TABLE IF NOT EXISTS electrolysis_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salt_id UUID NOT NULL REFERENCES substances(id),
  reaction_type VARCHAR(50),  -- molten or aqueous
  cathode_product VARCHAR(255),
  anode_product VARCHAR(255),
  equation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 8: Experiments/Labs
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  description TEXT,
  procedure TEXT,
  safety_notes TEXT,
  materials TEXT,  -- JSON array
  expected_results TEXT,
  category_id UUID REFERENCES categories(id),
  created_by UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 9: IUPAC Naming Rules
CREATE TABLE IF NOT EXISTS iupac_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_number INT,
  rule_text TEXT,
  rule_text_ar TEXT,
  example TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 10: Isomers Database
CREATE TABLE IF NOT EXISTS isomers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_substance_id UUID REFERENCES substances(id),
  isomer_substance_id UUID REFERENCES substances(id),
  isomerism_type VARCHAR(100),  -- structural, geometric, optical
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX idx_substances_category ON substances(category_id);
CREATE INDEX idx_substances_formula ON substances(formula);
CREATE INDEX idx_hydrocarbons_substance ON hydrocarbons(substance_id);
CREATE INDEX idx_functional_groups_category ON functional_groups(category_id);
CREATE INDEX idx_experiments_category ON experiments(category_id);
CREATE INDEX idx_isomers_parent ON isomers(parent_substance_id);

-- Insert Sample Categories
INSERT INTO categories (name, name_ar, color) VALUES
('Alkane', 'ألكان', '#3B82F6'),
('Alkene', 'ألكين', '#10B981'),
('Alkyne', 'ألكاين', '#F59E0B'),
('Aromatic', 'عطري', '#8B5CF6'),
('Alcohol', 'كحول', '#EC4899'),
('Ether', 'إيثر', '#14B8A6'),
('Amine', 'أمين', '#F97316'),
('Carbonyl', 'كربونيل', '#6366F1'),
('Ester', 'إستر', '#84CC16'),
('Amide', 'أميد', '#06B6D4'),
('Electrochemistry', 'كيمياء كهربائية', '#FBBF24'),
('Polymer', 'بوليمر', '#A855F7');

-- Insert Sample Hydrocarbons
INSERT INTO substances (name, name_ar, formula, molar_mass, category_id, boiling_point, melting_point, state_at_25c, uses)
SELECT
  'Methane', 'ميثان', 'CH₄', 16.04, categories.id, -161, -182, 'gas', 'Natural gas, fuel'
FROM categories WHERE name = 'Alkane'
UNION ALL
SELECT
  'Ethanol', 'إيثانول', 'C₂H₅OH', 46.07, categories.id, 78.4, -114, 'liquid', 'Beverage, solvent, fuel'
FROM categories WHERE name = 'Alcohol'
UNION ALL
SELECT
  'Ethene', 'إيثين', 'C₂H₄', 28.05, categories.id, -104, -169, 'gas', 'Ripening agent, polymerization'
FROM categories WHERE name = 'Alkene';

-- Insert Sample Metals
INSERT INTO metals (name, name_ar, symbol, reduction_potential) VALUES
('Lithium', 'ليثيوم', 'Li', -3.04),
('Potassium', 'بوتاسيوم', 'K', -2.93),
('Sodium', 'صوديوم', 'Na', -2.71),
('Magnesium', 'ماغنيسيوم', 'Mg', -2.37),
('Aluminum', 'ألومنيوم', 'Al', -1.66),
('Zinc', 'خارصين', 'Zn', -0.76),
('Iron', 'حديد', 'Fe', -0.44),
('Copper', 'نحاس', 'Cu', 0.34),
('Chlorine', 'كلور', 'Cl', 1.36),
('Fluorine', 'فلور', 'F', 2.87);

-- Insert Polymers
INSERT INTO polymers (name, name_ar, code, monomer, monomer_ar, uses) VALUES
('Polyethylene Terephthalate', 'بولي إيثيلين تيريفثالات', '1', 'Ethylene terephthalate', 'إيثيلين تيريفثالات', 'Beverage bottles'),
('High-Density Polyethylene', 'بولي إيثيلين عالي الكثافة', '2', 'Ethylene', 'إيثيلين', 'Plastic bags'),
('Polyvinyl Chloride', 'كلوريد البولي فينيل', '3', 'Vinyl chloride', 'كلورو إيثين', 'Pipes, wires'),
('Polypropylene', 'بولي بروبيلين', '5', 'Propylene', 'بروبيلين', 'Containers, vehicles');

-- Create Views for easier queries
CREATE VIEW substances_with_categories AS
SELECT
  s.id,
  s.name,
  s.name_ar,
  s.formula,
  c.name as category,
  c.name_ar as category_ar,
  s.boiling_point,
  s.uses
FROM substances s
LEFT JOIN categories c ON s.category_id = c.id;

-- Create functions for future use
CREATE OR REPLACE FUNCTION calculate_cell_voltage(cathode_e0 DECIMAL, anode_e0 DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN cathode_e0 - anode_e0;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_substances_updated_at BEFORE UPDATE ON substances
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiments_updated_at BEFORE UPDATE ON experiments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
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
