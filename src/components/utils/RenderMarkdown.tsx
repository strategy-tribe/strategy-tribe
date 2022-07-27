import ReactMarkdown from 'react-markdown';
import React from 'react';

export const RenderMarkdown = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <ReactMarkdown
      className={className}
      components={{
        a({ children, href }) {
          return (
            <a
              href={href}
              className="text-on-surface-p0 underline"
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          );
        },
        ol({ children }) {
          return <ol className="list-decimal">{children}</ol>;
        },
        ul({ children }) {
          return <ol className="list-disc">{children}</ol>;
        },
        td({ children }) {
          return (
            <td className="border-1 border-surface py-2 pl-2 pr-8">
              {children}
            </td>
          );
        },
        th({ children }) {
          return (
            <td className="label-lg border-1 border-surface py-2 pl-2 pr-8 text-on-surface-unactive">
              {children}
            </td>
          );
        },
        h1({ children }) {
          return <h1 className="h4 pb-4">{children}</h1>;
        },
        h2({ children }) {
          return <h1 className="h5 pb-3">{children}</h1>;
        },
        h3({ children }) {
          return <h1 className="h6 pb-2">{children}</h1>;
        },
        blockquote({ children }) {
          return (
            <div className="rounded bg-surface py-4 px-8 pl-8">
              <p className="body">{children}</p>
            </div>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};
