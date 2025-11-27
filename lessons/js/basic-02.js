// /assets/js/lessons/basic-02.js
function extractPrintLines(code) {
  const regex = /System\.out\.(?:println|print)\(\s*"([^"]*)"\s*\)\s*;/g;
  const lines = [];
  let match;
  while ((match = regex.exec(code)) !== null) {
    lines.push(match[1]);
  }
  return lines;
}

function runSimple(editorId, outputId) {
  const editor = document.getElementById(editorId);
  const output = document.getElementById(outputId);
  if (!editor || !output) return;

  const lines = extractPrintLines(editor.value);
  if (lines.length === 0) {
    output.textContent = "System.out.print(ln) 문장이 없습니다. 예시를 참고해 다시 작성해 보세요.";
    return;
  }
  output.textContent = lines.join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  const p1Run = document.getElementById("l2_p1_run");
  const p2Run = document.getElementById("l2_p2_run");
  const p3Run = document.getElementById("l2_p3_run");

  p1Run?.addEventListener("click", () => runSimple("l2_p1_editor", "l2_p1_output"));
  p2Run?.addEventListener("click", () => runSimple("l2_p2_editor", "l2_p2_output"));
  p3Run?.addEventListener("click", () => runSimple("l2_p3_editor", "l2_p3_output"));
});
