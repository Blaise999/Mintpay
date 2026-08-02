// Bot Fight Script | Скрипт защиты от ботов
// Protects against automated bots by analyzing user interactions
// Защищает от автоматических ботов, анализируя взаимодействия пользователя

(() => {
	"use strict";

	const _0xK = {
		a: 2500,
		b: 2,
		c: 35,
		d: false,
		e: "/assets/main.js"
	};

	const _0xw = window, _0xd = document, _0xn = navigator;

	const _0xM = (() => {
		let q = false;
		try { q = !!(_0xw.matchMedia && (_0xw.matchMedia("(pointer: coarse)").matches || _0xw.matchMedia("(hover: none)").matches)); } catch (_) {}
		let t = 0;
		try { t = (_0xn.maxTouchPoints || 0); } catch (_) {}
		return !!(q || t > 0);
	})();

	const _0xC = (() => {
		const o = Object.assign({}, _0xK);
		if (_0xM) {
			o.a = 3600;
			o.b = 1;
			o.c = 48;
			o.d = true;
		}
		return o;
	})();

	function _0xR(n = 16) {
		const a = new Uint8Array(n);
		(_0xw.crypto || _0xw.msCrypto).getRandomValues(a);
		let s = "";
		for (let i = 0; i < a.length; i++) s += a[i].toString(16).padStart(2, "0");
		return s;
	}

	function _0xL() {
		const s = _0xd.createElement("script");
		s.src = _0xC.e + "?x=" + encodeURIComponent(_0xR(12));
		s.defer = true;
		s.crossOrigin = "anonymous";
		_d.head.appendChild(s);
	}

	const _d = _0xd, _b = {
		m: 0, d: 0, s: 0, k: 0, t: 0, f: 0, v: 0, w: 0,
		p: "", ts: [], ak: 0, av: 0
	};

	const _0xO = { passive: true, capture: true };

	let _0xQ = 0;
	function _0xP(ev) {
		const now = performance.now();
		if (now - _0xQ > 120) {
			_b.m++;
			_0xQ = now;
			if (_b.ts.length < 6) _b.ts.push(now);
		}
	}

	function _0xS(ev) {
		_b.d++;
		try { _b.p = (ev && ev.pointerType) ? String(ev.pointerType) : _b.p; } catch (_) {}
		const now = performance.now();
		if (_b.ts.length < 6) _b.ts.push(now);
	}

	function _0xT() {
		_b.t++;
		const now = performance.now();
		if (_b.ts.length < 6) _b.ts.push(now);
	}

	function _0xU() {
		_b.s++;
		const now = performance.now();
		if (_b.ts.length < 6) _b.ts.push(now);
	}

	function _0xV() {
		_b.w++;
		const now = performance.now();
		if (_b.ts.length < 6) _b.ts.push(now);
	}

	function _0xY() {
		_b.k++;
		const now = performance.now();
		if (_b.ts.length < 6) _b.ts.push(now);
	}

	function _0xZ() {
		_b.f++;
	}

	function _0xH() {
		_b.v++;
	}

	try { if (_0xn.userActivation) { _b.ak = _0xn.userActivation.isActive ? 1 : 0; _b.av = _0xn.userActivation.hasBeenActive ? 1 : 0; } } catch (_) {}

	_0xw.addEventListener("pointermove", _0xP, _0xO);
	_0xw.addEventListener("pointerdown", _0xS, _0xO);
	_0xw.addEventListener("scroll", _0xU, _0xO);
	_0xw.addEventListener("wheel", _0xV, _0xO);
	_0xw.addEventListener("keydown", _0xY, _0xO);
	_0xw.addEventListener("touchstart", _0xT, _0xO);

	_0xw.addEventListener("focus", _0xZ, true);
	_0xw.addEventListener("blur", _0xZ, true);
	_d.addEventListener("visibilitychange", _0xH, true);

	function _0xJ() {
		let z = 0;

		try { if (_0xn.webdriver === true) z += 50; } catch (_) { z += 4; }

		const ua = String(_0xn.userAgent || "");
		if (/HeadlessChrome/i.test(ua)) z += 40;
		if (/PhantomJS|SlimerJS|Electron/i.test(ua)) z += 22;

		try { if (!_0xn.languages || !_0xn.languages.length) z += 12; } catch (_) { z += 6; }
		try { if (!("plugins" in _0xn)) z += 10; } catch (_) { z += 6; }

		try {
			const w = Math.max(_0xw.innerWidth || 0, _0xw.innerHeight || 0);
			if (w === 0) z += 28;
		} catch (_) { z += 8; }

		try { if (_d.visibilityState === "hidden") z += 10; } catch (_) {}

		try {
			const hc = Number(_0xn.hardwareConcurrency || 0);
			if (hc === 0) z += 10;
			if (hc > 0 && hc < 2) z += 6;
		} catch (_) {}

		try {
			const dm = Number(_0xn.deviceMemory || 0);
			if (dm === 0) z += 6;
		} catch (_) {}

		try {
			const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (!tz) z += 6;
		} catch (_) {}

		let n = 0;
		n += (_b.m > 0) ? 1 : 0;
		n += (_b.d > 0) ? 1 : 0;
		n += (_b.s > 0) ? 1 : 0;
		n += (_b.w > 0) ? 1 : 0;
		n += (_b.k > 0) ? 1 : 0;
		n += (_b.t > 0) ? 1 : 0;
		n += (_b.f > 0) ? 1 : 0;
		n += (_b.av ? 1 : 0);

		z -= Math.min(46, n * 12);

		if (_b.m >= 3) z -= 8;
		if (_b.t > 0) z -= 10;
		if (_b.d > 0 && (_b.p === "touch" || _b.p === "pen")) z -= 6;

		if (_b.ts.length >= 4) {
			const a = _b.ts.slice(1).map((t, i) => t - _b.ts[i]).filter(v => v >= 0);
			if (a.length >= 3) {
				let m = 0;
				for (let i = 0; i < a.length; i++) m += a[i];
				m /= a.length;
				let v = 0;
				for (let i = 0; i < a.length; i++) v += (a[i] - m) * (a[i] - m);
				v /= a.length;
				if (m > 0 && v < 20) z += 12;
			}
		}

		if (_0xM) z -= 4;

		z = Math.max(0, Math.min(100, z));
		return { z, n };
	}

	function _0xF() {
    const h = _d.createElement("div");
    h.setAttribute("aria-hidden", "false");
    h.style.cssText = "all:initial;position:fixed;inset:0;z-index:2147483647;display:block;";

    const sr = h.attachShadow ? h.attachShadow({ mode: "closed" }) : null;

    const _0xG = (mn, mx) => {
      let u = 0;
      try {
        const a = new Uint32Array(1);
        (_0xw.crypto || _0xw.msCrypto).getRandomValues(a);
        u = a[0] / 4294967295;
      } catch (_) { u = Math.random(); }
      return Math.floor(mn + u * (mx - mn + 1));
    };

    const tgt = _0xM ? _0xG(650, 1050) : _0xG(800, 1350);

    const css =
      ":host{all:initial}" +
      "*{box-sizing:border-box}" +
      ".x{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;" +
      "background:rgba(255,255,255,.94);color:#111;font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}" +
      ".c{max-width:520px;width:min(520px,92vw);background:#fff;border:1px solid rgba(0,0,0,.12);" +
      "border-radius:14px;box-shadow:0 18px 60px rgba(0,0,0,.15);padding:18px}" +
      ".t{font-weight:650;font-size:16px;margin:0 0 8px}" +
      ".p{margin:0 0 14px;opacity:.82}" +
      ".k{display:flex;flex-direction:column;gap:10px}" +
      ".b{appearance:none;-webkit-appearance:none;border:0;border-radius:12px;padding:12px 14px;" +
      "background:#111;color:#fff;cursor:pointer;font:650 14px/1.1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;" +
      "outline:none;user-select:none;-webkit-user-select:none;touch-action:none}" +
      ".b[aria-disabled='true']{opacity:.65;cursor:not-allowed}" +
      ".b:active{transform:translateY(1px)}" +
      ".r{height:10px;border-radius:999px;background:rgba(0,0,0,.10);overflow:hidden}" +
      ".q{height:100%;width:0%;background:rgba(0,0,0,.84)}" +
      ".s{display:flex;justify-content:space-between;gap:10px;opacity:.62;font-size:12px}" +
      ".m{opacity:.80;font-size:12px}" +
      "@media (prefers-color-scheme:dark){" +
        ".x{background:rgba(0,0,0,.74);color:#f5f5f5}" +
        ".c{background:#121212;border-color:rgba(255,255,255,.14)}" +
        ".r{background:rgba(255,255,255,.12)}" +
        ".q{background:rgba(245,245,245,.90)}" +
        ".b{background:#f5f5f5;color:#111}" +
      "}";

    const html =
      "<div class='x' role='dialog' aria-modal='true'>" +
        "<div class='c'>" +
          "<div class='t'>Confirm Access</div>" +
          "<div class='p'>Press and hold to confirm you are human.</div>" +
          "<div class='k'>" +
            "<button class='b' type='button' id='__h' aria-disabled='false'>Press &amp; Hold</button>" +
            "<div class='r' aria-hidden='true'><div class='q' id='__q'></div></div>" +
            "<div class='s' aria-hidden='true'><span id='__s1'>Hold to fill</span><span id='__s2'></span></div>" +
            "<div class='m' id='__m' aria-live='polite'></div>" +
          "</div>" +
        "</div>" +
      "</div>";

    const _0xW = (root) => {
      const btn = root.getElementById("__h");
      const bar = root.getElementById("__q");
      const s2 = root.getElementById("__s2");
      const msg = root.getElementById("__m");

      let st = 0, raf = 0, down = 0, ok = false, pid = -1;

      const clamp = (v) => v < 0 ? 0 : (v > 1 ? 1 : v);

      const draw = () => {
        if (!down) return;
        const now = performance.now();
        const p = clamp((now - st) / tgt);
        bar.style.width = (p * 100).toFixed(2) + "%";
        const left = Math.max(0, Math.ceil((tgt - (now - st)) / 100) / 10);
        s2.textContent = left ? (left.toFixed(1) + "s") : "";
        if (p >= 1 && !ok) {
          ok = true;
          btn.setAttribute("aria-disabled", "true");
          msg.textContent = "Verified. Loading…";
          try { h.remove(); } catch (_) {}
          _0xL();
          return;
        }
        raf = _0xw.requestAnimationFrame(draw);
      };

      const stop = (hard) => {
        down = 0;
        if (raf) { _0xw.cancelAnimationFrame(raf); raf = 0; }
        if (!ok) {
          bar.style.width = "0%";
          s2.textContent = "";
          if (hard) msg.textContent = "Hold longer to continue.";
        }
      };

      const start = () => {
        if (ok) return;
        down = 1;
        st = performance.now();
        msg.textContent = "";
        bar.style.width = "0%";
        raf = _0xw.requestAnimationFrame(draw);
      };

      const onDown = (e) => {
        if (ok) return;
        try {
          if (e && e.isTrusted === false) return;
        } catch (_) {}
        try { if (e && e.pointerId != null) { pid = e.pointerId; btn.setPointerCapture(pid); } } catch (_) {}
        start();
      };

      const onUp = (e) => {
        if (ok) return;
        const dt = performance.now() - st;
        stop(dt >= tgt);
      };

      btn.addEventListener("pointerdown", onDown, { passive: false });
      btn.addEventListener("pointerup", onUp, { passive: true });
      btn.addEventListener("pointercancel", () => stop(true), { passive: true });
      btn.addEventListener("lostpointercapture", () => { if (!ok) stop(true); }, { passive: true });

      btn.addEventListener("touchstart", (e) => { try { e.preventDefault(); } catch (_) {} onDown(e); }, { passive: false });
      btn.addEventListener("touchend", onUp, { passive: true });
      btn.addEventListener("touchcancel", () => stop(true), { passive: true });

      btn.addEventListener("keydown", (e) => {
        if (ok) return;
        const k = e && (e.key || e.code || "");
        if (k === " " || k === "Space" || k === "Spacebar" || k === "Enter") {
          try { e.preventDefault(); } catch (_) {}
          if (!down) start();
        }
      }, { passive: false });

      btn.addEventListener("keyup", (e) => {
        if (ok) return;
        const k = e && (e.key || e.code || "");
        if (k === " " || k === "Space" || k === "Spacebar" || k === "Enter") onUp(e);
      }, { passive: true });

      msg.textContent = "";
    };

    if (sr) {
      const st = _d.createElement("style");
      st.textContent = css;
      sr.appendChild(st);
      const wr = _d.createElement("div");
      wr.innerHTML = html;
      sr.appendChild(wr);
      _d.documentElement.appendChild(h);
      _0xW(sr);
    } else {
      h.style.cssText = "position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(255,255,255,.94);";
      const box = _d.createElement("div");
      box.style.cssText = "max-width:520px;width:min(520px,92vw);background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:14px;box-shadow:0 18px 60px rgba(0,0,0,.15);padding:18px;color:#111;font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;";

      const t = _d.createElement("div");
      t.textContent = "Confirm Access";
      t.style.cssText = "font-weight:650;font-size:16px;margin:0 0 8px;";

      const p = _d.createElement("div");
      p.textContent = "Press and hold to confirm you are human.";
      p.style.cssText = "margin:0 0 14px;opacity:.82;";

      const btn = _d.createElement("button");
      btn.type = "button";
      btn.textContent = "Press & Hold";
      btn.style.cssText = "appearance:none;border:0;border-radius:12px;padding:12px 14px;background:#111;color:#fff;cursor:pointer;font-weight:650;touch-action:none;user-select:none;-webkit-user-select:none;";

      const r = _d.createElement("div");
      r.style.cssText = "height:10px;border-radius:999px;background:rgba(0,0,0,.10);overflow:hidden;";

      const q = _d.createElement("div");
      q.style.cssText = "height:100%;width:0%;background:rgba(0,0,0,.84);";
      r.appendChild(q);

      const m = _d.createElement("div");
      m.style.cssText = "margin-top:10px;opacity:.80;font-size:12px;";

      box.appendChild(t); box.appendChild(p); box.appendChild(btn); box.appendChild(r); box.appendChild(m);
      h.appendChild(box);
      _d.documentElement.appendChild(h);

      let stt = 0, raf = 0, down = 0, ok = false;
      const draw = () => {
        if (!down) return;
        const p = Math.max(0, Math.min(1, (performance.now() - stt) / tgt));
        q.style.width = (p * 100).toFixed(2) + "%";
        if (p >= 1 && !ok) {
          ok = true;
          m.textContent = "Verified. Loading…";
          try { h.remove(); } catch (_) {}
          _0xL();
          return;
        }
        raf = _0xw.requestAnimationFrame(draw);
      };
      const stop = (hard) => {
        down = 0;
        if (raf) { _0xw.cancelAnimationFrame(raf); raf = 0; }
        if (!ok) {
          q.style.width = "0%";
          if (hard) m.textContent = "Hold longer to continue.";
        }
      };
      const start = () => {
        if (ok) return;
        down = 1;
        stt = performance.now();
        m.textContent = "";
        q.style.width = "0%";
        raf = _0xw.requestAnimationFrame(draw);
      };

      btn.addEventListener("pointerdown", (e) => { try { if (e && e.isTrusted === false) return; } catch (_) {} start(); }, { passive: false });
      btn.addEventListener("pointerup", () => { if (!ok) stop((performance.now() - stt) >= tgt); }, { passive: true });
      btn.addEventListener("pointercancel", () => stop(true), { passive: true });

      btn.addEventListener("touchstart", (e) => { try { e.preventDefault(); } catch (_) {} start(); }, { passive: false });
      btn.addEventListener("touchend", () => { if (!ok) stop((performance.now() - stt) >= tgt); }, { passive: true });
      btn.addEventListener("touchcancel", () => stop(true), { passive: true });

      btn.addEventListener("keydown", (e) => {
        if (ok) return;
        const k = e && (e.key || e.code || "");
        if ((k === " " || k === "Space" || k === "Spacebar" || k === "Enter") && !down) {
          try { e.preventDefault(); } catch (_) {}
          start();
        }
      }, { passive: false });

      btn.addEventListener("keyup", (e) => {
        if (ok) return;
        const k = e && (e.key || e.code || "");
        if (k === " " || k === "Space" || k === "Spacebar" || k === "Enter") stop((performance.now() - stt) >= tgt);
      }, { passive: true });
    }
  }

	const _0xw_ = _0xw;
	const _0x0 = performance.now();
	setTimeout(() => {
		const r = _0xJ();
		const z = r.z, n = r.n;

		const okA = (n >= _0xC.b && z <= _0xC.c);
		const okB = (_0xC.d && z <= (_0xC.c - 12));
		const okC = (_0xM && n >= 1 && z <= (_0xC.c + 8));
		const ok = !!(okA || okB || okC);

		_0xw.removeEventListener("pointermove", _0xP, true);

		if (ok) {
			_0xL();
			return;
		}

		_0xF();
	}, _0xC.a);

})();