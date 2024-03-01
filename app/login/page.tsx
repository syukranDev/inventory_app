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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios"
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from "next/cache"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

let isLoggedIn: any = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;

const page = () => {
  if(isLoggedIn == 'true') redirect('/');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    let payload = {
      username: values.username,
      password: values.password
    }

    try {
      const response = await axios.post(`http://localhost:3003/api/auth/login`, payload); 
      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('data_user', JSON.stringify(response.data.data));
        
        // router.push('/inventory')
        window.location.href='/inventory'
      } else {
        if(response.status === 404)
        alert('Something went wrong. Gulp.')
      }
    } catch (err) {
        console.log((err as any).response.data.errMsg)
        alert(`System Error - ${(err as any).response.data.errMsg}`);
    }
  }

  return (
    <>
      <section className="flex mt-10 h-[90vh]">
          <div className="relative  w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
              <div className="max-w-3xl mx-auto">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-center">Login In</CardTitle>
                  <CardDescription className="text-center">InventoryApp</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Log In</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              </div>
            </div>
      </section>

    </>
    
  )
}

export default page