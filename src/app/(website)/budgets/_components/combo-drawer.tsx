"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Command, CommandGroup, CommandItem, CommandList } from "@/shared/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { cn } from "@/shared/lib/utils"
import clsx from "clsx"

type ComboboxDrawerProp = {
  options: { value: string; label: string; used: string; color?: string }[]

  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export function ComboboxDrawer({ options, setValue, value }: ComboboxDrawerProp) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-preset-4 h-[2.815rem] w-full justify-between font-normal"
        >
          {value ? (
            <div className="flex items-center gap-x-3">
              <div
                className={clsx("size-4 rounded-full bg-orange-500", options.find((framework) => framework.value === value)?.color)}
              ></div>
              <p className="text-preset-4 font-normal">{options.find((framework) => framework.value === value)?.label}</p>
            </div>
          ) : (
            "Select..."
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem-4rem)] max-w-[31rem] p-0">
        <Command className="w-full">
          <CommandList>
            <CommandGroup className="px-5 py-3">
              <div className="bg-gry-300 flex flex-col gap-y-3">
                {options.map((framework, index) => (
                  <div key={framework.value} className="flex flex-col gap-y-3">
                    <CommandItem
                      className="h-[1.315rem] data-[selected=true]:bg-transparent"
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue: any) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-x-3">
                        <div className={clsx("size-4 rounded-full bg-orange-500", framework.color)}></div>
                        <p className="text-preset-4 font-normal">{framework.label}</p>
                      </div>

                      {framework.used !== "Already used" ? (
                        <Check className={cn("ml-auto", value === framework.value ? "opacity-100" : "opacity-0")} />
                      ) : (
                        <p className="text-preset-4 ml-auto font-normal">{framework.used}</p>
                      )}
                    </CommandItem>
                    <Separator className={cn("", { hidden: index === options.length - 1 })} />
                  </div>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
