//window.wrapper_Bubble_time
//
(function () {
  let a = document.createElement("div");
  a.classList.add("wrapper_Bubble");
  a.innerHTML = `
  <style>
.wrapper_Bubble {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 102, 204, 0);
  position: fixed;
  top: 0px;
  right: 0px;
  margin: 0;
  padding: 0;
  pointer-events: none;
}

.wrapper_Bubble div {
  height: 60px;
  width: 60px;
  border: 2px solid rgba(0, 102, 204, 0.863);
  border-radius: 100px;
  position: absolute;
  top: 10%;
  left: 10%;
  animation: 4s linear infinite
}

div .dot {
  height: 5px;
  width: 5px;
  border-radius: 50px;
  background: rgba(0, 102, 204, 0.548);
  position: absolute;
  top: 20%;
  right: 20%
}

@keyframes animate {
  0% {
      transform: scale(0) translateY(0) rotate(70deg)
  }

  100% {
      transform: scale(1.4) translateY(-100px) rotate(360deg)
  }
}
</style>
  `;

  document.body.appendChild(a);


  function create_bubble() {
      let a = document.createElement("div");
      a.innerHTML = '<span class="dot"></span>';
      a.style.top = (Math.random() * 100).toFixed(1) + "%";
      a.style.left = (Math.random() * 100).toFixed(1) + "%";
      let time = (Math.random() * 15).toFixed(0);
      a.style.animation = `animate ${time}s linear infinite`;
      document.querySelector(".wrapper_Bubble").appendChild(a);
      setTimeout(() => a.remove(), time * 1000);
  }

  create_bubble(); create_bubble(); create_bubble(); create_bubble(); create_bubble();
  create_bubble(); create_bubble(); create_bubble(); create_bubble(); create_bubble();

  window.wrapper_Bubble_time = setInterval(create_bubble, 300);

})()