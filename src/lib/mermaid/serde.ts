import { fromBase64, fromUint8Array, toBase64, toUint8Array } from 'js-base64';
import { deflate, inflate } from 'pako';

export interface State {
  code: string;
  mermaid: string;
}

interface Serde {
  serialize: (state: string) => string;
  deserialize: (state: string) => string;
}

const base64Serde: Serde = {
  serialize: (state: string): string => {
    return toBase64(state, true);
  },
  deserialize: (state: string): string => {
    return fromBase64(state);
  },
};

export const pakoSerde: Serde = {
  serialize: (state: string): string => {
    const data = new TextEncoder().encode(state);
    const compressed = deflate(data, { level: 9 });
    return fromUint8Array(compressed, true);
  },
  deserialize: (state: string): string => {
    const data = toUint8Array(state);
    return inflate(data, { to: 'string' });
  },
};

export type SerdeType = 'base64' | 'pako';

const serdes: { [key in SerdeType]: Serde } = {
  base64: base64Serde,
  pako: pakoSerde,
};

export const serializeState = (
  state: State,
  serde: SerdeType = 'pako'
): string => {
  if (!(serde in serdes)) {
    throw new Error(`Unknown serde type: ${serde}`);
  }
  const json = JSON.stringify(state);
  const serialized = serdes[serde].serialize(json);
  return `${serde}:${serialized}`;
};
