// ======== フェードイン系の処理 ========
document.addEventListener("DOMContentLoaded", () => {
  const fadeElems = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElems.forEach(elem => {
    fadeObserver.observe(elem);
  });

  // 左右スライド用
  const slideObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.fade-in-left, .fade-in-right').forEach(el => {
    slideObserver.observe(el);
  });

  // スムーススクロール（aタグ）
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // ハンバーガーメニューを閉じる処理もここで追加
      toggleBtn.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // ======== ハンバーガーメニュー処理 ========
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
});

// script.js に追加
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  body.classList.add("show"); // ページ読み込み時にフェードイン

  // すべてのリンクに処理
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    // 外部リンク・アンカーリンク以外のみ
    if(link.getAttribute("href") && !link.getAttribute("href").startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        body.classList.remove("show"); // フェードアウト
        setTimeout(() => {
          window.location.href = href;
        }, 400); // CSSの0.5秒と合わせる
      });
    }
  });
});

// work1
// ページ全体フェードイン
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.5s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  // 矢印＆戻るボタンクリックでフェードアウト
  const links = document.querySelectorAll(".arrow, .btn-back");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = link.getAttribute("href");
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = url;
      }, 50);
    });
  });

  // スワイプ操作
  let startX = 0;
  let endX = 0;
  const threshold = 50; // スワイプ認識距離

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", () => {
    const diff = endX - startX;
    if (Math.abs(diff) > threshold) {
      let targetUrl = "";
      if (diff > 0) {
        // 右にスワイプ → 前の作品
        const prevLink = document.querySelector(".arrow.prev");
        if (prevLink) targetUrl = prevLink.getAttribute("href");
      } else {
        // 左にスワイプ → 次の作品
        const nextLink = document.querySelector(".arrow.next");
        if (nextLink) targetUrl = nextLink.getAttribute("href");
      }
      if (targetUrl) {
        document.body.style.opacity = 0;
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 200);
      }
    }
  });
});
