import SurveyPage from '@/sections/pages/survey-page'

export const metadata = {
  title: 'Survey — Northwest Oregon PAC',
  description:
    'Help us understand what issues are most important to Northwest Oregon families. Take a short community survey.',
  alternates: { canonical: '/survey' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return <SurveyPage />
}
