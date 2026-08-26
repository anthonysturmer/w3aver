<script lang="ts">

    import { subscriptions_state } from "../global/subscriptions.svelte";
    let {is_visible}: {is_visible: boolean} = $props();

</script>


       
<div
id="subscriptions"
class="nav-sidebar__subscriptions"
style:display={!is_visible ? "none" : undefined}
>

    {#each subscriptions_state.items as author_name}

        <button type="button">{author_name}</button>
    
    {:else}
    
        <p>Nenhuma inscrição ainda.</p>

    {/each}
     
</div>

<style>

  .nav-sidebar__subscriptions {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }

  .nav-sidebar__subscriptions button {
    background-color: transparent;
    width: fit-content;
    font-size: 0.9rem;
    border: 0;
    color: rgb(184, 184, 184);
  }

  .nav-sidebar__subscriptions button:hover {
    text-decoration: underline;
  }


</style>