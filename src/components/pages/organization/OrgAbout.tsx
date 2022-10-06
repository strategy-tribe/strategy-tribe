import { ParagrapIsTooLong } from '@/lib/utils/StringHelpers';

import Icon, { IconSize } from '@/components/utils/Icon';

import { useOrganizationContext } from './OrganizationContext';
import { AboutTitle } from './utils/AboutTitle';

export function OrgAbout() {
  const { org } = useOrganizationContext();

  return (
    <div className="space-y-8">
      {!!org.bio && (
        <div className="space-y-2 max-w-lg">
          <AboutTitle text="About" />

          <p className="first-letter:capitalize whitespace-pre-wrap">
            {ParagrapIsTooLong(org.bio, 20)}
          </p>
        </div>
      )}

      {!!org.why && (
        <div className="space-y-2 max-w-lg">
          <AboutTitle text="Threat" />

          <p className="first-letter:capitalize whitespace-pre-wrap text-error-light">
            {ParagrapIsTooLong(org.why)}
          </p>
        </div>
      )}

      <div className="space-y-2 max-w-lg">
        <AboutTitle text="Operates in" />

        <ul>
          {org.countries?.map((c) => {
            return (
              <li key={c} className="uppercase">
                {c}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-2 max-w-lg">
        <AboutTitle text="News" />

        <ul className="space-y-2">
          {org.links?.map((link) => {
            return (
              <li
                key={link}
                className="text-main-light group opacity-[90%] hover:opacity-100 flex items-center gap-2 -translate-x-6"
              >
                <Icon
                  icon="north_east"
                  size={IconSize.Small}
                  className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform ease-in-out"
                />
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  {link.replace('https://www.', '').slice(0, 60)}
                  {link.replace('https://www.', '').length > 60 ? '...' : ''}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
