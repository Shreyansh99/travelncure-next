"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const medicaldept = [
  {
    value: "Cardio",
    label: "Cardiology",
  },
  {
    value: "dental",
    label: "Dental",
  },
  {
    value: "dermatology",
    label: "Dermatology",
  },
  {
    value: "gynecology",
    label: "Gynecology",
  },
  {
    value: "neurology",
    label: "Neurology",
  },
]

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between font-light"
        >
          {value
            ? medicaldept.find((department) => department.value === value)?.label
            : "Select Medical Department..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search  Medical Department..." />
          <CommandList>
            <CommandEmpty>No Department found.</CommandEmpty>
            <CommandGroup>
              {medicaldept.map((department) => (
                <CommandItem
                  key={department.value}
                  value={department.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {department.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === department.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
