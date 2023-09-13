import type { MermaidConfig, ParseOptions, RenderResult } from 'mermaid';
import mermaid from 'mermaid';

import * as mermaidOsint from './osint/mermaid-osint.js';

export const render = async (
  config: MermaidConfig,
  code: string,
  id: string
): Promise<RenderResult> => {
  if (!code || code === '') return { svg: '' };
  // Should be able to call this multiple times without any issues.
  mermaid.initialize(config);
  await mermaid.registerExternalDiagrams([mermaidOsint as any]);
  return await mermaid.render(id, code);
};

export const parse = async (
  code: string,
  parseOptions?: ParseOptions
): Promise<unknown> => {
  return await mermaid.parse(code);
};
