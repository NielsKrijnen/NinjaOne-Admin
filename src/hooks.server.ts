import type { Handle } from "@sveltejs/kit"
import { NinjaClient } from "ninja-api"
import { NINJA_CLIENT_ID, NINJA_CLIENT_SECRET } from "$app/env/private"

export const handle: Handle = async ({ resolve, event }) => {
  event.locals.ninja = new NinjaClient({
    prefix: "eu",
    clientId: NINJA_CLIENT_ID,
    clientSecret: NINJA_CLIENT_SECRET,
    fetch: event.fetch
  })

  await event.locals.ninja.auth.getTokenFromClientCredentials()

  return resolve(event)
}
