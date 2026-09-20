(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var boot = document.getElementById("boot");
  var tagline = document.getElementById("desc");
  var fullText = tagline.getAttribute("data-full-text");

  function typeTagline() {
    if (prefersReducedMotion) {
      tagline.textContent = fullText;
      return;
    }
    tagline.classList.add("typing");
    var i = 0;
    var speed = 18; // ms per character
    (function step() {
      tagline.textContent = fullText.slice(0, i);
      i++;
      if (i <= fullText.length) {
        setTimeout(step, speed);
      } else {
        tagline.classList.remove("typing");
      }
    })();
  }

  if (prefersReducedMotion) {
    boot.style.display = "none";
    typeTagline();
  } else {
    // hold on the boot screen briefly, then fade it out and start typing
    setTimeout(function () {
      boot.classList.add("hidden");
      setTimeout(function () {
        boot.remove();
      }, 400);
      typeTagline();
    }, 900);
  }

  // sudo easter egg: type "sudo" anywhere on the page
  var buffer = "";
  var toast = document.getElementById("sudo-toast");
  var toastTimer = null;

  window.addEventListener("keydown", function (e) {
    if (e.key.length !== 1) return; // ignore non-character keys
    buffer = (buffer + e.key).slice(-4).toLowerCase();
    if (buffer === "sudo") {
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove("show");
      }, 2500);
    }
  });
})();