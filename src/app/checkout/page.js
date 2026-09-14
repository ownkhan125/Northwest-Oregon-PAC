import CheckoutPage from '@/sections/pages/checkout-page'

export const metadata = {
  title: 'Checkout | Northwest Oregon PAC',
  description: 'Enter your shipping details to complete your Northwest Oregon PAC shop order.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CheckoutPage />
}
