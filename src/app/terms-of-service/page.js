import LegalPage from '@/components/ui/legal-page'

export const metadata = {
  title: 'Terms of Service | Morgan Hale for Congress',
  description: 'The legal terms that govern your use of our website and services.',
}

const sections = [
  {
    heading: 'Services and communications',
    body: [
      'The Committee provides information, updates, and engagement opportunities related to a congressional campaign, including campaign updates, event invitations, volunteer coordination, and donation processing.',
    ],
  },
  {
    heading: 'Participation and contributions',
    body: [
      'By contributing to the campaign, you affirm that the contribution is made from your own funds, that you are a U.S. citizen or lawfully admitted permanent resident, and that you are not a federal contractor or foreign national. Federal law requires us to use our best efforts to collect and report the name, mailing address, occupation, and employer of individuals whose contributions exceed $200 in an election cycle.',
    ],
  },
  {
    heading: 'No guarantee of outcomes',
    body: [
      'The Committee makes no guarantee or warranty regarding election outcomes, legislative results, or the success of any particular policy effort.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'All content on this website — including text, images, logos, and graphics — is the property of the Committee or its licensors and is protected by applicable intellectual-property laws. You may not reproduce or distribute this content without permission.',
    ],
  },
  {
    heading: 'SMS messaging',
    body: [
      'By opting in, you consent to receive text messages from the Committee. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe. Reply HELP for help.',
      'You can opt out at any time by texting STOP. Opting out of one type of message (for example, fundraising) may not opt you out of other messages you previously consented to (for example, volunteer coordination).',
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
      'These Terms are governed by the laws of the State of California, without regard to its conflict-of-laws principles.',
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'To the maximum extent permitted by law, the Committee will not be liable for any indirect, incidental, special, or consequential damages arising out of or relating to your use of the website.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions about these Terms? Email team@morganhale.com or write to: Morgan Hale for Congress, 412 Riverside Ave, Oakwood, CA 94602.',
    ],
  },
]

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      number="06"
      title="Terms of Service"
      lastUpdated="May 1, 2026"
      intro="These Terms of Service govern your use of the Morgan Hale for Congress website and services. By using our website or engaging with the Committee, you agree to these Terms."
      sections={sections}
    />
  )
}
