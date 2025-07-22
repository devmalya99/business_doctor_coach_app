'use client';

export default function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full" />

          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
