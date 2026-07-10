import { z } from "zod"
import { getRequestEvent, query } from "$app/server"

export const get = query(z.int().positive(), async data => {
  const { locals } = getRequestEvent()
  return await locals.ninja.organization.get(data)
})
