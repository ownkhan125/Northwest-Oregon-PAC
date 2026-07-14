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
      'We also collect basic device and analytics information when you visit our website, such as IP address, browser type, and pages viewed, to help us improve the site.',
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
      'We share information with service providers (such as email and donation processors) only as needed to operate the PAC, and with government agencies where required by law — including the Oregon Secretary of State for state reporting requirements.',
    ],
  },
  {
    heading: 'SMS / text messaging privacy',
    body: [
      'If you opt in to text messages, we collect your phone number and message preferences. Phone numbers are used only for communications you have consented to receive.',
      'Reply STOP at any time to unsubscribe. Reply HELP for help. Message and data rates may apply. Message frequency varies.',
      'We do not share phone numbers with third parties for marketing purposes.',
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
      `Questions about this policy? Email ${pac.contact.generalEmail}, call ${pac.contact.phone}, or write to Northwest Oregon PAC, ${pac.contact.mailingAddress}. Filing #${pac.filingNumber}, EIN ${pac.ein}, regulated by the ${pac.regulator}.`,
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
