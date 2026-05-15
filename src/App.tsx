/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

import {
  Calendar,
  MapPin,
  BookOpen,
  User,
  ChevronRight,
  CheckCircle2,
  Users,
  Send,
  Heart
} from 'lucide-react';

// --- Types ---
interface RSVPData {
  studentName: string;
  parentName: string;
  status: 'attendance' | 'absence' | 'consult';
  attendeesCount: number;
}

// --- Components ---

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const orbitStickers = [
  { src: 'assets/stickers/snoopy-skate.png', size: 92, angle: -12 },
  { src: 'assets/stickers/snoopy-hug-woodstock.png', size: 94, angle: 36 },
  { src: 'assets/stickers/snoopy-sleep.png', size: 96, angle: 82 },
  { src: 'assets/stickers/snoopy-pilot.png', size: 88, angle: 128 },
  { src: 'assets/stickers/snoopy-blue-bear.png', size: 86, angle: 178 },
  { src: 'assets/stickers/snoopy-hoodie.png', size: 86, angle: 228 },
  { src: 'assets/stickers/snoopy-lie.png', size: 84, angle: 274 },
  { src: 'assets/stickers/woodstock.png', size: 70, angle: 322 }
];

// Scroll-triggered fade-in wrapper
const ScrollReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const InvitationCard = () => {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className="flex flex-col gap-8 md:gap-12 w-full max-w-xl mx-auto">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isContainerInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative bg-gradient-to-br from-white via-pink-50/20 to-purple-50/10 rounded-3xl p-6 md:p-10 shadow-[0px_12px_50px_rgba(236,72,153,0.12)] overflow-hidden border-4 border-dashed border-pink-300"
      >
        {/* Doodle background patterns */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M0 40 Q 100 30, 200 40 T 400 40" stroke="#ec4899" strokeWidth="3" fill="none"/>
            <path d="M0 260 Q 80 250, 160 260 T 320 260 T 400 260" stroke="#f59e0b" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="80" r="3" fill="#3b82f6" opacity="0.4"/>
            <circle cx="350" cy="200" r="2" fill="#8b5cf6" opacity="0.4"/>
            <line x1="30" y1="150" x2="45" y2="150" stroke="#ec4899" strokeWidth="2" opacity="0.5"/>
            <line x1="370" y1="120" x2="385" y2="120" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>
          </svg>
        </div>
        
        {/* Animated decorative elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300"
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        
        {/* Floating decorative dots */}
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="flex flex-col items-center text-center space-y-4 mb-8 relative z-10">
          <motion.div className="flex gap-4 justify-center items-center">
            <motion.div
              animate={{ rotate: [0, -15, 0], y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl"
            >
              ✨
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-pink-500 uppercase"
            >
              TRƯỜNG TIỂU HỌC TRẦN QUANG CƠ
            </motion.span>
            <motion.div
              animate={{ rotate: [0, 15, 0], y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="px-6 py-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-pink-400/30 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -right-2 -top-1 text-lg"
            >
              ⭐
            </motion.div>
            Lớp 2.9
          </motion.div>
        </div>

        <motion.div
          className="text-center space-y-4 mb-2 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Decorative emojis above title */}
          <div className="flex justify-center gap-6 mb-4">
            <motion.div
              animate={{ rotate: [0, 360], y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-3xl"
            >
              💌
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl"
            >
              🎀
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-3xl"
            >
              💌
            </motion.div>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-navy leading-tight">
            Thiệp Mời <br />
            <motion.span
              className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Họp Phụ Huynh
            </motion.span>
          </h1>
          
          {/* Decorative line below title */}
          <motion.div
            className="flex justify-center gap-2 mt-4"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className="h-1 w-8 bg-pink-300 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="h-1 w-8 bg-blue-300 rounded-full"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Teacher Letter Section */}
      <ScrollReveal delay={0.1}>
        <motion.div
          className="relative bg-gradient-to-br from-white to-yellow-50/30 rounded-3xl p-6 md:p-8 border-4 border-dashed border-yellow-300 shadow-[0_4px_30px_rgba(245,158,11,0.08)] overflow-hidden group hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)] transition-all duration-300"
          whileHover={{ y: -2 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Doodle background patterns */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="none">
              <path d="M0 80 Q 100 70, 200 80 T 400 80" stroke="#f59e0b" strokeWidth="3" fill="none"/>
              <path d="M0 400 Q 80 390, 160 400 T 320 400 T 400 400" stroke="#ec4899" strokeWidth="2" fill="none"/>
              <circle cx="30" cy="150" r="3" fill="#3b82f6" opacity="0.5"/>
              <circle cx="370" cy="300" r="2" fill="#f59e0b" opacity="0.5"/>
              <line x1="40" y1="250" x2="55" y2="250" stroke="#ec4899" strokeWidth="2" opacity="0.6"/>
            </svg>
          </div>

          {/* Animated background */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Decorative corner elements */}
          <motion.div
            className="absolute top-4 right-4 text-2xl"
            animate={{ rotate: [0, 360], y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            📝
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-xl"
            animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💌
          </motion.div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10 border-b-2 border-dashed border-yellow-200 pb-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center text-yellow-600 shrink-0 shadow-md relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <User className="w-7 h-7" />
              <motion.div
                className="absolute -top-1 -right-1 text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                ⭐
              </motion.div>
            </motion.div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Lời ngỏ từ</p>
              <p className="text-base font-bold text-slate-800">GVCN: Trần Thuỵ Anh Thư</p>
            </div>
          </div>

          <motion.div
            className="text-left relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Lined paper background */}
            <div className="relative bg-white/60 rounded-lg p-6 md:p-8 overflow-hidden">
              {/* SVG lines background */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                {/* Vertical dashed line on left (like notebook spiral) */}
                <line x1="20" y1="0" x2="20" y2="100%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" opacity="0.6"/>
                
                {/* Horizontal lines for writing */}
                <line x1="0" y1="30" x2="100%" y2="30" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="70" x2="100%" y2="70" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="110" x2="100%" y2="110" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="150" x2="100%" y2="150" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="190" x2="100%" y2="190" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="230" x2="100%" y2="230" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="270" x2="100%" y2="270" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="310" x2="100%" y2="310" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="350" x2="100%" y2="350" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="390" x2="100%" y2="390" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="430" x2="100%" y2="430" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="470" x2="100%" y2="470" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="510" x2="100%" y2="510" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="550" x2="100%" y2="550" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="590" x2="100%" y2="590" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="630" x2="100%" y2="630" stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1="0" y1="670" x2="100%" y2="670" stroke="#e2e8f0" strokeWidth="1.5"/>
              </svg>

              {/* Doodle top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-12"
                style={{ pointerEvents: 'none' }}
              >
                <svg className="w-full h-full" viewBox="0 0 400 50" preserveAspectRatio="none">
                  {/* Wavy top border */}
                  <path d="M0 20 Q 30 10, 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 T 420 20" stroke="#ec4899" strokeWidth="2" fill="none"/>
                  {/* Stars */}
                  <text x="50" y="35" fontSize="16">⭐</text>
                  <text x="150" y="35" fontSize="16">✨</text>
                  <text x="250" y="35" fontSize="16">⭐</text>
                  <text x="350" y="35" fontSize="16">✨</text>
                </svg>
              </motion.div>

              {/* Content on top of lines */}
              <div className="relative z-10 space-y-8 pl-8">
                {/* Greeting line */}
                <motion.div
                  className="flex items-center gap-3 pt-6"
                  whileHover={{ x: 4 }}
                >
                  <p className="font-bold text-brand-navy text-lg">Kính gửi: Quý Phụ huynh,</p>
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="shrink-0"
                  >
                    👋
                  </motion.span>
                </motion.div>

                {/* First paragraph */}
                <motion.p
                  className="text-sm md:text-base text-slate-700 leading-relaxed indent-4"
                  whileHover={{ color: '#334155' }}
                >
                  Lời đầu tiên, giáo viên chủ nhiệm xin gửi lời cảm ơn chân thành nhất đến Quý Phụ huynh vì đã luôn tin tưởng, đồng hành và tạo điều kiện tốt nhất cho các con trong suốt năm học vừa qua.
                </motion.p>

                {/* Second paragraph */}
                <motion.p
                  className="text-sm md:text-base text-slate-700 leading-relaxed indent-4"
                  whileHover={{ color: '#334155' }}
                >
                  Một năm học nữa sắp khép lại với biết bao nỗ lực và sự trưởng thành đáng tự hào. Để cùng nhau nhìn lại chặng đường ấy, cũng như chia sẻ những định hướng sắp tới, trân trọng kính mời Quý Phụ huynh đến tham dự buổi họp tổng kết cuối năm.
                </motion.p>

                {/* Third paragraph */}
                <motion.p
                  className="text-sm md:text-base text-slate-700 leading-relaxed indent-4 italic flex items-center gap-2"
                  whileHover={{ color: '#334155' }}
                >
                  <span>Sự hiện diện của Quý Phụ huynh là niềm vinh hạnh và là nguồn động viên to lớn nhất dành cho các con!</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="shrink-0"
                  >
                    💖
                  </motion.span>
                </motion.p>
              </div>

              {/* Doodle bottom border */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-12"
                style={{ pointerEvents: 'none' }}
              >
                <svg className="w-full h-full" viewBox="0 0 400 50" preserveAspectRatio="none">
                  {/* Wavy bottom border */}
                  <path d="M0 30 Q 30 40, 60 30 T 120 30 T 180 30 T 240 30 T 300 30 T 360 30 T 420 30" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                </svg>
              </motion.div>

              {/* Decorative elements at bottom right */}
              <motion.div
                className="absolute bottom-4 right-6 flex gap-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ pointerEvents: 'none' }}
              >
                <div className="text-lg">✨</div>
                <div className="text-lg">💝</div>
                <div className="text-lg">✨</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </ScrollReveal>

      {/* Info Grid Section */}
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Time Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-gradient-to-br from-white to-blue-50/40 p-6 rounded-2xl space-y-4 border-4 border-dashed border-blue-300 shadow-[0_4px_20px_rgba(59,130,246,0.08)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] transition-all group cursor-pointer overflow-hidden relative"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 -z-10">
              <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                <path d="M0 30 Q 50 20, 100 30 T 200 30" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                <circle cx="30" cy="80" r="2" fill="#3b82f6"/>
                <circle cx="170" cy="120" r="1.5" fill="#3b82f6"/>
              </svg>
            </div>

            {/* Animated corner emoji */}
            <div className="absolute top-2 right-2 text-2xl">
              ⏰
            </div>
            <div className="absolute bottom-2 left-2 text-lg">
              ✨
            </div>

            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-blue-600 shadow-md relative border-2 border-blue-300"
              whileHover={{ rotate: 12 }}
            >
              <Calendar className="w-6 h-6" />
              <div className="absolute -top-2 -right-1 text-sm">
                ⭐
              </div>
            </motion.div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                ⏱️ Thời gian
              </p>
              <p className="text-lg font-semibold text-brand-navy group-hover:text-blue-700 transition-colors">8G00 ngày 17/5/2026</p>
              <p className="text-sm text-slate-500 mt-2 group-hover:text-slate-600 transition-colors">PH tập trung tại sân trường để gặp gỡ, trao đổi tâm tư nguyện vọng cùng cán bộ quản lý nhà trường; sau đó di chuyển lên lớp tham dự cuộc họp PH cuối học kì II.</p>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-gradient-to-br from-white to-purple-50/40 p-6 rounded-2xl space-y-4 border-4 border-dashed border-purple-300 shadow-[0_4px_20px_rgba(168,85,247,0.08)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all group cursor-pointer overflow-hidden relative"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 -z-10">
              <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                <path d="M0 40 Q 50 30, 100 40 T 200 40" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                <circle cx="40" cy="100" r="2" fill="#8b5cf6"/>
                <circle cx="160" cy="130" r="1.5" fill="#8b5cf6"/>
              </svg>
            </div>

            {/* Animated corner emoji */}
            <div className="absolute top-2 right-2 text-2xl">
              📍
            </div>
            <div className="absolute bottom-2 left-2 text-lg">
              💫
            </div>

            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center text-purple-600 shadow-md relative border-2 border-purple-300"
              whileHover={{ rotate: 12 }}
            >
              <MapPin className="w-6 h-6" />
              <div className="absolute -top-2 -right-1 text-sm">
                ⭐
              </div>
            </motion.div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                📌 Địa điểm
              </p>
              <p className="text-lg font-semibold text-brand-navy group-hover:text-purple-700 transition-colors">PHÒNG HỌC LỚP 29 - PHÒNG SỐ 11</p>
            </div>
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Content Checklist Section */}
      <ScrollReveal delay={0.2}>
        <motion.div
          className="relative bg-gradient-to-br from-white via-pink-50/20 to-blue-50/10 border-4 border-dashed border-pink-300 rounded-3xl p-8 md:p-10 overflow-hidden"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ y: -2 }}
        >
          {/* Colorful doodle background patterns */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
              {/* Wavy lines */}
              <path d="M0 50 Q 100 40, 200 50 T 400 50" stroke="#ec4899" strokeWidth="3" fill="none"/>
              <path d="M0 150 Q 80 140, 160 150 T 320 150 T 400 150" stroke="#f59e0b" strokeWidth="2" fill="none"/>
              <path d="M0 300 Q 100 290, 200 300 T 400 300" stroke="#3b82f6" strokeWidth="2" fill="none"/>
              <path d="M0 500 Q 90 490, 180 500 T 360 500 T 400 500" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
              
              {/* Dashes and dots */}
              <line x1="20" y1="80" x2="35" y2="80" stroke="#ec4899" strokeWidth="2" opacity="0.5"/>
              <line x1="380" y1="120" x2="395" y2="120" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>
              <circle cx="30" cy="400" r="3" fill="#f59e0b" opacity="0.6"/>
              <circle cx="360" cy="350" r="3" fill="#8b5cf6" opacity="0.6"/>
            </svg>
          </div>

          {/* Header with animated emojis */}
          <motion.div
            className="mb-10 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Floating emojis around header */}
            <div className="absolute -top-6 left-4 text-2xl">
              <motion.div
                animate={{ rotate: [0, 360], y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                ⭐
              </motion.div>
            </div>
            <div className="absolute -top-4 right-6 text-xl">
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [-20, 20, -20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                ✨
              </motion.div>
            </div>

            {/* Main header content */}
            <div className="flex items-center justify-between mb-8 px-2">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl"
              >
                📚
              </motion.div>

              <div className="text-center flex-1">
                <h3 className="font-display text-3xl font-bold text-brand-navy mb-3">Nội dung cuộc họp</h3>
                {/* Decorative underline with animation */}
                <motion.div
                  className="flex justify-center items-center gap-1 mb-2"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <div className="h-1 flex-1 max-w-[40px] bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <div className="h-1 flex-1 max-w-[40px] bg-blue-400 rounded-full"></div>
                </motion.div>
                <motion.div
                  className="text-xs font-bold text-pink-500 tracking-widest"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Những điều quan trọng
                </motion.div>
              </div>

              <motion.div
                animate={{ rotate: [-15, 15, -15], y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl"
              >
                🎉
              </motion.div>
            </div>
          </motion.div>

          {/* Content items with doodle style */}
          <div className="space-y-5">
            {[
              {
                num: 1,
                title: 'Báo cáo kết quả năm học',
                desc: 'Báo cáo kết quả năm học của lớp.',
                emoji: '📖',
                color: 'from-pink-50 to-pink-100',
                borderColor: 'border-pink-300',
                accentColor: 'text-pink-600'
              },
              {
                num: 2,
                title: 'Thông báo các hoạt động cuối năm',
                desc: 'Thông báo các hoạt động cuối năm của lớp và nhà trường.',
                emoji: '💡',
                color: 'from-blue-50 to-blue-100',
                borderColor: 'border-blue-300',
                accentColor: 'text-blue-600'
              },
              {
                num: 3,
                title: 'Thông báo thời gian nghỉ hè, đăng ký sách lớp 3',
                desc: 'Thông tin thời gian nghỉ hè và hướng dẫn đăng ký sách lớp 3.',
                emoji: '🌈',
                color: 'from-purple-50 to-purple-100',
                borderColor: 'border-purple-300',
                accentColor: 'text-purple-600'
              },
              {
                num: 4,
                title: 'Đăng ký các môn học theo hoạt động giáo dục nhà trường',
                desc: 'Thống nhất đăng ký các môn học theo chương trình hoạt động giáo dục của nhà trường.',
                emoji: '📝',
                color: 'from-pink-50 to-pink-100',
                borderColor: 'border-pink-300',
                accentColor: 'text-pink-600'
              },
              {
                num: 5,
                title: 'Lấy ý kiến quà khen thưởng cuối năm',
                desc: 'Lấy ý kiến phụ huynh về quà khen thưởng cuối năm cho học sinh.',
                emoji: '🎁',
                color: 'from-blue-50 to-blue-100',
                borderColor: 'border-blue-300',
                accentColor: 'text-blue-600'
              },
              {
                num: 6,
                title: 'Ý kiến đóng góp',
                desc: 'Phụ huynh đóng góp ý kiến để phối hợp giáo dục học sinh tốt hơn.',
                emoji: '💬',
                color: 'from-purple-50 to-purple-100',
                borderColor: 'border-purple-300',
                accentColor: 'text-purple-600'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ x: 6, y: -2 }}
                className="group cursor-pointer"
              >
                <motion.div
                  className={`relative bg-gradient-to-br ${item.color} border-4 ${item.borderColor} rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all overflow-hidden`}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.8 + idx * 0.15, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Doodle background pattern for this item */}
                  <div className="absolute top-2 right-3 text-sm opacity-20">
                    {item.emoji}
                  </div>

                  {/* Decorative doodle dots */}
                  <motion.div
                    className="absolute top-1 left-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-2 right-2 w-1 h-1 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Number badge with doodle effect */}
                    <motion.div
                      className={`mt-1 w-12 h-12 rounded-2xl bg-white border-3 ${item.borderColor} ${item.accentColor} flex items-center justify-center shrink-0 font-bold text-lg shadow-md relative`}
                      animate={{ rotate: [0, 8, -8, 0], y: [0, -6, 0] }}
                      transition={{ duration: 3 + idx * 0.15, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.15 }}
                    >
                      {item.num}
                      {/* Small rotating star around number */}
                      <motion.div
                        className="absolute -top-1 -right-1 text-lg"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="flex-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.2 + 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`font-bold text-lg ${item.accentColor} group-hover:scale-105 transition-transform`}>
                          {item.title}
                        </h4>
                        <span className="text-xl group-hover:scale-125 transition-transform">{item.emoji}</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                        {item.desc}
                      </p>
                      {/* Decorative underline for each item */}
                      <motion.div
                        className="mt-3 h-0.5 bg-gradient-to-r rounded-full"
                        style={{
                          background: item.num === 1 ? 'linear-gradient(to right, #ec4899, #f472b6)' : 
                                    item.num === 2 ? 'linear-gradient(to right, #3b82f6, #60a5fa)' : 
                                    'linear-gradient(to right, #8b5cf6, #a78bfa)'
                        }}
                        animate={{ scaleX: [0.8, 1, 0.8] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  {/* Corner doodle decorations */}
                  <motion.div
                    className="absolute top-0 right-0 text-2xl opacity-30"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    ⭐
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative elements */}
          <motion.div
            className="mt-8 flex justify-center gap-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-2xl">💖</div>
            <div className="text-2xl">📚</div>
            <div className="text-2xl">🎈</div>
          </motion.div>
        </motion.div>
      </ScrollReveal>
    </div>
  );
};

const RSVPForm = ({ onSubmit }: { onSubmit: (data: RSVPData) => void }) => {
  const [formData, setFormData] = useState<RSVPData>({
    studentName: '',
    parentName: '',
    status: 'attendance',
    attendeesCount: 1
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const statusOptions = [
    { value: 'attendance', label: 'Sẽ tham dự', icon: CheckCircle2, color: 'bg-green-50 border-green-200 text-green-600' },
    { value: 'absence', label: 'Không thể tham dự', icon: CheckCircle2, color: 'bg-red-50 border-red-200 text-red-600' },
    { value: 'consult', label: 'Cần trao đổi thêm', icon: CheckCircle2, color: 'bg-blue-50 border-blue-200 text-blue-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className="relative glass-card rounded-3xl p-6 md:p-10 shadow-[0px_20px_60px_rgba(236,72,153,0.15)] border border-pink-100/50 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-white to-blue-50/20 pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-pink-200/10 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl translate-y-16 -translate-x-16 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-navy">Xác nhận tham dự</h2>
            <p className="text-xs text-slate-500 mt-0.5">Vui lòng cung cấp thông tin chi tiết</p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-7">
          {/* Student Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-3"
          >
            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2 pl-1">
              <User className="w-3.5 h-3.5 text-pink-400" />
              Tên học sinh
            </label>
            <motion.div
              animate={focusedField === 'student' ? { scale: 1.02 } : { scale: 1 }}
              className="relative"
            >
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                onFocus={() => setFocusedField('student')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-pink-400 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)] transition-all duration-300 placeholder:text-slate-400"
                value={formData.studentName}
                onChange={e => setFormData({ ...formData, studentName: e.target.value })}
              />
              {focusedField === 'student' && (
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Parent Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2 pl-1">
              <User className="w-3.5 h-3.5 text-pink-400" />
              Tên phụ huynh
            </label>
            <motion.div
              animate={focusedField === 'parent' ? { scale: 1.02 } : { scale: 1 }}
              className="relative"
            >
              <input
                type="text"
                required
                placeholder="Nguyễn Văn B"
                onFocus={() => setFocusedField('parent')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-pink-400 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)] transition-all duration-300 placeholder:text-slate-400"
                value={formData.parentName}
                onChange={e => setFormData({ ...formData, parentName: e.target.value })}
              />
              {focusedField === 'parent' && (
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Status Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="space-y-3"
          >
            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2 pl-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
              Tình trạng tham dự
            </label>
            <div className="grid grid-cols-1 gap-3">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer relative"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={formData.status === option.value}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                      className="hidden"
                    />
                    <motion.div
                      animate={formData.status === option.value ? { 
                        backgroundColor: option.value === 'attendance' ? '#dcfce7' : option.value === 'absence' ? '#fee2e2' : '#dbeafe',
                        borderColor: option.value === 'attendance' ? '#22c55e' : option.value === 'absence' ? '#ef4444' : '#3b82f6'
                      } : { 
                        backgroundColor: '#f8fafc',
                        borderColor: '#e2e8f0'
                      }}
                      className="w-full border-2 rounded-2xl px-4 py-4 transition-all duration-300 flex items-center gap-3 group"
                    >
                      <motion.div
                        animate={formData.status === option.value ? { scale: 1.1 } : { scale: 1 }}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.status === option.value 
                            ? (option.value === 'attendance' ? 'bg-green-500 border-green-500' : option.value === 'absence' ? 'bg-red-500 border-red-500' : 'bg-blue-500 border-blue-500')
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {formData.status === option.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </motion.div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors flex-1">
                        {option.label}
                      </span>
                      {formData.status === option.value && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          className={option.value === 'attendance' ? 'text-green-600' : option.value === 'absence' ? 'text-red-600' : 'text-blue-600'}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.label>
                );
              })}
            </div>
          </motion.div>

          {/* Attendees Counter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3 bg-gradient-to-r from-pink-50/30 to-purple-50/30 rounded-2xl p-5 border border-pink-100/50"
          >
            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2 pl-1">
              <Users className="w-3.5 h-3.5 text-pink-400" />
              Số người tham dự
            </label>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setFormData({ ...formData, attendeesCount: Math.max(1, formData.attendeesCount - 1) })}
                className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-pink-300 bg-white hover:bg-pink-50 text-pink-500 font-bold text-lg transition-all shadow-sm"
              >
                −
              </motion.button>
              <motion.div
                animate={{ scale: formData.attendeesCount > 1 ? 1.05 : 1 }}
                className="flex-1 bg-white border-2 border-pink-200 rounded-xl px-4 py-3 text-center font-bold text-xl text-brand-navy shadow-sm"
              >
                {formData.attendeesCount}
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setFormData({ ...formData, attendeesCount: Math.min(5, formData.attendeesCount + 1) })}
                className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-pink-300 bg-white hover:bg-pink-50 text-pink-500 font-bold text-lg transition-all shadow-sm"
              >
                +
              </motion.button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl py-5 px-6 font-bold text-base shadow-[0_12px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_16px_50px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"
              />
              <span className="relative">Xác nhận tham dự</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative"
              >
                <Send className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const SuccessState = ({ data, onReset }: { data: RSVPData, onReset: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card rounded-2xl p-10 text-center space-y-6 shadow-[0px_8px_40px_rgba(0,0,0,0.03)]"
    >
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-brand-navy">Gửi thành công!</h2>
        <p className="text-sm text-slate-500">Cảm ơn Phụ huynh của <span className="font-bold text-slate-800">{data.studentName}</span> đã phản hồi.</p>
      </div>
      <div className="p-4 bg-white/50 border border-slate-100 rounded-xl text-left space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Users className="w-3 h-3" />
          <span>Số người: {data.attendeesCount}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="w-3 h-3" />
          <span>Trạng thái: {data.status === 'attendance' ? 'Có mặt' : data.status === 'absence' ? 'Vắng mặt' : 'Liên hệ sau'}</span>
        </div>
      </div>
      <button
        onClick={onReset}
        className="text-brand-gold font-bold text-sm hover:underline flex items-center gap-1 mx-auto"
      >
        Thay đổi phản hồi <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg className={className} width="80" height="80" viewBox="0 0 80 80" fill="none">
    <path d="M0 0C0 0 20 5 35 20S50 60 50 60C50 60 45 35 30 20S0 0 0 0Z" fill="currentColor" opacity="0.15"/>
    <path d="M0 0C0 0 10 8 20 25S25 55 25 55C25 55 22 30 15 18S0 0 0 0Z" fill="currentColor" opacity="0.25"/>
    <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.3"/>
    <circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.2"/>
  </svg>
);

const FloatingParticles = () => {
  const particles = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${15 + Math.random() * 70}%`,
    delay: i * 1.8,
    duration: 8 + Math.random() * 6,
    size: 6 + Math.random() * 8,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 text-pink-300/40"
          style={{ left: p.left }}
          animate={{ y: [0, -600], rotate: [0, 360], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="fill-current" style={{ width: p.size, height: p.size }} />
        </motion.div>
      ))}
    </div>
  );
};

const EnvelopeCover = ({ onOpen }: { onOpen: () => void }) => {
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'revealing'>('sealed');
  const [isHoveringEnvelope, setIsHoveringEnvelope] = useState(false);

  const handleOpen = () => {
    if (phase !== 'sealed') return;
    setPhase('opening');
    // Flap opens slowly, then letter slides up
    setTimeout(() => setPhase('revealing'), 1000);
    // Longer reveal so user can read the card
    setTimeout(() => onOpen(), 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center my-auto h-full py-6"
    >
      <div className="relative w-full max-w-md envelope-scene px-2 pt-12 pb-2">
        <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sky-100/50 via-rose-100/35 to-amber-100/45 blur-2xl" />

        {/* --- OUTER ENVELOPE BACKDROP --- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="absolute inset-x-1 top-5 bottom-1 rounded-[2rem] bg-gradient-to-br from-blue-50 via-pink-50/70 to-yellow-50 border border-white/85 shadow-[0_24px_70px_rgba(15,23,42,0.1)] overflow-hidden"
        >
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 35%, rgba(251,191,36,0.08) 100%)'
            }}
          />
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
              backgroundSize: '14px 14px'
            }}
          />
          <div className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(244,114,182,0.18) 0, rgba(244,114,182,0.18) 1px, transparent 1px, transparent 14px)'
            }}
          />
          <div className="absolute top-14 -left-3 w-5 h-28 rounded-r-full bg-gradient-to-b from-rose-200/65 to-amber-200/65 shadow-sm" />
          <div className="absolute top-14 -right-3 w-5 h-28 rounded-l-full bg-gradient-to-b from-sky-200/65 to-rose-200/65 shadow-sm" />
          <div className="absolute -top-10 -right-4 w-36 h-36 rounded-full bg-sky-200/35 blur-2xl" />
          <div className="absolute -bottom-12 -left-6 w-40 h-40 rounded-full bg-amber-200/35 blur-2xl" />
          <div className="absolute inset-x-8 top-5 h-[3px] rounded-full bg-gradient-to-r from-sky-300/70 via-rose-300/70 to-amber-300/70" />

          {/* Ribbon and bow on outer envelope */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-40 h-8 pointer-events-none">
            <div className="absolute inset-x-0 top-3 h-[2px] bg-gradient-to-r from-transparent via-rose-300/80 to-transparent" />
            <div className="absolute left-1/2 -translate-x-[120%] top-1 w-4 h-5 rounded-l-full bg-rose-300/80 rotate-[20deg]" />
            <div className="absolute left-1/2 translate-x-[20%] top-1 w-4 h-5 rounded-r-full bg-rose-300/80 -rotate-[20deg]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-rose-400/90 ring-2 ring-white/60" />
          </div>

          {/* Tiny decorative stamp */}
          <div className="absolute top-8 right-6 rotate-[8deg] w-12 h-14 rounded-md border border-rose-300/70 bg-white/70 backdrop-blur-[1px] shadow-sm flex items-center justify-center text-rose-400">
            <Heart className="w-4 h-4 fill-current" />
          </div>

          {/* Cute stickers inspired by sample style */}
          <div className="absolute top-9 left-6 w-11 h-11 rounded-2xl border-2 border-sky-200/80 bg-white/85 shadow-sm flex items-center justify-center text-xl">🚀</div>
          <div className="absolute top-10 left-20 w-11 h-11 rounded-2xl border-2 border-rose-200/80 bg-white/85 shadow-sm flex items-center justify-center text-xl">🧸</div>
          <div className="absolute top-9 left-[8.5rem] w-10 h-10 rounded-2xl border-2 border-indigo-200/80 bg-white/85 shadow-sm flex items-center justify-center text-lg">🫧</div>
          <div className="absolute bottom-7 left-8 w-10 h-10 rounded-2xl border-2 border-lime-200/80 bg-white/85 shadow-sm flex items-center justify-center text-lg">👽</div>
          <div className="absolute bottom-8 right-8 w-11 h-11 rounded-2xl border-2 border-amber-200/80 bg-white/85 shadow-sm flex items-center justify-center text-xl">🐻</div>
        </motion.div>

        {/* --- THE LETTER (slides up from inside) --- */}
        <motion.div
          className={`absolute inset-x-4 top-4 bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center text-center space-y-4 border-2 border-dashed border-pink-200 ${phase === 'revealing' ? 'z-40' : 'z-0'}`}
          initial={{ y: 120, opacity: 0 }}
          animate={phase === 'revealing' ? { y: -200, opacity: 1 } : phase === 'opening' ? { y: 88, opacity: 0.5 } : { y: 120, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-gradient-to-r from-sky-100/80 via-pink-100/80 to-yellow-100/80 border border-white/80 shadow-sm flex items-center justify-center text-[10px]">⭐ Lớp 2.9 ⭐</div>
          <CornerOrnament className="absolute top-1 left-1 text-pink-400 w-12 h-12" />
          <CornerOrnament className="absolute top-1 right-1 text-pink-400 -scale-x-100 w-12 h-12" />

          <span className="mt-4 text-[9px] font-bold tracking-[0.22em] text-pink-400 uppercase">
            Trường Tiểu Học Trần Quang Cơ
          </span>
          <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-[0.3em] text-pink-400 uppercase">
              Trân Trọng Kính Mời
            </p>
            <h1 className="font-display text-3xl shimmer-text leading-tight font-extrabold">
              Quý Phụ Huynh
            </h1>
          </div>
          <p className="text-xs text-slate-500 italic leading-relaxed">
            Đến dự buổi họp phụ huynh<br />tổng kết năm học lớp 2A
          </p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-sky-500 uppercase tracking-wider">
            <span>💌</span>
            <span>Mời tham dự</span>
            <span>✨</span>
          </div>
          <div className="flex items-center gap-2 w-full max-w-[140px]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-300" />
            <Heart className="w-2.5 h-2.5 text-pink-300 fill-pink-300" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </motion.div>

        {/* --- THE ENVELOPE BODY --- */}
        <motion.div
          className="relative bg-gradient-to-b from-rose-50 via-white to-orange-50 rounded-3xl shadow-[0_20px_80px_rgba(244,63,94,0.14)] overflow-hidden cursor-pointer border border-rose-100"
          onClick={handleOpen}
          onHoverStart={() => setIsHoveringEnvelope(true)}
          onHoverEnd={() => setIsHoveringEnvelope(false)}
          whileHover={phase === 'sealed' ? { y: -4 } : {}}
          whileTap={phase === 'sealed' ? { scale: 0.98 } : {}}
          style={{ minHeight: 380 }}
        >
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_2px_0_rgba(255,255,255,0.8),inset_0_-12px_30px_rgba(251,113,133,0.08)] z-0" />

          <FloatingParticles />

          {/* Envelope body gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-100/45 via-transparent to-orange-100/40 z-0" />

          {/* Diamond pattern inside envelope */}
          <div className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #fb7185 0, #fb7185 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Envelope V-shape fold lines */}
          <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 380">
            <path d="M0 0 L200 140 L400 0" fill="none" stroke="rgba(236,72,153,0.08)" strokeWidth="1" />
            <path d="M0 380 L130 220 L0 0" fill="none" stroke="rgba(244,63,94,0.1)" strokeWidth="1" />
            <path d="M400 380 L270 220 L400 0" fill="none" stroke="rgba(251,146,60,0.11)" strokeWidth="1" />
          </svg>

          {/* Bottom decorative band */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-200 via-rose-400 to-orange-200 z-20" />

          {/* Corner ornaments on envelope */}
          <CornerOrnament className="absolute bottom-2 left-2 text-rose-400 -scale-y-100 z-10" />
          <CornerOrnament className="absolute bottom-2 right-2 text-rose-400 -scale-x-100 -scale-y-100 z-10" />

          {/* Center content when sealed */}
          <AnimatePresence>
            {phase === 'sealed' && (
              <motion.div
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center justify-center text-center px-8 pt-32 pb-16 space-y-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute top-[118px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 shadow-[0_8px_20px_rgba(244,63,94,0.3)] ring-4 ring-white/60 flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-pink-400 font-bold tracking-widest uppercase"
                >
                  Nhấn để mở thiệp
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); handleOpen(); }}
                  className="bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full py-3 px-7 font-bold text-sm shadow-[0_8px_30px_rgba(236,72,153,0.3)] flex items-center gap-2 group"
                >
                  Mở Thiệp Mời
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- THE ENVELOPE FLAP (top triangle) --- */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-30 envelope-flap"
          initial={{ rotateX: 0 }}
          animate={phase !== 'sealed' ? { rotateX: 180 } : { rotateX: isHoveringEnvelope ? 18 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'top center', perspective: 800 }}
        >
          {/* Front of flap */}
          <svg className="w-full" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff1f2" />
                <stop offset="100%" stopColor="#ffe4e6" />
              </linearGradient>
            </defs>
            <path d="M0 0 L400 0 L200 120 Z" fill="url(#flapGrad)" />
            <path d="M0 0 L400 0 L200 120 Z" fill="none" stroke="rgba(244,63,94,0.18)" strokeWidth="1" />
          </svg>
          {/* Seal circle on flap */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2">
            <div className="w-8 h-8 rounded-full bg-rose-400/90 flex items-center justify-center shadow-md ring-2 ring-white/60">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
          </div>
        </motion.div>

        {/* Top decorative band (sits behind flap) */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-200 via-rose-400 to-orange-200 z-[5] rounded-t-3xl" />
      </div>
    </motion.div>
  );
};

// --- App Layout ---

export default function App() {
  const [submittedData, setSubmittedData] = useState<RSVPData | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/70 to-sky-100/70 relative overflow-x-hidden selection:bg-brand-gold-light/30 flex flex-col">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 16% 25%, rgba(191,219,254,0.45) 0, transparent 46%), radial-gradient(circle at 78% 18%, rgba(219,234,254,0.35) 0, transparent 34%), radial-gradient(circle at 70% 78%, rgba(253,242,248,0.6) 0, transparent 42%)'
        }}
      />

      {/* Moon themed animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute -left-[34%] top-[8%] w-[116vw] max-w-[920px] aspect-square">
          <div className="absolute inset-0 rounded-full bg-white/75 blur-2xl shadow-[0_24px_80px_rgba(148,163,184,0.28)]" />

          <motion.img
            src="assets/moon.png"
            alt="Blue moon"
            className="absolute inset-0 w-full h-full object-contain"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          >
            {orbitStickers.map((item, idx) => {
              const angleInRad = (item.angle * Math.PI) / 180;
              const radiusPercent = 47.5;
              const x = 50 + Math.cos(angleInRad) * radiusPercent;
              const y = 50 + Math.sin(angleInRad) * radiusPercent;

              return (
                <motion.img
                  key={`orbit-${idx}`}
                  src={item.src}
                  alt="Snoopy sticker"
                  className="absolute select-none"
                  style={{
                    width: item.size,
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%)`
                  }}
                  animate={{ y: [0, -8, 0], scale: [1, 1.03, 1], rotate: [-3, 3, -3] }}
                  transition={{ duration: 6 + idx, repeat: Infinity, ease: 'easeInOut' }}
                />
              );
            })}
          </motion.div>
        </div>

        {Array.from({ length: 26 }).map((_, idx) => (
          <motion.div
            key={`star-${idx}`}
            className="absolute text-blue-300/70"
            style={{
              left: `${4 + (idx * 9) % 94}%`,
              top: `${3 + (idx * 13) % 92}%`,
              fontSize: `${8 + (idx % 3) * 3}px`
            }}
            animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.6 + (idx % 4), repeat: Infinity, ease: 'easeInOut', delay: idx * 0.1 }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 py-12 lg:py-20 flex flex-col flex-1 w-full">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <EnvelopeCover key="envelope" onOpen={() => setIsOpened(true)} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85, y: -60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 md:gap-12 w-full"
            >
              {/* Main Content Area */}
              <InvitationCard />

              <ScrollReveal delay={0.2}>
                <AnimatePresence mode="wait">
                  {!submittedData ? (
                    <RSVPForm key="form" onSubmit={setSubmittedData} />
                  ) : (
                    <SuccessState key="success" data={submittedData} onReset={() => setSubmittedData(null)} />
                  )}
                </AnimatePresence>
              </ScrollReveal>

              {/* Footer info */}
              <ScrollReveal delay={0.3}>
                <footer className="text-center pb-8 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">© 2024 THIỆP MỜI ĐIỆN TỬ</p>
                  <p className="text-[10px] text-slate-300">Trường Tiểu Học Trần Quang Cơ</p>
                </footer>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
