"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/store/useUser";
import { type User } from "@supabase/supabase-js";
import Avatar from "./Avatar";

const ProfileSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
});

type ProfileValues = z.infer<typeof ProfileSchema>;

export default function Profile({ user }: { user: User | null }) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(ProfileSchema),
    // defaultValues,
    mode: "onChange",
  });

  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  // get profile info
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username,avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);

        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        form.reset({ username: data.username });
      }
    } catch (error) {
      toast({
        title: "Error loading user data! try again later",
      });
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  // update userName
  async function updateProfile({ username }: { username: string | null }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        username,
      });
      if (error) throw error;
      toast({
        title: "Username updated",
      });
    } catch (error) {
      toast({
        title: "Error updating the data!",
      });
    } finally {
      setLoading(false);
    }
  }

  // upload image & update image url
  async function updateAvatar({ avatar_url }: { avatar_url: string | null }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        avatar_url,
      });
      if (error) throw error;
      toast({
        title: "Avatar updated",
      });
    } catch (error) {
      toast({
        title: "Error updating the data!",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: ProfileValues) {
    await updateProfile(data);
    // toast({
    //   title: "You submitted the following values:"
    // });
  }
  return (
    <div className="py-6">
      {loading ? (
        <>
          <p>Loading</p>
        </>
      ) : (
        <>
          <Avatar
            uid={user?.id ?? null}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateAvatar({ avatar_url: url });
            }}
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
              <FormField
                control={form.control}
                name="username"
                defaultValue={username || ""}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter your full name, or a display name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="float-right">
                Save changes
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
