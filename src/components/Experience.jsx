import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    period: "2022 - 2026",
    title: "Bachelor of Technology (CSE)",
    institution: "Rajasthan Technical University (RTU)",
    tag: "9.0 CGPA",
    icon: GraduationCap,
    gradient: "from-teal-600 to-blue-500"
  },
  {
    id: 2,
    period: "3 Months",
    title: "Data Analyst Trainee",
    institution: "Parivartan Skills Academy",
    tag: "DATA ANALYTICS",
    icon: Briefcase,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    period: "Completed 2022",
    title: "Higher Secondary (12th)",
    institution: "RBSE",
    tag: "83% SCORE",
    icon: BookOpen,
    gradient: "from-emerald-500 to-blue-500"
  }
];

export default function Experience() {
  const viewProps = { once: true, margin: "-50px" };

  return (
    <section id="experience" className="relative py-12 bg-black overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif font-bold text-[#84E255] tracking-widest uppercase mb-2"
          >
            My Journey
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-12 h-0.5 bg-[#84E255] mx-auto origin-center"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center/Left Vertical Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#1a3818] to-transparent md:-translate-x-1/2" />

          {timelineData.map(({ id, period, title, institution, tag, icon: Icon, gradient }, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={id} className={`relative flex w-full mb-8 md:mb-12 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>

                {/* Glowing Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={viewProps}
                  className="absolute left-[24px] md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full border-[2px] border-[#84E255] bg-black shadow-[0_0_10px_rgba(132,226,85,0.5)] z-10"
                />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  viewport={viewProps}
                  className="w-full pl-14 md:pl-0 md:w-[45%]"
                >
                  <div className="bg-[#090C10] border border-[#1C232B] rounded-xl p-4 md:p-5 hover:border-[#2a3542] transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md`}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <span className="text-[#84E255] text-xs md:text-sm font-medium tracking-wide">
                        {period}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-1 leading-snug">
                      {title}
                    </h3>
                    <p className="text-gray-400 font-serif italic text-xs md:text-sm mb-4">
                      {institution}
                    </p>

                    <span className="inline-block px-3 py-1 border border-[#1b3a1a] bg-[#0c1f0d] text-[#4ade80] text-[10px] md:text-xs font-semibold tracking-wider rounded uppercase">
                      {tag}
                    </span>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}