type bookmark_color = {
  id: number;
  color: string;
  name: string;
}

const default_bookmark_colors: bookmark_color[] = [
  {
    id: 1,
    color: "#D0445E",
    name: "Red",
  },
  {
    id: 2,
    color: "#D0873F",
    name: "Orange",
  },
  {
    id: 3,
    color: "#D0B73F",
    name: "Yellow",
  },
  {
    id: 4,
    color: "#20C988",
    name: "Green",
  },
  {
    id: 5,
    color: "#22AADC",
    name: "Blue",
  },
  {
    id: 6,
    color: "#4A69DC",
    name: "Indigo",
  },
  {
    id: 7,
    color: "#8D44DC",
    name: "Violet",
  },
];

let initial_colors: bookmark_color[];

const saved_colors =
  typeof window !== "undefined"
    ? localStorage.getItem("bookmarks_colors")
    : null;


if (!saved_colors) {
  initial_colors = default_bookmark_colors;
} else {
  try {
    initial_colors = JSON.parse(saved_colors);
  } catch {
    initial_colors = default_bookmark_colors;
  }
}

export const bookmarks_colors_state = $state<{
  items: bookmark_color[];
}>({
  items: initial_colors,
});

  
export function add_bookmark_color(color: string, name: string) {

  color = color.toUpperCase();

  const color_already_exists = bookmarks_colors_state.items.some(
    (item) => item.color.toUpperCase() === color
  );

  if (color_already_exists) {
    return false;
  }

  bookmarks_colors_state.items.push({
    id: generate_bookmark_color_id(),
    color,
    name,
  });

  localStorage.setItem(
    "bookmarks_colors",
    JSON.stringify(bookmarks_colors_state.items)
  );

  return true;
}



export function remove_bookmark_color(id: number) {
  const index = bookmarks_colors_state.items.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return false;
  }

  bookmarks_colors_state.items.splice(index, 1);

  localStorage.setItem(
    "bookmarks_colors",
    JSON.stringify(bookmarks_colors_state.items)
  );

  return true;
}



export function edit_bookmark_color(
  id: number,
  new_color: string,
  new_name: string
) {

  new_color = new_color.toUpperCase();

  const current_item = bookmarks_colors_state.items.find(
    (item) => item.id === id
  );

  if (!current_item) {
    return false;
  }

  const color_already_exists = 
  
  bookmarks_colors_state.items.some(
    (item) =>
      item !== current_item &&
      item.color.toUpperCase() === new_color
  );

  if (color_already_exists) {
    return false;
  }

  current_item.color = new_color;
  current_item.name = new_name;

  localStorage.setItem(
    "bookmarks_colors",
    JSON.stringify(bookmarks_colors_state.items)
  );

  return true;
}

function generate_bookmark_color_id() {
  let id: number;

  do {
    id = Math.floor(Math.random() * 1_000_000_000);
  } while (
    bookmarks_colors_state.items.some((item) => item.id === id)
  );

  return id;
}