// bring in your global constants in as soon as possible and be consistant so you can call on them regularly
const windowHeight = window.innerHeight;

function lerpColor(color1, color2, ratio) {
    const result = [];
    for (let i = 0; i < 3; i++) {
        result.push(Math.round(color1[i] + ratio * (color2[i] - color1[i])));
    }
    return result;
}

document.addEventListener("scroll", function() {
    const scrollTop = document.documentElement.scrollTop;
    const skyratio = scrollTop / (document.body.scrollHeight - window.innerHeight);

    const nighttime = [1, 5, 28];
    const sunrise = [83, 148, 252];

    const skyColor = lerpColor(nighttime, sunrise, skyratio);

    sky.style.backgroundColor = `rgb(${skyColor[0]}, ${skyColor[1]}, ${skyColor[2]})`;
});

//what fires SUN POSITION? any scroll past 0? like this:
// window.onscroll = function() {
//       scrollToCenter();
//     };
// but that will just lock it in place... try it out if that doesn't make sense. thus, you need to set your limits as if else conditions like this:

let isScrolling = false;

document.addEventListener("scroll", function () {
  if (!isScrolling) {
    scrollingParameters();
  }
});

function scrollingParameters() {
  const scrollTop = document.documentElement.scrollTop;

  if (scrollTop > 0 && scrollTop <= window.innerHeight * 0.5) {
    scrollToCenter();
  } else if (scrollTop > window.innerHeight * 0.5 && scrollTop <= window.innerHeight) {
    spotifyLogo();
  }
}

function scrollToCenter() {
  isScrolling = true;
  window.scrollTo({
    top: windowHeight * 0.5,
    behavior: "smooth",
  });

  // Set a timeout to reset isScrolling after the smooth scroll is completed
  setTimeout(() => {
    isScrolling = false;
  }, 1000); // Adjust the timeout based on the duration of the smooth scroll
}

function spotifyLogo() {
  isScrolling = true;
  const spotifyLogo = document.getElementById("spotify-logo");
  window.scrollTo({
    top: windowHeight * 0.75,
    behavior: "smooth",
  });

  // Set a timeout to reset isScrolling after the smooth scroll is completed
  setTimeout(() => {
    spotifyLogo.style.opacity = 1;
    spotifyLogo.style.top = "25vh";
    isScrolling = false;
  }, 500); // Adjust the timeout based on the duration of the smooth scroll
}