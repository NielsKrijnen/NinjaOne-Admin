import { defineEnvVars } from "@sveltejs/kit/hooks"
import { z } from "zod"

// noinspection JSUnusedGlobalSymbols
export const variables = defineEnvVars({
  NINJA_CLIENT_ID: z.string().nonempty(),
  NINJA_CLIENT_SECRET: z.string().nonempty()
})
