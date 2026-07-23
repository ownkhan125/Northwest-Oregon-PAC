import LegalPage from '@/components/ui/legal-page'
import { pac } from '@/data/pac'

export const metadata = {
  title: 'Privacy Policy | Northwest Oregon PAC',
  description: 'How Northwest Oregon PAC collects, uses, and protects your personal information.',
}

const sections = [
  {
    heading: 'Information we collect',
    body: [
      'We collect information you voluntarily provide when you sign up to volunteer, donate, or contact the PAC — including your name, email, phone number, mailing address, and (where required by law) employer name, occupation, and employer city and state.',
      'We also collect basic device and analytics information when you visit our website, such as your IP address, browser type, pages viewed, device identifiers, and information collected through cookies and similar tracking technologies. These technologies help us understand how visitors use our website, improve user experience, measure the effectiveness of our communications, and support outreach efforts.',
      'We use cookies, pixels, and similar tracking technologies to improve website functionality, analyze traffic, and measure the effectiveness of our communications and outreach efforts.',
      'These technologies may include:',
      {
        list: [
          'Cookies stored by your web browser',
          'Meta Pixel (Facebook Pixel)',
          'Analytics tools (such as Google Analytics, if applicable)',
        ],
      },
      'These tools help us understand how visitors interact with our website, measure campaign performance, and improve our content and services.',
      'You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of portions of our website.',
    ],
  },
  {
    heading: 'How we use your information',
    body: [
      'We use your information to communicate with you about the PAC, process donations and volunteer signups, comply with applicable Oregon election law, and improve our outreach and website.',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    heading: 'How we share your information',
    body: [
      'We share information with trusted service providers (such as email service providers, donation processors, website analytics providers, and advertising platforms like Meta) only as necessary to operate and improve our website, communicate with supporters, measure campaign effectiveness, and comply with applicable law.',
      'We do not sell your personal information.',
    ],
  },
  {
    heading: 'SMS / text messaging privacy',
    body: [
      'What phone numbers are collected for. If you expressly opt in to receive text messages from Northwest Oregon PAC, we collect the phone number you provide together with a record of the specific SMS consent(s) you gave, including the date and time of your opt-in and the page or form where consent was provided. SMS messages are sent only after you have provided your express consent.',
      'Types of messages sent. Depending on the consent(s) you gave, messages may include campaign updates, event reminders, volunteer coordination, fundraising requests, donation drives, and special promotions from Northwest Oregon PAC.',
      'Consent to receive informational SMS messages does not automatically include consent to receive promotional or fundraising messages. These are managed separately based on the specific consent(s) you provide.',
      'Data retention. We retain your phone number and consent records for as long as you remain opted in and for a reasonable period after you opt out, typically no longer than four (4) years, to demonstrate compliance with TCPA and carrier requirements, and to honor your opt-out preference across future sign-ups. After the retention period we delete or de-identify the records.',
      `Requesting deletion. You can request deletion of your phone number and SMS consent records at any time by emailing ${pac.contact.generalEmail} or writing to Northwest Oregon PAC at ${pac.contact.mailingAddress}. To simply stop receiving messages without a full deletion, reply STOP to any message we send you.`,
      'We will not share or sell your text messaging opt-in data, consent, or related personal information with any third parties, unless required by law.',
      'Reply STOP at any time to unsubscribe. Reply HELP for help. Message and data rates may apply. Message frequency varies.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `You have the right to access, correct, or delete personal information we hold about you, and to opt out of certain processing, as provided by applicable law. To exercise these rights, contact us at ${pac.contact.generalEmail}.`,
    ],
  },
  {
    heading: 'Data security',
    body: [
      'We implement reasonable administrative, technical, and physical safeguards to protect personal information. No system is perfectly secure, but we work hard to keep your information safe.',
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      'Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. We will post the updated version on this page with a new "Last updated" date.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      `Questions about this policy? Email ${pac.contact.generalEmail}, call ${pac.contact.phone}, or write to Northwest Oregon PAC, ${pac.contact.mailingAddress}. Filing #${pac.filingNumber}, regulated by the ${pac.regulator}.`,
    ],
  },
]

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      number="07"
      title="Privacy Policy"
      lastUpdated="July 2026"
      intro={
        'Northwest Oregon PAC (the "PAC," "we," or "us") is committed to protecting the privacy of our visitors, supporters, and contributors. This Privacy Policy explains how we collect, use, and safeguard your personal information.'
      }
      sections={sections}
    />
  )
}
