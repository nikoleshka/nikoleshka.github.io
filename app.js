const slider = document.querySelector(".slider");
const arrow = document.querySelectorAll(".clients-wrapper i");
const firstClient = slider.querySelector(".client").offsetWidth;
const sliderChildren = [...slider.children];

let isDragging = false,
  startX,
  startScrollleft;

let clientPerView = Math.round(slider.offsetWidth / firstClient);
sliderChildren
  .slice(-clientPerView)
  .reverse()
  .forEach((client) => {
    slider.insertAdjacentHTML("afterbegin", client.outerHTML);
  });
sliderChildren
  .slice(0, clientPerView)
  .reverse()
  .forEach((client) => {
    slider.insertAdjacentHTML("beforeend", client.outerHTML);
  });

arrow.forEach((btn) => {
  btn.addEventListener("click", () => {
    slider.scrollLeft += btn.id === "left" ? -firstClient : firstClient;
  });
});

const StartDrag = (e) => {
  isDragging = true;
  slider.classList.add("dragging");
  startX = e.pageX;
  startScrollleft = slider.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  slider.scrollLeft = startScrollleft - (e.pageX - startX);
};
const stopDrag = () => {
  isDragging = false;
  slider.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (slider.scrollLeft === 0) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
    slider.classList.remove("no-transition");
  } else if (
    Math.ceil(slider.scrollLeft) ===
    slider.scrollWidth - slider.offsetWidth
  ) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.scrollWidth;
    slider.classList.remove("no-transition");
  }
};
slider.addEventListener("mousedown", StartDrag);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", stopDrag);
slider.addEventListener("scroll", infiniteScroll);
