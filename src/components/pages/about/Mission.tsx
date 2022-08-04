import Icon from '@/components/utils/Icon';

export function Mission() {
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;

  return (
    <div id="mission" className="flex justify-between">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-3xl font-inter font-bold text-on-surface-p0">
            Our mission
          </h2>
          <span className="bg-main h-1 inline-block -translate-y-1 w-16"></span>
        </div>
        {/* Content */}
        <p className="max-w-lg body">
          The crypto world has become a utopia for criminals and threat actors,
          StrategyTribe is going to change that.
        </p>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface-p0 hover:text-main-light label flex items-center justify-center gap-2 w-fit"
        >
          <Icon icon="arrow_forward" />
          <span>Follow us on Twitter</span>
        </a>
      </div>
    </div>
  );
}
