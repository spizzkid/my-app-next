'use client'

interface ArticleCardProps {
  title: string;
  source: string;
  summary: string;
  url: string;
  category: string;
  imageUrl?: string;
}

export default function ArticleCard({ title, source, summary, url, category, imageUrl }: ArticleCardProps) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      {imageUrl && (
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-sm text-white rounded-full mb-2"
          style={{
            backgroundColor: 
              category === '健康理疗' ? '#4CAF50' :
              category === '健康食疗' ? '#FF9800' :
              category === '情绪管理' ? '#2196F3' : '#9C27B0'
          }}
        >
          {category}
        </span>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{summary}</p>
        <div className="text-gray-500 text-xs">来源：{source}</div>
      </div>
    </a>
  );
} 