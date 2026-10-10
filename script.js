const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");
const resetBtn = document.getElementById("reset-btn");

// טעינת כמות הכוסות השמורה מתוך ה-localStorage
const savedCups = localStorage.getItem("water_cups_count");
if (savedCups !== null) {
  const count = parseInt(savedCups, 10);
  smallCups.forEach((cup, idx) => {
    if (idx < count) cup.classList.add("full");
  });
}

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener("click", () => highlightCups(idx));
});

function highlightCups(idx) {
  if (idx === 7 && smallCups[idx].classList.contains("full")) {
    idx--;
  } else if (
    smallCups[idx].classList.contains("full") &&
    !smallCups[idx].nextElementSibling?.classList.contains("full")
  ) {
    idx--;
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  saveProgress();
  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;

  // עדכון גובה ואחוזי המים
  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${Math.round((fullCups / totalCups) * 100)}%`;
  }

  // עדכון החלק שנשאר
  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${(2 - (250 * fullCups) / 1000).toFixed(2)}L`;
  }
}

// שמירת ההתקדמות בדפדפן
function saveProgress() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  localStorage.setItem("water_cups_count", fullCups);
}

// איפוס יומי
resetBtn.addEventListener("click", () => {
  smallCups.forEach((cup) => cup.classList.remove("full"));
  localStorage.removeItem("water_cups_count");
  updateBigCup();
});
