"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import { type User } from "@supabase/supabase-js";

export function useUserProfile(user: User | null) {
  const supabase = createClient();
  const [profile, setProfile] = useState<{
    username: string | null;
    avatar_url: string | null;
  } | null>(null);

  const getProfile = useCallback(async () => {
    try {
      if (!user) return;

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username,avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile({ username: data.username, avatar_url: data.avatar_url });
      }
    } catch (error) {
      toast({
        title: "Error loading user data! Please try again later",
      });
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return profile;
}
