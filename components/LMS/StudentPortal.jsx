"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, BookOpen, Clock, CheckCircle, ArrowLeft, LogOut, FileUp } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function StudentPortal() {
  const [studentName, setStudentName] = useState('');
  const [classId, setClassId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);
  
  const [assignments, setAssignments] = useState([]);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissionGrade, setSubmissionGrade] = useState('');

  useEffect(() => {
    // Check if user is logged in locally
    const savedStudent = localStorage.getItem('chemstry_student');
    if (savedStudent) {
      const parsed = JSON.parse(savedStudent);
      setStudentData(parsed);
      setIsLoggedIn(true);
      fetchAssignments();
    }
  }, []);

  const fetchAssignments = async () => {
    const { data, error } = await supabase.from('assignments').select('*').order('created_at', { ascending: false });
    if (data) setAssignments(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!studentName.trim()) return toast.error("يرجى إدخال اسمك");

    try {
      // Check if student exists
      let { data, error } = await supabase.from('students').select('*').eq('name', studentName).single();
      
      if (!data) {
        // Create new student
        const { data: newStudent, error: insertError } = await supabase
          .from('students')
          .insert([{ name: studentName, class_id: classId || 'General' }])
          .select()
          .single();
          
        if (insertError) throw insertError;
        data = newStudent;
      }

      setStudentData(data);
      setIsLoggedIn(true);
      localStorage.setItem('chemstry_student', JSON.stringify(data));
      fetchAssignments();
      toast.success(`أهلاً بك يا ${data.name}!`);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الدخول");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentData(null);
    localStorage.removeItem('chemstry_student');
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (!submissionGrade) return toast.error("يرجى إدخال نتيجة أو درجة الحل");

    try {
      const { error } = await supabase.from('submissions').insert([{
        assignment_id: activeAssignment.id,
        student_name: studentData.name,
        student_id: studentData.id,
        grade: parseFloat(submissionGrade)
      }]);

      if (error) throw error;
      
      toast.success("تم إرسال الحل بنجاح!");
      setActiveAssignment(null);
      setSubmissionGrade('');
    } catch (error) {
      console.error(error);
      toast.error("فشل في إرسال الحل");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
        <Toaster position="top-center" />
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-blue-600 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold">بوابة الطالب</h2>
            <p className="text-blue-100 mt-2 text-sm">أدخل بياناتك للوصول للواجبات والمختبر</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">الاسم الكامل</label>
              <input 
                type="text" 
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="أحمد محمد..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">رقم الفصل (اختياري)</label>
              <input 
                type="text" 
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="مثال: 12-علمي"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-500/30">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
              {studentData?.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">أهلاً، {studentData?.name}</h1>
              <p className="text-sm text-slate-500">الفصل: {studentData?.class_id}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="/lab" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors shadow-md shadow-purple-500/20 flex items-center gap-2">
              <FlaskConicalIcon className="w-4 h-4" />
              الذهاب للمختبر
            </a>
            <button onClick={handleLogout} className="p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-full transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {activeAssignment ? (
          /* Assignment View Mode */
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <button onClick={() => setActiveAssignment(null)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> العودة للقائمة
              </button>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-3">
                {activeAssignment.assignment_type}
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">{activeAssignment.title}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{activeAssignment.description}</p>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FileUp className="w-5 h-5 text-blue-600" /> تسليم الواجب
              </h3>
              
              <form onSubmit={handleSubmitAssignment} className="max-w-md">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">النتيجة النهائية (أو نسبة الخطأ إذا كانت تجربة)</label>
                  <input 
                    type="number"
                    required
                    value={submissionGrade}
                    onChange={(e) => setSubmissionGrade(e.target.value)}
                    className="w-full px-5 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="مثال: 95"
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  إرسال الحل
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* List Mode */
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" /> الواجبات المتاحة
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700">لقد أنجزت كل شيء!</h3>
                  <p className="text-slate-500 mt-2">لا توجد واجبات نشطة في الوقت الحالي.</p>
                </div>
              ) : (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer" onClick={() => setActiveAssignment(assignment)}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                        {assignment.assignment_type}
                      </span>
                      {assignment.due_date && (
                        <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          {new Date(assignment.due_date).toLocaleDateString('ar-EG')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{assignment.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6">
                      {assignment.description}
                    </p>
                    <button className="w-full py-3 bg-slate-50 text-blue-600 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      عرض التفاصيل وحل الواجب
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Icon helper
function FlaskConicalIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31M14 9.31V2M8.5 2h7M14 9.31l6.4 9.6A2 2 0 0 1 18.73 22H5.27a2 2 0 0 1-1.66-3.09L10 9.31M5.5 16h13" />
    </svg>
  );
}
