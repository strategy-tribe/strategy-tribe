import { serializeState } from '@/lib/mermaid/serde';

export const getSvg = async (code: string) => {
  const url = getSvgUrl(code);
  const img = await (await fetch(url)).blob();
  return await img.text();
};

export const getSvgUrl = (code: string) => {
  const encoded = serializeState({
    code: code,
    mermaid: JSON.stringify({ securityLevel: 'antiscript' }),
  });
  return `https://render.strategytribe.io/svg/${encoded}?bgColor=000000`;
};
