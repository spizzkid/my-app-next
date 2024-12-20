'use client'

import Image from 'next/image';
import BackButton from '../components/BackButton';
import { useState } from 'react';
import BreathingExercise from '../components/BreathingExercise';

export default function EmotionPage() {
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);

  const emotionTools = [
    {
      title: "呼吸练习",
      description: "通过调节呼吸来缓解压力和焦虑",
      imageUrl: "/images/breathing.jpg",
      techniques: ["4-7-8呼吸法", "腹式呼吸", "方块呼吸法"],
      benefits: ["缓解压力", "改善睡眠", "提升专注力"],
      onClick: () => setShowBreathingExercise(true)
    },
    {
      title: "冥想引导",
      description: "通过正念冥想培养内心平静",
      imageUrl: "/images/meditation.jpg",
      techniques: ["身体扫描", "慈心冥想", "观想冥想"],
      benefits: ["减轻焦虑", "增强觉察", "情绪平衡"]
    },
    {
      title: "情绪日记",
      description: "记录和觉察每日情绪变化",
      imageUrl: "/images/journal.jpg",
      techniques: ["情绪命名", "触发点分析", "应对策略记录"],
      benefits: ["提升情绪认知", "发现情绪模式", "培养自我认知"]
    },
    {
      title: "运动疗愈",
      description: "通过运动释放压力和负面情绪",
      imageUrl: "/images/exercise.jpg",
      techniques: ["瑜伽", "慢跑", "力量训练"],
      benefits: ["释放压力", "改善心情", "增强体能"]
    },
    {
      title: "艺术表达",
      description: "通过艺术创作表达和处理情绪",
      imageUrl: "/images/art.jpg",
      techniques: ["绘画", "音乐", "写作"],
      benefits: ["情感宣泄", "自我表达", "创造力提升"]
    },
    {
      title: "社交支持",
      description: "建立和维护健康的社交关系",
      imageUrl: "/images/social.jpg",
      techniques: ["倾听练习", "共情交流", "边界设定"],
      benefits: ["获得支持", "改善人际关系", "增强归属感"]
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      <BackButton />
      {/* 头部横幅 */}
      <div className="bg-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">情绪管理工具箱</h1>
          <p className="text-xl">科学方法，助您平衡身心</p>
        </div>
      </div>

      {/* 情绪管理工具内容 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {emotionTools.map((tool, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={tool.imageUrl}
                  alt={tool.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-purple-600">练习方法</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.techniques.map((technique, idx) => (
                      <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-purple-600">主要益处</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {tool.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={tool.onClick}
                  className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  开始练习
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 心理咨询 */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">需要专业的心理咨询？</h3>
            <p className="text-gray-600 mb-6">
              我们的心理咨询师可以为您提供一对一的专业指导
            </p>
            <button className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors">
              预约心理咨询
            </button>
          </div>
        </div>
      </div>

      {showBreathingExercise && (
        <BreathingExercise onClose={() => setShowBreathingExercise(false)} />
      )}
    </div>
  );
} 