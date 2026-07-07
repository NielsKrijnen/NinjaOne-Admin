import { z } from "zod"
import { getRequestEvent, query } from "$app/server"

export const listOrganizations = query(
  z.object({
    search: z.string().nonempty().optional().catch(undefined)
  }),
  async data => {
    const { locals } = getRequestEvent()
    const organizations = await locals.ninja.system.listOrganizations({
      of: data.search ? `name = ${data.search}` : undefined
    })

    return await Promise.all(
      organizations.map(async organization => {
        const devices = await locals.ninja.organization.listDevices(organization.id)
        return {
          id: organization.id,
          name: organization.name,
          devices: devices.length
        }
      })
    )
  }
)
