const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
let contents = [ {
  text: 'Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth',
  verse: "2 Timothy 2:15"
},{
  text: "Zeal for Your house has eaten me up",
  verse: "Psalm 69:9"
}, {
  text: "He will sit as a refiner and purifier of silver; he will purify the Levites and refine them like gold and silver. Then the Lord will have men who will bring offerings in righteousness.",
  verse: "Malachi 3: 3"
}
];
for (let i = 0; i < contents.length; i++) {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `<div>${contents[i].text}</div><div>${contents[i].verse}</div>`;
  if (contents[i].text.length > 52) slide.classList.add('slide-small');
  slides.appendChild(slide);
}
const totalSlides = contents.length;
function updateSlider() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function goToSlide(index) {
  currentSlide = index;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if(currentSlide >= totalSlides) currentSlide = 0;
  updateSlider();
}
function prev() {
  goToSlide(currentSlide - 1);
}
function next() {
  goToSlide(currentSlide + 1);
}
prevBtn.onclick = () => prev()
nextBtn.onclick = () => next()

