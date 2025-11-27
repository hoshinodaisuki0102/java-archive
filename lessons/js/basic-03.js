// /assets/js/lessons/basic-03.js
function extractPrintLines(code) {
  // 주석 제거 후 println만 추출
  let noSingle = code.replace(/\/\/.*$/gm, "");
  let noMulti = noSingle.replace(/\/\*[\s\S]*?\*\//g, "");

  const regex = /System\.out\.println\(\s*"([^"]*)"\s*\)\s*;/g;
  const lines = [];
  let match;
  while ((match = regex.exec(noMulti)) !== null) {
    lines.push(match[1]);
  }
  return lines;
}

function runPractice(editorId, outputId) {
  const editor = document.getElementById(editorId);
  const output = document.getElementById(outputId);
  if (!editor || !output) return;

  const lines = extractPrintLines(editor.value);
  if (lines.length === 0) {
    output.textContent = "실행 가능한 println 문장이 없습니다. 주석이 아닌 코드 부분에 println을 작성해 보세요.";
    return;
  }
  output.textContent = lines.join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("l3_p1_run")
    ?.addEventListener("click", () => runPractice("l3_p1_editor", "l3_p1_output"));

  document.getElementById("l3_p2_run")
    ?.addEventListener("click", () => runPractice("l3_p2_editor", "l3_p2_output"));

  document.getElementById("l3_p3_run")
    ?.addEventListener("click", () => runPractice("l3_p3_editor", "l3_p3_output"));
});
