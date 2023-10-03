import React from 'react';
import ReactMarkdown from 'react-markdown';

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
              className="text-main-light underline hover:text-main"
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          );
        },
        ol({ children }) {
          return (
            <ol className="mb-2 list-decimal space-y-2 pl-[2rem]">
              {children}
            </ol>
          );
        },
        ul({ children }) {
          return (
            <ol className="mb-2 list-disc space-y-2 pl-[2rem]">{children}</ol>
          );
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
          return (
            <h1 className="h1 my-4 mx-8 border-y-2 border-surface py-4 text-center text-main">
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h1 className="h2 mt-3 mb-2 w-fit pt-3 text-main">{children}</h1>
          );
        },
        h3({ children }) {
          return <h1 className="h3  my-2 pt-2">{children}</h1>;
        },
        p({ children }) {
          return <p className="mb-4 font-grotesk leading-6">{children}</p>;
        },
        blockquote({ children }) {
          return (
            <div className="rounded bg-surface py-4 px-8 pl-8">
              <p className="body">{children}</p>
            </div>
          );
        },
        pre({ children }) {
          return (
            <pre className="notransalte pre-code bg-code m-4 whitespace-pre-line rounded-md p-4">
              {children}
            </pre>
          );
        },
        code({ children }) {
          return (
            <code className="notransalte bg-code-inline m-0 whitespace-pre-line rounded-md py-1 px-2">
              {children}
            </code>
          );
        },
        img({ src, alt, title, width, height }) {
          return (
            <div className="flex flex-col flex-wrap content-center text-center">
              <img
                src={src}
                alt={alt}
                title={title}
                height={height}
                width={width}
              ></img>
              <p>{title}</p>
            </div>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};
