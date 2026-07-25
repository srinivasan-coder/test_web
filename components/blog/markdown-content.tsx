import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Renders Markdown article bodies with studio typography.
 * Ready for local TypeScript content strings (or future CMS Markdown).
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "max-w-none text-base leading-relaxed text-foreground sm:text-lg",
        className,
      )}
    >
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-12 mb-4 font-serif text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 font-serif text-xl font-semibold tracking-tight sm:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-5 text-muted-foreground">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 list-disc space-y-2 pl-5 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 list-decimal space-y-2 pl-5 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-2 border-primary pl-5 font-serif text-xl italic leading-relaxed text-foreground sm:text-2xl">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
