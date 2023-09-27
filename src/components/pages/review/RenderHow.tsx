import { useEffect, useState } from 'react';

import { render } from '@/lib/mermaid/mermaid';

import { RenderMermaid } from '@/components/mermaid/RenderMermaid';
import { RenderMarkdown } from '@/components/utils/RenderMarkdown';

import { LOG } from '@/server/importer/utils';

export function RenderHow({ code }: { code: string }) {
  const [svg, setSVG] = useState('');

  const getMermaid = async () => {
    try {
      const { svg } = await render(
        { securityLevel: 'antiscript' },
        code.replace('start ->', 'showData start ->'),
        'flowchart-id'
      );
      if (svg.length > 0) {
        setSVG(svg);
      }
    } catch (e: any) {
      LOG('Submission is not mermaid');
    }
  };

  useEffect(() => {
    if (code.includes('<svg')) {
      setSVG(code);
    } else {
      getMermaid();
    }
  }, [code]);

  return (
    <>{svg ? <RenderMermaid svg={svg} /> : <RenderMarkdown text={code} />}</>
  );
}
