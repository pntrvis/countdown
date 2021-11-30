// Get DOM
const $countYear = document.getElementById("countYear");

const $days = document.getElementById("days");
const $hours = document.getElementById("hours");
const $minutes = document.getElementById("minutes");
const $seconds = document.getElementById("seconds");

const $curtTime = document.getElementById("curtTime");

const $progressBar = document.getElementById("progressBar");
const $progressText = document.getElementById("progressText");

// Initial definition (Load set)
const curtYearDt = new Date().getFullYear();
const startYear_time = new Date(curtYearDt + '/01/01 00:00:00').getTime();
const nextYear_time = new Date((curtYearDt + 1) + '/01/01 00:00:00').getTime();
const yearSub_totalSec = nextYear_time - startYear_time;

$countYear.textContent = curtYearDt + ' ⇢ ' + (curtYearDt + 1);

// Add span tag
const spanSet = (text) => {
  let result = "";
  for (let i in text) {
    result += '<span>' + text[i] + '</span>';
  }
  return result;
}

let countdownEnd = false;

// Main processing
function setCountdown() {
  const curtDt = new Date();
  const curtTime = curtDt.getTime();

  /* The main counter */
  // Calculation
  const timeSub_curtSec = (nextYear_time - curtTime) / 1000;
  const timeSub_setSec = timeSub_curtSec > 0 ? timeSub_curtSec : -1;
  const countDays = (timeSub_setSec + 1) / 86400;
  const countHours = (countDays - Math.floor(countDays)) * 24;
  const countMinutes = (countHours - Math.floor(countHours)) * 60;
  const countSeconds = (countMinutes - Math.floor(countMinutes)) * 60;

  // Padding zeros left
  const ctDays = Math.floor(countDays).toString().padStart(2, "0");
  const ctHours = Math.floor(countHours).toString().padStart(2, "0");
  const ctMinutes = Math.floor(countMinutes).toString().padStart(2, "0");
  const ctSeconds = Math.floor(countSeconds).toString().padStart(2, "0");

  // Show results on screen
  $days.innerHTML = spanSet(ctDays);
  $hours.innerHTML = spanSet(ctHours);
  $minutes.innerHTML = spanSet(ctMinutes);
  $seconds.innerHTML = spanSet(ctSeconds);


  /* Current time */
  const curtYear = spanSet(curtDt.getFullYear().toString());
  const curtMonth = spanSet((curtDt.getMonth() + 1).toString().padStart(2, "0"));
  const curtDate = spanSet(curtDt.getDate().toString().padStart(2, "0"));
  const curtHours = spanSet(curtDt.getHours().toString().padStart(2, "0"));
  const curtMinutes = spanSet(curtDt.getMinutes().toString().padStart(2, "0"));
  const curtSeconds = spanSet(curtDt.getSeconds().toString().padStart(2, "0"));

  $curtTime.innerHTML = curtYear + '.' + curtMonth + '.' + curtDate + ' ' + curtHours + ':' + curtMinutes + ':' + curtSeconds;


  /* Progress */
  const percent = String((parseFloat(curtTime) - startYear_time) / yearSub_totalSec * 100);
  const setPercent = timeSub_curtSec >= 0 ? percent : "100";
  const prIndexOf = setPercent.indexOf(".");
  const progressText = prIndexOf != -1 ? spanSet(setPercent.slice(0, prIndexOf)) + '<span class="small">' + spanSet(setPercent.slice(prIndexOf, prIndexOf + 6)) + '%</span>' : '100<span class="small">%</span>';

  $progressBar.style.width = setPercent + '%';
  $progressText.innerHTML = progressText;


  /* Processing at the end of the countdown */
  if (setPercent === "100" && !countdownEnd) {
    const $updateYear1 = document.getElementById("updateYear1");
    const $updateYear2 = document.getElementById("updateYear2");
    const $updateYear3 = document.getElementById("updateYear3");
    const $updateYear4 = document.getElementById("updateYear4");

    $updateYear1.textContent = String(curtYearDt + 1).slice(0, 1);
    $updateYear2.textContent = String(curtYearDt + 1).slice(1, 2);
    $updateYear3.textContent = String(curtYearDt + 1).slice(2, 3);
    $updateYear4.textContent = String(curtYearDt + 1).slice(3, 4);

    document.getElementById("countEnd").style.display = "flex";
    document.getElementById("background").style.display = "block";

    window.setTimeout('timeOutConfetti()', 3200);
    countdownEnd = true;
  }
}
setInterval('setCountdown()', 500);

// Do this for 0 seconds
function timeOutConfetti() {
  const duration = 10 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 15, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const setConfetti = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(setConfetti);
    }

    const particleCount = 50 * (timeLeft / duration);
    // Since particles fall down, Start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}
