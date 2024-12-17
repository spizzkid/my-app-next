'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Profile() {
  const [username, setUsername] = useState('默认用户名');
  const [isEditing, setIsEditing] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回首页 */}
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
        ← 返回首页
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* 个人信息卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="/images/avataaars.png"
                alt="用户头像"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="text-2xl font-bold mb-2 text-blue-600 border rounded px-2"
                  onBlur={() => setIsEditing(false)}
                />
              ) : (
                <h1 
                  className="text-2xl font-bold mb-2 text-blue-600 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  {username}
                </h1>
              )}
              <p className="text-gray-600">加入时间：2024年3月</p>
            </div>
          </div>
        </div>

        {/* 健康数据概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">健康检测记录</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">12</div>
            <p className="text-gray-600">最近检测：2天前</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">理疗方案</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <p className="text-gray-600">进行中：2个</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">情绪记录</h3>
            <div className="text-3xl font-bold text-purple-600 mb-2">28</div>
            <p className="text-gray-600">本月记录：12次</p>
          </div>
        </div>

        {/* 个人设置区域 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-blue-600">个人设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">个人资料</span>
              <button className="text-blue-600 hover:text-blue-800">编辑</button>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">隐私设置</span>
              <button className="text-blue-600 hover:text-blue-800">设置</button>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">消息通知</span>
              <button className="text-blue-600 hover:text-blue-800">管理</button>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">账号安全</span>
              <button className="text-blue-600 hover:text-blue-800">查看</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 