import { Section } from '@/components/pages/landing/Section';
import AppLayout from '@/components/layouts/AppLayout';
import React from 'react';
import { NextPageWithLayout } from './_app';

const RulesPage: NextPageWithLayout = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <Section>
        <div>
          <h2 className="text-3xl font-inter font-bold text-white">
            Rules for submitting findings
          </h2>
          <span
            className={`bg-purpleDark h-1 inline-block -translate-y-2 w-16`}
          ></span>
        </div>
      </Section>

      <Section className="flex flex-col gap-6">
        <p className="max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus soluta
          sed sit fugit possimus voluptatem obcaecati laboriosam voluptatum
          provident deserunt doloribus consequatur corporis numquam, illo sint
          molestias. Voluptates, ullam ex.
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
          debitis voluptatum magnam cupiditate temporibus laborum? Similique,
          nemo voluptates ut a commodi necessitatibus? Officiis porro dolore
          iste ut fugit, earum consequatur?
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus,
          tenetur voluptatibus. At perspiciatis omnis dolore blanditiis eos
          iusto, quaerat harum sed quod maiores tenetur incidunt, sint
          consectetur quo, nobis qui?
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus,
          tenetur voluptatibus. At perspiciatis omnis dolore blanditiis eos
          iusto, quaerat harum sed quod maiores tenetur incidunt, sint
          consectetur quo, nobis qui?
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus,
          tenetur voluptatibus. At perspiciatis omnis dolore blanditiis eos
          iusto, quaerat harum sed quod maiores tenetur incidunt, sint
          consectetur quo, nobis qui?
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus,
          tenetur voluptatibus. At perspiciatis omnis dolore blanditiis eos
          iusto, quaerat harum sed quod maiores tenetur incidunt, sint
          consectetur quo, nobis qui?
          <br />
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus,
          tenetur voluptatibus. At perspiciatis omnis dolore blanditiis eos
          iusto, quaerat harum sed quod maiores tenetur incidunt, sint
          consectetur quo, nobis qui? v
        </p>

        <a
          href="#"
          className="underline text-purpleLight hover:text-purpleDark"
        >
          See our full terms of service
        </a>
      </Section>
    </div>
  );
};

RulesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default RulesPage;
