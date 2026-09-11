const saved =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("hidden") || "[]")
    : [];

export const hidden_state = $state<{ items: string[] }>({
  items: saved,
});

export function is_hidden(author_name: string) {
  return hidden_state.items.includes(author_name);
}

function persists() {
  if (typeof window !== undefined) {
    localStorage.setItem("hidden", JSON.stringify(hidden_state.items));
  }
}

export function show_profile(author_name: string) {
  if (is_hidden(author_name)) {
    hidden_state.items = hidden_state.items.filter(
      (name) => name !== author_name,
    );

    persists();
  }
}

export function hide_profile(author_name: string) {
  if (!is_hidden(author_name)) {
    hidden_state.items.push(author_name);
    persists();
  }
}
