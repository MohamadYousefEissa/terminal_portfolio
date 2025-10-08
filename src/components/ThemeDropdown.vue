<script setup lang="ts">
import { onMounted, useTemplateRef, ref, onBeforeMount, watch } from 'vue'

const popup = useTemplateRef('popup')
const openPopup = ref(false)
const radio = ref()

const setTheme = (val: string) => {
  document.documentElement.setAttribute('data-theme', val)
}

watch(radio, (val) => {
  window.localStorage.setItem('theme', val)
  setTheme(val)
})

onMounted(() => {
  window.addEventListener('click', (ev: Event) => {
    if (ev.target) {
      if (!popup.value?.contains(ev.target as HTMLElement)) {
        openPopup.value = false
      }
    }
  })
})

onBeforeMount(() => {
  const theme = window.localStorage.getItem('theme') || 'dark'
  setTheme(theme)
  radio.value = theme
})
</script>

<template>
  <div class="h-10 sm:h-0">
    <div class="theme-popup absolute right-6 z-10" ref="popup">
      <input type="radio" name="theme" id="classic" value="classic" v-model="radio" />
      <input type="radio" name="theme" id="dark" value="dark" v-model="radio" />
      <input type="radio" name="theme" id="light" value="light" v-model="radio" />
      <input type="radio" name="theme" id="hacker" value="hacker" v-model="radio" />
      <input type="checkbox" id="checkbox" v-model="openPopup" />
      <label for="checkbox" class="theme-popup__button">
        <span class="theme-popup__icons">
          <svg
            class="classic"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.5 2.52267C6.13332 2.64713 4.86254 3.27802 3.9372 4.29146C3.01186 5.3049 2.49882 6.62766 2.49882 8C2.49882 9.37234 3.01186 10.6951 3.9372 11.7085C4.86254 12.722 6.13332 13.3529 7.5 13.4773V2.52267ZM1.5 8C1.5 4.41 4.41 1.5 8 1.5C11.59 1.5 14.5 4.41 14.5 8C14.5 11.59 11.59 14.5 8 14.5C4.41 14.5 1.5 11.59 1.5 8Z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="dark"
          >
            <path
              fill="currentColor"
              d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="hacker"
          >
            <path
              fill="currentColor"
              d="M0 4.124q0-.305.06-.595l1.956 1.734l2.144-2.38L2.246 1.18c.259-.072.53-.114.812-.114a3.06 3.06 0 0 1 3.058 3.037v.021q0 .23-.033.45l2.385 2.112a6.7 6.7 0 0 0-2.013 2.54L3.982 7.037a3 3 0 0 1-.924.145A3.06 3.06 0 0 1 0 4.124m20.942 12.694q-.46.002-.88.129l-2.308-2.044a6.86 6.86 0 0 1-1.819 2.706l1.993 1.765a3 3 0 0 0-.044.502a3.06 3.06 0 0 0 3.935 2.929l-1.992-1.77l2.14-2.365l1.981 1.76q.051-.27.052-.554v-.026a3.057 3.057 0 0 0-3.058-3.032m-3.397-7.592l2.473-2.189c.292.093.601.145.924.145A3.06 3.06 0 0 0 23.94 3.53l-1.956 1.734l-2.144-2.38l1.914-1.703a3 3 0 0 0-.812-.114a3.06 3.06 0 0 0-3.058 3.037v.021q0 .23.033.45l-2.385 2.112a6.7 6.7 0 0 1 2.013 2.54zm-11.3 5.677l-2.307 2.044A3.057 3.057 0 0 0 0 19.85v.026q0 .284.052.554l1.982-1.76l2.14 2.365l-1.993 1.77a3.06 3.06 0 0 0 3.935-2.929a3 3 0 0 0-.044-.502l1.993-1.765a6.86 6.86 0 0 1-1.82-2.706m8.971 2.657a1.076 1.076 0 1 1-1.961.424h-.192a1.076 1.076 0 1 1-2.127 0h-.15A1.105 1.105 0 0 1 9.7 19.23c-.604 0-1.094-.5-1.094-1.115c0-.21.057-.405.156-.572c-1.493-1.142-2.474-3.051-2.474-5.213c0-3.497 2.559-6.332 5.713-6.332s5.713 2.835 5.713 6.332c0 2.173-.991 4.091-2.497 5.231zm-4.194-5.914a2 2 0 0 0-.559-.66a1.8 1.8 0 0 0-.918-.264a1.5 1.5 0 0 0-.319.036c-.405.05-.747.327-.983.647c-.207.257-.368.569-.372.905c-.032.278.024.556.075.828c.066.322.293.584.55.774c.119.095.29.226.44.116c.1-.134.016-.33.107-.478a.5.5 0 0 1 .258-.326c.263-.132.527-.262.808-.355c.228-.067.416-.219.61-.349c.255-.197.424-.558.303-.874m.996 2.325c-.279-.007-.63 1.237-.574 1.78c.175.72.237-.505.574-.506c.323.014.275 1.255.53.504c.078-.5-.224-1.77-.53-1.778m4.036-.833c.051-.272.107-.55.075-.828c-.004-.336-.165-.648-.372-.905c-.236-.32-.578-.596-.983-.647a1.5 1.5 0 0 0-.319-.036c-.32-.001-.644.1-.918.264c-.235.171-.42.406-.559.66c-.121.316.048.677.303.874c.194.13.382.282.61.35c.28.092.545.222.808.354a.5.5 0 0 1 .258.326c.091.147.007.344.106.478c.151.11.322-.021.44-.116c.258-.19.485-.452.551-.774"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="sun"
          >
            <g fill="none">
              <g fill="currentColor" clip-path="url(#SVGXv8lpc2Y)">
                <path
                  d="M12 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1M0 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1m21-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm-8 10a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0zm-6.657-3.343a1 1 0 0 1 0 1.414L4.93 20.485a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0M20.485 3.515a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0m-16.97 0a1 1 0 0 1 1.414 0l1.414 1.414A1 1 0 1 1 4.93 6.343L3.515 4.93a1 1 0 0 1 0-1.414m14.142 14.141a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414M5 12a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
                />
              </g>
              <defs>
                <clipPath id="SVGXv8lpc2Y"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath>
              </defs>
            </g>
          </svg>
        </span>
        Theme
      </label>
      <div class="theme-popup__list-container">
        <ul class="theme-popup__list">
          <li>
            <label for="classic">
              <span class="theme-popup__icons">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 2.52267C6.13332 2.64713 4.86254 3.27802 3.9372 4.29146C3.01186 5.3049 2.49882 6.62766 2.49882 8C2.49882 9.37234 3.01186 10.6951 3.9372 11.7085C4.86254 12.722 6.13332 13.3529 7.5 13.4773V2.52267ZM1.5 8C1.5 4.41 4.41 1.5 8 1.5C11.59 1.5 14.5 4.41 14.5 8C14.5 11.59 11.59 14.5 8 14.5C4.41 14.5 1.5 11.59 1.5 8Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span> Classic </span>
            </label>
          </li>
          <li>
            <label for="dark">
              <span class="theme-popup__icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981"
                  />
                </svg>
              </span>
              <span> Dark </span>
            </label>
          </li>
          <li>
            <label for="light">
              <span class="theme-popup__icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none">
                    <g fill="currentColor" clip-path="url(#SVGXv8lpc2Y)">
                      <path
                        d="M12 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1M0 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1m21-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm-8 10a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0zm-6.657-3.343a1 1 0 0 1 0 1.414L4.93 20.485a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0M20.485 3.515a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0m-16.97 0a1 1 0 0 1 1.414 0l1.414 1.414A1 1 0 1 1 4.93 6.343L3.515 4.93a1 1 0 0 1 0-1.414m14.142 14.141a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414M5 12a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
                      />
                    </g>
                    <defs>
                      <clipPath id="SVGXv8lpc2Y"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath>
                    </defs>
                  </g>
                </svg>
              </span>
              <span> Light </span>
            </label>
          </li>
          <li>
            <label for="hacker">
              <span class="theme-popup__icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M0 4.124q0-.305.06-.595l1.956 1.734l2.144-2.38L2.246 1.18c.259-.072.53-.114.812-.114a3.06 3.06 0 0 1 3.058 3.037v.021q0 .23-.033.45l2.385 2.112a6.7 6.7 0 0 0-2.013 2.54L3.982 7.037a3 3 0 0 1-.924.145A3.06 3.06 0 0 1 0 4.124m20.942 12.694q-.46.002-.88.129l-2.308-2.044a6.86 6.86 0 0 1-1.819 2.706l1.993 1.765a3 3 0 0 0-.044.502a3.06 3.06 0 0 0 3.935 2.929l-1.992-1.77l2.14-2.365l1.981 1.76q.051-.27.052-.554v-.026a3.057 3.057 0 0 0-3.058-3.032m-3.397-7.592l2.473-2.189c.292.093.601.145.924.145A3.06 3.06 0 0 0 23.94 3.53l-1.956 1.734l-2.144-2.38l1.914-1.703a3 3 0 0 0-.812-.114a3.06 3.06 0 0 0-3.058 3.037v.021q0 .23.033.45l-2.385 2.112a6.7 6.7 0 0 1 2.013 2.54zm-11.3 5.677l-2.307 2.044A3.057 3.057 0 0 0 0 19.85v.026q0 .284.052.554l1.982-1.76l2.14 2.365l-1.993 1.77a3.06 3.06 0 0 0 3.935-2.929a3 3 0 0 0-.044-.502l1.993-1.765a6.86 6.86 0 0 1-1.82-2.706m8.971 2.657a1.076 1.076 0 1 1-1.961.424h-.192a1.076 1.076 0 1 1-2.127 0h-.15A1.105 1.105 0 0 1 9.7 19.23c-.604 0-1.094-.5-1.094-1.115c0-.21.057-.405.156-.572c-1.493-1.142-2.474-3.051-2.474-5.213c0-3.497 2.559-6.332 5.713-6.332s5.713 2.835 5.713 6.332c0 2.173-.991 4.091-2.497 5.231zm-4.194-5.914a2 2 0 0 0-.559-.66a1.8 1.8 0 0 0-.918-.264a1.5 1.5 0 0 0-.319.036c-.405.05-.747.327-.983.647c-.207.257-.368.569-.372.905c-.032.278.024.556.075.828c.066.322.293.584.55.774c.119.095.29.226.44.116c.1-.134.016-.33.107-.478a.5.5 0 0 1 .258-.326c.263-.132.527-.262.808-.355c.228-.067.416-.219.61-.349c.255-.197.424-.558.303-.874m.996 2.325c-.279-.007-.63 1.237-.574 1.78c.175.72.237-.505.574-.506c.323.014.275 1.255.53.504c.078-.5-.224-1.77-.53-1.778m4.036-.833c.051-.272.107-.55.075-.828c-.004-.336-.165-.648-.372-.905c-.236-.32-.578-.596-.983-.647a1.5 1.5 0 0 0-.319-.036c-.32-.001-.644.1-.918.264c-.235.171-.42.406-.559.66c-.121.316.048.677.303.874c.194.13.382.282.61.35c.28.092.545.222.808.354a.5.5 0 0 1 .258.326c.091.147.007.344.106.478c.151.11.322-.021.44-.116c.258-.19.485-.452.551-.774"
                  />
                </svg>
              </span>
              <span> Hacker </span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-popup {
  /* total */
  /* --total_text_color: #e0e0e0; */
  --total_font_family: Menlo, Roboto Mono, monospace;
  /* button */
  --btn_bg: #79797933;
  /* --btn_bg: #3a3a3a; */
  --btn_padding: 0.5em;
  --btn_height: 2em;
  --btn_border_radius: 0.3125em;
  --btn_outline_width: 0.0625em;
  --btn_outline_color: #a0a0a0;
  --btn_outline_offset: 0.0625em;
  --btn_gap: 0.3125em;
  /* list */
  --list_padding: 0.5em;
  --list_bg: var(--btn_bg);
  --list_border_radius: var(--btn_border_radius);
  --list_gap: 0.1875em;
  --list_btn_active: #79797948;
  --list_btn_border_radius: 0.25em;
  --list_btn_padding: 0.35em 1em;
  --list_btn_gap: 0.4375em;
  --list_btn_outline_width: 0.0625em;
  --list_btn_outline_color: rgb(212, 210, 210);
  --list_offset: 0.35em;
  --list_btn_font_size: 14px;
}

