import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Features from './components/Features'
import Services from './components/Services'
import Stats from './components/Stats'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { SiteProvider } from './context/SiteContext'

function Site() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        <Services />
        <Stats />
        <Process />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <SiteProvider>
      <Site />
    </SiteProvider>
  )
}

export default App