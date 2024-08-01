"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast, useToast } from "../ui/use-toast"
import { addImage } from '@/actions/actions'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const formSchema = z.object({
  hairColor: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hairColor: "yellow",
    },
  })

  const { toast } = useToast()

  function onSubmit(values: z.infer<typeof formSchema>) {
    addImage(values)
    toast({
      title: "Image is generating...",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hairColor"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Hair color</FormLabel>
              <FormDescription>
                Select the hair color for the avatar.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="yellow" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#c2b71c] p-6">
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Yellow
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="brown" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-[#8b4513] p-6">
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Brown
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit">Generate Image</Button>
      </form>
    </Form>
  )
}
