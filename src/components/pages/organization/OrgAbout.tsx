import { ParagrapIsTooLong } from '@/lib/utils/StringHelpers';

import Icon, { IconSize } from '@/components/utils/Icon';

import { useOrganizationContext } from './OrganizationContext';
import { AboutTitle } from './utils/AboutTitle';

export function OrgAbout() {
  const { org } = useOrganizationContext();

  return (
    <div className="space-y-8">
      {!!org.bio && (
        <div className="max-w-lg space-y-2">
          <AboutTitle text="About" />

          <p className="whitespace-pre-wrap first-letter:capitalize">
            {org.bio}
          </p>
        </div>
      )}

      {!!org.why && (
        <div className="max-w-lg space-y-2">
          <AboutTitle text="Threat" />

          <p className="whitespace-pre-wrap text-error-light first-letter:capitalize">
            {ParagrapIsTooLong(org.why)}
          </p>
        </div>
      )}

      <div className="max-w-lg space-y-2">
        <AboutTitle text="Operates in" />

        <ul>
          {org.countries?.map((c) => {
            return (
              <li key={c.code} className="uppercase">
                {c.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="max-w-lg space-y-2">
        <AboutTitle text="News" />

        <ul className="space-y-2">
          {org.links?.map((link) => {
            return (
              <li
                key={link}
                className="group flex items-center gap-2 text-main-light opacity-[90%] hover:opacity-100 tablet:-translate-x-6"
              >
                <Icon
                  icon="north_east"
                  size={IconSize.Small}
                  className="transition-transform ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
