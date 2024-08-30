import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
    title: 'About'
}

function About({}: Props) {
  return (
    <div>About</div>
  )
}

export default About