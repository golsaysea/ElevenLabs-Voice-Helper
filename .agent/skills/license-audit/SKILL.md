---
name: license-audit
description: 渚濊禆鍗忚鍚堣妫€鏌?鈥?褰撲緷璧栨枃浠舵垨澶栭儴 CDN 渚濊禆鍙樻洿鏃惰嚜鍔ㄦ鏌ュ崗璁悎瑙勬€?triggers:
  - file_changed: "package.json"
  - file_changed: "go.mod"
  - file_changed: "requirements.txt"
  - file_changed: "requirements-build.txt"
  - file_changed: "pyproject.toml"
  - file_changed: "Cargo.toml"
  - file_changed: "*.csproj"
  - file_changed: "*.html"
  - file_changed: "*.HTML"
---

# 渚濊禆鍗忚瀹¤ Skill

## 浣曟椂浣跨敤

褰撶敤鎴蜂慨鏀逛緷璧栧０鏄庢枃浠躲€丳ython import銆丠TML CDN 鑴氭湰寮曠敤鎴栨墿灞曡祫婧愬紩鐢ㄦ椂锛岃Е鍙戞湰 Skill銆?
## 涓嶈浣跨敤

褰撶敤鎴峰彧鏄槄璇绘垨鏌ョ湅渚濊禆鏂囦欢鑰屾病鏈変慨鏀规椂锛屼笉瑕佽Е鍙戞湰 Skill銆?
## 鎵ц姝ラ

### 1. 妫€娴嬪彉鏇寸殑渚濊禆

瀵规瘮褰撳墠渚濊禆鏂囦欢涓庨」鐩牴鐩綍鐨?`LICENSE.LIST` 涓凡璁板綍鐨勪緷璧栵紝鎵惧嚭锛?
- 鏂板鐨勪緷璧栵細鍦ㄤ緷璧栨枃浠舵垨 CDN 寮曠敤涓瓨鍦ㄤ絾 `LICENSE.LIST` 涓病鏈夌殑銆?- 鐗堟湰鍙樻洿鐨勪緷璧栵細鐗堟湰鍙峰彂鐢熷彉鍖栫殑銆?- 绉婚櫎鐨勪緷璧栵細鍦?`LICENSE.LIST` 涓瓨鍦ㄤ絾渚濊禆鏂囦欢鎴?CDN 寮曠敤涓凡鍒犻櫎鐨勩€?
### 2. 鏌ヨ鏂板/鍙樻洿渚濊禆鐨勫崗璁?
瀵规柊澧炴垨鐗堟湰鍙樻洿鐨勪緷璧栵紝浣跨敤 WebSearch 鏌ヨ鍏跺崗璁細

- npm 鍖咃細鎼滅储 `<鍖呭悕> npm package license`
- Go 妯″潡锛氭悳绱?`<妯″潡璺緞> go module license`
- Python 鍖咃細鎼滅储 `<鍖呭悕> pypi license`
- Rust 鍖咃細鎼滅储 `<鍖呭悕> crates.io license`
- .NET 鍖咃細鎼滅储 `<鍖呭悕> nuget license`
- CDN 渚濊禆锛氭悳绱?`<搴撳悕> <鐗堟湰> license cdnjs` 鎴?`<搴撳悕> github LICENSE file`

濡傛灉鎼滅储缁撴灉涓嶆槑纭紝浜屾鎼滅储锛歚<鍖呭悕> github LICENSE file`銆傛棤娉曠‘瀹氱殑鏍囪涓?`UNKNOWN`銆?
### 3. 妫€鏌ュ崗璁吋瀹规€?
璇诲彇椤圭洰鏍圭洰褰曠殑 `LICENSE` 鍜?`LICENSE.COMPLIANCE.md`锛岃瘑鍒」鐩崗璁€傚鏂板鎴栫増鏈彉鏇寸殑渚濊禆锛屽弬鑰冨崗璁吋瀹规€х煩闃碉細

https://tpscsm-docs.pages.dev/license-audit/

涓嶅吋瀹规椂璀﹀憡鐢ㄦ埛骞剁粰鍑轰慨澶嶅缓璁紝渚嬪鏇存崲椤圭洰鍗忚銆佹浛鎹緷璧栨垨绉婚櫎渚濊禆銆?
### 4. 鏇存柊鏂囦欢

1. 鏇存柊 `LICENSE.LIST`锛氭坊鍔犮€佹洿鏂版垨绉婚櫎渚濊禆鏉＄洰锛屽苟鏇存柊缁熻鎽樿銆?2. 鏇存柊 `LICENSE.COMPLIANCE.md`锛氶噸鏂板垎鏋愬崗璁吋瀹规€с€佺户鎵块檺鍒跺拰绗笁鏂瑰０鏄庛€?3. 鏇存柊 `DEPENDENCY_LICENSE_AUDIT.zh-CN.md`锛氬悓姝ュ畬鏁翠腑鏂囧璁℃姤鍛娿€?
### 5. 椋庨櫓鏍囪

- 鉁?浣庨闄╋細MIT銆丅SD銆両SC銆丄pache-2.0銆乁nlicense銆丆C0-1.0
- 鈿狅笍 闇€鍏虫敞锛欸PL銆丄GPL銆丩GPL銆丮PL銆丅SL銆丼SPL
- 鉂?闇€纭锛歎NKNOWN銆丆C-BY-NC銆佽嚜瀹氫箟鍗忚

### 6. 閫氱煡鐢ㄦ埛

瀹屾垚鍚庨€氱煡鐢ㄦ埛锛?
- 鏂板銆佹洿鏂般€佺Щ闄ょ殑渚濊禆鏁伴噺銆?- 鏂板鎴栧彉鏇翠緷璧栫殑鍗忚鍒楄〃銆?- 鍏煎鎬ф鏌ョ粨璁恒€?- 鏄惁瀛樺湪鏂板椋庨櫓鍗忚鎴?UNKNOWN 鍗忚銆?
## 閲嶈璇存槑

- 鍙璁＄洿鎺ヤ緷璧栵紝涓嶅璁′紶閫掍緷璧栥€?- `UNKNOWN` 鍗忚闇€瑕佺敤鎴锋墜鍔ㄧ‘璁ゃ€?- 鏈粨搴撳綋鍓嶅洜 `pedalboard` 浣跨敤 GPL-3.0-only 浣滀负椤圭洰鍙戝竷鍗忚锛涘绉婚櫎姝や緷璧栵紝鍙噸鏂拌瘎浼伴」鐩崗璁€?