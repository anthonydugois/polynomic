import parsePathstring from "bernstein-parse-pathstring"
import buildPathstring from "bernstein-build-pathstring"
import translate from "bernstein-translate-path"
import rotate from "bernstein-rotate-path"
import combine from "bernstein-combine-path"
import simplify from "bernstein-simplify-path"

const input = document.querySelector(".input")
const output = document.querySelector(".output")
const from = document.querySelector(".from")
const to = document.querySelector(".to")

input.addEventListener("blur", function (e) {
  update(e.target.value)
})

update(input.value)

function update(value) {
  const path = parsePathstring(value)
  let result = simplify(path, .001)

  console.log(result)

  output.value = buildPathstring(result)

  from.setAttribute("d", value)
  to.setAttribute("d", output.value)
}
