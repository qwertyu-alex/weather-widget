"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const SearchForm = (props: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const formSchema = z.object({
    city: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const queryString = createQueryString("q", values.city);
    router.push(`?${queryString}`);
  }

  return (
    <>
      <div className="script w-full p-5 flex flex-col gap-2">
        <Form {...form}>
          <fieldset>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={props.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="script">
                Search for another city
              </Button>
            </form>
          </fieldset>
        </Form>
      </div>
    </>
  );
};

export const ClientWidget = (props: {
  cityName?: string;
  temperature?: number;
  humidity?: number;
  wind?: number;
}) => {
  return (
    <>
      <div className="w-full p-5 border-b bg-muted font-medium flex gap-1">
        <p>Weather in</p>
        <p>{props.cityName}</p>
      </div>

      <div className="w-full p-5 border-b flex gap-1 tabular-nums">
        <p>Temperature:</p>
        <p>{props.temperature}</p>
        <p>C</p>
      </div>

      <div className="w-full p-5 border-b flex gap-1 tabular-nums">
        <p>Humidity:</p>
        <p>{props.humidity}</p>
        <p>%</p>
      </div>

      <div className="w-full p-5 border-b flex gap-1 tabular-nums">
        <p>Wind:</p>
        <p>{props.wind}</p>
        <p>m/s</p>
      </div>

      <SearchForm placeholder={props.cityName || "City"} />
    </>
  );
};

export const ClientWidgetNotFound = (props: { q: string }) => {
  const q = props.q;

  return (
    <>
      <div className="w-full p-5 border-b bg-muted font-medium flex gap-1">
        <p>&quot;{q}&quot; not found. Please search for another city</p>
      </div>

      <SearchForm placeholder={q && q.trim().length > 0 ? q : "City"} />
    </>
  );
};

export const ClientWidgetInternalError = (props: {
  error: { status: number; message: string };
  q: string;
}) => {
  const q = props.q;

  return (
    <>
      <div className="w-full p-5 border-b bg-muted font-medium flex gap-1 text-red-400 flex-col">
        <p>
          ERROR: {props.error.status} {props.error.message}
        </p>
        <p>Please try again</p>
      </div>

      <SearchForm placeholder={q && q.trim().length > 0 ? q : "City"} />
    </>
  );
};
