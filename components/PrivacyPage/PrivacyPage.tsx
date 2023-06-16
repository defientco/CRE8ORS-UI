import { ReactNode, useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useScroll } from "framer-motion"
import useScrollEnded from "../../hooks/useScrollEnded"
import Layout from "../Layout"

type SectionType = {
  id: string
  content: ReactNode
  mobile_content: ReactNode
}

const PrivacyPage = () => {
  const sections: SectionType[] = [
    {
      id: "privacy_date",
      content: <>Last Updated: [June 1 2023]</>,
      mobile_content: <>Last Updated: [June 1 2023]</>,
    },
    {
      id: "privacy_summary",
      content: (
        <>
          This Privacy Policy is designed to help you understand how Defi Entertainment, Inc.
          (collectively with any subsidiaries, called
          <br />
          “Defient”, “we,” “us,” and “our”) collects, uses, and shares your personal information and
          to help you understand and exercise your
          <br />
          privacy rights.
        </>
      ),
      mobile_content: (
        <>
          This Privacy Policy is designed to help you understand how Defi Entertainment, Inc.
          (collectively with any subsidiaries, called
          <br />
          “Defient”, “we,” “us,” and “our”) collects, uses, and shares your personal information and
          to help you understand and exercise your
          <br />
          privacy rights.
        </>
      ),
    },
    {
      id: "privacy_important",
      content: (
        <ul className="pl-8">
          <li className="list-disc">1. SCOPE</li>
          <li className="list-disc">2. CHANGES TO OUR PRIVACY POLICY</li>
          <li className="list-disc">3. PERSONAL INFORMATION WE COLLECT</li>
          <li className="list-disc">4. HOW WE USE YOUR INFORMATION</li>
          <li className="list-disc">5. HOW WE DISCLOSE YOUR INFORMATION</li>
          <li className="list-disc">6. YOUR PRIVACY CHOICES AND RIGHTS</li>
          <li className="list-disc">7. SECURITY OF YOUR INFORMATION</li>
          <li className="list-disc">8. INTERNATIONAL DATA TRANSFERS</li>
          <li className="list-disc">9. SUPPLEMENTAL NOTICE FOR CALIFORNIA RESIDENTS</li>
          <li className="list-disc">10. SUPPLEMENTAL NOTICE FOR NEVADA RESIDENTS</li>
          <li className="list-disc">11. CHILDREN’S INFORMATION</li>
          <li className="list-disc">12. THIRD-PARTY’S WEBSITES/APPLICATIONS</li>
          <li className="list-disc">13. SUPERVISORY AUTHORITY</li>
          <li className="list-disc">14. CONTACT US</li>
        </ul>
      ),
      mobile_content: (
        <ul className="pl-8">
          <li className="list-disc">1. SCOPE</li>
          <li className="list-disc">2. CHANGES TO OUR PRIVACY POLICY</li>
          <li className="list-disc">3. PERSONAL INFORMATION WE COLLECT</li>
          <li className="list-disc">4. HOW WE USE YOUR INFORMATION</li>
          <li className="list-disc">5. HOW WE DISCLOSE YOUR INFORMATION</li>
          <li className="list-disc">6. YOUR PRIVACY CHOICES AND RIGHTS</li>
          <li className="list-disc">7. SECURITY OF YOUR INFORMATION</li>
          <li className="list-disc">8. INTERNATIONAL DATA TRANSFERS</li>
          <li className="list-disc">9. SUPPLEMENTAL NOTICE FOR CALIFORNIA RESIDENTS</li>
          <li className="list-disc">10. SUPPLEMENTAL NOTICE FOR NEVADA RESIDENTS</li>
          <li className="list-disc">11. CHILDREN’S INFORMATION</li>
          <li className="list-disc">12. THIRD-PARTY’S WEBSITES/APPLICATIONS</li>
          <li className="list-disc">13. SUPERVISORY AUTHORITY</li>
          <li className="list-disc">14. CONTACT US</li>
        </ul>
      ),
    },
    {
      id: "privacy_1",
      content: (
        <>
          1. SCOPE
          <br />
          This Privacy Policy applies to personal information processed by us, through our websites,
          mobile applications and any other
          <br />
          services or interfaces owned or controlled by Defient that post a link to this Privacy
          Policy (each a “Service” and together, the
          <br />
          “Services”). For the avoidance of doubt, Defient does not control the blockchain protocol
          (“Protocol”) on which fungible tokens and
          <br />
          various non-fungible tokens (“NFTs”) are tradable or useable and cannot control activity
          and data on the Protocol, the validation
          <br />
          of transactions on the Protocol, or use of the Protocol.
        </>
      ),
      mobile_content: (
        <>
          1. SCOPE
          <br />
          This Privacy Policy applies to personal information processed by us, through our websites,
          mobile applications and any other
          <br />
          services or interfaces owned or controlled by Defient that post a link to this Privacy
          Policy (each a “Service” and together, the
          <br />
          “Services”). For the avoidance of doubt, Defient does not control the blockchain protocol
          (“Protocol”) on which fungible tokens and
          <br />
          various non-fungible tokens (“NFTs”) are tradable or useable and cannot control activity
          and data on the Protocol, the validation
          <br />
          of transactions on the Protocol, or use of the Protocol.
        </>
      ),
    },
    {
      id: "privacy_2",
      content: (
        <>
          2. CHANGES TO OUR PRIVACY POLICY
          <br />
          We may revise this Privacy Policy from time to time at our sole discretion. If there are
          any material changes to this Privacy Policy,
          <br />
          we will notify you as required by applicable law. You understand and agree that you will
          be deemed to have accepted the updated
          <br />
          Privacy Policy if you continue to use our Services after the new Privacy Policy takes
          effect.
        </>
      ),
      mobile_content: (
        <>
          2. CHANGES TO OUR PRIVACY POLICY
          <br />
          We may revise this Privacy Policy from time to time at our sole discretion. If there are
          any material changes to this Privacy Policy,
          <br />
          we will notify you as required by applicable law. You understand and agree that you will
          be deemed to have accepted the updated
          <br />
          Privacy Policy if you continue to use our Services after the new Privacy Policy takes
          effect.
        </>
      ),
    },
    {
      id: "privacy_3",
      content: (
        <>
          3. PERSONAL INFORMATION WE COLLECT
          <br />
          The categories of personal information we collect depend on how you interact with us, our
          Services and the requirements of
          <br />
          applicable law. We collect information that you provide to us, information we obtain
          automatically when you use our Services, and
          <br />
          information from other sources such as third-party services and organizations, as
          described below.
          <div>A. Information You Provide to Us Directly</div>
          <div>
            We may collect the following personal information that you provide to us.
            <br />
            <ul>
              <li className="list-disc">
                Account Creation. We may collect information when you create an account with us or
                our service providers (e.g., Shopify), such
                <br />
                as name and email address. We may also require that you provide additional identity
                and verification information.
              </li>
              <li className="list-disc">
                Purchases, Wallet and Transaction Information. In order to engage in certain
                transactions or purchases on the Services, you
                <br />
                may need to provide us or our third-party payment processors with your payment
                information and allow us to connect to your
                <br />
                digital wallet by providing us with your public wallet address. We will never ask
                you or collect your private keys. We do not
                <br />
                directly collect or store any payment card information entered through our Services
                or access your digital wallet, but we may
                <br />
                receive from our third-party payment processing providers information associated
                with your payment card information (e.g.,
                <br />
                your billing details).
              </li>
              <li className="list-disc">
                Other Transactions. We may collect personal information and details associated with
                your activities on our Services.
              </li>
              <li className="list-disc">
                Your Communications with Us. We may collect personal information, such as email
                address, phone number or mailing address
                <br />
                when you request information about our Services, register for our newsletter, apply
                for a job or otherwise communicate with us.
              </li>
              <li className="list-disc">
                Interactive Features. We and others who use our Services may collect personal
                information that you submit or make available
                <br />
                through our interactive features (e.g., via the Defient communities on Discord,
                messaging and chat features, and social media
                <br />
                pages). Any personal information you provide on the public sections of these
                features will be considered “public,” (the “User
                <br />
                Content”) unless otherwise required by applicable law, and is not subject to the
                privacy protections referenced herein. Please
                <br />
                exercise caution before revealing any information that may identify you in the real
                world to other users.
              </li>
              <li className="list-disc">
                Surveys. We may contact you to participate in surveys. If you decide to participate,
                you may be asked to provide certain
                <br />
                information which may include personal information.
              </li>
              <li className="list-disc">
                Sweepstakes, Giveaways or Contests. We may collect personal information you provide
                for any sweepstakes, giveaways or
                <br />
                contests that we offer. In some jurisdictions, we are required to publicly share
                information of sweepstakes and contest winners.
              </li>
              <li className="list-disc">
                Conferences, Trade Shows, and Other Events. We may collect personal information from
                individuals when we attend or host
                <br />
                conferences, trade shows, and other events.
              </li>
              <li className="list-disc">
                Business Development and Strategic Partnerships. We may collect personal information
                from individuals and third parties
                <br />
                to assess and pursue potential business opportunities.
              </li>
            </ul>
          </div>
          <div>B. Information Collected Automatically</div>
          <div>
            We may collect personal information automatically when you use our Services such as:
            <br />
            <ul>
              <li className="list-disc">
                Automatic Data Collection. We may collect certain information automatically when you
                use our Services, such as your Internet
                <br />
                protocol (IP) address, user settings, MAC address, cookie identifiers, mobile
                carrier and other unique identifiers, browser
                <br />
                or device information, location information (including approximate location derived
                from IP address), Internet service provider,
                <br />
                and metadata about the content you provide. We may also automatically collect
                information regarding your use of our
                <br />
                Services, such as pages that you visit before, during and after using our Services,
                information about the links you click, the
                <br />
                types of content you interact with, the frequency and duration of your activities,
                and other information about how you use our
                <br />
                Services.
              </li>
              <li className="list-disc">
                Cookie Policy for Cookies and Other Technologies. We, as well as third parties that
                provide content or other functionality
                <br />
                on our Services, may use cookies, local storage, and other technologies
                (“Technologies”) to automatically collect information through
                <br />
                your use of our Services.
              </li>
              <li className="list-disc">
                Cookies. Cookies are small text files placed in device browsers that store
                preferences and facilitate and enhance your experience.
              </li>
            </ul>
            Our uses of these Technologies fall into the following general categories:
            <br />
            <ul>
              <li className="list-disc">
                Operationally Necessary. This includes Technologies that allow you access to our
                Services, applications, and tools that are
                <br />
                required to identify irregular website behavior, prevent fraudulent activity,
                improve security, or allow you to make use of our
                <br />
                functionality;
              </li>
              <li className="list-disc">
                Performance-Related. We may use Technologies to assess the performance of our
                Services, including as part of our analytic
                <br />
                practices to help us understand how individuals use our Services (see Analytics
                below);
              </li>
              <li className="list-disc">
                Functionality-Related. We may use Technologies that allow us to offer you enhanced
                functionality when accessing or using our
                <br />
                Services. This may include identifying you when you sign into our Services or
                keeping track of your specified preferences,
                <br />
                interests, or past items viewed;
              </li>
            </ul>
            See “Your Privacy Choices and Rights” below to understand your choices regarding these
            Technologies.
            <br />
            <ul>
              <li className="list-disc">
                Analytics. We may use our Technologies and other third-party tools to process
                analytics information on our Services. These
                <br />
                technologies allow us to process usage data to better understand how our Services
                are used, and to continually improve and
                <br />
                personalize our Services. Some of our analytics partners include:
              </li>
              <li className="list-disc">
                Plausible. We use Plausible to analyze usage of and traffic to our Services.
                Plausible does not use cookies to track website
                <br />
                visitors. To learn more about Plausible and its use of your information, please
                review the <span className="underline">Plausible Privacy Policy.</span>
              </li>
              <li className="list-disc">
                Social Media Platforms. Our Services may contain social media buttons, such as
                Discord, Snapchat, Twitter, and Telegram, which
                <br />
                might include widgets such as the “share this” button or other interactive mini
                programs). These features may collect your IP
                <br />
                address and which page you are visiting on our Services and may set a cookie to
                enable the feature to function properly. Your
                <br />
                interactions with these platforms are governed by the privacy policy of the company
                providing it.
              </li>
            </ul>
          </div>
          <div>C. Information Collected from Other Sources</div>
          <div>
            <ul>
              <li className="list-disc">
                Third-Party Sources. We may obtain information about you from other sources,
                including through third-party services and
                <br />
                organizations. For example, if you access our Services through a third-party
                application, such as an app store, a third-party
                <br />
                login service, or a social networking site, we may collect information about you
                from that third-party application that you have made available via your privacy
                settings.
              </li>
              <li className="list-disc">
                Purchases, Wallet and Transaction Information. In order to engage in certain
                transactions or purchases on the Services, you
                <br />
                may need to provide us or our third-party payment processors with your payment
                information and allow us to connect to your
                <br />
                digital wallet by providing us with your public wallet address. We will never ask
                you or collect your private keys. We do not
                <br />
                directly collect or store any payment card information entered through our Services
                or access your digital wallet, but we may
                <br />
                receive from our third-party payment processing providers information associated
                with your payment card information (e.g.,
                <br />
                your billing details).
              </li>
              <li className="list-disc">
                Other Transactions. We may collect personal information and details associated with
                your activities on our Services.
              </li>
              <li className="list-disc">
                Your Communications with Us. We may collect personal information, such as email
                address, phone number or mailing address
                <br />
                when you request information about our Services, register for our newsletter, apply
                for a job or otherwise communicate with us.
              </li>
              <li className="list-disc">
                Interactive Features. We and others who use our Services may collect personal
                information that you submit or make available
                <br />
                through our interactive features (e.g., via the Defient communities on Discord,
                messaging and chat features, and social media
                <br />
                pages). Any personal information you provide on the public sections of these
                features will be considered “public,” (the “User
                <br />
                Content”) unless otherwise required by applicable law, and is not subject to the
                privacy protections referenced herein. Please
                <br />
                exercise caution before revealing any information that may identify you in the real
                world to other users.
              </li>
              <li className="list-disc">
                Surveys. We may contact you to participate in surveys. If you decide to participate,
                you may be asked to provide certain
                <br />
                information which may include personal information.
              </li>
              <li className="list-disc">
                Sweepstakes, Giveaways or Contests. We may collect personal information you provide
                for any sweepstakes, giveaways or
                <br />
                contests that we offer. In some jurisdictions, we are required to publicly share
                information of sweepstakes and contest winners.
              </li>
              <li className="list-disc">
                Conferences, Trade Shows, and Other Events. We may collect personal information from
                individuals when we attend or host
                <br />
                conferences, trade shows, and other events.
              </li>
              <li className="list-disc">
                Business Development and Strategic Partnerships. We may collect personal information
                from individuals and third parties
                <br />
                to assess and pursue potential business opportunities.
              </li>
            </ul>
          </div>
        </>
      ),
      mobile_content: (
        <>
          3. PERSONAL INFORMATION WE COLLECT
          <br />
          The categories of personal information we collect depend on how you interact with us, our
          Services and the requirements of
          <br />
          applicable law. We collect information that you provide to us, information we obtain
          automatically when you use our Services, and
          <br />
          information from other sources such as third-party services and organizations, as
          described below.
        </>
      ),
    },
    {
      id: "privacy_4",
      content: (
        <>
          4. Who May Use the Site? You may use the Site only if you are 18 years or older and
          capable
          <br />
          of forming a binding contract with Defient, and not otherwise barred from using the Site
          under applicable
          <br />
          law.
        </>
      ),
      mobile_content: (
        <>
          4. Who May Use the Site? You may use the Site only if you are 18 years or older and
          capable
          <br />
          of forming a binding contract with Defient, and not otherwise barred from using the Site
          under applicable
          <br />
          law.
        </>
      ),
    },
    {
      id: "privacy_5",
      content: (
        <>
          5. Feedback. We value your feedback on the Site, but please don’t send us suggestions for
          <br />
          improvements, creative ideas, designs, pitch portfolios or other materials (collectively
          “Unsolicited
          <br />
          Ideas”). This policy is aimed at avoiding potential disputes or misunderstandings when our
          Site might
          <br />
          seem similar to Unsolicited Ideas that people submit. We may currently be developing, have
          developed
          <br />
          or in the future will develop ideas or materials internally or receive ideas or materials
          from other
          <br />
          parties that may be similar to Unsolicited Ideas. If you ignore this policy and send us
          your Unsolicited
          <br />
          Ideas anyway, you grant us a non-exclusive, worldwide, perpetual, irrevocable, fully-paid,
          royalty-free,
          <br />
          sub-licensable and transferable license under any and all intellectual property or other
          rights that you
          <br />
          own or control to use, copy, modify, create derivative works based upon, make, have made,
          sell, offer
          <br />
          for sale, import and otherwise exploit in any manner or medium whatsoever known now or in
          the
          <br />
          future your Unsolicited Ideas for any purpose, without compensation to you.
        </>
      ),
      mobile_content: (
        <>
          5. Feedback. We value your feedback on the Site, but please don’t send us suggestions for
          <br />
          improvements, creative ideas, designs, pitch portfolios or other materials (collectively
          “Unsolicited
          <br />
          Ideas”). This policy is aimed at avoiding potential disputes or misunderstandings when our
          Site might
          <br />
          seem similar to Unsolicited Ideas that people submit. We may currently be developing, have
          developed
          <br />
          or in the future will develop ideas or materials internally or receive ideas or materials
          from other
          <br />
          parties that may be similar to Unsolicited Ideas. If you ignore this policy and send us
          your Unsolicited
          <br />
          Ideas anyway, you grant us a non-exclusive, worldwide, perpetual, irrevocable, fully-paid,
          royalty-free,
          <br />
          sub-licensable and transferable license under any and all intellectual property or other
          rights that you
          <br />
          own or control to use, copy, modify, create derivative works based upon, make, have made,
          sell, offer
          <br />
          for sale, import and otherwise exploit in any manner or medium whatsoever known now or in
          the
          <br />
          future your Unsolicited Ideas for any purpose, without compensation to you.
        </>
      ),
    },
    {
      id: "privacy_6",
      content: (
        <>
          6. Defients’ Intellectual Property. We may make available through the Site content that is
          subject to
          <br />
          intellectual property rights. We or our licensors, or the third parties who otherwise own
          the intellectual
          <br />
          property rights, retain all rights to that content.
        </>
      ),
      mobile_content: (
        <>
          The Cre8ors Collective is built on
          <br /> collaboration. We believe that when
          <br /> an entire community works together
          <br /> anything is possible. Divine Ancestral
          <br /> Pendant NFTs are ERC1155 tokens
          <br /> that we use to reward involvement in
          <br /> our community-building activities. It&apos; s <br />
          our way to track and give value back
          <br /> for contributions to the collective.
          <br /> Each Divine Ancestral Pendant NFT
          <br /> can be burnt for a 0.009 ETH
          <br /> discount when reserving a Cre8ors
          <br /> Collective Passport.
        </>
      ),
    },
    {
      id: "privacy_7",
      content: (
        <>
          7. General Prohibitions and Defients’’ Enforcement Rights. You agree not to do any of the
          following:
          <br />
          <ul className="pl-8">
            <li className="list-disc">
              (a) Use, display, mirror or frame the Site or any individual element within the Site,
              Site’s name, any
              <br />
              Defient trademark, logo or other proprietary information, or the layout and design of
              any page
              <br />
              or form contained on a page, without Defients’ express written consent;
            </li>
            <li className="list-disc">
              (b) Access, tamper with, or use non-public areas of the Site, Defients’ computer
              systems, or the
              <br />
              technical delivery systems of Defients’ providers;
            </li>
            <li className="list-disc">
              (c) Attempt to probe, scan or test the vulnerability of any Defients’ system or
              network or breach
              <br />
              any security or authentication measures;
            </li>
            <li className="list-disc">
              (d) Avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any
              <br />
              technological measure implemented by Defient or any of Defients’ providers or any
              other third
              <br />
              party (including another user) to protect the Site;
            </li>
            <li className="list-disc">
              (e) Attempt to access or search the Site or download content from the Site using any
              engine,
              <br />
              software, tool, agent, device or mechanism (including spiders, robots, crawlers, data
              mining tools or
              <br />
              the like) other than the software and/or search agents provided by Defient or other
              generally
              <br />
              available third-party web browsers;
            </li>
            <li className="list-disc">
              (f) Use the Site, or any portion thereof, for any commercial purpose or for the
              benefit of any third
              <br />
              party or in any manner not permitted by these Terms;
            </li>
            <li className="list-disc">
              (g) Attempt to decipher, decompile, disassemble or reverse engineer any of the
              software used to
              <br />
              provide the Site;
            </li>
            <li className="list-disc">
              (h) Interfere with, or attempt to interfere with, the access of any user, host or
              network, including,
              <br />
              without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing
              the Site;
            </li>
            <li className="list-disc">
              (i) Impersonate or misrepresent your affiliation with any person or entity;
            </li>
            <li className="list-disc">(j) Violate any applicable law or regulation; or</li>
            <li className="list-disc">
              (k) Encourage or enable any other individual to do any of the foregoing.
            </li>
          </ul>{" "}
          <br />
          Defient is not obligated to monitor access to or use of the Site or to review or edit any
          content.
          <br />
          However, we have the right to do so for the purpose of operating the Site, to ensure
          compliance with
          <br />
          these Terms and to comply with applicable law or other legal requirements. We reserve the
          right, but
          <br />
          are not obligated, to remove or disable access to any content, at any time and without
          notice,
          <br />
          including, but not limited to, if we, at our sole discretion, consider it objectionable or
          in violation of
          <br />
          these Terms. We have the right to investigate violations of these Terms or conduct that
          affects the
          <br />
          Site. We may also consult and cooperate with law enforcement authorities to prosecute
          users who
          <br />
          violate the law.
        </>
      ),
      mobile_content: (
        <>
          7. General Prohibitions and Defients’’ Enforcement Rights. You agree not to do any of the
          following:
          <br />
          <ul className="pl-8">
            <li className="list-disc">
              (a) Use, display, mirror or frame the Site or any individual element within the Site,
              Site’s name, any
              <br />
              Defient trademark, logo or other proprietary information, or the layout and design of
              any page
              <br />
              or form contained on a page, without Defients’ express written consent;
            </li>
            <li className="list-disc">
              (b) Access, tamper with, or use non-public areas of the Site, Defients’ computer
              systems, or the
              <br />
              technical delivery systems of Defients’ providers;
            </li>
            <li className="list-disc">
              (c) Attempt to probe, scan or test the vulnerability of any Defients’ system or
              network or breach
              <br />
              any security or authentication measures;
            </li>
            <li className="list-disc">
              (d) Avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any
              <br />
              technological measure implemented by Defient or any of Defients’ providers or any
              other third
              <br />
              party (including another user) to protect the Site;
            </li>
            <li className="list-disc">
              (e) Attempt to access or search the Site or download content from the Site using any
              engine,
              <br />
              software, tool, agent, device or mechanism (including spiders, robots, crawlers, data
              mining tools or
              <br />
              the like) other than the software and/or search agents provided by Defient or other
              generally
              <br />
              available third-party web browsers;
            </li>
            <li className="list-disc">
              (f) Use the Site, or any portion thereof, for any commercial purpose or for the
              benefit of any third
              <br />
              party or in any manner not permitted by these Terms;
            </li>
            <li className="list-disc">
              (g) Attempt to decipher, decompile, disassemble or reverse engineer any of the
              software used to
              <br />
              provide the Site;
            </li>
            <li className="list-disc">
              (h) Interfere with, or attempt to interfere with, the access of any user, host or
              network, including,
              <br />
              without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing
              the Site;
            </li>
            <li className="list-disc">
              (i) Impersonate or misrepresent your affiliation with any person or entity;
            </li>
            <li className="list-disc">(j) Violate any applicable law or regulation; or</li>
            <li className="list-disc">
              (k) Encourage or enable any other individual to do any of the foregoing.
            </li>
          </ul>{" "}
          <br />
          Defient is not obligated to monitor access to or use of the Site or to review or edit any
          content.
          <br />
          However, we have the right to do so for the purpose of operating the Site, to ensure
          compliance with
          <br />
          these Terms and to comply with applicable law or other legal requirements. We reserve the
          right, but
          <br />
          are not obligated, to remove or disable access to any content, at any time and without
          notice,
          <br />
          including, but not limited to, if we, at our sole discretion, consider it objectionable or
          in violation of
          <br />
          these Terms. We have the right to investigate violations of these Terms or conduct that
          affects the
          <br />
          Site. We may also consult and cooperate with law enforcement authorities to prosecute
          users who
          <br />
          violate the law.
        </>
      ),
    },
    {
      id: "privacy_8",
      content: (
        <>
          8. Links to Third Party Websites or Resources. The Site may allow you to access
          third-party websites or
          <br />
          other resources. We provide access only as a convenience and are not responsible for the
          content,
          <br />
          products or services on or available from those resources or links displayed on such
          websites. You
          <br />
          acknowledge sole responsibility for and assume all risk arising from, your use of any
          third-party
          <br />
          resources.
        </>
      ),
      mobile_content: (
        <>
          8. Links to Third Party Websites or Resources. The Site may allow you to access
          third-party websites or
          <br />
          other resources. We provide access only as a convenience and are not responsible for the
          content,
          <br />
          products or services on or available from those resources or links displayed on such
          websites. You
          <br />
          acknowledge sole responsibility for and assume all risk arising from, your use of any
          third-party
          <br />
          resources.
        </>
      ),
    },
    {
      id: "privacy_9",
      content: (
        <>
          9. Termination. We may suspend or terminate your access to and use of the Site, at our
          sole discretion,
          <br />
          at any time and without notice to you. Upon any termination, discontinuation or
          cancellation of these
          <br />
          Terms or the Site, the following Sections will survive: 5, 6, 8, 9, 10, 11, 12, 13, 14,
          and 15.
        </>
      ),
      mobile_content: (
        <>
          9. Termination. We may suspend or terminate your access to and use of the Site, at our
          sole discretion,
          <br />
          at any time and without notice to you. Upon any termination, discontinuation or
          cancellation of these
          <br />
          Terms or the Site, the following Sections will survive: 5, 6, 8, 9, 10, 11, 12, 13, 14,
          and 15.
        </>
      ),
    },
    {
      id: "privacy_10",
      content: (
        <>
          10. Warranty Disclaimers. THE SITE IS PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND.
          <br />
          WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ANY IMPLIED WARRANTIES OF
          <br />
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT AND NON-
          <br />
          INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
          <br />
          We make no warranty that the Site will meet your requirements or be available on an
          uninterrupted,
          <br />
          secure, or error-free basis. We make no warranty regarding the quality, accuracy,
          timeliness,
          <br />
          truthfulness, completeness or reliability of any information or content on the Site. Any
          reliance you
          <br />
          place on such information or content is strictly at your own risk
        </>
      ),
      mobile_content: (
        <>
          10. Warranty Disclaimers. THE SITE IS PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND.
          <br />
          WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ANY IMPLIED WARRANTIES OF
          <br />
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT AND NON-
          <br />
          INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
          <br />
          We make no warranty that the Site will meet your requirements or be available on an
          uninterrupted,
          <br />
          secure, or error-free basis. We make no warranty regarding the quality, accuracy,
          timeliness,
          <br />
          truthfulness, completeness or reliability of any information or content on the Site. Any
          reliance you
          <br />
          place on such information or content is strictly at your own risk
        </>
      ),
    },
    {
      id: "privacy_11",
      content: (
        <>
          11. Indemnity. You will indemnify and hold Defient and its officers, directors, employees
          and agents,
          <br />
          harmless from and against any claims, disputes, demands, liabilities, damages, losses, and
          costs and
          <br />
          expenses, including, without limitation, reasonable legal and accounting fees arising out
          of or in any
          <br />
          way connected with (a) your access to or use of the Site, or (b) your violation of these
          Terms.
        </>
      ),
      mobile_content: (
        <>
          11. Indemnity. You will indemnify and hold Defient and its officers, directors, employees
          and agents,
          <br />
          harmless from and against any claims, disputes, demands, liabilities, damages, losses, and
          costs and
          <br />
          expenses, including, without limitation, reasonable legal and accounting fees arising out
          of or in any
          <br />
          way connected with (a) your access to or use of the Site, or (b) your violation of these
          Terms.
        </>
      ),
    },
    {
      id: "privacy_12",
      content: (
        <>
          12. Limitation of Liability.
          <ul className="pl-8">
            <li className="list-disc">
              (a) TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER DEFIENT NOR ITS SERVICE
              <br />
              PROVIDERS INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SITE WILL BE LIABLE FOR
              <br />
              ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST
              <br />
              PROFITS, LOST REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR
              <br />
              GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF
              <br />
              SUBSTITUTE SERVICES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR
              <br />
              FROM THE USE OF OR INABILITY TO USE THE SITE, WHETHER BASED ON WARRANTY, CONTRACT,
              <br />
              TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY, AND
              <br />
              WHETHER OR NOT DEFIENT OR ITS SERVICE PROVIDERS HAVE BEEN INFORMED OF THE
              <br />
              POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE
              <br />
              FAILED OF ITS ESSENTIAL PURPOSE.
            </li>
            <li className="list-disc">
              (b) TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL DEFIENTS’ TOTAL LIABILITY
              <br />
              ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO
              <br />
              USE THE SITE EXCEED ONE HUNDRED U.S. DOLLARS ($100).
            </li>
            <li className="list-disc">
              (c) THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL
              <br />
              ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN DEFIENT AND YOU.
            </li>
          </ul>
        </>
      ),
      mobile_content: (
        <>
          12. Limitation of Liability.
          <ul className="pl-8">
            <li className="list-disc">
              (a) TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER DEFIENT NOR ITS SERVICE
              <br />
              PROVIDERS INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SITE WILL BE LIABLE FOR
              <br />
              ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST
              <br />
              PROFITS, LOST REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR
              <br />
              GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF
              <br />
              SUBSTITUTE SERVICES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR
              <br />
              FROM THE USE OF OR INABILITY TO USE THE SITE, WHETHER BASED ON WARRANTY, CONTRACT,
              <br />
              TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY, AND
              <br />
              WHETHER OR NOT DEFIENT OR ITS SERVICE PROVIDERS HAVE BEEN INFORMED OF THE
              <br />
              POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE
              <br />
              FAILED OF ITS ESSENTIAL PURPOSE.
            </li>
            <li className="list-disc">
              (b) TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL DEFIENTS’ TOTAL LIABILITY
              <br />
              ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO
              <br />
              USE THE SITE EXCEED ONE HUNDRED U.S. DOLLARS ($100).
            </li>
            <li className="list-disc">
              (c) THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL
              <br />
              ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN DEFIENT AND YOU.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "privacy_13",
      content: (
        <>
          13. Governing Law and Forum Choice. These Terms and any action related thereto will be
          governed by
          <br />
          the U.S. Federal Arbitration Act, federal arbitration law, and the laws of the State of
          Delaware, without
          <br />
          regard to its conflict of laws provisions. Except as otherwise expressly set forth in
          Section 14 “Dispute
          <br />
          Resolution,” the exclusive jurisdiction for all Disputes (defined below) that you and
          Defient are not
          <br />
          required to arbitrate will be the state and federal courts located in the State of
          Delaware, and you
          <br />
          and Defient each waive any objection to jurisdiction and venue in such courts.
        </>
      ),
      mobile_content: (
        <>
          13. Governing Law and Forum Choice. These Terms and any action related thereto will be
          governed by
          <br />
          the U.S. Federal Arbitration Act, federal arbitration law, and the laws of the State of
          Delaware, without
          <br />
          regard to its conflict of laws provisions. Except as otherwise expressly set forth in
          Section 14 “Dispute
          <br />
          Resolution,” the exclusive jurisdiction for all Disputes (defined below) that you and
          Defient are not
          <br />
          required to arbitrate will be the state and federal courts located in the State of
          Delaware, and you
          <br />
          and Defient each waive any objection to jurisdiction and venue in such courts.
        </>
      ),
    },
    {
      id: "privacy_14",
      content: (
        <>
          14. Dispute Resolution.
          <ul className="pl-8">
            <li className="list-disc">
              (a) Informal Resolution of Disputes. You and Defient must first attempt to resolve any
              dispute,
              <br />
              claim or controversy arising out of or relating to these Terms or the breach,
              termination,
              <br />
              enforcement, interpretation or validity thereof or the use of the Services
              (collectively, “Disputes”)
              <br />
              informally. Accordingly, neither you nor Defient may start a formal arbitration
              proceeding for at
              <br />
              least sixty (60) days after one party notifies the other party of a claim in writing.
              As part of this
              <br />
              informal resolution process, you must deliver your written notices via first-class
              mail to us
              <br />
              at Defient, Attn: 14613 Round Valley Dr. Sherman Oaks CA. 91403
            </li>
            <li className="list-disc">
              (b) Mandatory Arbitration of Disputes. We each agree that any Dispute will be resolved
              solely by
              <br />
              binding, individual arbitration and not in a class, representative or consolidated
              action or
              <br />
              proceeding. You and Defient agree that the U.S. Federal Arbitration Act governs the
              interpretation
              <br />
              and enforcement of these Terms, and that you and Defient are each waiving the right to
              a trial by
              <br />
              jury or to participate in a class action. This arbitration provision shall survive
              termination of these
              <br />
              Terms.
            </li>
            <li className="list-disc">
              (c) Exceptions. As limited exceptions to Section 14(b) above: (i) we both may seek to
              resolve a<br />
              Dispute in small claims court if it qualifies; and (ii) we each retain the right to
              seek injunctive or
              <br />
              other equitable relief from a court to prevent (or enjoin) the infringement or
              misappropriation of
              <br />
              our intellectual property rights.
            </li>
            <li className="list-disc">
              (d) Conducting Arbitration and Arbitration Rules. The arbitration will be conducted by
              the American
              <br />
              Arbitration Association (“AAA”) under its Consumer Arbitration Rules (the “AAA Rules”)
              then in
              <br />
              effect, except as modified by these Terms. The AAA Rules are available at www.adr.org
              or by calling
              <br />
              1-800-778-7879. A party who wishes to start arbitration must submit a written Demand
              for
              <br />
              Arbitration to AAA and give notice to the other party as specified in the AAA Rules.
              The AAA
              <br />
              provides a form Demand for Arbitration at www.adr.org. Any arbitration hearings will
              take place in
              <br />
              the county (or parish) where you live, unless we both agree to a different location.
              The parties
              <br />
              agree that the arbitrator shall have exclusive authority to decide all issues relating
              to the
              <br />
              interpretation, applicability, enforceability and scope of this arbitration agreement.
            </li>
            <li className="list-disc">
              (e) Arbitration Costs. Payment of all filing, administration and arbitrator fees will
              be governed by
              <br />
              the AAA Rules, and we won’t seek to recover the administration and arbitrator fees we
              are
              <br />
              responsible for paying, unless the arbitrator finds your Dispute frivolous. If we
              prevail in arbitration,
              <br />
              we’ll pay all of our attorneys’ fees and costs and won’t seek to recover them from
              you. If you
              <br />
              prevail in arbitration you will be entitled to an award of attorneys’ fees and
              expenses to the extent
              <br />
              provided under applicable law.
            </li>
            <li className="list-disc">
              (f) Injunctive and Declaratory Relief. Except as provided in Section 14(c) above, the
              arbitrator shall
              <br />
              determine all issues of liability on the merits of any claim asserted by either party
              and may award
              <br />
              declaratory or injunctive relief only in favor of the individual party seeking relief
              and only to the
              <br />
              extent necessary to provide relief warranted by that party’s individual claim. To the
              extent that you
              <br />
              or we prevail on a claim and seek public injunctive relief (that is, injunctive relief
              that has the
              <br />
              primary purpose and effect of prohibiting unlawful acts that threaten future injury to
              the public),
              <br />
              the entitlement to and extent of such relief must be litigated in a civil court of
              competent
              <br />
              jurisdiction and not in arbitration. The parties agree that litigation of any issues
              of public injunctive
              <br />
              relief shall be stayed pending the outcome of the merits of any individual claims in
              arbitration.
            </li>
            <li className="list-disc">
              (g) Class Action Waiver. YOU AND DEFIENT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE
              <br />
              OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER
              <br />
              IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, if the parties’ Dispute
              is
              <br />
              resolved through arbitration, the arbitrator may not consolidate another person’s
              claims with your
              <br />
              claims, and may not otherwise preside over any form of a representative or class
              proceeding. If
              <br />
              this specific provision is found to be unenforceable, then the entirety of this
              Dispute Resolution
              <br />
              section shall be null and void.
            </li>
            <li className="list-disc">
              (h) Severability. With the exception of any of the provisions in Section 14(g) of
              these Terms (“Class
              <br />
              Action Waiver”), if an arbitrator or court of competent jurisdiction decides that any
              part of these
              <br />
              Terms is invalid or unenforceable, the other parts of these Terms will still apply.
            </li>
          </ul>
        </>
      ),
      mobile_content: (
        <>
          14. Dispute Resolution.
          <ul className="pl-8">
            <li className="list-disc">
              (a) Informal Resolution of Disputes. You and Defient must first attempt to resolve any
              dispute,
              <br />
              claim or controversy arising out of or relating to these Terms or the breach,
              termination,
              <br />
              enforcement, interpretation or validity thereof or the use of the Services
              (collectively, “Disputes”)
              <br />
              informally. Accordingly, neither you nor Defient may start a formal arbitration
              proceeding for at
              <br />
              least sixty (60) days after one party notifies the other party of a claim in writing.
              As part of this
              <br />
              informal resolution process, you must deliver your written notices via first-class
              mail to us
              <br />
              at Defient, Attn: 14613 Round Valley Dr. Sherman Oaks CA. 91403
            </li>
            <li className="list-disc">
              (b) Mandatory Arbitration of Disputes. We each agree that any Dispute will be resolved
              solely by
              <br />
              binding, individual arbitration and not in a class, representative or consolidated
              action or
              <br />
              proceeding. You and Defient agree that the U.S. Federal Arbitration Act governs the
              interpretation
              <br />
              and enforcement of these Terms, and that you and Defient are each waiving the right to
              a trial by
              <br />
              jury or to participate in a class action. This arbitration provision shall survive
              termination of these
              <br />
              Terms.
            </li>
            <li className="list-disc">
              (c) Exceptions. As limited exceptions to Section 14(b) above: (i) we both may seek to
              resolve a<br />
              Dispute in small claims court if it qualifies; and (ii) we each retain the right to
              seek injunctive or
              <br />
              other equitable relief from a court to prevent (or enjoin) the infringement or
              misappropriation of
              <br />
              our intellectual property rights.
            </li>
            <li className="list-disc">
              (d) Conducting Arbitration and Arbitration Rules. The arbitration will be conducted by
              the American
              <br />
              Arbitration Association (“AAA”) under its Consumer Arbitration Rules (the “AAA Rules”)
              then in
              <br />
              effect, except as modified by these Terms. The AAA Rules are available at www.adr.org
              or by calling
              <br />
              1-800-778-7879. A party who wishes to start arbitration must submit a written Demand
              for
              <br />
              Arbitration to AAA and give notice to the other party as specified in the AAA Rules.
              The AAA
              <br />
              provides a form Demand for Arbitration at www.adr.org. Any arbitration hearings will
              take place in
              <br />
              the county (or parish) where you live, unless we both agree to a different location.
              The parties
              <br />
              agree that the arbitrator shall have exclusive authority to decide all issues relating
              to the
              <br />
              interpretation, applicability, enforceability and scope of this arbitration agreement.
            </li>
            <li className="list-disc">
              (e) Arbitration Costs. Payment of all filing, administration and arbitrator fees will
              be governed by
              <br />
              the AAA Rules, and we won’t seek to recover the administration and arbitrator fees we
              are
              <br />
              responsible for paying, unless the arbitrator finds your Dispute frivolous. If we
              prevail in arbitration,
              <br />
              we’ll pay all of our attorneys’ fees and costs and won’t seek to recover them from
              you. If you
              <br />
              prevail in arbitration you will be entitled to an award of attorneys’ fees and
              expenses to the extent
              <br />
              provided under applicable law.
            </li>
            <li className="list-disc">
              (f) Injunctive and Declaratory Relief. Except as provided in Section 14(c) above, the
              arbitrator shall
              <br />
              determine all issues of liability on the merits of any claim asserted by either party
              and may award
              <br />
              declaratory or injunctive relief only in favor of the individual party seeking relief
              and only to the
              <br />
              extent necessary to provide relief warranted by that party’s individual claim. To the
              extent that you
              <br />
              or we prevail on a claim and seek public injunctive relief (that is, injunctive relief
              that has the
              <br />
              primary purpose and effect of prohibiting unlawful acts that threaten future injury to
              the public),
              <br />
              the entitlement to and extent of such relief must be litigated in a civil court of
              competent
              <br />
              jurisdiction and not in arbitration. The parties agree that litigation of any issues
              of public injunctive
              <br />
              relief shall be stayed pending the outcome of the merits of any individual claims in
              arbitration.
            </li>
            <li className="list-disc">
              (g) Class Action Waiver. YOU AND DEFIENT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE
              <br />
              OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER
              <br />
              IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, if the parties’ Dispute
              is
              <br />
              resolved through arbitration, the arbitrator may not consolidate another person’s
              claims with your
              <br />
              claims, and may not otherwise preside over any form of a representative or class
              proceeding. If
              <br />
              this specific provision is found to be unenforceable, then the entirety of this
              Dispute Resolution
              <br />
              section shall be null and void.
            </li>
            <li className="list-disc">
              (h) Severability. With the exception of any of the provisions in Section 14(g) of
              these Terms (“Class
              <br />
              Action Waiver”), if an arbitrator or court of competent jurisdiction decides that any
              part of these
              <br />
              Terms is invalid or unenforceable, the other parts of these Terms will still apply.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "privacy_15",
      content: (
        <>
          15. General Terms.
          <ul className="pl-8">
            <li className="list-disc">
              (a) Reservation of Rights. Defient and its licensors exclusively own all right, title
              and interest in and
              <br />
              to the Site, including all associated intellectual property rights. You acknowledge
              that the Site is
              <br />
              protected by copyright, trademark, and other laws of the United States and other
              jurisdictions. You
              <br />
              agree not to remove, alter or obscure any copyright, trademark, service mark or other
              proprietary
              <br />
              rights notices incorporated in or accompanying the Site.
            </li>
            <li className="list-disc">
              (b) Entire Agreement. These Terms constitute the entire and exclusive understanding
              and
              <br />
              agreement between Defient and you regarding the Site, and these Terms supersede and
              replace all
              <br />
              prior oral or written understandings or agreements between Defient and you regarding
              the Site. If
              <br />
              any provision of these Terms is held invalid or unenforceable by a court of competent
              jurisdiction,
              <br />
              that provision will be enforced to the maximum extent permissible and the other
              provisions of these
              <br />
              Terms will remain in full force and effect. Except where provided by applicable law in
              your
              <br />
              jurisdiction, you may not assign or transfer these Terms, by operation of law or
              otherwise, without
              <br />
              Defients’ prior written consent. Any attempt by you to assign or transfer these Terms
              absent our
              <br />
              consent or your statutory right, without such consent, will be null. Defient may
              freely assign or
              <br />
              transfer these Terms without restriction. Subject to the foregoing, these Terms will
              bind and insure
              <br />
              to the benefit of the parties, their successors and permitted assigns.
            </li>
            <li className="list-disc">
              (c) Notices. Any notices or other communications provided by Defient under these Terms
              will be
              <br />
              given by posting to the Site.
            </li>
            <li className="list-disc">
              (d) Waiver of Rights. Defients’ failure to enforce any right or provision of these
              Terms will not
              <br />
              be considered a waiver of such right or provision. The waiver of any such right or
              provision will be
              <br />
              effective only if in writing and signed by a duly authorized representative ofDefient.
              Except as
              <br />
              expressly set forth in these Terms, the exercise by either party of any of its
              remedies under these
              <br />
              Terms will be without prejudice to its other remedies under these Terms or otherwise.
            </li>
          </ul>
        </>
      ),
      mobile_content: (
        <>
          15. General Terms.
          <ul className="pl-8">
            <li className="list-disc">
              (a) Reservation of Rights. Defient and its licensors exclusively own all right, title
              and interest in and
              <br />
              to the Site, including all associated intellectual property rights. You acknowledge
              that the Site is
              <br />
              protected by copyright, trademark, and other laws of the United States and other
              jurisdictions. You
              <br />
              agree not to remove, alter or obscure any copyright, trademark, service mark or other
              proprietary
              <br />
              rights notices incorporated in or accompanying the Site.
            </li>
            <li className="list-disc">
              (b) Entire Agreement. These Terms constitute the entire and exclusive understanding
              and
              <br />
              agreement between Defient and you regarding the Site, and these Terms supersede and
              replace all
              <br />
              prior oral or written understandings or agreements between Defient and you regarding
              the Site. If
              <br />
              any provision of these Terms is held invalid or unenforceable by a court of competent
              jurisdiction,
              <br />
              that provision will be enforced to the maximum extent permissible and the other
              provisions of these
              <br />
              Terms will remain in full force and effect. Except where provided by applicable law in
              your
              <br />
              jurisdiction, you may not assign or transfer these Terms, by operation of law or
              otherwise, without
              <br />
              Defients’ prior written consent. Any attempt by you to assign or transfer these Terms
              absent our
              <br />
              consent or your statutory right, without such consent, will be null. Defient may
              freely assign or
              <br />
              transfer these Terms without restriction. Subject to the foregoing, these Terms will
              bind and insure
              <br />
              to the benefit of the parties, their successors and permitted assigns.
            </li>
            <li className="list-disc">
              (c) Notices. Any notices or other communications provided by Defient under these Terms
              will be
              <br />
              given by posting to the Site.
            </li>
            <li className="list-disc">
              (d) Waiver of Rights. Defients’ failure to enforce any right or provision of these
              Terms will not
              <br />
              be considered a waiver of such right or provision. The waiver of any such right or
              provision will be
              <br />
              effective only if in writing and signed by a duly authorized representative ofDefient.
              Except as
              <br />
              expressly set forth in these Terms, the exercise by either party of any of its
              remedies under these
              <br />
              Terms will be without prejudice to its other remedies under these Terms or otherwise.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "privacy_16",
      content: (
        <>
          <div className="pb-[1.5rem]">
            16. Contact Information. If you have any questions about these Terms or the Site, please
            contact
            <br />
            Defient at [ support@defient.co ].
          </div>
          <div className="pb-[1.5rem]">
            NFT TERMS & CONDITIONS
            <br />
            Cre8ors is a collection of digital artworks (NFTs) running on the Ethereum network. This
            website is only
            <br />
            an interface allowing participants to exchange digital collectibles. Users are entirely
            responsible for the
            <br />
            safety and management of their own private Ethereum wallets and validating all
            transactions and
            <br />
            contracts generated by this website before approval. Furthermore, as the Cre8ors smart
            contract runs
            <br />
            on the Ethereum network, there is no ability to undo, reverse, or restore any
            transactions.
          </div>
          <div className="pb-[1.5rem]">
            This website and its connected services are provided “as is” and “as available” without
            warranty of any
            <br />
            kind. By using this website you are accepting sole responsibility for any and all
            transactions involving
            <br />
            Cre8ors digital collectibles.
          </div>
          <div className="pb-[1.5rem]">
            NFT OWNERSHIP
            <br />
            <div>
              i. You Own the NFT. Each Cre8or is an NFT on the Ethereum blockchain. When you
              purchase an NFT,
              <br />
              you own the underlying Cre8or, the Art, completely. Ownership of the NFT is mediated
              entirely by the
              <br />
              Smart Contract and the Ethereum Network: at no point may we seize, freeze, or
              otherwise modify
              <br />
              the ownership of any Cre8or.
            </div>
            <div className="pb-[1.5rem]">
              ii. Personal Use. Subject to your continued compliance with these Terms, Defi
              Entertainment Inc. grants
              <br />
              you a worldwide, royalty-free license to use, copy, and display the purchased Art,
              along with any
              <br />
              extensions that you choose to create or use, solely for the following purposes: (i)
              for your own
              <br />
              personal, non-commercial use; (ii) as part of a marketplace that permits the purchase
              and sale of
              <br />
              your Cre8or / NFT, provided that the marketplace cryptographically verifies each
              Cre8or owner’s
              <br />
              rights to display the Art for their Cre8or to ensure that only the actual owner can
              display the Art; or (iii)
              <br />
              as part of a third party website or application that permits the inclusion,
              involvement, or participation
              <br />
              of your Cre8or, provided that the website/application cryptographically verifies each
              Cre8or owner’s
              <br />
              rights to display the Art for their Cre8or to ensure that only the actual owner can
              display the Art, and
              <br />
              provided that the Art is no longer visible once the owner of the Cre8or leaves the
              website/application.
            </div>
            <div className="pb-[1.5rem]">
              iii. Commercial Use. Subject to your continued compliance with these Terms, Defi
              Entertainment Inc.
              <br />
              grants you an unlimited, worldwide license to use, copy, and display the purchased Art
              for the purpose
              <br />
              of creating derivative works based upon the Art (“Commercial Use”). Examples of such
              Commercial
              <br />
              Use would e.g. be the use of the Art to produce and sell merchandise products
              (T-Shirts etc.)
              <br />
              displaying copies of the Art. For the sake of clarity, nothing in this Section will be
              deemed to restrict
              <br />
              you from (i) owning or operating a marketplace that permits the use and sale of
              Cre8ors generally,
              <br />
              provided that the marketplace cryptographically verifies each Cre8or owner’s rights to
              display the Art
              <br />
              for their Cre8or to ensure that only the actual owner can display the Art; (ii) owning
              or operating a<br />
              third party website or application that permits the inclusion, involvement, or
              participation of Cre8ors
              <br />
              generally, provided that the third party website or application cryptographically
              verifies each Cre8or
              <br />
              owner’s rights to display the Art for their Cre8or to ensure that only the actual
              owner can display the
              <br />
              Art, and provided that the Art is no longer visible once the owner of the Purchased
              Cre8or leaves the
              <br />
              website/application; or (iii) earning revenue from any of the foregoing.
            </div>
          </div>
        </>
      ),
      mobile_content: (
        <>
          <div>
            16. Contact Information. If you have any questions about these Terms or the Site, please
            contact
            <br />
            Defient at [ support@defient.co ].
          </div>
          <div>
            NFT TERMS & CONDITIONS
            <br />
            Cre8ors is a collection of digital artworks (NFTs) running on the Ethereum network. This
            website is only
            <br />
            an interface allowing participants to exchange digital collectibles. Users are entirely
            responsible for the
            <br />
            safety and management of their own private Ethereum wallets and validating all
            transactions and
            <br />
            contracts generated by this website before approval. Furthermore, as the Cre8ors smart
            contract runs
            <br />
            on the Ethereum network, there is no ability to undo, reverse, or restore any
            transactions.
          </div>
          <div>
            This website and its connected services are provided “as is” and “as available” without
            warranty of any
            <br />
            kind. By using this website you are accepting sole responsibility for any and all
            transactions involving
            <br />
            Cre8ors digital collectibles.
          </div>
          <div>
            NFT OWNERSHIP
            <br />
            <div>
              i. You Own the NFT. Each Cre8or is an NFT on the Ethereum blockchain. When you
              purchase an NFT,
              <br />
              you own the underlying Cre8or, the Art, completely. Ownership of the NFT is mediated
              entirely by the
              <br />
              Smart Contract and the Ethereum Network: at no point may we seize, freeze, or
              otherwise modify
              <br />
              the ownership of any Cre8or.
            </div>
            <div>
              ii. Personal Use. Subject to your continued compliance with these Terms, Defi
              Entertainment Inc. grants
              <br />
              you a worldwide, royalty-free license to use, copy, and display the purchased Art,
              along with any
              <br />
              extensions that you choose to create or use, solely for the following purposes: (i)
              for your own
              <br />
              personal, non-commercial use; (ii) as part of a marketplace that permits the purchase
              and sale of
              <br />
              your Cre8or / NFT, provided that the marketplace cryptographically verifies each
              Cre8or owner’s
              <br />
              rights to display the Art for their Cre8or to ensure that only the actual owner can
              display the Art; or (iii)
              <br />
              as part of a third party website or application that permits the inclusion,
              involvement, or participation
              <br />
              of your Cre8or, provided that the website/application cryptographically verifies each
              Cre8or owner’s
              <br />
              rights to display the Art for their Cre8or to ensure that only the actual owner can
              display the Art, and
              <br />
              provided that the Art is no longer visible once the owner of the Cre8or leaves the
              website/application.
            </div>
            <div>
              iii. Commercial Use. Subject to your continued compliance with these Terms, Defi
              Entertainment Inc.
              <br />
              grants you an unlimited, worldwide license to use, copy, and display the purchased Art
              for the purpose
              <br />
              of creating derivative works based upon the Art (“Commercial Use”). Examples of such
              Commercial
              <br />
              Use would e.g. be the use of the Art to produce and sell merchandise products
              (T-Shirts etc.)
              <br />
              displaying copies of the Art. For the sake of clarity, nothing in this Section will be
              deemed to restrict
              <br />
              you from (i) owning or operating a marketplace that permits the use and sale of
              Cre8ors generally,
              <br />
              provided that the marketplace cryptographically verifies each Cre8or owner’s rights to
              display the Art
              <br />
              for their Cre8or to ensure that only the actual owner can display the Art; (ii) owning
              or operating a<br />
              third party website or application that permits the inclusion, involvement, or
              participation of Cre8ors
              <br />
              generally, provided that the third party website or application cryptographically
              verifies each Cre8or
              <br />
              owner’s rights to display the Art for their Cre8or to ensure that only the actual
              owner can display the
              <br />
              Art, and provided that the Art is no longer visible once the owner of the Purchased
              Cre8or leaves the
              <br />
              website/application; or (iii) earning revenue from any of the foregoing.
            </div>
          </div>
        </>
      ),
    },
  ]

  const containerRef = useRef<any>()

  const isMobile = useMediaQuery("(max-width: 799px)")

  const { scrollY } = useScroll({ container: containerRef })

  const { isScrollEnded } = useScrollEnded({
    ref: containerRef,
    scrollY,
  })

  return (
    <Layout type="contained">
      <div className="relative pb-[2rem] h-[100vh] w-[100vw] overflow-y-scroll" ref={containerRef}>
        {!isScrollEnded && (
          <div
            className="fixed 
              w-[100vw] h-[265px] 
              left-0 bottom-0
              pointer-events-none
              bg-gradient-to-t from-[white] dark:from-[black] to-[transparent]
              z-[20]"
          />
        )}
        <div className="relative w-full">
          <div
            className="font-eigerdals 
              text-[36px] md:text-[65px] 
              pt-[10rem] pb-[40px] 
              dark:text-[white] 
              mx-4 md:mx-12"
          >
            Terms of Service
          </div>
          <div
            className="md:mx-12 md:pl-[90px]
            mx-4 pl-0"
          >
            <div className="w-[290px] sumsungS8:w-[320px] xs:w-[350px] md:w-[917px]">
              {sections.map((section: SectionType) => (
                <div key={section.id} className="pb-[1.5rem] font-quicksand">
                  <div className="text-[14.5px] sumsungS8:text-[16px] xs:text-[19px] font-medium dark:text-[white] leading-[137%]">
                    {isMobile ? section.mobile_content : section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPage
