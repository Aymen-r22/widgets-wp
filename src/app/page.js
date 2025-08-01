import React from 'react'
import Hero from '../sections/1-hero/hero'
import Strategy from '../sections/3-strategy/strategy'
import Consume from '../sections/4-consume/consume'
import Centralize from '../sections/5-centralize/centralize'
import Contact from '@/sections/6-contact/contact'

export default function Home() {
  return (
    <>
      <Hero />
      <main style={{ display: 'flex', flexDirection: 'column', gap:'10.4vw', padding:'4.68vw 0' }}>
        <Strategy />
        <Consume />
        <Centralize />
        <Contact />
      </main>
    </>
  )
}
