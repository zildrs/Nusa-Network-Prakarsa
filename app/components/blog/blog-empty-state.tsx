interface BlogEmptyStateProps {
  className?: string;
}

export function BlogEmptyState({ className = '' }: BlogEmptyStateProps) {
  return (
    <section className={`py-20 text-center ${className}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No blog posts available
        </h2>
        <p className="text-gray-600">
          Please check back later for updates.
        </p>
      </div>
    </section>
  );
}
