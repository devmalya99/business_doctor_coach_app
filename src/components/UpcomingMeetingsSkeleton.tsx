// src/components/UpcomingMeetingsSkeleton.tsx
export default function UpcomingMeetingsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Skeleton Cards */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4 flex-1">
              {/* Avatar Icon */}
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />

              {/* Text Section */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* Title and badge */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                {/* With */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>

            {/* Arrow Icon Placeholder */}
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
