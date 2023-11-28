"use client"

import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { Icons } from "@/components/icons"
import { blogSchema } from "@/lib/validations/blog"

type Inputs = z.infer<typeof blogSchema>

import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export function AddBlogPostForm() {
  const router = useRouter()

  const [isPending, startTransition] = React.useTransition()
  const [body, setBody] = useState('# Title ');

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      body: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        console.log(">>> input data >>> ", data);
        const response = await fetch("/api/blog/create", {
          method: "POST",
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            image: data.image,
            body: body
          }),
        })
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title goes here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Give your blog a description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Type in the Image URL here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='h-auto bg-blue-500 hover:bg-blue-700' disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Save Changes
          <span className="sr-only">Submit</span>
        </Button>

        <MdEditor modelValue={body} onChange={setBody} language='en-US' />

      </form>
    </Form>
  )
}