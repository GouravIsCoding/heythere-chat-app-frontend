import axios, { AxiosError } from "axios";
import { signupSchema, signupSchemaType } from "@/validators/signupSchema";
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
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const createUser = async (newUser: signupSchemaType) => {
  const response = await axios.post(
    `${CONFIG.BACKEND_URL}/auth/signup`,
    newUser
  );
  return response;
};

export default function Signup() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess(response) {
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message || error.response?.data.error);
      }
    },
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    mutation.mutate(values);
  }
  return (
    <>
      <FormWrapper>
        <h1 className="text-2xl font-semibold text-center my-3">Signup Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-800"
                      placeholder="Gourav"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-800"
                      placeholder="Thakur"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-2 border-gray-800"
                      placeholder="bio (optional)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
