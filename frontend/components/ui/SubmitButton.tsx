"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./button"
import { Loader2 } from "lucide-react";

const SubmitButton = ({title}: {title : string}) => {
    const { pending } = useFormStatus();

    return (
        <>
            {
                pending ? (
                    <Button disabled className="w-fit">
                        <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                        Loading..
                    </Button>
                ) : (
                    <Button className="w-fit" type="submit">{title}</Button>
                )
            }
        </>
    )
}

export default SubmitButton