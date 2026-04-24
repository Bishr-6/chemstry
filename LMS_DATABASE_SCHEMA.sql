-- ============================================================
-- SQL Schema للنظام الإداري التعليمي (LMS System)
-- لموقع خزانة الكيمياء الرقمية
-- Database: Supabase (PostgreSQL)
-- ============================================================

-- ============================================================
-- 1. جدول المعلمين (Teachers)
-- ============================================================
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(100),
  school VARCHAR(255),
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. جدول الطلاب (Students)
-- ============================================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  class_id VARCHAR(50),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  email VARCHAR(255),
  phone VARCHAR(20),
  parent_email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',  -- active, inactive, suspended
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. جدول الواجبات (Assignments)
-- ============================================================
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50),  -- iupac_naming, cell_voltage, electrolysis, functional_groups, balancing_equations
  instructions TEXT,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP,
  points INT DEFAULT 100,
  attachments JSONB,  -- للملفات والروابط
  status VARCHAR(50) DEFAULT 'published',  -- draft, published, closed
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. جدول تعيين الواجبات للطلاب (Assignment Students)
-- ============================================================
CREATE TABLE IF NOT EXISTS assignment_students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_submitted BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMP,
  is_graded BOOLEAN DEFAULT FALSE,
  UNIQUE(assignment_id, student_id)
);

-- ============================================================
-- 5. جدول التسليمات (Submissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  student_name VARCHAR(255),
  content TEXT,  -- الإجابة النصية
  file_url VARCHAR(500),  -- رابط الملف المرفوع
  file_name VARCHAR(255),
  submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  grade INT,  -- من 0 إلى 100
  feedback TEXT,  -- تعليقات المعلم
  graded_at TIMESTAMP,
  graded_by UUID REFERENCES teachers(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 6. جدول نتائج المختبر الافتراضي (Lab Results)
-- ============================================================
CREATE TABLE IF NOT EXISTS lab_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  student_name VARCHAR(255),
  teacher_id UUID REFERENCES teachers(id),
  experiment_type VARCHAR(50),  -- voltaic_cell, electrolysis, organic_reaction, etc
  experiment_title VARCHAR(255),
  
  -- بيانات الخلية الفولتية
  metal_anode VARCHAR(50),
  metal_cathode VARCHAR(50),
  solution_anode VARCHAR(100),
  solution_cathode VARCHAR(100),
  
  -- النتائج المقاسة
  voltage_measured DECIMAL(10, 2),
  voltage_calculated DECIMAL(10, 2),
  error_percentage DECIMAL(10, 2),
  
  -- بيانات إضافية
  observations TEXT,
  notes TEXT,
  has_salt_bridge BOOLEAN DEFAULT FALSE,
  electron_flow_direction VARCHAR(20),  -- anode_to_cathode
  
  -- المستندات
  photo_url VARCHAR(500),
  report_url VARCHAR(500),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 7. جدول سجل استخدام الأدوات (Tool Usage Logs)
-- ============================================================
CREATE TABLE IF NOT EXISTS tool_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  student_name VARCHAR(255),
  teacher_id UUID REFERENCES teachers(id),
  tool_name VARCHAR(100),  -- cell_voltage_calculator, iupac_trainer, electrolysis_simulator, etc
  tool_category VARCHAR(50),  -- electrochemistry, hydrocarbons, derivatives
  usage_count INT DEFAULT 1,
  last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  input_data JSONB,  -- البيانات المدخلة
  result_data JSONB,  -- النتائج
  duration_seconds INT,  -- مدة الاستخدام بالثواني
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 8. جدول نتائج الطلاب والدرجات (Student Grades)
-- ============================================================
CREATE TABLE IF NOT EXISTS student_grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES assignments(id) ON DELETE SET NULL,
  test_type VARCHAR(50),  -- assignment, quiz, lab, midterm
  score INT,  -- النقاط المكتسبة
  total_points INT DEFAULT 100,
  percentage DECIMAL(5, 2),
  graded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 9. جدول نتائج الاختبارات القصيرة (Quiz Results)
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id),
  quiz_topic VARCHAR(100),  -- iupac_naming, cell_voltage, functional_groups, etc
  total_questions INT,
  correct_answers INT,
  percentage DECIMAL(5, 2),
  time_spent_seconds INT,
  difficulty_level VARCHAR(50),  -- easy, medium, hard
  answers_detail JSONB,  -- تفاصيل الإجابات
  taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 10. جدول تحليلات الاستخدام (Analytics)
-- ============================================================
CREATE TABLE IF NOT EXISTS usage_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_students INT DEFAULT 0,
  active_students INT DEFAULT 0,
  total_tool_uses INT DEFAULT 0,
  most_used_tool VARCHAR(100),
  average_submission_rate DECIMAL(5, 2),
  average_grade DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(teacher_id, date)
);

