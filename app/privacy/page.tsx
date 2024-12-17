import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
        ← 返回首页
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">隐私政策</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. 信息收集</h2>
            <p className="text-gray-700 mb-4">
              我们收集的信息包括但不限于：
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>基本个人信息（姓名、联系方式等）</li>
              <li>健康相关数据</li>
              <li>使用我们服务时的行为数据</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. 信息使用</h2>
            <p className="text-gray-700 mb-4">
              我们使用收集的信息用于：
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>提供、维护和改进我们的服务</li>
              <li>个性化用户体验</li>
              <li>进行数据分析和研究</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. 信息保护</h2>
            <p className="text-gray-700 mb-4">
              我们采取严格的数据安全措施，包括：
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>数据加密存储</li>
              <li>访问控制</li>
              <li>定期安全审计</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 