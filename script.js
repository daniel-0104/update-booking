// .................................................... search movie selected btn start .................................
document.addEventListener('DOMContentLoaded', () => {
    const cinemaForm = document.getElementById('cinema-form');
    if (cinemaForm) {
      cinemaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        this.submit();
      });
    }
  
    const customSelects = document.querySelectorAll(".custom-select");
    const selectBtns = document.querySelectorAll(".select-button");
    const selectedValues = document.querySelectorAll(".selected-value");
    const optionsLists = document.querySelectorAll(".select-dropdown li");
  
    selectBtns.forEach((btn, btnIndex) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        customSelects[btnIndex].classList.toggle("active");
        btn.setAttribute(
          "aria-expanded",
          btn.getAttribute("aria-expanded") === "true" ? "false" : "true"
        );
      });
    });
  
    optionsLists.forEach((option) => {
      option.addEventListener("click", function (e) {
        const customSelect = this.closest('.custom-select');
        const selectedValue = customSelect.querySelector('.selected-value');
        const btn = customSelect.querySelector('.select-button');
  
        selectedValue.innerHTML = this.querySelector('label').textContent;
        customSelect.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      });
  
      option.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
          const customSelect = this.closest('.custom-select');
          const selectedValue = customSelect.querySelector('.selected-value');
          const btn = customSelect.querySelector('.select-button');
  
          selectedValue.innerHTML = this.querySelector('label').textContent;
          customSelect.classList.remove("active");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
// .................................................... search movie selected btn end .................................


// ...................................................... light mode toggle start .................................
const body = document.querySelector('body');
const homeText = document.querySelectorAll('.home-text');
const bodyHr = document.querySelectorAll('hr');
const toggleCheckbox = document.querySelector('#theme-toggle');

function setTheme(isLightMode) {
    if (isLightMode) {
        body.classList.add('light');
        toggleCheckbox.checked = true;

        homeText.forEach(element => {
            element.classList.add('home-text-light');
        });
        bodyHr.forEach(element => {
            element.classList.add('home-text-light');
        });
    } else {
        body.classList.remove('light');
        toggleCheckbox.checked = false;

        homeText.forEach(element => {
            element.classList.remove('home-text-light');
        });
        bodyHr.forEach(element => {
            element.classList.remove('home-text-light');
        });
    }
}
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'light');

toggleCheckbox.addEventListener('change', function () {
    const isLightMode = toggleCheckbox.checked;
    setTheme(isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});
// ...................................................... light mode toggle end .................................


// ...................................................... promotion swiper start .................................
var swiper = new Swiper(".mySwiper2", {
  spaceBetween: 30,
  slidesPerView: 4,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    300: {
      slidesPerView: 2,
    },
    519: {
      slidesPerView: 2,
    },
    694: {
        slidesPerView: 3,
    },
    896: {
      slidesPerView: 4,
    },
    1160: {
      slidesPerView: 5,
    },
    1350: {
        slidesPerView: 6,
    }
  }
});
// ..................................................... promotion swiper end ....................................