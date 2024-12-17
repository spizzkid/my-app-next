'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Avatar() {
  const router = useRouter();

  return (
    <div className="relative group">
      <div 
        className="cursor-pointer"
        onClick={() => router.push('/profile')}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors">
          <Image
            src="/images/avataaars.png"
            alt="用户头像"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
      
      {/* 悬停提示 */}
      <div className="absolute right-0 mt-2 py-1 px-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        查看个人主页
      </div>
    </div>
  );
} 