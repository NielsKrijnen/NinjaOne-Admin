<script lang="ts">
  import { NetworkIcon } from "@lucide/svelte"
  import * as Organizations from "$lib/api/organizations.remote"

  let { children, params } = $props()

  const organization = $derived(await Organizations.get(Number(params.id)))
</script>

<div class="flex items-center gap-2">
  <NetworkIcon />
  <h2>{organization.name}</h2>
</div>

{@render children()}
