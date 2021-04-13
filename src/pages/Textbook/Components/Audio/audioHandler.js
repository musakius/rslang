let context = null;
try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
} catch (e) {
  console.log("Ваш браузер не поддерживает audio API");
}
const SAMPLE_RATE = 44100;
let buffer = context.createBuffer(1, 44100*2, SAMPLE_RATE);
let source = null;

const loadSoundFile = (url, index) => {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  request.onload = function (e) {
    context.decodeAudioData(
      request.response,
      function (decodedArrayBuffer) {
        buffer[index] = decodedArrayBuffer;
      },
      function (e) {
        console.log("Error decoding file", e);
      }
    );
  };
  request.send();
};

const createSource = () => {
  source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
};

export const loadFlow = (flow) => {
  if(!context) return;
  stopSource();
  flow.forEach((url, index) => {
    loadSoundFile(url, index);
  });
};

export const playSource = () => {
  console.log("play");
  createSource();
  source.start(0);
};
export const stopSource = () => {
  console.log("stop");
  if (source) source.stop();
};
