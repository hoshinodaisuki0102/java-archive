import { extractPrintLines } from "../core/runner.js";
import { saveProgress } from "../core/progress.js";

document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor2");
  const output = document.getElementById("output2");

  document.getElementById("run2").onclick = () => {
    const lines = extractPrintLines(editor.value);

    if (lines.length === 0) {
      output.innerHTML = "🔴 println()이 감지되지 않았습니다.<br>문법을 다시 확인해보세요.";
      return;
    }

    output.innerHTML = `<b>출력 결과:</b><pre>${lines.join("\n")}</pre>`;

    if (lines.length >= 2) {
      output.innerHTML += `<p class='success'>🟢 미션 성공!</p>`;
      saveProgress("basic2");
    }
  };
});
