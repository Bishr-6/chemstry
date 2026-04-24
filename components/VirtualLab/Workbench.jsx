"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowRight, AlertTriangle, Zap, Droplets, FlaskConical, Save, Beaker, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Standard Reduction Potentials (V)
const STANDARD_POTENTIALS = {
  'Cu': 0.34,
  'Zn': -0.76,
  'Al': -1.66,
  'Mg': -2.37
};

export default function VirtualLabWorkbench() {
  const [studentData, setStudentData] = useState(null);
  const [experimentMode, setExperimentMode] = useState(null); // 'voltaic' | 'organic'
  
  // Voltaic Cell State
  const [leftBeaker, setLeftBeaker] = useState(null); // { metal, solution }
  const [rightBeaker, setRightBeaker] = useState(null); // { metal, solution }
  const [saltBridgePlaced, setSaltBridgePlaced] = useState(false);
  const [calculatedVoltage, setCalculatedVoltage] = useState(null);
  
  // Organic State
  const [reactionBeaker, setReactionBeaker] = useState([]);
  const [organicResult, setOrganicResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('chemstry_student');
    if (saved) setStudentData(JSON.parse(saved));
  }, []);

  // Calculate Voltaic Cell Voltage
  useEffect(() => {
    if (leftBeaker && rightBeaker && saltBridgePlaced) {
      if (!leftBeaker.metal || !rightBeaker.metal) return;
      
      const leftPot = STANDARD_POTENTIALS[leftBeaker.metal];
      const rightPot = STANDARD_POTENTIALS[rightBeaker.metal];
      
      // Determine Cathode (higher potential) and Anode (lower potential)
      const cathodePot = Math.max(leftPot, rightPot);
      const anodePot = Math.min(leftPot, rightPot);
      
      const voltage = cathodePot - anodePot;
      setCalculatedVoltage(voltage.toFixed(2));
    } else {
      setCalculatedVoltage(null);
    }
  }, [leftBeaker, rightBeaker, saltBridgePlaced]);

  // Handle Organic Reactions
  useEffect(() => {
    if (experimentMode !== 'organic') return;
    
    const ingredients = reactionBeaker.map(i => i.id).sort().join(',');
    
    if (ingredients.includes('CaC2') && ingredients.includes('Water')) {
      setOrganicResult({ type: 'ethyne', msg: "تفاعل كربيد الكالسيوم مع الماء لإنتاج غاز الإيثاين (تتصاعد فقاعات)." });
    } else if (ingredients.includes('Salicylic') && ingredients.includes('Methanol')) {
      setOrganicResult({ type: 'ester', msg: "تفاعل تكثيف: تكون إستر (ساليسيلات الميثيل) - رائحة تشبه النعناع أو أبو فاس." });
    } else {
      setOrganicResult(null);
    }
  }, [reactionBeaker, experimentMode]);

  const handleDragEnd = (event, info, item) => {
    // Simple collision detection based on X coordinate for simplicity in this demo
    const x = info.point.x;
    const y = info.point.y;
    
    // Very basic drop zones
    if (experimentMode === 'voltaic') {
      if (y > 300) {
        if (x < window.innerWidth / 2) {
          // Dropped in left beaker
          if (item.type === 'metal' || item.type === 'solution') {
            setLeftBeaker(prev => ({ ...prev, [item.type]: item.id }));
            toast.success(`تم وضع ${item.name} في الكأس الأيسر`);
          }
        } else {
          // Dropped in right beaker
          if (item.type === 'metal' || item.type === 'solution') {
            setRightBeaker(prev => ({ ...prev, [item.type]: item.id }));
            toast.success(`تم وضع ${item.name} في الكأس الأيمن`);
          }
        }
      }
    } else if (experimentMode === 'organic') {
      if (y > 300) {
        if (!reactionBeaker.find(i => i.id === item.id)) {
          setReactionBeaker(prev => [...prev, item]);
          toast.success(`تم إضافة ${item.name} لدورق التفاعل`);
        }
      }
    }
  };

  const submitLabReport = async () => {
    if (!studentData) return toast.error("يجب تسجيل الدخول لإرسال التقرير");
    
    try {
      let reportData = {
        student_name: studentData.name,
        experiment_type: experimentMode === 'voltaic' ? 'خلية فولتية' : 'كيمياء عضوية',
        created_at: new Date()
      };

      if (experimentMode === 'voltaic') {
        reportData.measured_voltage = calculatedVoltage;
        reportData.anode = STANDARD_POTENTIALS[leftBeaker?.metal] < STANDARD_POTENTIALS[rightBeaker?.metal] ? leftBeaker?.metal : rightBeaker?.metal;
        reportData.cathode = STANDARD_POTENTIALS[leftBeaker?.metal] > STANDARD_POTENTIALS[rightBeaker?.metal] ? leftBeaker?.metal : rightBeaker?.metal;
        reportData.observations = "تم توصيل الخلية وقياس الجهد بنجاح.";
      } else {
        reportData.observations = organicResult?.msg || "لم يحدث تفاعل معروف.";
      }

      const { error } = await supabase.from('lab_reports').insert([reportData]);
      if (error) throw error;
      toast.success("تم رفع تقرير المختبر لمعلمك بنجاح!");
      
      // Reset
      setLeftBeaker(null); setRightBeaker(null); setSaltBridgePlaced(false); setReactionBeaker([]);
    } catch (error) {
      toast.error("فشل إرسال التقرير");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col" dir="rtl">
      <Toaster position="top-center" />
      
      {/* Navbar */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-l from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              مختبر بريدج الافتراضي
            </h1>
            <p className="text-xs text-slate-400">مساحة العمل التفاعلية</p>
          </div>
        </div>
        <div className="flex gap-4">
          {!experimentMode && (
             <span className="text-amber-400 text-sm font-medium animate-pulse flex items-center gap-2">
               <AlertTriangle className="w-4 h-4"/> اختر نوع التجربة للبدء
             </span>
          )}
          {studentData && (
            <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-full border border-slate-600">
               <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
               <span className="text-sm font-medium">{studentData.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Lab Area */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Tools Sidebar */}
        <aside className="w-72 bg-slate-800 border-l border-slate-700 flex flex-col z-10 shadow-2xl">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-bold text-slate-200 mb-3">اختر التجربة:</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => { setExperimentMode('voltaic'); setReactionBeaker([]); }}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${experimentMode === 'voltaic' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                خلايا فولتية
              </button>
              <button 
                onClick={() => { setExperimentMode('organic'); setLeftBeaker(null); setRightBeaker(null); setSaltBridgePlaced(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${experimentMode === 'organic' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                كيمياء عضوية
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {experimentMode === 'voltaic' && (
              <>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">الأقطاب الفلزية (اسحب)</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Cu', name: 'نحاس (Cu)', color: 'bg-orange-700' },
                      { id: 'Zn', name: 'خارصين (Zn)', color: 'bg-slate-400' },
                      { id: 'Al', name: 'ألومنيوم (Al)', color: 'bg-slate-300' },
                      { id: 'Mg', name: 'مغنيسيوم (Mg)', color: 'bg-slate-200' },
                    ].map(metal => (
                      <motion.div 
                        key={metal.id} drag dragSnapToOrigin 
                        onDragEnd={(e, info) => handleDragEnd(e, info, { ...metal, type: 'metal' })}
                        className={`p-3 rounded-lg text-center cursor-grab active:cursor-grabbing border border-slate-600 shadow-sm ${metal.color} text-slate-900 font-bold`}
                      >
                        {metal.name}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">المحاليل (1M)</h3>
                  <div className="space-y-2">
                    {['Cu', 'Zn', 'Al', 'Mg'].map(metal => (
                      <motion.div 
                        key={metal} drag dragSnapToOrigin
                        onDragEnd={(e, info) => handleDragEnd(e, info, { id: metal, name: `نيترات ${metal}`, type: 'solution' })}
                        className="p-2 bg-blue-900/50 border border-blue-800 rounded-lg text-center cursor-grab flex items-center justify-center gap-2 text-blue-200"
                      >
                        <Droplets className="w-4 h-4 text-blue-400" /> نيترات {metal}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-700">
                  <button 
                    onClick={() => setSaltBridgePlaced(!saltBridgePlaced)}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saltBridgePlaced ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-amber-500 border border-amber-500/30 hover:bg-slate-600'}`}
                  >
                    {saltBridgePlaced ? <CheckCircle className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                    {saltBridgePlaced ? 'تم وضع القنطرة (KNO3)' : 'غمس ورق ترشيح (قنطرة)'}
                  </button>
                </div>
              </>
            )}

            {experimentMode === 'organic' && (
              <>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">المواد المتفاعلة (اسحب للدورق)</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'CaC2', name: 'كربيد الكالسيوم (صلب)' },
                      { id: 'Water', name: 'ماء مقطر' },
                      { id: 'Salicylic', name: 'حمض الساليسيليك' },
                      { id: 'Methanol', name: 'ميثانول' },
                      { id: 'H2SO4', name: 'حمض كبريتيك (قطرات)' }
                    ].map(item => (
                      <motion.div 
                        key={item.id} drag dragSnapToOrigin
                        onDragEnd={(e, info) => handleDragEnd(e, info, { ...item, type: 'organic_item' })}
                        className="p-3 bg-slate-700 border border-slate-600 rounded-lg cursor-grab hover:bg-slate-600 transition-colors flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        {item.name}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-700 bg-slate-800/80 backdrop-blur-sm">
            <button 
              onClick={submitLabReport}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Save className="w-5 h-5" />
              إرسال تقرير المختبر
            </button>
          </div>
        </aside>

        {/* Workbench Area (Drop Zone) */}
        <section className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-900 relative overflow-hidden flex flex-col">
          
          {/* Voltmeter Display */}
          {experimentMode === 'voltaic' && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-800 border-4 border-slate-700 rounded-2xl p-6 shadow-2xl shadow-black/50 z-20 w-80 text-center">
              <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Voltmeter</div>
              <div className="bg-black rounded-xl p-4 border border-slate-700">
                <div className={`text-5xl font-mono ${calculatedVoltage ? (calculatedVoltage > 0 ? 'text-emerald-400 shadow-emerald-500' : 'text-red-500') : 'text-slate-700'}`}>
                  {calculatedVoltage ? `${calculatedVoltage} V` : '0.00 V'}
                </div>
              </div>
              {calculatedVoltage && (
                <div className="mt-4 text-sm text-slate-300">
                  {calculatedVoltage > 0 ? 'تفاعل تلقائي (خلية جلفانية)' : 'تفاعل غير تلقائي'}
                </div>
              )}
            </div>
          )}

          {/* Workbench Table */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-slate-700 to-slate-800 border-t-8 border-slate-600 z-0"></div>

          {/* Experiment Objects */}
          <div className="flex-1 relative z-10 flex items-end justify-center pb-20">
            
            {experimentMode === 'voltaic' ? (
              <div className="flex items-end gap-24 relative">
                
                {/* Salt Bridge Visual */}
                {saltBridgePlaced && leftBeaker && rightBeaker && (
                  <motion.div 
                    initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-24 w-40 h-32 border-t-8 border-l-8 border-r-8 border-amber-100 rounded-t-3xl z-30 opacity-80"
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-900 text-xs px-2 py-1 rounded font-bold">قنطرة KNO3</div>
                  </motion.div>
                )}

                {/* Left Beaker */}
                <div className="relative flex flex-col items-center">
                  <div className="text-slate-300 mb-4 font-medium flex flex-col items-center">
                    <span>{leftBeaker?.solution ? `محلول ${leftBeaker.solution}` : 'كأس فارغ'}</span>
                  </div>
                  <div className="w-40 h-48 border-4 border-white/20 rounded-b-3xl relative overflow-hidden bg-white/5 backdrop-blur-sm shadow-xl">
                    {/* Solution Fill */}
                    <div className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${leftBeaker?.solution ? 'h-3/4 bg-blue-500/40' : 'h-0'}`}></div>
                    {/* Metal Strip */}
                    {leftBeaker?.metal && (
                      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-32 bg-gradient-to-b from-slate-400 to-slate-600 rounded-sm shadow-lg"></motion.div>
                    )}
                  </div>
                </div>

                {/* Right Beaker */}
                <div className="relative flex flex-col items-center">
                  <div className="text-slate-300 mb-4 font-medium flex flex-col items-center">
                    <span>{rightBeaker?.solution ? `محلول ${rightBeaker.solution}` : 'كأس فارغ'}</span>
                  </div>
                  <div className="w-40 h-48 border-4 border-white/20 rounded-b-3xl relative overflow-hidden bg-white/5 backdrop-blur-sm shadow-xl">
                    <div className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${rightBeaker?.solution ? 'h-3/4 bg-blue-500/40' : 'h-0'}`}></div>
                    {rightBeaker?.metal && (
                      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-32 bg-gradient-to-b from-slate-300 to-slate-500 rounded-sm shadow-lg"></motion.div>
                    )}
                  </div>
                </div>

              </div>
            ) : experimentMode === 'organic' ? (
              <div className="flex flex-col items-center relative">
                {/* Result Tooltip */}
                <AnimatePresence>
                  {organicResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="absolute -top-32 bg-emerald-900 border border-emerald-500 text-emerald-100 p-4 rounded-2xl shadow-2xl max-w-sm text-center"
                    >
                      <h4 className="font-bold mb-1">{organicResult.type === 'ethyne' ? 'تصاعد غاز!' : 'تكون رائحة!'}</h4>
                      <p className="text-sm">{organicResult.msg}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Reaction Flask */}
                <div className="relative">
                  <Beaker className="w-64 h-64 text-white/20" strokeWidth={1} />
                  
                  {/* Ingredients inside */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap-reverse justify-center gap-2 w-32">
                    {reactionBeaker.map((item, idx) => (
                      <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/20 text-xs font-medium text-slate-200">
                        {item.name.split(' ')[0]}
                      </motion.div>
                    ))}
                  </div>

                  {/* Bubble animation for Ethyne */}
                  {organicResult?.type === 'ethyne' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                       {[...Array(10)].map((_, i) => (
                         <motion.div 
                           key={i} 
                           initial={{ y: 150, x: 100 + Math.random() * 50, opacity: 0.8, scale: Math.random() * 0.5 + 0.5 }}
                           animate={{ y: -50, opacity: 0 }}
                           transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
                           className="absolute w-4 h-4 bg-blue-200/50 rounded-full border border-blue-100/50"
                         />
                       ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 bg-slate-800 p-4 rounded-xl border border-slate-700 min-w-[300px] text-center">
                  <h3 className="text-slate-400 text-sm font-bold mb-2">محتويات الدورق</h3>
                  {reactionBeaker.length === 0 ? (
                    <span className="text-slate-600">الدورق فارغ، اسحب المواد إليه</span>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-2">
                      {reactionBeaker.map((item, idx) => (
                        <span key={idx} className="text-sm text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {reactionBeaker.length > 0 && (
                     <button onClick={() => {setReactionBeaker([]); setOrganicResult(null);}} className="mt-4 text-xs text-red-400 hover:text-red-300">إفراغ الدورق</button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-2xl font-light">
                يرجى اختيار التجربة من القائمة الجانبية
              </div>
            )}
            
          </div>
        </section>
      </main>
    </div>
  );
}
