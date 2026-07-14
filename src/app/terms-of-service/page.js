import LegalPage from '@/components/ui/legal-page'
import { pac } from '@/data/pac'

export const metadata = {
  title: 'Terms of Service | Northwest Oregon PAC',
  description: 'The legal terms that govern your use of our website and services.',
}

const sections = [
  {
    heading: 'Services and communications',
    body: [
      'Northwest Oregon PAC provides information, updates, and engagement opportunities related to the work of a political action committee — including PAC updates, event invitations, volunteer coordination, and donation processing.',
    ],
  },
  {
    heading: 'Participation and contributions',
    body: [
      'By contributing to the PAC, you affirm that the contribution is made from your own funds and that you are not a foreign national. Oregon and federal law require us to collect the name, mailing address, employer name, employer city, and employer state of individual contributors.',
    ],
  },
  {
    heading: 'No candidate committee affiliation',
    body: [
      `${pac.disclaimers.notAuthorized} Northwest Oregon PAC operates independently.`,
    ],
  },
  {
    heading: 'AI-generated content notice',
    body: [
      'Some images, audio, video, or written content on this site may be created or enhanced using artificial intelligence (AI) tools.',
    ],
  },
  {
    heading: 'No guarantee of outcomes',
    body: [
      'The PAC makes no guarantee or warranty regarding election outcomes, legislative results, or the success of any particular policy effort.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'All content on this website — including text, images, logos, and graphics — is the property of Northwest Oregon PAC or its licensors and is protected by applicable intellectual-property laws. You may not reproduce or distribute this content without permission.',
    ],
  },
  {
    heading: 'SMS messaging',
    body: [
      'By opting in, you consent to receive text messages from Northwest Oregon PAC. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe. Reply HELP for help.',
    ],
  },
  {
    heading: 'Modification of terms',
    body: [
      'We may revise these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These Terms are governed by the laws of the State of Oregon, without regard to its conflict-of-laws principles.',
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'To the maximum extent permitted by law, Northwest Oregon PAC will not be liable for any indirect, incidental, special, or consequential damages arising out of or relating to your use of the website.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      `Questions about these Terms? Email ${pac.contact.generalEmail}, call ${pac.contact.phone}, or write to Northwest Oregon PAC, ${pac.contact.mailingAddress}. Filing #${pac.filingNumber}, EIN ${pac.ein}, regulated by the ${pac.regulator}.`,
    ],
  },
]

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      number="08"
      title="Terms of Service"
      lastUpdated="July 2026"
      intro={`These Terms of Service govern your use of the Northwest Oregon PAC website and services. By using our website or engaging with the PAC, you agree to these Terms. ${pac.disclaimers.paidFor}`}
      sections={sections}
    />
  )
}
