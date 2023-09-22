import type { MermaidConfig, ParseOptions, RenderResult } from 'mermaid';
import mermaid from 'mermaid';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mermaidOsint from './osint/mermaid-osint.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mermaidOsintElk from './osint/mermaid-osint-elk.js';

export const render = async (
  config: MermaidConfig,
  code: string,
  id: string
): Promise<RenderResult> => {
  if (!code || code === '') return { svg: '' };
  // Should be able to call this multiple times without any issues.
  mermaid.initialize(config);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await mermaid.registerExternalDiagrams([mermaidOsint, mermaidOsintElk]);
  return await mermaid.render(id, code);
};

export const parse = async (
  code: string,
  parseOptions?: ParseOptions
): Promise<unknown> => {
  return await mermaid.parse(code);
};
