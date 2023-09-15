import Editor from '@monaco-editor/react';
import type { MermaidConfig } from 'mermaid';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { render } from '@/lib/mermaid/mermaid';
import { initEditor } from '@/lib/mermaid/monacoExtra';

import { RenderMermaid } from './RenderMermaid';

export function MermaidEditor({
  id,
  code,
  setCode,
}: {
  id: string;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) {
  const [svg, setSVG] = useState('');

  const getMermaid = async () => {
    try {
      const { svg } = await render(
        {
          flowchart: {
            useMaxWidth: true,
          },
        } as MermaidConfig,
        code,
        id
      );
      if (svg.length > 0) {
        setSVG(svg);
      }
    } catch (e: any) {
      setSVG(`<div class="text-base text-error">${e.message}</div>`);
    }
  };

  useEffect(() => {
    getMermaid();
  }, [code]);

  return (
    <div className="max-w-7l mx-auto flex min-h-screen space-x-4 px-4 py-2">
      <div className="min-w-[40%] space-y-4">
        <h6>Code</h6>
        <Editor
          theme="mermaid-dark"
          height="75vh"
          defaultValue={code}
          options={{
            minimap: { enabled: false },
          }}
          language="mermaid"
          value={code}
          className="mermaid-editor"
          beforeMount={(m) => initEditor(m)}
          onChange={(value, a) => setCode(value ?? '')}
        />
      </div>

      <RenderMermaid svg={svg} />
    </div>
  );
}
