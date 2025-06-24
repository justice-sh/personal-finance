"use client"
import React from "react"
import PotsCards from "@/app/(website)/pots/ui/pots-cards"

const budgetValue = [
  {
    price: 150,
    sliderValue: 30,
    target: 20,
    title: "Savings",
    color: "bg-secondary-green",
  },
  {
    price: 110,
    sliderValue: 70,
    target: 50,
    title: "Concert Ticket",
    color: "bg-secondary-navy",
  },
  {
    price: 40,
    sliderValue: 90,
    target: 600,
    title: "Gift",
    color: "bg-secondary-cyan",
  },
  {
    price: 150,
    sliderValue: 10,
    target: 1000,
    title: "New Laptop",
    color: "bg-secondary-yellow",
  },
  {
    price: 530,
    sliderValue: 40,
    target: 580,
    title: "Holiday",
    color: "bg-secondary-purple",
  },
]
const PotsPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <ul className="grid w-full auto-rows-auto gap-6 md:grid-cols-1 lg:grid-cols-2">
        {budgetValue.map((cards, key) => (
          <li key={key}>
            <PotsCards
              key={key}
              color={cards.color}
              price={cards.price}
              sliderValue={cards.sliderValue}
              target={cards.target}
              title={cards.title}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PotsPage
