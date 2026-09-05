export type post_data = [
  a: string,
  f: string,
  t: string,
  i: string | null,
  d: string | null,
  t1: string | null,
  t2: string | null,
  t3: string | null,
  c: string,
];

const saved =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("bookmarks") || "[]")
    : [];

export const bookmarks_state = $state<{ items: post_data[] }>({
  items: saved,
});

export function is_bookmarked(post: post_data) {
  return bookmarks_state.items.some(
    (item) => item[2] === post[2] && item[1] === post[1],
  );
}

export function toggle_bookmarks(post: post_data) {
  const exists = is_bookmarked(post);

  if (exists) {
    bookmarks_state.items = bookmarks_state.items.filter(
      (item) => !(item[2] === post[2] && item[1] === post[1]),
    );
  } else {
    bookmarks_state.items.push(post);
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks_state.items));
}
