var test = require("tap").test
var npm = require.resolve("../../bin/npm-cli.js")
var node = process.execPath
var spawn = require("child_process").spawn
var path = require("path")
var pkg = path.resolve(__dirname, "install-prepublish")

test("prepublish runs on install", function (t) {
  // windows does not use lifecycle signals, abort
  if (process.platform === "win32") return t.end()
  var child = spawn(node, [npm, "install"], {
    cwd: pkg
  })
  child.on("close", function (code, signal) {
    t.equal(code, null)
    t.equal(signal, "SIGSEGV")
    t.end()
  })
})

test("prepublish does not run on install --production", function (t) {
  // windows does not use lifecycle signals, abort
  if (process.platform === "win32") return t.end()
  var child = spawn(node, [npm, "install", "--production"], {
    cwd: pkg
  })
  child.on("close", function (code, signal) {
    t.equal(code, 0)
    t.equal(signal, null)
    t.end()
  })
})

