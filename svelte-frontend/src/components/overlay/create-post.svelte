    <section id="new-post" class="new-post">
      <h1 class="settings__title">Create post</h1>

      <input
        class="new-post__url-input"
        type="url"
        placeholder="Paste your url here..."
      />

      <label class="new-post__label">
        <input
          type="radio"
          name="image-or-description"
          value="image"
          id="post-image-input"
        />
        add an image
      </label>

      <label class="new-post__label">
        <input
          type="radio"
          name="image-or-description"
          value="description"
          id="post-description-input"
        />
        add a description
      </label>

      <div class="new-post__verify-div">
        <button class="new-post__verify-button">Verify</button>
      </div>

      <article class="post new-post__article">
        <div class="post__profile">
          <div class="post__profile-left">
            <img src="imgs/1.jpg" class="post__favicon" />
            <a>doritos.com</a>
          </div>
          <button class="post__subscribe">subscribe</button>
        </div>
        <h2 class="post__title">Título teste para W3aver</h2>
        <img
          src="https://anthonysturmer.github.io/anthonysturmer/img.jpg"
          class="post__img"
        />
        <div class="post__bottom">
          <time class="post__data">2y ago</time>
          <button class="post__bookmark-button">
            <svg
              class="post__bookmark-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
            </svg>
          </button>
        </div>
      </article>

      <label class="new-post__label new-post__agreement" id="kkkkk">
        <input type="checkbox" value="image" /> Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </label>

      <div class="new-post__publish-div">
        <button class="new-post__publish-button">Publish your post</button>
      </div>
    </section>


<style>

  
.new-post {
  width: 92%;
  max-width: 580px;
  height: fit-content;
  background-color: #0f0f15;
  display: flex;
  gap: 40px;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-start;
  padding-bottom: 100px;
  padding-top: 100px;
}
  .new-post__title {
    font-size: 2rem;
    font-weight: 680;
    width: 100%;
    padding-bottom: 30px;
  }

  .new-post__label {
    color: #b0b0b0;
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
  }

  .new-post__verify-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    color: #666666;
  }

  .new-post__verify-button {
    width: fit-content;
    padding: 14px;
    padding-left: 48px;
    padding-right: 48px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.208);
    color: white;
  }

  .new-post__publish-button {
    width: 180px;
    height: 48px;
    background-color: #ffffff;
    border-radius: 50px;
    border: 0px solid white;
    color: black;
  }

  .new-post__publish-div {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 30px;
    color: #666666;
  }

  .new-post__agreement {
    border: 1px solid rgba(255, 255, 255, 0.208);
    padding: 10px;
    border-radius: 5px;
    line-height: 24px;
  }

  .new-post__article {
    border: 1px solid rgba(255, 255, 255, 0.208);
    width: 100%;
    gap: 10px;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .new-post__url-input {
    width: 100%;
    text-align: start;
    font-size: 1rem;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.208);
    color: white;
    padding: 14px;
  }

  .new-post__url-input:focus {
    outline: 1px solid rgb(142, 142, 142);
  }




  
.post {
  width: 100%;
  gap: 10px;
  height: fit-content;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.208);
  border-bottom: 1px solid rgba(255, 255, 255, 0.208);
  box-sizing: border-box;
}


.post__profile {
  border: 1px solid rgba(255, 255, 255, 0.201);
  border-radius: 40px;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.post__favicon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgb(119, 127, 135);
  border: 1px solid rgba(255, 255, 255, 0.201);
}

.post__subscribe {
  height: 20px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 0;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.post__subscribe-check {
  width: 16px;
  margin-right: 2px;
  stroke-width: 2.5px;
}

.post__subscribe-svg {
  width: 16px;
  margin-right: 2px;
  stroke-width: 2.5px;
}

.post__title {
  width: 100%;
  margin-bottom: 5px;
  height: fit-content;
  max-height: 80px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3em;
  letter-spacing: 0.02em;
}

.post__description {
  width: 100%;
  font-size: 0.9rem;
  color: #ffffffae;
  margin-top: -5px;
  font-weight: 500;
  line-height: 1.3em;
  letter-spacing: 0.02em;
}

.post__img {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.253);
  aspect-ratio: 16 / 12;
}

.post__data {
  font-size: 0.8rem;
  color: rgb(177, 177, 177);
  letter-spacing: 1px;
  padding-left: 4px;
}

.post__bottom {
  width: 100%;
  background-color: rgba(102, 20, 157, 0);
  color: rgba(255, 255, 255, 0.484);
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  padding-top: 2px;
  font-size: 0.9rem;
}

.post__bookmark-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white;
  border: 0;
  margin-right: -8px;
  cursor: pointer;
}

.post__bookmark-button.active path {
  fill: rgb(255, 255, 255);
  stroke: currentColor;
}

.post__bookmark-button:hover {
  scale: 1.1;
}

.post__bookmark-svg {
  color: #ffffff;
  width: 20px;
  height: 20px;
  stroke-width: 1.4px;
  stroke: currentColor;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.post__profile-left {
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: transparent;
}

.post__profile-name {
  cursor: pointer;
}

</style>