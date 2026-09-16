<script lang="ts">

    let query = $state("")

</script> 
 
 
 
 
 <search class="search" >
    <input
    bind:value={query}
      class="search__input"
      type="search"
      placeholder="Search for websites"
    />
    <svg
      class="search__svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
      ></path>
    </svg>
    <button
      
      class="search__search-action-button"
      class:is-visible={query.trim() !== ""}
      aria-label="search button"

    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-right-icon lucide-chevron-right"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </button>
  </search>

  <style lang="scss">

    .search {

      box-sizing: border-box;
      width: 100%;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 0px;
      border-radius: 10px;
      background-color: #181820;
      overflow: hidden;
    

    &__input {
      border: 0px solid black;
      background-color: transparent;
      color: #ffffffb2;
      padding-left: 48px;
      padding-bottom: 2px;
      width: 100%;
      height: 100%;
      font-size: 0.95rem;

      &:focus {
        border: 0px solid white;
        outline: 0px solid white;
      }
    }
    

    &__search-action-button {
      height: 54px;
      display: none;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: 0px;
      
      width: 56px;

      & svg path{
        color: rgb(189, 189, 189);
      }

      &.is-visible {
        display: flex;
      }
      &:hover {
        background-color: #ffffff07;
      }
    }
    &__svg,  &__svg path{
      width: 18px;
      height: 18px;
      position: absolute;
      left: 16px;
      color: rgba(255, 255, 255, 0.295);
    }
    }
  </style>