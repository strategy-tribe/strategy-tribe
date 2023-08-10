import { createContext, ReactNode, useContext } from 'react';

import { FullTarget } from '@/server/routes/targets/getTarget';

interface iTargetContext {
  target: FullTarget;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore`;
const TargetContext = createContext<iTargetContext>();

export const TargetContextProvider = ({
  children,
  target,
}: {
  children: ReactNode;
  target: FullTarget;
}) => {
  return (
    <TargetContext.Provider
      value={{
        target: target,
      }}
    >
      {children}
    </TargetContext.Provider>
  );
};

export const useTargetContext = () => {
  return useContext(TargetContext);
};
