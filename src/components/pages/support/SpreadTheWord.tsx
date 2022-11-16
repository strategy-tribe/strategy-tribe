import Icon from '@/components/utils/Icon';

export function SpreadTheWord() {
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB;
  return (
    <div id="support" className="space-y-8">
      <div>
        <h2 className="font-inter text-3xl font-bold text-on-surface-p0">
          Spread the word
        </h2>
        <div className="inline-block h-1 w-16 -translate-y-1 bg-main"></div>
      </div>

      {/* Why */}
      <p>
        We aim to make the web a safer place for everyone.
        <br />
        <br />
        {`Not everybody is an OSINT expert, but we all benefit from bringing the
        world's most important threat actors to the light.`}
        <br />
        <br />
        All findings gathered by this project will be distributed to the
        community free of charge and we anticipate slowly decentralizing into a
        DAO where voting on bounties and findings can be seen publicly.
        <br />
        <br />
        Spread the word, the hunt is open.
      </p>

      <ul className="space-y-4 text-on-surface-p0">
        <li className="label hover:text-main-light">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <Icon icon="arrow_forward" />
            Twitter
          </a>
        </li>

        <li className="label hover:text-main-light">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <Icon icon="arrow_forward" />
            Github
          </a>
        </li>
      </ul>
    </div>
  );
}
