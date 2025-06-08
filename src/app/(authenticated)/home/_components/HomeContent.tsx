"use client"

import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Header } from "./Header"
import { PreventBackButton } from "./PreventBackButton"

export function HomeContent() {
  return (
    <>
      <PreventBackButton />
      <div className="container mx-auto p-6">
        <Header />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Your financial overview</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$2,500</p>
              <p className="text-muted-foreground text-sm">Current Balance</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Details</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Grocery Shopping</span>
                  <span className="text-red-500">-$85.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Salary Deposit</span>
                  <span className="text-green-500">+$3,200.00</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View All</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Goal</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Target</span>
                  <span>$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Current</span>
                  <span>$7,500</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary">Update Goal</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
