"use client"
import React from "react"
import { createMachine, assign, createActor } from "xstate"

const page = () => {
  const countMachine = createMachine({
    context: {
      count: 0,
    },
    on: {
      INC: {
        actions: assign({
          count: ({ context }) => context.count + 1,
        }),
      },
      DEC: {
        actions: assign({
          count: ({ context }) => context.count - 1,
        }),
      },
      SET: {
        actions: assign({
          count: ({ event }) => event.value,
        }),
      },
    },
  })

  const countActor = createActor(countMachine).start()

  countActor.subscribe((state) => {
    console.log(state.context.count)
  })

  //   countActor.send({ type: "INC" })
  //   // logs 1
  //   countActor.send({ type: "DEC" })
  //   // logs 0
  //   countActor.send({ type: "SET", value: 10 })
  //   // logs 10

  return <div onClick={(e) => countActor.send({ type: "SET", value: 10 })}>page</div>
}

export default page
