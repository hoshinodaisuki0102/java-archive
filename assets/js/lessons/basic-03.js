import { extractPrintLines } from "../core/runner.js";
import { saveProgress } from "../core/progress.js";

document.addEventListener("DOMContentLoaded", () => {

  const editor = document.getElementById("editor3");
  const output = document.getElementById("output3");

  document.getElementById("run3").onclick = () => {
    const lines = extractPrintLines(editor.value);

    if (lines.length < 3) {
      output.innerHTML = "🔴 총 3줄을 모두 출력해야 합니다.<br>println 또는 \\n을 자유롭게 활용해보세요.";
      return;
    }

    output.innerHTML = `<b>출력 결과:</b><pre>${lines.join("\n")}</pre>
      <p class='success'>🟢 미션 성공!</p>`;

    saveProgress("basic3");
  };
});
