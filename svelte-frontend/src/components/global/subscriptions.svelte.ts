const saved =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("subscriptions") || "[]")
    : [];

export const subscriptions_state = $state<{ items: string[] }>({
  items: saved,
});

export function is_subscribed(author_name: string) {
  return subscriptions_state.items.includes(author_name);
}

export function toggle_subscriptions(author_name: string) {
  const exists = is_subscribed(author_name);

  if (exists) {
    subscriptions_state.items = subscriptions_state.items.filter(
      (name) => name !== author_name,
    );
  } else {
    subscriptions_state.items.push(author_name);
  }

  localStorage.setItem(
    "subscriptions",
    JSON.stringify(subscriptions_state.items),
  );
}
