'use client'

import { useState, useEffect, useRef } from 'react';
import BackButton from '../components/BackButton';

export default function BreathingPage() {
  const [duration, setDuration] = useState(60); // 默认1分钟
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breathCycleRef = useRef<NodeJS.Timeout | null>(null);

  // 重置练习
  const resetExercise = () => {
    setIsPlaying(false);
    setTimeLeft(duration);
    setBreathPhase('inhale');
    if (timerRef.current) clearInterval(timerRef.current);
    if (breathCycleRef.current) clearInterval(breathCycleRef.current);
  };

  // 处理时长选择
  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    resetExercise();
  };

  // 处理开始/暂停
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 管理倒计时
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            resetExercise();
            return duration;
          }
          return prev - 1;
        });
      }, 1000);

      // 呼吸循环（4秒吸气，4秒呼气）
      breathCycleRef.current = setInterval(() => {
        setBreathPhase((prev) => prev === 'inhale' ? 'exhale' : 'inhale');
      }, 4000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (breathCycleRef.current) clearInterval(breathCycleRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (breathCycleRef.current) clearInterval(breathCycleRef.current);
    };
  }, [isPlaying, duration]);

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">呼吸放松练习</h1>
        
        {/* 时长选择 */}
        <div className="flex justify-center gap-4 mb-8">
          {[60, 120, 180].map((seconds) => (
            <button
              key={seconds}
              onClick={() => handleDurationChange(seconds)}
              className={`px-4 py-2 rounded-lg ${
                duration === seconds
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-blue-600 text-blue-600'
              }`}
            >
              {seconds / 60}分钟
            </button>
          ))}
        </div>

        {/* 呼吸动画和提示 */}
        <div className="flex flex-col items-center mb-8">
          <div
            className={`w-32 h-32 rounded-full bg-blue-500 transition-all duration-[4000ms] ease-in-out ${
              breathPhase === 'inhale' ? 'scale-150' : 'scale-75'
            }`}
          />
          <p className="text-xl mt-8 font-medium text-gray-700">
            {breathPhase === 'inhale' ? '吸气' : '呼气'}
          </p>
        </div>

        {/* 计时器显示 */}
        <div className="text-4xl font-bold text-center mb-8">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={togglePlay}
            className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? '暂停' : '开始'}
          </button>
          <button
            onClick={resetExercise}
            className="px-8 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            重置
          </button>
        </div>

        {/* 使用说明 */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">使用说明</h2>
          <ul className="space-y-2 text-gray-600">
            <li>1. 选择您想要的练习时长（1-3分钟）</li>
            <li>2. 点击"开始"按钮开始练习</li>
            <li>3. 跟随蓝色圆球的节奏进行呼吸</li>
            <li>4. 圆球变大时吸气，变小时呼气</li>
            <li>5. 您可以随时暂停或重置练习</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 