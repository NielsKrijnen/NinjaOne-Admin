<script lang="ts">
  import "../app.css"
  import { GaugeIcon } from "@lucide/svelte"
  import { resolve } from "$app/paths"
  import * as Sidebar from "$lib/components/ui/sidebar"

  let { children } = $props()
</script>

<Sidebar.Provider class="h-svh">
  <Sidebar.Root>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={resolve("/")} {...props}>
                    <GaugeIcon />
                    Dashboard
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Root>
  <Sidebar.Inset>
    <div class="flex size-full min-h-0 flex-col overflow-hidden p-4"> {@render children()} </div>
  </Sidebar.Inset>
</Sidebar.Provider>
