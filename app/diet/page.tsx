'use client';

import Image from 'next/image';
import BackButton from '../components/BackButton';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// 定义类型
type DietStyle = {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
};

type Meal = {
  name: string;
  foods: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  recipe?: string;
};

type DayPlan = {
  breakfast: Meal;
  lunch?: Meal;
  dinner: Meal;
  snacks?: Meal[];
};

export default function DietPage() {
  // 状态管理
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [mealCount, setMealCount] = useState<number>(3);
  const [showWeeklyPlan, setShowWeeklyPlan] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>([]);

  // 饮食风格选项
  const dietStyles: DietStyle[] = [
    {
      id: 'mediterranean',
      name: '地中海饮食',
      description: '富含橄榄油、鱼类、坚果、蔬菜和全谷物',
      icon: '🌊',
      features: ['富含健康脂肪', '多种蔬菜水果', '适量鱼类', '全谷物为主']
    },
    {
      id: 'highProtein',
      name: '高蛋白饮食',
      description: '适合健身或增肌的人群',
      icon: '💪',
      features: ['富含优质蛋白', '适量碳水', '控制脂肪', '增肌减脂']
    },
    {
      id: 'lowCarb',
      name: '低碳饮食',
      description: '减少碳水化合物的摄入',
      icon: '🥗',
      features: ['控制碳水', '适量蛋白质', '健康脂肪', '稳定血糖']
    },
    {
      id: 'vegetarian',
      name: '素食',
      description: '以植物性食物为主',
      icon: '🥬',
      features: ['无动物产品', '富含膳食纤维', '植物蛋白', '营养均衡']
    },
    {
      id: 'lowSaltFat',
      name: '低盐低脂饮食',
      description: '适合高血压、高胆固醇人群',
      icon: '❤️',
      features: ['控制盐分', '低脂肪', '多种蔬菜', '健康烹饪']
    },
    {
      id: 'glutenFree',
      name: '无麸质饮食',
      description: '适合麸质敏感人群',
      icon: '🌾',
      features: ['无麸质', '多样替代', '营养均衡', '特殊谷物']
    },
    {
      id: 'lowFodmap',
      name: '低FODMAP饮食',
      description: '适合肠易激综合症(IBS)患者和消化敏感人群',
      icon: '🍽️',
      features: ['避免发酵性碳水', '改善肠道健康', '减少腹胀', '缓解消化不适']
    },
    {
      id: 'keto',
      name: '生酮饮食',
      description: '极低碳水，高脂肪，适量蛋白质',
      icon: '🥑',
      features: ['控制碳水', '高健康脂肪', '适量蛋白质', '促进代谢']
    },
    {
      id: 'antiInflammatory',
      name: '抗炎饮食',
      description: '富含抗氧化和抗炎食物',
      icon: '🌿',
      features: ['抗氧化', '抗炎', '全谷物', '健康油脂']
    },
    {
      id: 'pregnancy',
      name: '孕期饮食',
      description: '富含叶酸、铁、钙、DHA等营养素',
      icon: '🤰',
      features: ['营养均衡', '富含叶酸', '补充铁质', '适量DHA']
    },
    {
      id: 'children',
      name: '儿童营养饮食',
      description: '促进儿童健康成长的均衡饮食',
      icon: '👶',
      features: ['营养均衡', '促进成长', '提升免疫', '健康零食']
    },
    {
      id: 'highFiber',
      name: '高纤维饮食',
      description: '改善肠道健康，预防便秘',
      icon: '🌾',
      features: ['富含纤维', '促进消化', '改善便秘', '肠道健康']
    },
    {
      id: 'highCalorie',
      name: '高热量饮食',
      description: '适合增重和体力恢复人群',
      icon: '💪',
      features: ['高能量', '健康增重', '营养密度高', '促进恢复']
    },
    {
      id: 'lowPurine',
      name: '低嘌呤饮食',
      description: '适合痛风和高尿酸人群',
      icon: '🦶',
      features: ['控制嘌呤', '降低尿酸', '减轻疼痛', '健康饮食']
    },
    {
      id: 'alkaline',
      name: '碱性饮食',
      description: '调节身体酸碱平衡的健康饮食',
      icon: '🥬',
      features: ['碱性食物', '平衡酸碱', '排毒养生', '健康代谢']
    }
  ];

  // 生成周计划
  const generateWeeklyPlan = () => {
    let basePlan: DayPlan;
    
    switch (selectedStyle) {
      case 'mediterranean':
        basePlan = {
          breakfast: {
            name: '地中海式早餐',
            foods: ['全麦面包', '橄榄油', '番茄', '希腊酸奶', '坚果'],
            nutrition: {
              calories: 350,
              protein: 12,
              carbs: 45,
              fat: 16
            }
          },
          lunch: {
            name: '地中海式午餐',
            foods: ['藜麦', '烤鱼', '橄榄', '蔬菜沙拉', '柠檬汁'],
            nutrition: {
              calories: 450,
              protein: 28,
              carbs: 48,
              fat: 20
            }
          },
          dinner: {
            name: '地中海式晚餐',
            foods: ['全麦意面', '虾仁', '西兰花', '橄榄油', '地中海香料'],
            nutrition: {
              calories: 400,
              protein: 25,
              carbs: 50,
              fat: 15
            }
          },
          snacks: [
            {
              name: '地中海式上午点心',
              foods: ['无花果', '杏仁', '酸奶'],
              nutrition: {
                calories: 200,
                protein: 8,
                carbs: 25,
                fat: 10
              }
            },
            {
              name: '地中海式下午点心',
              foods: ['橄榄', '全麦饼干', '希腊酸奶'],
              nutrition: {
                calories: 180,
                protein: 6,
                carbs: 22,
                fat: 9
              }
            }
          ]
        };
        break;

      case 'highProtein':
        basePlan = {
          breakfast: {
            name: '高蛋白早餐',
            foods: ['蛋白奶昔', '鸡蛋', '燕麦', '蛋白棒'],
            nutrition: {
              calories: 400,
              protein: 35,
              carbs: 30,
              fat: 12
            }
          },
          lunch: {
            name: '增肌午餐',
            foods: ['鸡胸肉', '糙米饭', '西兰花', '甜椒', '蛋白粉'],
            nutrition: {
              calories: 550,
              protein: 45,
              carbs: 50,
              fat: 10
            }
          },
          dinner: {
            name: '高蛋白晚餐',
            foods: ['牛排', '红薯', '芦笋', '蘑菇'],
            nutrition: {
              calories: 500,
              protein: 40,
              carbs: 35,
              fat: 20
            }
          },
          snacks: [
            {
              name: '高蛋白上午点心',
              foods: ['蛋白棒', '酸奶', '坚果'],
              nutrition: {
                calories: 200,
                protein: 15,
                carbs: 20,
                fat: 10
              }
            },
            {
              name: '高蛋白下午点心',
              foods: ['鸡胸肉', '全麦面包', '蛋白奶昔'],
              nutrition: {
                calories: 250,
                protein: 25,
                carbs: 20,
                fat: 8
              }
            }
          ]
        };
        break;

      case 'lowCarb':
        basePlan = {
          breakfast: {
            name: '生酮早餐',
            foods: ['煎蛋', '牛油果', '火腿', '生菜'],
            nutrition: {
              calories: 350,
              protein: 20,
              carbs: 8,
              fat: 28
            }
          },
          lunch: {
            name: '低碳午餐',
            foods: ['烤鸡肉', '凯撒沙拉', '橄榄油', '坚果'],
            nutrition: {
              calories: 400,
              protein: 35,
              carbs: 10,
              fat: 25
            }
          },
          dinner: {
            name: '低碳晚餐',
            foods: ['三文鱼', '西兰花', '芝士', '牛油果酱'],
            nutrition: {
              calories: 380,
              protein: 30,
              carbs: 8,
              fat: 26
            }
          },
          snacks: [
            {
              name: '低碳上午点心',
              foods: ['奶酪', '坚果', '生菜'],
              nutrition: {
                calories: 180,
                protein: 10,
                carbs: 5,
                fat: 15
              }
            },
            {
              name: '低碳下午点心',
              foods: ['牛肉干', '牛油果', '芹菜'],
              nutrition: {
                calories: 200,
                protein: 15,
                carbs: 6,
                fat: 14
              }
            }
          ]
        };
        break;

      case 'vegetarian':
        basePlan = {
          breakfast: {
            name: '素食早餐',
            foods: ['豆浆', '全麦吐司', '水果', '坚果'],
            nutrition: {
              calories: 300,
              protein: 15,
              carbs: 45,
              fat: 12
            }
          },
          lunch: {
            name: '素食午餐',
            foods: ['藜麦', '豆腐', '蔬菜沙拉', '南瓜籽'],
            nutrition: {
              calories: 380,
              protein: 20,
              carbs: 50,
              fat: 15
            }
          },
          dinner: {
            name: '素食晚餐',
            foods: ['素食咖喱', '糙米饭', '菌菇', '豆类'],
            nutrition: {
              calories: 350,
              protein: 18,
              carbs: 48,
              fat: 14
            }
          },
          snacks: [
            {
              name: '素食上午点心',
              foods: ['水果沙拉', '坚果', '豆浆'],
              nutrition: {
                calories: 180,
                protein: 8,
                carbs: 25,
                fat: 8
              }
            },
            {
              name: '素食下午点心',
              foods: ['全麦饼干', '豆腐乳', '蔬菜条'],
              nutrition: {
                calories: 160,
                protein: 7,
                carbs: 20,
                fat: 7
              }
            }
          ]
        };
        break;

      case 'lowSaltFat':
        basePlan = {
          breakfast: {
            name: '清淡早餐',
            foods: ['白粥', '水煮蛋', '蒸菜', '水果'],
            nutrition: {
              calories: 250,
              protein: 15,
              carbs: 40,
              fat: 5
            }
          },
          lunch: {
            name: '低盐午餐',
            foods: ['蒸鸡胸', '糙米饭', '清炒时蔬', '豆腐'],
            nutrition: {
              calories: 350,
              protein: 30,
              carbs: 45,
              fat: 8
            }
          },
          dinner: {
            name: '低脂晚餐',
            foods: ['清蒸鱼', '玉米', '西兰花', '木耳'],
            nutrition: {
              calories: 300,
              protein: 25,
              carbs: 35,
              fat: 6
            }
          },
          snacks: [
            {
              name: '清淡上午点心',
              foods: ['水果', '无糖酸奶', '燕麦'],
              nutrition: {
                calories: 150,
                protein: 8,
                carbs: 25,
                fat: 3
              }
            },
            {
              name: '清淡下午点心',
              foods: ['蒸红薯', '玉米', '低脂奶'],
              nutrition: {
                calories: 160,
                protein: 6,
                carbs: 30,
                fat: 2
              }
            }
          ]
        };
        break;

      case 'glutenFree':
        basePlan = {
          breakfast: {
            name: '无麸质早餐',
            foods: ['燕麦片', '酸奶', '水果', '坚果'],
            nutrition: {
              calories: 320,
              protein: 15,
              carbs: 42,
              fat: 14
            }
          },
          lunch: {
            name: '无麸质午餐',
            foods: ['红薯', '鸡肉', '蔬菜沙拉', '藜麦'],
            nutrition: {
              calories: 420,
              protein: 30,
              carbs: 45,
              fat: 15
            }
          },
          dinner: {
            name: '无麸质晚餐',
            foods: ['土豆泥', '烤鱼', '胡萝卜', '玉米'],
            nutrition: {
              calories: 380,
              protein: 25,
              carbs: 40,
              fat: 12
            }
          },
          snacks: [
            {
              name: '无麸质上午点心',
              foods: ['酸奶', '坚果', '水果'],
              nutrition: {
                calories: 180,
                protein: 10,
                carbs: 20,
                fat: 8
              }
            },
            {
              name: '无麸质下午点心',
              foods: ['米饼', '水果干', '豆奶'],
              nutrition: {
                calories: 170,
                protein: 8,
                carbs: 25,
                fat: 6
              }
            }
          ]
        };
        break;

      case 'lowFodmap':
        basePlan = {
          breakfast: {
            name: '低FODMAP早餐',
            foods: ['燕麦片', '蓝莓', '无乳糖酸奶', '香蕉'],
            nutrition: {
              calories: 320,
              protein: 12,
              carbs: 45,
              fat: 10
            }
          },
          lunch: {
            name: '低FODMAP午餐',
            foods: ['鸡胸肉', '胡萝卜', '菠菜', '藜麦'],
            nutrition: {
              calories: 380,
              protein: 35,
              carbs: 35,
              fat: 12
            }
          },
          dinner: {
            name: '低FODMAP晚餐',
            foods: ['三文鱼', '南瓜', '青葱叶', '米饭'],
            nutrition: {
              calories: 420,
              protein: 30,
              carbs: 40,
              fat: 18
            }
          },
          snacks: [
            {
              name: '低FODMAP上午点心',
              foods: ['葡萄', '米饼', '花生酱'],
              nutrition: {
                calories: 150,
                protein: 5,
                carbs: 20,
                fat: 8
              }
            },
            {
              name: '低FODMAP下午点心',
              foods: ['橙子', '无麸质饼干', '坚果'],
              nutrition: {
                calories: 160,
                protein: 4,
                carbs: 22,
                fat: 7
              }
            }
          ]
        };
        break;

      case 'keto':
        basePlan = {
          breakfast: {
            name: '生酮早餐',
            foods: ['煎蛋', '牛油果', '培根', '黄油咖啡'],
            nutrition: {
              calories: 550,
              protein: 25,
              carbs: 5,
              fat: 48
            }
          },
          lunch: {
            name: '生酮午餐',
            foods: ['烤鸡腿', '西兰花', '橄榄油', '奶酪'],
            nutrition: {
              calories: 600,
              protein: 35,
              carbs: 8,
              fat: 45
            }
          },
          dinner: {
            name: '生酮晚餐',
            foods: ['牛排', '芦笋', '蘑菇', '黄油'],
            nutrition: {
              calories: 580,
              protein: 40,
              carbs: 6,
              fat: 42
            }
          },
          snacks: [
            {
              name: '生酮上午点心',
              foods: ['坚果', '奶酪', '橄榄'],
              nutrition: {
                calories: 300,
                protein: 12,
                carbs: 4,
                fat: 28
              }
            },
            {
              name: '生酮下午点心',
              foods: ['牛油果', '火腿片', '生菜'],
              nutrition: {
                calories: 280,
                protein: 15,
                carbs: 3,
                fat: 24
              }
            }
          ]
        };
        break;

      case 'antiInflammatory':
        basePlan = {
          breakfast: {
            name: '抗炎早餐',
            foods: ['蓝莓', '燕麦', '核桃', '姜茶'],
            nutrition: {
              calories: 340,
              protein: 10,
              carbs: 45,
              fat: 14
            }
          },
          lunch: {
            name: '抗炎午餐',
            foods: ['三文鱼', '菠菜', '甜椒', '姜黄饭'],
            nutrition: {
              calories: 420,
              protein: 30,
              carbs: 35,
              fat: 20
            }
          },
          dinner: {
            name: '抗炎晚餐',
            foods: ['鸡肉', '西兰花', '红薯', '橄榄油'],
            nutrition: {
              calories: 380,
              protein: 28,
              carbs: 40,
              fat: 16
            }
          },
          snacks: [
            {
              name: '抗炎上午点心',
              foods: ['樱桃', '杏仁', '绿茶'],
              nutrition: {
                calories: 160,
                protein: 5,
                carbs: 20,
                fat: 9
              }
            },
            {
              name: '抗炎下午点心',
              foods: ['石榴', '南瓜籽', '姜黄奶昔'],
              nutrition: {
                calories: 180,
                protein: 6,
                carbs: 22,
                fat: 10
              }
            }
          ]
        };
        break;

      case 'pregnancy':
        basePlan = {
          breakfast: {
            name: '孕期早餐',
            foods: ['全麦面包', '煮鸡蛋', '牛奶', '菠菜'],
            nutrition: {
              calories: 400,
              protein: 20,
              carbs: 45,
              fat: 15
            }
          },
          lunch: {
            name: '孕期午餐',
            foods: ['三文鱼', '糙米饭', '西兰花', '红薯'],
            nutrition: {
              calories: 450,
              protein: 30,
              carbs: 50,
              fat: 18
            }
          },
          dinner: {
            name: '孕期晚餐',
            foods: ['瘦牛肉', '藜麦', '胡萝卜', '豆类'],
            nutrition: {
              calories: 420,
              protein: 35,
              carbs: 45,
              fat: 16
            }
          },
          snacks: [
            {
              name: '孕期上午点心',
              foods: ['酸奶', '蓝莓', '坚果'],
              nutrition: {
                calories: 200,
                protein: 8,
                carbs: 25,
                fat: 10
              }
            },
            {
              name: '孕期下午点心',
              foods: ['水果', '全麦饼干', '牛奶'],
              nutrition: {
                calories: 180,
                protein: 7,
                carbs: 28,
                fat: 6
              }
            }
          ]
        };
        break;

      case 'children':
        basePlan = {
          breakfast: {
            name: '儿童早餐',
            foods: ['牛奶', '全麦吐司', '煮鸡蛋', '香蕉'],
            nutrition: {
              calories: 350,
              protein: 15,
              carbs: 50,
              fat: 12
            }
          },
          lunch: {
            name: '儿童午餐',
            foods: ['鸡肉', '米饭', '西兰花', '胡萝卜'],
            nutrition: {
              calories: 400,
              protein: 25,
              carbs: 55,
              fat: 10
            }
          },
          dinner: {
            name: '儿童晚餐',
            foods: ['鱼肉', '土豆泥', '豌豆', '玉米'],
            nutrition: {
              calories: 380,
              protein: 20,
              carbs: 50,
              fat: 12
            }
          },
          snacks: [
            {
              name: '儿童上午点心',
              foods: ['酸奶', '水果片', '全麦饼干'],
              nutrition: {
                calories: 150,
                protein: 5,
                carbs: 25,
                fat: 4
              }
            },
            {
              name: '儿童下午点心',
              foods: ['牛奶', '坚果', '苹果'],
              nutrition: {
                calories: 160,
                protein: 6,
                carbs: 20,
                fat: 7
              }
            }
          ]
        };
        break;

      case 'highFiber':
        basePlan = {
          breakfast: {
            name: '高纤维早餐',
            foods: ['燕麦片', '奇亚籽', '蓝莓', '全麦面包'],
            nutrition: {
              calories: 320,
              protein: 12,
              carbs: 55,
              fat: 8
            }
          },
          lunch: {
            name: '高纤维午餐',
            foods: ['糙米饭', '扁豆', '西兰花', '胡萝卜'],
            nutrition: {
              calories: 380,
              protein: 15,
              carbs: 65,
              fat: 7
            }
          },
          dinner: {
            name: '高纤维晚餐',
            foods: ['藜麦', '鹰嘴豆', '菠菜', '南瓜'],
            nutrition: {
              calories: 350,
              protein: 14,
              carbs: 60,
              fat: 8
            }
          },
          snacks: [
            {
              name: '高纤维上午点心',
              foods: ['梨', '全麦饼干', '杏仁'],
              nutrition: {
                calories: 160,
                protein: 5,
                carbs: 28,
                fat: 6
              }
            },
            {
              name: '高纤维下午点心',
              foods: ['苹果', '亚麻籽', '燕麦棒'],
              nutrition: {
                calories: 170,
                protein: 4,
                carbs: 30,
                fat: 5
              }
            }
          ]
        };
        break;

      case 'highCalorie':
        basePlan = {
          breakfast: {
            name: '高热量早餐',
            foods: ['燕麦', '香蕉', '全脂牛奶', '花生酱'],
            nutrition: {
              calories: 650,
              protein: 25,
              carbs: 80,
              fat: 28
            }
          },
          lunch: {
            name: '高热量午餐',
            foods: ['牛肉', '糙米饭', '牛油果', '坚果'],
            nutrition: {
              calories: 750,
              protein: 40,
              carbs: 70,
              fat: 35
            }
          },
          dinner: {
            name: '高热量晚餐',
            foods: ['三文鱼', '红薯', '橄榄油', '奶酪'],
            nutrition: {
              calories: 700,
              protein: 35,
              carbs: 65,
              fat: 40
            }
          },
          snacks: [
            {
              name: '高热量上午点心',
              foods: ['坚果', '蛋白棒', '牛奶'],
              nutrition: {
                calories: 400,
                protein: 20,
                carbs: 35,
                fat: 25
              }
            },
            {
              name: '高热量下午点心',
              foods: ['牛油果吐司', '奶昔', '干果'],
              nutrition: {
                calories: 450,
                protein: 15,
                carbs: 40,
                fat: 30
              }
            }
          ]
        };
        break;

      case 'lowPurine':
        basePlan = {
          breakfast: {
            name: '低嘌呤早餐',
            foods: ['燕麦', '鸡蛋', '低脂牛奶', '水果'],
            nutrition: {
              calories: 300,
              protein: 15,
              carbs: 45,
              fat: 8
            }
          },
          lunch: {
            name: '低嘌呤午餐',
            foods: ['豆腐', '糙米饭', '西兰花', '胡萝卜'],
            nutrition: {
              calories: 350,
              protein: 20,
              carbs: 50,
              fat: 10
            }
          },
          dinner: {
            name: '低嘌呤晚餐',
            foods: ['鸡肉', '土豆', '青菜', '蘑菇'],
            nutrition: {
              calories: 380,
              protein: 25,
              carbs: 45,
              fat: 12
            }
          },
          snacks: [
            {
              name: '低嘌呤上午点心',
              foods: ['酸奶', '苹果', '全麦饼干'],
              nutrition: {
                calories: 150,
                protein: 6,
                carbs: 25,
                fat: 4
              }
            },
            {
              name: '低嘌呤下午点心',
              foods: ['水果', '低脂奶酪', '坚果'],
              nutrition: {
                calories: 160,
                protein: 7,
                carbs: 20,
                fat: 8
              }
            }
          ]
        };
        break;

      case 'alkaline':
        basePlan = {
          breakfast: {
            name: '碱性早餐',
            foods: ['奇亚籽', '杏仁奶', '香蕉', '蜂蜜'],
            nutrition: {
              calories: 320,
              protein: 10,
              carbs: 45,
              fat: 12
            }
          },
          lunch: {
            name: '碱性午餐',
            foods: ['藜麦', '牛油果', '菠菜', '柠檬汁'],
            nutrition: {
              calories: 380,
              protein: 15,
              carbs: 50,
              fat: 18
            }
          },
          dinner: {
            name: '碱性晚餐',
            foods: ['扁豆', '西兰花', '南瓜', '橄榄油'],
            nutrition: {
              calories: 350,
              protein: 18,
              carbs: 45,
              fat: 14
            }
          },
          snacks: [
            {
              name: '碱性上午点心',
              foods: ['苹果', '芹菜', '杏仁'],
              nutrition: {
                calories: 150,
                protein: 5,
                carbs: 20,
                fat: 8
              }
            },
            {
              name: '碱性下午点心',
              foods: ['黄瓜', '南瓜籽', '柠檬水'],
              nutrition: {
                calories: 140,
                protein: 6,
                carbs: 15,
                fat: 9
              }
            }
          ]
        };
        break;

      default:
        basePlan = {
          breakfast: {
            name: '标准早餐',
            foods: ['全麦面包', '鸡蛋', '牛奶', '水果'],
            nutrition: {
              calories: 300,
              protein: 15,
              carbs: 40,
              fat: 10
            }
          },
          lunch: {
            name: '标准午餐',
            foods: ['糙米饭', '鸡胸肉', '西兰花', '胡萝卜'],
            nutrition: {
              calories: 450,
              protein: 30,
              carbs: 55,
              fat: 12
            }
          },
          dinner: {
            name: '标准晚餐',
            foods: ['藜麦', '三文鱼', '芦笋', '南瓜'],
            nutrition: {
              calories: 400,
              protein: 25,
              carbs: 45,
              fat: 15
            }
          },
          snacks: [
            {
              name: '上午点心',
              foods: ['酸奶', '坚果', '水果'],
              nutrition: {
                calories: 180,
                protein: 10,
                carbs: 20,
                fat: 8
              }
            },
            {
              name: '下午点心',
              foods: ['全麦饼干', '牛奶', '水果'],
              nutrition: {
                calories: 170,
                protein: 8,
                carbs: 25,
                fat: 6
              }
            }
          ]
        };
    }

    // 根据选择的餐数生成计划
    const weekPlan = Array(7).fill(null).map((_, index) => {
      const dayPlan: DayPlan = {
        breakfast: basePlan.breakfast,
        lunch: mealCount >= 3 ? basePlan.lunch : undefined,
        dinner: basePlan.dinner,
        snacks: mealCount === 5 ? basePlan.snacks : undefined
      };

      // 根据星期几稍微调整食材，避免一周都吃一样的
      dayPlan.breakfast.foods = [...dayPlan.breakfast.foods];
      if (dayPlan.lunch) dayPlan.lunch.foods = [...dayPlan.lunch.foods];
      dayPlan.dinner.foods = [...dayPlan.dinner.foods];
      if (dayPlan.snacks) {
        dayPlan.snacks = dayPlan.snacks.map(snack => ({
          ...snack,
          foods: [...snack.foods]
        }));
      }
      
      // 调整一下食材顺序，制造些变化
      dayPlan.breakfast.foods.reverse();
      if (dayPlan.lunch) dayPlan.lunch.foods.sort(() => Math.random() - 0.5);
      dayPlan.dinner.foods.sort(() => Math.random() - 0.5);
      if (dayPlan.snacks) {
        dayPlan.snacks.forEach(snack => {
          snack.foods.sort(() => Math.random() - 0.5);
        });
      }
      
      return dayPlan;
    });

    setWeeklyPlan(weekPlan);
    setShowWeeklyPlan(true);
  };

  // 生成PDF报告
  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const content = document.getElementById('weeklyPlan');
    
    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');
      
      // 添加标题
      pdf.setFontSize(20);
      pdf.text('一周饮食计划', 105, 15, { align: 'center' });
      
      // 添加计划内容
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight);
      
      // 保存PDF
      pdf.save('饮食计划.pdf');
    }
  };

  // 生成购物清单
  const generateShoppingList = () => {
    // 收集所有食材
    const allIngredients = new Map();

    weeklyPlan.forEach((day) => {
      // 处理所有餐点的食材
      const processMeal = (meal?: Meal) => {
        if (!meal) return;
        meal.foods.forEach(food => {
          const count = allIngredients.get(food) || 0;
          allIngredients.set(food, count + 1);
        });
      };

      processMeal(day.breakfast);
      processMeal(day.lunch);
      processMeal(day.dinner);
      day.snacks?.forEach(processMeal);
    });

    // 创建购物清单内容
    const listContent = Array.from(allIngredients.entries())
      .map(([food, count]) => `${food} x ${count}次`)
      .join('\\n');

    // 创建并下载文本文件
    const blob = new Blob([`一周购物清单：\\n\\n${listContent}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '购物清单.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 渲染饮食风格选择
  const renderDietStyles = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {dietStyles.map((style) => (
        <div
          key={style.id}
          className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all ${
            selectedStyle === style.id
              ? 'bg-yellow-50 border-2 border-yellow-500'
              : 'bg-white hover:bg-yellow-50'
          }`}
          onClick={() => setSelectedStyle(style.id)}
        >
          <div className="text-4xl mb-4">{style.icon}</div>
          <h3 className="text-xl font-bold mb-2">{style.name}</h3>
          <p className="text-gray-600 mb-4">{style.description}</p>
          <div className="flex flex-wrap gap-2">
            {style.features.map((feature, index) => (
              <span
                key={index}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // 渲染餐数选择
  const renderMealCountSelection = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4">选择每日餐数</h3>
      <div className="flex gap-4">
        {[2, 3, 5].map((count) => (
          <button
            key={count}
            className={`px-6 py-2 rounded-lg ${
              mealCount === count
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 hover:bg-yellow-100'
            }`}
            onClick={() => setMealCount(count)}
          >
            {count}餐
          </button>
        ))}
      </div>
    </div>
  );

  // 渲染周计划
  const renderWeeklyPlan = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">您的一周饮食计划</h3>
      <div id="weeklyPlan" className="space-y-8">
        {weeklyPlan.map((day, index) => (
          <div key={index} className="border-b pb-6">
            <h4 className="text-xl font-semibold mb-4">第 {index + 1} 天</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">早餐</h5>
                <div className="space-y-2">
                  <p className="text-gray-700">{day.breakfast.name}</p>
                  <div className="text-sm text-gray-600">
                    {day.breakfast.foods.join('、')}
                  </div>
                  <div className="mt-2 text-sm">
                    <p>热量: {day.breakfast.nutrition.calories}卡路里</p>
                    <p>蛋白质: {day.breakfast.nutrition.protein}g</p>
                    <p>碳水: {day.breakfast.nutrition.carbs}g</p>
                    <p>脂肪: {day.breakfast.nutrition.fat}g</p>
                  </div>
                </div>
              </div>

              {day.lunch && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">午餐</h5>
                  <div className="space-y-2">
                    <p className="text-gray-700">{day.lunch.name}</p>
                    <div className="text-sm text-gray-600">
                      {day.lunch.foods.join('、')}
                    </div>
                    <div className="mt-2 text-sm">
                      <p>热量: {day.lunch.nutrition.calories}卡路里</p>
                      <p>蛋白质: {day.lunch.nutrition.protein}g</p>
                      <p>碳水: {day.lunch.nutrition.carbs}g</p>
                      <p>脂肪: {day.lunch.nutrition.fat}g</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">晚餐</h5>
                <div className="space-y-2">
                  <p className="text-gray-700">{day.dinner.name}</p>
                  <div className="text-sm text-gray-600">
                    {day.dinner.foods.join('、')}
                  </div>
                  <div className="mt-2 text-sm">
                    <p>热量: {day.dinner.nutrition.calories}卡路里</p>
                    <p>蛋白质: {day.dinner.nutrition.protein}g</p>
                    <p>碳水: {day.dinner.nutrition.carbs}g</p>
                    <p>脂肪: {day.dinner.nutrition.fat}g</p>
                  </div>
                </div>
              </div>

              {day.snacks && day.snacks.map((snack, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">点心</h5>
                  <div className="space-y-2">
                    <p className="text-gray-700">{snack.name}</p>
                    <div className="text-sm text-gray-600">
                      {snack.foods.join('、')}
                    </div>
                    <div className="mt-2 text-sm">
                      <p>热量: {snack.nutrition.calories}卡路里</p>
                      <p>蛋白质: {snack.nutrition.protein}g</p>
                      <p>碳水: {snack.nutrition.carbs}g</p>
                      <p>脂肪: {snack.nutrition.fat}g</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-4">
        <button 
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
          onClick={generatePDF}
        >
          下载PDF报告
        </button>
        <button 
          className="border-2 border-yellow-500 text-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-50"
          onClick={generateShoppingList}
        >
          生成购物清单
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      {/* 头部横幅 */}
      <div className="bg-yellow-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">智能饮食计划生成器</h1>
          <p className="text-xl">选择您的饮食风格，获取专属计划</p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">选择您的饮食风格</h2>
          {renderDietStyles()}
        </div>

        {selectedStyle && (
          <>
            {renderMealCountSelection()}
            <div className="text-center mb-12">
              <button
                className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-yellow-600 transition-colors"
                onClick={generateWeeklyPlan}
              >
                生成一周饮食计划
              </button>
            </div>
          </>
        )}

        {showWeeklyPlan && renderWeeklyPlan()}

        {/* 营养师咨询 */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">需要更专业的建议？</h3>
            <p className="text-gray-600 mb-6">
              我们的营养师可以为您提供一对一的专业指导
            </p>
            <button className="bg-white text-yellow-600 border-2 border-yellow-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-50 transition-colors">
              预约营养师咨询
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 