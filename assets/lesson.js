document.addEventListener("DOMContentLoaded", () => {

  // 기본 템플릿 버튼
  document.getElementById("insert-template").onclick = () => {
    document.getElementById("lesson-editor").value =
`public class Main {
    public static void main(String[] args) {

        System.out.println("Hello Java");
        System.out.println("여기에 당신의 문장을 넣어보세요!");

    }
}`;};

  // 실행 버튼
  document.getElementById("run-code").onclick = () => {
    const code = document.getElementById("lesson-editor").value;
    const output = document.getElementById("output-box");

    // println("문자열") 찾기
    const regex = /System\.out\.println\s*\(\s*"([^"]*)"\s*\)/g;
    let match;
    let lines = [];

    while ((match = regex.exec(code)) !== null) {
      lines.push(match[1]); // 실제 문자열 부분만 추출
    }

    if (lines.length === 0) {
      output.innerHTML = "🔴 출력된 문장이 없습니다.";
      return;
    }

    // 실제 출력처럼 보여주기
    output.innerHTML =
      "<b>출력 결과:</b><br><pre style='margin:0;padding:8px;white-space:pre;'>"
      + lines.join("\n")
      + "</pre>";
  };

});
