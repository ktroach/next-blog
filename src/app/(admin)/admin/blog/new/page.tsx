import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import fs from 'fs'

export default function AdminBlogNew() {


    return (
        <>
            <h2 className="py-8">MDX Content</h2>
            <Textarea className="h-screen">

            </Textarea>


        </>
    );
}