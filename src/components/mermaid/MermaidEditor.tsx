import Editor from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { render } from '@/lib/mermaid/mermaid';
import { initEditor } from '@/lib/mermaid/monacoExtra';
import { findMostRelevantLineNumber } from '@/lib/utils/MermaidErrorHelper';

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
  const [monaco, setMonaco] = useState<typeof Monaco>();
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor>();
  const getMermaid = async () => {
    try {
      const { svg } = await render({ securityLevel: 'antiscript' }, code, id);
      if (svg.length > 0) {
        setSVG(svg);
      }
      const model = editor?.getModel();
      if (model && monaco) {
        monaco.editor.setModelMarkers(model, 'mermaid', []);
      }
    } catch (e: any) {
      let message: string = e.message;
      let startLine =
        e?.name === 'UnknownDiagramError'
          ? 0
          : findMostRelevantLineNumber(e.message, code);

      if (e.parserErrors) {
        const pError = e.parserErrors[0];
        message = pError?.message;
        startLine =
          pError?.message.includes('D_') || pError?.message.includes('P_')
            ? findMostRelevantLineNumber(pError?.message, code)
            : pError?.previousToken?.image
            ? findMostRelevantLineNumber(pError?.previousToken?.image, code)
            : pError?.token.startLine;
      }
      const marker: Monaco.editor.IMarkerData = {
        severity: 8,
        startLineNumber: startLine,
        startColumn: 0,
        endLineNumber: startLine + 1,
        endColumn: 0,
        message: e.message,
      };
      const model = editor?.getModel();
      if (model && monaco) {
        monaco.editor.setModelMarkers(model, 'mermaid', [marker]);
      }
      setSVG(`<div class="text-base text-error">${message}</div>`);
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
          beforeMount={(m) => {
            initEditor(m);
            setMonaco(m);
          }}
          onMount={(e) => setEditor(e)}
          onChange={(value, a) => setCode(value ?? '')}
        />
      </div>

      <RenderMermaid svg={svg} />
    </div>
  );
}
