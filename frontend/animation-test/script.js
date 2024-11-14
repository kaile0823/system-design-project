if ("IntersectionObserver" in window) {
  // Detect when animation should be triggered
  const trigger = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const dataTarget = entry.target;
        dataTarget.classList.add("visible");
        observer.unobserve(dataTarget);
      }
    });
  };

  // Configure the observer
  const options = {
    root: null,
    threshold: 0.35
  };

  // Create the animation observer
  const myObserver = new IntersectionObserver(trigger, options);
  const myAnimate = document.querySelectorAll(".animate");
  myAnimate.forEach((animate) => myObserver.observe(animate));
}


const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);


const startScroll = 3800; // Start of the animation range (in pixels)
const endScroll = 4004;   // End of the animation range (in pixels)
const animationElement = document.querySelector('#image-track');

// Function to calculate percentage and run animation
function animateOnScroll(scrollPercentage) {
  console.log("Scroll percentage:", scrollPercentage);
  track.animate({
    transform: `translate(${scrollPercentage}%, 0%)`
  }, { duration: 100, fill: "forwards" });
}

let previousScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Check if the current scroll position is within the defined range
  if (scrollY >= startScroll && scrollY <= endScroll) {
    window.scrollTo(0, previousScrollY);
    let scrollPercentage = -100 * (scrollY - startScroll) / (endScroll - startScroll);
    scrollPercentage = Math.max(Math.min(scrollPercentage, 0), -100);
    animateOnScroll(scrollPercentage);

    previousScrollY = scrollY;
  }else {
    // Update previousScrollY if outside the range to allow natural scrolling
    previousScrollY = scrollY;
  }
  // else if (scrollY < startScroll) {
  //   // Reset animation if we are above the range
  //   animationElement.style.transform = 'scale(1)';
  // }
});


const element = document.querySelector('#image-track');
console.log("Height:", element.offsetHeight);
console.log("Position from top:", element.getBoundingClientRect().top + window.scrollY);