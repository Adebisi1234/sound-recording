let btn = document.querySelector("button");

btn.addEventListener("click", () => {
  console.log("test");
  let device = navigator.mediaDevices.getUserMedia({ audio: true });
  let items = [];
  device.then((stream) => {
    let recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      items.push(e.data);
      if (recorder.state == "inactive") {
        let blob = new Blob(items, { type: "audio/webm" });
        let audio = document.getElementById("audio");
        let mainAudio = document.createElement("audio");
        mainAudio.setAttribute("controls", "controls");
        audio.appendChild(mainAudio);
        mainAudio.innerHTML = `<source src= ${URL.createObjectURL(
          blob
        )} type="video/webm" />`;
      }
    };
    recorder.start();
    setTimeout(() => {
      recorder.stop();
    }, 5000);
  });
});
