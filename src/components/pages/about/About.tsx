import Icon from '@/components/utils/Icon';

export function About() {
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB;

  return (
    <div id="about_us" className="space-y-6 ">
      <div>
        <h2 className="text-3xl font-inter font-bold text-on-surface-p0">
          About
        </h2>
        <span className="bg-main h-1 inline-block -translate-y-1 w-16"></span>
      </div>
      {/* Content */}
      <div>
        <p className="max-w-lg body">
          {`Born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals.`}
          <br />
          <br />
          All findings gathered by this project will be distributed to the
          community free of charge in the form of a browser plugin that will
          mark threat actors in-place in the browser window for all to see.
          Development of this project is ongoing.
          <br />
          <br />
          {`Decisions on bounties and findings are currently organized by staff
          internally. With increasing usage of this framework we anticipate
          slowly decentralizing into a DAO where voting on bounties or findings
          can be seen publicly. If you're interested in participating with this, `}
          <a
            href="mailto:dao@strategytribe.io"
            className="text-main-light hover:underline"
          >
            shoot us an email
          </a>
          .
        </p>
      </div>
      {/* CTA */}
      <div>
        <div className="-ml-6">
          <a
            href="#"
            className="text-on-surface-p0 hover:text-main-light py-3 px-5 tablet:px-6 label z-10 flex items-center justify-center gap-2 rounded-full min-w-[6rem] w-fit"
          >
            <Icon icon="arrow_forward" />
            <span>Our Terms of Service</span>
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-p0 hover:text-main-light py-3 px-5 tablet:px-6 label z-10 flex items-center justify-center gap-2 rounded-full min-w-[6rem] w-fit"
          >
            <Icon icon="arrow_forward" />
            <span>Follow us on Twitter</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-p0 hover:text-main-light py-3 px-5 tablet:px-6 label z-10 flex items-center justify-center gap-2 rounded-full min-w-[6rem] w-fit"
          >
            <Icon icon="arrow_forward" />
            <span>We are open source</span>
          </a>
        </div>
      </div>
    </div>
  );
}
