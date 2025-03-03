import { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/utils/env";
import { supabase } from "@/utils/supabase/client";
import { hc } from "hono/client";

const { data } = await supabase.auth.getSession();

export const client = hc<AppType>(env.APP_URL!, {
  headers: {
    Authorization: data.session?.access_token!,
  },
});
