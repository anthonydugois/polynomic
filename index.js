import { Bernstein } from "bernstein-core"

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

  path.translateX(50)
  path.rotate(Math.PI / 4)

  output.value = path.getPath()

  from.setAttribute("d", value)
  to.setAttribute("d", output.value)

  /*function a() {
    path.rotate(Math.PI / 40)

    output.value = path.getPath()

    from.setAttribute("d", value)
    to.setAttribute("d", output.value)

    setTimeout(a, 10)
  }

  a()*/
}
