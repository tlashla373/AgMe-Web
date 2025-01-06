document.getElementById('menu-toggle').addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
    event.stopPropagation(); // Prevents this click event from propagating to the document
});



// Add a click listener to the document to close the menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.getElementById('menu-toggle');

    // Close the menu if the click is outside of the toggle button or nav menu
    
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});


//toggle-profile//

let subMenu = document.getElementById("subMenu");
        
function toggleProfile(){
    subMenu.classList.toggle("open-menu");
}



/** HERO */


let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');

thumbnail.appendChild(thumbnailItems[0]);

// Function for next button
nextBtn.onclick = function () {
    moveSlider('next');
};

// Function for prev button
prevBtn.onclick = function () {
    moveSlider('prev');
};

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');

    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    slider.addEventListener(
        'animationend',
        function () {
            if (direction === 'next') {
                slider.classList.remove('next');
            } else {
                slider.classList.remove('prev');
            }
        },
        { once: true } // Remove the event listener after it's triggered once
    );
}

// Auto-slide every 7 seconds
setInterval(() => {
    moveSlider('next');
}, 7000); // 7000 milliseconds = 7 seconds

/**about */

document.addEventListener('DOMContentLoaded', function() {
    // Example: Add a class to the features for a simple fade-in animation
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.classList.add('visible');
      }, index * 200);
    });
  });


/** KEY FETURES */

document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 150);
    });
  });

  /** HOW TO WORK */

  document.addEventListener('DOMContentLoaded', function() {
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-in');
      }, index * 200);
    });
  });

  /** call to action */
  document.querySelector('.cta-button').addEventListener('click', function() {
    alert('Thank you for your interest! Redirecting to the sign-up page...');
    // Redirect to the sign-up page or perform another action
    window.location.href = '#signup'; // Adjust the link as needed
  });


  /** footer */

  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      alert(`Navigating to ${event.target.textContent}...`);
      // You can add your custom navigation logic here
    });
  });



// Smooth scroll for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(event) {
        const targetId = this.getAttribute('onclick').match(/#\w+/)[0];
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
        }
    });
});










