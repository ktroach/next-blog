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
    const [text, setText] = useState('# Hello Editor');
  
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
      //if (!isAdmin) return
  
      startTransition(async () => {
        try {
            console.log(">>> input data >>> ", data)
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

          <MdEditor modelValue={text} onChange={setText} language='en-US' />

          {/* <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Open Content Editor</FormLabel>
                <FormControl>
                    <Textarea></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Submit
            <span className="sr-only">Submit</span>
          </Button>
        </form>
      </Form>
    )
  }