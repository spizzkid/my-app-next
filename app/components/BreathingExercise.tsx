'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathingExerciseProps {
  onClose: () => void;
}

const breathingTechniques = {
  '478': {
    name: '4-7-8呼吸法',
    steps: [
      { action: '吸气', duration: 4, instruction: '通过鼻子缓慢吸气' },
      { action: '屏息', duration: 7, instruction: '保持呼吸' },
      { action: '呼气', duration: 8, instruction: '通过嘴巴呼气，发出"嘘"的声音' }
    ]
  },
  'belly': {
    name: '腹式呼吸',
    steps: [
      { action: '吸气', duration: 4, instruction: '将气息缓慢吸入腹部，感受腹部膨胀' },
      { action: '呼气', duration: 4, instruction: '缓慢呼气，感受腹部回落' }
    ]
  },
  'box': {
    name: '方块呼吸法',
    steps: [
      { action: '吸气', duration: 4, instruction: '缓慢吸气' },
      { action: '屏息', duration: 4, instruction: '保持呼吸' },
      { action: '呼气', duration: 4, instruction: '缓慢呼气' },
      { action: '屏息', duration: 4, instruction: '保持呼吸' }
    ]
  }
};

export default function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [selectedTechnique, setSelectedTechnique] = useState<keyof typeof breathingTechniques | null>(null);
  const [duration, setDuration] = useState(3); // 练习时长（分钟）
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);

  useEffect(() => {
    if (!isStarted || !selectedTechnique) return;

    const technique = breathingTechniques[selectedTechnique];
    const stepDuration = technique.steps[currentStep].duration;
    let timer: NodeJS.Timeout;

    if (remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else {
      // 移动到下一步
      const nextStep = (currentStep + 1) % technique.steps.length;
      if (nextStep === 0) {
        setCurrentCycle(prev => prev + 1);
      }
      
      if (currentCycle >= totalCycles) {
        setIsStarted(false);
        return;
      }

      setCurrentStep(nextStep);
      setRemainingTime(technique.steps[nextStep].duration);
    }

    return () => clearTimeout(timer);
  }, [isStarted, remainingTime, currentStep, selectedTechnique, currentCycle, totalCycles]);

  const handleStart = () => {
    if (!selectedTechnique) return;
    
    const technique = breathingTechniques[selectedTechnique];
    const totalStepTime = technique.steps.reduce((acc, step) => acc + step.duration, 0);
    const cyclesNeeded = Math.floor((duration * 60) / totalStepTime);
    
    setTotalCycles(cyclesNeeded);
    setCurrentCycle(0);
    setCurrentStep(0);
    setRemainingTime(technique.steps[0].duration);
    setIsStarted(true);
  };

  const getCircleScale = () => {
    if (!selectedTechnique || !isStarted) return 1;
    const technique = breathingTechniques[selectedTechnique];
    const currentAction = technique.steps[currentStep].action;
    
    switch (currentAction) {
      case '吸气':
        return 1.5;
      case '呼气':
        return 1;
      default:
        return 1.25;
    }
  };

  if (!isStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">选择呼吸练习</h2>
          
          <div className="space-y-4 mb-6">
            {Object.entries(breathingTechniques).map(([key, technique]) => (
              <button
                key={key}
                onClick={() => setSelectedTechnique(key as keyof typeof breathingTechniques)}
                className={`w-full p-4 rounded-lg border ${
                  selectedTechnique === key
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {technique.name}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              练习时长（分钟）
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleStart}
              disabled={!selectedTechnique}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
            >
              开始练习
            </button>
          </div>
        </div>
      </div>
    );
  }

  const technique = breathingTechniques[selectedTechnique!];
  const currentStepData = technique.steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6">{technique.name}</h2>
        
        <div className="mb-8">
          <p className="text-xl mb-2">{currentStepData.instruction}</p>
          <p className="text-lg text-purple-600">{remainingTime}秒</p>
        </div>

        <div className="relative w-40 h-40 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 bg-purple-100 rounded-full"
            animate={{
              scale: getCircleScale(),
            }}
            transition={{
              duration: currentStepData.duration,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            第 {currentCycle + 1} / {totalCycles} 组
          </p>
        </div>

        <button
          onClick={() => setIsStarted(false)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          结束练习
        </button>
      </div>
    </div>
  );
} 