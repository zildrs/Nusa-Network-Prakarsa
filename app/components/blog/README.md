# Blog Components

This directory contains reusable blog components following DRY and KISS principles.

## Components

### BlogCard
Individual blog card component with multiple variants:
- `default` - Standard blog card with image and title
- `compact` - Smaller card for sidebars and lists
- `featured` - Large card for hero sections

```tsx
import { BlogCard } from "~/components/blog";

<BlogCard blog={blogPost} variant="featured" />
```

### BlogNavigation
Category navigation component for blog pages.

```tsx
import { BlogNavigation } from "~/components/blog";

<BlogNavigation />
```

### BlogHero
Featured blog section with main article and related posts.

```tsx
import { BlogHero } from "~/components/blog";

<BlogHero 
  featuredBlog={featuredBlog} 
  relatedBlogs={relatedBlogs} 
/>
```

### BlogSection
Reusable section with title and "See All" link.

```tsx
import { BlogSection } from "~/components/blog";

<BlogSection 
  title="TECHNOLOGY" 
  blogs={technologyBlogs}
  showSeeAll={true}
  seeAllLink="/blog/technology"
/>
```

### BlogEmptyState
Empty state component when no blogs are available.

```tsx
import { BlogEmptyState } from "~/components/blog";

<BlogEmptyState />
```

## Usage in Other Routes

These components can be easily reused in other routes like:
- `blog-detail.tsx` - Use BlogCard for related articles
- `home.tsx` - Use BlogSection for featured blog posts
- Any other page that needs to display blog content

## Benefits

- **DRY**: No repeated code for blog cards, grids, etc.
- **KISS**: Simple, focused components with single responsibilities
- **Reusable**: Components can be used across different pages
- **Maintainable**: Easy to update and extend
- **Type Safe**: Full TypeScript support with proper interfaces
