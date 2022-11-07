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
    <div className="space-y-32 laptop:space-y-64 py-32 laptop:pt-16 laptop:pb-40">
      {/* Private */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
      >
        <Section className="flex flex-col items-center justify-center gap- text-center">
          <figure className=" translate-y-0  grow shrink-0 h-[10rem] laptop:h-[20rem] min-w-[10rem]">
            <Image
              src="/illustrations/shield.svg"
              alt="Shield illustration"
              width={180}
              height={100}
            />
          </figure>

          <div className="laptop:max-w-[50%] flex flex-col gap-6 items-center">
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
