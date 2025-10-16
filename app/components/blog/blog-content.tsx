import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { JSX } from "react";

export default function BlogContent({ content }: { content: any }) {
  return (
    <div className="prose max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="mb-4 text-[#64748B] font-medium text-[18px]">
              {children}
            </p>
          ),
          heading: ({ children, level }) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
              <Tag className="mt-6 mb-2 font-semibold text-[32px]">
                {children}
              </Tag>
            );
          },
          list: ({ children }) => (
            <ul className="list-disc pl-6">{children}</ul>
          ),
          "list-item": ({ children }) => <li>{children}</li>,
          link: ({ children, url }) => (
            <a href={url} className="text-blue-500 underline">
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
        }}
      />
    </div>
  );
}
