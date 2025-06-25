"use client"

import React from "react"
import PotCard from "./ui/pot-card"
import AddPots from "./ui/add-edit-pots"
import { PageLayer } from "@/shared/components/page-layer"

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
    <PageLayer title="Pots" cta={<AddPotCTA />} className="@container">
      <section className="@min-md-2:grid-cols-2 grid grid-cols-1 gap-6">
        {budgetValue.map((cards, key) => (
          <PotCard
            key={key}
            color={cards.color}
            price={cards.price}
            sliderValue={cards.sliderValue}
            target={cards.target}
            title={cards.title}
          />
        ))}
      </section>
    </PageLayer>
  )
}

const AddPotCTA = () => (
  <AddPots title="+ Add New Pot" description="If your saving targets change, feel free to update your pot." state="Add Pot" />
)

export default PotsPage
