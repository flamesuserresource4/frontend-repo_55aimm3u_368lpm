import React, { useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, Mail, Lock } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function EmailModal({ open, onClose }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const resp = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, email, country })
      })
      if (!resp.ok) throw new Error('Failed to submit')
      const data = await resp.json()
      setStatus('Success. You\'re on the list.')
      setFirstName(''); setEmail(''); setCountry('')
    } catch (err) {
      setStatus('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-lg mx-4 rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex items-center gap-2 text-neutral-200 mb-4">
          <Mail className="w-5 h-5" />
          <span className="uppercase tracking-widest text-xs">Join the Waitlist for Early Access</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">First Name</label>
            <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} required className="w-full bg-neutral-800/80 border border-white/10 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-400" placeholder="Alex"/>
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full bg-neutral-800/80 border border-white/10 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-400" placeholder="you@email.com"/>
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Country</label>
            <input value={country} onChange={(e)=>setCountry(e.target.value)} className="w-full bg-neutral-800/80 border border-white/10 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-400" placeholder="Greece"/>
          </div>
          <button disabled={loading} className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-indigo-300 text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:from-indigo-400 hover:to-amber-300 transition-colors">
            {loading ? 'Submitting…' : 'Request Early Access'}
            <ArrowRight className="w-4 h-4" />
          </button>
          {status && <p className="text-center text-sm text-neutral-300">{status}</p>}
          <p className="text-center text-xs text-neutral-500 flex items-center justify-center gap-1"><Lock className="w-3 h-3"/> Private pre-launch access to the Genistein Patent updates and longevity research.</p>
        </form>
      </motion.div>
    </div>
  )
}

function MolecularGraphic() {
  // Simple animated bonding motif
  return (
    <div className="relative w-full h-56 md:h-64">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/0 via-indigo-600/10 to-amber-500/10 rounded-xl" />
      <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-60">
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} initial={{ opacity: 0.2, y: 10 }} animate={{ opacity: 0.8, y: [0, -6, 0] }} transition={{ duration: 3 + (i%3), repeat: Infinity }} className="h-0.5 bg-gradient-to-r from-indigo-500/40 to-amber-400/40" />
        ))}
      </div>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 rounded-full border border-amber-300/30" />
      </motion.div>
    </div>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/5EwoDiC2tChvmy4K/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-neutral-950/95 pointer-events-none" />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-amber-300/80">
            <Shield className="w-4 h-4" />
            <span className="text-xs tracking-widest uppercase">The Genistein Project</span>
          </div>
          <h1 className="mt-4 text-5xl md:text-7xl font-semibold leading-[0.95]">
            <span className="bg-gradient-to-r from-neutral-50 to-amber-200 bg-clip-text text-transparent">A Molecule Beyond Time.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-neutral-300">
            From the mind of George K. Vasileiou — The Genistein Patent is redefining the frontiers of anti-aging science.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => setModalOpen(true)} className="bg-neutral-100 text-neutral-950 hover:bg-amber-200 transition-colors font-semibold px-6 py-3 rounded-full">
              Join the Waitlist for Early Access
            </button>
            <span className="text-sm text-neutral-400">Where Science Meets Immortality.</span>
          </div>
        </div>
      </section>

      {/* Science */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 to-indigo-950">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(1200px 400px at 50% -10%, rgba(79,70,229,0.25), transparent)', opacity: 0.6 }} />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">The Secret Within Genistein.</h2>
            <p className="text-neutral-300 leading-relaxed">
              Genistein, a powerful phytoestrogen derived from soy, inhibits the enzyme α-glucosidase — slowing sugar metabolism and mimicking the mechanisms behind life-extension drugs like Metformin and Acarbose.
            </p>
            <p className="text-neutral-300 leading-relaxed mt-4">
              Through proprietary modification, the Genistein-bound-Glucose molecule enhances enzymatic inhibition, blocking sugar absorption and thereby reducing glycation — a root cause of aging. This is the pathway to a longer, healthier life.
            </p>
          </div>
          <div>
            <MolecularGraphic />
            <p className="mt-3 text-sm text-neutral-400">An abstract visualization of molecular bonding between Genistein and Glucose.</p>
          </div>
        </div>
      </section>

      {/* Exclusivity */}
      <section className="py-20 md:py-28 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">A New Era Begins.</h2>
          <p className="mt-4 text-neutral-300 max-w-3xl mx-auto">
            This is not a supplement. This is a patented breakthrough in biochemical longevity — a re-engineered molecule that could reshape how humanity ages. Early collaborators and investors will gain access to proprietary research, development updates, and pre-launch invitations.
          </p>
          <button onClick={() => setModalOpen(true)} className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-amber-300 text-black font-semibold px-6 py-3 rounded-full hover:from-indigo-400 hover:to-amber-200 transition-colors">
            Enter the Inner Circle <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <div className="w-28 h-1 bg-gradient-to-r from-amber-300 to-indigo-500 rounded-full mb-6" />
            <h3 className="text-2xl md:text-3xl font-semibold">The Mind Behind the Molecule.</h3>
          </div>
          <div className="md:col-span-3 text-neutral-300 leading-relaxed">
            <p>
              George K. Vasileiou, B.Sc. in Cognitive Science and Psychology, is a researcher, biogerontologist, and health philosopher. His methodology integrates biochemical innovation with the timeless principles of Ancient Greek philosophy — uniting soma, nous, and pneuma in pursuit of human perfection.
            </p>
            <p className="mt-4 italic text-neutral-400">“Optimising longevity through directed discipline makes life worth living.”</p>
          </div>
        </div>
      </section>

      {/* Email capture (inline) */}
      <section className="py-20 md:py-28 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-2xl p-8 border border-white/10 bg-gradient-to-br from-indigo-950/60 to-neutral-900/60">
            <div className="flex items-center gap-2 text-amber-300/80">
              <Mail className="w-5 h-5" />
              <span className="uppercase tracking-widest text-xs">Join the Waitlist for Early Access</span>
            </div>
            <InlineForm onOpen={() => setModalOpen(true)} />
            <p className="mt-3 text-xs text-neutral-500">Private pre-launch access to the Genistein Patent updates and longevity research.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 bg-black/90">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">© {new Date().getFullYear()} The Genistein Project. All rights reserved.</p>
          <div className="flex items-center gap-6 text-neutral-400 text-sm">
            <span>Genistein Patent</span>
            <span>Longevity Innovation</span>
            <span>α-Glucosidase Inhibition</span>
          </div>
        </div>
      </footer>

      <EmailModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

function InlineForm({ onOpen }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const resp = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, email, country })
      })
      if (!resp.ok) throw new Error('Failed')
      setStatus('Success. Welcome to the inner circle.')
      setFirstName(''); setEmail(''); setCountry('')
    } catch (e) {
      setStatus('Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
      <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} required placeholder="First Name" className="md:col-span-1 bg-neutral-950/60 border border-white/10 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-indigo-400 placeholder-neutral-500" />
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Email" className="md:col-span-1 bg-neutral-950/60 border border-white/10 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-indigo-400 placeholder-neutral-500" />
      <input value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Country" className="md:col-span-1 bg-neutral-950/60 border border-white/10 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-indigo-400 placeholder-neutral-500" />
      <button disabled={loading} className="md:col-span-1 bg-amber-300 text-neutral-900 font-semibold rounded-lg px-4 py-3 hover:bg-amber-200 transition-colors">{loading ? 'Submitting…' : 'Request Access'}</button>
      {status && <div className="md:col-span-4 text-sm text-neutral-300">{status}</div>}
    </form>
  )
}
