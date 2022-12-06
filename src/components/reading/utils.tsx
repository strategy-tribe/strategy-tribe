import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  GoToAboutusPage,
  GoToBountiesPage,
  GoToFAQPage,
  GoToGeneralDonationsPage,
  GoToRulesPage,
} from '@/lib/utils/Routes';

import Icon, { IconSize } from '../utils/Icon';

export const CONTENT_STYLE = 'max-w-lg body whitespace-pre-line';
export function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h3 className=" text-on-surface-p0">{title}</h3>
      <span className="inline-block h-1 w-16 -translate-y-1.5 bg-main"></span>
    </div>
  );
}

export function SectionContent({ content }: { content: string }) {
  return <p className={CONTENT_STYLE}>{content}</p>;
}

export function CallToAction({
  label,
  link,
  className,
  internal = false,
}: {
  internal?: boolean;
  label: string;
  link: string;
  className?: string;
}) {
  if (internal) {
    return (
      <Link href={link}>
        <span
          className={`label group flex w-fit items-center justify-center gap-2 text-on-surface-p0 hover:text-main-light ${className}`}
        >
          <Icon
            icon="arrow_forward"
            className="-translate-x-0.5 transition-all ease-out group-hover:translate-x-0"
            size={IconSize.Small}
          />
          <span>{label}</span>
        </span>
      </Link>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`label group flex w-fit items-center justify-center gap-2 text-on-surface-p0 hover:text-main-light ${className}`}
    >
      <Icon
        icon="north_east"
        className="-translate-x-0.5 transition-all ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0"
      />
      <span>{label}</span>
    </a>
  );
}

export function ReadingSection({
  children,
  title,
  className,
  spacing = 'space-y-3',
}: {
  children: ReactNode | ReactNode[];
  title?: string;
  spacing?: string;
  className?: string;
}) {
  return (
    <motion.section
      id={title}
      className={`mx-auto max-w-4xl ${spacing} ${className}`}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!!title && <SectionTitle title={title} />}
      {children}
    </motion.section>
  );
}

export function AfterRead() {
  const router = useRouter();
  return (
    <motion.section
      className="mx-auto mt-12 flex max-w-4xl flex-col gap-y-5 border-t-2 border-surface pt-12"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 1 } }}
    >
      {router.pathname !== GoToBountiesPage() && (
        <CallToAction
          internal
          link={GoToBountiesPage()}
          label="Browse bounties"
        />
      )}

      {router.pathname !== GoToAboutusPage() && (
        <CallToAction internal link={GoToAboutusPage()} label="About ST" />
      )}

      {router.pathname !== GoToRulesPage() && (
        <CallToAction
          internal
          link={GoToRulesPage()}
          label="Submission rules"
        />
      )}

      {router.pathname !== GoToFAQPage() && (
        <CallToAction internal link={GoToFAQPage()} label="FAQ" />
      )}

      {router.pathname !== GoToGeneralDonationsPage() && (
        <CallToAction
          internal
          link={GoToGeneralDonationsPage()}
          label="Submitting findings is not the only way to help"
        />
      )}
    </motion.section>
  );
}