-- ============================================================
-- 11. جدول الإشعارات (Notifications)
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  user_type VARCHAR(20),  -- student, teacher
  title VARCHAR(255) NOT NULL,
  message TEXT,
  notification_type VARCHAR(50),  -- assignment_due, grade_posted, assignment_graded
  related_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);

-- ============================================================
-- 12. جدول الملاحظات عن الطلاب (Student Notes)
-- ============================================================
CREATE TABLE IF NOT EXISTS student_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT,
  category VARCHAR(50),  -- performance, behavior, strength, concern
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 13. جدول المجموعات الوظيفية والصعوبات (Functional Group Difficulty)
-- ============================================================
CREATE TABLE IF NOT EXISTS functional_group_difficulty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  functional_group_name VARCHAR(100),  -- hydroxyl, ether, amine, carbonyl, etc
  student_error_count INT DEFAULT 0,
  average_error_percentage DECIMAL(5, 2),
  last_assessed TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_students_teacher ON students(teacher_id);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_assignments_teacher ON assignments(teacher_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
CREATE INDEX idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_graded ON submissions(is_graded);
CREATE INDEX idx_lab_results_student ON lab_results(student_id);
CREATE INDEX idx_lab_results_type ON lab_results(experiment_type);
CREATE INDEX idx_tool_usage_student ON tool_usage_logs(student_id);
CREATE INDEX idx_tool_usage_tool ON tool_usage_logs(tool_name);
CREATE INDEX idx_student_grades_student ON student_grades(student_id);
CREATE INDEX idx_student_grades_assignment ON student_grades(assignment_id);
CREATE INDEX idx_quiz_results_student ON quiz_results(student_id);
CREATE INDEX idx_quiz_results_topic ON quiz_results(quiz_topic);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ============================================================
-- VIEWS
-- ============================================================

-- عرض ملخص أداء الطالب
CREATE OR REPLACE VIEW student_performance_summary AS
SELECT
  s.id as student_id,
  s.name as student_name,
  s.class_id,
  COUNT(DISTINCT sg.id) as total_grades,
  AVG(sg.percentage) as average_percentage,
  COUNT(DISTINCT sub.id) as total_submissions,
  COUNT(DISTINCT CASE WHEN sub.is_graded THEN sub.id END) as graded_submissions,
  COUNT(DISTINCT tul.id) as total_tool_uses,
  COUNT(DISTINCT lr.id) as lab_experiments,
  MAX(tul.last_used) as last_activity
FROM students s
LEFT JOIN student_grades sg ON s.id = sg.student_id
LEFT JOIN submissions sub ON s.id = sub.student_id
LEFT JOIN tool_usage_logs tul ON s.id = tul.student_id
LEFT JOIN lab_results lr ON s.id = lr.student_id
GROUP BY s.id, s.name, s.class_id;

-- عرض الواجبات المعلقة
CREATE OR REPLACE VIEW pending_assignments AS
SELECT
  a.id,
  a.title,
  a.due_date,
  a.type,
  t.name as teacher_name,
  COUNT(DISTINCT asn.student_id) as total_assigned,
  COUNT(DISTINCT CASE WHEN sub.is_submitted THEN sub.student_id END) as submitted_count
FROM assignments a
LEFT JOIN teachers t ON a.teacher_id = t.id
LEFT JOIN assignment_students asn ON a.id = asn.assignment_id
LEFT JOIN submissions sub ON a.id = sub.assignment_id
WHERE a.status = 'published' AND a.due_date > NOW()
GROUP BY a.id, a.title, a.due_date, a.type, t.name;

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- دالة حساب نسبة الخطأ
CREATE OR REPLACE FUNCTION calculate_error_percentage(
  measured DECIMAL,
  calculated DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
  IF calculated = 0 THEN
    RETURN 0;
  END IF;
  RETURN ABS((measured - calculated) / calculated) * 100;
END;
$$ LANGUAGE plpgsql;

-- دالة تحديث الدرجات تلقائياً
CREATE OR REPLACE FUNCTION update_grades_on_submission()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE submissions
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- دالة تسجيل استخدام الأداة
CREATE OR REPLACE FUNCTION log_tool_usage(
  p_student_id UUID,
  p_tool_name VARCHAR,
  p_tool_category VARCHAR,
  p_input_data JSONB DEFAULT NULL,
  p_result_data JSONB DEFAULT NULL,
  p_duration_seconds INT DEFAULT 0
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO tool_usage_logs (
    student_id,
    tool_name,
    tool_category,
    input_data,
    result_data,
    duration_seconds
  )
  VALUES (
    p_student_id,
    p_tool_name,
    p_tool_category,
    p_input_data,
    p_result_data,
    p_duration_seconds
  )
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERS
-- ============================================================

-- تحديث updated_at تلقائياً
CREATE TRIGGER update_teachers_updated_at
BEFORE UPDATE ON teachers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
BEFORE UPDATE ON assignments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lab_results_updated_at
BEFORE UPDATE ON lab_results
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- بيانات تجريبية (Sample Data)
-- ============================================================

-- إدراج معلم تجريبي
INSERT INTO teachers (email, name, subject, school)
VALUES
  ('teacher@example.com', 'أ. محمد علي', 'كيمياء', 'مدرسة التقدم'),
  ('teacher2@example.com', 'أ. فاطمة أحمد', 'كيمياء', 'مدرسة المستقبل')
ON CONFLICT (email) DO NOTHING;

-- إدراج طلاب تجريبيين
INSERT INTO students (name, class_id, teacher_id, email)
SELECT
  'أحمد محمد',
  '11A',
  (SELECT id FROM teachers WHERE email = 'teacher@example.com' LIMIT 1),
  'student1@example.com'
WHERE NOT EXISTS (SELECT 1 FROM students WHERE email = 'student1@example.com');

-- إدراج واجب تجريبي
INSERT INTO assignments (title, description, type, teacher_id, due_date, points)
SELECT
  'واجب: تسمية المركبات العضوية',
  'قم بتسمية 10 مركبات عضوية باستخدام قواعد IUPAC',
  'iupac_naming',
  (SELECT id FROM teachers WHERE email = 'teacher@example.com' LIMIT 1),
  CURRENT_TIMESTAMP + INTERVAL '7 days',
  100
WHERE NOT EXISTS (SELECT 1 FROM assignments WHERE title = 'واجب: تسمية المركبات العضوية');

-- ============================================================
-- الصلاحيات (Permissions)
-- ============================================================

-- منح الصلاحيات للمعلمين (يتم في Supabase Dashboard)
-- CREATE ROLE teacher_role;
-- GRANT SELECT, INSERT, UPDATE ON assignments TO teacher_role;
-- GRANT SELECT, INSERT, UPDATE ON submissions TO teacher_role;
-- etc...

-- ============================================================
-- اللغة والترميز
-- ============================================================
SET client_encoding = 'UTF8';
SET timezone = 'UTC';

-- ============================================================
-- ملاحظات مهمة:
-- ============================================================
/*
1. استخدم Supabase Dashboard لتشغيل هذا السكريبت
2. تأكد من تفعيل UUID Extension
3. يمكنك تعديل الجداول حسب احتياجاتك
4. استخدم Row Level Security (RLS) في الإعدادات
5. ركز على الأمان والخصوصية
6. قم بعمل Backup دوري للبيانات
*/
