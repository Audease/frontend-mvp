'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const router = useRouter();

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'legal-basis', title: 'Legal Basis for Data Collection' },
    { id: 'personal-data-use', title: 'How We Use Your Personal Data' },
    { id: 'rights-protection', title: 'Your Rights and Protection' },
    { id: 'third-parties', title: 'Your Data and Third Parties' },
    { id: 'data-retention', title: 'How Long We Retain Your Data' },
    { id: 'age-limit', title: 'Age Limit for Our Users' },
    { id: 'international-transfer', title: 'International Transfer of Data' },
    { id: 'policy-changes', title: 'Notification of Changes' },
    { id: 'interpretation', title: 'Interpretation' }
  ];
  
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen font-inter">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Image width={132} height={37} src="/audease_logo.png" alt="Audease logo" className="mx-auto mb-4" onClick={() => router.push("./signIn")}/>
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Audease Ltd</p>
          <p className="text-gray-600">9 May 2025</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h2 className="font-bold text-gray-700 mb-4 text-lg">Contents</h2>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm ${
                          activeSection === section.id ? 'bg-dashboardButtons/10 text-dashboardButtons font-medium' : 'text-gray-600'
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
                <a className='w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm' target="_blank" href='/privacy_policy.pdf'>Download</a>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow p-6 md:p-8">
            {/* Introduction Section */}
            <section id="introduction" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. INTRODUCTION</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">1.1 Important information and who we are</h3>
              <p className="mb-4 text-gray-600">
                Welcome to Audease Ltd&apos;s Privacy and Data Protection Policy (&quot;Privacy Policy&quot;).
                At Audease Ltd (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) we are committed to protecting and respecting your
                privacy and Personal Data in compliance with the United Kingdom General Data Protection
                Regulation (GDPR&quot;), the Data Protection Act 2018 and all other mandatory laws and
                regulations of the United Kingdom.
              </p>
              <p className="mb-4 text-gray-600">
                This Privacy Policy explains how we collect, process and keep your data safe. The Privacy
                Policy will tell you about your privacy rights, how the law protects you, and inform our
                employees and staff members of all their obligations and protocols when processing data.
              </p>
              <p className="mb-4 text-gray-600">
                The individuals from which we may gather and use data can include:
                Customers and any other people that the organisation has a relationship with or may need to contact.
              </p>
              <p className="mb-4 text-gray-600">
                This Privacy Policy applies to all our employees and staff members and all Personal Data
                processed at any time by us.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">1.2 Your Data Controller</h3>
              <p className="mb-4 text-gray-600">
                Audease Ltd is your Data Controller and responsible for your Personal Data. We are not
                obliged by the GDPR to appoint a data protection officer and have not voluntarily
                appointed one at this time. Therefore, any inquiries about your data should either be sent
                to us by email to hello@audease.co.uk or by post to 25 Burdetts Road, Dagenham, RM9
                6XZ, United Kingdom.
              </p>
              <p className="mb-4 text-gray-600">
                You have the right to make a complaint at any time to the Information Commissioner&apos;s
                Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk). We
                would, however, appreciate the chance to deal with your concerns before you approach
                the ICO so please contact us in the first instance.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">1.3 Processing data on behalf of a Controller and processors&apos; responsibility to you</h3>
              <p className="mb-4 text-gray-600">
                In discharging our responsibilities as a Data Controller we have employees who will deal
                with your data on our behalf (known as Processors&quot;). The responsibilities below may be
                assigned to an individual or may be taken to apply to the organisation as a whole. The
                Data Controller and our Processors have the following responsibilities:
              </p>
              <ul className="list-disc ml-8 mb-4 text-gray-600 space-y-2">
                <li>Ensure that all processing of Personal Data is governed by one of the legal bases
                laid out in the GDPR (see 2.2 below for more information);</li>
                <li>Ensure that Processors authorised to process Personal Data have committed
                themselves to confidentiality or are under an appropriate statutory obligation of
                confidentiality;</li>
                <li>Implement appropriate technical and organisational measures to ensure a level of
                security appropriate to the risk associated with the processing of Personal Data;</li>
                <li>Obtain the prior specific or general authorisation of the Controller before engaging
                another Processor;</li>
                <li>Assist the Controller in the fulfilment of the Controller&apos;s obligation to respond to
                requests for exercising the data subject&apos;s rights;</li>
                <li>Make available to the Controller all information necessary to demonstrate
                compliance with the obligations laid down in the GDPR and allow for and contribute
                to audits, including inspections, conducted by the Controller or another auditor
                mandated by the Controller;</li>
                <li>Maintain a record of all categories of processing activities carried out on behalf of a
                Controller;</li>
                <li>Cooperate, on request, with the supervisory authority in the performance of its
                tasks;</li>
                <li>Ensure that any person acting under the authority of the Processor who has access
                to Personal Data does not process Personal Data except on instructions from the
                Controller; and</li>
                <li>Notify the Controller without undue delay after becoming aware of a Personal Data
                Breach.</li>
              </ul>
            </section>
            
            {/* Legal Basis Section */}
            <section id="legal-basis" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. LEGAL BASIS FOR DATA COLLECTION</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">2.1 Types of data / Privacy policy scope</h3>
              <p className="mb-4 text-gray-600">
                Personal Data&quot; means any information about an individual from which that person can
                be identified. It does not include data where the identity has been removed (anonymous
                data).
              </p>
              <p className="mb-4 text-gray-600">
                We may collect, use, store and transfer different kinds of Personal Data about you which
                we have grouped together below. Not all of the following types of data will necessarily be
                collected from you but this is the full scope of data that we collect and when we collect it
                from you:
              </p>
              <ul className="list-disc ml-8 mb-4 text-gray-600 space-y-2">
                <li><span className="font-medium">Profile/Identity Data:</span> This is data relating to your first name, last name, gender, date
                of birth.</li>
                <li><span className="font-medium">Contact Data:</span> This is data relating to your phone number, addresses, email
                addresses, phone numbers.</li>
                <li><span className="font-medium">Customer Support Data:</span> This includes feedback and survey responses.</li>
                <li><span className="font-medium">Usage Data:</span> information about how you use our website, products and services.</li>
              </ul>
              <p className="mb-4 text-gray-600">
                We do not collect any Special Categories of Personal Data about you (this includes details
                about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation,
                political opinions, trade union membership, information about your health, and genetic
                and biometric data). Nor do we collect any information about criminal convictions and
                offences.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">2.2 The Legal Basis for Collecting That Data</h3>
              <p className="mb-4 text-gray-600">
                There are a number of justifiable reasons under the GDPR that allow collection and
                processing of Personal Data. The main avenues we rely on are:
              </p>
              <ul className="list-disc ml-8 mb-4 text-gray-600 space-y-2">
                <li><span className="font-medium">Consent&quot;:</span> Certain situations allow us to collect your Personal Data, such as when
                you tick a box that confirms you are happy to receive email newsletters from us, or
                &apos;opt in&apos; to a service.</li>
                <li><span className="font-medium">&quot;Contractual Obligations&quot;:</span> We may require certain information from you in order
                to fulfil our contractual obligations and provide you with the promised service.</li>
                <li><span className="font-medium">Legal Compliance:</span> We&apos;re required by law to collect and process certain types of
                data, such as fraudulent activity or other illegal actions.</li>
                <li><span className="font-medium">Legitimate Interest:</span> We might need to collect certain information from you to be
                able to meet our legitimate interests - this covers aspects that can be reasonably
                expected as part of running our business, that will not have a material impact on
                your rights, freedom or interests. Examples could be your address, so that we know
                where to deliver something to, or your name, so that we have a record of who to
                contact moving forwards.</li>
              </ul>
            </section>
            
            {/* How We Use Your Personal Data Section */}
            <section id="personal-data-use" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. HOW WE USE YOUR PERSONAL DATA</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">3.1 Our data uses</h3>
              <p className="mb-4 text-gray-600">
                We will only use your Personal Data when the law allows us to.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">3.2 Change of purpose</h3>
              <p className="mb-4 text-gray-600">
                We will only use your Personal Data for the purposes for which we collected it, unless we
                reasonably consider that we need to use it for another reason and that reason is
                compatible with the original purpose. If you wish to get an explanation as to how the
                processing for the new purpose is compatible with the original purpose, please contact us.
              </p>
              <p className="mb-4 text-gray-600">
                If we need to use your Personal Data for an unrelated purpose, we will notify you and we
                will explain the legal basis which allows us to do so.
              </p>
              <p className="mb-4 text-gray-600">
                Please note that we may process your Personal Data without your knowledge or consent,
                in compliance with the above rules, where this is required or permitted by law.
              </p>
            </section>
            
            {/* Your Rights Section */}
            <section id="rights-protection" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. YOUR RIGHTS AND HOW YOU ARE PROTECTED BY US</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.1 Your legal rights</h3>
              <p className="mb-4 text-gray-600">
                Under certain circumstances, you have the following rights under data protection laws in
                relation to your personal data:
              </p>
              <ul className="list-disc ml-8 mb-4 text-gray-600 space-y-2">
                <li><span className="font-medium">Right to be informed.</span> You have a right to be informed about our purposes for
                processing your personal data, how long we store it for, and who it will be shared
                with. We have provided this information to you in this policy.</li>
                <li><span className="font-medium">Right of access.</span> This enables you to receive a copy of the personal data we hold
                about you and to check that we are lawfully processing it (also known as a &quot;data subject access request&quot;). See section 4.4 below for more details on how you can
                make a data subject access request.</li>
                <li><span className="font-medium">Right to rectification.</span> You have a right to request correction of the personal data
                that we hold about you. This enables you to have any incomplete or inaccurate data
                we hold about you corrected, though we may need to verify the accuracy of the new
                data you provide to us.</li>
                <li><span className="font-medium">Right to erasure.</span> You have the right to ask us to delete or remove personal data
                where there is no good reason for us continuing to process it, where you have
                successfully exercised your right to object to processing (see below), where we may
                have processed your information unlawfully or where we are required to erase your
                personal data to comply with local law. Note, however, that we may not always be
                able to comply with your request of erasure for specific legal reasons which will be
                notified to you, if applicable, at the time of your request.</li>
                <li><span className="font-medium">Right to object.</span> You can object to the processing of personal data we hold about
                you. This effectively allows you to stop or prevent us from processing your personal
                data. Note that this is not an absolute right and it only applies in certain
                circumstances, for example:
                  <ul className="list-roman ml-6 mt-2 space-y-2">
                    <li>Where we are processing your personal data for direct marketing purposes.</li>
                    <li>Where we are relying on a legitimate interest (or those of a third party) and
                    there is something about your particular situation which makes you want to
                    object to processing on this ground as you feel it impacts on your
                    fundamental rights and freedoms.</li>
                    <li>In some cases, we may continue processing your data if we can demonstrate
                    that we have compelling legitimate grounds to process your information
                    which override your rights and freedoms.</li>
                  </ul>
                </li>
                <li><span className="font-medium">Right to restrict processing.</span> You have the right to request the restriction or
                suppression of their personal data. Note that this is not an absolute right and it only
                applies in certain circumstances:
                  <ul className="list-roman ml-6 mt-2 space-y-2">
                    <li>If you want us to establish the data&apos;s accuracy.</li>
                    <li>Where our use of the data is unlawful but you do not want us to erase it.</li>
                    <li>Where you need us to hold the data even if we no longer require it as you
                    need it to establish, exercise or defend legal claims.</li>
                    <li>You have objected to our use of your data but we need to verify whether we
                    have overriding legitimate grounds to use it.</li>
                  </ul>
                </li>
                <li><span className="font-medium">Right to data portability.</span> You have the right to request the transfer of your
                personal data to you or to a third party. If you make such a request, we will provide
                to you, or a third party you have chosen, your personal data in a structured,
                commonly used, machine-readable format. Note that this right only applies to
                automated information which you initially provided consent for us to use or where
                we used the information to perform a contract with you.</li>
              </ul>
              <p className="mb-4 text-gray-600">
                If you wish to make a request under any of these rights, please contact us at
                hello@audease.co.uk.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.2 Your control over Audease Ltd&apos;s use of your Personal Data</h3>
              <p className="mb-4 text-gray-600">
                You may delete your account at any time – this will remove your account page from our
                systems and our related software.
              </p>
              <p className="mb-4 text-gray-600">
                We guarantee this will delete all stored data.
              </p>
              <p className="mb-4 text-gray-600">
                You can access information associated with your account by logging into your account you
                created with us.
              </p>
              <p className="mb-4 text-gray-600">
                Your account information will be protected by a password for your privacy and security.
                You need to prevent unauthorized access to your account and personal information by
                selecting and protecting your password appropriately and limiting access to your
                computer or device and by signing off after you have finished accessing your account.
              </p>
              <p className="mb-4 text-gray-600">
                California Privacy Rights: Under California Civil Code sections 1798.83-1798.84, California
                residents are entitled to ask us for a notice identifying the categories of personal customer
                information which we share with our affiliates and/or third parties for marketing purposes,
                and providing contact information for such affiliates and/or third parties. If you are a
                California resident and would like a copy of this notice, please submit a written request to
                hello@audease.co.uk.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.3 How Audease Ltd protects customers&apos; Personal Data</h3>
              <p className="mb-4 text-gray-600">
                We are concerned with keeping your data secure and protecting it from inappropriate
                disclosure. We implement a variety of security measures to ensure the security of your
                Personal Data on our systems, including We implement certain security measures to
                ensure the security of your Personal Data on our systems, including adopting secure
                protocols such as HTTPS and TLS, encrypting our databases at rest and in transit,
                restricting access to Personal Data through role-based permissions, and regularly auditing
                our systems for vulnerabilities. Additionally, we use industry-standard cybersecurity tools
                for threat detection and prevention, and ensure all staff undergo regular data protection
                training.
              </p>
              <p className="mb-4 text-gray-600">
                Any Personal Data collected by us is only accessible by a limited number of employees who have special access rights to such systems and are bound by obligations
                of confidentiality. If and when we use subcontractors to store your data, we will not
                relinquish control of your Personal Data or expose it to security risks that would not have
                arisen had the data remained in our possession. However, unfortunately no transmission
                of data over the internet is guaranteed to be completely secure. It may be possible for
                third parties not under the control of Audease Ltd to intercept or access transmissions or
                private communications unlawfully. While we strive to protect your Personal Data, we
                cannot ensure or warrant the security of any Personal Data you transmit to us. Any such
                transmission is done at your own risk. If you believe that your interaction with us is no
                longer secure, please contact us.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.4 How to request your data and the process for obtaining it</h3>
              <p className="mb-4 text-gray-600">
                You will not have to pay a fee to access your Personal Data (or to exercise any of the other
                rights). However, if your request is clearly unfounded, we could refuse to comply with your
                request.
              </p>
              <p className="mb-4 text-gray-600">
                We may need to request specific information from you to help us confirm your identity
                and ensure you have the right to access your Personal Data (or to exercise any of your
                other rights). This is a security measure to ensure that Personal Data is not disclosed to
                any person who has no right to receive it. We may also contact you to ask you for further
                information in relation to your request to speed up our response.
              </p>
            </section>
            
            {/* Third Parties Section */}
            <section id="third-parties" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. YOUR DATA AND THIRD PARTIES</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">5.1 Sharing your data with third parties</h3>
              <p className="mb-4 text-gray-600">
                We may also share Personal Data with interested parties in the event that Audease Ltd
                anticipates a change in control or the acquisition of all or part of our business or assets or
                with interested parties in connection with the licensing of our technology.
              </p>
              <p className="mb-4 text-gray-600">
                If Audease Ltd is sold or makes a sale or transfer, we may, in our sole discretion, transfer,
                sell or assign your Personal Data to a third party as part of or in connection with that
                transaction. Upon such transfer, the Privacy Policy of the acquiring entity may govern the
                further use of your Personal Data. In all other situations your data will still remain
                protected in accordance with this Privacy Policy (as amended from time to time).
              </p>
              <p className="mb-4 text-gray-600">
                We may share your Personal Data at any time if required for legal reasons or in order to
                enforce our terms or this Privacy Policy.
              </p>
            </section>
            
            {/* Data Retention Section */}
            <section id="data-retention" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. HOW LONG WE RETAIN YOUR DATA</h2>
              <p className="mb-4 text-gray-600">
                We will only retain your Personal Data for as long as reasonably necessary to fulfil the purposes
                we collected it for. We may retain your Personal Data for a longer period than usual in the event
                of a complaint or if we reasonably believe there is a prospect of litigation in respect to our
                relationship with you.
              </p>
            </section>
            
            {/* Age Limit Section */}
            <section id="age-limit" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. AGE LIMIT FOR OUR USERS</h2>
              <p className="mb-4 text-gray-600">
                You must not use Audease Ltd unless you are aged 16 or older. If you are under 16 and you
                access Audease Ltd by lying about your age, you must immediately stop using Audease Ltd.
              </p>
              <p className="mb-4 text-gray-600">
                This website is not intended for children and we do not knowingly collect data relating to children.
              </p>
            </section>
            
            {/* International Transfer Section */}
            <section id="international-transfer" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. INTERNATIONAL TRANSFER OF DATA</h2>
              <p className="mb-4 text-gray-600">
                Your information may be stored and processed in the US or other countries or jurisdictions
                outside the US where Audease Ltd has facilities. By using Audease Ltd, you are permitting and
                consenting to the transfer of information, including Personal Data, outside of the US.
              </p>
            </section>
            
            {/* Policy Changes Section */}
            <section id="policy-changes" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. NOTIFICATION OF CHANGES AND ACCEPTANCE OF POLICY</h2>
              <p className="mb-4 text-gray-600">
                We keep our Privacy Policy under review and will place any updates here. This version is dated 9
                May 2025.
              </p>
              <p className="mb-4 text-gray-600">
                By using Audease Ltd, you consent to the collection and use of data by us as set out in this
                Privacy Policy. Continued access or use of Audease Ltd will constitute your express acceptance of
                any modifications to this Privacy Policy.
              </p>
            </section>
            
            {/* Interpretation Section */}
            <section id="interpretation" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. INTERPRETATION</h2>
              <p className="mb-4 text-gray-600">
                All uses of the word &quot;including&quot; mean &quot;including but not limited to&quot; and the enumerated
                examples are not intended to in any way limit the term which they serve to illustrate. Any email
                addresses set out in this policy may be used solely for the purpose for which they are stated to
                be provided, and any unrelated correspondence will be ignored. Unless otherwise required by
                law, we reserve the right to not respond to emails, even if they relate to a legitimate subject
                matter for which we have provided an email address. You are more likely to get a reply if your
                request or question is polite, reasonable and there is no relatively obvious other way to deal with
                or answer your concern or question (e.g. FAQs, other areas of our website, etc.).
              </p>
              <p className="mb-4 text-gray-600">
                Our staff are not authorised to contract on behalf of Audease Ltd, waive rights or make
                representations (whether contractual or otherwise). If anything contained in an email from a
                Audease Ltd address contradicts anything in this policy, our terms or any official public
                announcement on our website, or is inconsistent with or amounts to a waiver of any Audease Ltd
                rights, the email content will be read down to grant precedence to the latter. The only exception
                to this is genuine correspondence expressed to be from the Audease Ltd legal department.
              </p>
            </section>
            
            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-500">
                    Audease Ltd | Company Number 15502591
                  </p>
                  <p className="text-sm text-gray-500">
                    25 Burdetts Road, Dagenham, RM9 6XZ, United Kingdom
                  </p>
                </div>
                <div>
                  <a href="mailto:hello@audease.co.uk" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    hello@audease.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;