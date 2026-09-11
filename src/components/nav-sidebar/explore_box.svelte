<script lang="ts">
  let search_query = $state("");
  let { is_visible, tag_selected } = $props();

  const tags = [
    "Games",
    "Movies",
    "TV Shows",
    "Anime",
    "Manga",
    "Comics",
    "Music",
    "K-Pop",
    "Board Games",
    "RPG",
    "Streaming",
    "Cinema",
    "Theater",
    "Cosplay",
    "E-Sports",
    "Retro Gaming",
    "Technology",
    "Artificial Intelligence",
    "Programming",
    "Cybersecurity",
    "Software",
    "Hardware",
    "Space",
    "Astronomy",
    "Physics",
    "Biology",
    "Gadgets",
    "Web Development",
    "Crypto",
    "Robotics",
    "Data Science",
    "Math",
    "Lifestyle",
    "Fitness",
    "Yoga",
    "Mental Health",
    "Cooking",
    "Veganism",
    "Travel",
    "Fashion",
    "Beauty",
    "Skincare",
    "Interior Design",
    "Parenting",
    "Pets",
    "Gardening",
    "Outdoors",
    "Minimalism",
    "Art",
    "Digital Art",
    "Photography",
    "Graphic Design",
    "UI/UX",
    "Architecture",
    "Writing",
    "Poetry",
    "Literature",
    "DIY",
    "Crafting",
    "Illustration",
    "3D Modeling",
    "Animation",
    "Business",
    "Entrepreneurship",
    "Marketing",
    "Finance",
    "Investing",
    "Economics",
    "Politics",
    "History",
    "Philosophy",
    "Education",
    "Environment",
    "Human Rights",
    "News",
    "Work Life",
    "Sports",
    "Football",
    "Basketball",
    "Tennis",
    "Surfing",
    "Skateboarding",
    "Cycling",
    "Automotive",
    "Motorsports",
    "Fishing",
    "Chess",
    "Magic & Illusions",
    "Collectibles",
    "Antiques",
  ];

  let filtered_tags = $derived(
    tags.filter((tag) =>
      tag.toLowerCase().includes(search_query.trim().toLowerCase()),
    ),
  );
</script>

<div class="explore-box" style:display={!is_visible ? "none" : undefined}>
  <input
    placeholder="search for tags"
    class="explore-box__explore-input"
    type="search"
    bind:value={search_query}
  />

  {#each filtered_tags as tag}
    <button onclick={() => tag_selected(tag)}>{tag}</button>
  {/each}
</div>

<style lang="scss">
  .explore-box {
    width: 100%;
    flex: 1;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    position: relative;

    & button {
      margin-bottom: 8px;
      background-color: #181820;
      padding: 6px;
      border-radius: 6px;
      margin-right: 4px;
      border: 0px solid rgb(98, 98, 98);
      color: rgb(255, 255, 255);

      &:hover {
        scale: 1.02;
      }
    }

    &__explore-input {
      background-color: #181820;
      width: 100%;
      height: 32px;
      margin-bottom: 8px;
      border: 0px solid gray;
      padding-left: 8px;
      color: rgb(255, 255, 255);
      font-weight: 200;

      &:focus {
        border: 0px solid white;
        outline: 0px solid white;
      }
    }
  }
</style>
