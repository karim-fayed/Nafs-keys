"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "يناير",
    total: 1500,
  },
  {
    name: "فبراير",
    total: 2300,
  },
  {
    name: "مارس",
    total: 3200,
  },
  {
    name: "أبريل",
    total: 4500,
  },
  {
    name: "مايو",
    total: 4200,
  },
  {
    name: "يونيو",
    total: 0,
  },
  {
    name: "يوليو",
    total: 0,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} ر.س`}
        />
        <Tooltip
          formatter={(value: number) => [`${value} ر.س`, "المبيعات"]}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Bar dataKey="total" fill="#7e22ce" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
