/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlayCircle, CheckCircle, Lock, ArrowLeft, ArrowRight, Download, 
  BookOpen, FileText, Check, Award, Video, ChevronRight, Menu, X, Sparkles, MessageCircle
} from 'lucide-react';
import { CourseLesson } from '../types';

export const LearningPortal: React.FC = () => {
  const { 
    courses, activeSlug, activeLessonId, setView, 
    markLessonCompleted, courseProgress, hasAccessToCourse, currentUser, t 
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Unauthenticated visitors cannot access the LMS classroom
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-slate-100 text-center">
        <div className="p-8 rounded-3xl bg-[#04081c]/90 border border-white/10 shadow-2xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">{t('Student Sign-In Required', 'শিক্ষার্থী লগইন প্রয়োজন')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('You must be signed in to access the BDIH LMS learning portal and student lessons.', 'কোর্সের ক্লাসরুমে প্রবেশ করতে লগইন করুন।')}
          </p>
          <button 
            onClick={() => setView('login')}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg"
          >
            {t('Sign In to Continue', 'লগইন করুন')}
          </button>
        </div>
      </div>
    );
  }

  // Find active course by slug or id
  const course = courses.find(c => c.slug === activeSlug || c.id === activeSlug) || courses[0];
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{t('Course not found', 'কোর্সটি খুঁজে পাওয়া যায়নি')}</h2>
        <button 
          onClick={() => setView('courses')}
          className="px-6 py-3 bg-sky-500 text-slate-950 font-bold rounded-xl"
        >
          {t('Browse Courses', 'কোর্সসমূহ দেখুন')}
        </button>
      </div>
    );
  }

  // Flatten all lessons to enable easy Next / Prev navigation
  const allLessons: { lesson: CourseLesson; moduleTitle: string }[] = course.modules.flatMap(m => 
    m.lessons.map(l => ({ lesson: l, moduleTitle: m.title_en }))
  );

  const activeLesson = allLessons.find(item => item.lesson.id === activeLessonId)?.lesson || allLessons[0]?.lesson;
  const activeIndex = allLessons.findIndex(item => item.lesson.id === activeLesson?.id);
  const prevLesson = activeIndex > 0 ? allLessons[activeIndex - 1].lesson : null;
  const nextLesson = activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1].lesson : null;

  const userHasAccess = hasAccessToCourse(course.id) || activeLesson?.is_free_preview;
  const completedIds = courseProgress[course.id]?.completedLessonIds || [];
  const isLessonCompleted = activeLesson ? completedIds.includes(activeLesson.id) : false;
  const progressPercent = Math.min(100, Math.round((completedIds.length / Math.max(1, allLessons.length)) * 100));

  const handleLessonSelect = (lesson: CourseLesson) => {
    setView('learn', course.slug, lesson.id);
    setSidebarOpen(false);
  };

  const handleMarkCompleteAndNext = () => {
    if (activeLesson) {
      markLessonCompleted(course.id, activeLesson.id);
    }
    if (nextLesson) {
      setView('learn', course.slug, nextLesson.id);
    }
  };

  return (
    <div id="bdih_learning_portal" className="min-h-screen bg-[#030612] text-slate-200">
      {/* Top Learning Navigation Bar */}
      <div className="sticky top-0 z-40 bg-[#040818]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('course-details', course.slug)}
            className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('Course Overview', 'কোর্স বিবরণ')}</span>
          </button>
          
          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div>
            <h1 className="text-white text-xs sm:text-sm font-bold truncate max-w-[220px] sm:max-w-md">
              {t(course.title_en, course.title_bn)}
            </h1>
            <span className="text-[10px] text-slate-400 font-mono">
              {t('Lesson', 'ক্লাস')} {activeIndex + 1} / {allLessons.length}
            </span>
          </div>
        </div>

        {/* Progress & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2.5">
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-sky-400 font-semibold">{progressPercent}%</span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 lg:hidden cursor-pointer"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-60px)]">
        {/* Main Content & Video Player Area */}
        <div className="lg:col-span-8 xl:col-span-9 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Video Player Box */}
            <div className="w-full bg-[#02040b] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative aspect-video flex items-center justify-center">
              {userHasAccess ? (
                activeLesson.video_url.includes('youtube') || activeLesson.video_url.includes('vimeo') ? (
                  <iframe 
                    src={activeLesson.video_url} 
                    title={activeLesson.title_en}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video 
                    src={activeLesson.video_url} 
                    controls 
                    className="w-full h-full object-cover"
                    poster={course.thumbnail}
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    {t('This lesson is locked', 'এই ক্লাসটি লক করা আছে')}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {t(
                      'Enroll in this masterclass to unlock all modules, video lectures, downloadable resources, and mentor support.',
                      'এই সম্পূর্ণ কোর্সের সকল ক্লাস, প্র্যাকটিস ফাইল ও মেন্টর সাপোর্ট পেতে এখনই এনরোল করুন।'
                    )}
                  </p>
                  <button
                    onClick={() => setView('checkout')}
                    className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    {t('Unlock Full Course', 'কোর্সে এনরোল করুন')}
                  </button>
                </div>
              )}
            </div>

            {/* Lesson Title & Primary Action Controls */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {activeLesson.duration_minutes} {t('Minutes', 'মিনিট')}
                  </span>
                  {activeLesson.is_free_preview && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {t('Free Preview', 'ফ্রি প্রিভিউ')}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {t(activeLesson.title_en, activeLesson.title_bn)}
                </h2>
              </div>

              {/* Completion Action */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleMarkCompleteAndNext}
                  className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    isLessonCompleted 
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' 
                      : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isLessonCompleted 
                      ? t('Completed ✓ (Go Next)', 'সম্পন্ন হয়েছে ✓ (পরের ক্লাস)') 
                      : t('Mark Complete & Next', 'কমপ্লিট ও পরবর্তী ক্লাস')}
                  </span>
                </button>
              </div>
            </div>

            {/* Lesson Notes & Downloadable Resources */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>{t('Lecture Highlights & Notes', 'লেকচার নোট ও মূল পয়েন্ট')}</span>
                </h3>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 leading-relaxed font-sans space-y-3">
                  <p>
                    {t(
                      activeLesson.notes_en || 'Follow the step-by-step chart examples demonstrated in this lesson. Pay special attention to institutional volume accumulation and the sequence of fair value gap mitigation before opening any limit orders.',
                      activeLesson.notes_bn || 'এই লেকচারে দেখানো চার্ট উদাহরণগুলো মন দিয়ে লক্ষ্য করুন। কোনো লিমিট অর্ডার বসানোর আগে প্রাতিষ্ঠানিক ভলিউম এবং ফেয়ার ভ্যালু গ্যাপ মিটিগেশনের ধাপগুলো অবশ্যই মিলিয়ে নেবেন।'
                    )}
                  </p>
                  <div className="p-3 bg-sky-500/5 border-l-2 border-sky-400 rounded-r-lg text-slate-300">
                    <strong className="text-sky-300 block mb-0.5 font-mono text-[11px]">{t('Pro Trader Rule:', 'প্রো ট্রেডার টিপ:')}</strong>
                    {t(
                      'Always wait for 15-minute structural confirmation (CHoCH) inside a Higher Timeframe (4H) Order Block to maximize your win-rate.',
                      'হাইয়ার টাইমফ্রেম (৪ঘণ্টা) অর্ডার ব্লকে প্রাইস আসলে অবশ্যই ১৫-মিনিটে স্ট্রাকচারাল কনফার্মেশনের অপেক্ষা করুন।'
                    )}
                  </div>
                </div>
              </div>

              {/* Resources Box */}
              <div>
                <h3 className="text-white font-bold text-sm flex items-center gap-2 mb-4">
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>{t('Lesson Resources', 'ডাউনলোড ফাইলস')}</span>
                </h3>
                {userHasAccess ? (
                  <div className="space-y-2.5">
                    <a 
                      href="https://bdih.com/resources/SMC_Checklist_CheatSheet.pdf" 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-sky-500/30 rounded-xl flex items-center justify-between text-xs transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <div>
                          <strong className="text-white block font-medium">SMC_Entry_CheatSheet.pdf</strong>
                          <span className="text-[10px] text-slate-400 font-mono">1.8 MB • PDF</span>
                        </div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400" />
                    </a>

                    <a 
                      href="https://bdih.com/resources/TradingView_PineScript_Rules.txt" 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-sky-500/30 rounded-xl flex items-center justify-between text-xs transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-sky-400" />
                        <div>
                          <strong className="text-white block font-medium">FVG_Calculation_Code.txt</strong>
                          <span className="text-[10px] text-slate-400 font-mono">Pine Script v5</span>
                        </div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400" />
                    </a>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 flex items-center gap-2 font-mono">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t('Files and strategy templates locked. Available to enrolled students.', 'ফাইল ও স্ট্র্যাটেজি টেমপ্লেট লক করা। এনরোলকৃত শিক্ষার্থীদের জন্য উন্মুক্ত।')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Lesson Pagination */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {prevLesson ? (
              <button
                onClick={() => setView('learn', course.slug, prevLesson.id)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('Previous Lesson', 'আগের ক্লাস')}</span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => setView('learn', course.slug, nextLesson.id)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/10 transition-colors cursor-pointer"
              >
                <span>{t('Next Lesson', 'পরের ক্লাস')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                <Award className="w-4 h-4" />
                <span>{t('Course Finished! Complete Certificate Available', 'অভিনন্দন! কোর্স সম্পন্ন হয়েছে')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Curriculum List */}
        <aside className={`
          fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-[#040819] border-l border-white/10 p-5 overflow-y-auto transition-transform duration-300
          lg:static lg:block lg:w-auto lg:z-10
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-mono">
              {t('Course Curriculum', 'কোর্স কারিকুলাম')}
            </h3>
            <span className="text-xs text-sky-400 font-mono font-bold">
              {completedIds.length}/{allLessons.length} {t('Done', 'সম্পন্ন')}
            </span>
          </div>

          <div className="space-y-5">
            {course.modules.map((module, mIdx) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-2 py-1 bg-white/[0.02] rounded-lg">
                  <span className="truncate">{t(module.title_en, module.title_bn)}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{module.lessons.length}</span>
                </div>

                <div className="space-y-1 pl-1">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson?.id;
                    const isDone = completedIds.includes(lesson.id);
                    const canAccess = hasAccessToCourse(course.id) || lesson.is_free_preview;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-sky-500/15 border border-sky-400/40 text-white font-bold' 
                            : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : canAccess ? (
                            <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <span className="truncate">{t(lesson.title_en, lesson.title_bn)}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                          {lesson.duration_minutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Student Telegram Support Badge */}
          <div className="mt-8 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20">
            <div className="flex items-center gap-2 mb-2 text-sky-400 font-bold text-xs">
              <MessageCircle className="w-4 h-4" />
              <span>{t('Need Help With This Lesson?', 'কোনো প্রশ্ন বা সমস্যা?')}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              {t(
                'Ask questions directly in our VIP Student Discord & Telegram channel. Instructors reply daily.',
                'আমাদের প্রাইভেট টেলিগ্রাম গ্রুপে সরাসরি চার্ট পাঠিয়ে প্রশ্ন করুন। মেন্টররা প্রতিদিন সাপোর্ট দেন।'
              )}
            </p>
            <a 
              href="https://t.me/bdih_community" 
              target="_blank" 
              rel="noreferrer"
              className="block w-full py-2 bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 text-center font-bold text-xs rounded-lg transition-colors"
            >
              {t('Open Student Community', 'টেলিগ্রাম কমিউনিটি')}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};
