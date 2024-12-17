import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto py-6 text-sm text-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            Copyright © 2024 波动科技 All rights reserved.
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-blue-600">
              隐私政策
            </Link>
            <Link href="/terms" className="hover:text-blue-600">
              服务条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 