import Bernstein from "bernstein-core"

const input = document.querySelector(".input")
const output = document.querySelector(".output")
const from = document.querySelector(".from")
const to = document.querySelector(".to")

input.addEventListener("blur", function (e) {
  update(e.target.value)
})

update(input.value)

function update(value) {
  const path = new Bernstein(value)

  output.value = path.getPathstring()

  from.setAttribute("d", value)
  to.setAttribute("d", output.value)

  function a() {
    path.rotate(Math.PI / 40)

    to.setAttribute("d", path.getPathstring())
    output.value = path.getPathstring()
    requestAnimationFrame(a)
  }

  // a()
}
