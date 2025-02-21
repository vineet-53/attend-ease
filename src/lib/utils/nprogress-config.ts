//@ts-ignore
import NProgress from "nprogress";

NProgress.configure({
  minimum: 0.1, // Minimum progress percentage
  easing: "ease", // CSS easing for the transition
  speed: 500, // Speed of the progress bar
  showSpinner: false, // Whether to show the spinner
  trickle: true, // Whether to automatically increment
  trickleSpeed: 200, // How often to trickle/increment
  color: "#ffffff",
});
