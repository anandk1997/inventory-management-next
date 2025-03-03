import { createClientSsr } from "@/utils/supabase/server";
import { Context, Next } from "hono";
import { decode } from "hono/jwt";

export async function authenticate(c: Context, next: Next) {
  const token = c.req.header("Authorization");

  if (token) {
    try {
      const { header } = decode(token!);

      if (!header) {
        return c.json(
          { message: "Unauthorized : Invalid token!" },
          { status: 401 },
        );
      }
    } catch (error) {
      return c.json(
        { message: "Unauthorized : Invalid or missing token!" },
        { status: 401 },
      );
    }
  } else {
    const supabase = await createClientSsr();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return c.json({ message: error.message }, { status: 400 });
    }

    if (!data?.session) {
      return c.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  await next();
}
