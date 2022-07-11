import Icon from '@/components/utils/Icon';

export function SpreadTheWord() {
  return (
    <div id="support" className="space-y-8">
      <div>
        <h2 className="text-3xl font-inter font-bold text-white">
          Spread the word
        </h2>
        <span
          className={`bg-purpleDark h-1 inline-block -translate-y-2 w-16`}
        ></span>
      </div>

      {/* Why */}
      <p>
        We aim to make the web a safer place for everyone.
        <br />
        <br />
        Not everybody is an OSINT expert, but we all benefit from bringing the
        world's most important threat actors to the light.
        <br />
        <br />
        All findings gathered by this project will be distributed to the
        community free of charge and we anticipate slowly decentralizing into a
        DAO where voting on bounties and findings can be seen publicly.
        <br />
        <br />
        Spread the word, the hunt is open.
      </p>

      <ul className="space-y-4 text-white">
        <li className="label hover:text-purpleLight">
          <a
            href="https://twitter.com/Strategy_Tribe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <Icon icon="arrow_forward" />
            Twitter
          </a>
        </li>

        <li className="label hover:text-purpleLight">
          <a
            href="https://github.com/strategy-tribe/strategy-tribe"
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
