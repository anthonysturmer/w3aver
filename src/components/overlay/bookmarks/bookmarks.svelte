<script lang="ts">
  import { bookmarks_state } from "../../../global/bookmarks.svelte";
  import Post from "../../feed/post.svelte";
  import { bookmarks_colors_state } from "../../../global/bookmarks_colors.svelte";
  import BookmarkEditor from "./bookmark_editor.svelte";

  function handle_profile_click() {
    console.log("Clicou no perfil a partir dos bookmarks");
  }

  function find_initial_color_id() {
    const bookmark_with_color = bookmarks_state.items.find(
      (bookmark) =>
        bookmarks_colors_state.items.some(
          (color) => color.id === bookmark.color_id
        )
    );

    return (
      bookmark_with_color?.color_id ??
      bookmarks_colors_state.items[0]?.id ??
      null
    );
  }

  let selected_color_id = $state(find_initial_color_id());

  let current_bookmark_option = $derived(
    bookmarks_colors_state.items.find(
      (item) => item.id === selected_color_id
    ) ?? bookmarks_colors_state.items[0] ?? null
  );

  let current_bookmark_option_color = $derived(
    current_bookmark_option?.color
  );

  let current_bookmark_option_name = $derived(
    current_bookmark_option?.name
  );


    let filtered_bookmarks = $derived(
      bookmarks_state.items.filter(
        (bookmark) =>
          bookmark.color_id === current_bookmark_option?.id
      )
    );

  function change_color(id: number) {
    selected_color_id = id;
  }

  let bookmark_editor_mode = $state<"create" | "edit" | null>(null);


</script>

<section class="bookmarks">
  <h1 class="bookmarks__title">Bookmarks</h1>

<div class="bookmarks__options_row">
  <div class="bookmarks__buttons_row">

{#each bookmarks_colors_state.items as bookmark_color}
  <button
    class="bookmarks__bookmarks-button"
    onclick={() => change_color(bookmark_color.id)}
  >
    <svg
      class="bookmarks__bookmarks-svg"
      fill={
        current_bookmark_option?.id === bookmark_color.id
          ? bookmark_color.color
          : "none"
      }
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke={bookmark_color.color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
    <path
      d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    ></path>
  </svg>

  </button>
{/each}
  </div>

<button
  class="bookmarks__bookmarks-edit-button"
  onclick={() => bookmark_editor_mode = "create"}
>
  create
</button>

<button
  class="bookmarks__bookmarks-edit-button"
  onclick={() => bookmark_editor_mode = "edit"}
>
  edit
</button>

</div>
{#if bookmark_editor_mode !== null}
  <BookmarkEditor
    mode={bookmark_editor_mode}
    initial_id={current_bookmark_option?.id}
    initial_name={
      bookmark_editor_mode === "edit"
        ? current_bookmark_option_name ?? ""
        : ""
    }
    initial_color={
      bookmark_editor_mode === "edit"
        ? current_bookmark_option_color ?? "#ffffff"
        : "#ffffff"
    }
    on_close={() => bookmark_editor_mode = null}
  />
{/if}


<div class="bookmarks__feed">

 {#if filtered_bookmarks.length === 0}

    <p>nenhum bookmark</p>
  {:else}
    {#each filtered_bookmarks as bookmark, index}
      <Post
        post={bookmark.post}
        on_profile_click={handle_profile_click}
        is_last={index === filtered_bookmarks.length - 1}
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

    &__options_row {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 12px;
      justify-content: space-between;
    }

    &__buttons_row {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    &__bookmarks-svg {
      width: 28px;
      height: 28px;
      stroke-width: 1.4px;
      stroke-linejoin: round;
      stroke-linecap: round;

      &:hover {
        transition-delay: 0ms;
        transform: scale(1.1);
      }
    
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

    &__bookmarks-button {

      background-color: transparent;
      border: 0px;
      padding: 0px;
    }

    &__bookmarks-edit-button {
      background-color: transparent;
      border: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      
      & svg path {
        color: rgb(173, 173, 173);
      }
    }
  }
</style>
