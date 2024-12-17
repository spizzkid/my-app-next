import FeatureCard from './components/FeatureCard';
import ArticleCard from './components/ArticleCard';
import Avatar from './components/Avatar';
import Footer from './components/Footer';

export default function Home() {
  const features = [
    {
      title: "健康检测",
      icon: "/icons/health-check.svg",
      description: "全面的身体状况检测与评估",
      href: "/health-check",
      bgColor: "bg-green-50"
    },
    {
      title: "健康理疗",
      icon: "/icons/therapy.svg",
      description: "专业的理疗方案与指导",
      href: "/therapy",
      bgColor: "bg-blue-50"
    },
    {
      title: "健康食疗",
      icon: "/icons/diet.svg",
      description: "个性化饮食建议与营养方案",
      href: "/diet",
      bgColor: "bg-yellow-50"
    },
    {
      title: "情绪管理",
      icon: "/icons/emotion.svg",
      description: "心理健康与情绪调节指导",
      href: "/emotion",
      bgColor: "bg-purple-50"
    }
  ];

  // 添加推荐文章数据
  const recommendedArticles = [
    {
      title: "中医推拿按摩：改善颈椎问题的自然疗法",
      source: "健康养生网",
      summary: "本文详细介绍了几种简单有效的推拿按摩方法，可以帮助缓解颈椎问题...",
      url: "https://example.com/article1",
      category: "健康理疗",
      imageUrl: "/images/massage.jpg"
    },
    {
      title: "秋季养生食谱：三款滋补养生汤品",
      source: "中医养生堂",
      summary: "秋季养生重在补充营养，本文推荐三款适合秋季饮用的养生汤品...",
      url: "https://example.com/article2",
      category: "健康食疗",
      imageUrl: "/images/soup.jpg"
    },
    {
      title: "5分钟冥想练习：快速缓解工作压力",
      source: "心理健康报",
      summary: "通过简单的冥想练习，帮助你在繁忙的工作中找到内心的平静...",
      url: "https://example.com/article3",
      category: "情绪管理",
      imageUrl: "/images/meditation.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI决定 - 智能健康决策</h1>
          <Avatar />
        </div>
        
        {/* 功能模块区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>

        {/* 更新推荐区域 */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">为您推荐</h2>
            <button className="text-blue-600 hover:text-blue-800">
              查看更多 →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedArticles.map((article, index) => (
              <ArticleCard
                key={index}
                {...article}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

