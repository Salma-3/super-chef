import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
    title: 'Recipes'
}

function RecipesIndex({}: Props) {
  return (
    <div>RecipesIndex</div>
  )
}

export default RecipesIndex