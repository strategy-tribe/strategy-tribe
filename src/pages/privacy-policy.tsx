import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { AfterRead, ReadingSection } from '@/components/reading/utils';

import { NextPageWithLayout } from './_app';

const RulesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-4xl space-y-8 p-3">
        <h1 className="text-on-surface-p0">Privacy Policy</h1>

        <ReadingSection>
          <p>
            StrategyTribe will retain the information you provide when creating
            an account, submitting a proposal and submitting findings against a
            proposal. This will include your wallet address, proposal name,
            proposal type, tags you input against a proposal and the content of
            findings you submit against a proposal, or that are submitted
            against a proposal submitted by you.
          </p>
        </ReadingSection>

        <ReadingSection title="Definitions">
          <p>In this Agreement the following terms apply:</p>

          <table className="w-full border-separate border-spacing-0 border border-surface text-left">
            <tbody>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Date Issued</th>
                <th>6th Dec 2022</th>
              </tr>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Date Last Updated</th>
                <th>6th Dec 2022</th>
              </tr>

              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Policy Owner</th>
                <th>DPO @ StrategyTribe</th>
              </tr>
            </tbody>
          </table>
        </ReadingSection>

        <ReadingSection title="Scope">
          <p>
            This document describes StrategyTribe practices regarding the
            collection, use and disclosure of the information we collect from
            and about you when you use our Service. We take our obligations
            regarding your privacy seriously and have made every effort to draft
            this Privacy Policy in a manner that is clear and easy for you to
            understand. StrategyTribe complies fully with UK General Data
            Protection Regulations (“GDPR”).
          </p>

          <p>
            This Privacy Policy (“Policy”) describes how we collect, process,
            share and safeguard Personal Data we collect from you, or that you
            provide to us, in connection with the provision of any services
            through this Website or elsewhere (“Websites”), to provide a
            platform that enables our users to submit information in exchange
            for publicly displayed bounties (“Services“). We gather Personal
            Data that we collect about individuals, entities, organisations and
            businesses in an online database, that is made available to users of
            our Services and to our customers. This Policy also tells you about
            your rights and choices with respect to your Personal Data, and how
            you can contact us if you have any questions or concerns. In this
            Policy, “Personal Data“ means any information relating to an
            identified or identifiable individual. Please read this Policy
            carefully.
          </p>

          <p>
            If you do not accept the terms of this Privacy Policy, you must not
            access or use the Services. If you change your mind in the future,
            you must stop using the Services and you may exercise your rights in
            relation to your Personal Data as set out in this Policy.
          </p>

          <p>
            {
              " If we hold data about you it's because of one or more of the following:"
            }
          </p>

          <ul className="space-y-2 pl-2">
            <li>{`You've created an account on one of our Websites;`}</li>
            <li>
              Your personal data has been shared with us from data partners who
              have direct contact with you already, and where appropriate notice
              has been given for them to pass your information to us; or
            </li>
            <li>
              Personal data from public sources, including the government, law
              enforcement, social media websites, and other web properties where
              your data is publicly available has been passed to us.
            </li>
          </ul>
        </ReadingSection>

        <ReadingSection title="Personal Data We Collect">
          <p>
            We obtain Personal Data about you from various sources described
            below.
          </p>

          <div className="space-y-4 pt-6">
            <h3 className="font-grotesk text-xl">
              Personal Data You Provide to Us:
            </h3>
            <ul className="space-y-2 pl-2">
              <li>
                <strong>Account Information.</strong>
                <br />
                If you create an account to use our Services, we collect
                Personal Data to allow you to use our Services via this account.
                When you sign up, you provide us with your wallet address and
                other account information necessary to create and maintain your
                account.
              </li>

              <li>
                <p>
                  <strong>
                    Contact information and other information you choose to
                    provide to Us.
                  </strong>
                  <br />
                  You may provide a variety of information during your
                  interactions with us, such as through emails or other
                  communications. When you contact us via an email, or other
                  means, you provide us with Personal Data, such as your name
                  and contact details, and the content of your communications.
                  When you submit a proposal on our website, we will collect the
                  content of that proposal. When you submit findings against a
                  proposal, we will collect the information you submit.
                </p>
              </li>
            </ul>

            <p>
              Where applicable, we may indicate whether and why you must provide
              us with your Personal Data as well as the consequences of failing
              to do so. For example, it may be necessary for you to disclose
              certain Personal Data in order for us to provide the Services to
              you.
            </p>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="font-grotesk text-xl">
              Information Collected via Automated Means:
            </h3>
            <ul className="space-y-2 pl-2">
              <li>
                <strong>
                  Single Sign-On Through Internet Service Providers.
                </strong>
                <br />
                We may collect Personal Data from internet service providers
                when you decide to use their single sign-in servers to connect
                to our Services. Your interactions with these tools are governed
                by the privacy policies of the corresponding social media
                platforms.
              </li>

              <li>
                <strong>Cookies and Similar Technologies.</strong> Technologies.
                <br />
                We collect Personal Data via cookies, pixel tags, or similar
                technologies on our Services (collectively referred to as
                “cookies“).
              </li>

              <li>
                <strong>Device and Usage Information.</strong>
                <br />
                When you access and use the Services, we receive and store
                information about interactions with our Services, such as
                date/time stamps, usage information and statistics, as well as
                your device, including your internet protocol (IP) address,
                browser type, device type, device identifiers, operating system
                version and type.
              </li>
            </ul>
          </div>
        </ReadingSection>

        <ReadingSection title="Information We Receive from Third Parties">
          <ul className="space-y-4 pl-0">
            <li>
              <strong>Publicly Available Information.</strong>
              <br />
              <p>
                Our search technology as well as our OSINT users scan the web
                and records publicly available information from third party
                websites, such as social media sites, corporate websites and
                public records.
              </p>
              <p className="pl-4 pt-2">
                This information may include your name, email address, phone,
                work history, education, location, social profile, wallet
                address, profile photos, and other information.
              </p>
            </li>
            <li>
              <strong>Other Third Parties.</strong>
              <br />
              <p>
                We may obtain Personal Data about you from third parties such as
                people directories, data brokers, corporate information
                directories and other entities including contributors who submit
                information against proposals. This information may include
                name, email, phone, work history, education, location, social
                profile, skills, organisational affiliations and other similar
                information.
              </p>
            </li>
          </ul>
        </ReadingSection>

        <ReadingSection title="Legal Bases for the Processing of Personal Data">
          <p>
            StrategyTribe endeavours to be compliant with all the provisions of
            the GDPR as to any Personal Data in its possession.
          </p>

          <p>
            We only use your Personal Data as described in this section if we
            have a valid legal ground for the processing, including:
          </p>

          <ul className="space-y-4 pl-2">
            <li>
              <strong>Consent.</strong> <br /> This is the case where you have
              consented to the use of your Personal Data.
            </li>
            <li>
              <strong>Contract.</strong> <br /> your Personal Data to provide
              you with our Services in order to perform our contracts with you,
              such as to create and secure your account, or to respond to your
              inquiries.
            </li>
            <li>
              <strong>Legitimate Interest.</strong> <br /> We have a legitimate
              business interest in processing your Personal Data to provide the
              Services to our Customers.
              <p className="pl-4 pt-2">
                We only rely on legitimate interest as a legal basis when such
                legitimate interests are not overridden by your interests or
                your fundamental rights and freedoms and we ensure we comply
                with any request you make to exercise your rights.
              </p>
            </li>

            <li>
              <strong>Legal Obligation. </strong> <br /> We may have a legal
              obligation to process your Personal Data, for example to comply
              with tax and accounting obligations, and we may process your
              Personal Data when necessary to establish, exercise, or defend
              legal claims.
              <p className="pl-4 pt-2">
                We may also process your Personal Data when necessary to protect
                your or another individual’s vital interests.
              </p>
            </li>

            <li>
              <strong>National Security. </strong> <br /> The Data Protection
              Act (“DPA”) provides for exemptions from data protection
              principles and obligations, and individuals rights, where this is
              required to safeguard national security or for defence purposes.
            </li>
          </ul>
        </ReadingSection>

        <ReadingSection title="Who We Share Personal Data With">
          <p>
            StrategyTribe endeavours to be compliant with GDPR. We may disclose
            Personal Data about you in the following circumstances:
          </p>

          <ul className="space-y-4 pl-2">
            <li>
              <strong>Legal.</strong> <br /> Information about our users,
              including Personal Data, will be disclosed to law enforcement
              agencies, regulatory bodies, public authorities or pursuant to the
              exercise of legal proceedings if we are legally required to do so,
              or if we believe, in good faith, that such disclosure is necessary
              to comply with a legal obligation or request, to enforce our terms
              and conditions, to prevent or resolve security or technical
              issues, or to protect the rights, property or safety of
              StrategyTribe, our users, a third party, or the public.
            </li>

            <li>
              <strong>Change of Corporate Ownership.</strong> <br />
              Information about our users, including Personal Data, may be
              disclosed and otherwise transferred to an acquirer, successor, or
              assignee as part of any merger, acquisition, debt financing, sale
              of assets, or similar transaction, as well as in the event of an
              insolvency, bankruptcy, or receivership in which information is
              transferred to one or more third parties as one of our business
              assets.
            </li>

            <li>
              <strong>Business Partners.</strong> <br /> We may share Personal
              Data such as email, wallet address, any data you submit, and
              related data with our business partners, including for the
              purposes of sales, marketing, recruiting and other related
              purposes.
            </li>
          </ul>
        </ReadingSection>

        <ReadingSection title="Your Choices About How We Use and Disclose Your Information">
          <p>
            We strive to provide you with choices regarding the Personal Data
            you provide to us. We have created mechanisms to provide you with
            the following control over your information:
          </p>

          <p>
            <strong>
              Accessing, Deleting and Correcting Your Information.
            </strong>{' '}
            <br />
            You may contact us as set out in the “Contact Us“ section below to
            request access to, correct or delete any Personal Data that we have
            about you, provided that:
          </p>

          <ul className="space-y-4 pl-4">
            <li>
              We cannot delete your Personal Data except by also deleting your
              user account.
            </li>

            <li>
              We may not accommodate a request to change information if we
              believe the change would violate any law or legal requirement or
              cause the information to be incorrect.
            </li>
          </ul>

          <p>
            We do not control third parties’ collection or use of your
            information to serve interest-based advertising. However, these
            third parties may provide you with ways to choose not to have your
            information collected or used in this way.
          </p>
        </ReadingSection>

        <ReadingSection title="Your Privacy Rights">
          <p>
            You have the following rights, as provided under applicable law and
            subject to any limitations in such law:
          </p>

          <ul className="space-y-4 pl-2">
            <li>
              <strong>Right to Access. </strong> <br /> You have the right to
              obtain access to the Personal Data we hold about you and to
              request certain information about our processing. More in
              particular, you have the right to receive an explanation of
              <ol className="space-y-2 pl-4 pt-2">
                <li>(i) why we process your Personal Data,</li>
                <li>(ii) the categories of Personal Data we have about you,</li>
                <li>(iii) who we share your Personal Data with,</li>
                <li>(iv) how long we store your Personal Data and </li>
                <li>
                  (v) who we received your Personal Data from, if it was not
                  collected from you directly. We will also inform you about
                  your privacy rights.
                </li>
              </ol>
            </li>

            <li>
              <strong>Right to Rectification.</strong>
              <br />
              You have the right to correct, update or complete any Personal
              Data we hold about you that is inaccurate or incomplete. Please
              note that we may rectify or remove incomplete or inaccurate
              information, at any time and at our own discretion.
            </li>

            <li>
              <strong>Right to Erasure. </strong> <br />
              You may request to have your Personal Data anonymized, erased or
              deleted, as appropriate. In this case, if there is no overriding
              legitimate interest to continue processing your Personal Data we
              will erase your data.
            </li>

            <li>
              <strong>Right to Object to Processing.</strong>
              <br />
              You have the right to object to our processing of your Personal
              Data where we are relying on a legitimate interest or if we are
              processing your Personal Data for direct marketing purposes.
            </li>

            <li>
              <strong>Right to Restrict Processing.</strong>
              <br />
              You have a right in certain circumstances to stop us processing
              your Personal Data other than for storage purposes.
            </li>

            <li>
              <strong>Right to Portability.</strong>
              <br />
              You have the right to receive, in a structured, commonly used and
              machine-readable format, Personal Data that we hold about you, if
              we process it on the basis of our contract with you, or with your
              consent, or to request that we transfer such Personal Data to a
              third party.
            </li>

            <li>
              <strong>Right to Withdraw Consent.</strong>
              <br />
              You may withdraw any consent you previously provided to us
              regarding the processing of your Personal Data at any time and
              free of charge. We will apply your preferences going forward. This
              will not affect the lawfulness of the processing before you
              withdrew your consent.
            </li>

            <li>
              <strong>Right to Lodge a Complaint.</strong>
              <br />
              You may lodge a complaint with a supervisory authority, including
              in your country of residence, place of work, or where you believe
              an incident took place.
            </li>
          </ul>

          <p>
            You may exercise these rights by contacting us as set out in the
            “Contact Us” section below. Please note that, prior to any response
            to the exercise of such rights, we will require you to verify your
            identity. In addition, we may have valid legal reasons to refuse
            your request and will inform you if that is the case. Note that
            applicable laws contain certain exceptions and limitations to each
            of these rights.
          </p>
        </ReadingSection>

        <ReadingSection title="International Data Transfers">
          <p>
            If you provide us with your Personal Data when using the Services
            from the EEA, Switzerland or the UK or other regions of the world
            with laws governing data collection and use that may differ from
            U.S. law, then please note that you are transferring your Personal
            Data outside of those regions to the United States for storage and
            processing.
          </p>

          <p>
            If we transfer your Personal Data internationally, we will ensure
            that relevant safeguards are in place to afford adequate protection
            for your Personal Data and we will comply with applicable data
            protection laws, in particular by relying on an EU Commission
            adequacy decision, on contractual protections for the transfer of
            your Personal Data or a derogation if available. For more
            information about how we transfer Personal Data internationally,
            please contact us as set out in the “Contact Us“ section below.
          </p>
        </ReadingSection>

        <ReadingSection title="Children’s Privacy">
          <p>
            Our Services are not directed to children, and we do not knowingly
            collect Personal Data from children under the age of 18. If you
            learn that a child has provided us with Personal Data in violation
            of this Policy, please contact us as set out in the “Contact Us”
            section below.
          </p>
        </ReadingSection>

        <ReadingSection title="Data Security">
          <p>
            We have implemented physical, managerial, and technical safeguards
            that are designed to improve the integrity of Personal Data that we
            collect, maintain, and otherwise process and to secure it from
            unauthorised access, use, alteration and disclosure. All information
            you provide to us is stored on our secure servers behind firewalls.
          </p>
          <p>
            The safety and security of your information also depends on you.
            Given login is done via the use of wallet addresses, you are
            responsible for keeping this information as confidential as possible
            and not share with anyone else.
          </p>
          <p>
            The transmission of information via the internet is not completely
            secure. Although we do our best to protect your Personal Data, we
            cannot guarantee the security of your Personal Data transmitted to
            our Website. Any transmission of Personal Data is at your own risk.
          </p>
        </ReadingSection>

        <ReadingSection title="Data retention">
          <p>
            We store all Personal Data for as long as necessary to fulfil the
            purposes set out in this Policy, or for as long as we are required
            to do so for backups, archiving, prevention of fraud and abuse,
            analytics, satisfaction of legal or regulatory obligations, or where
            we otherwise reasonably believe that we have a legitimate reason to
            do so. Retention periods will be determined taking into account the
            type of information that is collected and the purpose for which it
            was collected, bearing in mind the requirements applicable to the
            situation and the need to delete outdated, unused information at the
            earliest reasonable time.
          </p>

          <p>
            When deleting Personal Data, we will take measures to render such
            Personal Data irrecoverable or irreproducible, and the electronic
            files which contain Personal Data will be permanently deleted.
          </p>
        </ReadingSection>

        <ReadingSection title="Data Breaches">
          <p>
            We take great care to ensure the security and privacy of any
            Personal Data we hold. In the event of a personal data breach with a
            likelihood of harm, we will immediately notify all parties whose
            Personal data was part of the breach for whom we hold up-to-date
            contact details.
          </p>
        </ReadingSection>
        <ReadingSection title="Third Party Services">
          <p>
            The Services may contain features or links to websites and services
            provided by third parties. Any information you provide on
            third-party sites or services is provided directly to the operators
            of such services and is subject to those operators’ policies, if
            any, and governing privacy and security, even if accessed through
            the Services. We are not responsible for the content or privacy and
            security practices and policies of third-party sites or services to
            which links or access are provided through the Service and we
            encourage you to learn about third parties’ privacy and security
            policies before providing them with your Personal Data.
          </p>
        </ReadingSection>

        <ReadingSection title="Changes and Updates to this Policy">
          <p>
            We may update this Policy from time to time to reflect changes in
            our privacy practices. It is our policy to post any changes we make
            to this Policy online. The date the Policy was last revised is
            identified at the top of the page. Please monitor our Website and
            this Policy periodically to check for any changes. If we make
            material changes to how we treat our users’ Personal Data, we will
            notify you by email to the email address specified in your account
            and/or through a notice on the Website home page.
          </p>
        </ReadingSection>

        <ReadingSection title="Contact Us ">
          <p>
            StrategyTribe is the entity responsible for the processing of your
            Personal Data and for the purpose of the European Union’s General
            Data Protection Regulation, is the data controller in respect of the
            processing of your Personal Data. If you have any questions or
            comments about this Policy, our privacy practices, or if you would
            like to exercise your rights with respect to your Personal Data,
            please contact our data protection officer at:
          </p>

          <p>privacy@strategytribe.io</p>
        </ReadingSection>

        <AfterRead />
      </div>
    </>
  );
};

RulesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default RulesPage;
