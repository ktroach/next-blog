"use client"


import { Button } from "../ui/button";

export function CreateBlogButton() {
    const handleSubmit = () => {
        alert("Create Post!")
    };
    return (
        <>
            <Button className="py-4" onClick={handleSubmit}>Create Blog Post</Button>
        </>
    )

}
