(function () {
  const STORAGE_USER = "javaArchiveUser";
  const STORAGE_LOGGED = "javaArchiveLoggedIn";
  const STORAGE_AUTO_EXPIRE = "javaArchiveAutoLoginExpire";

  function getUser() {
    try {
      const raw = localStorage.getItem(STORAGE_USER);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error("User parse error", e);
      return null;
    }
  }

  function isLoggedIn() {
    const flag = localStorage.getItem(STORAGE_LOGGED) === "true";
    if (!flag) return false;

    const expire = localStorage.getItem(STORAGE_AUTO_EXPIRE);
    if (!expire) return true;

    const now = Date.now();
    if (now > Number(expire)) {
      localStorage.removeItem(STORAGE_LOGGED);
      localStorage.removeItem(STORAGE_AUTO_EXPIRE);
      return false;
    }
    return true;
  }

  function setLoggedIn(auto) {
    localStorage.setItem(STORAGE_LOGGED, "true");
    if (auto) {
      const exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_AUTO_EXPIRE, exp);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_LOGGED);
    localStorage.removeItem(STORAGE_AUTO_EXPIRE);
    location.reload();
  }

  function renderNavUser() {
    const header = document.querySelector(".header .nav");
    if (!header) return;

    const old = header.querySelector(".ja-nav-user");
    if (old) old.remove();

    const user = getUser();
    const logged = isLoggedIn();
    const wrap = document.createElement("div");
    wrap.className = "ja-nav-user";

    if (logged && user) {
      wrap.innerHTML = `
        <span class="ja-nav-user-name">${user.nickname} 님</span>
        <button class="ja-nav-user-logout">로그아웃</button>
      `;
    } else {
      wrap.innerHTML = `<button class="ja-nav-user-login">로그인</button>`;
    }

    header.appendChild(wrap);

    if (wrap.querySelector(".ja-nav-user-login")) {
      wrap.querySelector(".ja-nav-user-login").onclick = () => showLoginPopup();
    }
    if (wrap.querySelector(".ja-nav-user-logout")) {
      wrap.querySelector(".ja-nav-user-logout").onclick = () => logout();
    }
  }

  // ---------------------------
  // 팝업 생성
  // ---------------------------
  function showLoginPopup() {
    if (document.querySelector(".ja-login-overlay")) return;

    document.body.insertAdjacentHTML("beforeend", popupHTML);
    attachPopupEvents();
  }

  const popupHTML = `
      <div class="ja-login-overlay"></div>
      <div class="ja-login-popup">
        <div class="ja-popup-header">
          <h2 id="ja-popup-title">로그인이 필요합니다</h2>
          <p id="ja-popup-sub">JavaArchive 학습 기능을 이용하려면 로그인이 필요해요.</p>
        </div>

        <div class="ja-popup-body">

          <!-- 로그인 -->
          <div class="ja-panel ja-panel-login">
            <input type="email" id="ja-login-email" placeholder="이메일" />
            <input type="password" id="ja-login-pw" placeholder="비밀번호" />

            <label class="ja-auto-login">
              <input type="checkbox" id="ja-auto-login">
              1달간 자동 로그인
            </label>

            <button id="jaLoginBtn" class="ja-btn-main">로그인하고 공부 시작하기</button>

            <div class="ja-or"><span>또는</span></div>

            <div class="ja-social">
              <button class="ja-social-btn ja-google">Google로 계속하기</button>
              <button class="ja-social-btn ja-kakao">Kakao로 계속하기</button>
            </div>

            <div class="ja-switch">
              계정이 없나요?
              <button id="jaGotoSignup">회원가입</button>
            </div>
          </div>

          <!-- 회원가입 -->
          <div class="ja-panel ja-panel-signup" style="display:none;">
            <input type="email" id="ja-signup-email" placeholder="이메일" />
            <input type="password" id="ja-signup-pw" placeholder="비밀번호" />
            <input type="password" id="ja-signup-pw2" placeholder="비밀번호 확인" />
            <input type="text" id="ja-signup-nick" placeholder="닉네임" />

            <button id="jaSignupBtn" class="ja-btn-main">회원가입 완료</button>

            <div class="ja-switch">
              이미 계정이 있나요?
              <button id="jaGotoLogin">로그인으로 돌아가기</button>
            </div>
          </div>

        </div>
      </div>`;

  function attachPopupEvents() {
    const gotoSignup = document.getElementById("jaGotoSignup");
    const gotoLogin = document.getElementById("jaGotoLogin");

    gotoSignup.onclick = () => switchPanel("signup");
    gotoLogin.onclick = () => switchPanel("login");

    document.getElementById("jaLoginBtn").onclick = onLogin;
    document.getElementById("jaSignupBtn").onclick = onSignup;

    document.querySelector(".ja-google").onclick = () =>
      alert("Google 로그인은 추후 연결 예정입니다.");
    document.querySelector(".ja-kakao").onclick = () =>
      alert("Kakao 로그인은 추후 연결 예정입니다.");
  }

  function onLogin() {
    const email = document.getElementById("ja-login-email").value.trim();
    const pass = document.getElementById("ja-login-pw").value.trim();
    const auto = document.getElementById("ja-auto-login").checked;
    const user = getUser();

    if (!user || user.email !== email || user.password !== pass) {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
      return;
    }

    setLoggedIn(auto);
    closePopup();
  }

  function onSignup() {
    const email = document.getElementById("ja-signup-email").value.trim();
    const pw = document.getElementById("ja-signup-pw").value.trim();
    const pw2 = document.getElementById("ja-signup-pw2").value.trim();
    const nick = document.getElementById("ja-signup-nick").value.trim();

    if (!email || !pw || !pw2 || !nick) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (pw !== pw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const newUser = { email, password: pw, nickname: nick };
    localStorage.setItem(STORAGE_USER, JSON.stringify(newUser));
    setLoggedIn(true);
    closePopup();
  }

  function switchPanel(mode) {
    const loginP = document.querySelector(".ja-panel-login");
    const signP = document.querySelector(".ja-panel-signup");

    if (mode === "signup") {
      loginP.style.display = "none";
      signP.style.display = "block";
    } else {
      signP.style.display = "none";
      loginP.style.display = "block";
    }
  }

  function closePopup() {
    document.querySelector(".ja-login-overlay")?.remove();
    document.querySelector(".ja-login-popup")?.remove();
    renderNavUser();
  }

  function ensureAuthOnLoad() {
    if (!isLoggedIn()) showLoginPopup();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderNavUser();
    ensureAuthOnLoad();
  });

})();
