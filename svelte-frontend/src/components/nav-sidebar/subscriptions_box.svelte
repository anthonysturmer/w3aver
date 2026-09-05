<script lang="ts">
  import { subscriptions_state } from "../global/subscriptions.svelte";
  let { is_visible }: { is_visible: boolean } = $props();
</script>

<div class="subscriptions-box" style:display={!is_visible ? "none" : undefined}>
  {#each subscriptions_state.items as author_name}
    <button type="button">{author_name}</button>
  {:else}
    <p>Nenhuma inscrição ainda.</p>
  {/each}
</div>

<style>
  .subscriptions-box {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    position: relative;

    & button {
      background-color: transparent;
      width: fit-content;
      font-size: 0.9rem;
      border: 0;
      color: rgb(184, 184, 184);

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
