document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 基础工具与 UI 元素定义
  // ==========================================
  const getEl = (id) => document.getElementById(id);

  // 集中定义 UI 元素，使用安全获取方式
  const ui = {
    // 顶部与弹窗
    themeBtn: getEl('themeToggle'),
    settingsBtn: getEl('openSettingsBtn'),
    settingsModal: getEl('settingsModal'),
    closeSettingsBtn: getEl('closeSettingsBtn'),

    // 错误弹窗
    errorModal: getEl('errorModal'),
    errorMsg: getEl('errorMessage'),
    closeErrorBtn: getEl('closeErrorBtn'),
    confirmErrorBtn: getEl('confirmErrorBtn'),

    // 侧边栏 - 账号
    statusDot: document.querySelector('.status-dot'),
    aliasDisplay: getEl('currentAliasDisplay'),
    quotaDisplay: getEl('userQuota'),
    accountCard: getEl('accountCard'),
    accountDropdown: getEl('quickSwitchDropdown'),
    quickKeyInput: getEl('quickKeyInput'),
    quickKeyBtn: getEl('quickKeySubmitBtn'),

    // 侧边栏 - 控制
    voice: getEl('voiceSelect'),
    customVoiceId: getEl('customVoiceId'),
    checkVoiceIdBtn: getEl('checkVoiceIdBtn'),
    refresh: getEl('refreshVoices'),
    model: getEl('modelSelect'),
    format: getEl('formatSelect'), 

    // 侧边栏 - 参数
    stab: getEl('stability'),
    v3Stab: getEl('v3Stability'),
    v3Area: getEl('v3-stability-control'),
    stabilityArea: getEl('stability-control'),
    sim: getEl('similarity'),
    style: getEl('style'),
    boost: getEl('speakerBoost'),
    valStab: getEl('valStab'),
    valSim: getEl('valSim'),
    valStyle: getEl('valStyle'),
    v2Area: getEl('v2-specifics'),
    autoDelete: getEl('autoDelete'),
    autoSplit3Min: getEl('autoSplit3Min'),

    // 路径与内容区
    baseFolderInput: getEl('baseFolderInput'),
    quickFolder: getEl('quickFolderInput'),
    openFolder: getEl('quickOpenFolderBtn'),
    container: getEl('listContainer'), // 核心容器
    addBtn: getEl('addCardBtn'),
    splitLongBtn: getEl('splitLongBtn'),
    copySheetBtn: getEl('copySheetBtn'),
    clearBtn: getEl('clearAllBtn'),
    genBtn: getEl('generateBtn'),
    totalChars: getEl('totalCharsDisplay'),
    totalDuration: getEl('totalDurationDisplay'),
    remainChars: getEl('remainingDisplay'),
    statusBar: getEl('status'),

    // 设置与 Key 管理
    keyList: getEl('keyListContainer'),
    keyGroupFilter: getEl('keyGroupFilter'),
    refreshGroupBtn: getEl('refreshGroupBtn'),
    newGroup: getEl('newKeyGroup'),
    newAlias: getEl('newKeyAlias'),
    newKey: getEl('newKeyVal'),
    addKeyBtn: getEl('saveNewKeyBtn'),
    exportBtn: getEl('exportDataBtn'),
    importBtn: getEl('importDataBtn'),
    fileInput: getEl('importFileInput'),
    importKeysBtn: getEl('importKeysBtn'),
    keyFileInput: getEl('keyFileInput'),
    exportCsvBtn: getEl('exportCsvBtn'),

    // 其他工具工坊
    otherToolsBtn: getEl('otherToolsBtn'),
    sidebarOtherToolsBtn: getEl('sidebarOtherToolsBtn'),
    otherToolsModal: getEl('otherToolsModal'),
    closeOtherToolsBtn: getEl('closeOtherToolsBtn'),
    toolKeySelect: getEl('toolKeySelect'),
    otherToolsStatus: getEl('otherToolsStatus'),
    otherToolsAudioPanel: getEl('otherToolsAudioPanel'),
    otherToolsAudioMeta: getEl('otherToolsAudioMeta'),
    otherToolsAudioPlayer: getEl('otherToolsAudioPlayer'),
    otherToolsDownloadBtn: getEl('otherToolsDownloadBtn'),
    otherToolsHistoryWrap: getEl('otherToolsHistoryWrap'),
    otherToolsHistoryList: getEl('otherToolsHistoryList'),
    // 音效
    sfxPrompt: getEl('sfxPrompt'),
    sfxDurationMode: getEl('sfxDurationMode'),
    sfxDuration: getEl('sfxDuration'),
    sfxInfluence: getEl('sfxInfluence'),
    valSfxInfluence: getEl('valSfxInfluence'),
    sfxLoop: getEl('sfxLoop'),
    sfxAutoDownload: getEl('sfxAutoDownload'),
    sfxGenerateBtn: getEl('sfxGenerateBtn'),
    // 音乐
    musicPrompt: getEl('musicPrompt'),
    musicModel: getEl('musicModel'),
    musicDurationMode: getEl('musicDurationMode'),
    musicDurationSec: getEl('musicDurationSec'),
    musicInstrumental: getEl('musicInstrumental'),
    musicAutoDownload: getEl('musicAutoDownload'),
    musicGenerateBtn: getEl('musicGenerateBtn'),
    // 语音变声
    stsAudioFile: getEl('stsAudioFile'),
    stsCustomVoiceId: getEl('stsCustomVoiceId'),
    stsModel: getEl('stsModel'),
    stsRemoveNoise: getEl('stsRemoveNoise'),
    stsAutoDownload: getEl('stsAutoDownload'),
    stsGenerateBtn: getEl('stsGenerateBtn'),
    // 人声提取
    isoAudioFile: getEl('isoAudioFile'),
    isoAutoDownload: getEl('isoAutoDownload'),
    isoGenerateBtn: getEl('isoGenerateBtn'),
    // 语音转文字
    sttAudioFile: getEl('sttAudioFile'),
    sttModel: getEl('sttModel'),
    sttTagEvents: getEl('sttTagEvents'),
    sttDiarize: getEl('sttDiarize'),
    sttGenerateBtn: getEl('sttGenerateBtn'),
    sttOutputText: getEl('sttOutputText'),
    sttCopyBtn: getEl('sttCopyBtn'),
    sttDownloadTxtBtn: getEl('sttDownloadTxtBtn'),
    sttSendToQueueBtn: getEl('sttSendToQueueBtn'),

    // 声音清理与去重
    cleanVoicesBtn: getEl('cleanVoicesBtn'),
    voiceCleanupModal: getEl('voiceCleanupModal'),
    closeVoiceCleanupBtn: getEl('closeVoiceCleanupBtn'),
    cancelVoiceCleanupBtn: getEl('cancelVoiceCleanupBtn'),
    voiceCleanupSummary: getEl('voiceCleanupSummary'),
    voiceCleanupSearch: getEl('voiceCleanupSearch'),
    selectDuplicateVoicesBtn: getEl('selectDuplicateVoicesBtn'),
    clearVoiceSelectionBtn: getEl('clearVoiceSelectionBtn'),
    restoreHiddenVoicesBtn: getEl('restoreHiddenVoicesBtn'),
    dedupeVoiceSelectToggle: getEl('dedupeVoiceSelectToggle'),
    voiceCleanupList: getEl('voiceCleanupList'),
    voiceCleanupStatus: getEl('voiceCleanupStatus'),
    confirmDeleteVoicesBtn: getEl('confirmDeleteVoicesBtn')
  };

  const DEFAULT_KEY_GROUP = '默认分组';
  const NEW_GROUP_VALUE = '__new_group__';
  const QUOTA_SCAN_CONCURRENCY = 4;
  let quotaScanQueue = [];
  let quotaScanRunning = 0;

  // 全局状态管理
  let state = {
    keys: [],
    currentKey: '',
    currentQuota: 0,
    folder: '',
    baseFolder: 'ElevenLabs_Pro',
    voiceList: [],
    hiddenVoiceIds: [],
    dedupeVoiceSelect: true,
    selectedVoiceCleanupIds: new Set(),
    activeGroup: DEFAULT_KEY_GROUP,
    quotaListCache: {}
  };

  // ==========================================
  // 2. 核心通用函数
  // ==========================================

  // 状态栏提示
  function setStatus(msg, type = 'normal') {
    if (!ui.statusBar) return;
    ui.statusBar.textContent = msg;
    ui.statusBar.className = 'status-bar';
    if (type === 'error') ui.statusBar.classList.add('status-error');

    // 如果是普通消息，3秒后消失；如果是错误，6秒后消失
    const timeout = type === 'error' ? 6000 : 3000;
    setTimeout(() => {
      if (ui.statusBar.textContent === msg) {
        ui.statusBar.textContent = '就绪';
        ui.statusBar.className = 'status-bar';
      }
    }, timeout);
  }

  // 错误弹窗
  function showError(msg) {
    if (ui.errorMsg && ui.errorModal) {
      ui.errorMsg.textContent = msg;
      ui.errorModal.classList.remove('hidden');
    } else {
      alert(msg); // 兜底
    }
  }

  // ElevenLabs 官方只要求 xi-api-key 请求头，不要求 Key 必须是 sk_ 前缀。
  function stripWrappingQuotes(value) {
    let text = String(value || '').trim();
    while (
      text.length >= 2 &&
      ((text[0] === '"' && text[text.length - 1] === '"') ||
        (text[0] === "'" && text[text.length - 1] === "'") ||
        (text[0] === '`' && text[text.length - 1] === '`'))
    ) {
      text = text.slice(1, -1).trim();
    }
    return text;
  }

  function looksLikeApiKey(value) {
    const key = stripWrappingQuotes(value).replace(/[\u200B-\u200D\uFEFF]/g, '');
    if (!/^[A-Za-z0-9._+=-]{11,}$/.test(key)) return false;
    if (/^sutkn_/i.test(key)) return false;
    return !/^(api[_-]?key|elevenlabs[_-]?api[_-]?key|xi[_-]?api[_-]?key|key[_-]?id)$/i.test(key);
  }

  function findApiKeyInValue(value) {
    if (!value) return '';
    if (typeof value === 'string') return normalizeApiKey(value);
    if (Array.isArray(value)) {
      for (const item of value) {
        const key = findApiKeyInValue(item);
        if (key) return key;
      }
      return '';
    }
    if (typeof value === 'object') {
      const priorityFields = ['xi-api-key', 'xi_api_key', 'ELEVENLABS_API_KEY', 'apiKey', 'api_key', 'api-key', 'key'];
      for (const field of priorityFields) {
        if (Object.prototype.hasOwnProperty.call(value, field)) {
          const key = normalizeApiKey(value[field]);
          if (key) return key;
        }
      }
      for (const item of Object.values(value)) {
        const key = findApiKeyInValue(item);
        if (key) return key;
      }
    }
    return '';
  }

  function normalizeApiKey(raw) {
    if (!raw) return '';
    let text = String(raw).replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    if (!text) return '';
    text = stripWrappingQuotes(text);

    if ((text.startsWith('{') && text.endsWith('}')) || (text.startsWith('[') && text.endsWith(']'))) {
      try {
        const key = findApiKeyInValue(JSON.parse(text));
        if (key) return key;
      } catch (e) { }
    }

    const labeledPatterns = [
      /(?:xi-api-key|xi_api_key|ELEVENLABS_API_KEY|api[_\s-]*key)\s*[:=]\s*["'`]?([^"'`\s,;]+)/i,
      /-H\s+["'`]xi-api-key:\s*([^"'`\s]+)/i
    ];
    for (const pattern of labeledPatterns) {
      const match = text.match(pattern);
      if (match && looksLikeApiKey(match[1])) return stripWrappingQuotes(match[1]);
    }

    if (looksLikeApiKey(text)) return text;

    const candidates = text.match(/[A-Za-z0-9][A-Za-z0-9._+=-]{10,}/g) || [];
    const key = candidates.find(looksLikeApiKey);
    return key ? stripWrappingQuotes(key) : '';
  }

  function parseCsvLine(line) {
    const cells = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        cells.push(stripWrappingQuotes(cell));
        cell = '';
      } else {
        cell += ch;
      }
    }
    cells.push(stripWrappingQuotes(cell));
    return cells.map(c => c.trim()).filter(c => c);
  }

  function parseImportedKeyLine(line, fallbackAlias, fallbackGroup = state.activeGroup || DEFAULT_KEY_GROUP) {
    const cells = parseCsvLine(line);
    if (cells.length === 0) return null;

    let key = '';
    let keyIndex = -1;
    cells.forEach((cell, idx) => {
      if (!key) {
        const normalized = normalizeApiKey(cell);
        if (normalized) {
          key = normalized;
          keyIndex = idx;
        }
      }
    });

    if (!key) key = normalizeApiKey(line);
    if (!key) return null;

    const aliasCells = keyIndex > 0 ? cells.slice(0, keyIndex) : [];
    const group = aliasCells.length >= 2 ? normalizeGroupName(aliasCells[0]) : normalizeGroupName(fallbackGroup);
    const aliasSource = aliasCells.length >= 2 ? aliasCells.slice(1) : aliasCells;
    const alias = aliasSource
      .filter(c => !/^(分组|组|group|备注名|备注|名称|name|alias|api[_\s-]*key|key)$/i.test(c))
      .join(', ')
      .trim() || fallbackAlias;

    return { alias, key, group };
  }

  function normalizeGroupName(value) {
    return String(value || '').trim() || DEFAULT_KEY_GROUP;
  }

  function getKeyGroup(item) {
    return normalizeGroupName(item && item.group);
  }

  function normalizeKeyItems(items) {
    const seen = new Set();
    const list = [];
    (Array.isArray(items) ? items : []).forEach((item, idx) => {
      const rawKey = typeof item === 'string' ? item : item && item.key;
      const rawAlias = item && typeof item === 'object' ? item.alias : '';
      const rawGroup = item && typeof item === 'object' ? item.group : '';
      const key = normalizeApiKey(rawKey);
      if (!key || seen.has(key)) return;
      seen.add(key);
      list.push({ alias: (rawAlias || '账号 ' + (idx + 1)).trim(), key, group: normalizeGroupName(rawGroup) });
    });
    return list;
  }

  function getCurrentKeyGroup() {
    const item = state.keys.find(k => k.key === state.currentKey);
    return item ? getKeyGroup(item) : DEFAULT_KEY_GROUP;
  }

  function getGroups() {
    const groups = Array.from(new Set(state.keys.map(getKeyGroup).filter(Boolean)));
    if (groups.length === 0) groups.push(DEFAULT_KEY_GROUP);
    return groups.sort((a, b) => a.localeCompare(b, 'zh-CN'));
  }

  function countKeysInGroup(group) {
    return state.keys.filter(item => getKeyGroup(item) === group).length;
  }

  function ensureActiveGroup(preferred = '') {
    const groups = getGroups();
    const wanted = normalizeGroupName(preferred || state.activeGroup || getCurrentKeyGroup());
    state.activeGroup = groups.includes(wanted) ? wanted : (groups.includes(getCurrentKeyGroup()) ? getCurrentKeyGroup() : groups[0]);
    return state.activeGroup;
  }

  function getKeysInActiveGroup() {
    const group = ensureActiveGroup();
    return state.keys
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => getKeyGroup(item) === group);
  }

  function saveKeyList() {
    chrome.storage.local.set({ 'saved_key_list': state.keys });
  }

  function saveActiveGroup() {
    chrome.storage.local.set({ 'active_key_group': state.activeGroup });
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function groupOptionsHtml(selectedGroup, includeNewOption = false) {
    const selected = normalizeGroupName(selectedGroup);
    const options = getGroups().map(group => {
      const isSelected = group === selected ? ' selected' : '';
      return '<option value="' + escapeHtml(group) + '"' + isSelected + '>' + escapeHtml(group) + ' (' + countKeysInGroup(group) + ')</option>';
    });
    if (includeNewOption) options.push('<option value="' + NEW_GROUP_VALUE + '">+ 新分组</option>');
    return options.join('');
  }

  function renderGroupFilter() {
    const current = ensureActiveGroup();
    if (!ui.keyGroupFilter) return current;
    ui.keyGroupFilter.innerHTML = groupOptionsHtml(current);
    ui.keyGroupFilter.value = current;
    return current;
  }

  function setActiveGroup(group) {
    state.activeGroup = normalizeGroupName(group);
    ensureActiveGroup(state.activeGroup);
    saveActiveGroup();
    renderKeyList();
    if (ui.accountDropdown && !ui.accountDropdown.classList.contains('hidden')) renderQuickDropdown();
  }

  function moveKeyToGroup(idx, group) {
    if (!state.keys[idx]) return;
    state.keys[idx].group = normalizeGroupName(group);
    saveKeyList();
    updateAccountStatus();
    renderKeyList();
    if (ui.accountDropdown && !ui.accountDropdown.classList.contains('hidden')) renderQuickDropdown();
  }

  async function readElevenError(resp, fallback = 'API 请求失败') {
    let code = '';
    let message = '';

    try {
      const data = await resp.clone().json();
      const detail = data.detail || data;
      if (typeof detail === 'string') {
        message = detail;
      } else if (detail) {
        code = detail.code || detail.status || detail.type || data.code || data.status || '';
        message = detail.message || data.message || '';
      }
    } catch (e) {
      try { message = await resp.clone().text(); } catch (err) { }
    }

    return explainElevenError(resp.status, code, message) || message || `${fallback} (HTTP ${resp.status})`;
  }

  function explainElevenError(status, code, message) {
    const text = `${code} ${message}`.toLowerCase();
    if (text.includes('invalid_api_key') || text.includes('missing_api_key') || status === 401) {
      return `${message || 'API Key 无效或缺失'}\n\n已兼容非 sk_ 前缀 Key。请确认粘贴的是完整 ElevenLabs API Key，不是 Key ID、尾号 hint 或多余说明文字。`;
    }
    if (text.includes('insufficient_permissions')) {
      return `${message || 'API Key 权限不足'}\n\nElevenLabs 新 Key 可能默认受限，请在 API Keys 里给这个 Key 开启 Text to Speech、Voices/Models/User 等相关权限，或关闭 Restrict Key 后再试。`;
    }
    if (status === 403 || text.includes('forbidden') || text.includes('workspace_access_denied')) {
      if (text.includes('ip') || text.includes('allow')) {
        return `${message || '请求被拒绝'}\n\n这个 Key 可能开启了 IP allowlist，当前网络不在白名单内。`;
      }
      return `${message || '请求被拒绝'}\n\nKey 已被服务器识别，但权限、工作区访问、套餐或 IP 白名单可能不允许当前操作。`;
    }
    if (status === 429 || text.includes('rate_limit') || text.includes('concurrent_limit')) {
      return `${message || '请求太频繁'}\n\n触发了 ElevenLabs 速率或并发限制，稍等后再继续生成。`;
    }
    if (text.includes('quota') || text.includes('character_limit')) {
      return `${message || '额度不足'}\n\n这个 Key 的字符额度或自定义 credit limit 可能已经用完。`;
    }
    return message;
  }
  // 关闭错误弹窗
  if (ui.closeErrorBtn) ui.closeErrorBtn.addEventListener('click', () => ui.errorModal.classList.add('hidden'));
  if (ui.confirmErrorBtn) ui.confirmErrorBtn.addEventListener('click', () => ui.errorModal.classList.add('hidden'));

  // 切换深色模式
  if (ui.themeBtn) {
    ui.themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      ui.themeBtn.textContent = isDark ? '🌙' : '🌞';
      chrome.storage.local.set({ 'app_theme': isDark ? 'dark' : 'light' });
    });
  }

  // 打开/关闭设置
  if (ui.settingsBtn) {
    ui.settingsBtn.addEventListener('click', () => {
      renderKeyList();
      if (ui.settingsModal) ui.settingsModal.classList.remove('hidden');
    });
  }
  if (ui.closeSettingsBtn) {
    ui.closeSettingsBtn.addEventListener('click', () => ui.settingsModal.classList.add('hidden'));
  }

  // ==========================================
  // 3. 初始化加载逻辑
  // ==========================================
  function init() {
    chrome.storage.local.get(null, (res) => {
      // 恢复主题
      if (res.app_theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (ui.themeBtn) ui.themeBtn.textContent = '🌙';
      }

      // 恢复基础数据
      const rawKeyList = res.saved_key_list || [];
      state.keys = normalizeKeyItems(rawKeyList);
      state.currentKey = normalizeApiKey(res.xi_key) || '';
      state.folder = res.save_folder || '';
      state.activeGroup = ensureActiveGroup(res.active_key_group || getCurrentKeyGroup());
      if (JSON.stringify(rawKeyList) !== JSON.stringify(state.keys)) {
        saveKeyList();
      }
      if (res.xi_key && state.currentKey && res.xi_key !== state.currentKey) {
        chrome.storage.local.set({ 'xi_key': state.currentKey });
      }
      state.baseFolder = res.base_folder_name || 'ElevenLabs_Pro';

      if (ui.quickFolder) ui.quickFolder.value = state.folder;
      if (ui.baseFolderInput) ui.baseFolderInput.value = state.baseFolder;

      updateAccountStatus();

      // 恢复滑块和参数
      if (res.xi_stab) updateVal('stab', res.xi_stab);
      if (res.xi_sim) updateVal('sim', res.xi_sim);
      if (res.xi_style) updateVal('style', res.xi_style);
      if (res.xi_boost !== undefined && ui.boost) ui.boost.checked = res.xi_boost;
      if (res.auto_del !== undefined && ui.autoDelete) ui.autoDelete.checked = res.auto_del;
      if (ui.autoSplit3Min) ui.autoSplit3Min.checked = false;
      
      // 🌟 恢复格式选择
      if (res.output_format && ui.format) {
          ui.format.value = res.output_format;
      }

      // 加载模型和声音
      if (state.currentKey) {
        fetchModels(state.currentKey, res.xi_model);
        loadVoices(state.currentKey, res.xi_voice);
        fetchQuotaWithCache(state.currentKey, res.quota_cache);
      } else {
        if (res.xi_model) updateModelUI(res.xi_model);
      }

      // 恢复已保存的卡片
      if (ui.container) {
        ui.container.innerHTML = '';
        if (res.saved_cards && res.saved_cards.length > 0) {
          res.saved_cards.forEach(t => addCard(t, false));
        } else {
          addCard(); // 默认加一张空卡
        }
        updateStats();
      }
    });
  }
  init(); // 执行初始化

  // ==========================================
  // 4. 事件监听 - 基础控制与格式修复
  // ==========================================
  if (ui.autoDelete) ui.autoDelete.addEventListener('change', () => chrome.storage.local.set({ 'auto_del': ui.autoDelete.checked }));
  if (ui.autoSplit3Min) ui.autoSplit3Min.addEventListener('change', () => chrome.storage.local.set({ 'auto_split_3min': ui.autoSplit3Min.checked }));
  if (ui.splitLongBtn) ui.splitLongBtn.addEventListener('click', () => splitAllOverThreeMinutesCards());
  state.lastBatchSheetRows = [];
  try {
    const cachedBatch = typeof localStorage !== 'undefined' && localStorage.getItem('elevenlabs_last_batch_rows');
    if (cachedBatch) state.lastBatchSheetRows = JSON.parse(cachedBatch);
  } catch (_) {}

  async function writeTextToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {}
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    ta.remove();
    return true;
  }

  function buildBatchSheetCsv(records) {
    const escapeCsv = (val) => {
      const str = String(val ?? '').replace(/\r\n?/g, '\n');
      return '"' + str.replace(/"/g, '""') + '"';
    };
    const header = '序号,音频文件名,分段说明,字数,预计时长,状态,完整文案';
    const lines = records.map(r => [
      escapeCsv(r.indexLabel),
      escapeCsv(r.audioFilename),
      escapeCsv(r.splitNote || '原段'),
      escapeCsv(r.chars),
      escapeCsv(r.duration),
      escapeCsv(r.status || '已完成'),
      escapeCsv(r.text)
    ].join(','));
    return '\uFEFF' + [header, ...lines].join('\r\n') + '\r\n';
  }

  async function saveBatchSheetCsv(records, cfg) {
    if (!Array.isArray(records) || !records.length) return;
    const base = (cfg.baseFolder || 'ElevenLabs_Pro').replace(/[\\:*?"<>|]/g, '_') || 'ElevenLabs_Pro';
    const sub = cfg.folder ? cfg.folder.replace(/[\\:*?"<>|]/g, '_').trim() : '';
    const csvPath = sub ? `${base}/${sub}/000_文案对照表.csv` : `${base}/000_文案对照表.csv`;
    const csvContent = buildBatchSheetCsv(records);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    try {
      await new Promise(resolve => {
        chrome.downloads.download({ url, filename: csvPath, saveAs: false, conflictAction: 'uniquify' }, () => {
          resolve();
        });
      });
    } catch (_) {
    } finally {
      setTimeout(() => { try { URL.revokeObjectURL(url); } catch (_) {} }, 2000);
    }
  }

  async function copyTextsToSheet() {
    const cards = ui.container ? Array.from(ui.container.querySelectorAll('.card')) : [];
    let rows = cards.map(c => {
      const ta = c.querySelector('textarea');
      return ta ? ta.value.trim() : '';
    }).filter(Boolean);
    let fromBackup = false;
    if (rows.length === 0 && Array.isArray(state.lastBatchSheetRows) && state.lastBatchSheetRows.length > 0) {
      rows = state.lastBatchSheetRows.map(r => String(r && r.text || '').trim()).filter(Boolean);
      fromBackup = true;
    }
    if (rows.length === 0) {
      setStatus('当前没有可复制的文案', 'error');
      return;
    }
    const cleanRows = rows.map(t => t.replace(/[\r\n\t]+/g, ' ').trim());
    const sheetText = cleanRows.join('\n');
    await writeTextToClipboard(sheetText);
    if (ui.copySheetBtn) {
      const prev = ui.copySheetBtn.textContent;
      ui.copySheetBtn.textContent = `✅ 已复制 (${cleanRows.length}段)`;
      setTimeout(() => { if (ui.copySheetBtn) ui.copySheetBtn.textContent = prev || '📋 复制到表格'; }, 1800);
    }
    setStatus(fromBackup
      ? `📋 已从刚完成的任务恢复并复制 ${cleanRows.length} 段文案（可直接 Ctrl+V 粘贴到谷歌表格/Excel）`
      : `📋 已复制 ${cleanRows.length} 段文案到剪贴板（可直接 Ctrl+V 粘贴到谷歌表格/Excel，每段占一行）`);
  }

  if (ui.copySheetBtn) ui.copySheetBtn.addEventListener('click', () => copyTextsToSheet());
  
  // 🌟 格式选择监听 (修复：增加视觉反馈，不用确认按钮) 🌟
  if (ui.format) {
    ui.format.addEventListener('change', () => {
        const val = ui.format.value;
        chrome.storage.local.set({ 'output_format': val });
        
        let label = "MP3";
        if (val === 'mp3_as_mp4') label = "MP4 (视频格式)";
        else if (val.includes('pcm')) label = "WAV (无损)";
        else if (val.includes('192')) label = "MP3 (高质)";
        
        setStatus(`✅ 格式已切换: ${label}`);
    });
  }

  // 文件夹输入监听
  if (ui.baseFolderInput) {
    ui.baseFolderInput.addEventListener('input', (e) => {
      state.baseFolder = e.target.value.trim() || 'ElevenLabs_Pro';
      chrome.storage.local.set({ 'base_folder_name': state.baseFolder });
    });
  }
  if (ui.quickFolder) {
    ui.quickFolder.addEventListener('input', (e) => {
      state.folder = e.target.value.trim();
      chrome.storage.local.set({ 'save_folder': state.folder });
    });
  }

  // 按钮监听
  if (ui.addBtn) ui.addBtn.addEventListener('click', () => { addCard(); saveCards(); updateStats(); });
  if (ui.clearBtn) ui.clearBtn.addEventListener('click', () => { if (confirm('确认清空列表?')) { stopActivePreview(); ui.container.innerHTML = ''; addCard(); saveCards(); updateStats(); } });

  // ==========================================
  // 5. Voice ID 验证逻辑
  // ==========================================
  if (ui.checkVoiceIdBtn) {
    ui.checkVoiceIdBtn.addEventListener('click', () => {
      const id = ui.customVoiceId.value.trim();
      if (!id) return setStatus('请输入 ID', 'error');

      const exists = state.voiceList.find(v => v.voice_id === id);
      if (exists) {
        ui.voice.value = id;
        ui.customVoiceId.value = '';
        setStatus(`已选中: ${exists.name}`);
        return;
      }
      setStatus('正在验证 ID...');
      checkVoiceIdFromApi(id);
    });
  }

  async function checkVoiceIdFromApi(id) {
    if (!state.currentKey) return;
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/voices/${id}`, { headers: { 'xi-api-key': state.currentKey } });
      if (res.ok) {
        const data = await res.json();
        const opt = document.createElement('option');
        opt.value = data.voice_id;
        opt.textContent = `✅ [验证通过] ${data.name}`;
        opt.selected = true;
        ui.voice.prepend(opt);
        ui.customVoiceId.value = '';
        setStatus(`ID 有效: ${data.name}`);
      } else {
        setStatus(await readElevenError(res, 'Voice ID 验证失败'), 'error');
      }
    } catch (e) {
      setStatus(`验证失败：${e.message || '网络错误'}`, 'error');
    }
  }

  // ==========================================
  // 6. 核心生成逻辑 (Batch Generate)
  // ==========================================
  if (ui.genBtn) {
    ui.genBtn.addEventListener('click', async () => {
      if (!state.currentKey) return showError('请先配置 API Key');
      if (!ui.container) return showError('UI 错误：找不到列表容器，请刷新插件。');

      const cards = Array.from(ui.container.querySelectorAll('.card'));
      const texts = cards.map(c => c.querySelector('textarea').value.trim()).filter(t => t);
      if (texts.length === 0) return showError('文案列表为空！请先添加文案。');

      // 锁定按钮
      ui.genBtn.disabled = true;
      
      // 🌟 修复：获取格式，并显示在状态栏
      const selectedVoiceId = ui.customVoiceId.value.trim() || ui.voice.value;
      const rawFormat = ui.format ? ui.format.value : 'mp3_44100_128';

      // 格式处理逻辑
      let apiFormat = rawFormat;
      let fileExt = 'mp3';
      if (rawFormat === 'mp3_as_mp4') {
        apiFormat = 'mp3_44100_128';
        fileExt = 'mp4';
      } else if (rawFormat.startsWith('pcm')) {
        fileExt = 'wav';
      }
      
      // 显示正在使用的格式
      const allBatchTexts = cards.map(c => c.querySelector('textarea') ? c.querySelector('textarea').value.trim() : '').join('\n');
      if (textHasBracketAudioTag(allBatchTexts) && TAG_UNSUPPORTED_V2_MODELS.has(ui.model.value)) {
        ensureTagCompatibleModel(allBatchTexts);
      }
      ui.genBtn.textContent = `生成中 (${fileExt.toUpperCase()})...`;
      setStatus(`🚀 开始批量生成 (模型: ${ui.model.value} · 格式: ${fileExt.toUpperCase()})`);

      const cfg = {
        key: state.currentKey,
        voice: selectedVoiceId,
        model: ui.model.value,
        apiFormat: apiFormat,
        fileExt: fileExt,
        stab: ui.model.value === 'eleven_v3' && ui.v3Stab ? parseFloat(ui.v3Stab.value) : parseFloat(ui.stab.value),
        sim: parseFloat(ui.sim.value),
        style: parseFloat(ui.style.value),
        boost: ui.boost.checked,
        folder: state.folder,
        baseFolder: state.baseFolder
      };

      const batchSheetRecords = cards.map((card, i) => {
        const text = card.querySelector('textarea').value.trim();
        if (!text) return null;
        const cleanBodyForName = text.replace(/^(?:\s*\[[^\]]{1,300}\]\s*)+/, '').replace(/\[[^\]]{1,80}\]/g, ' ').trim() || text;
        const safeText = cleanBodyForName.substring(0, 15).replace(/[\n\r]/g, '').replace(/[\\/:*?"<>|]/g, '_').trim() || `audio_${i + 1}`;
        const est = estimateDuration(text, 1);
        return {
          card,
          index: i + 1,
          indexLabel: String(i + 1),
          audioFilename: `${i + 1}_${safeText}.${fileExt}`,
          splitNote: card.dataset.splitNote || '原段',
          chars: text.length,
          duration: est.formatted,
          status: '待生成',
          text,
          downloaded: false
        };
      }).filter(Boolean);
      state.lastBatchSheetRows = batchSheetRecords;
      try { if (typeof localStorage !== 'undefined') localStorage.setItem('elevenlabs_last_batch_rows', JSON.stringify(batchSheetRecords)); } catch (_) {}

      // 循环处理每个卡片
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const text = card.querySelector('textarea').value.trim();
        if (!text) continue;
        const rec = batchSheetRecords.find(r => r.index === i + 1);

        setStatus(`生成 ${i + 1}/${cards.length} ...`);
        try {
          await generate(text, cfg, i + 1);
          if (rec) {
            rec.downloaded = true;
            rec.status = '已完成';
          }
          
          // 成功后：扣除额度显示，删除卡片
          if (state.currentQuota >= text.length) {
            state.currentQuota -= text.length;
            updateStatsUI(state.currentQuota);
          }
          if (ui.autoDelete.checked) {
            card.remove();
            refreshIndexes();
            saveCards();
            updateStats();
          }
          // 稍微延迟，防止 API 速率限制
          await new Promise(r => setTimeout(r, 800));

        } catch (e) {
          if (rec) rec.status = '失败';
          if (batchSheetRecords.some(r => r.downloaded)) {
            await saveBatchSheetCsv(batchSheetRecords, cfg);
          }
          setStatus(`❌ 第 ${i + 1} 段生成失败`, 'error');
          showError(`❌ 生成第 ${i + 1} 段时失败：\n${e.message}\n\n(如果是"Free users..."请使用"系统默认"声音或使用"网页跳转"功能)`);
          ui.genBtn.disabled = false;
          ui.genBtn.textContent = '🚀 批量生成';
          return;
        }
      }

      if (batchSheetRecords.some(r => r.downloaded)) {
        try { if (typeof localStorage !== 'undefined') localStorage.setItem('elevenlabs_last_batch_rows', JSON.stringify(batchSheetRecords)); } catch (_) {}
        await saveBatchSheetCsv(batchSheetRecords, cfg);
      }
      setStatus('✅ 全部完成（已自动保存 000_文案对照表.csv）');
      fetchQuota(cfg.key); // 刷新最新额度
      ui.genBtn.disabled = false;
      ui.genBtn.textContent = '🚀 批量生成';
    });
  }

  // 单次调用 API 的函数
  async function generate(text, cfg, index) {
    const isTagged = textHasBracketAudioTag(text);
    const isSinging = /\[[^\]]*\b(sing|singing|gospel|melodic|vibrato|sustained notes)\b/i.test(text);
    const buildSettings = (modelId) => {
      if (modelId === 'eleven_v3') {
        if (isSinging && ui.v3Stab && Number(ui.v3Stab.value) === 0) return { stability: 0 };
        if (isSinging && Number(cfg.stab) <= 0.5) return { stability: 0 };
        const s = Number(cfg.stab);
        return { stability: s <= 0.35 ? 0 : (s >= 0.75 ? 1 : 0.5) };
      }
      const s = { stability: cfg.stab, similarity_boost: cfg.sim };
      if (modelId === 'eleven_multilingual_v2') {
        s.style = cfg.style;
        s.use_speaker_boost = cfg.boost;
      }
      return s;
    };

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${cfg.voice}?output_format=${cfg.apiFormat}`;
    const preferredModel = (isTagged && TAG_UNSUPPORTED_V2_MODELS.has(cfg.model)) ? 'eleven_v3' : cfg.model;
    const candidateModels = isTagged
      ? [...new Set([preferredModel, 'eleven_v3', 'eleven_v4', 'eleven_multilingual_v2'])]
      : [...new Set([cfg.model, 'eleven_multilingual_v2', 'eleven_flash_v2_5', 'eleven_turbo_v2_5'])];
    const activeEffects = buildAudioEffectsPayload();
    let resp = null;
    for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
      const targetModel = candidateModels[mIdx];
      const reqBody = {
        text: text,
        model_id: targetModel,
        voice_settings: buildSettings(targetModel)
      };
      if (activeEffects && Object.keys(activeEffects).length > 0 && !String(cfg.apiFormat || '').startsWith('pcm')) {
        reqBody.audio_effects = activeEffects;
      }
      resp = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': cfg.key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      });
      if (!resp.ok && reqBody.audio_effects && [400, 404, 422].includes(resp.status)) {
        const fallbackBody = { ...reqBody };
        delete fallbackBody.audio_effects;
        resp = await fetch(url, {
          method: 'POST',
          headers: {
            'xi-api-key': cfg.key,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fallbackBody)
        });
      }
      if (resp.ok || resp.status === 401 || resp.status === 429) break;
      const errCloneText = await resp.clone().text().catch(() => '');
      if (!/model|stability|invalid|unsupported|not_found/i.test(errCloneText) && resp.status !== 400 && resp.status !== 404 && resp.status !== 422) {
        break;
      }
    }

    if (!resp.ok) {
      throw new Error(await readElevenError(resp, '生成失败'));
    }

    const blob = await resp.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        // 构建文件名（忽略开头情绪/风格标签）
        const cleanBodyForName = text.replace(/^(?:\s*\[[^\]]{1,300}\]\s*)+/, '').replace(/\[[^\]]{1,80}\]/g, ' ').trim() || text;
        const safeText = cleanBodyForName.substring(0, 15).replace(/[\n\r]/g, '').replace(/[\\/:*?"<>|]/g, "_").trim() || `audio_${index}`;
        let filename = `${index}_${safeText}.${cfg.fileExt}`;

        const base = cfg.baseFolder.replace(/[\\:*?"<>|]/g, "_") || "ElevenLabs_Pro";
        const sub = cfg.folder ? cfg.folder.replace(/[\\:*?"<>|]/g, "_").trim() : "";
        const finalPath = sub ? `${base}/${sub}/${filename}` : `${base}/${filename}`;

        chrome.downloads.download({
          url: reader.result,
          filename: finalPath,
          saveAs: false,
          conflictAction: 'uniquify'
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error("下载失败:", chrome.runtime.lastError);
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      };
    });
  }

  // ==========================================
  // 7. API 数据获取 (Voices, Models, Quota)
  // ==========================================
  function normalizeVoiceNameKey(name) {
    return String(name || '').trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function analyzeVoicesForCleanup() {
    const hiddenSet = new Set(Array.isArray(state.hiddenVoiceIds) ? state.hiddenVoiceIds : []);
    const visibleVoices = (Array.isArray(state.voiceList) ? state.voiceList : []).filter(v => v && v.voice_id && !hiddenSet.has(v.voice_id));
    const groupsByName = new Map();
    for (const voice of visibleVoices) {
      const key = normalizeVoiceNameKey(voice.name);
      if (!key) continue;
      const list = groupsByName.get(key) || [];
      list.push(voice);
      groupsByName.set(key, list);
    }

    const duplicateGroups = [];
    const duplicateExtraIds = [];
    const singleCustomVoices = [];
    for (const [, group] of groupsByName.entries()) {
      if (group.length > 1) {
        duplicateGroups.push(group);
        for (let i = 1; i < group.length; i++) {
          if (group[i].category !== 'premade') {
            duplicateExtraIds.push(group[i].voice_id);
          }
        }
      } else if (group[0] && group[0].category !== 'premade') {
        singleCustomVoices.push(group[0]);
      }
    }

    return {
      visibleVoices,
      duplicateGroups,
      duplicateExtraIds,
      singleCustomVoices,
      hiddenCount: hiddenSet.size
    };
  }

  function renderVoiceSelectOptions(savedId = null) {
    if (!ui.voice) return;
    const prevValue = savedId || ui.voice.value;
    const { visibleVoices, duplicateExtraIds } = analyzeVoicesForCleanup();

    if (ui.cleanVoicesBtn) {
      const dupCount = duplicateExtraIds.length;
      ui.cleanVoicesBtn.textContent = dupCount > 0 ? `🧹 清理重名 (${dupCount})` : '🧹 清理声音';
      ui.cleanVoicesBtn.classList.toggle('has-dups', dupCount > 0);
    }

    ui.voice.innerHTML = '';
    const groupMy = document.createElement('optgroup'); groupMy.label = "【我的克隆/生成】";
    const groupLib = document.createElement('optgroup'); groupLib.label = "【资料库添加 (免费号受限)】";
    const groupSys = document.createElement('optgroup'); groupSys.label = "【系统默认 (推荐)】";

    let hasMy = 0, hasLib = 0;
    const sorted = [...visibleVoices].sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
    const seenNames = new Map();

    sorted.forEach(v => {
      const nameKey = normalizeVoiceNameKey(v.name);
      const count = (seenNames.get(nameKey) || 0) + 1;
      seenNames.set(nameKey, count);
      if (state.dedupeVoiceSelect && count > 1 && v.category !== 'premade') return;

      const opt = document.createElement('option');
      opt.value = v.voice_id;
      const suffix = (!state.dedupeVoiceSelect && count > 1) ? ` [#${count} · ${String(v.voice_id || '').slice(-4)}]` : '';
      opt.textContent = `${v.name}${suffix}`;
      if (v.category === 'premade') {
        groupSys.appendChild(opt);
      } else if (v.category === 'cloned' || v.category === 'generated') {
        opt.textContent = `★ ${v.name}${suffix}`;
        groupMy.appendChild(opt);
        hasMy++;
      } else {
        groupLib.appendChild(opt);
        hasLib++;
      }
    });

    if (hasMy > 0) {
      const title = document.createElement('option'); title.disabled = true; title.textContent = "─── ⭐ 我的声音 ───";
      ui.voice.appendChild(title);
      Array.from(groupMy.children).forEach(o => ui.voice.appendChild(o));
    }
    if (hasLib > 0) ui.voice.appendChild(groupLib);
    ui.voice.appendChild(groupSys);

    if (prevValue && visibleVoices.some(v => v.voice_id === prevValue)) {
      ui.voice.value = prevValue;
    } else if (state.lastSelectedVoiceName) {
      const matchedByName = visibleVoices.find(v => normalizeVoiceNameKey(v.name) === normalizeVoiceNameKey(state.lastSelectedVoiceName));
      if (matchedByName) ui.voice.value = matchedByName.voice_id;
    }
    const curVoiceObj = visibleVoices.find(v => v.voice_id === ui.voice.value);
    if (curVoiceObj && curVoiceObj.name) state.lastSelectedVoiceName = curVoiceObj.name;
  }

  async function loadVoices(key, savedId = null) {
    if (!key) return;
    if (ui.voice) ui.voice.innerHTML = '<option>⏳ 加载中...</option>';
    try {
      const pref = await new Promise(r => chrome.storage.local.get(['hiddenVoiceIds', 'dedupeVoiceSelect'], r));
      if (Array.isArray(pref?.hiddenVoiceIds)) state.hiddenVoiceIds = pref.hiddenVoiceIds;
      if (pref?.dedupeVoiceSelect !== undefined) state.dedupeVoiceSelect = Boolean(pref.dedupeVoiceSelect);
      if (ui.dedupeVoiceSelectToggle) ui.dedupeVoiceSelectToggle.checked = state.dedupeVoiceSelect;

      const res = await fetch('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': key } });
      if (!res.ok) {
        throw new Error(await readElevenError(res, '声音列表加载失败'));
      }
      const data = await res.json();
      state.voiceList = Array.isArray(data.voices) ? data.voices : [];
      state.voiceCacheByKey = state.voiceCacheByKey || {};
      state.voiceCacheByKey[key] = state.voiceList;

      renderVoiceSelectOptions(savedId);
      setStatus('声音列表已更新');
    } catch (e) {
      console.error(e);
      if (ui.voice) ui.voice.innerHTML = `<option>❌ 获取失败</option>`;
      showError(`声音列表加载失败：\n${e.message}`);
    }
  }

  async function fetchModels(key, savedModelId = null) {
    try {
      const cached = await new Promise(r => chrome.storage.local.get(['models_cache'], res => r(res.models_cache)));
      const now = Date.now();
      // 缓存 24 小时
      if (cached && cached.data && (now - cached.ts < 86400000)) {
        renderModels(cached.data, savedModelId);
        fetchModelsFromApi(key, savedModelId, false);
      } else {
        fetchModelsFromApi(key, savedModelId, true);
      }
    } catch (e) { console.error(e); }
  }

  async function fetchModelsFromApi(key, savedModelId, updateUI = true) {
    try {
      const res = await fetch('https://api.elevenlabs.io/v1/models', { headers: { 'xi-api-key': key } });
      if (!res.ok) {
        const msg = await readElevenError(res, '模型列表加载失败');
        if (updateUI) setStatus(msg, 'error');
        return;
      }
      const data = await res.json();
      chrome.storage.local.set({ 'models_cache': { data: data, ts: Date.now() } });
      if (updateUI) renderModels(data, savedModelId);
    } catch (e) { }
  }

  function renderModels(models, savedModelId) {
    if (!ui.model) return;
    const prevSelected = savedModelId || ui.model.value || 'eleven_multilingual_v2';
    const builtinModels = [
      { model_id: 'eleven_v3', name: 'Eleven v3 (支持 [...] 情绪/唱歌标签)' },
      { model_id: 'eleven_v4', name: 'Eleven v4 (高质量 / 支持 [...] 标签)' },
      { model_id: 'eleven_multilingual_v2', name: 'Multilingual v2 (经典朗读)' },
      { model_id: 'eleven_turbo_v2_5', name: 'Turbo v2.5 (极速)' },
      { model_id: 'eleven_flash_v2_5', name: 'Flash v2.5 (快速)' }
    ];
    const byId = new Map(builtinModels.map(m => [m.model_id, { ...m }]));
    if (Array.isArray(models)) {
      models.forEach(m => {
        if (!m || !m.model_id || m.can_do_text_to_speech === false) return;
        byId.set(m.model_id, { ...byId.get(m.model_id), ...m });
      });
    }
    const mergedModels = Array.from(byId.values());
    ui.model.innerHTML = '';
    
    const groupMain = document.createElement('optgroup'); groupMain.label = "🔥 核心模型";
    const groupOther = document.createElement('optgroup'); groupOther.label = "🧊 其他模型";
    
    const mainIds = ['eleven_v3', 'eleven_v4', 'eleven_multilingual_v2', 'eleven_turbo_v2_5', 'eleven_flash_v2_5'];
    
    mergedModels.sort((a, b) => {
      let idxA = mainIds.indexOf(a.model_id);
      let idxB = mainIds.indexOf(b.model_id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return String(a.name || a.model_id).localeCompare(String(b.name || b.model_id));
    });

    mergedModels.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.model_id;
      let name = m.name;
      if (m.model_id === 'eleven_v3') name = 'Eleven v3 (推荐·支持 [...] 情绪/唱歌标签)';
      if (m.model_id === 'eleven_v4') name = 'Eleven v4 (高质量·支持 [...] 标签)';
      if (m.model_id === 'eleven_multilingual_v2') name = 'Multilingual v2 (经典朗读)';
      if (m.model_id === 'eleven_turbo_v2_5') name = 'Turbo v2.5 (极速)';
      if (m.model_id === 'eleven_flash_v2_5') name = 'Flash v2.5 (快速)';
      opt.textContent = name;
      
      if (mainIds.includes(m.model_id)) groupMain.appendChild(opt);
      else groupOther.appendChild(opt);
    });

    ui.model.appendChild(groupMain);
    ui.model.appendChild(groupOther);
    if (prevSelected && Array.from(ui.model.options).some(o => o.value === prevSelected)) {
      ui.model.value = prevSelected;
    }
    updateModelUI();
  }

  async function fetchQuotaWithCache(key, cacheData) {
    const now = Date.now();
    // 缓存 5 分钟
    if (cacheData && cacheData.key === key && (now - cacheData.ts < 300000)) {
      state.currentQuota = cacheData.amount;
      updateStatsUI(state.currentQuota);
      fetchQuota(key, true); // 静默更新
    } else {
      if (ui.quotaDisplay) ui.quotaDisplay.textContent = '更新中...';
      if (ui.remainChars) ui.remainChars.textContent = '...';
      fetchQuota(key);
    }
  }

  async function fetchQuota(key, isSilent = false) {
    try {
      const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: { 'xi-api-key': key } });
      if (!res.ok) throw new Error(await readElevenError(res, '额度查询失败'));
      const data = await res.json();
      state.currentQuota = data.character_limit - data.character_count;
      updateStatsUI(state.currentQuota);
      chrome.storage.local.set({ 'quota_cache': { key: key, amount: state.currentQuota, ts: Date.now() } });
    } catch (e) {
      if (!isSilent && ui.quotaDisplay) ui.quotaDisplay.textContent = e.message && e.message.includes('权限') ? '权限受限' : '未知';
      if (!isSilent && ui.remainChars) ui.remainChars.textContent = '额度未知';
      if (!isSilent) setStatus(e.message || '额度查询失败', 'error');
    }
  }

  function updateStatsUI(quota) {
    if (ui.quotaDisplay) ui.quotaDisplay.textContent = `剩 ${quota.toLocaleString()} 字`;
    updateStats();
  }

  // ==========================================
  // 8. Key 管理与账号切换
  // ==========================================
  function handleQuickKey() {
    const key = normalizeApiKey(ui.quickKeyInput.value);
    if (!key) return showError('未识别到 API Key。可以直接粘贴完整 Key，也可以粘贴 xi-api-key: xxx 或 ELEVENLABS_API_KEY=xxx。');
    if (state.keys.some(k => k.key === key)) {
      setStatus('Key 已存在');
      switchKey(key);
      ui.quickKeyInput.value = '';
      return;
    }
    const alias = '账号 ' + (state.keys.length + 1);
    const group = ensureActiveGroup();
    state.keys.push({ alias, key, group });
    saveKeyList();
    switchKey(key);
    ui.quickKeyInput.value = '';
    renderGroupFilter();
    setStatus('已添加: ' + alias);
  }

  if (ui.quickKeyBtn) ui.quickKeyBtn.addEventListener('click', handleQuickKey);
  if (ui.quickKeyInput) ui.quickKeyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleQuickKey(); });
  if (ui.keyGroupFilter) ui.keyGroupFilter.addEventListener('change', (e) => setActiveGroup(e.target.value));
  if (ui.refreshGroupBtn) ui.refreshGroupBtn.addEventListener('click', () => renderKeyList(true));

  function renderKeyList(forceRefresh = false) {
    if (!ui.keyList) return;
    const group = renderGroupFilter();
    ui.keyList.innerHTML = '';
    if (state.keys.length === 0) {
      ui.keyList.innerHTML = '<div class="empty-tip">暂无 Key</div>';
      return;
    }

    const visibleItems = getKeysInActiveGroup();
    if (visibleItems.length === 0) {
      ui.keyList.innerHTML = '<div class="empty-tip">当前分组为空</div>';
      return;
    }

    visibleItems.forEach(({ item, idx }) => {
      const div = document.createElement('div');
      const isActive = item.key === state.currentKey;
      const groupName = getKeyGroup(item);
      div.className = 'key-item ' + (isActive ? 'active' : '');
      div.innerHTML =
        '<div class="key-main-info">' +
          '<div class="key-header">' +
            '<span class="key-alias" title="修改">' + escapeHtml(item.alias) + '</span>' +
            '<span class="key-edit">✎</span>' +
            (isActive ? '<span class="current-badge">当前</span>' : '') +
            '<span class="quota-tag loading" id="quota-tag-' + idx + '">...</span>' +
            '<span class="reset-tag" id="reset-tag-' + idx + '"></span>' +
          '</div>' +
          '<div class="key-code">' + escapeHtml(groupName) + ' · •••• ' + escapeHtml(item.key.slice(-4)) + '</div>' +
        '</div>' +
        '<div class="key-actions">' +
          '<select class="key-group-select" title="移动分组">' + groupOptionsHtml(groupName, true) + '</select>' +
          '<div class="key-del" title="删除">🗑️</div>' +
        '</div>';

      const aliasSpan = div.querySelector('.key-alias');
      const editBtn = div.querySelector('.key-edit');
      const groupSelect = div.querySelector('.key-group-select');

      div.addEventListener('click', (e) => {
        if (!e.target.closest('.key-del') && !e.target.closest('.key-edit') && !e.target.closest('input') && !e.target.closest('select')) {
          switchKey(item.key);
        }
      });

      const startEditing = (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.type = 'text'; input.value = item.alias; input.className = 'alias-input';
        aliasSpan.replaceWith(input);
        input.focus();

        const save = () => {
          const val = input.value.trim();
          if (val && val !== item.alias) {
            state.keys[idx].alias = val;
            saveKeyList();
            updateAccountStatus();
          }
          renderKeyList();
        };
        input.addEventListener('blur', save);
        input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') save(); });
        input.addEventListener('click', (ev) => ev.stopPropagation());
      };

      editBtn.addEventListener('click', startEditing);
      groupSelect.addEventListener('click', (e) => e.stopPropagation());
      groupSelect.addEventListener('change', (e) => {
        let nextGroup = e.target.value;
        if (nextGroup === NEW_GROUP_VALUE) {
          nextGroup = prompt('新分组名称', group || DEFAULT_KEY_GROUP);
          if (!nextGroup) {
            e.target.value = groupName;
            return;
          }
        }
        moveKeyToGroup(idx, nextGroup);
      });

      div.querySelector('.key-del').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('删除 ' + item.alias + '?')) {
          state.keys.splice(idx, 1);
          saveKeyList();
          if (item.key === state.currentKey) {
            state.currentKey = '';
            chrome.storage.local.remove('xi_key');
            updateAccountStatus();
          }
          ensureActiveGroup();
          saveActiveGroup();
          renderKeyList();
        }
      });

      ui.keyList.appendChild(div);
      const quotaTag = document.getElementById('quota-tag-' + idx);
      queueQuotaCheck(item.key, quotaTag, false, document.getElementById('reset-tag-' + idx), forceRefresh);
    });
  }

  function switchKey(key) {
    const normalizedKey = normalizeApiKey(key);
    if (!normalizedKey) return showError('未识别到可用的 ElevenLabs API Key。');
    state.currentKey = normalizedKey;
    const item = state.keys.find(k => k.key === normalizedKey);
    if (item) {
      state.activeGroup = getKeyGroup(item);
      saveActiveGroup();
    }
    state.currentQuota = 0;
    chrome.storage.local.set({ 'xi_key': normalizedKey });
    updateAccountStatus();
    if (ui.quotaDisplay) ui.quotaDisplay.textContent = '↻ 刷新中...';
    fetchModels(normalizedKey);
    loadVoices(normalizedKey);
    fetchQuota(normalizedKey);
    if (ui.settingsModal) ui.settingsModal.classList.add('hidden');
    setStatus('✅ 已切换');
  }

  function updateAccountStatus() {
    if (!state.currentKey) {
      ui.statusDot.classList.remove('active');
      ui.aliasDisplay.textContent = '未配置 Key';
      ui.quotaDisplay.textContent = '请配置';
      return;
    }
    const item = state.keys.find(k => k.key === state.currentKey);
    ui.statusDot.classList.add('active');
    ui.aliasDisplay.textContent = item ? item.alias : '未知';
    if (ui.aliasDisplay && item) ui.aliasDisplay.title = getKeyGroup(item);
  }

  // ==========================================
  // 9. 导入导出与其他功能
  // ==========================================
  // 导出 CSV
  if (ui.exportCsvBtn) {
    ui.exportCsvBtn.addEventListener('click', () => {
      if (state.keys.length === 0) return alert('无数据');
      let c = "\uFEFF分组,备注名,API_Key\n";
      state.keys.forEach(k => {
        const group = '"' + String(getKeyGroup(k)).replace(/"/g, '""') + '"';
        const a = '"' + String(k.alias).replace(/"/g, '""') + '"';
        const key = '"' + String(k.key).replace(/"/g, '""') + '"';
        c += group + ',' + a + ',' + key + '\n';
      });
      const b = new Blob([c], { type: 'text/csv;charset=utf-8;' });
      chrome.downloads.download({ url: URL.createObjectURL(b), filename: `ElevenLabs_Keys.csv`, saveAs: true });
    });
  }
  
  // 快速下拉菜单
  if (ui.accountCard) {
    ui.accountCard.addEventListener('click', (e) => {
      e.stopPropagation();
      ui.accountDropdown.classList.toggle('hidden');
      if (!ui.accountDropdown.classList.contains('hidden')) renderQuickDropdown();
    });
  }
  if (ui.accountDropdown) ui.accountDropdown.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', () => ui.accountDropdown.classList.add('hidden'));

  function renderQuickDropdown() {
    ui.accountDropdown.innerHTML = '';
    if (state.keys.length === 0) {
      ui.accountDropdown.innerHTML = '<div style="padding:10px;font-size:12px;color:#888;">暂无账号</div>';
      return;
    }

    const currentGroup = ensureActiveGroup();
    const filter = document.createElement('div');
    filter.className = 'quick-group-filter';
    filter.innerHTML = '<select class="quick-group-select" title="切换分组">' + groupOptionsHtml(currentGroup) + '</select>';
    const quickSelect = filter.querySelector('select');
    quickSelect.value = currentGroup;
    quickSelect.addEventListener('change', (e) => setActiveGroup(e.target.value));
    ui.accountDropdown.appendChild(filter);

    const visibleItems = getKeysInActiveGroup();
    if (visibleItems.length === 0) {
      ui.accountDropdown.insertAdjacentHTML('beforeend', '<div style="padding:10px;font-size:12px;color:#888;">当前分组为空</div>');
      return;
    }

    visibleItems.forEach(({ item, idx }) => {
      const div = document.createElement('div');
      div.className = 'dropdown-item ' + (item.key === state.currentKey ? 'active' : '');
      div.innerHTML = '<span class="dd-name">' + escapeHtml(item.alias) + '</span><span class="dd-quota" id="dd-quota-' + idx + '">...</span>';
      div.addEventListener('click', () => {
        switchKey(item.key);
        ui.accountDropdown.classList.add('hidden');
      });
      ui.accountDropdown.appendChild(div);
      const quotaTag = document.getElementById('dd-quota-' + idx);
      queueQuotaCheck(item.key, quotaTag, true);
    });
  }

  // 打开文件夹
  if (ui.openFolder) {
    ui.openFolder.addEventListener('click', () => {
      const sub = state.folder.replace(/[\\:*?"<>|]/g, "_") || "ElevenLabs_Pro";
      chrome.downloads.search({ limit: 10, orderBy: ['-startTime'] }, (items) => {
        let f = false;
        for (let i of items) if (i.exists && i.filename.includes(sub)) { chrome.downloads.show(i.id); f = true; break; }
        if (!f) chrome.downloads.showDefaultFolder();
      });
    });
  }

  // 配置文件导出导入
  if (ui.exportBtn) ui.exportBtn.addEventListener('click', () => { chrome.storage.local.get(null, (i) => { const b = new Blob([JSON.stringify(i, null, 2)], { type: 'application/json' }); chrome.downloads.download({ url: URL.createObjectURL(b), filename: `Config.json`, saveAs: true }); }); });
  if (ui.importBtn) ui.importBtn.addEventListener('click', () => ui.fileInput.click());
  if (ui.fileInput) ui.fileInput.addEventListener('change', (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => { try { chrome.storage.local.clear(() => chrome.storage.local.set(JSON.parse(ev.target.result), () => { alert('恢复成功'); init(); renderKeyList(); })); } catch (err) { alert('错误'); } }; r.readAsText(f); e.target.value = ''; });

  // Key 添加
  if (ui.addKeyBtn) ui.addKeyBtn.addEventListener('click', () => {
    const group = normalizeGroupName(ui.newGroup ? ui.newGroup.value : state.activeGroup);
    const alias = ui.newAlias.value.trim() || '账号 ' + (state.keys.length + 1);
    const key = normalizeApiKey(ui.newKey.value);
    if (!key) return showError('未识别到 API Key。可以直接粘贴完整 Key，也可以粘贴 xi-api-key: xxx 或 ELEVENLABS_API_KEY=xxx。');
    if (state.keys.some(k => k.key === key)) {
      setStatus('Key 已存在');
      switchKey(key);
      return;
    }
    const shouldSwitch = state.keys.length === 0;
    state.activeGroup = group;
    state.keys.push({ alias, key, group });
    saveKeyList();
    saveActiveGroup();
    if (shouldSwitch) switchKey(key);
    if (ui.newGroup) ui.newGroup.value = '';
    ui.newAlias.value = '';
    ui.newKey.value = '';
    renderKeyList();
    setStatus(`已添加: ${alias}`);
  });
  
  // 批量导入 Key
  if (ui.importKeysBtn) ui.importKeysBtn.addEventListener('click', () => ui.keyFileInput.click());
  if (ui.keyFileInput) ui.keyFileInput.addEventListener('change', async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const t = await f.text();
      const lines = t.split(/\r\n|\n/).filter(line => line.trim());
      let added = 0;
      let updated = 0;
      let skipped = 0;
      lines.forEach((line) => {
        const item = parseImportedKeyLine(line.trim(), '账号 ' + (state.keys.length + 1), state.activeGroup);
        if (!item) {
          skipped++;
          return;
        }
        const existing = state.keys.find(x => x.key === item.key);
        if (existing) {
          existing.alias = item.alias || existing.alias;
          existing.group = normalizeGroupName(item.group || existing.group);
          updated++;
          return;
        }
        state.keys.push(item);
        added++;
      });
      if (added > 0 || updated > 0) {
        saveKeyList();
        renderKeyList();
        if (!state.currentKey) switchKey(state.keys[0].key);
        alert('导入 ' + added + ' 个，更新 ' + updated + ' 个' + (skipped ? '，跳过 ' + skipped + ' 行' : ''));
      } else {
        alert('无新 Key。支持纯 Key、xi-api-key: xxx、ELEVENLABS_API_KEY=xxx、CSV。');
      }
    } catch (err) { alert('导入失败'); } e.target.value = '';
  });

  // UI 参数变动监听
  if (ui.model) ui.model.addEventListener('change', () => { chrome.storage.local.set({ 'xi_model': ui.model.value }); updateModelUI(); });
  if (ui.v3Stab) ui.v3Stab.addEventListener('change', () => { chrome.storage.local.set({ 'xi_v3_stability': ui.v3Stab.value }); });
  function updateModelUI() {
    const m = ui.model ? ui.model.value : 'eleven_multilingual_v2';
    const isV2 = m === 'eleven_multilingual_v2';
    const isV3 = m === 'eleven_v3';
    if (ui.v3Area) ui.v3Area.style.display = isV3 ? 'block' : 'none';
    if (ui.stabilityArea) ui.stabilityArea.style.display = isV3 ? 'none' : 'block';
    if (ui.v2Area) ui.v2Area.style.display = isV2 ? 'block' : 'none';
  }
  
  if (ui.stab) ui.stab.addEventListener('input', (e) => updateVal('stab', e.target.value));
  if (ui.sim) ui.sim.addEventListener('input', (e) => updateVal('sim', e.target.value));
  if (ui.style) ui.style.addEventListener('input', (e) => updateVal('style', e.target.value));
  if (ui.boost) ui.boost.addEventListener('change', (e) => chrome.storage.local.set({ 'xi_boost': e.target.checked }));
  if (ui.voice) ui.voice.addEventListener('change', (e) => {
    chrome.storage.local.set({ 'xi_voice': e.target.value });
    const vObj = (Array.isArray(state.voiceList) ? state.voiceList : []).find(v => v && v.voice_id === e.target.value);
    if (vObj && vObj.name) state.lastSelectedVoiceName = vObj.name;
  });

  function updateVal(type, val) {
    const d = parseFloat(val).toFixed(2);
    if (type === 'stab') { ui.stab.value = val; ui.valStab.textContent = d; chrome.storage.local.set({ 'xi_stab': val }); }
    if (type === 'sim') { ui.sim.value = val; ui.valSim.textContent = d; chrome.storage.local.set({ 'xi_sim': val }); }
    if (type === 'style') { ui.style.value = val; ui.valStyle.textContent = d; chrome.storage.local.set({ 'xi_style': val }); }
  }

  if (ui.refresh) ui.refresh.addEventListener('click', () => state.currentKey && loadVoices(state.currentKey));

  // ==========================================
  // 10. 智能时长估算、首句试听与超3分钟自动分2段
  // ==========================================
  const OVER_LIMIT_SECONDS = 180;
  let activePreviewAudio = null;
  let activePreviewUrl = null;
  let activePreviewCard = null;

  function extractFirstSentence(text, maxChars = 150) {
    const raw = String(text || '').trim();
    if (!raw) return '';
    // 保留开头的全局风格/情绪标签（如 [Sing everything in a powerful...]）+ 第一句正文
    const leadingTagsMatch = raw.match(/^(?:\[[^\]]{1,300}\]\s*)+/);
    const leadingTags = leadingTagsMatch ? leadingTagsMatch[0].trim() : '';
    const body = leadingTagsMatch ? raw.slice(leadingTagsMatch[0].length).trim() : raw;
    if (!body) return leadingTags;

    const match = body.match(/^[\s\S]*?(?:[。！？!?；;…]+|(?:\.(?=\s|$))|\r?\n)/);
    let sentence = match ? match[0].trim() : body;
    if (!sentence) sentence = body;
    if (sentence.length > maxChars) {
      const subMatch = sentence.slice(0, maxChars).match(/^[\s\S]*?[，,、：:]/);
      sentence = (subMatch && subMatch[0].length >= 10) ? subMatch[0].trim() : sentence.slice(0, maxChars).trim();
    }
    return leadingTags ? `${leadingTags} ${sentence}`.trim() : sentence;
  }

  function formatDuration(seconds) {
    const totalSec = Math.max(0, Math.round(Number(seconds) || 0));
    if (totalSec <= 0) return '0秒';
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    if (mins === 0) return `${secs}秒`;
    if (secs === 0) return `${mins}分`;
    return `${mins}分${secs}秒`;
  }

  function estimateDuration(text, speed = 1) {
    const raw = String(text || '').trim();
    if (!raw) {
      return { seconds: 0, formatted: '0秒', clauseCount: 0, pauseSeconds: 0, speakSeconds: 0 };
    }
    const safeSpeed = Math.min(1.2, Math.max(0.7, Number(speed) || 1));

    // 去除不发音的情绪/舞台提示与全局风格标签（如 [whispers], [Sing everything in a powerful...]）后再统计发音字词
    const spokenRaw = raw.replace(/\[[^\]]{1,300}\]/g, ' ').trim();
    if (!spokenRaw) {
      return { seconds: 0, formatted: '0秒', clauseCount: 0, pauseSeconds: 0, speakSeconds: 0 };
    }

    const cjkChars = (spokenRaw.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
    const strippedCjk = spokenRaw.replace(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, ' ');
    const enWords = (strippedCjk.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).length;
    const numbers = (strippedCjk.match(/\d+(?:\.\d+)?/g) || []).length;

    const strongPauses = (spokenRaw.match(/[。！？!?；;]+|\.{2,}|…+/g) || []).length;
    const singleDots = (spokenRaw.match(/(?<!\.)\.(?!\.)(?!\d)/g) || []).length;
    const mediumPauses = (spokenRaw.match(/[，,、：:—–\-]+/g) || []).length;
    const lineBreaks = (spokenRaw.match(/(?:\r?\n)+/g) || []).length;

    const clauses = spokenRaw
      .split(/(?:[。！？!?；;，,、：:\r\n]+|\.{2,}|…+|(?<!\.)\.(?!\.)(?!\d))/)
      .map(s => s.trim())
      .filter(Boolean);
    const clauseCount = clauses.length;

    let shortClauseBonus = 0;
    for (const c of clauses) {
      const cjk = (c.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
      const words = (c.replace(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
      const effectiveLen = cjk + words * 1.8;
      if (effectiveLen > 0 && effectiveLen <= 5) shortClauseBonus += 0.14;
      else if (effectiveLen <= 10) shortClauseBonus += 0.07;
    }

    const speakSeconds = (cjkChars / 4.2) + (enWords / 2.5) + (numbers * 0.45);
    const rawPauseSeconds =
      (strongPauses + singleDots) * 0.52 +
      mediumPauses * 0.25 +
      lineBreaks * 0.65 +
      shortClauseBonus;

    const trailingPunct = /[。！？!?；;…\.]$/.test(raw) ? 0.25 : 0;
    const pauseSeconds = Math.max(0, rawPauseSeconds - trailingPunct);
    const totalSeconds = (speakSeconds + pauseSeconds) / safeSpeed;
    const rounded = totalSeconds > 0 ? Math.max(1, Math.round(totalSeconds)) : 0;

    return {
      seconds: rounded,
      exactSeconds: Number(totalSeconds.toFixed(2)),
      formatted: formatDuration(rounded),
      clauseCount,
      pauseSeconds: Number((pauseSeconds / safeSpeed).toFixed(2)),
      speakSeconds: Number((speakSeconds / safeSpeed).toFixed(2))
    };
  }

  function findQuoteDepthMap(text) {
    const depth = new Array(text.length).fill(0);
    const pairs = { '“': '”', '‘': '’', '「': '」', '『': '』', '（': '）', '(': ')', '《': '》', '【': '】', '[': ']' };
    const closers = new Set(Object.values(pairs));
    const stack = [];
    let straightDouble = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        straightDouble = !straightDouble;
      } else if (pairs[ch]) {
        stack.push(pairs[ch]);
      } else if (closers.has(ch)) {
        const idx = stack.lastIndexOf(ch);
        if (idx !== -1) stack.splice(idx, 1);
      }
      depth[i] = stack.length + (straightDouble ? 1 : 0);
    }
    return depth;
  }

  function splitTextIntoTwo(text, speed = 1) {
    const raw = String(text || '').trim();
    const totalEst = estimateDuration(raw, speed);
    if (!raw || raw.length < 2) {
      return { split: false, parts: [raw], boundaryType: 'none', reason: 'none', durations: [totalEst], partDurations: [totalEst] };
    }

    const totalLen = raw.length;
    const quoteDepth = findQuoteDepthMap(raw);
    const candidates = [];

    const addCandidate = (index, type, basePriority) => {
      if (index <= 0 || index >= totalLen) return;
      const left = raw.slice(0, index).trim();
      const right = raw.slice(index).trim();
      if (!left || !right) return;
      const ratio = left.length / totalLen;
      if (ratio < 0.18 || ratio > 0.82) return;
      const insideQuotePenalty = quoteDepth[Math.max(0, index - 1)] > 0 ? 35 : 0;
      const distancePenalty = Math.abs(ratio - 0.5) * 100;
      const score = basePriority - distancePenalty - insideQuotePenalty;
      candidates.push({ index, type, score, ratio });
    };

    const paraRe = /(?:\r?\n)\s*(?:\r?\n)+/g;
    let m;
    while ((m = paraRe.exec(raw)) !== null) {
      addCandidate(m.index + m[0].length, 'paragraph', 120);
    }

    const lineRe = /\r?\n/g;
    while ((m = lineRe.exec(raw)) !== null) {
      addCandidate(m.index + m[0].length, 'newline', 105);
    }

    const strongRe = /(?:[。！？!?；;]+|\.{2,}|…+|(?<!\.)\.(?!\.)(?!\d))[”’」』）\)"']*(\s*)/g;
    const transitionRe = /^(?:不过|但是|然而|同时|此外|另外|与此同时|接下来|随后|因此|所以|总之|相反|再看|最后|其次|首先|而且|并且|而在|回到|反观|(?:however|meanwhile|furthermore|moreover|therefore|finally|next|secondly|firstly)\b)/i;
    while ((m = strongRe.exec(raw)) !== null) {
      const splitIdx = m.index + m[0].length;
      const rest = raw.slice(splitIdx).trimStart();
      const hasTransition = transitionRe.test(rest);
      addCandidate(splitIdx, hasTransition ? 'sentence_transition' : 'sentence', hasTransition ? 100 : 90);
    }

    const clauseRe = /[，,、：:—–\-]+[”’」』）\)"']*(\s*)/g;
    while ((m = clauseRe.exec(raw)) !== null) {
      addCandidate(m.index + m[0].length, 'clause', 60);
    }

    const spaceRe = /\s+/g;
    while ((m = spaceRe.exec(raw)) !== null) {
      addCandidate(m.index + m[0].length, 'space', 35);
    }

    let chosen = null;
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.score - a.score);
      const topCandidates = candidates.slice(0, Math.min(8, candidates.length));
      let bestCombinedScore = -Infinity;
      for (const c of topCandidates) {
        const d1 = estimateDuration(raw.slice(0, c.index).trim(), speed).exactSeconds;
        const d2 = estimateDuration(raw.slice(c.index).trim(), speed).exactSeconds;
        const totalD = d1 + d2 || 1;
        const durBalancePenalty = Math.abs((d1 / totalD) - 0.5) * 90;
        const combined = c.score - durBalancePenalty;
        if (combined > bestCombinedScore) {
          bestCombinedScore = combined;
          chosen = c;
        }
      }
    }

    if (!chosen) {
      const mid = Math.floor(totalLen / 2);
      chosen = { index: mid, type: 'midpoint', score: 0, ratio: 0.5 };
    }

    const part1 = raw.slice(0, chosen.index).trim();
    const part2 = raw.slice(chosen.index).trim();
    if (!part1 || !part2) {
      return { split: false, parts: [raw], boundaryType: 'none', reason: 'none', durations: [totalEst], partDurations: [totalEst] };
    }

    const d1 = estimateDuration(part1, speed);
    const d2 = estimateDuration(part2, speed);
    return {
      split: true,
      parts: [part1, part2],
      boundaryType: chosen.type,
      reason: chosen.type,
      durations: [d1, d2],
      partDurations: [d1, d2]
    };
  }

  function splitOverThreeMinutes(text, speed = 1, thresholdSeconds = OVER_LIMIT_SECONDS) {
    const raw = String(text || '').trim();
    const est = estimateDuration(raw, speed);
    if (est.seconds <= thresholdSeconds) {
      return {
        overLimit: false,
        split: false,
        parts: [raw],
        boundaryType: 'none',
        reason: 'none',
        originalDuration: est,
        durations: [est],
        partDurations: [est]
      };
    }
    const res = splitTextIntoTwo(raw, speed);
    return {
      overLimit: true,
      split: res.split,
      parts: res.parts,
      boundaryType: res.boundaryType,
      reason: res.boundaryType,
      originalDuration: est,
      durations: res.durations,
      partDurations: res.durations
    };
  }

  function expandOverThreeMinutes(texts, speed = 1, thresholdSeconds = OVER_LIMIT_SECONDS) {
    const result = [];
    const splitNotes = [];
    let splitCount = 0;
    let origIdx = 0;
    for (const item of Array.isArray(texts) ? texts : []) {
      const trimmed = String(item || '').trim();
      if (!trimmed) continue;
      origIdx++;
      const check = splitOverThreeMinutes(trimmed, speed, thresholdSeconds);
      if (check.overLimit && check.split && check.parts.length === 2) {
        result.push(check.parts[0], check.parts[1]);
        splitNotes.push(`✂️ 超3分拆分(原#${origIdx}-1/2)`, `✂️ 超3分拆分(原#${origIdx}-2/2)`);
        splitCount++;
      } else {
        result.push(trimmed);
        splitNotes.push(`原#${origIdx}`);
      }
    }
    return { texts: result, splitNotes, splitCount };
  }

  function stopActivePreview() {
    if (activePreviewAudio) {
      try {
        activePreviewAudio.pause();
        activePreviewAudio.currentTime = 0;
      } catch (_) {}
      activePreviewAudio = null;
    }
    if (activePreviewUrl) {
      try { URL.revokeObjectURL(activePreviewUrl); } catch (_) {}
      activePreviewUrl = null;
    }
    if (activePreviewCard) {
      const btn = activePreviewCard.querySelector('.task-preview');
      if (btn) {
        btn.classList.remove('playing');
        btn.disabled = false;
        btn.textContent = '🔊 试听首句';
      }
      activePreviewCard = null;
    }
  }

  function splitCardIntoTwo(card) {
    if (!card || !ui.container) return false;
    const ta = card.querySelector('textarea');
    if (!ta) return false;
    const text = ta.value.trim();
    if (!text) return false;

    const res = splitTextIntoTwo(text, 1);
    if (!res.split || res.parts.length < 2) {
      setStatus('该段文案过短，无法拆分为 2 份', 'error');
      return false;
    }

    stopActivePreview();
    const prevNote = card.dataset.splitNote && /^原#\d+$/.test(card.dataset.splitNote) ? card.dataset.splitNote + '-' : '';
    ta.value = res.parts[0];
    card.dataset.splitNote = `✂️ 超3分拆分(${prevNote}1/2)`;
    card.previewCache = null;

    const secondCard = addCard(res.parts[1], false);
    if (secondCard) secondCard.dataset.splitNote = `✂️ 超3分拆分(${prevNote}2/2)`;
    ui.container.insertBefore(secondCard, card.nextSibling);
    refreshIndexes();
    saveCards();
    updateStats();
    setStatus(`✂️ 已智能拆分为 2 段 (${res.durations[0].formatted} + ${res.durations[1].formatted})`);
    return true;
  }

  function splitAllOverThreeMinutesCards(silent = false) {
    if (!ui.container) return 0;
    const cards = Array.from(ui.container.querySelectorAll('.card'));
    let splitCount = 0;
    for (const card of cards) {
      const ta = card.querySelector('textarea');
      if (!ta) continue;
      const text = ta.value.trim();
      if (!text) continue;
      const check = splitOverThreeMinutes(text, 1);
      if (check.overLimit && check.split && check.parts.length === 2) {
        const prevNote = card.dataset.splitNote && /^原#\d+$/.test(card.dataset.splitNote) ? card.dataset.splitNote + '-' : '';
        ta.value = check.parts[0];
        card.dataset.splitNote = `✂️ 超3分拆分(${prevNote}1/2)`;
        card.previewCache = null;
        const secondCard = addCard(check.parts[1], false);
        if (secondCard) secondCard.dataset.splitNote = `✂️ 超3分拆分(${prevNote}2/2)`;
        ui.container.insertBefore(secondCard, card.nextSibling);
        splitCount++;
      }
    }
    if (splitCount > 0) {
      refreshIndexes();
      saveCards();
      updateStats();
      if (!silent) setStatus(`✂️ 已将 ${splitCount} 段超 3 分钟文案各智能拆分为 2 份`);
    } else if (!silent) {
      setStatus('当前没有超过 3 分钟的段落');
    }
    return splitCount;
  }

  async function previewCardFirstSentence(card) {
    const previewBtn = card.querySelector('.task-preview');
    if (!previewBtn) return;

    if (activePreviewCard === card && activePreviewAudio) {
      stopActivePreview();
      setStatus('⏹ 已停止试听');
      return;
    }

    stopActivePreview();

    const ta = card.querySelector('textarea');
    const rawText = ta ? ta.value.trim() : '';
    const firstSentence = extractFirstSentence(rawText);
    if (!firstSentence) {
      setStatus('请先输入要试听的文案', 'error');
      return;
    }
    if (!state.currentKey) {
      showError('请先配置 API Key');
      return;
    }

    const selectedVoiceId = (ui.customVoiceId && ui.customVoiceId.value.trim()) || (ui.voice && ui.voice.value);
    if (!selectedVoiceId || selectedVoiceId.includes('配置') || selectedVoiceId.includes('加载') || selectedVoiceId.includes('失败')) {
      showError('请先选择有效的声音 (Voice)');
      return;
    }

    const isTagged = textHasBracketAudioTag(firstSentence);
    if (isTagged && ui.model && TAG_UNSUPPORTED_V2_MODELS.has(ui.model.value)) {
      ensureTagCompatibleModel(firstSentence);
    }
    const modelId = ui.model ? ui.model.value : (isTagged ? 'eleven_v3' : 'eleven_multilingual_v2');
    const stab = (modelId === 'eleven_v3' && ui.v3Stab) ? parseFloat(ui.v3Stab.value) : (ui.stab ? parseFloat(ui.stab.value) : 0.5);
    const sim = ui.sim ? parseFloat(ui.sim.value) : 0.75;
    const style = ui.style ? parseFloat(ui.style.value) : 0;
    const boost = ui.boost ? ui.boost.checked : true;
    const activeEffects = buildAudioEffectsPayload();
    const cacheKey = [selectedVoiceId, modelId, stab, sim, style, boost, JSON.stringify(activeEffects || null), firstSentence].join('|');

    activePreviewCard = card;
    previewBtn.disabled = true;
    previewBtn.textContent = '⏳ 合成首句...';
    const shortPreview = firstSentence.length > 24 ? `${firstSentence.slice(0, 24)}...` : firstSentence;
    setStatus(`🔊 正在合成首句 (${modelId} · ${firstSentence.length}字): "${shortPreview}"`);

    try {
      let blob = card.previewCache && card.previewCache.key === cacheKey ? card.previewCache.blob : null;
      if (!blob) {
        const isSinging = /\[[^\]]*\b(sing|singing|gospel|melodic|vibrato|sustained notes)\b/i.test(firstSentence);
        const buildPreviewSettings = (targetModel) => {
          if (targetModel === 'eleven_v3') {
            if (isSinging && stab <= 0.5) return { stability: 0 };
            return { stability: stab <= 0.35 ? 0 : (stab >= 0.75 ? 1 : 0.5) };
          }
          const s = { stability: stab, similarity_boost: sim };
          if (targetModel === 'eleven_multilingual_v2') {
            s.style = style;
            s.use_speaker_boost = boost;
          }
          return s;
        };
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}?output_format=mp3_44100_128`;
        const previewCandidates = isTagged
          ? [...new Set([modelId, 'eleven_v3', 'eleven_v4'])]
          : [modelId];
        let resp = null;
        for (const candidateModel of previewCandidates) {
          const reqBody = {
            text: firstSentence,
            model_id: candidateModel,
            voice_settings: buildPreviewSettings(candidateModel)
          };
          if (activeEffects && Object.keys(activeEffects).length > 0) {
            reqBody.audio_effects = activeEffects;
          }
          resp = await fetch(url, {
            method: 'POST',
            headers: {
              'xi-api-key': state.currentKey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
          });
          if (!resp.ok && reqBody.audio_effects && [400, 404, 422].includes(resp.status)) {
            const fallbackBody = { ...reqBody };
            delete fallbackBody.audio_effects;
            resp = await fetch(url, {
              method: 'POST',
              headers: {
                'xi-api-key': state.currentKey,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(fallbackBody)
            });
          }
          if (resp.ok || resp.status === 401 || resp.status === 429) break;
        }
        if (!resp.ok) {
          throw new Error(await readElevenError(resp, '试听失败'));
        }
        blob = await resp.blob();
        card.previewCache = { key: cacheKey, blob };
        if (state.currentQuota >= firstSentence.length) {
          state.currentQuota -= firstSentence.length;
          updateStatsUI(state.currentQuota);
        }
      }

      if (activePreviewCard !== card) return;
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      activePreviewUrl = audioUrl;
      activePreviewAudio = audio;
      previewBtn.disabled = false;
      previewBtn.classList.add('playing');
      previewBtn.textContent = '⏹ 停止试听';

      audio.onended = () => {
        if (activePreviewCard === card) {
          stopActivePreview();
          setStatus('✅ 首句试听完毕');
        }
      };
      audio.onerror = () => {
        if (activePreviewCard === card) {
          stopActivePreview();
          setStatus('❌ 试听音频播放失败', 'error');
        }
      };

      await audio.play();
      setStatus(`🔊 正在试听首句: "${shortPreview}"`);
    } catch (e) {
      if (activePreviewCard === card) stopActivePreview();
      setStatus(`❌ 试听失败: ${e.message || '请求异常'}`, 'error');
    }
  }

  // ==========================================
  // 11. 卡片与列表管理 (Card Logic) - V6.5 完美版
  // ==========================================
  function addCard(text = '', autoSave = true) {
    if (!ui.container) return;
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <textarea placeholder="输入文案...">${text}</textarea>
      <div class="card-footer">
        <span class="idx-tag">#${ui.container.children.length + 1}</span>
        <div class="right-tools">
          <span class="char-c">0 字</span>
          <span class="dur-c" title="根据字数、标点停顿及短句密度智能估算的语音时长">预计 0秒</span>
          <button type="button" class="tool-btn-icon task-split hidden" title="将该段文案在合适标点/段落处智能拆分为 2 段">✂️ 分2段</button>
          <button type="button" class="tool-btn-icon task-autotag" title="智能分析当前段落语义并自动插入 ElevenLabs 表现力标签（如 [reverent]、[emotional]、[short pause] 等）">🎭 自动加标签</button>
          <button type="button" class="tool-btn-icon task-preview" title="合成并试听当前段落的第一句话（再次点击停止）">🔊 试听首句</button>
          <button type="button" class="tool-btn-icon web-gen-btn" title="复制并去网页版生成" style="width:auto;padding:0 5px;font-size:11px;height:24px;">🌐 网页生成</button>
          <span class="del-btn">删除</span>
        </div>
      </div>
    `;
    
    const ta = div.querySelector('textarea');
    const cc = div.querySelector('.char-c');
    const splitBtn = div.querySelector('.task-split');
    const autoTagBtn = div.querySelector('.task-autotag');
    const previewBtn = div.querySelector('.task-preview');
    cc.textContent = ta.value.length + ' 字';
    
    ta.addEventListener('input', () => { div.previewCache = null; cc.textContent = ta.value.length + ' 字'; saveCards(); updateStats(); });
    div.querySelector('.del-btn').addEventListener('click', () => {
      if (activePreviewCard === div) stopActivePreview();
      div.remove();
      refreshIndexes();
      saveCards();
      updateStats();
    });
    if (splitBtn) splitBtn.addEventListener('click', () => splitCardIntoTwo(div));
    if (autoTagBtn) autoTagBtn.addEventListener('click', () => autoTagSingleCard(div));
    if (previewBtn) previewBtn.addEventListener('click', () => previewCardFirstSentence(div));

    const webBtn = div.querySelector('.web-gen-btn');
    webBtn.addEventListener('click', () => {
      const content = ta.value.trim();
      if (!content) return alert('请先输入文案');
      navigator.clipboard.writeText(content).then(() => { chrome.tabs.create({ url: 'https://elevenlabs.io/app/speech-synthesis' }); });
    });

    // 🌟🌟🌟 粘贴逻辑 (V6.5 最终版：修复粘连+保留格式) 🌟🌟🌟
    ta.addEventListener('paste', (e) => {
      e.preventDefault();
      
      const clipboardData = e.clipboardData || window.clipboardData;
      const html = clipboardData.getData('text/html');
      const plain = clipboardData.getData('text/plain');
      let segs = [];

      // A. 优先处理 HTML 表格 (Excel/Google Sheets)
      if (html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const tds = doc.querySelectorAll('td');

        if (tds.length > 0) {
          tds.forEach(td => {
             // 1. 获取 HTML
             let rawHtml = td.innerHTML;
             
             // 2. 核心修复：强制将所有可能导致粘连的标签替换为空格
             // 替换 <br>, <p>, </div>, </tr> 为空格
             rawHtml = rawHtml.replace(/<br\s*\/?>/gi, ' ');
             rawHtml = rawHtml.replace(/<\/p>/gi, ' ');
             rawHtml = rawHtml.replace(/<\/div>/gi, ' ');
             rawHtml = rawHtml.replace(/<\/tr>/gi, ' ');
             
             // 3. 提取纯文本
             const tempDiv = document.createElement('div');
             tempDiv.innerHTML = rawHtml;
             let txt = tempDiv.textContent || tempDiv.innerText || "";
             
             // 4. 清理多余空格 (合并连续空格)
             txt = txt.replace(/\s+/g, ' ').trim();
             
             if (txt) segs.push(txt);
          });
        }
      }

      // B. 兜底处理 (纯文本)
      if (segs.length === 0 && plain) {
         segs = plain.split(/\r\n|\n/).filter(t => t.trim());
      }

      // C. 填入数据（不自动拆分，超过3分钟时通过顶部红色按钮提示可拆分）
      if (segs.length > 0) {
        segs = maybeAutoPrependTagToSegments(segs);
        const expanded = expandOverThreeMinutes(segs, 1);
        const overLimitCount = expanded.splitCount;
        // 第一格
        ta.value = segs[0];
        ta.dispatchEvent(new Event('input')); 

        // 剩余格
        if (segs.length > 1) {
          let curr = div;
          for (let i = 1; i < segs.length; i++) {
             const n = addCard(segs[i], false);
             ui.container.insertBefore(n, curr.nextSibling);
             curr = n;
          }
        }
        
        refreshIndexes();
        saveCards();
        updateStats();
        if (overLimitCount > 0) {
          setStatus(`⚠️ 检测到 ${overLimitCount} 段超 3 分钟文案（未自动拆分，如需拆分请点击上方红色按钮）`);
        }
      }
    });

    if (!div.parentNode) ui.container.appendChild(div);
    if (autoSave) saveCards();
    return div;
  }

  function refreshIndexes() { if (!ui.container) return; Array.from(ui.container.children).forEach((c, i) => c.querySelector('.idx-tag').textContent = `#${i + 1}`); }
  function saveCards() { if (!ui.container) return; const texts = Array.from(ui.container.querySelectorAll('textarea')).map(t => t.value); chrome.storage.local.set({ 'saved_cards': texts }); }
  function updateStats() {
    if (!ui.container) return;
    const cards = Array.from(ui.container.querySelectorAll('.card'));
    let total = 0;
    let totalSeconds = 0;
    let overThreeMinCount = 0;

    cards.forEach(card => {
      const ta = card.querySelector('textarea');
      const val = ta ? ta.value : '';
      const trimmed = val.trim();
      total += val.length;

      const dur = estimateDuration(trimmed, 1);
      totalSeconds += dur.exactSeconds || 0;
      const isOver3Min = dur.seconds > OVER_LIMIT_SECONDS;
      if (isOver3Min) overThreeMinCount++;

      const cc = card.querySelector('.char-c');
      if (cc) cc.textContent = `${val.length} 字`;

      const durEl = card.querySelector('.dur-c');
      if (durEl) {
        durEl.textContent = isOver3Min ? `⚠️ 预计 ${dur.formatted} (超3分)` : `预计 ${dur.formatted}`;
        durEl.classList.toggle('over-limit', isOver3Min);
        durEl.title = trimmed
          ? `智能估算: 约 ${dur.formatted} (发音 ${dur.speakSeconds}s + 标点短句停顿 ${dur.pauseSeconds}s，共 ${dur.clauseCount} 个短句)${isOver3Min ? ' — 超过 3 分钟，建议拆分为 2 份' : ''}`
          : '根据字数、标点停顿及短句密度智能估算的语音时长';
      }

      const splitBtn = card.querySelector('.task-split');
      if (splitBtn) {
        const canSplit = trimmed.length >= 20 && (isOver3Min || dur.seconds >= 60);
        splitBtn.classList.toggle('hidden', !canSplit);
        splitBtn.textContent = isOver3Min ? '✂️ 超3分·可拆分' : '✂️ 分2段';
      }
    });

    ui.totalChars.textContent = `总字数: ${total}`;
    if (ui.totalDuration) {
      const roundedTotalSec = totalSeconds > 0 ? Math.max(1, Math.round(totalSeconds)) : 0;
      ui.totalDuration.textContent = overThreeMinCount > 0
        ? `预计总时长: ${formatDuration(roundedTotalSec)} (${overThreeMinCount}段超3分)`
        : `预计总时长: ${formatDuration(roundedTotalSec)}`;
    }
    if (ui.splitLongBtn) {
      ui.splitLongBtn.classList.toggle('hidden', overThreeMinCount === 0);
      if (overThreeMinCount > 0) {
        ui.splitLongBtn.textContent = `🔴 超3分钟·可拆分 (${overThreeMinCount}段)`;
      }
    }
    
    if (state.currentQuota > 0) {
      ui.remainChars.textContent = `剩余: ${state.currentQuota - total}`;
      const isOver = total > state.currentQuota;
      ui.genBtn.disabled = isOver || total === 0;
      if (isOver) {
        ui.genBtn.textContent = '⚠️ 字数超额';
        ui.genBtn.style.background = 'var(--danger)';
      } else {
        ui.genBtn.textContent = '🚀 批量生成';
        ui.genBtn.style.background = '';
      }
    }
  }

  // 辅助：列表额度检查
  function queueQuotaCheck(key, tagElement, simpleMode = false, resetElement = null, forceRefresh = false) {
    if (!tagElement) return;
    tagElement.dataset.key = key;
    if (resetElement) resetElement.dataset.key = key;
    const cached = state.quotaListCache[key];
    if (!forceRefresh && cached && Date.now() - cached.ts < 300000) {
      applyQuotaToTag(key, tagElement, simpleMode, resetElement, cached);
      return;
    }
    tagElement.textContent = '排队';
    tagElement.title = '正在排队扫描额度';
    quotaScanQueue.push({ key, tagElement, simpleMode, resetElement, forceRefresh });
    runQuotaScanQueue();
  }

  function runQuotaScanQueue() {
    while (quotaScanRunning < QUOTA_SCAN_CONCURRENCY && quotaScanQueue.length > 0) {
      const task = quotaScanQueue.shift();
      if (!task.tagElement || !task.tagElement.isConnected || task.tagElement.dataset.key !== task.key) continue;
      quotaScanRunning++;
      checkQuotaForList(task.key, task.tagElement, task.simpleMode, task.resetElement, task.forceRefresh)
        .finally(() => {
          quotaScanRunning--;
          runQuotaScanQueue();
        });
    }
  }

  function applyQuotaToTag(key, tagElement, simpleMode, resetElement, data) {
    if (!tagElement || !tagElement.isConnected || tagElement.dataset.key !== key) return;
    const left = data.left;
    tagElement.title = '';
    if (simpleMode) {
      tagElement.textContent = (left / 1000).toFixed(1) + 'k';
      tagElement.style.color = left < 1000 ? '#ef4444' : '#10b981';
    } else {
      tagElement.textContent = '剩 ' + left.toLocaleString();
      tagElement.className = 'quota-tag ' + (left < 1000 ? 'low' : 'good');
      if (resetElement && resetElement.dataset.key === key && data.resetUnix) {
        const d = Math.ceil(Math.abs(new Date(data.resetUnix * 1000) - new Date()) / 86400000);
        resetElement.textContent = d + '天后刷新';
      }
    }
  }

  async function checkQuotaForList(key, tagElement, simpleMode = false, resetElement = null, forceRefresh = false) {
    if (!tagElement) return;

    const applyQuota = (data) => {
      applyQuotaToTag(key, tagElement, simpleMode, resetElement, data);
    };

    const cached = state.quotaListCache[key];
    if (!forceRefresh && cached && Date.now() - cached.ts < 300000) {
      applyQuota(cached);
      return;
    }

    try {
      const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: { 'xi-api-key': key } });
      if (res.ok) {
        const data = await res.json();
        const cachedData = {
          left: data.character_limit - data.character_count,
          resetUnix: data.next_character_count_reset_unix || 0,
          ts: Date.now()
        };
        state.quotaListCache[key] = cachedData;
        applyQuota(cachedData);
      } else {
        throw new Error(await readElevenError(res, '额度检查失败'));
      }
    } catch (e) {
      const msg = e.message || '';
      if (!tagElement || !tagElement.isConnected || tagElement.dataset.key !== key) return;
      tagElement.textContent = msg.includes('权限') ? '权限' : 'Err';
      tagElement.title = msg;
      if (!simpleMode) tagElement.className = 'quota-tag error';
    }
  }

  // ==========================================
  // 12. 其他工具工坊 (音效 / 音乐 / 变声 / 降噪 / 转文字)
  // ==========================================
  const toolHistory = [];
  let currentToolAudio = null;
  let toolTaskRunning = false;

  function setToolStatus(msg, type = 'normal') {
    if (!ui.otherToolsStatus) return;
    ui.otherToolsStatus.textContent = msg;
    ui.otherToolsStatus.className = 'other-tools-status';
    if (type === 'error') ui.otherToolsStatus.classList.add('error');
    else if (type === 'success') ui.otherToolsStatus.classList.add('success');
  }

  function getAvailableKeysList() {
    if (state.keys && state.keys.length > 0) return state.keys;
    if (state.currentKey) return [{ key: state.currentKey, alias: '当前账号' }];
    return [];
  }

  function getKeyVoiceProfile(key) {
    const cache = state.voiceCacheByKey && state.voiceCacheByKey[key];
    const voices = Array.isArray(cache) ? cache : (key === state.currentKey && Array.isArray(state.voiceList) ? state.voiceList : null);
    if (!voices || voices.length === 0) return { known: false, systemOnly: true, customCount: 0 };
    const customCount = voices.filter(v => v && v.category && v.category !== 'premade').length;
    return { known: true, systemOnly: customCount === 0, customCount };
  }

  function sortToolCandidatesList(list) {
    return [...list].sort((a, b) => {
      const pa = getKeyVoiceProfile(a.key);
      const pb = getKeyVoiceProfile(b.key);
      if (pa.systemOnly !== pb.systemOnly) return pa.systemOnly ? -1 : 1;
      if (pa.customCount !== pb.customCount) return pa.customCount - pb.customCount;
      const qa = state.quotaListCache && state.quotaListCache[a.key];
      const qb = state.quotaListCache && state.quotaListCache[b.key];
      const la = Number.isFinite(qa?.left) ? qa.left : (a.key === state.currentKey && state.currentQuota > 0 ? state.currentQuota : 5000);
      const lb = Number.isFinite(qb?.left) ? qb.left : (b.key === state.currentKey && state.currentQuota > 0 ? state.currentQuota : 5000);
      return lb - la;
    });
  }

  function populateToolKeySelect() {
    if (!ui.toolKeySelect) return;
    const prev = ui.toolKeySelect.value || '__auto__';
    ui.toolKeySelect.innerHTML = '';
    const list = sortToolCandidatesList(getAvailableKeysList());
    const autoOpt = document.createElement('option');
    autoOpt.value = '__auto__';
    autoOpt.textContent = `🔄 自动优先系统音色且余额多的 API（共 ${list.length} 个账号，失败自动轮换）`;
    ui.toolKeySelect.appendChild(autoOpt);

    list.forEach((item, idx) => {
      const opt = document.createElement('option');
      opt.value = item.key;
      const quota = state.quotaListCache && state.quotaListCache[item.key];
      const leftVal = Number.isFinite(quota?.left) ? quota.left : (item.key === state.currentKey && state.currentQuota > 0 ? state.currentQuota : null);
      const leftText = Number.isFinite(leftVal) ? ` · 剩 ${leftVal.toLocaleString()}` : '';
      const prof = getKeyVoiceProfile(item.key);
      const roleTag = prof.known ? (prof.systemOnly ? ' · [系统声音]' : ' · [含专属声音]') : '';
      const alias = item.alias || `账号 ${idx + 1}`;
      opt.textContent = `${alias} (••••${item.key.slice(-4)})${roleTag}${leftText}`;
      ui.toolKeySelect.appendChild(opt);
    });

    if (prev && Array.from(ui.toolKeySelect.options).some(o => o.value === prev)) {
      ui.toolKeySelect.value = prev;
    } else {
      ui.toolKeySelect.value = '__auto__';
    }
  }

  function openOtherToolsModal(defaultTab = '') {
    populateToolKeySelect();
    if (defaultTab) switchOtherToolTab(defaultTab);
    if (ui.otherToolsModal) ui.otherToolsModal.classList.remove('hidden');
  }

  function closeOtherToolsModal() {
    if (ui.otherToolsAudioPlayer) {
      try { ui.otherToolsAudioPlayer.pause(); } catch (_) {}
    }
    if (ui.otherToolsModal) ui.otherToolsModal.classList.add('hidden');
  }

  function switchOtherToolTab(tabName) {
    if (!ui.otherToolsModal) return;
    ui.otherToolsModal.querySelectorAll('.tool-tab-btn').forEach(btn => {
      const active = btn.dataset.tab === tabName;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    ui.otherToolsModal.querySelectorAll('.tool-pane').forEach(pane => {
      const active = pane.dataset.pane === tabName;
      pane.classList.toggle('active', active);
      pane.classList.toggle('hidden', !active);
    });
  }

  if (ui.otherToolsBtn) ui.otherToolsBtn.addEventListener('click', () => openOtherToolsModal());
  if (ui.sidebarOtherToolsBtn) ui.sidebarOtherToolsBtn.addEventListener('click', () => openOtherToolsModal());
  if (ui.closeOtherToolsBtn) ui.closeOtherToolsBtn.addEventListener('click', closeOtherToolsModal);

  if (ui.otherToolsModal) {
    ui.otherToolsModal.querySelectorAll('.tool-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchOtherToolTab(btn.dataset.tab));
    });
    ui.otherToolsModal.querySelectorAll('.tool-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const target = getEl(chip.dataset.target);
        if (target) {
          target.value = chip.dataset.prompt || '';
          target.focus();
        }
      });
    });
  }

  if (ui.sfxDurationMode) {
    ui.sfxDurationMode.addEventListener('change', () => {
      if (ui.sfxDuration) ui.sfxDuration.classList.toggle('hidden', ui.sfxDurationMode.value !== 'custom');
    });
  }
  if (ui.sfxInfluence) {
    ui.sfxInfluence.addEventListener('input', (e) => {
      if (ui.valSfxInfluence) ui.valSfxInfluence.textContent = parseFloat(e.target.value).toFixed(2);
    });
  }
  if (ui.musicDurationMode) {
    ui.musicDurationMode.addEventListener('change', () => {
      if (ui.musicDurationSec) ui.musicDurationSec.classList.toggle('hidden', ui.musicDurationMode.value !== 'custom');
    });
  }

  function getOrderedToolCandidates() {
    const all = getAvailableKeysList();
    if (!all.length) return [];
    const selected = ui.toolKeySelect ? ui.toolKeySelect.value : '__auto__';
    if (selected && selected !== '__auto__') {
      const exact = all.find(k => k.key === selected);
      return exact ? [exact] : [{ key: selected, alias: '选定账号' }];
    }
    return sortToolCandidatesList(all);
  }

  async function runWithToolApiPool(actionLabel, taskFn) {
    const candidates = getOrderedToolCandidates();
    if (!candidates.length) {
      throw new Error('请先在主界面或设置中添加至少一个 ElevenLabs API Key');
    }
    let lastError = null;
    for (let i = 0; i < candidates.length; i++) {
      const entry = candidates[i];
      const alias = entry.alias || `账号 ${i + 1}`;
      try {
        setToolStatus(`⏳ 正在通过 [${alias}] 执行${actionLabel}...`);
        const res = await taskFn(entry.key, alias);
        if (entry.key === state.currentKey) {
          fetchQuota(entry.key, true);
        }
        return { result: res, entry, alias };
      } catch (err) {
        lastError = err;
        const status = err.status || 0;
        const canRetryNext = candidates.length > 1 && (status === 401 || status === 402 || status === 403 || status === 429 || /quota|limit|invalid|unauthorized|forbidden|permission/i.test(err.message || ''));
        if (!canRetryNext) break;
      }
    }
    throw lastError || new Error(`${actionLabel}失败`);
  }

  function sanitizeToolFilename(raw, fallback = 'audio') {
    const cleaned = String(raw || '')
      .replace(/[\r\n]+/g, ' ')
      .replace(/[\\/:*?"<>|]/g, '_')
      .replace(/\s+/g, '_')
      .slice(0, 32)
      .replace(/^_+|_+$/g, '');
    return cleaned || fallback;
  }

  function saveToolAudioBlob(blob, subfolder, prefix, ext = 'mp3') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base = (state.baseFolder || 'ElevenLabs_Pro').replace(/[\\:*?"<>|]/g, '_') || 'ElevenLabs_Pro';
        const sub = subfolder ? subfolder.replace(/[\\:*?"<>|]/g, '_').trim() : '';
        const stamp = new Date().toISOString().slice(11, 19).replace(/:/g, '');
        const filename = `${prefix}_${stamp}.${ext}`;
        const finalPath = sub ? `${base}/${sub}/${filename}` : `${base}/${filename}`;
        chrome.downloads.download({
          url: reader.result,
          filename: finalPath,
          saveAs: false,
          conflictAction: 'uniquify'
        }, (downloadId) => {
          if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
          else resolve({ downloadId, finalPath });
        });
      };
      reader.onerror = () => reject(new Error('音频读取失败'));
      reader.readAsDataURL(blob);
    });
  }

  function showToolAudioResult({ blob, title, subfolder, prefix, ext = 'mp3', accountAlias }) {
    const url = URL.createObjectURL(blob);
    const item = { blob, url, title, subfolder, prefix, ext, accountAlias, time: new Date().toLocaleTimeString() };
    currentToolAudio = item;
    toolHistory.unshift(item);
    if (toolHistory.length > 10) {
      const popped = toolHistory.pop();
      if (popped && popped.url && popped !== currentToolAudio) {
        try { URL.revokeObjectURL(popped.url); } catch (_) {}
      }
    }

    if (ui.otherToolsAudioPanel) ui.otherToolsAudioPanel.classList.remove('hidden');
    if (ui.otherToolsAudioMeta) ui.otherToolsAudioMeta.textContent = `${title} · 账号: ${accountAlias}`;
    if (ui.otherToolsAudioPlayer) {
      ui.otherToolsAudioPlayer.src = url;
      ui.otherToolsAudioPlayer.play().catch(() => {});
    }
    renderToolHistory();
  }

  function renderToolHistory() {
    if (!ui.otherToolsHistoryWrap || !ui.otherToolsHistoryList) return;
    ui.otherToolsHistoryWrap.classList.toggle('hidden', toolHistory.length === 0);
    ui.otherToolsHistoryList.innerHTML = '';
    toolHistory.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'tool-history-item';
      row.innerHTML = `
        <span class="tool-history-title" title="${escapeHtml(item.title)}">[${escapeHtml(item.time)}] ${escapeHtml(item.title)} (${escapeHtml(item.accountAlias)})</span>
        <div class="tool-history-actions">
          <button type="button" class="btn-outlined hist-play-btn">▶ 播放</button>
          <button type="button" class="btn-outlined hist-dl-btn">💾 下载</button>
        </div>
      `;
      row.querySelector('.hist-play-btn').addEventListener('click', () => {
        currentToolAudio = item;
        if (ui.otherToolsAudioMeta) ui.otherToolsAudioMeta.textContent = `${item.title} · 账号: ${item.accountAlias}`;
        if (ui.otherToolsAudioPlayer) {
          ui.otherToolsAudioPlayer.src = item.url;
          ui.otherToolsAudioPlayer.play().catch(() => {});
        }
      });
      row.querySelector('.hist-dl-btn').addEventListener('click', async () => {
        try {
          const saved = await saveToolAudioBlob(item.blob, item.subfolder, item.prefix, item.ext);
          setToolStatus(`✅ 已保存至 下载/${saved.finalPath}`, 'success');
        } catch (err) {
          setToolStatus(`❌ 下载失败：${err.message}`, 'error');
        }
      });
      ui.otherToolsHistoryList.appendChild(row);
    });
  }

  if (ui.otherToolsDownloadBtn) {
    ui.otherToolsDownloadBtn.addEventListener('click', async () => {
      if (!currentToolAudio) return;
      try {
        const saved = await saveToolAudioBlob(currentToolAudio.blob, currentToolAudio.subfolder, currentToolAudio.prefix, currentToolAudio.ext);
        setToolStatus(`✅ 已保存至 下载/${saved.finalPath}`, 'success');
      } catch (err) {
        setToolStatus(`❌ 下载失败：${err.message}`, 'error');
      }
    });
  }

  function setToolButtonsBusy(busy) {
    toolTaskRunning = busy;
    [ui.sfxGenerateBtn, ui.musicGenerateBtn, ui.stsGenerateBtn, ui.isoGenerateBtn, ui.sttGenerateBtn].forEach(btn => {
      if (btn) btn.disabled = busy;
    });
  }

  // 音效生成 (POST /v1/sound-generation)
  if (ui.sfxGenerateBtn) {
    ui.sfxGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const prompt = ui.sfxPrompt ? ui.sfxPrompt.value.trim() : '';
      if (!prompt) return setToolStatus('⚠️ 请先输入音效描述提示词', 'error');

      const isCustomDur = ui.sfxDurationMode && ui.sfxDurationMode.value === 'custom';
      const customDur = ui.sfxDuration ? Math.min(30, Math.max(0.5, parseFloat(ui.sfxDuration.value) || 5)) : 5;
      const influence = ui.sfxInfluence ? Math.min(1, Math.max(0, parseFloat(ui.sfxInfluence.value) || 0.3)) : 0.3;
      const loop = Boolean(ui.sfxLoop && ui.sfxLoop.checked);
      const autoDl = Boolean(ui.sfxAutoDownload && ui.sfxAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = ui.sfxGenerateBtn.textContent;
      ui.sfxGenerateBtn.textContent = '⏳ 音效生成中...';

      try {
        const { result: blob, alias } = await runWithToolApiPool('音效生成', async (key) => {
          const payload = { text: prompt, prompt_influence: influence };
          if (isCustomDur) payload.duration_seconds = customDur;
          if (loop) payload.loop = true;

          const resp = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
            method: 'POST',
            headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!resp.ok) {
            const msg = await readElevenError(resp, '音效生成失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.blob();
        });

        const prefix = `SFX_${sanitizeToolFilename(prompt, 'sound')}`;
        showToolAudioResult({ blob, title: `🔊 音效: ${prompt.slice(0, 28)}`, subfolder: 'SFX_音效', prefix, ext: 'mp3', accountAlias: alias });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'SFX_音效', prefix, 'mp3');
          setToolStatus(`✅ 音效生成成功并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 音效生成成功（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 音效生成失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.sfxGenerateBtn.textContent = origText;
      }
    });
  }

  // 音乐生成 (默认降级生成 BGM 音乐 + 付费模型兼容优化)
  function buildBgmPromptText(rawPrompt, forceInstrumental) {
    let text = String(rawPrompt || '').trim();
    if (!/(music|beat|song|melody|track|soundtrack|bgm|score|音乐|配乐|伴奏|曲|旋律)/i.test(text)) {
      text = `Background music track: ${text}`;
    }
    if (forceInstrumental && !/(instrumental|no vocals|without vocals|纯音乐|无人声|伴奏)/i.test(text)) {
      text = `${text}, instrumental background music, no vocals`;
    }
    return text;
  }

  async function requestBgmMusicWithCompatibility(key, rawPrompt, isCustomDur, durSec, forceInstrumental) {
    const bgmText = buildBgmPromptText(rawPrompt, forceInstrumental);
    const targetDur = Math.min(30, Math.max(3, Number(durSec) || 22));
    const attempts = [];
    if (isCustomDur) {
      attempts.push({ text: bgmText, duration_seconds: targetDur, prompt_influence: 0.5, loop: true });
      if (targetDur > 22) {
        attempts.push({ text: bgmText, duration_seconds: 22, prompt_influence: 0.5, loop: true });
      }
      attempts.push({ text: bgmText, duration_seconds: Math.min(22, targetDur), prompt_influence: 0.5 });
    }
    attempts.push({ text: bgmText, prompt_influence: 0.5 });

    let lastResp = null;
    for (let i = 0; i < attempts.length; i++) {
      const resp = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify(attempts[i])
      });
      if (resp.ok) return await resp.blob();
      lastResp = resp;
      if (resp.status !== 400 && resp.status !== 422) break;
    }
    const msg = await readElevenError(lastResp, 'BGM 音乐生成失败');
    throw Object.assign(new Error(msg), { status: lastResp ? lastResp.status : 0 });
  }

  async function requestPaidMusicWithCompatibility(key, prompt, modelId, isCustomDur, durSec, forceInstrumental) {
    const modelChain = [];
    [modelId, 'music_v1', 'music_v2', 'music_v2_5', 'auto'].forEach((m) => {
      if (m && !modelChain.includes(m)) modelChain.push(m);
    });

    let lastResp = null;
    for (let i = 0; i < modelChain.length; i++) {
      const candidateModel = modelChain[i];
      const payload = { prompt, force_instrumental: forceInstrumental };
      if (isCustomDur) payload.music_length_ms = Math.round(durSec * 1000);
      if (candidateModel && candidateModel !== 'auto') payload.model_id = candidateModel;

      const resp = await fetch('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128', {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        return { blob: await resp.blob(), usedModel: candidateModel };
      }
      lastResp = resp;
      if (resp.status !== 400 && resp.status !== 404 && resp.status !== 422) break;
    }
    const msg = await readElevenError(lastResp, '付费音乐接口调用失败');
    throw Object.assign(new Error(msg), { status: lastResp ? lastResp.status : 0 });
  }

  if (ui.musicGenerateBtn) {
    ui.musicGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const prompt = ui.musicPrompt ? ui.musicPrompt.value.trim() : '';
      if (!prompt) return setToolStatus('⚠️ 请先输入音乐风格或描述提示词', 'error');

      const modelId = ui.musicModel ? ui.musicModel.value : 'bgm_default';
      const selectedKeyVal = ui.toolKeySelect ? ui.toolKeySelect.value : '__auto__';
      const isManualAccount = Boolean(selectedKeyVal && selectedKeyVal !== '__auto__');
      const isPaidModelSelected = Boolean(modelId && modelId !== 'bgm_default');
      // 除非同时手动选择了具体付费账户且选择了付费模型，否则默认降级生成 BGM 音乐
      const usePaidMusicApi = isManualAccount && isPaidModelSelected;

      const isCustomDur = ui.musicDurationMode && ui.musicDurationMode.value === 'custom';
      const rawDurSec = ui.musicDurationSec ? (parseInt(ui.musicDurationSec.value, 10) || 22) : 22;
      const durSec = usePaidMusicApi
        ? Math.min(300, Math.max(3, rawDurSec))
        : Math.min(30, Math.max(3, rawDurSec));
      const forceInstrumental = Boolean(ui.musicInstrumental && ui.musicInstrumental.checked);
      const autoDl = Boolean(ui.musicAutoDownload && ui.musicAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = ui.musicGenerateBtn.textContent;
      ui.musicGenerateBtn.textContent = usePaidMusicApi
        ? '⏳ 付费模型音乐合成中 (约10~40秒)...'
        : '⏳ 正在合成 BGM 配乐...';

      try {
        let usedModeLabel = 'BGM 配乐模式';
        const { result: blob, alias } = await runWithToolApiPool('音乐生成', async (key) => {
          if (usePaidMusicApi) {
            const { blob: paidBlob, usedModel } = await requestPaidMusicWithCompatibility(
              key,
              prompt,
              modelId,
              isCustomDur,
              durSec,
              forceInstrumental
            );
            usedModeLabel = `Eleven Music (${usedModel === 'auto' ? '自动模型' : usedModel})`;
            return paidBlob;
          }
          if (isPaidModelSelected && !isManualAccount) {
            usedModeLabel = '默认降级 BGM 模式 (未指定付费账号)';
          }
          return await requestBgmMusicWithCompatibility(
            key,
            prompt,
            isCustomDur,
            durSec,
            forceInstrumental
          );
        });

        const prefix = `Music_${sanitizeToolFilename(prompt, 'track')}`;
        showToolAudioResult({ blob, title: `🎵 音乐 [${usedModeLabel}]: ${prompt.slice(0, 24)}`, subfolder: 'Music_音乐', prefix, ext: 'mp3', accountAlias: alias });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'Music_音乐', prefix, 'mp3');
          setToolStatus(`✅ 音乐生成成功 [${usedModeLabel}] 并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 音乐生成成功 [${usedModeLabel}]（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        const extraHint = usePaidMusicApi && (err.status === 402 || err.status === 403 || /free_users|permission|paid|subscription/i.test(err.message || ''))
          ? '（当前所选账号可能为免费号或未开启 Music 权限，可切换为「免费 BGM 配乐模式」）'
          : '';
        setToolStatus(`❌ 音乐生成失败：${err.message}${extraHint}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.musicGenerateBtn.textContent = origText;
      }
    });
  }

  // 语音变声 (POST /v1/speech-to-speech/{voice_id})
  if (ui.stsGenerateBtn) {
    ui.stsGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const file = ui.stsAudioFile && ui.stsAudioFile.files && ui.stsAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要变声的源音频文件', 'error');

      const customVoice = ui.stsCustomVoiceId ? ui.stsCustomVoiceId.value.trim() : '';
      const baseVoice = customVoice || (ui.customVoiceId && ui.customVoiceId.value.trim()) || (ui.voice && ui.voice.value);
      if (!baseVoice || baseVoice.includes('配置') || baseVoice.includes('加载')) {
        return setToolStatus('⚠️ 请在主界面选择目标声音，或填写目标 Voice ID', 'error');
      }

      const stsModel = ui.stsModel ? ui.stsModel.value : 'eleven_multilingual_sts_v2';
      const removeNoise = Boolean(ui.stsRemoveNoise && ui.stsRemoveNoise.checked);
      const autoDl = Boolean(ui.stsAutoDownload && ui.stsAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = ui.stsGenerateBtn.textContent;
      ui.stsGenerateBtn.textContent = '⏳ 正在转换音色...';

      try {
        const { result: blob, alias } = await runWithToolApiPool('语音变声', async (key) => {
          const formData = new FormData();
          formData.append('audio', file, file.name || 'input.mp3');
          formData.append('model_id', stsModel);
          formData.append('remove_background_noise', String(removeNoise));
          formData.append('voice_settings', JSON.stringify({
            stability: parseFloat(ui.stab ? ui.stab.value : '0.5') || 0.5,
            similarity_boost: parseFloat(ui.sim ? ui.sim.value : '0.75') || 0.75
          }));

          const resp = await fetch(`https://api.elevenlabs.io/v1/speech-to-speech/${encodeURIComponent(baseVoice)}?output_format=mp3_44100_128`, {
            method: 'POST',
            headers: { 'xi-api-key': key },
            body: formData
          });
          if (!resp.ok) {
            const msg = await readElevenError(resp, '语音变声失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.blob();
        });

        const baseName = file.name ? file.name.replace(/\.[^.]+$/, '') : 'sts';
        const prefix = `STS_${sanitizeToolFilename(baseName, 'voicechange')}`;
        showToolAudioResult({ blob, title: `🎭 变声: ${file.name}`, subfolder: 'STS_变声', prefix, ext: 'mp3', accountAlias: alias });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'STS_变声', prefix, 'mp3');
          setToolStatus(`✅ 语音变声完成并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 语音变声完成（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 语音变声失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.stsGenerateBtn.textContent = origText;
      }
    });
  }

  // 人声提取 / 降噪 (POST /v1/audio-isolation)
  if (ui.isoGenerateBtn) {
    ui.isoGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const file = ui.isoAudioFile && ui.isoAudioFile.files && ui.isoAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要提取人声的音频文件', 'error');

      const autoDl = Boolean(ui.isoAutoDownload && ui.isoAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = ui.isoGenerateBtn.textContent;
      ui.isoGenerateBtn.textContent = '⏳ 正在分离背景音与提纯人声...';

      try {
        const { result: blob, alias } = await runWithToolApiPool('人声提取降噪', async (key) => {
          const formData = new FormData();
          formData.append('audio', file, file.name || 'audio.mp3');

          const resp = await fetch('https://api.elevenlabs.io/v1/audio-isolation', {
            method: 'POST',
            headers: { 'xi-api-key': key },
            body: formData
          });
          if (!resp.ok) {
            const msg = await readElevenError(resp, '人声提取失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.blob();
        });

        const baseName = file.name ? file.name.replace(/\.[^.]+$/, '') : 'vocal';
        const prefix = `Vocal_${sanitizeToolFilename(baseName, 'isolated')}`;
        showToolAudioResult({ blob, title: `🧹 纯净人声: ${file.name}`, subfolder: 'Vocal_人声提取', prefix, ext: 'mp3', accountAlias: alias });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'Vocal_人声提取', prefix, 'mp3');
          setToolStatus(`✅ 人声提取成功并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 人声提取成功（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 人声提取失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.isoGenerateBtn.textContent = origText;
      }
    });
  }

  // 语音转文字 (POST /v1/speech-to-text)
  if (ui.sttGenerateBtn) {
    ui.sttGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const file = ui.sttAudioFile && ui.sttAudioFile.files && ui.sttAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要识别的音频或视频文件', 'error');

      const preferredModel = ui.sttModel ? ui.sttModel.value : 'scribe_v1';
      const tagEvents = Boolean(ui.sttTagEvents && ui.sttTagEvents.checked);
      const diarize = Boolean(ui.sttDiarize && ui.sttDiarize.checked);

      setToolButtonsBusy(true);
      const origText = ui.sttGenerateBtn.textContent;
      ui.sttGenerateBtn.textContent = '⏳ 正在识别语音文字...';

      try {
        const { result: data, alias } = await runWithToolApiPool('语音转文字', async (key) => {
          const sendRequest = async (modelToUse) => {
            const formData = new FormData();
            formData.append('file', file, file.name || 'audio.mp3');
            formData.append('model_id', modelToUse);
            formData.append('tag_audio_events', String(tagEvents));
            formData.append('diarize', String(diarize));
            return fetch('https://api.elevenlabs.io/v1/speech-to-text', {
              method: 'POST',
              headers: { 'xi-api-key': key },
              body: formData
            });
          };

          let resp = await sendRequest(preferredModel);
          if (!resp.ok && (resp.status === 400 || resp.status === 422) && preferredModel !== 'scribe_v1') {
            resp = await sendRequest('scribe_v1');
          }
          if (!resp.ok) {
            const msg = await readElevenError(resp, '语音转文字失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.json();
        });

        let formattedText = String(data && data.text || '').trim();
        if (diarize && Array.isArray(data && data.words) && data.words.length > 0) {
          const lines = [];
          let currentSpeaker = null;
          let currentBuffer = '';
          for (const w of data.words) {
            const spk = w.speaker_id || w.speaker || '';
            if (spk && spk !== currentSpeaker) {
              if (currentBuffer.trim()) {
                lines.push(currentSpeaker ? `[${currentSpeaker}] ${currentBuffer.trim()}` : currentBuffer.trim());
              }
              currentSpeaker = spk;
              currentBuffer = w.text || '';
            } else {
              currentBuffer += w.text || '';
            }
          }
          if (currentBuffer.trim()) {
            lines.push(currentSpeaker ? `[${currentSpeaker}] ${currentBuffer.trim()}` : currentBuffer.trim());
          }
          if (lines.length > 1) formattedText = lines.join('\n');
        }

        if (ui.sttOutputText) ui.sttOutputText.value = formattedText;
        setToolStatus(`✅ 语音识别完成（账号: ${alias}，共 ${formattedText.length} 字）`, 'success');
      } catch (err) {
        setToolStatus(`❌ 语音转文字失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.sttGenerateBtn.textContent = origText;
      }
    });
  }

  if (ui.sttCopyBtn) {
    ui.sttCopyBtn.addEventListener('click', async () => {
      const txt = ui.sttOutputText ? ui.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可复制的识别文本', 'error');
      try {
        await navigator.clipboard.writeText(txt);
        setToolStatus('✅ 已复制识别文本到剪贴板', 'success');
      } catch (_) {
        setToolStatus('❌ 复制失败，请手动选中复制', 'error');
      }
    });
  }

  if (ui.sttDownloadTxtBtn) {
    ui.sttDownloadTxtBtn.addEventListener('click', () => {
      const txt = ui.sttOutputText ? ui.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可导出的识别文本', 'error');
      const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const stamp = new Date().toISOString().slice(11, 19).replace(/:/g, '');
      chrome.downloads.download({
        url,
        filename: `${(state.baseFolder || 'ElevenLabs_Pro').replace(/[\\:*?"<>|]/g, '_')}/STT_转文字_${stamp}.txt`,
        saveAs: false
      }, () => {
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        setToolStatus('✅ 已导出识别文本 TXT', 'success');
      });
    });
  }

  if (ui.sttSendToQueueBtn) {
    ui.sttSendToQueueBtn.addEventListener('click', () => {
      const txt = ui.sttOutputText ? ui.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可加入队列的识别文本', 'error');
      let segs = maybeAutoPrependTagToSegments(txt.split(/\r?\n+/).map(s => s.trim()).filter(Boolean));
      const existingCards = Array.from(ui.container.querySelectorAll('.card'));
      if (existingCards.length === 1 && !existingCards[0].querySelector('textarea').value.trim()) {
        existingCards[0].remove();
      }
      segs.forEach(s => addCard(s, false));
      refreshIndexes();
      saveCards();
      updateStats();
      setToolStatus(`✅ 已将 ${segs.length} 段识别文本加入主界面文案队列`, 'success');
      setStatus(`📥 已从语音转文字导入 ${segs.length} 段文案`);
    });
  }

  // ==========================================
  // 13. 🧹 声音清理与重名去重管理
  // ==========================================
  let voicePreviewAudio = null;

  function setVoiceCleanupStatus(msg, type = 'normal') {
    if (!ui.voiceCleanupStatus) return;
    ui.voiceCleanupStatus.textContent = msg;
    ui.voiceCleanupStatus.classList.remove('error', 'success');
    if (type === 'error') ui.voiceCleanupStatus.classList.add('error');
    if (type === 'success') ui.voiceCleanupStatus.classList.add('success');
  }

  function updateVoiceCleanupButtonCount() {
    if (!ui.confirmDeleteVoicesBtn) return;
    const count = state.selectedVoiceCleanupIds instanceof Set ? state.selectedVoiceCleanupIds.size : 0;
    ui.confirmDeleteVoicesBtn.textContent = `🧹 一键清理已勾选声音 (${count})`;
    ui.confirmDeleteVoicesBtn.disabled = count === 0;
  }

  function selectDefaultDuplicateVoices() {
    const { duplicateExtraIds } = analyzeVoicesForCleanup();
    state.selectedVoiceCleanupIds = new Set(duplicateExtraIds);
    updateVoiceCleanupButtonCount();
  }

  function openVoiceCleanupModal() {
    if (!ui.voiceCleanupModal) return;
    selectDefaultDuplicateVoices();
    renderVoiceCleanupModal();
    ui.voiceCleanupModal.classList.remove('hidden');
  }

  function closeVoiceCleanupModal() {
    if (voicePreviewAudio) {
      try { voicePreviewAudio.pause(); } catch (_) {}
      voicePreviewAudio = null;
    }
    if (ui.voiceCleanupModal) ui.voiceCleanupModal.classList.add('hidden');
  }

  function createVoiceCleanupRow(voice, options = {}) {
    const row = document.createElement('div');
    row.className = `voice-cleanup-item${options.isDuplicateExtra ? ' is-dup' : ''}`;

    const left = document.createElement('div');
    left.className = 'voice-cleanup-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = state.selectedVoiceCleanupIds.has(voice.voice_id);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) state.selectedVoiceCleanupIds.add(voice.voice_id);
      else state.selectedVoiceCleanupIds.delete(voice.voice_id);
      updateVoiceCleanupButtonCount();
    });

    const badge = document.createElement('span');
    if (options.isPrimaryOfDup) {
      badge.className = 'voice-cleanup-badge keep';
      badge.textContent = '✅ 保留主项';
    } else if (options.isDuplicateExtra) {
      badge.className = 'voice-cleanup-badge dup';
      badge.textContent = `⚠️ 重名副本 #${options.dupIndex}`;
    } else {
      badge.className = 'voice-cleanup-badge cat';
      const catMap = { generated: '设计/生成', cloned: '克隆', professional: '专业库' };
      badge.textContent = catMap[voice.category] || voice.category || '自定义';
    }

    const nameSpan = document.createElement('span');
    nameSpan.className = 'voice-cleanup-name';
    const shortId = String(voice.voice_id || '').slice(-6);
    nameSpan.textContent = `${voice.name} (ID: ...${shortId})`;
    nameSpan.title = `${voice.name} · Voice ID: ${voice.voice_id}`;

    left.appendChild(checkbox);
    left.appendChild(badge);
    left.appendChild(nameSpan);

    const actions = document.createElement('div');
    actions.className = 'voice-cleanup-actions';

    if (voice.preview_url && typeof Audio === 'function') {
      const playBtn = document.createElement('button');
      playBtn.type = 'button';
      playBtn.className = 'btn-outlined';
      playBtn.textContent = '🔊 试听';
      playBtn.addEventListener('click', () => {
        if (voicePreviewAudio) {
          try { voicePreviewAudio.pause(); } catch (_) {}
        }
        voicePreviewAudio = new Audio(voice.preview_url);
        voicePreviewAudio.play().catch(() => {});
      });
      actions.appendChild(playBtn);
    }

    const delOneBtn = document.createElement('button');
    delOneBtn.type = 'button';
    delOneBtn.className = 'btn-ghost';
    delOneBtn.textContent = '🗑️ 删除';
    delOneBtn.addEventListener('click', () => {
      executeVoiceCleanup([voice.voice_id]);
    });
    actions.appendChild(delOneBtn);

    row.appendChild(left);
    row.appendChild(actions);
    return row;
  }

  function renderVoiceCleanupModal() {
    if (!ui.voiceCleanupList) return;
    const { visibleVoices, duplicateGroups, duplicateExtraIds, singleCustomVoices, hiddenCount } = analyzeVoicesForCleanup();
    const query = (ui.voiceCleanupSearch ? ui.voiceCleanupSearch.value : '').trim().toLowerCase();

    if (ui.voiceCleanupSummary) {
      ui.voiceCleanupSummary.textContent = `当前声音库共 ${visibleVoices.length} 个声音 · 发现 ${duplicateGroups.length} 组同名声音（共 ${duplicateExtraIds.length} 个多余副本）${hiddenCount > 0 ? ` · 已在本地隐藏 ${hiddenCount} 个` : ''}`;
    }
    if (ui.restoreHiddenVoicesBtn) {
      ui.restoreHiddenVoicesBtn.classList.toggle('hidden', hiddenCount === 0);
      ui.restoreHiddenVoicesBtn.textContent = `♻️ 恢复已隐藏 (${hiddenCount})`;
    }

    ui.voiceCleanupList.innerHTML = '';
    let renderedCount = 0;

    for (const group of duplicateGroups) {
      const matchedGroup = group.filter(v => !query || String(v.name || '').toLowerCase().includes(query) || String(v.voice_id || '').toLowerCase().includes(query));
      if (matchedGroup.length === 0) continue;

      const title = document.createElement('div');
      title.className = 'voice-cleanup-group-title';
      title.textContent = `🔁 同名重复组：「${group[0].name}」（共 ${group.length} 个，默认保留第 1 个）`;
      ui.voiceCleanupList.appendChild(title);

      group.forEach((voice, idx) => {
        if (query && !matchedGroup.includes(voice)) return;
        ui.voiceCleanupList.appendChild(createVoiceCleanupRow(voice, {
          isPrimaryOfDup: idx === 0,
          isDuplicateExtra: idx > 0,
          dupIndex: idx + 1
        }));
        renderedCount++;
      });
    }

    const matchedSingles = singleCustomVoices.filter(v => !query || String(v.name || '').toLowerCase().includes(query) || String(v.voice_id || '').toLowerCase().includes(query));
    if (matchedSingles.length > 0) {
      const singleTitle = document.createElement('div');
      singleTitle.className = 'voice-cleanup-group-title normal';
      singleTitle.textContent = `📋 其他自定义 / 收藏声音（共 ${matchedSingles.length} 个，可手动勾选清理复制错的声音）`;
      ui.voiceCleanupList.appendChild(singleTitle);

      for (const voice of matchedSingles) {
        ui.voiceCleanupList.appendChild(createVoiceCleanupRow(voice, {
          isPrimaryOfDup: false,
          isDuplicateExtra: false
        }));
        renderedCount++;
      }
    }

    if (renderedCount === 0) {
      const empty = document.createElement('div');
      empty.className = 'voice-cleanup-group-title normal';
      empty.textContent = visibleVoices.length === 0
        ? '⚠️ 尚未加载到声音列表，请先配置 API Key 并点击刷新按钮。'
        : '🎉 没有匹配的重复或自定义声音。';
      ui.voiceCleanupList.appendChild(empty);
    }

    updateVoiceCleanupButtonCount();
  }

  async function executeVoiceCleanup(targetIds) {
    const ids = Array.isArray(targetIds) ? targetIds.filter(Boolean) : [...state.selectedVoiceCleanupIds];
    if (ids.length === 0) {
      setVoiceCleanupStatus('⚠️ 请先勾选需要清理的声音', 'error');
      return;
    }

    if (ui.confirmDeleteVoicesBtn) ui.confirmDeleteVoicesBtn.disabled = true;

    let cloudDeleted = 0;
    let localHidden = 0;
    const hiddenSet = new Set(Array.isArray(state.hiddenVoiceIds) ? state.hiddenVoiceIds : []);
    const cleanedSet = new Set();

    for (let i = 0; i < ids.length; i++) {
      const voiceId = ids[i];
      setVoiceCleanupStatus(`⏳ 正在清理声音 (${i + 1} / ${ids.length})...`);
      let deletedOnServer = false;

      if (state.currentKey) {
        try {
          const res = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
            method: 'DELETE',
            headers: { 'xi-api-key': state.currentKey }
          });
          if (res.ok || res.status === 404) {
            deletedOnServer = true;
            cloudDeleted++;
          }
        } catch (_) {}
      }

      if (!deletedOnServer) {
        hiddenSet.add(voiceId);
        localHidden++;
      }
      cleanedSet.add(voiceId);
      state.selectedVoiceCleanupIds.delete(voiceId);
    }

    state.hiddenVoiceIds = [...hiddenSet];
    state.voiceList = (Array.isArray(state.voiceList) ? state.voiceList : []).filter(v => !cleanedSet.has(v.voice_id) || hiddenSet.has(v.voice_id));
    if (state.currentKey && state.voiceCacheByKey) {
      state.voiceCacheByKey[state.currentKey] = state.voiceList;
    }
    await new Promise(r => chrome.storage.local.set({ hiddenVoiceIds: state.hiddenVoiceIds }, r));

    renderVoiceSelectOptions();
    renderVoiceCleanupModal();

    const summaryParts = [];
    if (cloudDeleted > 0) summaryParts.push(`云端彻底删除 ${cloudDeleted} 个`);
    if (localHidden > 0) summaryParts.push(`本地屏蔽隐藏 ${localHidden} 个`);
    const doneMsg = `✅ 清理完成：共处理 ${ids.length} 个声音（${summaryParts.join('，')}）`;
    setVoiceCleanupStatus(doneMsg, 'success');
    setStatus(doneMsg);
  }

  if (ui.cleanVoicesBtn) ui.cleanVoicesBtn.addEventListener('click', openVoiceCleanupModal);
  if (ui.closeVoiceCleanupBtn) ui.closeVoiceCleanupBtn.addEventListener('click', closeVoiceCleanupModal);
  if (ui.cancelVoiceCleanupBtn) ui.cancelVoiceCleanupBtn.addEventListener('click', closeVoiceCleanupModal);
  if (ui.voiceCleanupModal) {
    ui.voiceCleanupModal.addEventListener('click', (e) => {
      if (e.target === ui.voiceCleanupModal) closeVoiceCleanupModal();
    });
  }
  if (ui.voiceCleanupSearch) ui.voiceCleanupSearch.addEventListener('input', renderVoiceCleanupModal);
  if (ui.selectDuplicateVoicesBtn) {
    ui.selectDuplicateVoicesBtn.addEventListener('click', () => {
      selectDefaultDuplicateVoices();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus(`🎯 已自动勾选 ${state.selectedVoiceCleanupIds.size} 个同名多余副本（每组保留第 1 个）`);
    });
  }
  if (ui.clearVoiceSelectionBtn) {
    ui.clearVoiceSelectionBtn.addEventListener('click', () => {
      state.selectedVoiceCleanupIds.clear();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus('已取消全部勾选');
    });
  }
  if (ui.restoreHiddenVoicesBtn) {
    ui.restoreHiddenVoicesBtn.addEventListener('click', async () => {
      state.hiddenVoiceIds = [];
      await new Promise(r => chrome.storage.local.set({ hiddenVoiceIds: [] }, r));
      if (state.currentKey) {
        await loadVoices(state.currentKey);
      } else {
        renderVoiceSelectOptions();
      }
      selectDefaultDuplicateVoices();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus('♻️ 已恢复所有本地隐藏的声音', 'success');
    });
  }
  if (ui.dedupeVoiceSelectToggle) {
    ui.dedupeVoiceSelectToggle.addEventListener('change', async () => {
      state.dedupeVoiceSelect = Boolean(ui.dedupeVoiceSelectToggle.checked);
      await new Promise(r => chrome.storage.local.set({ dedupeVoiceSelect: state.dedupeVoiceSelect }, r));
      renderVoiceSelectOptions();
      setVoiceCleanupStatus(state.dedupeVoiceSelect
        ? '✨ 已开启：主界面下拉框已自动合并隐藏同名重复声音'
        : '已关闭下拉框自动合并，同名声音将显示序号与尾号区分');
    });
  }
  if (ui.confirmDeleteVoicesBtn) {
    ui.confirmDeleteVoicesBtn.addEventListener('click', () => {
      executeVoiceCleanup([...state.selectedVoiceCleanupIds]);
    });
  }

  // ==========================================
  // 🎛️ 13. ElevenLabs 音频效果 (Audio Effects) 与 🔄 GitHub 自动检查更新
  // ==========================================
  const audioEffectEnvEl = document.getElementById('audioEffectEnv');
  const clearAudioEffectEnvBtn = document.getElementById('clearAudioEffectEnvBtn');
  const toggleMoreEffectsBtn = document.getElementById('toggleMoreEffectsBtn');
  const moreAudioEffectsPanel = document.getElementById('moreAudioEffectsPanel');
  const audioEffectFilterEl = document.getElementById('audioEffectFilter');
  const audioEffectNoiseEl = document.getElementById('audioEffectNoise');
  const audioEffectSendLevelEl = document.getElementById('audioEffectSendLevel');
  const audioEffectDistanceEl = document.getElementById('audioEffectDistance');
  const valEffectSendEl = document.getElementById('valEffectSend');
  const valEffectDistanceEl = document.getElementById('valEffectDistance');
  const refreshAudioEffectsBtn = document.getElementById('refreshAudioEffectsBtn');
  const resetAudioEffectsBtn = document.getElementById('resetAudioEffectsBtn');

  function buildAudioEffectsPayload() {
    const envId = audioEffectEnvEl ? audioEffectEnvEl.value.trim() : '';
    const filterId = audioEffectFilterEl ? audioEffectFilterEl.value.trim() : '';
    const noiseId = audioEffectNoiseEl ? audioEffectNoiseEl.value.trim() : '';
    if (!envId && !filterId && !noiseId) return null;
    const payload = {};
    if (envId) {
      payload.environment_id = envId;
      const sendLevel = audioEffectSendLevelEl ? Number(audioEffectSendLevelEl.value) : 1;
      const distance = audioEffectDistanceEl ? Number(audioEffectDistanceEl.value) : 0.3;
      payload.send_level = Number.isFinite(sendLevel) ? Number(sendLevel.toFixed(2)) : 1;
      if (Number.isFinite(distance) && distance > 0) {
        payload.distance = Number(distance.toFixed(2));
      }
    }
    if (filterId) payload.filter_preset_id = filterId;
    if (noiseId) payload.background_noise_id = noiseId;
    return payload;
  }

  function updateAudioEffectsUI() {
    const envId = audioEffectEnvEl ? audioEffectEnvEl.value : '';
    const filterId = audioEffectFilterEl ? audioEffectFilterEl.value : '';
    const noiseId = audioEffectNoiseEl ? audioEffectNoiseEl.value : '';
    const sendVal = audioEffectSendLevelEl ? Number(audioEffectSendLevelEl.value) : 1;
    const distVal = audioEffectDistanceEl ? Number(audioEffectDistanceEl.value) : 0.3;
    if (valEffectSendEl) valEffectSendEl.textContent = sendVal.toFixed(2);
    if (valEffectDistanceEl) valEffectDistanceEl.textContent = distVal.toFixed(2);
    if (clearAudioEffectEnvBtn) {
      clearAudioEffectEnvBtn.style.visibility = envId ? 'visible' : 'hidden';
    }
    if (toggleMoreEffectsBtn) {
      const extraCount = (filterId ? 1 : 0) + (noiseId ? 1 : 0);
      const isOpen = moreAudioEffectsPanel && !moreAudioEffectsPanel.classList.contains('hidden');
      toggleMoreEffectsBtn.classList.toggle('active', extraCount > 0 || isOpen);
      toggleMoreEffectsBtn.textContent = extraCount > 0
        ? `🎛️ 已启用附加效果 (${extraCount}) ${isOpen ? '▲' : '▼'}`
        : (isOpen ? '▲ 收起更多效果' : '+ 添加效果');
    }
  }

  function saveAudioEffectsSettings() {
    updateAudioEffectsUI();
    chrome.storage.local.set({
      audio_effects_config: {
        environment_id: audioEffectEnvEl ? audioEffectEnvEl.value : '',
        filter_preset_id: audioEffectFilterEl ? audioEffectFilterEl.value : '',
        background_noise_id: audioEffectNoiseEl ? audioEffectNoiseEl.value : '',
        send_level: audioEffectSendLevelEl ? Number(audioEffectSendLevelEl.value) : 1,
        distance: audioEffectDistanceEl ? Number(audioEffectDistanceEl.value) : 0.3
      }
    });
  }

  function mergeCatalogOptions(selectEl, items, idField) {
    if (!selectEl || !Array.isArray(items)) return 0;
    const existing = new Set(Array.from(selectEl.options).map(o => o.value));
    let added = 0;
    for (const item of items) {
      const id = item && (item[idField] || item.id);
      if (!id || typeof id !== 'string' || existing.has(id)) continue;
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = item.name ? `${item.name} (${id})` : id;
      selectEl.appendChild(opt);
      existing.add(id);
      added++;
    }
    return added;
  }

  async function refreshAudioEffectsCatalog() {
    if (!state.currentKey) return setStatus('请先配置 API Key 后再同步官方音频效果目录', 'error');
    if (refreshAudioEffectsBtn) refreshAudioEffectsBtn.disabled = true;
    try {
      const res = await fetch('https://api.elevenlabs.io/v1/audio-effects/catalog', {
        headers: { 'xi-api-key': state.currentKey }
      });
      if (!res.ok) throw new Error(await readElevenError(res, '音频效果目录同步失败'));
      const data = await res.json();
      const addedEnv = mergeCatalogOptions(audioEffectEnvEl, data.environments, 'environment_id');
      const addedFilter = mergeCatalogOptions(audioEffectFilterEl, data.filter_presets, 'filter_preset_id');
      const addedNoise = mergeCatalogOptions(audioEffectNoiseEl, data.background_noises, 'background_noise_id');
      chrome.storage.local.set({ audio_effects_catalog_cache: { data, ts: Date.now() } });
      setStatus(`✅ 已同步官方音频效果库（新增 ${addedEnv + addedFilter + addedNoise} 项预设）`);
    } catch (e) {
      setStatus(`⚠️ 官方效果库同步提示：${e.message || '当前使用内置预设'}`, 'error');
    } finally {
      if (refreshAudioEffectsBtn) refreshAudioEffectsBtn.disabled = false;
    }
  }

  if (audioEffectEnvEl) audioEffectEnvEl.addEventListener('change', saveAudioEffectsSettings);
  if (audioEffectFilterEl) audioEffectFilterEl.addEventListener('change', saveAudioEffectsSettings);
  if (audioEffectNoiseEl) audioEffectNoiseEl.addEventListener('change', saveAudioEffectsSettings);
  if (audioEffectSendLevelEl) audioEffectSendLevelEl.addEventListener('input', saveAudioEffectsSettings);
  if (audioEffectDistanceEl) audioEffectDistanceEl.addEventListener('input', saveAudioEffectsSettings);
  if (clearAudioEffectEnvBtn) {
    clearAudioEffectEnvBtn.addEventListener('click', () => {
      if (audioEffectEnvEl) audioEffectEnvEl.value = '';
      saveAudioEffectsSettings();
      setStatus('已移除空间混响效果');
    });
  }
  if (toggleMoreEffectsBtn && moreAudioEffectsPanel) {
    toggleMoreEffectsBtn.addEventListener('click', () => {
      moreAudioEffectsPanel.classList.toggle('hidden');
      updateAudioEffectsUI();
    });
  }
  if (resetAudioEffectsBtn) {
    resetAudioEffectsBtn.addEventListener('click', () => {
      if (audioEffectEnvEl) audioEffectEnvEl.value = '';
      if (audioEffectFilterEl) audioEffectFilterEl.value = '';
      if (audioEffectNoiseEl) audioEffectNoiseEl.value = '';
      if (audioEffectSendLevelEl) audioEffectSendLevelEl.value = '1';
      if (audioEffectDistanceEl) audioEffectDistanceEl.value = '0.3';
      saveAudioEffectsSettings();
      setStatus('已重置全部音频效果');
    });
  }
  if (refreshAudioEffectsBtn) {
    refreshAudioEffectsBtn.addEventListener('click', refreshAudioEffectsCatalog);
  }

  // 🔄 GitHub 自动检查更新与提示下载
  const GITHUB_REPO = 'golsaysea/ElevenLabs-Batch-TTS-Pro';
  const CURRENT_EXT_VERSION = '6.9.0';
  const REMOTE_MANIFEST_PATH = 'packages/elevenlabs-batch-standard/manifest.json';
  const DEFAULT_ZIP_NAME = 'elevenlabs-batch-standard-v6.9.0.zip';
  const checkUpdateBtn = document.getElementById('checkUpdateBtn');
  const githubUpdateBanner = document.getElementById('githubUpdateBanner');
  const githubUpdateText = document.getElementById('githubUpdateText');
  const dismissUpdateBtn = document.getElementById('dismissUpdateBtn');
  const downloadUpdateBtn = document.getElementById('downloadUpdateBtn');
  const openGithubReleaseBtn = document.getElementById('openGithubReleaseBtn');
  const autoCheckUpdateEl = document.getElementById('autoCheckUpdate');
  let latestUpdateInfo = null;

  function getLocalVersion() {
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getManifest === 'function') {
        const m = chrome.runtime.getManifest();
        if (m && m.version) return String(m.version).trim();
      }
    } catch (_) {}
    return CURRENT_EXT_VERSION;
  }

  function compareVersions(v1, v2) {
    const p1 = String(v1 || '').replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
    const p2 = String(v2 || '').replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
    const len = Math.max(p1.length, p2.length, 3);
    for (let i = 0; i < len; i++) {
      const a = p1[i] || 0;
      const b = p2[i] || 0;
      if (a > b) return 1;
      if (a < b) return -1;
    }
    return 0;
  }

  function renderGithubUpdateBanner(info) {
    latestUpdateInfo = info;
    if (!info || !info.hasUpdate) {
      if (githubUpdateBanner) githubUpdateBanner.classList.add('hidden');
      if (checkUpdateBtn) checkUpdateBtn.classList.remove('has-update');
      return;
    }
    if (checkUpdateBtn) {
      checkUpdateBtn.classList.add('has-update');
      checkUpdateBtn.title = `发现新版本 v${info.remoteVersion} (当前 v${info.localVersion})，点击查看或下载`;
    }
    if (githubUpdateText) {
      githubUpdateText.textContent = `🎉 发现新版本 v${info.remoteVersion} (当前 v${info.localVersion})`;
      githubUpdateText.title = info.notes || `GitHub 最新版本 v${info.remoteVersion}`;
    }
    if (githubUpdateBanner) githubUpdateBanner.classList.remove('hidden');
  }

  async function checkForGithubUpdate(manual = false) {
    const localVersion = getLocalVersion();
    if (manual) setStatus(`🔄 正在连接 GitHub 检查更新 (当前 v${localVersion})...`);
    try {
      let remoteVersion = '';
      let releaseUrl = `https://github.com/${GITHUB_REPO}/releases/latest`;
      let downloadUrl = '';
      let notes = '';

      try {
        const manifestRes = await fetch(`https://raw.githubusercontent.com/${GITHUB_REPO}/main/${REMOTE_MANIFEST_PATH}?t=${Date.now()}`);
        if (manifestRes.ok) {
          const manifestData = await manifestRes.json();
          if (manifestData && manifestData.version) {
            remoteVersion = String(manifestData.version).replace(/^v/i, '').trim();
          }
        }
      } catch (_) {}

      try {
        const relRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
          headers: { 'Accept': 'application/vnd.github+json' }
        });
        if (relRes.ok) {
          const relData = await relRes.json();
          if (relData.html_url) releaseUrl = relData.html_url;
          if (relData.body) notes = String(relData.body).slice(0, 400);
          if (Array.isArray(relData.assets)) {
            const matchedAsset = relData.assets.find(a => a && typeof a.name === 'string' && a.name.includes('batch-standard') && a.name.endsWith('.zip'))
              || relData.assets.find(a => a && typeof a.name === 'string' && a.name.endsWith('.zip'));
            if (matchedAsset && matchedAsset.browser_download_url) {
              downloadUrl = matchedAsset.browser_download_url;
              const matchVer = matchedAsset.name.match(/v(\d+\.\d+\.\d+)\.zip$/i);
              if (matchVer && (!remoteVersion || compareVersions(matchVer[1], remoteVersion) >= 0)) {
                remoteVersion = matchVer[1];
              }
            }
          }
        }
      } catch (_) {}

      if (!remoteVersion) {
        if (manual) setStatus('⚠️ 无法连接 GitHub 获取版本信息，请检查网络或稍后重试', 'error');
        return null;
      }

      if (!downloadUrl) {
        downloadUrl = `https://github.com/${GITHUB_REPO}/releases/latest/download/elevenlabs-batch-standard-v${remoteVersion}.zip`;
      }

      const hasUpdate = compareVersions(remoteVersion, localVersion) > 0;
      const info = { hasUpdate, localVersion, remoteVersion, releaseUrl, downloadUrl, notes, checkedAt: Date.now() };
      chrome.storage.local.set({ github_update_cache: info });
      renderGithubUpdateBanner(info);

      if (manual) {
        if (hasUpdate) {
          setStatus(`🎉 发现新版本 v${remoteVersion}！请点击上方绿色「⬇️ 一键下载更新包」升级`);
        } else {
          setStatus(`✅ 当前已是最新版本 (v${localVersion})`);
        }
      }
      return info;
    } catch (err) {
      if (manual) setStatus(`⚠️ 检查更新失败：${err.message || '网络异常'}`, 'error');
      return null;
    }
  }

  if (checkUpdateBtn) {
    checkUpdateBtn.addEventListener('click', () => checkForGithubUpdate(true));
  }
  if (dismissUpdateBtn && githubUpdateBanner) {
    dismissUpdateBtn.addEventListener('click', () => {
      githubUpdateBanner.classList.add('hidden');
      if (latestUpdateInfo && latestUpdateInfo.remoteVersion) {
        chrome.storage.local.set({ dismissed_update_version: latestUpdateInfo.remoteVersion });
      }
    });
  }
  if (openGithubReleaseBtn) {
    openGithubReleaseBtn.addEventListener('click', () => {
      const targetUrl = (latestUpdateInfo && latestUpdateInfo.releaseUrl) || `https://github.com/${GITHUB_REPO}/releases/latest`;
      if (chrome.tabs && typeof chrome.tabs.create === 'function') {
        chrome.tabs.create({ url: targetUrl });
      } else {
        window.open(targetUrl, '_blank');
      }
    });
  }
  if (downloadUpdateBtn) {
    downloadUpdateBtn.addEventListener('click', () => {
      const ver = (latestUpdateInfo && latestUpdateInfo.remoteVersion) || CURRENT_EXT_VERSION;
      const targetUrl = (latestUpdateInfo && latestUpdateInfo.downloadUrl) || `https://github.com/${GITHUB_REPO}/releases/latest/download/${DEFAULT_ZIP_NAME}`;
      const filename = `ElevenLabs_Pro/插件更新包/elevenlabs-batch-standard-v${ver}.zip`;
      if (chrome.downloads && typeof chrome.downloads.download === 'function') {
        chrome.downloads.download({ url: targetUrl, filename, saveAs: false, conflictAction: 'uniquify' }, (downloadId) => {
          if (chrome.runtime && chrome.runtime.lastError || !downloadId) {
            if (chrome.tabs && typeof chrome.tabs.create === 'function') chrome.tabs.create({ url: targetUrl });
            else window.open(targetUrl, '_blank');
            return;
          }
          setStatus(`⬇️ 正在下载更新包 v${ver}！下载完成后解压覆盖原插件文件夹，在扩展页面点刷新即可`);
        });
      } else {
        window.open(targetUrl, '_blank');
      }
    });
  }
  if (autoCheckUpdateEl) {
    autoCheckUpdateEl.addEventListener('change', () => {
      chrome.storage.local.set({ auto_check_github_update: autoCheckUpdateEl.checked });
      if (autoCheckUpdateEl.checked) checkForGithubUpdate(true);
    });
  }

  chrome.storage.local.get(['audio_effects_config', 'audio_effects_catalog_cache', 'auto_check_github_update', 'github_update_cache', 'dismissed_update_version'], (res) => {
    if (res && res.audio_effects_catalog_cache && res.audio_effects_catalog_cache.data) {
      const d = res.audio_effects_catalog_cache.data;
      mergeCatalogOptions(audioEffectEnvEl, d.environments, 'environment_id');
      mergeCatalogOptions(audioEffectFilterEl, d.filter_presets, 'filter_preset_id');
      mergeCatalogOptions(audioEffectNoiseEl, d.background_noises, 'background_noise_id');
    }
    if (res && res.audio_effects_config) {
      const cfg = res.audio_effects_config;
      if (audioEffectEnvEl && cfg.environment_id !== undefined) audioEffectEnvEl.value = cfg.environment_id;
      if (audioEffectFilterEl && cfg.filter_preset_id !== undefined) audioEffectFilterEl.value = cfg.filter_preset_id;
      if (audioEffectNoiseEl && cfg.background_noise_id !== undefined) audioEffectNoiseEl.value = cfg.background_noise_id;
      if (audioEffectSendLevelEl && cfg.send_level !== undefined) audioEffectSendLevelEl.value = String(cfg.send_level);
      if (audioEffectDistanceEl && cfg.distance !== undefined) audioEffectDistanceEl.value = String(cfg.distance);
      if ((cfg.filter_preset_id || cfg.background_noise_id) && moreAudioEffectsPanel) {
        moreAudioEffectsPanel.classList.remove('hidden');
      }
    }
    updateAudioEffectsUI();

    const autoCheck = res && res.auto_check_github_update !== undefined ? Boolean(res.auto_check_github_update) : true;
    if (autoCheckUpdateEl) autoCheckUpdateEl.checked = autoCheck;

    const hasRealExtensionRuntime = Boolean(typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getManifest === 'function');
    if (autoCheck && hasRealExtensionRuntime) {
      const cached = res && res.github_update_cache;
      const localVer = getLocalVersion();
      if (cached && cached.remoteVersion && (Date.now() - (cached.checkedAt || 0) < 1800000)) {
        const hasUpdate = compareVersions(cached.remoteVersion, localVer) > 0;
        if (hasUpdate && res.dismissed_update_version !== cached.remoteVersion) {
          renderGithubUpdateBanner({ ...cached, localVersion: localVer, hasUpdate: true });
        }
      } else {
        setTimeout(() => checkForGithubUpdate(false), 1200);
      }
    }
  });

  // ==========================================
  // 🏷️ 14. 批量开头标签与 🎭 智能自动添加标签 (Auto-add Tags v6.8)
  // ==========================================
  const prefixTagPresetSelect = document.getElementById('prefixTagPresetSelect');
  const prefixTagInput = document.getElementById('prefixTagInput');
  const prependTagAllBtn = document.getElementById('prependTagAllBtn');
  const removePrefixTagAllBtn = document.getElementById('removePrefixTagAllBtn');
  const autoPrependTagToggle = document.getElementById('autoPrependTagToggle');
  const autoTagStyleSelect = document.getElementById('autoTagStyleSelect');
  const autoAddTagsAllBtn = document.getElementById('autoAddTagsAllBtn');
  const clearAllTagsBtn = document.getElementById('clearAllTagsBtn');
  const undoTagBtn = document.getElementById('undoTagBtn');
  let tagUndoSnapshot = null;

  function normalizeBracketTag(rawTag) {
    const trimmed = String(rawTag || '').trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return trimmed;
    }
    const inner = trimmed.replace(/^\[+|\]+$/g, '').trim();
    return inner ? `[${inner}]` : '';
  }

  function savePrefixTagSettings() {
    chrome.storage.local.set({
      batch_tag_settings: {
        prefixTag: prefixTagInput ? prefixTagInput.value : '',
        presetValue: prefixTagPresetSelect ? prefixTagPresetSelect.value : '',
        autoPrepend: Boolean(autoPrependTagToggle && autoPrependTagToggle.checked),
        autoTagStyle: autoTagStyleSelect ? autoTagStyleSelect.value : 'auto'
      }
    });
  }

  function saveTagUndoSnapshot() {
    if (!ui.container) return;
    const cards = Array.from(ui.container.querySelectorAll('.card'));
    tagUndoSnapshot = cards.map(c => {
      const ta = c.querySelector('textarea');
      return ta ? ta.value : '';
    });
    if (undoTagBtn) undoTagBtn.classList.remove('hidden');
  }

  function restoreTagUndoSnapshot() {
    if (!Array.isArray(tagUndoSnapshot) || !ui.container) return;
    const cards = Array.from(ui.container.querySelectorAll('.card'));
    if (cards.length === tagUndoSnapshot.length) {
      cards.forEach((c, idx) => {
        const ta = c.querySelector('textarea');
        if (ta) {
          ta.value = tagUndoSnapshot[idx];
          c.previewCache = null;
          const cc = c.querySelector('.char-c');
          if (cc) cc.textContent = `${ta.value.length} 字`;
        }
      });
    } else {
      ui.container.innerHTML = '';
      tagUndoSnapshot.forEach(txt => addCard(txt, false));
      refreshIndexes();
    }
    tagUndoSnapshot = null;
    if (undoTagBtn) undoTagBtn.classList.add('hidden');
    saveCards();
    updateStats();
    setStatus('↩️ 已撤销上一次标签操作，恢复原本文案');
  }

  function prependTagToText(rawText, normalizedTag) {
    const text = String(rawText || '').trim();
    if (!text || !normalizedTag) return text;
    const leadingMatch = text.match(/^(\[[^\]]{1,300}\])\s*([\s\S]*)$/);
    if (leadingMatch) {
      const existingFirstTag = leadingMatch[1].trim();
      const restBody = leadingMatch[2].trim();
      if (existingFirstTag.toLowerCase() === normalizedTag.toLowerCase()) {
        return `${normalizedTag}\n${restBody}`.trim();
      }
      if (existingFirstTag.length >= 28 && normalizedTag.length >= 28) {
        return `${normalizedTag}\n${restBody}`.trim();
      }
    }
    return `${normalizedTag}\n${text}`;
  }

  function maybeAutoPrependTagToSegments(segs) {
    if (!Array.isArray(segs) || segs.length === 0) return segs;
    if (!autoPrependTagToggle || !autoPrependTagToggle.checked) return segs;
    const tag = normalizeBracketTag(prefixTagInput ? prefixTagInput.value : '');
    if (!tag) return segs;
    return segs.map(s => prependTagToText(s, tag));
  }

  const TAG_UNSUPPORTED_V2_MODELS = new Set([
    'eleven_multilingual_v2',
    'eleven_flash_v2_5',
    'eleven_flash_v2',
    'eleven_turbo_v2_5',
    'eleven_turbo_v2',
    'eleven_monolingual_v1',
    'eleven_multilingual_v1'
  ]);

  function textHasBracketAudioTag(text) {
    return /\[\s*[A-Za-z\u4e00-\u9fa5][^\]]{1,300}\]/.test(String(text || ''));
  }

  function ensureTagCompatibleModel(sampleText = '') {
    if (!ui.model) return false;
    const isSinging = /\[[^\]]*\b(sing|singing|gospel|melodic|vibrato|sustained notes)\b/i.test(String(sampleText || ''));
    let switched = false;
    if (TAG_UNSUPPORTED_V2_MODELS.has(ui.model.value)) {
      const targetModel = 'eleven_v3';
      if (!Array.from(ui.model.options || []).some(o => o.value === targetModel)) {
        const opt = document.createElement('option');
        opt.value = targetModel;
        opt.textContent = 'Eleven v3 (推荐·支持 [...] 情绪/唱歌标签)';
        ui.model.insertBefore(opt, ui.model.firstChild);
      }
      ui.model.value = targetModel;
      chrome.storage.local.set({ xi_model: targetModel });
      switched = true;
    }
    if (ui.model.value === 'eleven_v3' && isSinging && ui.v3Stab && ui.v3Stab.value !== '0') {
      ui.v3Stab.value = '0';
      chrome.storage.local.set({ xi_v3_stability: '0' });
    }
    if (switched) updateModelUI();
    return switched;
  }

  function applyPrefixTagToAllCards() {
    const rawInput = (prefixTagInput && prefixTagInput.value.trim()) || (prefixTagPresetSelect && prefixTagPresetSelect.value.trim()) || '';
    const normalizedTag = normalizeBracketTag(rawInput);
    if (!normalizedTag) {
      setStatus('⚠️ 请先在「🏷️ 开头标签」输入框中输入或选择要添加的标签', 'error');
      if (prefixTagInput) prefixTagInput.focus();
      return 0;
    }
    if (prefixTagInput && prefixTagInput.value.trim() !== normalizedTag) {
      prefixTagInput.value = normalizedTag;
    }
    savePrefixTagSettings();
    const autoSwitched = ensureTagCompatibleModel(normalizedTag);

    const cards = Array.from(ui.container ? ui.container.querySelectorAll('.card') : []);
    const validCards = cards.filter(c => {
      const ta = c.querySelector('textarea');
      return ta && ta.value.trim().length > 0;
    });
    if (validCards.length === 0) {
      if (cards.length > 0) {
        saveTagUndoSnapshot();
        const firstTa = cards[0].querySelector('textarea');
        if (firstTa) {
          firstTa.value = `${normalizedTag}\n`;
          cards[0].previewCache = null;
          saveCards();
          updateStats();
          setStatus(`🏷️ 已在空卡片开头填入标签${autoSwitched ? '（已自动切换为 Eleven v3 模型以支持标签）' : ''}`);
          return 1;
        }
      }
      setStatus('⚠️ 当前没有可添加标签的文案段落', 'error');
      return 0;
    }

    saveTagUndoSnapshot();
    let updatedCount = 0;
    validCards.forEach(c => {
      const ta = c.querySelector('textarea');
      const nextVal = prependTagToText(ta.value, normalizedTag);
      if (nextVal !== ta.value) {
        ta.value = nextVal;
        c.previewCache = null;
        updatedCount++;
      }
    });

    saveCards();
    updateStats();
    const shortTag = normalizedTag.length > 42 ? `${normalizedTag.slice(0, 42)}...]` : normalizedTag;
    setStatus(`🏷️ 已批量在 ${validCards.length} 段文案开头应用标签：${shortTag}${autoSwitched ? '（已自动切换至 Eleven v3 模型）' : ''}`);
    return updatedCount;
  }

  function removePrefixTagFromAllCards() {
    const cards = Array.from(ui.container ? ui.container.querySelectorAll('.card') : []);
    let changed = 0;
    const hasLeading = cards.some(c => {
      const ta = c.querySelector('textarea');
      return ta && /^\s*\[[^\]]{1,300}\]\s*/.test(ta.value);
    });
    if (!hasLeading) {
      setStatus('当前没有文案包含开头 [...] 标签');
      return 0;
    }
    saveTagUndoSnapshot();
    cards.forEach(c => {
      const ta = c.querySelector('textarea');
      if (!ta) return;
      const cleaned = ta.value.replace(/^(?:\s*\[[^\]]{1,300}\]\s*)+/, '').trim();
      if (cleaned !== ta.value.trim()) {
        ta.value = cleaned;
        c.previewCache = null;
        changed++;
      }
    });
    saveCards();
    updateStats();
    setStatus(`🧹 已从 ${changed} 段文案开头移除 [...] 标签`);
    return changed;
  }

  function inferSentenceTag(sentence, idx, total, styleMode, isPrayerContext) {
    const s = sentence.trim();
    if (!s || /^\[[^\]]{1,300}\]/.test(s)) return '';

    if (styleMode === 'singing') {
      if (idx === 0) return '[Sing everything in a powerful, raspy, soulful female Gospel style with emotional vibrato and sustained notes. No speaking, singing only.]';
      if (/\b(amen|hallelujah|praise|glory)\b|阿门|哈利路亚/i.test(s)) return '[sustained notes, emotional vibrato]';
      if (idx === total - 1 && total > 1) return '[slows down, soulful sustained finish]';
      if (idx % 2 === 1) return '[emotional vibrato]';
      return '';
    }

    if (styleMode === 'prayer' || (styleMode === 'auto' && isPrayerContext)) {
      if (idx === 0) return '[reverent, warm and heartfelt]';
      if (/\b(forgive|mercy|temptation|deliver us|evil|pain|sorrow|sin|tears)\b|赦免|怜悯|救我们|脱离凶恶|痛苦|软弱|眼泪/i.test(s)) {
        return '[softly, pleading with deep emotion]';
      }
      if (/\b(bless|love|trust|family|loved ones|grace|peace|heal|miracle)\b|祝福|赐福|平安|医治|家人|所爱的人|恩典/i.test(s)) {
        return '[warmly, tender and comforting]';
      }
      if (/\b(put amen|share this|type amen|declare|believe)\b|打上阿门|分享这段|相信神/i.test(s)) {
        return '[uplifting, inspiring and encouraging]';
      }
      if (/^(put amen|amen|hallelujah)[.!?\s]*$/i.test(s) || /^(阿门|哈利路亚)[。！？!.\s]*$/.test(s)) {
        return '[short pause] [reverent, resolute]';
      }
      if (idx === total - 1 && total > 2) return '[slows down, reverent]';
      return '';
    }

    if (styleMode === 'energetic') {
      if (idx === 0) return '[excited, energetic and confident]';
      if (/[!！]$/.test(s)) return '[passionate, emphatic]';
      if (/[?？]$/.test(s)) return '[curious, engaging tone]';
      if (idx === total - 1 && total > 1) return '[uplifting, strong finish]';
      return '';
    }

    if (styleMode === 'gentle') {
      if (idx === 0) return '[softly, calm and soothing]';
      if (/\b(sigh|miss|night|quiet|dream|heart|alone)\b|夜|安静|心|想念|温柔|轻声|梦/i.test(s)) return '[sighs softly, tender]';
      if (idx === total - 1 && total > 1) return '[whispers, gentle fade]';
      return '';
    }

    if (styleMode === 'story') {
      if (idx === 0) return '[warm, expressive storytelling tone]';
      if (/\b(suddenly|however|but then|in that moment|nevertheless)\b|突然|然而|就在这时|没想到|刹那间/i.test(s)) return '[short pause] [dramatic, tense]';
      if (/[!！]$/.test(s)) return '[emotional, expressive]';
      if (/[?？]$/.test(s)) return '[thoughtful, questioning]';
      if (idx === total - 1 && total > 2) return '[slows down, reflective]';
      return '';
    }

    // auto 模式通用语义识别
    if (/\b(whisper|secret|quietly|hush)\b|悄悄|耳语|低声|秘密/i.test(s)) return '[whispers]';
    if (/\b(laugh|haha|funny|joy|smile)\b|哈哈|笑|喜悦|开心/i.test(s)) return '[chuckles WARMLY]';
    if (/\b(sad|cry|tears|heartbroken|grief|pain)\b|哭|泪|心碎|悲伤|难过/i.test(s)) return '[sighs softly, sorrowful]';
    if (/\b(suddenly|however|but|wait|listen)\b|突然|但是|然而|等等|听我说/i.test(s) && idx > 0) return '[short pause]';
    if (/[!！]$/.test(s)) return '[excited, expressive]';
    if (/[?？]$/.test(s)) return '[curious, expressive]';
    if (idx === 0) return '[warm, expressive]';
    if (idx === total - 1 && total > 2) return '[slows down, warm finish]';
    return '';
  }

  function autoAddTagsToText(rawText, styleMode = 'auto') {
    const text = String(rawText || '').trim();
    if (!text) return '';

    let leadingGlobalTags = '';
    let body = text;
    const globalMatch = text.match(/^(?:\[[^\]]{1,300}\]\s*)+/);
    if (globalMatch) {
      leadingGlobalTags = globalMatch[0].trim();
      body = text.slice(globalMatch[0].length).trim();
    }
    if (!body) return leadingGlobalTags;

    const cleanBody = body.replace(/\[[^\]]{1,80}\]\s*/g, '').replace(/\s{2,}/g, ' ').trim();
    const isPrayerContext = /\b(our father|heaven|hallowed|thy kingdom|trespasses|amen|lord|god|jesus|pray|prayer|bless|holy|spirit|gospel|faith)\b|天父|祷告|祈祷|阿门|主啊|上帝|耶稣|赐福|圣灵|福音|恩典/i.test(cleanBody);

    const sentences = cleanBody.match(/[^。！？!?；;\r\n]+(?:[。！？!?；;]+|\r?\n|$)/g) || [cleanBody];
    const finalParts = [];
    for (const chunk of sentences) {
      const subParts = chunk.split(/(?<=[.!?])\s+(?=[A-Z"'\u4e00-\u9fff])/);
      for (const sp of subParts) {
        if (sp && sp.trim()) finalParts.push(sp.trim());
      }
    }

    if (finalParts.length === 0) return text;

    let taggedCount = 0;
    const maxTags = Math.max(2, Math.min(6, Math.ceil(finalParts.length * 0.65)));
    const resultSentences = finalParts.map((sent, idx) => {
      if (taggedCount >= maxTags && idx !== finalParts.length - 1) return sent;
      const tag = inferSentenceTag(sent, idx, finalParts.length, styleMode, isPrayerContext);
      if (tag) {
        taggedCount++;
        return `${tag} ${sent}`;
      }
      return sent;
    });

    const joinedBody = resultSentences.join(' ');
    if (leadingGlobalTags) {
      if (styleMode === 'singing' && joinedBody.startsWith('[Sing everything')) {
        return `${leadingGlobalTags}\n${joinedBody.replace(/^\[[^\]]+\]\s*/, '')}`;
      }
      return `${leadingGlobalTags}\n${joinedBody}`;
    }
    return joinedBody;
  }

  function autoTagSingleCard(card) {
    if (!card) return;
    const ta = card.querySelector('textarea');
    if (!ta || !ta.value.trim()) {
      setStatus('⚠️ 请先在卡片中输入文案后再自动加标签', 'error');
      return;
    }
    saveTagUndoSnapshot();
    const styleMode = autoTagStyleSelect ? autoTagStyleSelect.value : 'auto';
    ta.value = autoAddTagsToText(ta.value, styleMode);
    const autoSwitched = ensureTagCompatibleModel(ta.value);
    card.previewCache = null;
    saveCards();
    updateStats();
    setStatus(`🎭 已为当前段落智能添加表现力标签${autoSwitched ? '（已自动切换至 Eleven v3 模型）' : '（可点击「↩️ 撤销标签操作」还原）'}`);
  }

  function autoAddTagsToAllCards() {
    const cards = Array.from(ui.container ? ui.container.querySelectorAll('.card') : []);
    const validCards = cards.filter(c => {
      const ta = c.querySelector('textarea');
      return ta && ta.value.trim().length > 0;
    });
    if (validCards.length === 0) {
      setStatus('⚠️ 请先输入或粘贴文案后再使用「🎭 自动添加标签」', 'error');
      return 0;
    }

    saveTagUndoSnapshot();
    const styleMode = autoTagStyleSelect ? autoTagStyleSelect.value : 'auto';
    const userPrefixRaw = (prefixTagInput && prefixTagInput.value.trim()) ? normalizeBracketTag(prefixTagInput.value) : '';
    const autoPrependChecked = Boolean(autoPrependTagToggle && autoPrependTagToggle.checked && userPrefixRaw);

    let count = 0;
    let combinedSample = '';
    validCards.forEach(c => {
      const ta = c.querySelector('textarea');
      let nextText = ta.value;
      if (autoPrependChecked) {
        nextText = prependTagToText(nextText, userPrefixRaw);
      }
      nextText = autoAddTagsToText(nextText, styleMode);
      combinedSample += '\n' + nextText;
      if (nextText !== ta.value) {
        ta.value = nextText;
        c.previewCache = null;
        count++;
      }
    });

    const autoSwitched = ensureTagCompatibleModel(combinedSample);
    savePrefixTagSettings();
    saveCards();
    updateStats();
    setStatus(`🎭 已为 ${validCards.length} 段文案智能添加表现力标签${autoSwitched ? '（已自动切换至 Eleven v3 模型以生效 [...] 标签）' : ''}`);
    return count;
  }

  function clearAllTagsFromAllCards() {
    const cards = Array.from(ui.container ? ui.container.querySelectorAll('.card') : []);
    const hasAnyTag = cards.some(c => {
      const ta = c.querySelector('textarea');
      return ta && /\[[^\]]{1,300}\]/.test(ta.value);
    });
    if (!hasAnyTag) {
      setStatus('当前文案中没有 [...] 标签');
      return 0;
    }
    saveTagUndoSnapshot();
    let changed = 0;
    cards.forEach(c => {
      const ta = c.querySelector('textarea');
      if (!ta) return;
      const cleaned = ta.value
        .replace(/\[[^\]]{1,300}\]\s*/g, '')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/^\s+|\s+$/g, '');
      if (cleaned !== ta.value.trim()) {
        ta.value = cleaned;
        c.previewCache = null;
        changed++;
      }
    });
    saveCards();
    updateStats();
    setStatus(`🧹 已清除 ${changed} 段文案中的全部 [...] 标签`);
    return changed;
  }

  if (prefixTagPresetSelect) {
    prefixTagPresetSelect.addEventListener('change', () => {
      if (prefixTagPresetSelect.value && prefixTagInput) {
        prefixTagInput.value = prefixTagPresetSelect.value;
      }
      savePrefixTagSettings();
    });
  }
  if (prefixTagInput) {
    prefixTagInput.addEventListener('input', savePrefixTagSettings);
    prefixTagInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyPrefixTagToAllCards();
      }
    });
  }
  if (autoPrependTagToggle) {
    autoPrependTagToggle.addEventListener('change', savePrefixTagSettings);
  }
  if (autoTagStyleSelect) {
    autoTagStyleSelect.addEventListener('change', savePrefixTagSettings);
  }
  if (prependTagAllBtn) {
    prependTagAllBtn.addEventListener('click', applyPrefixTagToAllCards);
  }
  if (removePrefixTagAllBtn) {
    removePrefixTagAllBtn.addEventListener('click', removePrefixTagFromAllCards);
  }
  if (autoAddTagsAllBtn) {
    autoAddTagsAllBtn.addEventListener('click', autoAddTagsToAllCards);
  }
  if (clearAllTagsBtn) {
    clearAllTagsBtn.addEventListener('click', clearAllTagsFromAllCards);
  }
  if (undoTagBtn) {
    undoTagBtn.addEventListener('click', restoreTagUndoSnapshot);
  }

  chrome.storage.local.get(['batch_tag_settings'], (res) => {
    if (res && res.batch_tag_settings) {
      const s = res.batch_tag_settings;
      if (prefixTagPresetSelect && s.presetValue !== undefined) prefixTagPresetSelect.value = s.presetValue;
      if (prefixTagInput && s.prefixTag !== undefined) prefixTagInput.value = s.prefixTag;
      if (autoPrependTagToggle && s.autoPrepend !== undefined) autoPrependTagToggle.checked = Boolean(s.autoPrepend);
      if (autoTagStyleSelect && s.autoTagStyle) autoTagStyleSelect.value = s.autoTagStyle;
    }
  });

  // ==========================================
  // 🔁 15. 跨 API 账号一键复制/同步音色（支持免费号 Voice Design 与付费号原声克隆 v6.9）
  // ==========================================
  const syncVoicesBtn = document.getElementById('syncVoicesBtn');
  const voiceSyncModal = document.getElementById('voiceSyncModal');
  const closeVoiceSyncBtn = document.getElementById('closeVoiceSyncBtn');
  const cancelVoiceSyncBtn = document.getElementById('cancelVoiceSyncBtn');
  const voiceSyncSummary = document.getElementById('voiceSyncSummary');
  const voiceSyncTargetName = document.getElementById('voiceSyncTargetName');
  const voiceSyncModeSelect = document.getElementById('voiceSyncModeSelect');
  const voiceSyncPromptInput = document.getElementById('voiceSyncPromptInput');
  const voiceSyncAutoReplaceSlot = document.getElementById('voiceSyncAutoReplaceSlot');
  const voiceSyncAccountList = document.getElementById('voiceSyncAccountList');
  const voiceSyncStatus = document.getElementById('voiceSyncStatus');
  const startVoiceSyncBtn = document.getElementById('startVoiceSyncBtn');
  let voiceSyncRunning = false;

  function setVoiceSyncStatus(msg, type = 'normal') {
    if (!voiceSyncStatus) return;
    voiceSyncStatus.textContent = msg;
    voiceSyncStatus.classList.remove('error', 'success');
    if (type === 'error') voiceSyncStatus.classList.add('error');
    if (type === 'success') voiceSyncStatus.classList.add('success');
  }

  function inferVoiceDesignPrompt(voiceName, sourceMeta = null) {
    const rawDesc = sourceMeta && typeof sourceMeta.description === 'string' ? sourceMeta.description.trim() : '';
    if (rawDesc.length >= 24) return rawDesc.slice(0, 900);

    const n = String(voiceName || '').toLowerCase();
    const labels = (sourceMeta && sourceMeta.labels) || {};
    const traits = [];

    if (/女孩|少女|girl|young female/.test(n) || (labels.gender === 'female' && labels.age === 'young')) {
      traits.push('a soulful, expressive young female voice');
    } else if (/女|female|woman|lady|sister|mother/.test(n) || labels.gender === 'female') {
      if (/40|中年|middle/.test(n) || labels.age === 'middle_aged') traits.push('a warm, gentle, soothing middle-aged female voice');
      else if (/老|奶奶|old/.test(n) || labels.age === 'old') traits.push('a wise, warm, comforting older female voice');
      else traits.push('a warm, clear, expressive female voice');
    } else if (/青年|小伙|少年|boy|young male/.test(n) || (labels.gender === 'male' && labels.age === 'young')) {
      traits.push('a warm, emotional, resonant young male voice');
    } else if (/老|爷爷|长者|old|elder|father/.test(n) || labels.age === 'old') {
      traits.push('a deep, wise, reverent older male voice');
    } else {
      traits.push('a deep, warm, resonant and expressive male voice');
    }

    if (/南部|south|southern|gospel|福音/.test(n)) {
      traits.push('from the American South with heartfelt Gospel warmth');
    } else if (/英国|英音|british/.test(n) || /british/i.test(labels.accent || '')) {
      traits.push('with a clear, natural British accent');
    } else {
      traits.push('with a clear, natural American accent');
    }

    if (/唱|歌|sing|vocal|melodic/.test(n)) {
      traits.push('featuring a powerful, emotional singing style, rich vibrato, sustained melodic notes, and soulful resonance');
    } else if (/祈祷|祷告|牧师|神父|prayer|sermon|reverent/.test(n)) {
      traits.push('with a reverent, comforting, spiritual prayer and storytelling delivery and gentle pacing');
    } else if (/温柔|治愈|gentle|soft|calm|哄睡|电台/.test(n)) {
      traits.push('with a soft, tender, soothing, and empathetic conversational tone');
    } else if (/深沉|磁性|deep|baritone|marcus|电影|解说/.test(n)) {
      traits.push('with rich baritone depth, crisp articulation, and authoritative narrative presence');
    } else {
      traits.push('with natural emotional depth, clear pronunciation, and engaging delivery');
    }

    return `A studio-quality recording of ${traits.join(', ')}.`;
  }

  function analyzeStdVoiceSyncTargets(targetName) {
    const cleanTargetKey = normalizeVoiceNameKey(targetName);
    const items = getAvailableKeysList();
    state.voiceCacheByKey = state.voiceCacheByKey || {};
    if (state.currentKey && Array.isArray(state.voiceList) && state.voiceList.length > 0) {
      state.voiceCacheByKey[state.currentKey] = state.voiceList;
    }

    const rows = items.map((item, idx) => {
      const voices = Array.isArray(state.voiceCacheByKey[item.key]) ? state.voiceCacheByKey[item.key] : [];
      const matched = cleanTargetKey
        ? voices.find(v => v && v.category !== 'premade' && normalizeVoiceNameKey(v.name) === cleanTargetKey)
          || voices.find(v => v && normalizeVoiceNameKey(v.name) === cleanTargetKey)
        : null;
      const customVoices = voices.filter(v => v && v.category && v.category !== 'premade');
      return {
        item,
        index: idx + 1,
        alias: item.alias || `账号 ${idx + 1}`,
        hasVoice: Boolean(matched),
        matchedVoice: matched || null,
        customVoices,
        libraryLoaded: Array.isArray(state.voiceCacheByKey[item.key])
      };
    });
    const hasCount = rows.filter(r => r.hasVoice).length;
    const missingCount = rows.length - hasCount;
    return { rows, total: rows.length, hasCount, missingCount };
  }

  function renderStdVoiceSyncAccountList(statusOverrides = new Map()) {
    if (!voiceSyncAccountList) return;
    const targetName = voiceSyncTargetName ? voiceSyncTargetName.value.trim() : '';
    const { rows, total, hasCount, missingCount } = analyzeStdVoiceSyncTargets(targetName);

    if (voiceSyncSummary) {
      voiceSyncSummary.textContent = targetName
        ? `目标音色「${targetName}」：共 ${total} 个 API 账号 · ✅ 已有同名音色 ${hasCount} 个 · ⏳ 待同步创建 ${missingCount} 个`
        : `当前共 ${total} 个 API 账号 · 请先输入或选择要统一同步的音色名称`;
    }
    if (startVoiceSyncBtn && !voiceSyncRunning) {
      startVoiceSyncBtn.textContent = missingCount > 0
        ? `🚀 一键同步到缺失此音色的 API 账号 (${missingCount})`
        : `✅ 全部账号均已拥有此音色 (可点击重新核验)`;
      startVoiceSyncBtn.disabled = total === 0 || !targetName;
    }

    voiceSyncAccountList.innerHTML = '';
    if (rows.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'voice-cleanup-group-title normal';
      empty.textContent = '⚠️ 尚未添加 API Key，请先在主界面或设置中添加 API Key。';
      voiceSyncAccountList.appendChild(empty);
      return;
    }

    rows.forEach((r) => {
      const row = document.createElement('div');
      row.className = 'voice-cleanup-item';
      const overrideText = statusOverrides.get(r.item.key);

      const left = document.createElement('div');
      left.className = 'voice-cleanup-left';

      const badge = document.createElement('span');
      if (overrideText) {
        badge.className = `voice-cleanup-badge ${overrideText.startsWith('✅') ? 'keep' : overrideText.startsWith('❌') ? 'dup' : 'cat'}`;
        badge.textContent = overrideText;
      } else if (r.hasVoice) {
        badge.className = 'voice-cleanup-badge keep';
        badge.textContent = `✅ 已有同名 (ID: ...${String(r.matchedVoice.voice_id || '').slice(-5)})`;
      } else {
        badge.className = 'voice-cleanup-badge dup';
        badge.textContent = r.libraryLoaded ? `⏳ 待同步 (已用槽位: ${r.customVoices.length})` : '⏳ 待检测并同步';
      }

      const nameSpan = document.createElement('span');
      nameSpan.className = 'voice-cleanup-name';
      nameSpan.textContent = `${r.alias} (••••${String(r.item.key || '').slice(-4)})`;

      left.appendChild(badge);
      left.appendChild(nameSpan);
      row.appendChild(left);
      voiceSyncAccountList.appendChild(row);
    });
  }

  async function openStdVoiceSyncModal() {
    if (!voiceSyncModal) return;
    const selectedId = (ui.customVoiceId && ui.customVoiceId.value.trim()) || (ui.voice && ui.voice.value) || '';
    const currentVoiceObj = (Array.isArray(state.voiceList) ? state.voiceList : []).find(v => v && v.voice_id === selectedId);
    if (voiceSyncTargetName) {
      if (currentVoiceObj && currentVoiceObj.name) {
        voiceSyncTargetName.value = String(currentVoiceObj.name).replace(/^★\s*/, '').trim();
      } else if (!voiceSyncTargetName.value.trim()) {
        voiceSyncTargetName.value = '美国南部小女孩深情唱歌';
      }
    }
    const currentName = voiceSyncTargetName ? voiceSyncTargetName.value.trim() : '';
    if (voiceSyncPromptInput) {
      voiceSyncPromptInput.value = inferVoiceDesignPrompt(currentName, currentVoiceObj);
    }
    renderStdVoiceSyncAccountList();
    voiceSyncModal.classList.remove('hidden');

    if (state.currentKey && selectedId && /^[A-Za-z0-9_-]{10,}$/.test(selectedId)) {
      try {
        const res = await fetch(`https://api.elevenlabs.io/v1/voices/${encodeURIComponent(selectedId)}`, {
          headers: { 'xi-api-key': state.currentKey }
        });
        if (res.ok) {
          const meta = await res.json();
          state.lastSyncedSourceVoiceMeta = { ...meta, sourceKey: state.currentKey };
          if (voiceSyncPromptInput && !voiceSyncPromptInput.dataset.userEdited) {
            voiceSyncPromptInput.value = inferVoiceDesignPrompt(currentName || meta.name, meta);
          }
        }
      } catch (_) {}
    }
  }

  function closeStdVoiceSyncModal() {
    if (voiceSyncRunning) return;
    if (voiceSyncModal) voiceSyncModal.classList.add('hidden');
  }

  async function createStdVoiceViaDesignApi(apiKey, voiceName, voicePrompt) {
    const cleanPrompt = String(voicePrompt || '').trim().length >= 20
      ? String(voicePrompt).trim().slice(0, 950)
      : inferVoiceDesignPrompt(voiceName);
    const previewSampleText = 'Hello, thank you for listening to my voice! I am speaking clearly and expressively so you can hear the natural warmth, emotional depth, and smooth rhythm of this voice across different sentences.';

    let generatedVoiceId = '';
    const designEndpoints = [
      'https://api.elevenlabs.io/v1/text-to-voice/design',
      'https://api.elevenlabs.io/v1/text-to-voice/create-previews'
    ];
    let lastPreviewErr = null;
    for (const ep of designEndpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ voice_description: cleanPrompt, text: previewSampleText })
        });
        if (res.ok) {
          const data = await res.json();
          const firstPreview = Array.isArray(data && data.previews) ? data.previews[0] : null;
          generatedVoiceId = (firstPreview && firstPreview.generated_voice_id) || (data && data.generated_voice_id) || '';
          if (generatedVoiceId) break;
        } else {
          lastPreviewErr = new Error(await readElevenError(res, '声音设计预览生成失败'));
          if (res.status === 401 || res.status === 403) break;
        }
      } catch (e) {
        lastPreviewErr = e;
      }
    }
    if (!generatedVoiceId) throw lastPreviewErr || new Error('未能从 Voice Design 接口获取到 generated_voice_id');

    const createEndpoints = [
      'https://api.elevenlabs.io/v1/text-to-voice',
      'https://api.elevenlabs.io/v1/text-to-voice/create-voice-from-preview'
    ];
    let lastSaveErr = null;
    for (const ep of createEndpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voice_name: voiceName,
            voice_description: cleanPrompt,
            generated_voice_id: generatedVoiceId
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.voice_id) {
            return { voice_id: data.voice_id, name: voiceName, category: 'generated', is_owner: true, method: 'Voice Design (免费版兼容)' };
          }
        } else {
          lastSaveErr = new Error(await readElevenError(res, '保存设计的音色失败'));
          if (res.status !== 404 && res.status !== 405) break;
        }
      } catch (e) {
        lastSaveErr = e;
      }
    }
    throw lastSaveErr || new Error('保存音色失败');
  }

  async function executeStdVoiceSync() {
    if (voiceSyncRunning) return;
    const targetName = voiceSyncTargetName ? voiceSyncTargetName.value.trim() : '';
    if (!targetName) return setVoiceSyncStatus('⚠️ 请先填写要统一同步的目标音色名称', 'error');
    const voicePrompt = voiceSyncPromptInput ? voiceSyncPromptInput.value.trim() : '';
    if (voicePrompt.length < 20) return setVoiceSyncStatus('⚠️ 音色特征描述提示词至少需要 20 个字符', 'error');
    const mode = voiceSyncModeSelect ? voiceSyncModeSelect.value : 'auto';
    const autoReplaceSlot = Boolean(voiceSyncAutoReplaceSlot && voiceSyncAutoReplaceSlot.checked);

    const { rows } = analyzeStdVoiceSyncTargets(targetName);
    if (rows.length === 0) return setVoiceSyncStatus('⚠️ 请先添加至少一个 API Key', 'error');

    voiceSyncRunning = true;
    if (startVoiceSyncBtn) startVoiceSyncBtn.disabled = true;
    const statusMap = new Map();
    let syncedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    try {
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const key = r.item.key;
        if (!Array.isArray(state.voiceCacheByKey[key])) {
          statusMap.set(key, '🔍 检查声音库...');
          renderStdVoiceSyncAccountList(statusMap);
          try {
            const vRes = await fetch('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': key } });
            if (vRes.ok) {
              const vData = await vRes.json();
              state.voiceCacheByKey[key] = Array.isArray(vData.voices) ? vData.voices : [];
            }
          } catch (_) {}
        }

        const currentVoices = Array.isArray(state.voiceCacheByKey[key]) ? state.voiceCacheByKey[key] : [];
        const existingSame = currentVoices.find(v => v && normalizeVoiceNameKey(v.name) === normalizeVoiceNameKey(targetName));
        if (existingSame) {
          skippedCount++;
          statusMap.set(key, `✅ 已有同名 (ID: ...${String(existingSame.voice_id).slice(-5)})`);
          renderStdVoiceSyncAccountList(statusMap);
          continue;
        }

        statusMap.set(key, '⏳ 正在创建并同步音色...');
        renderStdVoiceSyncAccountList(statusMap);
        setVoiceSyncStatus(`⏳ 正在为 [${r.alias}] (${i + 1}/${rows.length}) 同步音色「${targetName}」...`);

        const runOneAttempt = async () => {
          const sourceMeta = state.lastSyncedSourceVoiceMeta;
          if (mode !== 'design' && sourceMeta && sourceMeta.sharing && sourceMeta.sharing.public_owner_id && (sourceMeta.sharing.original_voice_id || sourceMeta.voice_id)) {
            const pubOwner = sourceMeta.sharing.public_owner_id;
            const origId = sourceMeta.sharing.original_voice_id || sourceMeta.voice_id;
            const addRes = await fetch(`https://api.elevenlabs.io/v1/voices/add/${encodeURIComponent(pubOwner)}/${encodeURIComponent(origId)}`, {
              method: 'POST',
              headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
              body: JSON.stringify({ new_name: targetName })
            });
            if (addRes.ok) {
              const addData = await addRes.json();
              if (addData && addData.voice_id) {
                return { voice_id: addData.voice_id, name: targetName, category: 'professional', method: '共享库添加' };
              }
            }
          }
          if ((mode === 'clone' || mode === 'auto') && sourceMeta && sourceMeta.preview_url) {
            try {
              const pRes = await fetch(sourceMeta.preview_url);
              if (pRes.ok) {
                const blob = await pRes.blob();
                const fd = new FormData();
                fd.append('name', targetName);
                fd.append('description', voicePrompt.slice(0, 500));
                fd.append('files', blob, 'voice_sample.mp3');
                const ivcRes = await fetch('https://api.elevenlabs.io/v1/voices/add', {
                  method: 'POST',
                  headers: { 'xi-api-key': key },
                  body: fd
                });
                if (ivcRes.ok) {
                  const ivcData = await ivcRes.json();
                  if (ivcData && ivcData.voice_id) {
                    return { voice_id: ivcData.voice_id, name: targetName, category: 'cloned', method: '原声样本克隆' };
                  }
                } else if (mode === 'clone') {
                  throw new Error(await readElevenError(ivcRes, '原声克隆失败'));
                }
              }
            } catch (e) {
              if (mode === 'clone') throw e;
            }
          }
          return await createStdVoiceViaDesignApi(key, targetName, voicePrompt);
        };

        try {
          let created;
          try {
            created = await runOneAttempt();
          } catch (firstErr) {
            if (autoReplaceSlot) {
              const removable = currentVoices.find(v => v && v.voice_id && v.category !== 'premade' && normalizeVoiceNameKey(v.name) !== normalizeVoiceNameKey(targetName));
              if (removable) {
                await fetch(`https://api.elevenlabs.io/v1/voices/${encodeURIComponent(removable.voice_id)}`, {
                  method: 'DELETE',
                  headers: { 'xi-api-key': key }
                }).catch(() => {});
                created = await runOneAttempt();
              } else {
                throw firstErr;
              }
            } else {
              throw firstErr;
            }
          }
          const updatedList = [
            ...currentVoices.filter(v => v && normalizeVoiceNameKey(v.name) !== normalizeVoiceNameKey(targetName)),
            { voice_id: created.voice_id, name: targetName, category: created.category || 'generated' }
          ];
          state.voiceCacheByKey[key] = updatedList;
          if (key === state.currentKey) {
            state.voiceList = updatedList;
            state.lastSelectedVoiceName = targetName;
            renderVoiceSelectOptions(created.voice_id);
          }
          syncedCount++;
          statusMap.set(key, `✅ 同步成功 (${created.method} · ...${String(created.voice_id).slice(-5)})`);
        } catch (err) {
          failedCount++;
          statusMap.set(key, `❌ 失败: ${String(err && err.message || '同步失败').slice(0, 38)}`);
        }
        renderStdVoiceSyncAccountList(statusMap);
      }

      state.lastSelectedVoiceName = targetName;
      renderVoiceSelectOptions();
      const summaryMsg = `🎉 音色「${targetName}」同步完成：新增同步 ${syncedCount} 个账号，已有跳过 ${skippedCount} 个${failedCount > 0 ? `，失败 ${failedCount} 个` : ''}！`;
      setVoiceSyncStatus(summaryMsg, failedCount > 0 && syncedCount === 0 ? 'error' : 'success');
      setStatus(summaryMsg);
    } finally {
      voiceSyncRunning = false;
      renderStdVoiceSyncAccountList(statusMap);
    }
  }

  if (syncVoicesBtn) syncVoicesBtn.addEventListener('click', openStdVoiceSyncModal);
  if (closeVoiceSyncBtn) closeVoiceSyncBtn.addEventListener('click', closeStdVoiceSyncModal);
  if (cancelVoiceSyncBtn) cancelVoiceSyncBtn.addEventListener('click', closeStdVoiceSyncModal);
  if (voiceSyncModal) {
    voiceSyncModal.addEventListener('click', (e) => {
      if (e.target === voiceSyncModal) closeStdVoiceSyncModal();
    });
    voiceSyncModal.querySelectorAll('.voice-sync-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (voiceSyncTargetName && chip.dataset.name) voiceSyncTargetName.value = chip.dataset.name;
        if (voiceSyncPromptInput && chip.dataset.prompt) {
          voiceSyncPromptInput.value = chip.dataset.prompt;
          voiceSyncPromptInput.dataset.userEdited = 'true';
        }
        renderStdVoiceSyncAccountList();
      });
    });
  }
  if (voiceSyncTargetName) {
    voiceSyncTargetName.addEventListener('input', () => {
      if (voiceSyncPromptInput && !voiceSyncPromptInput.dataset.userEdited) {
        voiceSyncPromptInput.value = inferVoiceDesignPrompt(voiceSyncTargetName.value);
      }
      renderStdVoiceSyncAccountList();
    });
  }
  if (voiceSyncPromptInput) {
    voiceSyncPromptInput.addEventListener('input', () => {
      voiceSyncPromptInput.dataset.userEdited = 'true';
    });
  }
  if (startVoiceSyncBtn) {
    startVoiceSyncBtn.addEventListener('click', executeStdVoiceSync);
  }

});