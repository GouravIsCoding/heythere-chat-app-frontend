import axios, { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormWrapper from "../wrappers/FormWrapper";
import { CONFIG } from "@/CONFIG";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signinSchema, signinSchemaType } from "@/validators/SigninSchema";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const createUser = async (user: signinSchemaType) => {
  const response = await axios.post(`${CONFIG.BACKEND_URL}/auth/signin`, user);
  return response;
};

export default function Signup() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess(response) {
      toast.success(response.data.message);
      navigate("/");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.response?.data.error);
      }
    },
  });

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signinSchema>) {
    mutation.mutate(values);
  }
  return (
    <>
      <FormWrapper>
        <h1 className="text-2xl font-semibold text-center my-3">Signin Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-800"
                      placeholder="any@example.com"
                      {...field}
                    />
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
                    <Input
                      className="border-2 border-gray-800"
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <h1>
              Don't have an account?{" "}
              <Link className="underline" to={"/signup"}>
                Signup Now
              </Link>
            </h1>
            <Button
              disabled={mutation.isPending}
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </>
  );
}
