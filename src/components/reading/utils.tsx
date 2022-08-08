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

import Icon from '../utils/Icon';

export const CONTENT_STYLE = 'max-w-lg body whitespace-pre-line';
export function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h2 className=" text-on-surface-p0">{title}</h2>
      <span className="bg-main h-1 inline-block -translate-y-1 w-16"></span>
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
        <a
          className={`group text-on-surface-p0 hover:text-main-light label flex items-center justify-center gap-2 w-fit ${className}`}
        >
          <Icon
            icon="arrow_forward"
            className="-translate-x-0.5 group-hover:translate-x-0 transition-all ease-out"
          />
          <span>{label}</span>
        </a>
      </Link>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group text-on-surface-p0 hover:text-main-light label flex items-center justify-center gap-2 w-fit ${className}`}
    >
      <Icon
        icon="north_east"
        className="-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0 transition-all ease-out"
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
      className="pt-12 mt-12 space-y-10 border-t-2 border-surface mx-auto max-w-4xl"
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
          label="Rules for submitting"
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
