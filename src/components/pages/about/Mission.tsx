import Icon from '@/components/utils/Icon';

export function Mission() {
  return (
    <div id="mission" className="flex justify-between">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-3xl font-inter font-bold text-white">
            Our mission
          </h2>
          <span
            className={`bg-purpleDark h-1 inline-block -translate-y-2 w-16`}
          ></span>
        </div>
        {/* Content */}
        <p className="max-w-lg body">
          The crypto world has become a utopia for criminals and threat actors,
          StrategyTribe is going to change that.
        </p>

        <a
          href="https://twitter.com/Strategy_Tribe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purpleLight label flex items-center justify-center gap-2 w-fit"
        >
          <Icon icon="arrow_forward" />
          <span>Follow us on Twitter</span>
        </a>
      </div>
      {/* <figure className="translate-y-0 grow shrink-0 h-[5rem] laptop:h-[10rem] min-w-[10rem]">
      <Image src="/illustrations/mission.svg" layout="fill" />
      </figure> */}
    </div>
  );
}
