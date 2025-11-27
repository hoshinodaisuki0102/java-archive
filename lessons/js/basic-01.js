// /assets/js/lessons/basic-01.js
function extractPrintLines(code) {
  const regex = /System\.out\.println\(\s*"([^"]*)"\s*\)\s*;/g;
  const lines = [];
  let match;
  while ((match = regex.exec(code)) !== null) {
    lines.push(match[1]);
  }
  return lines;
}

function attachRunner(editorId, outputId, options = {}) {
  const editor = document.getElementById(editorId);
  const output = document.getElementById(outputId);
  if (!editor || !output) return;

  const { requiredFirstLine } = options;

  return () => {
    const code = editor.value;
    const lines = extractPrintLines(code);

    if (lines.length === 0) {
      output.textContent = "System.out.println(...) 문장이 하나도 없습니다. 예시를 참고해서 다시 작성해 보세요.";
      return;
    }

    if (requiredFirstLine && lines[0] !== requiredFirstLine) {
      output.textContent = `첫 번째 출력이 "${requiredFirstLine}" 이어야 합니다. 현재 첫 출력: "${lines[0]}"`;
      return;
    }

    output.textContent = lines.join("\n");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const p1Run = document.getElementById("l1_p1_run");
  const p2Run = document.getElementById("l1_p2_run");
  const p3Run = document.getElementById("l1_p3_run");

  if (p1Run) {
    p1Run.addEventListener("click",
      attachRunner("l1_p1_editor", "l1_p1_output", { requiredFirstLine: "Hello Java" })
    );
  }

  if (p2Run) {
    p2Run.addEventListener("click",
      attachRunner("l1_p2_editor", "l1_p2_output", { requiredFirstLine: "프로그래밍 첫 걸음!" })
    );
  }

  if (p3Run) {
    p3Run.addEventListener("click", () => {
      const handler = attachRunner("l1_p3_editor", "l1_p3_output");
      handler && handler();
    });
  }
});
