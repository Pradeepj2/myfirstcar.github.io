const box = document.querySelector('.flot-box');
const allImage = document.querySelectorAll('.imgContainer');
const animText = document.querySelectorAll('.slogen');
const parallaxes = document.querySelectorAll('.parallax')



let firstTranslate = 30;
let firstRotate = 45;
var cumulativeOffset = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

// ***************Images zoomout********************

const showElements = (amount, elements, animation) => {
  elements.forEach((element, i) => {
    const elemOffset = cumulativeOffset(element);
    if (amount + window.innerHeight > elemOffset.top + element.offsetHeight) {
      element.classList.add(animation);  
    }
  })
};

//   **************div floating*************
const cards = document.querySelectorAll('.floating');
let scrollAmount = 0;
let oldScrollAmount = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  cards.forEach(card => {
    if (scrollTop + window.innerHeight > cumulativeOffset(card).top +  card.offsetHeight) {
      if (scrollTop > oldScrollAmount) {
        scrollAmount--;  
      } else if (scrollTop < oldScrollAmount) {
        scrollAmount++;
      }
      card.style.transform = `translateY(${scrollAmount * 0.9}px)`;
    }  
  });
  oldScrollAmount = scrollTop;
});

// *********************  function **********************


const calculateRangeValue = (oldMin , oldMax , newMin , newMax , oldValue) => {
    const oldRange = oldMax - oldMin;
    const newRange = newMax - newMin;
    return ((oldValue - oldMin) * newRange / oldRange) + newMin;
}

showElements(0, allImage,'animation');
showElements(0, animText,'visible');


    //***********  trinangle div  **************\


window.addEventListener('scroll',() => {
    const amount = window.scrollY;
    box.style.transform = `translateY(${firstTranslate + amount/1.5}px) rotate(${firstRotate + amount/30}deg)` ;

       //***********      **************\

showElements(amount, allImage,'animation');
showElements(amount,animText,'visible');


// ***************bannerimg float*****************

parallaxes.forEach((parallax , i) => {
   if((amount + window.innerHeight / 2) > parallax.offsetTop ){
       const oldMin = (parallax.offsetTop) < (window.innerHeight / 2)?parallax.offsetTop :parallax.offsetTop - window.innerHeight /2;
          
        const oldMax = oldMin + parallax.offsetHeight;
        const Yposition = calculateRangeValue(oldMin, oldMax, 0,-200,amount);
        parallax.style.backgroundPosition = `center ${Yposition}px`; 
   } 
});
});
// ***************************************************************************


