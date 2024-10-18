import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: 'About'
}

function About({ }: Props) {
  return (
    <main className="bg-gray-100 text-gray-800">
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-orange-600">About SuperChef</h1>
        </header>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to SuperChef</h2>
          <p className="mb-4">
            SuperChef is your go-to destination for discovering delicious and easy-to-follow recipes from around the world. Whether you’re a beginner in the kitchen or a seasoned home cook, our diverse collection of recipes will inspire you to create mouthwatering dishes for any occasion.
          </p>
          <p className="mb-4">
            Our mission is to make cooking fun, accessible, and enjoyable for everyone. From quick weeknight dinners to decadent desserts, SuperChef has something for every taste and skill level.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Story</h2>
          <p className="mb-4">
            Founded by a team of food enthusiasts, SuperChef started with a simple idea: to share the joy of cooking with others. We believe that great food brings people together, and we strive to create a community where food lovers can find inspiration and share their passion.
          </p>
          <p className="mb-4">
            With carefully curated recipes, step-by-step guides, and tips from expert chefs, SuperChef aims to be more than just a recipe website—it’s a place where you can explore new flavors, experiment with different cuisines, and most importantly, enjoy the process of cooking.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Join Us on This Culinary Journey</h2>
          <p>
            Whether you’re looking for a quick breakfast idea, planning a special dinner, or just browsing for new inspiration, SuperChef is here to help. Join our community, try our recipes, and let’s cook up something amazing together!
          </p>
        </section>

        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500">© 2024 SuperChef. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}

export default About