import CartPage from '@/sections/pages/cart-page'

export const metadata = {
  title: 'Cart | Northwest Oregon PAC',
  description: 'Review the items in your Northwest Oregon PAC shop cart before checking out.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CartPage />
}
