const TIME_INTERVAL = 500;

async function waitForContentId() {
  if (typeof content_id !== "undefined" && content_id) {
    return;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(waitForContentId());
    }, TIME_INTERVAL);
  });
}

async function waitForDuration() {
  if (typeof duration !== "undefined" && duration) {
    return;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(waitForDuration());
    }, TIME_INTERVAL);
  });
}

async function waitForProgress() {
  if (typeof progress !== "undefined" && progress) {
    return;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(waitForProgress());
    }, TIME_INTERVAL);
  });
}

async function main() {
  await waitForContentId();
  await waitForDuration();
  await waitForProgress();

  if (progress > 99) {
    addMoreSpeedOptions();
    return;
  }

  const url = "https://klms.kaist.ac.kr/mod/vod/viewer/playtime_ajax.php";
  const headers = {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  };

  await fetch(url, {
    credentials: "include",
    headers,
    referrer: location.href,
    body: `positionevent=8&positionto=${duration}&positionfrom=0&duration=${duration}&track=${content_id}`,
    method: "POST",
    mode: "cors",
  });
  await fetch(url, {
    credentials: "include",
    headers,
    referrer: location.href,
    body: `positionevent=10&positionto=${duration}&positionfrom=${duration}&duration=${duration}&track=${content_id}`,
    method: "POST",
    mode: "cors",
  });

  // inject refresh button
  const wrapper = document.createElement("div");
  document.querySelector(".study-wrap").appendChild(wrapper);

  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  wrapper.style.position = "absolute";
  wrapper.style.top = "0px";
  wrapper.style.zIndex = "999999";
  wrapper.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";
  wrapper.style.alignItems = "center";

  const button = document.createElement("input");
  button.type = "button";
  button.value = "Click to Reload Page";
  button.style.display = "inline-block";
  button.style.padding = "0 10px";
  button.style.boxSizing = "border-box";
  button.style.lineHeight = "40px";
  button.style.fontSize = "22px";
  button.style.backgroundColor = "#059663";
  button.style.color = "white";
  button.style.fontWeight = "bold";
  button.style.border = "none";
  button.style.borderRadius = "7px";

  wrapper.appendChild(button);

  button.addEventListener("click", () => {
    location.reload();
    // window.open(
    //   location.href,
    //   "DescriptiveWindowName",
    //   "resizable,scrollbars,status"
    // );
    // window.close();
  });
}

function addMoreSpeedOptions() {
  const wrapper = document.querySelector(".fp-menu.fp-speed-menu");
  wrapper.style.width = "7em";
  wrapper.style.maxHeight = "80%";
  wrapper.style.overflowX = "hidden";
  wrapper.style.overflowY = "auto";

  for (let i = 2.2; i < 4; i += 0.2) {
    const speed = Number.isInteger(i) ? i.toFixed(0) : i.toFixed(1);
    wrapper.innerHTML += `<a data-speed="${speed}">${speed}x</a>`;
  }
  for (let i = 4; i <= 10; i += 1) {
    wrapper.innerHTML += `<a data-speed="${i}">${i}x</a>`;
  }
  wrapper.innerHTML += `<a data-speed="16">16x</a>`;
}

main();
