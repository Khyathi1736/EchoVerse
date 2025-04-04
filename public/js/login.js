document.addEventListener('DOMContentLoaded', function () {
    // to adjust container according to height.
    function adjustHeight() {
      const windowHeight = window.innerHeight;
      const flexElem = document.querySelector(".flex");
      const containerHeight = flexElem ? flexElem.offsetHeight : 0;
      const containers = document.querySelectorAll(".container");
      
      if (windowHeight >= containerHeight) {
        let t = windowHeight - containerHeight;
        containers.forEach(function (elem) {
          elem.style.marginTop = (t / 2) + "px";
        });
      } else {
        containers.forEach(function (elem) {
          elem.style.marginTop = "0.5em";
          elem.style.marginBottom = "0.5em";
        });
      }
    }
    
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    window.addEventListener('orientationchange', adjustHeight);
  
    // to adjust container according to width
    function adjustWidth() {
      const windowWidth = window.innerWidth;
      const flexElements = document.querySelectorAll(".flex");
      
      flexElements.forEach(function (elem) {
        if (windowWidth > 1000) {
          elem.style.width = "30vw";
        } else if (windowWidth <= 1000 && windowWidth > 850) {
          elem.style.width = "60vw";
        } else if (windowWidth <= 850 && windowWidth > 480) {
          elem.style.width = "80vw";
        } else if (windowWidth < 470) {
          elem.style.width = "90vw";
        } else {
          elem.style.width = "98vw";
        }
      });
    }
    
    adjustWidth();
    window.addEventListener('resize', adjustWidth);
    window.addEventListener('orientationchange', adjustWidth);
  
    // input styling
    const inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
      // mouseenter & focus
      input.addEventListener('mouseenter', function () {
        this.style.cursor = "pointer";
        this.style.border = "2px solid #fab078";
        this.style.borderRadius = "1em";
        this.style.transform = "scale(1.025)";
        this.style.transition = "transform 0.2s ease, border-color 0.3s ease";
      });
      input.addEventListener('focus', function () {
        this.style.cursor = "pointer";
        this.style.border = "2px solid #fab078";
        this.style.borderRadius = "1em";
        this.style.transform = "scale(1.025)";
        this.style.transition = "transform 0.2s ease, border-color 0.3s ease";
      });
      
      // mouseleave & blur
      input.addEventListener('mouseleave', function () {
        this.style.border = "2px solid transparent";
        this.style.transform = "scale(1)";
        this.style.transition = "transform 0.2s ease, border-color 0.3s ease";
      });
      input.addEventListener('blur', function () {
        this.style.border = "2px solid transparent";
        this.style.transform = "scale(1)";
        this.style.transition = "transform 0.2s ease, border-color 0.3s ease";
      });
    });
  
    // Add classes
    document.querySelectorAll("h1").forEach(function (elem) {
      elem.classList.add("orange-color");
    });
    
    const signin = document.getElementById("signin");
    if (signin) {
      signin.classList.add("bg-orange", "text-center");
    }
    
    const signup = document.getElementById("signup");
    if (signup) {
      signup.classList.add("bg-orange", "text-center");
    }
    
    document.querySelectorAll(".container").forEach(function (elem) {
      elem.classList.add("border-radius");
    });
    
    document.querySelectorAll("input").forEach(function (elem) {
      elem.classList.add("border-radius");
    });
  });
  