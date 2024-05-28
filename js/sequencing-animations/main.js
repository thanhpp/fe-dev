const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

const promise = alice1.animate(aliceTumbling, aliceTiming).finished;
promise.then(() => {
  alice2.animate(aliceTumbling, aliceTiming).finished.then(
    () => {
      alice3.animate(aliceTumbling, aliceTiming)
    }
  );
})

/*
function animate1(callback) {
  alice1.animate(aliceTumbling, aliceTiming).addEventListener("finish", (event) => {
    callback(animate2);
  });
}

function animate2(callback) {
  alice2.animate(aliceTumbling, aliceTiming).addEventListener("finish", (event) => {
    callback(animate3);
  });
}

function animate3() {
  alice3.animate(aliceTumbling, aliceTiming);
};

function animate() {
  animate1(() => {
    animate2(() => {
      animate3();
    })
  })
}

animate();
*/
