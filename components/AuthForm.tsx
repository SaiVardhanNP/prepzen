"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router=useRouter(); 
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {

        const {name,email,password}=values;

        const userCredentials=await createUserWithEmailAndPassword(auth,email,password);

        const result= await signUp({
          uid:userCredentials.user.uid,
          name:name!,
          email,
          password

        })
        if(!result?.success){
          toast.error(result?.message);
          return;
        }
        toast.success("Account created successfully!.Please sign in.")

        router.push("/signin");
      } else {

        const {email,password}=values;

        const userCredentials=await signInWithEmailAndPassword(auth,email,password);
        const idToken=await userCredentials.user.getIdToken();

        if(!idToken){
          toast.error("Sign in failed");
          return;
        }

        await signIn({
          email,idToken
        })


        toast.success("Sign in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[400px]">
      <div className="flex flex-col gap-6 card py-14 px-5">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" width={38} height={32} alt="logo" />
          <h2 className="text-primary-100">PrepGen</h2>
        </div>
        <h3 className="text-center">Prep Smart. Ace Fast.</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                name={"name"}
                label="Name"
                placeholder="Your Name"
                control={form.control}
              />
            )}
            <FormField
              name={"email"}
              label="email"
              type="email"
              placeholder="Your email address"
              control={form.control}
            />
            <FormField
              name={"password"}
              label="password"
              type="password"
              placeholder="Enter your password"
              control={form.control}
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}

          <Link
            href={!isSignIn ? "/signin" : "/signup"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
