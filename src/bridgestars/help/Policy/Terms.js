/*
=========================================================
* Otis Kit PRO - v2.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';

// Otis Kit PRO examples
import DefaultNavbar from 'otis/Navbars/DefaultNavbar';
import DefaultFooter from 'otis/Footers/DefaultFooter';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter.js';
import BridgestarsNavbar from 'bridgestars/navbar';

export default function Terms() {
  return (
    <>
      <MKBox
        variant='gradient'
        bgColor='dark'
        borderRadius='lg'
        coloredShadow='dark'
        p={3}
        mt={-3}
        mx={2}
      >
        <MKTypography variant='h3' color='white'>
          Terms & Conditions
        </MKTypography>
        <MKTypography variant='body2' color='white' opacity={0.8}>
          Last modified: 25th of March 2022
        </MKTypography>
      </MKBox>
      <MKBox pb={6} px={6}>
        <MKTypography variant='h5' mt={6} mb={3}>
          Introduction
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          These are the terms and conditions governing the use of{' '}
          <a href='https://bridgestars.net'>https://bridgestars.net</a> and the
          Bridgestars application (collectively referred to as the Platform) and
          the agreement that operates between us and you (the Terms). The
          Platform is owned and operated by{' '}
          <b>Bridgestars Technologies Sweden AB</b> (us/our/we) and these Terms
          set out the rights and obligations of all users (you/your) in relation
          to your use of the Platform.
          <br />
          <br />
          Please read carefully these Terms and our Privacy Statement. By using
          the Platform, you are consenting to be bound by the current Terms and
          our Privacy Statement. We may revise the Terms and information
          contained on the Platform at any time and without notice. If you do
          not agree to these Terms or the Privacy Statement, please refrain from
          using the Platform.
          <br />
          <br />
          If you have any questions about the Terms or the Privacy Statement,
          please contact us through mail{' '}
          <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          CONDUCT OF USE
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          You are not allowed to use this Platform in any way that is unlawful,
          abusive, threatening, harassing, obscene, libellous, hateful, or in
          any other way violating these terms and conditions.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          LIABILITY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          The material contained on the Platform is provided without any
          guarantees, conditions or warranties as to its accuracy.{' '}
          <b>Bridgestars Technologies Sweden AB</b> does not represent that
          information contained on or available via the Platform is accurate or
          complete and accordingly, it should not be relied on as such. You
          should not rely on any such information. Any arrangements made between
          you and any other person, using or named on the Platform are entirely
          at your sole risk and responsibility.
          <br />
          <br />
          To the extent permitted by law, we, and third parties connected to us
          hereby expressly exclude:
          <br />
          <br />
          <ul style={{ 'margin-left': 10 }}>
            <li>
              all conditions, warranties and other terms which might otherwise
              be implied by statute, common law or the law of equity;
              <br />
              <br />
            </li>
            <li>
              any liability for loss or damage incurred by any user in
              connection with the use, inability to use, or results of the use
              of the Platform, any websites linked to it and any material posted
              on it;
              <br />
              <br />
            </li>
            <li>
              any liability for any bugs or faults in our systems or tools; and
              <br />
              <br />
            </li>
            <li>
              any liability for any direct, special, indirect or consequential
              loss or damage incurred by any user in connection with the
              Platform or in connection with the use, inability to use, or
              results of the use of the Platform, any websites linked to it and
              any materials posted on it, including, without limitation any
              liability for:
              <br />
              <br />
            </li>
          </ul>
          <ol style={{ 'margin-left': 20 }}>
            <li>
              {' '}
              loss of income or revenue; <br />
              <br />
            </li>
            <li>
              {' '}
              loss of business; <br />
              <br />
            </li>
            <li>
              {' '}
              loss of profits or contracts; <br />
              <br />
            </li>
            <li>
              {' '}
              loss of anticipated savings; <br />
              <br />
            </li>
            <li>
              {' '}
              loss of data; <br />
              <br />
            </li>
            <li>
              {' '}
              loss of goodwill; <br />
              <br />
            </li>
            <li>
              {' '}
              wasted management or office time; and <br />
              <br />
            </li>
            <li>
              for any other loss or damage of any kind, however arising and
              whether caused by tort (including negligence), breach of contract
              or otherwise, even if foreseeable. Nothing in this section affects
              our liability for death or personal injury arising from our
              negligence, nor our liability for fraudulent misrepresentation or
              misrepresentation as to a fundamental matter, nor any other
              liability which cannot be excluded or limited under applicable
              law.
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          LIMITS OF USE
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          You may use the Platform only for lawful purposes. You may not use the
          Platform:
          <br></br>
          <br></br>
          <ul style={{ 'margin-left': 10 }}>
            <li>
              In any way that breaches any applicable local, national or
              international law or regulation;
            </li>
            <li>
              In any way that is unlawful or fraudulent, or has any unlawful or
              fraudulent purpose or effect;
            </li>
            <li>
              To send, knowingly receive, upload, download, use or re-use any
              material which does not comply with our content standards;
            </li>
            <li>
              To transmit any data, send or upload any material that contains
              viruses, trojan horses, worms, time-bombs, keystroke loggers,
              spyware, adware or any other harmful programs or similar computer
              code designed to adversely affect the operation of any computer
              software or hardware.
            </li>
          </ul>
          <br></br>
          <b>You also agree:</b>
          <ul style={{ 'margin-left': 10 }}>
            <li>
              Not to reproduce, duplicate, copy or re-sell any part of the
              Platform in contravention of the provisions of these Terms;
            </li>
            <li>Not to use ad-blocking software;</li>
            <li>
              Not to reuse text or graphics from the Platform or parts thereof.
            </li>
          </ul>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          CHANGES TO TERMS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          We are committed to ensuring that the Platform is as useful and
          efficient as possible. For that reason, we reserve the right to make
          changes to the services, at any time. We will never charge you for any
          service without making it very clear to you precisely what you're
          paying for.
          <br></br>
          <br></br>
          Any new features which are added to the current site shall also be
          subject to this Terms and condition. You can always review the most
          current version of the Terms and conditions at any time on this page.
          We reserve the right to update, change or retrieve any part of these
          Terms and conditions by posting updates and/or changes to the
          Platform. It is your responsibility to check this page periodically
          for changes. Your continued use of or access to the Platform following
          the posting of any changes constitutes acceptance of those changes.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          SERVICE TERMS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          <ol style={{ 'margin-left': 10 }}>
            <li>
              <b>Bridgestars Technologies Sweden AB</b> at this moment grants
              the User a non-exclusive, non-transferable, limited right to
              access and use the Service, under the conditions of these Terms &
              Conditions and for the duration of the Agreement.
              <br></br>
              <br></br>
            </li>
            <li>
              The use of the Service is at the User's own expense and risk. The
              User is responsible for meeting the technical and functional
              requirements and using the electronic communication facilities
              that are necessary to be able to access and use the Service. The
              User will at all times bear the risk of loss, theft or damage to
              any of its data.
              <br></br>
              <br></br>
            </li>
            <li>
              <b>Bridgestars Technologies Sweden AB</b> will have the right (but
              not the obligation), at its sole discretion, to review, edit,
              limit, refuse or remove Content, or to limit or refuse the User
              access to the Service. More specifically in the event the use of
              the Service, according to us, violates these Terms of Use.
              <br></br>
              <br></br>
            </li>
            <li>
              We may disclose the User's Personal Data or Content, or other data
              relating to the use of the Service, to third parties where it
              believes, in good faith, that it is necessary to comply with a
              court order, ongoing judicial proceeding, criminal or civil
              subpoena, or other legal process or to exercise its constitutional
              rights of defence against legal claims.
              <br></br>
              <br></br>
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          CHAT FORUM SAFETY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          We do our best to keep the Platform safe, but we cannot guarantee it.
          We need your help to keep the Platform safe, which includes the
          following commitments by you:
          <br></br>
          <br></br>
          <ol style={{ 'margin-left': 10 }}>
            <li>
              You will not post unauthorized commercial communications (such as
              spam) on our forum.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not collect users' content or information, or otherwise
              access the Platform, using automated means (such as harvesting
              bots, robots, spiders, or scrapers) without our prior permission.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not engage in unlawful multi-level marketing, such as a
              pyramid scheme, on the Platform.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not upload viruses or other malicious code.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not solicit login information or access an account
              belonging to someone else.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not bully, intimidate, or harass any user.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not post content that: is hate speech, threatening, or
              pornographic; incites violence or contains nudity or graphic or
              gratuitous violence.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not develop or operate a third-party application
              containing alcohol-related, dating, or other mature content
              (including advertisements) without appropriate age-based
              restrictions.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not use the Platform to do anything unlawful, misleading,
              malicious, or discriminatory.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not do anything that could disable, overburden, or impair
              the proper working or appearance of the Platform, such as a denial
              of service attack or interference with page rendering or other the
              Platform functionality.
              <br></br>
              <br></br>
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          PROTECTING OTHER PEOPLE'S RIGHTS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          We respect other people's rights and expect you to do the same.
          <br></br>
          <br></br>
          <ol style={{ 'margin-left': 10 }}>
            <li>
              You will not post content or take any action on the Platform that
              infringes or violates someone else's rights or otherwise violates
              the law.
              <br></br>
              <br></br>
            </li>
            <li>
              We can remove any content or information you post on the Platform
              if we believe that it violates this Statement or our policies.
              <br></br>
              <br></br>
            </li>
            <li>
              We provide you with tools to help you protect your intellectual
              property rights. To learn more, visit our How to Report Claims of
              Intellectual Property Infringement page.
              <br></br>
              <br></br>
            </li>
            <li>
              If we remove your content for infringing someone else's copyright,
              and you believe we removed it by mistake, we will provide you with
              an opportunity to appeal.
              <br></br>
              <br></br>
            </li>
            <li>
              If you repeatedly infringe other people's intellectual property
              rights, we will disable your account when appropriate.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not use our copyrights or Trademarks or any confusingly
              similar marks, except as expressly permitted by our Brand Usage
              Guidelines or with our prior written permission.
              <br></br>
              <br></br>
            </li>
            <li>
              If you collect information from users, you will: obtain their
              consent, make it clear that you (and not the Platform) are the one
              collecting their information and post a privacy policy explaining
              what information you collect and how you will use it.
              <br></br>
              <br></br>
            </li>
            <li>
              You will not post anyone's identification documents or sensitive
              financial information on the Platform.
              <br></br>
              <br></br>
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          PRICE AND PAYMENT
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          You must pay in the currency in which the service price is quoted or
          is selected. If you do not hold an account in the relevant currency
          you may pay by debit or credit card (or any other method that the
          Platform may introduce from time to time) and your card company should
          exchange the amount charged to the currency of your country at their
          current rate.
          <br></br>
          <br></br>
          <ol style={{ 'margin-left': 10 }}>
            <li>
              Payment may be made by credit card. debit card or any other such
              method as the Platform may introduce at its absolute discretion.
              <br></br>
              <br></br>
            </li>
            <li>
              The Platform reserves the absolute right to accept or refuse any
              payment made in any form.
              <br></br>
              <br></br>
            </li>
            <li>
              The Platform cannot guarantee that a particular Service will
              always be available.
              <br></br>
              <br></br>
            </li>
            <li>
              To maximise security, the Platform does not hold any credit/debit
              card details. They are held by third party payment providers.
              <br></br>
              <br></br>
            </li>
            <li>
              Your credit card company may also do security checks to confirm it
              is you making the Order. Your statutory rights are unaffected by
              these Terms.
              <br></br>
              <br></br>
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          PERSONAL INFORMATION
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Your submission of personal information through the store is regulated
          by our Privacy Policy. You are to view our Privacy Policy.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          DISCLAIMER OF WARRANTY AND LIMITATION OF LIABILITY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          YOU HEREBY RELEASE US AND AGREE TO HOLD US HARMLESS FROM ANY AND ALL
          CAUSES OF ACTION AND CLAIMS OF ANY NATURE RESULTING FROM THE COUNSELOR
          SERVICES OR THE PLATFORM, INCLUDING (WITHOUT LIMITATION) ANY ACT,
          OMISSION, OPINION, RESPONSE, ADVICE, SUGGESTION, INFORMATION AND/OR
          SERVICE OF ANY COUNSELOR AND/OR ANY OTHER CONTENT OR INFORMATION
          ACCESSIBLE THROUGH THE PLATFORM.
          <br></br>
          <br></br>
          YOU UNDERSTAND, AGREE AND ACKNOWLEDGE THAT THE PLATFORM IS PROVIDED
          "AS IS" WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES OF ANY KIND,
          INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, NON-INFRINGEMENT,
          SECURITY, FITNESS FOR A PARTICULAR PURPOSE OR ACCURACY. THE USE OF THE
          PLATFORM IS AT YOUR OWN RISK. TO THE FULLEST EXTENT OF THE LAW, WE
          EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESSED OR
          IMPLIED.
          <br></br>
          <br></br>
          YOU UNDERSTAND, AGREE AND ACKNOWLEDGE THAT WE SHALL NOT BE LIABLE TO
          YOU OR TO ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL,
          SPECIAL, PUNITIVE OR EXEMPLARY DAMAGES.
          <br></br>
          <br></br>
          YOU UNDERSTAND, AGREE AND ACKNOWLEDGE THAT OUR AGGREGATE LIABILITY FOR
          DAMAGES ARISING WITH RESPECT TO THIS AGREEMENT AND ANY AND ALL USE OF
          THE PLATFORM WILL NOT EXCEED THE TOTAL AMOUNT OF MONEY PAID BY YOU OR
          ON YOUR BEHALF THROUGH THE PLATFORM IN THE 12 MONTHS PERIOD PRIOR TO
          THE DATE OF THE CLAIM.
          <br></br>
          <br></br>
          If the applicable law does not allow the limitation of liability as
          set forth above, the limitation will be deemed modified solely to the
          extent necessary to comply with applicable law.
          <br></br>
          <br></br>
          This section (limitation of liability) shall survive the termination
          or expiration of this Agreement.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          IFRAMES
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Without prior approval and written permission, you may not create
          frames around our Webpages that alter in any way the visual
          presentation or appearance of the Platform.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          INDEMNIFICATION
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          You agree to indemnify, protect and hold harmless to{' '}
          <b>Bridgestars Technologies Sweden AB</b>, subsidiaries, affiliates,
          partners, officers, directors, agents, contractors, license, service
          providers, subcontractors, suppliers, interns and employees, harmless
          from any claim or demand, including reasonable attorney’s fees, made
          by any third party due to or arising out of your breach of these Terms
          and conditions or the documents they incorporate by reference or your
          infringement of any law or the rights of a third-party.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          SEVERABILITY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          In the event that any provision of these Terms and conditions is
          discovered to be unlawful, null or unenforceable, such provision shall
          notwithstanding be enforceable to the fullest extent permitted by
          applicable law, and the unenforceable portion shall be viewed to be
          cut off from these Terms of Use, such determination shall not affect
          the credibility and enforceability of any other remaining provisions.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          ENTIRE AGREEMENT
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Our inability to exercise or enforce any right or provision of these
          Terms of Service shall not constitute a discharge of such right or
          provision.
          <br />
          <br />
          These Terms of Use and any policies or operating rules posted by us on
          this website or in respect to the Service constitutes the entire
          agreement and understanding between you and us and govern your use of
          the Service, pre-empt any prior or synchronous agreements,
          communications and proposals, whether oral or written, between you and
          us.
          <br />
          <br />
          Any ambiguities in the interpretation of these Terms of Use shall not
          be construed against the drafting party.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          CONTACT INFORMATION
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          If you would like to: access, correct, register a complaint, or simply
          want more information please contact us:
          <br />
          <br />
          Email: info@bridgestars.net
        </MKTypography>
      </MKBox>
    </>
  );
}
