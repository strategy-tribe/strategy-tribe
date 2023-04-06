import { GoToOrgPage } from '@/lib/utils/Routes';
import { ParagrapIsTooLong, splitToParas } from '@/lib/utils/StringHelpers';

import { Button, ButtonStyle } from '@/components/utils/Button';

import { AboutTitle } from '../organization/utils/AboutTitle';
import { useTargetContext } from './TargetContext';

export function TargetAbout() {
  const { target } = useTargetContext();

  return (
    <div className="space-y-8">
      {!!target.bio && (
        <div className="space-y-2">
          <AboutTitle text="About" />

          <p className="whitespace-pre-wrap first-letter:capitalize">
            {target.bio.includes('\\n')
              ? splitToParas(target.bio)
              : ParagrapIsTooLong(target.bio, 20)}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <AboutTitle text="Realated Organization" />
        <Button
          info={{
            style: ButtonStyle.TextPurple,
            removeMinWidth: true,
            removePadding: true,
            label: target.org?.name,
            align: 'justify-start',
            labelClasses: 'capitalize',
            isALink: GoToOrgPage(target.org?.name as string),
          }}
        />
      </div>

      <div className="space-y-2">
        <AboutTitle text="Operates in" />

        <ul>
          {target.org?.countries?.map((c) => {
            return (
              <li key={c.code} className="uppercase">
                {c.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
