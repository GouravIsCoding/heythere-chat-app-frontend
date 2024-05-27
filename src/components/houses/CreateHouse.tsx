import axios, { AxiosError } from "axios";
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
import { useNavigate } from "react-router-dom";
import { addHouse, createHouseType } from "@/validators/House";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import Tick from "../svg/tick";
import Cross from "../svg/cross";

axios.defaults.withCredentials = true;

const createUser = async (house: createHouseType) => {
  const response = await axios.post(`${CONFIG.BACKEND_URL}/house/add`, house);
  return response;
};

let timer: NodeJS.Timeout;

export default function CreateHouse() {
  const navigate = useNavigate();
  const [houseOk, setHouseOk] = useState<boolean>();

  const checkHouse = async (name: string) => {
    if (name === "") return;
    try {
      setHouseOk(false);
      const response = await axios.get(
        `${CONFIG.BACKEND_URL}/house/check/${encodeURIComponent(name)}`
      );

      setHouseOk(!response.data.housePresent);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.response?.data.error);
      }
    }
  };
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess(response) {
      toast.success(response.data.message);
      navigate(`/house/${response.data.id}`);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.response?.data.error);
      }
    },
  });

  const form = useForm<createHouseType>({
    resolver: zodResolver(addHouse),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const debouncedRequest = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      const name = e.target?.value;
      checkHouse(name);
    }, 1000);
  };

  function onSubmit(values: createHouseType) {
    mutation.mutate(values);
  }

  return (
    <>
      <FormWrapper>
        <h1 className="text-2xl font-semibold text-center my-3">
          Create House
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <div className="flex justify-center items-center">
                    <FormControl>
                      <Input
                        onInput={debouncedRequest}
                        className="border-2 border-gray-800 m-2"
                        placeholder="House of dragon"
                        {...field}
                      />
                    </FormControl>
                    {houseOk ? <Tick /> : <Cross />}
                  </div>
                  {houseOk ? (
                    <h1 className="text-center text-green-500">
                      Name can be taken
                    </h1>
                  ) : (
                    <h1 className="text-center text-red-500">
                      Name already taken
                    </h1>
                  )}

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
                    <Textarea
                      className="border-2 border-gray-800"
                      placeholder="Description"
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
