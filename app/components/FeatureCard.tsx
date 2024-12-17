import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  href: string;
  bgColor?: string;
}

export default function FeatureCard({ title, icon, description, href, bgColor }: FeatureCardProps) {
  return (
    <Link 
      href={href}
      className={`p-6 ${bgColor || 'bg-white'} rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 block no-grammarly`}
      suppressHydrationWarning
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 relative">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain p-1"
            priority
          />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-800 text-center">{description}</p>
    </Link>
  );
} 