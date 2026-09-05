<script lang="ts">
  import { bookmarks_state } from "../global/bookmarks.svelte";
  import Post from "../feed/post.svelte";

  function handle_profile_click() {
    console.log("Clicou no perfil a partir dos favoritos");
  }
</script>

<section class="bookmarks">
  <h1 class="bookmarks__title">Bookmarks</h1>

  <div class="bookmarks__feed">
    {#if bookmarks_state.items.length === 0}
      <p>nenhum bookmark</p>
    {:else}
      {#each bookmarks_state.items as post, index}
        <Post
          {post}
          on_profile_click={handle_profile_click}
          is_last={index === bookmarks_state.items.length - 1}
        />
      {/each}
    {/if}
  </div>
</section>

<style lang="scss">
  .bookmarks {
    width: 92%;
    max-width: 580px;
    display: flex;
    height: fit-content;
    background-color: #0f0f15;
    align-items: center;
    gap: 40px;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
    padding-bottom: 100px;
    padding-top: 100px;
    color: white;

    &__title {
      font-size: 2rem;
      font-weight: 680;
      width: 100%;
      padding-bottom: 30px;
    }

    &__feed {
      width: 100%;
      height: fit-content;
      background-color: rgba(0, 0, 0, 0);
      display: flex;
      flex-direction: column;
      z-index: 100;
      border: 1px solid rgba(255, 255, 255, 0.208);
      border-radius: 5px;

      & > :last-child {
        border-bottom: 0px solid rgba(255, 255, 255, 0.208);
      }
    }
  }
</style>
