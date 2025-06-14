"use client"
import React, { PureComponent } from "react"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]
const COLORS = ["#277c78", "#f2cdac", "#626070", "#82c9d7"]

type Props = {}

export default class SpendingCharts extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o"

  render() {
    return (
      <div className="relative">
        <ResponsiveContainer height={240} width={240}>
          <PieChart>
            <Pie data={data} innerRadius={80} outerRadius={120} fill="#8884d8" paddingAngle={0} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 z-50 flex -translate-1/2 flex-col items-center">
          <p className="text-preset-1">$338</p>
          <p className="text-preset-5 text-gray-500">of $935 limit</p>
        </div>
      </div>
    )
  }
}

// onMouseEnter={this.onPieEnter}
