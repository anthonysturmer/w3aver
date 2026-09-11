<script lang="ts">


import { onMount } from "svelte";

    interface Ad {
        title: string;
        text: string;
        src: string;
    }

  let ads = $state<Ad[]>([]);
  let widget_content_index = $state(0);

  function shuffle(array: Ad[]) {
    const temporaryArray = [...array];

    for (let i = temporaryArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temporaryArray[i], temporaryArray[j]] = [
        temporaryArray[j],
        temporaryArray[i],
      ];
    }

    ads = temporaryArray;
  }
  onMount(async () => {
      try {
        const response = await fetch("/ads/ads.json");
        const response_json = await response.json();

        shuffle(response_json);
      } catch (error) {
        console.log(error);
      }
    });


  $effect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {

        let new_index = widget_content_index + 1;
        
        if (new_index >= ads.length) {
            new_index = 0;
        }
          
          widget_content_index = new_index;
  
      },
      10 * 60 * 1000,
    );

    return () => clearInterval(interval);
  });

  function handle_left_click() {
    if (ads.length === 0) return;


      let new_index = widget_content_index - 1;
      if (new_index < 0) {
         new_index = ads.length - 1;
      }
        widget_content_index = new_index
    };

    function handle_right_click() {
    if (ads.length === 0) return;

      let new_index = widget_content_index + 1;
      if (new_index >= ads.length) {
         new_index = 0
      }
        widget_content_index = new_index
    };

  const current_ad = $derived(ads[widget_content_index] || ads[0]);

</script>


<section class="widget" id="widget">
    <div></div>

    {#if current_ad}

    <div class="widget__ad">
    <p id="widget-title" class="widget__ad-title">
        {current_ad.title}
    </p>
    <img loading="lazy" id="widget-img" class="widget__ad-img" src={current_ad.src} />
    <p id="widget-text" class="widget__ad-text">
        {current_ad.text}
    </p>
    </div>

    <div class="widget__index">
    <button
        id="widget-left-buttom"
        class="widget__left-arrow"
        onclick={handle_left_click}
    >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-left-icon lucide-chevron-left"
        >
        <path d="m15 18-6-6 6-6" />
        </svg>
    </button>
    <div class="widget__dots" id="widget-dots">
        {#each ads as ad, i (i)}
            
        <p style:color={i === widget_content_index ? "white" : "gray"}
        title="{ad.title}"
        >
            .
        </p>
        {/each}

    </div>
    <button
        id="widget-right-buttom"
        class="widget__right-arrow"
        onclick={handle_right_click}
    >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-right-icon lucide-chevron-right"
        >
        <path d="m9 18 6-6-6-6" />
        </svg>
    </button>
    </div>

    {/if}

    <div></div>
</section>

<style>
    
.widget {
  width: 100%;
  border-radius: 10px;
  background-color: #181820;
  flex: 1;
  max-height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: relative;
}
  .widget__ad {
    min-height: 74%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 74%;
  }

  .widget__ad-title {
    letter-spacing: 1px;
    font-weight: 800;
    font-size: 1rem;
    width: 200px;
    text-align: center;
    line-height: 1.65em;
  }

  .widget__ad-img {
    width: 134px;
    margin-top: -5px;
    margin-bottom: -10px;
    opacity: 0.95;
  }

.widget__ad-text {
    width: 200px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.6em;
    color: #ffffffae;
  }

  .widget__index {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: #666666;
    margin-bottom: -24px;
  }

  .widget__dots {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 20px;
    padding-bottom: 6px;
    
  }

  .widget__left-arrow {
    background-color: transparent;
    border: 0px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -8px;
    color: #515151;
    margin-right: 20px;
    cursor: pointer;
  }

  .widget__left-arrow:hover {
    color: white;
    scale: 1.05;
  }

  .widget__right-arrow {
    border: 0px solid white;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -8px;
    color: #515151;
    margin-left: 20px;
    cursor: pointer;
  }

  .widget__right-arrow:hover {
    color: white;
    scale: 1.05;
  }

</style>