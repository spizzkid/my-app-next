'use client'

import Image from 'next/image';
import { useState, useRef } from 'react';
import BackButton from '../components/BackButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// 扩展症状解决方案的数据结构
const symptomSolutions = {
  "近视": {
    condition: {
      name: "近视",
      description: "近处视物清晰，远处视物模糊",
      severity: "常见屈光不正",
      suggestion: "建议及时就医检查，明确具体度数",
      // 添加 AI 诊断相关信息
      aiDiagnosis: {
        causes: [
          {
            type: "环境因素",
            items: [
              "长期近距离用眼",
              "光线不足",
              "电子产品使用过度"
            ]
          },
          {
            type: "遗传因素",
            items: [
              "父母近视",
              "眼轴发育异常"
            ]
          },
          {
            type: "生活习惯",
            items: [
              "户外活动少",
              "用眼姿势不正确",
              "用眼时间过长"
            ]
          }
        ],
        riskLevel: "中等",
        progressionRisk: "持续恶化风险较高",
        preventionPriority: [
          "控制用眼时间",
          "增加户外活动",
          "保持正确姿势"
        ],
        treatmentPath: [
          {
            stage: "初期干预",
            actions: [
              "验光配镜",
              "调整用眼习惯",
              "增加户外活动"
            ]
          },
          {
            stage: "持续管理",
            actions: [
              "定期检查",
              "及时调整度数",
              "防控措施"
            ]
          },
          {
            stage: "长期预防",
            actions: [
              "保持健康习惯",
              "定期复查",
              "科学用眼"
            ]
          }
        ]
      }
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "保持50厘米以上读写距离",
          "每30分钟远眺5-10分钟",
          "保持正确坐姿",
          "确保充足光线"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充维生素A（胡萝卜、菠菜）",
          "增加叶黄素摄入（玉米、菠菜）",
          "适量食用蓝莓",
          "补充omega-3（深海鱼类）"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "每天做眼保健操",
          "常做远近交替训练",
          "户外活动2小时以上",
          "避免剧烈运动"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "控制电子产品使用时间",
          "保证充足睡眠",
          "定期进行视力检查",
          "使用防蓝光护目镜"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "穴位按摩（睛明、光明穴）",
          "热敷眼部",
          "中医艾灸",
          "眼部放松训练"
        ]
      }
    }
  },
  "远视": {
    condition: {
      name: "远视",
      description: "远处视物清晰，近处视物模糊",
      severity: "常见屈光不正",
      suggestion: "建议及时就医检查，明确具体度数",
      aiDiagnosis: {
        causes: [
          {
            type: "生理因素",
            items: [
              "眼球发育不足",
              "眼轴过短",
              "晶状体调节能力减退"
            ]
          },
          {
            type: "年龄因素",
            items: [
              "年龄增长",
              "调节力下降",
              "老化现象"
            ]
          },
          {
            type: "用眼习惯",
            items: [
              "长期用眼疲劳",
              "光线不足",
              "阅读姿势不当"
            ]
          }
        ],
        riskLevel: "中等",
        progressionRisk: "随年龄增长可能加重",
        preventionPriority: [
          "科学用眼",
          "定期检查",
          "及时矫正"
        ],
        treatmentPath: [
          {
            stage: "初步评估",
            actions: [
              "专业验光",
              "确定度数",
              "选择合适镜片"
            ]
          },
          {
            stage: "矫正阶段",
            actions: [
              "配戴眼镜",
              "调整用眼习惯",
              "定期复查"
            ]
          },
          {
            stage: "维护保健",
            actions: [
              "保护视力",
              "预防加重",
              "定期检查"
            ]
          }
        ]
      }
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "保持适当阅读距离",
          "避免长时间近距离用眼",
          "保持正确坐姿",
          "确保充足光线"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充维生素A、C、E",
          "增加叶黄素摄入",
          "补充omega-3脂肪酸",
          "适量食用坚果"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "做眼保健操",
          "远近交替训练",
          "户外活动",
          "避免剧烈运动"
        ]
      }
    }
  },
  "散光": {
    condition: {
      name: "散光",
      description: "物体成像不在一个焦点上，视物模糊变形",
      severity: "常见屈光不正",
      suggestion: "建议配戴合适的矫正镜片",
      aiDiagnosis: {
        causes: [
          {
            type: "解剖因素",
            items: [
              "角膜表面不规则",
              "晶状体形状异常",
              "眼球发育不均匀"
            ]
          },
          {
            type: "外部因素",
            items: [
              "长期歪头用眼",
              "不良用眼姿势",
              "眼部手术后遗症"
            ]
          },
          {
            type: "遗传因素",
            items: [
              "家族遗传史",
              "先天发育异常",
              "基因影响"
            ]
          }
        ],
        riskLevel: "中等",
        progressionRisk: "需要及时矫正，避免加重",
        preventionPriority: [
          "正确用眼姿势",
          "及时矫正",
          "定期检查"
        ],
        treatmentPath: [
          {
            stage: "诊断评估",
            actions: [
              "专业验光",
              "散光度数测量",
              "确定矫正方案"
            ]
          },
          {
            stage: "矫正治疗",
            actions: [
              "配戴合适镜片",
              "适应期调整",
              "复查跟踪"
            ]
          },
          {
            stage: "长期管理",
            actions: [
              "定期验光",
              "调整镜片",
              "保持良好习惯"
            ]
          }
        ]
      }
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "保持正确的阅读姿势",
          "适当阅读距离",
          "定期验光配镜",
          "保持镜片清洁"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充维生素A",
          "食用富含DHA的食物",
          "补充叶黄素",
          "均衡饮食"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "眼保健操",
          "眼球转动训练",
          "户外活动",
          "避免剧烈运动"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "保持良好光线",
          "适时休息",
          "定期检查",
          "避免用眼过度"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "眼部按摩",
          "穴位按压",
          "热敷放松",
          "视力训练"
        ]
      }
    }
  },
  "老花眼": {
    condition: {
      name: "老花眼",
      description: "近距离视物模糊，调节能力下降",
      severity: "常见老年现象",
      suggestion: "建议配戴老花镜，定期检查",
      aiDiagnosis: {
        causes: [],
        riskLevel: "中等",
        progressionRisk: "需要进一步评估",
        preventionPriority: [],
        treatmentPath: []
      }
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "使用合适的老花镜",
          "保持适当阅读距离",
          "充足的照明",
          "避免用眼疲劳"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充叶黄素",
          "维生素A、C、E",
          "omega-3脂肪酸",
          "抗氧化物质"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "眼部运动",
          "调节训练",
          "远近交替观看",
          "户外活动"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "合理用眼时间",
          "保持良好光线",
          "定期视力检查",
          "注意用眼卫生"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "穴位按摩",
          "眼部热敷",
          "眼部放松",
          "视力保健"
        ]
      }
    }
  },
  "干眼症": {
    condition: {
      name: "干眼症",
      description: "眼睛干涩、疲劳、易疲劳",
      severity: "常见眼表疾病",
      suggestion: "需要及时治疗，改善症状",
      aiDiagnosis: {
        causes: [
          {
            type: "环境因素",
            items: [
              "空气干燥",
              "长期使用电子设备",
              "空调环境"
            ]
          },
          {
            type: "生理因素",
            items: [
              "泪液分泌不足",
              "泪液蒸发过快",
              "眨眼次数减少"
            ]
          },
          {
            type: "疾病因素",
            items: [
              "自身免疫疾病",
              "睑板腺功能障碍",
              "结膜炎并发"
            ]
          }
        ],
        riskLevel: "中等",
        progressionRisk: "可能影响生活质量，需要长期管理",
        preventionPriority: [
          "保持眼部湿润",
          "注意环境湿度",
          "规律用眼习惯"
        ],
        treatmentPath: [
          {
            stage: "症状缓解",
            actions: [
              "使用人工泪液",
              "改善环境",
              "热敷按摩"
            ]
          },
          {
            stage: "原因治疗",
            actions: [
              "医生诊疗",
              "针对性用药",
              "生活方式调整"
            ]
          },
          {
            stage: "预防保健",
            actions: [
              "维持泪膜稳定",
              "预防复发",
              "定期检查"
            ]
          }
        ]
      }
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "使用人工泪液",
          "避免干燥环境",
          "定时眨眼",
          "保持眼部卫生"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充omega-3脂肪酸",
          "多喝水",
          "食用富含维生素A的食物",
          "适量食用坚果"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "眨眼训练",
          "眼部按摩",
          "避免长时间用眼",
          "户外适度运动"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "保持室内适度湿度",
          "避免烟酒",
          "使用加湿器",
          "避免空调直吹"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "热敷眼部",
          "眼部蒸汽护理",
          "中医艾灸",
          "穴位按摩"
        ]
      }
    }
  },
  "结膜炎": {
    condition: {
      name: "结膜炎",
      description: "眼睛发红、有异物感、分泌物增多",
      severity: "常见眼表疾病",
      suggestion: "建议及时就医，避免交叉感染"
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "保持眼部清洁",
          "避免揉眼",
          "使用无菌棉签清洁",
          "更换毛巾枕套"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充维生素C",
          "增强免疫力食物",
          "多喝水",
          "清淡饮食"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "避免剧烈运动",
          "适度户外活动",
          "保持作息规律",
          "避免游泳"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "避免接触污染源",
          "勤洗手",
          "避免共用个人物品",
          "保持室内通风"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "冷敷消炎",
          "使用眼药水",
          "保持眼部卫生",
          "避免化妆"
        ]
      }
    }
  },
  "角膜炎": {
    condition: {
      name: "角膜炎",
      description: "角膜发炎，伴有疼痛、畏光、流泪",
      severity: "较严重眼表疾病",
      suggestion: "需及时就医治疗，避免并发症"
    },
    solutions: {
      // 添加完整解决方案
    }
  },
  "青光眼": {
    condition: {
      name: "青光眼",
      description: "眼压升高，可能导致视神经损害",
      severity: "严重眼科疾病",
      suggestion: "建议立即就医检查，进行专业治疗"
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "按时使用降眼压药物",
          "避免剧烈运动",
          "保持情绪稳定",
          "规律作息"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "控制咖啡因摄入",
          "补充维生素B族",
          "适量饮水",
          "清淡饮食"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "避免低头动作",
          "适度散步",
          "轻柔瑜伽",
          "避免重物举升"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "定期测量眼压",
          "避免熬夜",
          "保持心情舒畅",
          "避免压力过大"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "专业眼压监测",
          "遵医嘱用药",
          "定期复查",
          "避免按摩眼部"
        ]
      }
    }
  },
  "白内障": {
    condition: {
      name: "白内障",
      description: "晶状体混浊，视物模糊",
      severity: "常见老年眼病",
      suggestion: "建议及时就医，评估手术时机"
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "防护紫外线",
          "保持眼部湿润",
          "避免眼部外伤",
          "定期检查"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充维生素C、E",
          "富含抗氧化物质食物",
          "适量蛋白质",
          "控制糖分摄入"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "温和运动",
          "避免剧烈运动",
          "保持活动量",
          "户外戴墨镜"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "戴防紫外线眼镜",
          "避免强光刺激",
          "保持作息规律",
          "控制血糖血压"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "遵医嘱用药",
          "定期复查",
          "评估手术时机",
          "术后护理"
        ]
      }
    }
  },
  "视网膜脱离": {
    condition: {
      name: "视网膜脱离",
      description: "视网膜从脉络膜分离，严重影响视力",
      severity: "严重眼科疾病",
      suggestion: "需要立即就医治疗，可能需要手术",
      aiDiagnosis: {
        causes: [],
        riskLevel: "高",
        progressionRisk: "需要立即治疗",
        preventionPriority: [],
        treatmentPath: []
      }
    },
    solutions: {
      // 添加完整解决方案
    }
  },
  "黄斑变性": {
    condition: {
      name: "黄斑变性",
      description: "中心视力下降，影响精细视觉",
      severity: "严重老年眼病",
      suggestion: "需及时就医治疗，定期监测",
      aiDiagnosis: {
        causes: [],
        riskLevel: "高",
        progressionRisk: "需要及时治疗",
        preventionPriority: [],
        treatmentPath: []
      }
    },
    solutions: {
      // 添加完整解决方案
    }
  },
  "飞蚊症": {
    condition: {
      name: "飞蚊症",
      description: "视野中出现飘动的小黑点",
      severity: "常见症状",
      suggestion: "如突然增多需及时就医检查"
    },
    solutions: {
      "日常护理": {
        icon: "👁️",
        items: [
          "避免长时间用眼",
          "保护眼睛",
          "定期检查",
          "记录症状变化"
        ]
      },
      "营养建议": {
        icon: "🥗",
        items: [
          "补充维生素C",
          "补充叶黄素",
          "多吃水果蔬菜",
          "补充胶原蛋白"
        ]
      },
      "运动指导": {
        icon: "🤸",
        items: [
          "适度运动",
          "避免剧烈运动",
          "保持作息规律",
          "眼部运动"
        ]
      },
      "生活习惯": {
        icon: "🌞",
        items: [
          "避免熬夜",
          "保持充足睡眠",
          "避免用眼过度",
          "保持心情愉悦"
        ]
      },
      "理疗方案": {
        icon: "💆",
        items: [
          "定期检查",
          "监测变化",
          "必要时就医",
          "避免揉眼"
        ]
      }
    }
  }
};

