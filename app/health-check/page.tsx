import Image from 'next/image';
import BackButton from '../components/BackButton';

export default function HealthCheckPage() {
  const checkupServices = [
    {
      title: "基础体检",
      description: "全面的身体基础指标检测",
      imageUrl: "/images/basic-checkup.jpg",
      items: [
        "身高体重测量",
        "血压心率检测",
        "体脂率分析",
        "基础血液检查"
      ],
      price: "¥299"
    },
    {
      title: "中医体质辨识",
      description: "专业中医师诊断体质类型",
      imageUrl: "/images/tcm-checkup.jpg",
      items: [
        "望闻问切",
        "体质类型判定",
        "个性化调养建议",
        "中医养生指导"
      ],
      price: "¥399"
    },
    {
      title: "亚健康评估",
      description: "深入分析亚健康状态",
      imageUrl: "/images/sub-health.jpg",
      items: [
        "睡眠质量评估",
        "压力水平测试",
        "免疫功能检测",
        "营养状况评估"
      ],
      price: "¥499"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      {/* 头部横幅 */}
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">健康检测服务</h1>
          <p className="text-xl">专业的健康评估，科学的检测方案</p>
        </div>
      </div>

      {/* 检测服务卡片 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {checkupServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative h-48">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <span className="text-green-600 font-bold text-xl">{service.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  预约检测
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 温馨提示 */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-bold mb-4">温馨提示：</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>检测前12小时内请保持空腹</li>
            <li>建议穿着舒适便于检查的衣物</li>
            <li>请携带有效身份证件</li>
            <li>检测报告将在24小时内出具</li>
          </ul>
        </div>

        {/* 在线咨询 */}
        <div className="text-center mt-12">
          <button className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
            在线咨询
          </button>
        </div>
      </div>
    </div>
  );
} 