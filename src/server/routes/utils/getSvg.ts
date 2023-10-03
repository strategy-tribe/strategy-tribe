import { serializeState } from '@/lib/mermaid/serde';

export const getSvg = async (code: string) => {
  const encoded = serializeState({
    code: code,
    mermaid: JSON.stringify({ securityLevel: 'antiscript' }),
  });
  const img = await (
    await fetch(`https://render.strategytribe.io/svg/${encoded}?bgColor=000000`)
  ).blob();
  return await img.text();
};
