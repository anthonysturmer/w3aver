const saved =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("hidden") || "[]")
    : [];

export const hidden_state = $state<{ items: string[] }>({
  items: saved,
});

function get_hostname(url: string) {
  return new URL(url).hostname;
}

function persists() {
  if (typeof window !== "undefined") {
    localStorage.setItem("hidden", JSON.stringify(hidden_state.items));
  }
}

export function is_hidden(url: string) {
  const hostname = get_hostname(url);
  return hidden_state.items.includes(hostname);
}

export function hide_profile(url: string) {
  const hostname = get_hostname(url);

  if (!is_hidden(url)) {
    hidden_state.items.push(hostname);
    persists();
  }
}

export function show_profile(hostname: string) {
  if (hidden_state.items.includes(hostname)) {
    hidden_state.items = hidden_state.items.filter((name) => name !== hostname);

    persists();
  }
}
