import Image from 'next/image'
import Navbar from './components/Navbar'
import { HeroLayout } from './components/hero/HeroLayout'

export default function Home() {
  return (
    <main className="h-screen">
      <HeroLayout />
    </main>
  )
}
