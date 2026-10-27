import { bookmarks_colors_state } from "./bookmarks_colors.svelte";

export type post_data = [
  url: string,
  favicon: string,
  title: string,
  image: string | null,
  description: string | null,
  tags: string[],
  date: string,
];

export type bookmark_data = {
  post: post_data;
  color_id: number;
};

const saved =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("bookmarks") || "[]")
    : [];

export const bookmarks_state = $state<{ items: bookmark_data[] }>({
  items: saved,
});

export function is_bookmarked(post: post_data) {
  return bookmarks_state.items.some(
    (item) => item.post[2] === post[2] && item.post[1] === post[1],
  );
}

export function get_bookmark_color(post: post_data) {
  const bookmark = bookmarks_state.items.find(
    (item) => item.post[2] === post[2] && item.post[1] === post[1],
  );

  if (!bookmark) {
    return null;
  }

  return (
    bookmarks_colors_state.items.find((item) => item.id === bookmark.color_id)
      ?.color ?? null
  );
}

export function toggle_bookmarks(post: post_data, color_id: number) {
  const index = bookmarks_state.items.findIndex(
    (item) => item.post[2] === post[2] && item.post[1] === post[1],
  );

  if (index === -1) {
    bookmarks_state.items.push({
      post,
      color_id,
    });
  } else if (bookmarks_state.items[index].color_id === color_id) {
    bookmarks_state.items.splice(index, 1);
  } else {
    bookmarks_state.items[index].color_id = color_id;
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks_state.items));
}
