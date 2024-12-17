import Link from 'next/link';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
        ← 返回首页
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">服务条款</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. 服务说明</h2>
            <p className="text-gray-700 mb-4">
              本服务由波动科技提供，包括但不限于健康检测、健康理疗、健康食疗和情绪管理等功能。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. 用户责任</h2>
            <p className="text-gray-700 mb-4">
              用户在使用本服务时应：
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>提供真实、准确的个人信息</li>
              <li>遵守相关法律法规</li>
              <li>保护账号安全</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. 免责声明</h2>
            <p className="text-gray-700 mb-4">
              本服务提供的健康建议仅供参考，不构成医疗诊断或治疗建议。如有健康问题，请咨询专业医生。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. 服务变更</h2>
            <p className="text-gray-700 mb-4">
              我们保留随时修改或终止服务的权利，修改后的服务条款将在网站上公布。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 