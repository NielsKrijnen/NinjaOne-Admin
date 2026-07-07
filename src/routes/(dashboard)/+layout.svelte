<script lang="ts">
  import { resolve } from "$app/paths"
  import * as NavigationMenu from "$lib/components/ui/navigation-menu"
  import { Separator } from "$lib/components/ui/separator"

  let { children } = $props()
</script>

<div class="flex h-full min-h-0 flex-col">
  <NavigationMenu.Root class="flex-none shrink-0 justify-start">
    <NavigationMenu.List class="flex-none justify-start">
      <NavigationMenu.Item>
        <NavigationMenu.Link>
          {#snippet child({ props })}
            <a href={resolve("/")} {...props}>Overview</a>
          {/snippet}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>

  <Separator class="mt-1 mb-4 shrink-0" />

  <div class="flex min-h-0 flex-1 flex-col overflow-hidden p-1"> {@render children()} </div>
</div>