// 在文件顶部添加类型定义
type SymptomKey = keyof typeof symptomSolutions;

// 修改 ConditionStructure 组件
interface Cause {
  type: string;
  items: string[];
}

interface Stage {
  stage: string;
  actions: string[];
}

interface Diagnosis {
  riskLevel: string;
  progressionRisk: string;
  causes?: Cause[];
  treatmentPath?: Stage[];
}

const ConditionStructure = ({ diagnosis }: { diagnosis: Diagnosis }) => {
  // 如果没有诊断数据，返回空
  if (!diagnosis) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">AI 诊断分析</h3>
      
      {/* 风险等级指示器 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">风险等级评估：</span>
          <span className={`px-3 py-1 rounded-full ${
            diagnosis.riskLevel === "高" ? "bg-red-100 text-red-800" :
            diagnosis.riskLevel === "中等" ? "bg-yellow-100 text-yellow-800" :
            "bg-green-100 text-green-800"
          }`}>
            {diagnosis.riskLevel}
          </span>
        </div>
        <p className="text-gray-600">{diagnosis.progressionRisk}</p>
      </div>

      {/* 病因分析 */}
      {diagnosis.causes && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3">病因分析</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {diagnosis.causes.map((cause: Cause, index: number) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow">
                <h5 className="font-medium mb-2">{cause.type}</h5>
                <ul className="space-y-1">
                  {cause.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 治疗路径 */}
      {diagnosis.treatmentPath && (
        <div className="relative">
          <h4 className="font-semibold mb-3">治疗路径</h4>
          <div className="flex flex-col md:flex-row gap-4">
            {diagnosis.treatmentPath.map((stage: Stage, index: number) => (
              <div key={index} className="flex-1 relative">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h5 className="font-medium mb-2">{stage.stage}</h5>
                  <ul className="space-y-2">
                    {stage.actions.map((action, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full mr-2">
                          {idx + 1}
                        </span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < (diagnosis.treatmentPath?.length ?? 0) - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface Plan {
  icon: string;
  items: string[];
}

export default function TherapyPage() {
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomKey | null>(null);
  const [showTreatment, setShowTreatment] = useState(false);
  const [generatedTime, setGeneratedTime] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);
  
  // 处理症状选择
  const handleSymptomSelect = (symptom: SymptomKey) => {
    setSelectedSymptom(symptom);
    setShowTreatment(false);
  };

  // 生成治疗方案
  const generateTreatmentPlan = () => {
    setShowTreatment(true);
    setGeneratedTime(new Date().toLocaleString());
  };

  // 获取当前选中症状的解决方案
  const currentSolution = selectedSymptom ? symptomSolutions[selectedSymptom] : null;

  // 修改导出报告功能
  const exportReport = async () => {
    if (!currentSolution || !reportRef.current) return;

    try {
      // 使用 html2canvas 将内容转换为图片
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // 创建 PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // 获取 canvas 的宽度和高度
      const imgWidth = 210; // A4 纸的宽度
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // 将图片添加到 PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // 保存 PDF
      pdf.save(`眼部健康方案-${currentSolution.condition.name}-${generatedTime}.pdf`);
    } catch (error) {
      console.error('PDF生成错误:', error);
      alert('PDF生成失败，请稍后重试');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 添加返回按钮 */}
      <BackButton />

      {/* 头部内容 */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">眼部健康评估</h1>
          <p className="text-xl">专业的眼部健康评估与个性化理疗方案</p>
        </div>
      </div>

      {/* 症状选择区域 */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">请选择您的主要症状</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(symptomSolutions).map((symptom) => (
              <label key={symptom} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="symptom"
                  checked={selectedSymptom === symptom}
                  onChange={() => handleSymptomSelect(symptom as SymptomKey)}
                  className="text-blue-600"
                />
                <span>{symptom}</span>
              </label>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={generateTreatmentPlan}
              disabled={!selectedSymptom}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition-colors"
            >
              生成个性化理疗方案
            </button>
          </div>
        </div>

        {/* 修改治疗方案展示区域，添加 ref */}
        {showTreatment && currentSolution && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* 使用 reportRef 而不是 targetRef */}
            <div ref={reportRef}>
              <h2 className="text-2xl font-bold mb-6">个性化眼部健康理疗方案</h2>
              <p className="text-sm text-gray-500 mb-6">
                生成时间：{generatedTime}
              </p>
              
              {/* AI 诊断结构图 */}
              <ConditionStructure diagnosis={currentSolution.condition.aiDiagnosis} />

              {/* 症状评估 */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">症状评估</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">症状：</span>{currentSolution.condition.name}</p>
                  <p><span className="font-medium">描述：</span>{currentSolution.condition.description}</p>
                  <p><span className="font-medium">建议：</span>{currentSolution.condition.suggestion}</p>
                </div>
              </div>

              {/* 解决方案详情 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(currentSolution.solutions as Record<string, Plan>).map(([category, plan]) => (
                  <div key={category} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl">{plan.icon}</span>
                      <h4 className="text-lg font-semibold">{category}</h4>
                    </div>
                    <ul className="space-y-2">
                      {plan.items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 注意事项 */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  注意：本报告仅供参考，具体治疗请遵医嘱
                </p>
              </div>
            </div>

            {/* 导出按钮放在 ref 容器外部 */}
            <div className="mt-8 text-center">
              <button 
                onClick={exportReport}
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                导出个性化方案
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 