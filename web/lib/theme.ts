/** The appearance override's storage key and the script that applies it before first paint (merged spec 9.10, 4.6). */
export const THEME_KEY = "cofile-theme";
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
