<script lang="ts">
  import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "@lucide/svelte"
  import { resolve } from "$app/paths"
  import * as Dashboard from "$lib/api/dashboard.remote"
  import { Button } from "$lib/components/ui/button"
  import * as ButtonGroup from "$lib/components/ui/button-group"
  import * as Card from "$lib/components/ui/card"
  import * as InputGroup from "$lib/components/ui/input-group"
  import * as Item from "$lib/components/ui/item"
  import { Skeleton } from "$lib/components/ui/skeleton"

  let value = $state("")
  let pagination = $state({ after: 0 })

  const organizations = $derived(Dashboard.listOrganizations({ search: value }))
</script>

<div class="flex h-full min-h-0 flex-col gap-4">
  <h3 class="scroll-m-20 shrink-0 text-2xl font-semibold tracking-tight">Overview</h3>

  <div class="grid min-h-0 flex-1 grid-cols-3 gap-4">
    <Card.Root class="min-h-0">
      <Card.Header>
        <Card.Title>Organizations</Card.Title>
      </Card.Header>
      <Card.Content class="flex min-h-0 flex-1 flex-col gap-4">
        <InputGroup.Root class="shrink-0">
          <InputGroup.Input placeholder="Search organizations" bind:value />
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
        </InputGroup.Root>

        {#if organizations.loading}
          <Skeleton class="h-8 w-full" />
        {:else if organizations.current}
          <div class="flex items-center gap-2">
            <ButtonGroup.Root>
              <Button
                variant="outline"
                size="icon"
                onclick={() => pagination.after -= 250}
                disabled={pagination.after === 0}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onclick={() => pagination.after += 250}
                disabled={pagination.after + 250 >= organizations.current.length}
              >
                <ChevronRightIcon />
              </Button>
            </ButtonGroup.Root>
            <span>
              {pagination.after + 1}
              -
              {Math.min(pagination.after + 250, organizations.current.length)}
              of
              {organizations.current.length}
            </span>
          </div>
        {/if}

        <Item.Group class="min-h-0 flex-1 overflow-y-auto gap-1">
          {#if organizations.loading}
            {#each { length: 20 } as _}
              <Skeleton class="min-h-18" />
            {/each}
          {:else if organizations.current}
            {#each organizations.current.slice(pagination.after, pagination.after + 250) as organization}
              <Item.Root variant="outline">
                {#snippet child({ props })}
                  <a href={resolve("/organizations/[id]", { id: organization.id.toString() })} {...props}>
                    <Item.Content>
                      <Item.Title>{organization.name}</Item.Title>
                      <Item.Description>{organization.devices} devices</Item.Description>
                    </Item.Content>
                  </a>
                {/snippet}
              </Item.Root>
            {/each}
          {/if}
        </Item.Group>
      </Card.Content>
    </Card.Root>
  </div>
</div>