.theme-popup__button .theme-popup__icons svg,
#dark,
#light,
#classic,
#hacker,
#checkbox {
  display: none;
}
.theme-popup__list-container {
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}

.theme-popup {
  color: var(--color-main);
  font-family: var(--total_font_family);
  user-select: none;
}

.theme-popup__list-container {
  position: absolute;
  right: 0;
  margin-top: 5px;
}

.theme-popup__icons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.theme-popup__button {
  line-height: var(--btn_height);
  background-color: var(--btn_bg);
  padding: 0 var(--btn_padding);
  display: flex;
  align-items: center;
  column-gap: var(--btn_gap);
  border-radius: var(--btn_border_radius);
  border: none;
  color: inherit;
  font-family: inherit;
  outline: none;
}

.theme-popup__list {
  margin: 0;
  list-style-type: none;
  padding: var(--list_padding);
  border-radius: var(--list_border_radius);
  background-color: var(--btn_bg);
  display: flex;
  flex-direction: column;
  row-gap: var(--list_gap);
}

.theme-popup__list label {
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: var(--list_btn_gap);
  padding: var(--list_btn_padding);
  border-radius: var(--list_btn_border_radius);
  white-space: nowrap;
}

.theme-popup__list label span {
  font-size: var(--list_btn_font_size);
}

/* actions */

/* #checkbox:checked ~ .theme-popup__button {
  outline: var(--btn_outline_width) solid var(--btn_outline_color);
  outline-offset: var(--btn_outline_offset);
} */

#checkbox:checked ~ .theme-popup__list-container {
  visibility: visible;
  opacity: 1;
}

#classic:checked ~ .theme-popup__list-container label[for='classic'],
#dark:checked ~ .theme-popup__list-container label[for='dark'],
#light:checked ~ .theme-popup__list-container label[for='light'],
#hacker:checked ~ .theme-popup__list-container label[for='hacker'] {
  background-color: var(--list_btn_active);
  /* outline: var(--list_btn_outline_width) solid var(--list_btn_outline_color); */
}

#classic:checked ~ label svg.classic,
#dark:checked ~ label svg.dark,
#light:checked ~ label svg.sun,
#hacker:checked ~ label svg.hacker {
  display: block;
}
</style>
