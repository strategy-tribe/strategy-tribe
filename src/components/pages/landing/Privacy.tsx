import { motion } from 'framer-motion';
import Image from 'next/image';
import router from 'next/router';

import { GoToBountiesPage } from '@/utils/Routes';

import { Section } from './Section';
import { Button, ButtonStyle } from '../../utils/Button';

export function Privacy() {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="space-y-32 py-32 laptop:space-y-64 laptop:pt-16 laptop:pb-40">
      {/* Private */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
      >
        <Section className="gap- flex flex-col items-center justify-center text-center">
          <figure className=" h-[10rem]  min-w-[10rem] shrink-0 grow translate-y-0 laptop:h-[20rem]">
            <Image
              src="/illustrations/shield.svg"
              alt="Shield illustration"
              width={180}
              height={100}
            />
          </figure>

          <div className="flex flex-col items-center gap-6 laptop:max-w-[50%]">
            <div className="">
              <span className="body-lg font-semibold text-on-surface-unactive">
                Privacy
              </span>
              <h2 className="h3 laptop:h2">
                You only need a wallet to join the hunt.
              </h2>
            </div>

            <p>
              No emails, no personal information.
              <br />
              We store the data you give us, nothing more.
            </p>

            <Button
              info={{
                label: 'Join the hunt',
                style: ButtonStyle.Filled,
                onClick: () => {
                  router.push(GoToBountiesPage());
                },
              }}
            />
          </div>
        </Section>
      </motion.div>
    </div>
  );
}
