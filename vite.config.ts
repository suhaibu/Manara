import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// هذا الملف مهيأ للنشر على GitHub Pages لمستودع Manara
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // 1. تحديد المسار الأساسي ليتوافق مع رابط GitHub (اسم المستودع)
    base: '/Manara/', 
    
    plugins: [react()],
    
    // 2. ربط مفتاح Gemini ليعمل في بيئة الإنتاج
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
    resolve: {
      alias: {
        // 3. توجيه المسارات إلى المجلد الرئيسي (Root) كما في ملفاتك المرفوعة
        '@': path.resolve(__dirname, './'),
      },
    },
    
    build: {
      outDir: 'dist',
      // لضمان استقرار البناء في بيئة GitHub Actions
      chunkSizeWarningLimit: 1600,
    }
  };
});
