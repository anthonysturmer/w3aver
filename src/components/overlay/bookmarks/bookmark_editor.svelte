<script lang="ts">
  import {
    add_bookmark_color,
    remove_bookmark_color,
    edit_bookmark_color
  } from "../../../global/bookmarks_colors.svelte";

  type BookmarkEditorMode = "create" | "edit";

interface Props {
  mode: BookmarkEditorMode;
  initial_id?: number;
  initial_name: string;
  initial_color: string;
  on_close: () => void;
}

  let {
    mode,
    initial_id,
    initial_name,
    initial_color,
    on_close
  }: Props = $props();

  let name = $state(initial_name);
  let color = $state(initial_color);

function handle_save() {
  if (!name.trim() || !color.trim()) {
    return;
  }

  let success: boolean;

  if (mode === "create") {
    success = add_bookmark_color(color, name);
  } else {
    if (initial_id === undefined) {
      return;
    }

    success = edit_bookmark_color(
      initial_id,
      color,
      name
    );
  }

  if (success) {
    on_close();
  }
}

function handle_delete() {
  if (initial_id === undefined) {
    return;
  }

  const success = remove_bookmark_color(initial_id);

  if (success) {
    on_close();
  }
}
</script>

<div class="bookmarks__blur"></div>

<section class="bookmarks__edit-section">

  <button
    class="bookmarks__edit-section-close-button"
    onclick={on_close}
  >
    x
  </button>

  <p class="bookmarks__edit-section-title">
    {mode === "edit" ? "Edit Bookmark" : "New Bookmark"}
  </p>

  <input
    placeholder="name"
    bind:value={name}
  />

  <input
    placeholder="color"
    bind:value={color}
    style="anchor-name: --color-input;"
  />

  <input
    type="color"
    class="bookmarks__color-native-input"
    bind:value={color}
  />

  <svg
    class="bookmarks__edit-section-svg-example"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke={color}
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    ></path>
  </svg>

  <div class="bookmarks__edit-section-buttons-div">

    {#if mode === "edit"}
      <button onclick={handle_delete}>
        delete
      </button>
    {/if}

    <button onclick={handle_save}>
      save
    </button>

  </div>

</section>


<style lang="scss">
  .bookmarks__edit-section {
    width: fit-content;
    height: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 18px;
    background-color: #0f0f15;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000000000000000000000;

    & > input:nth-of-type(-n + 2) {
      background-color: transparent;
      outline: 1px solid rgba(255, 255, 255, 0.208);
      padding: 4px;
      height: 30px;
      padding-left: 10px;
      border-radius: 8px;
      border: 0px;

      &:focus {
        outline: 1px solid rgba(255, 255, 255, 0.51);
      }
    }
  }

  .bookmarks__edit-section-svg-example {
    width: 68px;
    height: 68px;
    margin: 20px;
  }

  .bookmarks__edit-section-buttons-div {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 8px;

    & button {
      width: 100%;
      height: 34px;
      background-color: rgb(30, 70, 164);
      border-radius: 4px;
      border: 0px;

      &:first-child {
        background-color: rgba(114, 114, 114, 0);
        outline: 1px solid rgba(255, 255, 255, 0.208);
      }
    }
  }

  .bookmarks__color-native-input {
    position: absolute;
    top: calc(anchor(bottom) - 23px);
    left: calc(anchor(left) + 177px);
    position-anchor: --color-input;

    border: 0px;
    outline: 0px;
    width: 16px;
    height: 16px;
    padding: 0px;
    border-radius: 8px;
  }

  .bookmarks__blur {
    width: 100vw;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    backdrop-filter: blur(5px);
    z-index: 100000000000000000000;
  }

  .bookmarks__edit-section-close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: transparent;
    border: 0px;
    font-size: 20px;
    margin-top: 4px;
    color: rgb(116, 116, 116);
    margin-right: 12px;
  }

  .bookmarks__edit-section-title {
    margin-bottom: 16px;
    margin-top: 10px;
    color: rgb(255, 255, 255);
  }
</style>