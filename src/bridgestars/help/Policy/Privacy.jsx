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
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';

export default function Privacy() {
  return (
    <>
      <MKBox
        variant='gradient'
        bgColor='dark'
        borderRadius='lg'
        coloredShadow='dark'
        p={3}
        mt={1}
        mx={2}
      >
        <MKTypography variant='h3' color='white'>
          Privacy Policy
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
          This is the privacy policy governing the use of{' '}
          <a href='https://bridgestars.net'>https://bridgestars.net</a> and the
          Bridgestars application (collectively referred to as the Platform) and
          the agreement that operates between us and you (the Policy). The
          Platform is owned and operated by{' '}
          <b>Bridgestars Technologies Sweden AB</b> (us/our/we) and these
          Policies set out the rights and obligations of all users (you/your) in
          relation to your use of the Platform. .
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          Privacy
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you use the Platform.
          <br></br>
          <br></br>
          Protecting your private information is our priority. This Statement of
          Privacy applies to the Platform and governs data collection and usage.
          We have developed this policy in order for you to understand how we
          collect, use, communicate and make use of personal information. The
          following outlines our privacy policy.
          <br></br>
          <br></br>
          Similar to other commercial websites, bridgestars.net utilizes a
          standard technology called ‘cookies’ (see our cookies policy section
          for more information) and server logs to collect information about how
          bridgestars.net is used. Information gathered through cookies and
          server logs may include the date and time of visits, the pages viewed,
          time spent at bridgestars.net, and the websites visited just before
          and just after our own, as well as your IP address.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          Content
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          This Policy sets out the conditions under which we may process any
          information that we collect from you, or that you provide to us. It
          covers information that could identify you (“personal information”)
          and information that could not. In the context of the law and this
          notice, “process” means collect, store, transfer, use or otherwise act
          on information.
          <br />
          <br />
          <ol style={{ 'margin-left': 15 }}>
            <li>
              We take seriously the protection of your privacy and
              confidentiality. We understand that all visitors to the Platform
              are entitled to know that their personal data will not be used for
              any purpose unintended by them, and will not accidentally fall
              into the hands of a third party.
              <br />
              <br />
            </li>
            <li>
              {' '}
              <b>Bridgestars Technologies Sweden AB</b> undertakes to preserve
              the confidentiality of all information you provide to us, and hope
              that you reciprocate.
              <br />
              <br />
            </li>
            <li>
              The law requires us to tell you about your rights and our
              obligations to you in regards to the processing and control of
              your personal data.
              <br />
              <br />
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          LOG FILES
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          {' '}
          <b>Bridgestars Technologies Sweden AB</b> follows a standard procedure
          of using log files. These files log visitors when they visit the
          Platform. We do this as a part of our hosting services' analytics. The
          information collected from log files includes internet protocol (IP)
          addresses, browser type, Internet Service Provider (ISP), date and
          time stamp, referring/exit pages, and possibly the number of clicks.
          These are not linked to any information that is personally
          identifiable. The purpose of the information is for analyzing trends,
          administering the Platform, tracking users' movement on the Platform,
          and gathering demographic information.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          COLLECTION OF YOUR PERSONAL INFORMATION
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          {' '}
          <b>Bridgestars Technologies Sweden AB</b> may collect personally
          identifiable information such as your: Name, and E-mail Address when
          you register by creating an account.
          <br />
          <br /> <b>Bridgestars Technologies Sweden AB</b> encourages you to
          review the privacy statements of websites you choose to link to from
          the Platform so that you can understand how the Platform collect, use
          and share your information. We are not responsible for the privacy
          statements or other content on websites outside of the Platform.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          THE INFORMATION WE COLLECT AND WHY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          We may collect information about you directly from you, as well as
          automatically through your use of the Platform or Services.
          <br></br>
          <br></br>
          <ul style={{ 'margin-left': 15 }}>
            <li>
              <b>Information We Collect Directly from You:</b> Certain areas and
              features of the Platform and Services require your Name, email
              address, and IP address.
              <br></br>
              <br></br>
            </li>
            <li>
              <b>Information We Collect Automatically:</b> We may automatically
              collect the following information about your use of the Platform
              via some software analytics including the length of time you visit
              the Platform and your movement on the Platform.
              <br></br>
              <br></br>
            </li>
            <li>
              <b>We may also collect the following information:</b> device ID;
              location and language information.
              <br></br>
              <br></br>
            </li>
          </ul>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          WE DO NOT SELL, RENT OR LEASE ITS CUSTOMER LISTS TO THIRD PARTIES.
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          {' '}
          <b>Bridgestars Technologies Sweden AB</b> may share data with trusted
          partners to help perform statistical analysis, send you email or
          postal mail, provide customer support, or arrange for deliveries. All
          such third parties are prohibited from using your personal information
          except to provide these services to Bridgestars Technologies Sweden
          AB, and they are required to maintain the confidentiality of your
          information.
          <br></br>
          <br></br> <b>Bridgestars Technologies Sweden AB</b> will disclose your
          personal information, without notice, only if required to do so by law
          or in the good faith belief that such action is necessary to: (a)
          Conform to the edicts of the law or comply with legal process served
          on <b>Bridgestars Technologies Sweden AB</b> or the Platform; (b)
          protect and defend the rights or property of{' '}
          <b>Bridgestars Technologies Sweden AB</b>; And, (c) act under exigent
          circumstances to protect the personal safety of users of the Platform,
          or the public.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          OUR ADVERTISING PARTNERS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Some of the advertisers on the Platform may use cookies and web
          beacons. Our advertising partners are listed below. Each of our
          advertising partners has their own Privacy Policy for their policies
          on user data.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          INFORMATION WE PROCESS BECAUSE WE HAVE A CONTRACTUAL OBLIGATION WITH
          YOU
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          When you use the Platform, you agree to our terms and conditions and a
          contract is formed between you and us.
          <br></br>
          <br></br>
          In order to carry out our obligations under that contract we must
          process the information you give us. Some of this information may be
          personal information.
          <br></br>
          <br></br>
          <b>We may use it in order to:</b>
          <br></br>
          <br></br>
          <ol style={{ 'margin-left': 15 }}>
            <li>
              Verify your identity for security purposes
              <br></br>
              <br></br>
            </li>
            <li>
              Provide you with our services
              <br></br>
              <br></br>
            </li>
            <li>
              Provide you with suggestions and advice on services and how to
              obtain the most from using the Platform.
              <br></br>
              <br></br>
            </li>
          </ol>
          <b>Bridgestars Technologies Sweden AB</b> may aggregate this
          information in a general way and use it to provide class information,
          for example to monitor our performance with respect to a particular
          service we provide. If we use it for this purpose, you as an
          individual will not be personally identifiable.{' '}
          <b>Bridgestars Technologies Sweden AB</b> shall continue to process
          this information until the contract between us ends or is terminated
          by either party under the terms of the contract.
          <br></br>
          <br></br>
          Except where you have consented to our use of your information for a
          specific purpose, we do not use your information in any way that would
          identify you personally. <b>Bridgestars Technologies Sweden AB</b> may
          aggregate it in a general way and use it to provide class information,
          for example to monitor the performance of a particular page on the
          Platform.
          <br></br>
          <br></br>
          You may withdraw your consent at any time by instructing us (
          <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>)
          However, if you do so, you may not be able to use the Platform or our
          services further
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          RETENTION PERIOD FOR PERSONAL DATA
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Except as otherwise mentioned in this privacy notice,{' '}
          <b>Bridgestars Technologies Sweden AB</b> keeps your personal
          information only for as long as required by us:
          <br></br>
          <br></br>
          <ol style={{ 'margin-left': 15 }}>
            <li>
              To provide you with the services you have requested;
              <br></br>
              <br></br>
            </li>
            <li>
              To comply with other law, including for the period demanded by our
              tax authorities;
              <br></br>
              <br></br>
            </li>
            <li>
              To support a claim or defense in court.
              <br></br>
              <br></br>
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          COOKIES AND WEB BEACONS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Like any other website, our website -{' '}
          <a href='https://bridgestars.net'>https://bridgestars.net</a> uses
          'cookies'. These cookies are used to store information including
          visitors' preferences, and the pages on the website that the visitor
          accessed or visited. The information is used to optimize the users'
          experience by customizing our web page content based on visitors'
          browser type and/or other information.
          <br></br>
          <br></br>
          For more general information on cookies, please read "What Are
          Cookies" from Cookie Consent.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          THIRD PARTY PRIVACY POLICIES
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          {' '}
          <b>Bridgestars Technologies Sweden AB</b> Privacy Policy does not
          apply to other advertisers or websites. Thus, we are advising you to
          consult the respective Privacy Policies of these third-party ad
          servers for more detailed information. It may include their practices
          and instructions about how to opt-out of certain options.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          CHILDREN'S INFORMATION
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
          <br></br>
          <br></br> <b>Bridgestars Technologies Sweden AB</b> does not knowingly
          collect any Personal Identifiable Information from children under the
          age of 13. If you think that your child provided this kind of
          information on the Platform, we strongly encourage you to contact us
          immediately and we will do our best efforts to promptly remove such
          information from our records.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          GENERAL DATA PROTECTION REGULATION (GDPR)
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          We are a Data Controller of your information.
          <br></br>
          <br></br> <b>Bridgestars Technologies Sweden AB</b> legal basis for
          collecting and using the personal information described in this
          Privacy Policy depends on the Personal Information we collect and the
          specific context in which we collect the information:
          <ul style={{ 'margin-left': 15 }}>
            <li>
              {' '}
              <b>Bridgestars Technologies Sweden AB</b> needs to perform a
              contract with you
              <br></br>
              <br></br>
            </li>
            <li>
              You have given <b>Bridgestars Technologies Sweden AB</b>{' '}
              permission to do so
              <br></br>
              <br></br>
            </li>
            <li>
              Processing your personal information is in Bridgestars
              Technologies Sweden AB legitimate interests
              <br></br>
              <br></br>
            </li>
            <li>
              {' '}
              <b>Bridgestars Technologies Sweden AB</b> needs to comply with the
              law
              <br></br>
              <br></br>
            </li>
          </ul>{' '}
          <b>Bridgestars Technologies Sweden AB</b> will retain your personal
          information only for as long as is necessary for the purposes set out
          in this Privacy Policy. We will retain and use your information to the
          extent necessary to comply with our legal obligations, resolve
          disputes, and enforce our policies.
          <br></br>
          <br></br>
          If you are a resident of the European Economic Area (EEA), you have
          certain data protection rights. If you wish to be informed what
          Personal Information, we hold about you and if you want it to be
          removed from our systems, please contact us.
          <br></br>
          <br></br>
          You are entitled to the following rights under applicable laws:
          <ol style={{ 'margin-left': 15 }}>
            <li>
              <b>The right to access:</b> you may at any time request to access
              your personal data. Upon request, we will provide a copy of your
              personal data in a commonly used electronic form.
              <br></br>
              <br></br>
            </li>
            <li>
              <b>The right to rectification:</b> you are entitled to obtain
              rectification of inaccurate personal data and to have incomplete
              personal data completed.
              <br></br>
              <br></br>
            </li>
            <li>
              <b>The right to erase:</b> under certain circumstances (including
              processing on the basis of your consent), you may request us to
              delete your User Data. Please note that this right is not
              unconditional. Therefore, an attempt to invoke the right might not
              lead to an action from us.
              <br></br>
              <br></br>
            </li>
            <li>
              <b>The right to object:</b> to certain processing activities
              conducted by us in relation to your personal data, such as our
              processing of your personal data based on our legitimate interest.
              The right to object also applies to the processing of your
              personal data for direct marketing purposes.
              <br></br>
              <br></br>
            </li>
            <li>
              <b>The right to data portability:</b> you are entitled to receive
              your personal data (or have your personal data directly
              transmitted to another data controller) in a structured, commonly
              used and machine-readable format.
              <br></br>
              <br></br>
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          OPT-IN, OPT-OUT & UNSUBSCRIBE
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          When any user provides their details such as Name, Email, Phone
          number, accept T&C, Cookies as well as Privacy Policy, they have to
          OPTED-IN.<br></br>
          <br></br>
          We provide users the opportunity to opt-out of receiving
          communications from us by reading the unsubscribe instructions located
          at the bottom of any e-mail they receive from us at any time or email
          us.
          <br></br>
          <br></br>
          We respect your privacy and give you an opportunity to opt-out of
          receiving announcements of certain information. Users may opt-out of
          receiving any or all communications from Bridgestars Technologies
          Sweden AB by contacting us here:
          <br></br>
          <br></br>
          Web page:{' '}
          <a href='https://bridgestars.net'>https://bridgestars.net</a>
          <br></br>
          <br></br>
          Email: <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          INTELLECTUAL PROPERTY RIGHTS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          All copyrights, trademarks, patents and other intellectual property
          rights in and on the Platform and all content and software located on
          the Platform shall remain the sole property of Bridgestars
          Technologies Sweden AB or its licensors. The use of our trademarks,
          content and intellectual property is forbidden without the express
          written consent from us.
          <br></br>
          <br></br>
          <ul style={{ 'margin-left': 15 }}>
            <li>
              Republish material from the Platform without prior written
              consent.
              <br></br>
              <br></br>
            </li>
            <li>
              Sell or rent material from the Platform.
              <br></br>
              <br></br>
            </li>
            <li>
              Reproduce, duplicate, create derivative, copy or otherwise exploit
              material on the Platform for any purpose.
              <br></br>
              <br></br>
            </li>
            <li>
              Redistribute any content from the Platform, including onto another
              website.
              <br></br>
              <br></br>
            </li>
          </ul>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          ACCEPTABLE USE
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          You agree to use the Platform only for lawful purposes and in a way
          that does not infringe the rights of, restrict or inhibit anyone
          else’s use and enjoyment of the Platform. Prohibited behavior includes
          harassing or causing distress or inconvenience to any other user
          within the Platform. You must not use the Platform to send unsolicited
          commercial communications. You must not use the content on the
          Platform for any marketing related purpose without our express written
          consent.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          THIRD PARTY ANALYTICS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          We use automated devices and applications, to evaluate usage of the
          Platform and, to the extent permitted, our Services. We also may use
          other analytic means to evaluate our Services. We use these tools to
          help us improve our Services, performance and user experiences. These
          entities may use tracking Technologies to perform their services.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          VERIFICATION OF YOUR INFORMATION
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          When we receive any request to access, edit or delete personal
          identifiable information, we shall first take reasonable steps to
          verify your identity before granting you access or otherwise taking
          any action. This is important to safeguard your information.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          ENCRYPTION OF DATA SENT BETWEEN US
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          The Platform use Secure Sockets Layer (SSL) certificates to verify our
          identity to your browser and to encrypt any data you give us. Whenever
          information is transferred between us, you can check that it is done
          so using SSL by looking for a closed padlock symbol or other trust
          mark in your browser’s URL bar or toolbar.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          HOW YOU CAN COMPLAIN
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          If you are not happy with our privacy policy or if you have any
          complaints, then you should tell us by email. Our e-mail address is{' '}
          <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          REVIEW/MODIFICATION OF THIS PRIVACY POLICY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          {' '}
          <b>Bridgestars Technologies Sweden AB</b> may update this privacy
          notice from time to time as necessary. The terms that apply to you are
          those posted here on the Platform on the day you use the Platform. We
          solely advise you to print a copy for your records.
          <br></br>
          <br></br>
          If you have any question regarding our privacy policy, please contact
          us through:
          <br></br>
          <br></br>
          E-mail:{' '}
          <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          COOKIES POLICY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          https://bridgestars.net (the "Website") uses cookies. They are placed
          by the software that operates on our servers, and by software operated
          by third parties whose services we use. When you first visit the
          Website, we ask you whether you wish us to use cookies. If you choose
          not to accept them, we shall not use them for your visit except to
          record that you have not consented to their use for any other purpose.
          <br></br>
          <br></br>
          If you choose not to use cookies or you prevent their use through your
          browser settings, you will not be able to use all the functionality of
          the Website.
          <br></br>
          <br></br>
          <b>We use cookies in the following ways:</b>
          <br></br>
          <br></br>
          <ul style={{ 'margin-left': 15 }}>
            <li>
              To track how you use the Website
              <br></br>
              <br></br>
            </li>
            <li>
              To record whether you have seen specific messages we display on
              the Website
              <br></br>
              <br></br>
            </li>
            <li>
              To keep you signed in the Website
              <br></br>
              <br></br>
            </li>
            <li>
              To record your answers to surveys and questionnaires on the
              Website while you complete them
              <br></br>
              <br></br>
            </li>
            <li>
              To record the conversation thread during a live chat with our
              support team
              <br></br>
              <br></br>
            </li>
          </ul>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          WHY WE USE COOKIES ON OUR WEBSITE
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Cookies are pieces of information that a website transfers to an
          individual’s computer hard drive for record keeping purposes. Cookies
          make using the Website easier by, among other things, saving your
          passwords and preferences for you. These cookies are restricted for
          use only on the Website, and do not transfer any personal information
          to any other party.
          <br></br>
          <br></br>
          Most browsers are initially set up to accept cookies. You can,
          however, reset your browser to refuse all cookies or indicate when a
          cookie is being sent. Please consult the technical information
          relevant to your browser for instructions. If you choose to disable
          your cookies setting or refuse to accept a cookie, some parts of the
          Website may not function properly or may be considerably slower.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          PERSONAL IDENTIFIERS FROM YOUR BROWSING ACTIVITY
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Information about your computer hardware and software may be
          automatically collected by <b>Bridgestars Technologies Sweden AB</b>.
          This information can include: your IP address, browser type, domain
          names, access times and referring website addresses. This information
          is used for the operation of the service, to maintain quality of the
          service, and to provide general statistics regarding use of{' '}
          <a href='https://bridgestars.net'>https://bridgestars.net</a> (the
          Website).
          <br></br>
          <br></br>
          Requests by your web browser to our servers for web pages and other
          content on the Website are recorded.
          <br></br>
          <br></br>
          The Platform records information such as your geographical location,
          your internet service provider and your IP address. We also record
          information about the software you are using to browse the Website,
          such as the type of computer or device and the screen resolution.
          <br></br>
          <br></br> <b>Bridgestars Technologies Sweden AB</b> uses this
          information in aggregate to assess the popularity of the webpages on
          the Website and how we perform in providing content to you.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          USE OF RE-MARKETING
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Re-marketing involves placing a cookie on your computer when you
          browse the Platform in order to be able to serve to you an advert for
          our services when you visit some external website.
          <br></br>
          <br></br> <b>Bridgestars Technologies Sweden AB</b> may use a third
          party to provide us with re-marketing services from time to time. If
          so, then if you have consented to our use of cookies, you may see
          advertisements for our services on other websites.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          CONTACT INFORMATION
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          If you would like to: access, correct, register a complaint, or simply
          want more information please contact us directly via:
          <br></br>
          <br></br>
          Contact:{' '}
          <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>
        </MKTypography>
      </MKBox>
    </>
  );
}
