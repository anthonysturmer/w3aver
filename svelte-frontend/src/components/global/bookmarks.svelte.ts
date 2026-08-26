export interface post_data {
  favicon: string;
  autor: string;
  title: string;
  img?: string;
  text?: string;
  data: string;
}

const saved =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("bookmarks") || "[]")
    : [];

export const bookmarks_state = $state<{ items: post_data[] }>({
  items: saved,
});

export function is_bookmarked(post: post_data) {
  return bookmarks_state.items.some(
    (item) => item.title === post.title && item.autor === post.autor,
  );
}

export function toggle_bookmarks(post: post_data) {
  const exists = is_bookmarked(post);

  if (exists) {
    bookmarks_state.items = bookmarks_state.items.filter(
      (item: any) => !(item.title === post.title && item.autor === post.autor),
    );
  } else {
    bookmarks_state.items.push(post);
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks_state.items));
}
