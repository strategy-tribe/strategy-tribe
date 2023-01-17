import { FullTarget } from '@/server/routes/targets/getTarget';

import { TargetContent } from './TargetContent';
import { TargetContextProvider } from './TargetContext';
import { TargetHeader } from './TargetHeader';

export function Target({ target }: { target: FullTarget }) {
  return (
    <TargetContextProvider target={target}>
      <div className="space-y-8 px-4">
        <TargetHeader />
        <TargetContent />
      </div>
    </TargetContextProvider>
  );
}
