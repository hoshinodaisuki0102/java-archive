import { extractPrintLines } from "../core/runner.js";
import { saveProgress } from "../core/progress.js";

document.addEventListener("DOMContentLoaded", () => {

  const editor = document.getElementById("editor1");
  const output = document.getElementById("output1");

  document.getElementById("fill-example").onclick = () => {
    editor.value = `System.out.println("Hello Java");`;
  };

  document.getElementById("run1").onclick = () => {
    const lines = extractPrintLines(editor.value);

    if (lines.length === 0) {
      output.innerHTML = "println() 명령이 감지되지 않았습니다. 문법을 다시 확인하세요.";
      return;
    }

    if (lines[0] !== "Hello Java") {
      output.innerHTML = `첫 출력이 "Hello Java"가 아닙니다. 실습을 다시 시도하세요.`;
      return;
    }

    output.innerHTML =
      `<div class="success-box">
         Hello Java
         <br>실습 성공
       </div>`;

    saveProgress("basic1");
  };
});
