"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { BookOpen, Users, Activity, FileText, Plus, Database, FlaskConical, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const mockUsageData = [
  { name: 'الأحد', electrolysis: 40, dictionary: 24, lab: 15 },
  { name: 'الإثنين', electrolysis: 30, dictionary: 13, lab: 25 },
  { name: 'الثلاثاء', electrolysis: 20, dictionary: 58, lab: 30 },
  { name: 'الأربعاء', electrolysis: 27, dictionary: 39, lab: 40 },
  { name: 'الخميس', electrolysis: 18, dictionary: 48, lab: 35 },
];

const mockFunctionalGroups = [
  { name: 'الكحولات', errors: 45 },
  { name: 'الإيثرات', errors: 12 },
  { name: 'الأمينات', errors: 30 },
  { name: 'الإسترات', errors: 50 },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [labReports, setLabReports] = useState([]);
  
  // New Assignment State
  const [newAssignment, setNewAssignment] = useState({
    title: '', description: '', assignment_type: 'تسمية IUPAC', due_date: ''
  });
  
  // AI Question Generation State
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Assignments
      const { data: assignmentsData } = await supabase.from('assignments').select('*').order('created_at', { ascending: false });
      if (assignmentsData) setAssignments(assignmentsData);

      // Fetch Students
      const { data: studentsData } = await supabase.from('students').select('*');
      if (studentsData) setStudents(studentsData);

      // Fetch Submissions
      const { data: submissionsData } = await supabase.from('submissions').select('*, assignments(title)').order('submitted_at', { ascending: false });
      if (submissionsData) setSubmissions(submissionsData);
      
      // Fetch Lab Reports
      const { data: reportsData } = await supabase.from('lab_reports').select('*').order('created_at', { ascending: false });
      if (reportsData) setLabReports(reportsData);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("فشل في تحميل البيانات");
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      // Note: In a real app, teacher_id comes from auth user. Mocking for now.
      const mockTeacherId = '00000000-0000-0000-0000-000000000000'; 
      const { error } = await supabase.from('assignments').insert([
        { ...newAssignment, teacher_id: mockTeacherId }
      ]);
      
      if (error) throw error;
      
      toast.success("تم نشر الواجب بنجاح!");
      setNewAssignment({ title: '', description: '', assignment_type: 'تسمية IUPAC', due_date: '' });
      fetchData();
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء الواجب");
      console.error(error);
    }
  };

  const generateAIQuestions = async () => {
    if (!aiPrompt) return toast.error("يرجى إدخال موضوع الأسئلة");
    setIsGenerating(true);
    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, type: 'question_bank' })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      try {
        // Try parsing JSON if Groq returns a JSON string
        const parsed = JSON.parse(data.result);
        setGeneratedQuestions(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (e) {
        // If not JSON, just show text
        setGeneratedQuestions([{ question: data.result, options: [], correctAnswer: "" }]);
      }
      toast.success("تم توليد الأسئلة بنجاح");
    } catch (error) {
      toast.error("فشل توليد الأسئلة");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <Toaster position="top-center" />
      
      {/* Sidebar & Layout */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300">
          <div className="p-6 text-center border-b border-slate-800">
            <h1 className="text-2xl font-bold bg-gradient-to-l from-blue-400 to-emerald-400 bg-clip-text text-transparent">لوحة المعلم</h1>
            <p className="text-sm text-slate-400 mt-2">منصة كيمياء بريدج</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'overview', icon: <Activity className="w-5 h-5" />, label: 'نظرة عامة' },
              { id: 'assignments', icon: <FileText className="w-5 h-5" />, label: 'إدارة الواجبات' },
              { id: 'results', icon: <Users className="w-5 h-5" />, label: 'نتائج الطلاب' },
              { id: 'lab', icon: <FlaskConical className="w-5 h-5" />, label: 'تقارير المختبر' },
              { id: 'ai-bank', icon: <Database className="w-5 h-5" />, label: 'بنك الأسئلة الذكي' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          
          {/* Header */}
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                {activeTab === 'overview' && 'لوحة القيادة والتحليلات'}
                {activeTab === 'assignments' && 'إدارة الواجبات والمهام'}
                {activeTab === 'results' && 'سجل درجات الطلاب'}
                {activeTab === 'lab' && 'مراقبة التجارب الافتراضية'}
                {activeTab === 'ai-bank' && 'توليد الأسئلة باستخدام الذكاء الاصطناعي'}
              </h2>
              <p className="text-slate-500 mt-1">مرحباً بك، تابع أداء طلابك وإدارة محتوى الكيمياء.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium border border-slate-200">
                المعلم / أستاذ الكيمياء
              </span>
            </div>
          </header>

          {/* TAB: OVERVIEW (Charts & Analytics) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-8 h-8" /></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">إجمالي الطلاب</p>
                    <p className="text-3xl font-bold text-slate-800">{students.length || 0}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><FileText className="w-8 h-8" /></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">الواجبات النشطة</p>
                    <p className="text-3xl font-bold text-slate-800">{assignments.length || 0}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="p-4 bg-purple-50 text-purple-600 rounded-xl"><FlaskConical className="w-8 h-8" /></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">تجارب تم تنفيذها</p>
                    <p className="text-3xl font-bold text-slate-800">{labReports.length || 0}</p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">تحليلات استخدام أدوات الموقع</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockUsageData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Legend />
                        <Line type="monotone" dataKey="electrolysis" name="محاكي التحليل الكهربائي" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="dictionary" name="قاموس الهيدروكربونات" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="lab" name="المختبر الافتراضي" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    مراقب التقدم في المجموعات الوظيفية (أخطاء الطلاب)
                  </h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockFunctionalGroups} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                        <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="errors" name="عدد الأخطاء" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 text-center">بناءً على الأخطاء في اختبارات التسمية والبحث</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" /> نشر واجب جديد
                </h3>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">عنوان الواجب</label>
                    <input required type="text" value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="مثال: تسمية الألكانات" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">الوصف</label>
                    <textarea value={newAssignment.description} onChange={e => setNewAssignment({...newAssignment, description: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]" placeholder="أضف تعليمات الواجب..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">نوع الواجب (من الكتاب)</label>
                    <select value={newAssignment.assignment_type} onChange={e => setNewAssignment({...newAssignment, assignment_type: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                      <option>تسمية مركبات عضوية (IUPAC)</option>
                      <option>موازنة معادلات تأكسد واختزال</option>
                      <option>حساب التلقائية للتفاعلات</option>
                      <option>تقرير مختبر</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">الموعد النهائي</label>
                    <input required type="datetime-local" value={newAssignment.due_date} onChange={e => setNewAssignment({...newAssignment, due_date: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30">
                    نشر الواجب للطلاب
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4 text-slate-800">الواجبات الحالية</h3>
                <div className="space-y-4">
                  {assignments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                      <p className="text-slate-500">لا توجد واجبات منشورة حالياً.</p>
                    </div>
                  ) : (
                    assignments.map(assignment => (
                      <div key={assignment.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-200 transition-colors">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">{assignment.assignment_type}</span>
                            <h4 className="text-lg font-bold text-slate-800">{assignment.title}</h4>
                          </div>
                          <p className="text-slate-500 text-sm">{assignment.description}</p>
                        </div>
                        <div className="text-left sm:text-right text-sm">
                          <p className="text-slate-400">ينتهي في:</p>
                          <p className="font-medium text-slate-700">{new Date(assignment.due_date).toLocaleString('ar-EG')}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: RESULTS */}
          {activeTab === 'results' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-800">نتائج اختبارات الطلاب</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 text-slate-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">اسم الطالب</th>
                      <th className="px-6 py-4 font-medium">الواجب</th>
                      <th className="px-6 py-4 font-medium">الدرجة</th>
                      <th className="px-6 py-4 font-medium">تاريخ التسليم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {submissions.length === 0 ? (
                      <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">لا توجد تسليمات حتى الآن</td></tr>
                    ) : (
                      submissions.map(sub => (
                        <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-800">{sub.student_name}</td>
                          <td className="px-6 py-4 text-slate-600">{sub.assignments?.title || 'واجب غير معروف'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${sub.grade >= 90 ? 'bg-emerald-50 text-emerald-600' : sub.grade >= 70 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                              {sub.grade} / 100
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">{new Date(sub.submitted_at).toLocaleDateString('ar-EG')}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: LAB REPORTS */}
          {activeTab === 'lab' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">سجل التجارب الافتراضية</h3>
                <span className="text-sm text-slate-500">تقارير تجارب الكيمياء الكهربائية والعضوية</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 text-slate-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">الطالب</th>
                      <th className="px-6 py-4 font-medium">التجربة</th>
                      <th className="px-6 py-4 font-medium">الأنود / الكاثود</th>
                      <th className="px-6 py-4 font-medium">الجهد (الخطأ %)</th>
                      <th className="px-6 py-4 font-medium">ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {labReports.length === 0 ? (
                      <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">لا توجد تقارير مختبر بعد.</td></tr>
                    ) : (
                      labReports.map(report => (
                        <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-800">{report.student_name}</td>
                          <td className="px-6 py-4 text-slate-600">{report.experiment_type}</td>
                          <td className="px-6 py-4 text-slate-600" dir="ltr">{report.anode} | {report.cathode}</td>
                          <td className="px-6 py-4 text-slate-600">{report.measured_voltage}V <span className="text-xs text-red-500">({report.error_percentage}%)</span></td>
                          <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">{report.observations}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: AI QUESTION BANK */}
          {activeTab === 'ai-bank' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">توليد أسئلة SAT الذكية</h3>
                    <p className="text-sm text-slate-500">اسحب أسئلة تلقائية من نماذج المصادر باستخدام Groq API</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">موضوع الأسئلة</label>
                    <textarea 
                      value={aiPrompt} 
                      onChange={(e) => setAiPrompt(e.target.value)} 
                      placeholder="مثال: قم بإنشاء 3 أسئلة بصيغة SAT حول حساب جهد الخلية القياسية لخلايا الخارصين والنحاس..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[120px]"
                    />
                  </div>
                  <button 
                    onClick={generateAIQuestions}
                    disabled={isGenerating}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-xl font-medium transition-colors flex justify-center items-center gap-2 shadow-lg shadow-indigo-500/30"
                  >
                    {isGenerating ? (
                      <><span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> جاري التوليد...</>
                    ) : (
                      <>توليد الأسئلة الآن</>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-700 text-slate-200 overflow-y-auto max-h-[600px]">
                <h3 className="text-lg font-bold text-white mb-4">النتيجة المولّدة</h3>
                {!generatedQuestions ? (
                  <div className="h-full flex items-center justify-center text-slate-500">
                    الأسئلة ستظهر هنا بعد توليدها...
                  </div>
                ) : (
                  <div className="space-y-6">
                    {generatedQuestions.map((q, idx) => (
                      <div key={idx} className="bg-slate-700 p-4 rounded-xl border border-slate-600">
                        <p className="font-bold text-white mb-3">{idx + 1}. {q.question || q}</p>
                        {q.options && q.options.length > 0 && (
                          <ul className="space-y-2 mb-3">
                            {q.options.map((opt, i) => (
                              <li key={i} className={`p-2 rounded-lg ${q.correctAnswer === opt ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-600'}`}>
                                {opt}
                              </li>
                            ))}
                          </ul>
                        )}
                        {q.correctAnswer && (
                          <div className="text-sm text-emerald-400 font-medium mt-2">
                            الإجابة الصحيحة: {q.correctAnswer}
                          </div>
                        )}
                      </div>
                    ))}
                    <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors border border-slate-500">
                      حفظ في بنك الأسئلة
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
