import SurveyThankYouPage from '@/sections/pages/survey-thank-you-page'

export const metadata = {
  title: 'Survey — Thank You — Northwest Oregon PAC',
  description:
    'Your feedback helps us better understand what matters most to Northwest Oregon families.',
  alternates: { canonical: '/survey/thank-you' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return <SurveyThankYouPage />
}
