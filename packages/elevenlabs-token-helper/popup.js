const API_BASE = 'https://api.us.elevenlabs.io';
const AUTH_LABEL = '网页 Token';

const DEFAULT_GENERATION_SETTINGS = {
  modelId: 'eleven_v4',
  stability: 50,
  similarity: 75,
  style: 0,
  v3Stability: '0.50'
};

const AI_TEXT_ENHANCER_PORT = {
  enabled: false,
  async enhance({ text, voiceSettings }) {
    return { text, voiceSettings };
  }
};

window.ELEVEN_BATCH_AI_PORT = AI_TEXT_ENHANCER_PORT;

let appState = {
  latestCapturedToken: '',
  lastCapturedTokenAt: null,
  isGenerating: false,
  generationController: null,
  activePreview: null,
  previewRunning: false,
  draftsRevision: 0,
  folderRevision: 0,
  downloadsByFolder: {},
  exportLink: null,
  exportLinkRevision: 0,
  quotaRemaining: 0,
  voicesList: [],
  hiddenVoiceIds: [],
  dedupeVoiceSelect: true,
  selectedVoiceCleanupIds: new Set(),
  generationSettings: { ...DEFAULT_GENERATION_SETTINGS }
};

const DOM = {
  listContainer: document.getElementById('listContainer'),
  addCardBtn: document.getElementById('addCardBtn'),
  clearAllBtn: document.getElementById('clearAllBtn'),
  splitLongBtn: document.getElementById('splitLongBtn'),
  generateBtn: document.getElementById('generateBtn'),
  stopBtn: document.getElementById('stopBtn'),
  totalCharsDisplay: document.getElementById('totalCharsDisplay'),
  totalDurationDisplay: document.getElementById('totalDurationDisplay'),
  costEstimate: document.getElementById('costEstimate'),
  status: document.getElementById('status'),
  currentAliasDisplay: document.getElementById('currentAliasDisplay'),
  userQuota: document.getElementById('userQuota'),
  statusDot: document.getElementById('statusDot'),
  voiceSelect: document.getElementById('voiceSelect'),
  refreshVoices: document.getElementById('refreshVoices'),
  cleanVoicesBtn: document.getElementById('cleanVoicesBtn'),
  voiceCleanupModal: document.getElementById('voiceCleanupModal'),
  closeVoiceCleanupBtn: document.getElementById('closeVoiceCleanupBtn'),
  cancelVoiceCleanupBtn: document.getElementById('cancelVoiceCleanupBtn'),
  voiceCleanupSummary: document.getElementById('voiceCleanupSummary'),
  voiceCleanupSearch: document.getElementById('voiceCleanupSearch'),
  selectDuplicateVoicesBtn: document.getElementById('selectDuplicateVoicesBtn'),
  clearVoiceSelectionBtn: document.getElementById('clearVoiceSelectionBtn'),
  restoreHiddenVoicesBtn: document.getElementById('restoreHiddenVoicesBtn'),
  dedupeVoiceSelectToggle: document.getElementById('dedupeVoiceSelectToggle'),
  voiceCleanupList: document.getElementById('voiceCleanupList'),
  voiceCleanupStatus: document.getElementById('voiceCleanupStatus'),
  confirmDeleteVoicesBtn: document.getElementById('confirmDeleteVoicesBtn'),
  modelSelect: document.getElementById('modelSelect'),
  v2Settings: document.getElementById('v2Settings'),
  v3Settings: document.getElementById('v3Settings'),
  stabilitySlider: document.getElementById('stabilitySlider'),
  similaritySlider: document.getElementById('similaritySlider'),
  styleSlider: document.getElementById('styleSlider'),
  stabilityValue: document.getElementById('stabilityValue'),
  similarityValue: document.getElementById('similarityValue'),
  styleValue: document.getElementById('styleValue'),
  v3StabilitySelect: document.getElementById('v3StabilitySelect'),
  autoSplit3Min: document.getElementById('autoSplit3Min'),
  autoDelete: document.getElementById('autoDelete'),
  quickFolderInput: document.getElementById('quickFolderInput'),
  openFolderBtn: document.getElementById('openFolderBtn'),
  exportFolderStatus: document.getElementById('exportFolderStatus'),
  themeToggle: document.getElementById('themeToggle'),
  otherToolsBtn: document.getElementById('otherToolsBtn'),
  sidebarOtherToolsBtn: document.getElementById('sidebarOtherToolsBtn'),
  otherToolsModal: document.getElementById('otherToolsModal'),
  closeOtherToolsBtn: document.getElementById('closeOtherToolsBtn'),
  otherToolsStatus: document.getElementById('otherToolsStatus'),
  otherToolsAudioPanel: document.getElementById('otherToolsAudioPanel'),
  otherToolsAudioMeta: document.getElementById('otherToolsAudioMeta'),
  otherToolsAudioPlayer: document.getElementById('otherToolsAudioPlayer'),
  otherToolsDownloadBtn: document.getElementById('otherToolsDownloadBtn'),
  otherToolsHistoryWrap: document.getElementById('otherToolsHistoryWrap'),
  otherToolsHistoryList: document.getElementById('otherToolsHistoryList'),
  sfxPrompt: document.getElementById('sfxPrompt'),
  sfxDurationMode: document.getElementById('sfxDurationMode'),
  sfxDuration: document.getElementById('sfxDuration'),
  sfxInfluence: document.getElementById('sfxInfluence'),
  valSfxInfluence: document.getElementById('valSfxInfluence'),
  sfxLoop: document.getElementById('sfxLoop'),
  sfxAutoDownload: document.getElementById('sfxAutoDownload'),
  sfxGenerateBtn: document.getElementById('sfxGenerateBtn'),
  musicPrompt: document.getElementById('musicPrompt'),
  musicDurationMode: document.getElementById('musicDurationMode'),
  musicDurationSec: document.getElementById('musicDurationSec'),
  musicModel: document.getElementById('musicModel'),
  musicInstrumental: document.getElementById('musicInstrumental'),
  musicAutoDownload: document.getElementById('musicAutoDownload'),
  musicGenerateBtn: document.getElementById('musicGenerateBtn'),
  stsAudioFile: document.getElementById('stsAudioFile'),
  stsCustomVoiceId: document.getElementById('stsCustomVoiceId'),
  stsModel: document.getElementById('stsModel'),
  stsRemoveNoise: document.getElementById('stsRemoveNoise'),
  stsAutoDownload: document.getElementById('stsAutoDownload'),
  stsGenerateBtn: document.getElementById('stsGenerateBtn'),
  isoAudioFile: document.getElementById('isoAudioFile'),
  isoAutoDownload: document.getElementById('isoAutoDownload'),
  isoGenerateBtn: document.getElementById('isoGenerateBtn'),
  sttAudioFile: document.getElementById('sttAudioFile'),
  sttModel: document.getElementById('sttModel'),
  sttTagEvents: document.getElementById('sttTagEvents'),
  sttDiarize: document.getElementById('sttDiarize'),
  sttGenerateBtn: document.getElementById('sttGenerateBtn'),
  sttOutputText: document.getElementById('sttOutputText'),
  sttCopyBtn: document.getElementById('sttCopyBtn'),
  sttDownloadTxtBtn: document.getElementById('sttDownloadTxtBtn'),
  sttSendToQueueBtn: document.getElementById('sttSendToQueueBtn')
};

if (DOM.autoSplit3Min && DOM.autoSplit3Min.checked === undefined) {
  DOM.autoSplit3Min.checked = true;
}

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initEventListeners();
  await loadGenerationSettings();
  await loadExportFolder();
  await loadDrafts();
  await loadAuthState();
});

function initTheme() {
  chrome.storage.local.get(['theme', 'autoSplit3Min'], (res) => {
    if (res && res.theme === 'light') document.documentElement.classList.add('light-theme');
    if (DOM.autoSplit3Min && res && res.autoSplit3Min !== undefined) {
      DOM.autoSplit3Min.checked = Boolean(res.autoSplit3Min);
    }
  });
}

function initEventListeners() {
  DOM.themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-theme');
    chrome.storage.local.set({ theme: isLight ? 'light' : 'dark' });
  });

  if (DOM.autoSplit3Min) {
    DOM.autoSplit3Min.addEventListener('change', () => {
      chrome.storage.local.set({ autoSplit3Min: Boolean(DOM.autoSplit3Min.checked) });
      updateStats();
    });
  }

  if (DOM.splitLongBtn) {
    DOM.splitLongBtn.addEventListener('click', () => {
      if (appState.isGenerating) return;
      const count = splitAllOverThreeMinutesCards();
      if (count > 0) showStatus(`✂️ 已将 ${count} 段超 3 分钟文案各智能拆分为 2 份`);
    });
  }

  DOM.openFolderBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openExportFolder();
  });
  DOM.quickFolderInput.addEventListener('input', saveExportFolder);
  DOM.quickFolderInput.addEventListener('change', saveExportFolder);

  DOM.addCardBtn.addEventListener('click', () => addEmptyCard());
  DOM.clearAllBtn.addEventListener('click', clearAllDrafts);

  DOM.listContainer.addEventListener('input', (e) => {
    if (e.target.tagName === 'TEXTAREA') updateStats();
  });

  document.addEventListener('paste', handleGlobalPaste);
  DOM.generateBtn.addEventListener('click', startBatchGeneration);
  DOM.stopBtn.addEventListener('click', () => {
    stopGeneration();
    showStatus('🛑 已手动终止批量生成');
  });

  DOM.refreshVoices.addEventListener('click', async () => {
    DOM.refreshVoices.disabled = true;
    showStatus('🔄 正在刷新当前账号...');
    await refreshActiveAccount();
    setTimeout(() => { DOM.refreshVoices.disabled = false; }, 1000);
  });

  DOM.modelSelect.addEventListener('change', () => {
    syncSettingsPanel();
    saveGenerationSettingsFromUI();
  });

  [DOM.stabilitySlider, DOM.similaritySlider, DOM.styleSlider, DOM.v3StabilitySelect].forEach((input) => {
    input.addEventListener('input', saveGenerationSettingsFromUI);
    input.addEventListener('change', saveGenerationSettingsFromUI);
  });
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;
    if (!changes.token && !changes.lastCapturedTokenAt) return;

    appState.latestCapturedToken = changes.token?.newValue || appState.latestCapturedToken || '';
    appState.lastCapturedTokenAt = changes.lastCapturedTokenAt?.newValue || Date.now();

    if (changes.token?.newValue) {
      showStatus('✅ 已自动识别网页 Token，正在同步账号信息');
      refreshActiveAccount();
    }
  });
  initOtherTools();
  initVoiceCleanup();
}

async function loadExportFolder() {
  const revision = appState.folderRevision;
  const data = await chrome.storage.local.get('exportSubFolder');
  if (revision !== appState.folderRevision) return;
  DOM.quickFolderInput.value = typeof data.exportSubFolder === 'string' ? data.exportSubFolder : '';
  updateExportFolderHint();
}

function saveExportFolder() {
  appState.folderRevision++;
  chrome.storage.local.set({ exportSubFolder: DOM.quickFolderInput.value });
  updateExportFolderHint();
}

function getExportSubFolder() {
  return DOM.quickFolderInput.value.trim().split(/[\\/]+/)
    .map(part => part.replace(/[:*?"<>|\u0000-\u001f\u007f]/g, '_').trim().replace(/[. ]+$/g, ''))
    .filter(Boolean)
    .map(part => /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i.test(part) ? `_${part}` : part)
    .join('/') || '批量导出';
}

function updateExportFolderHint() {
  const folder = `ElevenLabs_Pro/${getExportSubFolder()}`;
  DOM.quickFolderInput.title = `保存到浏览器下载目录下的 ${folder}`;
  DOM.openFolderBtn.title = `打开 ${folder}（定位到已下载的音频）`;
  refreshExportLink();
}

async function findExportDownload(subFolder) {
  const storageKey = `exportDownload:${subFolder}`;
  const saved = await chrome.storage.local.get(storageKey);
  const downloadId = appState.downloadsByFolder[subFolder] ?? saved[storageKey];
  if (Number.isInteger(downloadId)) {
    const [item] = await chrome.downloads.search({ id: downloadId });
    if (item && item.exists !== false && ['complete', 'in_progress'].includes(item.state)) return item;
  }
  const folder = `ElevenLabs_Pro/${subFolder}`;
  const escapedParts = folder.split('/').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const separator = '[\\\\/]';
  const filenameRegex = `${separator}${escapedParts.join(separator)}${separator}[^\\\\/]+$`;
  const [item] = await chrome.downloads.search({ filenameRegex, exists: true, state: 'complete', limit: 1, orderBy: ['-startTime'] });
  return item;
}

async function refreshExportLink() {
  const revision = ++appState.exportLinkRevision;
  const subFolder = getExportSubFolder();
  appState.exportLink = null;
  DOM.openFolderBtn.href = '#';
  try {
    const item = await findExportDownload(subFolder);
    if (revision !== appState.exportLinkRevision || subFolder !== getExportSubFolder()) return;
    if (item?.state === 'complete' && item.filename) {
      appState.exportLink = { subFolder, item };
      DOM.openFolderBtn.title = `打开下载位置：${item.filename.replace(/[\\/][^\\/]+$/, '')}`;
    }
  } catch (err) {
    DOM.openFolderBtn.title = `读取下载位置失败：${err.message}`;
  }
}

function showExportFolderStatus(message) {
  DOM.exportFolderStatus.textContent = message;
  showStatus(message);
}

async function openExportFolder() {
  const subFolder = getExportSubFolder();
  const folder = `ElevenLabs_Pro/${subFolder}`;
  showExportFolderStatus('📂 正在打开下载位置...');
  try {
    // 已加载的记录直接调用系统定位接口，保持点击即打开的行为。
    const cached = appState.exportLink;
    const item = cached?.subFolder === subFolder ? cached.item : await findExportDownload(subFolder);
    if (item?.state === 'in_progress') {
      showExportFolderStatus('⏳ 音频正在保存，下载完成后可打开所在文件夹。');
      return;
    }
    if (!item?.filename) {
      showExportFolderStatus(`📂 请先在 ${folder} 中生成音频。若文件已移动或下载记录已清除，无法定位。`);
      return;
    }
    // 在 Windows 文件资源管理器中打开所在文件夹并选中音频。
    chrome.downloads.show(item.id);
    showExportFolderStatus(`📂 已请求在文件资源管理器中打开：${item.filename.replace(/[\\/][^\\/]+$/, '')}`);
  } catch (err) {
    showExportFolderStatus(`❌ 打开保存位置失败：${err.message}`);
  }
}

function waitForDownload(downloadId, signal) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let pollTimer = null;
    let safetyTimer = null;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      chrome.downloads.onChanged.removeListener(onChanged);
      if (signal && typeof signal.removeEventListener === 'function') {
        signal.removeEventListener('abort', onAbort);
      }
      if (pollTimer && typeof clearInterval === 'function') clearInterval(pollTimer);
      if (safetyTimer && typeof clearTimeout === 'function') clearTimeout(safetyTimer);
      error ? reject(error) : resolve();
    };
    const onAbort = () => finish(signal?.reason || new Error('已取消下载等待'));
    if (signal && typeof signal.addEventListener === 'function') {
      if (signal.aborted) return onAbort();
      signal.addEventListener('abort', onAbort, { once: true });
    }
    const onChanged = (delta) => {
      if (delta.id !== downloadId) return;
      if (delta.state?.current === 'complete') finish();
      else if (delta.state?.current === 'interrupted' || delta.error) {
        finish(new Error(`音频下载失败：${delta.error?.current || '下载被中断'}`));
      }
    };
    chrome.downloads.onChanged.addListener(onChanged);
    // 小文件可能在注册监听之前就已完成，因此也核对一次当前状态。
    const checkDownloadState = (allowMissing) => {
      chrome.downloads.search({ id: downloadId }).then(([item]) => {
        if (!item) {
          if (!allowMissing) finish(new Error('找不到音频下载记录'));
        } else if (item.state === 'complete') {
          finish();
        } else if (item.state === 'interrupted') {
          finish(new Error(`音频下载失败：${item.error || '下载被中断'}`));
        }
      }, finish);
    };
    checkDownloadState(false);
    if (!settled && typeof setTimeout === 'function' && typeof setInterval === 'function') {
      pollTimer = setInterval(() => checkDownloadState(true), 600);
      safetyTimer = setTimeout(() => finish(), 12000);
    }
  });
}

async function downloadAudio(blob, filename, subFolder, signal) {
  const url = URL.createObjectURL(blob);
  try {
    let downloadId;
    try {
      downloadId = await chrome.downloads.download({ url, filename, saveAs: false });
    } catch (downloadErr) {
      const safeFallback = `ElevenLabs_Pro/${subFolder || '批量导出'}/audio_${Date.now()}.mp3`;
      downloadId = await chrome.downloads.download({ url: url, filename: safeFallback, saveAs: false });
    }
    appState.downloadsByFolder[subFolder] = downloadId;
    await chrome.storage.local.set({ [`exportDownload:${subFolder}`]: downloadId });
    await waitForDownload(downloadId, signal);
    await refreshExportLink();
  } finally {
    // download() 仅代表开始下载；必须等文件保存完成才能释放音频 URL。
    URL.revokeObjectURL(url);
  }
}

function stopGeneration() {
  stopActivePreview();
  appState.isGenerating = false;
  appState.generationController?.abort();
}

function clearAllDrafts() {
  stopGeneration();
  DOM.listContainer.replaceChildren();
  updateStats();
  showStatus('✅ 已清空所有文案和保存的草稿');
}

async function loadGenerationSettings() {
  const data = await chrome.storage.local.get('generationSettings');
  appState.generationSettings = {
    ...DEFAULT_GENERATION_SETTINGS,
    ...(data.generationSettings || {}),
    // 每次打开或刷新都以 V4 开始，其他声音参数继续保留。
    modelId: 'eleven_v4'
  };
  applyGenerationSettingsToUI();
}

function applyGenerationSettingsToUI() {
  const settings = appState.generationSettings;
  if ([...DOM.modelSelect.options].some(option => option.value === settings.modelId)) {
    DOM.modelSelect.value = settings.modelId;
  }
  DOM.stabilitySlider.value = settings.stability;
  DOM.similaritySlider.value = settings.similarity;
  DOM.styleSlider.value = settings.style;
  DOM.v3StabilitySelect.value = settings.v3Stability;
  updateSliderLabels();
  syncSettingsPanel();
}

function saveGenerationSettingsFromUI() {
  updateSliderLabels();
  syncSettingsPanel();
  appState.generationSettings = {
    modelId: DOM.modelSelect.value,
    stability: Number(DOM.stabilitySlider.value),
    similarity: Number(DOM.similaritySlider.value),
    style: Number(DOM.styleSlider.value),
    v3Stability: DOM.v3StabilitySelect.value
  };
  chrome.storage.local.set({ generationSettings: appState.generationSettings });
}

function updateSliderLabels() {
  DOM.stabilityValue.textContent = toVoiceSettingValue(DOM.stabilitySlider.value).toFixed(2);
  DOM.similarityValue.textContent = toVoiceSettingValue(DOM.similaritySlider.value).toFixed(2);
  DOM.styleValue.textContent = toVoiceSettingValue(DOM.styleSlider.value).toFixed(2);
}

function syncSettingsPanel() {
  const isV3 = DOM.modelSelect.value === 'eleven_v3';
  const isV4 = DOM.modelSelect.value === 'eleven_v4';
  DOM.v2Settings.classList.toggle('hidden', isV3);
  DOM.v3Settings.classList.toggle('hidden', !isV3);
  DOM.styleSlider.closest('.slider-row').classList.toggle('hidden', isV4);
}

async function loadAuthState() {
  const data = await chrome.storage.local.get([
    'token',
    'lastCapturedTokenAt'
  ]);

  appState.latestCapturedToken = data.token || '';
  appState.lastCapturedTokenAt = data.lastCapturedTokenAt || null;
  await refreshActiveAccount();
}

function normalizeSecret(secret) {
  const trimmed = String(secret || '').trim();
  return trimmed.replace(/^Bearer\s+/i, '').trim();
}

function getActiveAuth() {
  if (!appState.latestCapturedToken) return null;

  return {
    mode: 'token',
    name: '自动识别 Token',
    secret: normalizeSecret(appState.latestCapturedToken),
    temporary: false
  };
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${mm}-${dd} ${hh}:${min}`;
}

async function refreshActiveAccount() {
  const auth = getActiveAuth();
  if (!auth) {
    appState.quotaRemaining = 0;
    DOM.currentAliasDisplay.textContent = '等待自动识别 Token';
    DOM.currentAliasDisplay.style.color = '#ef4444';
    DOM.statusDot.style.background = '#ef4444';
    DOM.userQuota.textContent = '请打开 ElevenLabs 网页后自动识别';
    DOM.voiceSelect.innerHTML = '<option>等待账号...</option>';
    return;
  }

  DOM.currentAliasDisplay.textContent = `${AUTH_LABEL}: ${auth.name}${auth.temporary ? '（未保存）' : ''}`;
  DOM.currentAliasDisplay.style.color = '#10b981';
  DOM.statusDot.style.background = '#10b981';
  await fetchQuota(auth);
  await fetchVoices(auth);
}

async function fetchQuota(auth = getActiveAuth()) {
  if (!auth) return;
  DOM.userQuota.textContent = '🔄 获取额度中...';
  DOM.userQuota.style.color = 'var(--text-sub)';

  try {
    const res = await fetch(`${API_BASE}/v1/user?t=${Date.now()}`, {
      method: 'GET',
      headers: buildAuthHeaders(auth, { 'Cache-Control': 'no-cache' })
    });
    if (!res.ok) throw new Error(await readResponseError(res));

    const data = await res.json();
    const used = Number(data.subscription?.character_count || 0);
    const total = Number(data.subscription?.character_limit || 0);
    appState.quotaRemaining = Math.max(total - used, 0);

    DOM.userQuota.textContent = `额度: ${used} / ${total} (剩余 ${appState.quotaRemaining})`;
    DOM.userQuota.style.color = appState.quotaRemaining < 1000 ? '#ef4444' : 'var(--text-sub)';
  } catch (err) {
    appState.quotaRemaining = 0;
    DOM.userQuota.textContent = `❌ 额度获取失败: ${err.message}`;
    DOM.userQuota.style.color = '#ef4444';
  }
}

async function fetchVoices(auth = getActiveAuth()) {
  if (!auth) return;
  DOM.voiceSelect.innerHTML = '<option>加载声音列表中...</option>';

  try {
    const pref = await chrome.storage.local.get(['hiddenVoiceIds', 'dedupeVoiceSelect']);
    if (Array.isArray(pref?.hiddenVoiceIds)) appState.hiddenVoiceIds = pref.hiddenVoiceIds;
    if (pref?.dedupeVoiceSelect !== undefined) appState.dedupeVoiceSelect = Boolean(pref.dedupeVoiceSelect);
    if (DOM.dedupeVoiceSelectToggle) DOM.dedupeVoiceSelectToggle.checked = appState.dedupeVoiceSelect;

    const allVoices = [];
    let nextPageToken = '';
    for (let page = 0; page < 3; page++) {
      const pageUrl = nextPageToken
        ? `${API_BASE}/v2/voices?page_size=100&next_page_token=${encodeURIComponent(nextPageToken)}`
        : `${API_BASE}/v2/voices?page_size=100`;
      const res = await fetch(pageUrl, {
        headers: buildAuthHeaders(auth)
      });
      if (!res.ok) throw new Error(await readResponseError(res));

      const data = await res.json();
      if (data?.detail?.status === 'invalid_authorization_header') {
        throw new Error('凭据已过期或无效');
      }
      const batch = Array.isArray(data.voices) ? data.voices : [];
      allVoices.push(...batch);
      if (data.has_more && data.next_page_token) {
        nextPageToken = data.next_page_token;
      } else {
        break;
      }
    }

    if (allVoices.length === 0) throw new Error('没有读取到声音');
    appState.voicesList = allVoices;
    renderVoiceSelectOptions();
    showStatus('✅ 账号、余额与声音库已同步');
  } catch (err) {
    DOM.voiceSelect.innerHTML = '<option>声音获取失败</option>';
    showStatus(`❌ ${err.message}`);
  }
}

function normalizeVoiceNameKey(name) {
  return String(name || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function addSelectOption(selectEl, text, value) {
  if (!selectEl) return;
  if (typeof Option === 'function' && typeof selectEl.add === 'function') {
    selectEl.add(new Option(text, value));
  } else {
    const opt = document.createElement('option');
    opt.textContent = text;
    opt.value = value;
    if (typeof selectEl.appendChild === 'function') selectEl.appendChild(opt);
  }
}

function analyzeVoicesForCleanup() {
  const hiddenSet = new Set(Array.isArray(appState.hiddenVoiceIds) ? appState.hiddenVoiceIds : []);
  const visibleVoices = (Array.isArray(appState.voicesList) ? appState.voicesList : []).filter(v => v && v.voice_id && !hiddenSet.has(v.voice_id));
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

function renderVoiceSelectOptions() {
  if (!DOM.voiceSelect) return;
  const previousValue = DOM.voiceSelect.value;
  const { visibleVoices, duplicateExtraIds } = analyzeVoicesForCleanup();

  if (DOM.cleanVoicesBtn) {
    const dupCount = duplicateExtraIds.length;
    DOM.cleanVoicesBtn.textContent = dupCount > 0 ? `🧹 清理重名 (${dupCount})` : '🧹 清理声音';
    DOM.cleanVoicesBtn.classList.toggle('has-dups', dupCount > 0);
  }

  DOM.voiceSelect.innerHTML = '';
  if (typeof DOM.voiceSelect.replaceChildren === 'function') {
    DOM.voiceSelect.replaceChildren();
  }

  const seenNames = new Map();
  const addedVoiceIds = new Set();
  for (const v of visibleVoices) {
    const nameKey = normalizeVoiceNameKey(v.name);
    const count = (seenNames.get(nameKey) || 0) + 1;
    seenNames.set(nameKey, count);
    if (appState.dedupeVoiceSelect && count > 1) {
      continue;
    }
    const label = count > 1 ? `${v.name} (#${count} · ${String(v.voice_id).slice(-4)})` : v.name;
    addSelectOption(DOM.voiceSelect, label, v.voice_id);
    addedVoiceIds.add(v.voice_id);
  }

  if (previousValue && addedVoiceIds.has(previousValue)) {
    DOM.voiceSelect.value = previousValue;
  }
}

function buildAuthHeaders(auth, extraHeaders = {}) {
  const headers = { ...extraHeaders };
  headers.authorization = `Bearer ${normalizeSecret(auth.secret)}`;
  return headers;
}

async function readResponseError(response) {
  const text = await response.text();
  if (!text) return `HTTP ${response.status}`;
  try {
    const data = JSON.parse(text);
    return data.detail?.message || data.detail?.status || data.message || `HTTP ${response.status}`;
  } catch {
    return text.slice(0, 120);
  }
}

const SPLIT_REASON_LABELS = {
  paragraph: '段落换行处',
  transition: '转折句末处',
  sentence: '完整句末处',
  semicolon: '分号/停顿处',
  clause: '分句逗号处',
  space: '词语空格处',
  midpoint: '时长中点处'
};

function extractFirstSentence(text) {
  const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
  if (!normalized) return '';
  const firstLine = normalized.split('\n').map(line => line.trim()).find(Boolean) || '';
  if (!firstLine) return '';
  const tagPrefixMatch = firstLine.match(/^(?:\[[^\]\n]{1,40}\]\s*)+/);
  const prefix = tagPrefixMatch ? tagPrefixMatch[0] : '';
  const body = firstLine.slice(prefix.length).trim();
  if (!body) return firstLine.slice(0, 120);

  const sentenceMatch = body.match(/^[\s\S]*?(?:[。！？!?；;]+|\.{3,}|…+|\.(?!\d)(?=\s|$|["'”’）)\]}]))["'”’）)\]}]*\s*/);
  if (sentenceMatch && sentenceMatch[0].trim()) {
    return (prefix + sentenceMatch[0]).trim();
  }

  if (Array.from(body).length > 35) {
    const clauses = body.match(/[^，,、：:—\-]+[，,、：:—\-]?/g) || [body];
    let acc = '';
    for (const clause of clauses) {
      if (acc && Array.from(acc + clause).length > 45) break;
      acc += clause;
      if (Array.from(acc).length >= 12) break;
    }
    if (acc.trim()) return (prefix + acc).trim();
  }
  return (prefix + Array.from(body).slice(0, 80).join('')).trim();
}

function formatDuration(seconds) {
  const sec = Math.max(0, Math.round(Number(seconds) || 0));
  if (sec <= 0) return '0秒';
  if (sec < 60) return `约 ${sec}秒`;
  const mins = Math.floor(sec / 60);
  const rem = sec % 60;
  return rem > 0 ? `约 ${mins}分${rem}秒` : `约 ${mins}分钟`;
}

function estimateDuration(text, options = {}) {
  const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
  if (!normalized) {
    return { seconds: 0, rawSeconds: 0, speechSeconds: 0, pauseSeconds: 0, clauses: 0, shortClauses: 0, formatted: '0秒' };
  }
  const speedInput = Number(options && options.speed);
  const speed = Number.isFinite(speedInput) && speedInput > 0 ? Math.max(0.5, Math.min(2, speedInput)) : 1;

  let nonVerbalPause = 0;
  const withoutTags = normalized.replace(/\[([^\]\n]{1,40})\]/g, (_, tag) => {
    if (/pause|break|silence|sigh|breath|gasp|laugh|chuckle|sob|cry|yawn|cough|throat|停顿|叹气|笑|哭|呼吸/i.test(tag)) {
      nonVerbalPause += 0.55;
    }
    return ' ';
  });

  const cjkChars = (withoutTags.match(/[\u3400-\u9FFF\uF900-\uFAFF\u3040-\u30FF\uAC00-\uD7AF]/g) || []).length;
  const nonCjkText = withoutTags.replace(/[\u3400-\u9FFF\uF900-\uFAFF\u3040-\u30FF\uAC00-\uD7AF]/g, ' ');
  const englishWords = (nonCjkText.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).length;
  const numberTokens = (nonCjkText.match(/\d+(?:\.\d+)?/g) || []);
  let digitUnits = 0;
  for (const token of numberTokens) digitUnits += Math.min(8, token.replace(/\D/g, '').length);

  const majorPauses = (withoutTags.match(/[。！？!?]+|\.(?!\d)(?=\s|$)/g) || []).length;
  const mediumPauses = (withoutTags.match(/[；;：:]+/g) || []).length;
  const minorPauses = (withoutTags.match(/[，,、]+/g) || []).length;
  const dashEllipsisPauses = (withoutTags.match(/…+|\.{3,}|——|--+/g) || []).length;
  const lineBreaks = (withoutTags.match(/\n+/g) || []).length;

  const rawClauses = withoutTags
    .split(/(?:[。！？!?；;：:，,、\n]+|\.{3,}|…+|——|--+|\.(?!\d)(?=\s|$))+/)
    .map(part => part.trim())
    .filter(Boolean);

  let shortClauses = 0;
  let shortClauseOverhead = 0;
  for (const clause of rawClauses) {
    const cjk = (clause.match(/[\u3400-\u9FFF\uF900-\uFAFF\u3040-\u30FF\uAC00-\uD7AF]/g) || []).length;
    const words = (clause.replace(/[\u3400-\u9FFF\uF900-\uFAFF\u3040-\u30FF\uAC00-\uD7AF]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
    const units = cjk + words * 1.6;
    if (units > 0 && units <= 4) {
      shortClauses++;
      shortClauseOverhead += 0.24;
    } else if (units > 4 && units <= 8) {
      shortClauses++;
      shortClauseOverhead += 0.14;
    }
  }

  const baseSpeechSec = (cjkChars / 4.2) + (englishWords / 2.6) + (digitUnits * 0.28);
  const punctuationPauseSec =
    majorPauses * 0.58 +
    mediumPauses * 0.40 +
    minorPauses * 0.28 +
    dashEllipsisPauses * 0.48 +
    lineBreaks * 0.62 +
    nonVerbalPause;

  const speechSec = (baseSpeechSec + shortClauseOverhead) / speed;
  const pauseSec = (punctuationPauseSec + 0.18) / Math.pow(speed, 0.65);
  const totalRaw = speechSec + pauseSec;
  const seconds = Math.max(1, Math.round(totalRaw));

  return {
    seconds,
    rawSeconds: Number(totalRaw.toFixed(1)),
    speechSeconds: Number(speechSec.toFixed(1)),
    pauseSeconds: Number(pauseSec.toFixed(1)),
    clauses: rawClauses.length,
    shortClauses,
    formatted: formatDuration(seconds)
  };
}

function findQuoteDepthMap(text) {
  const depth = new Uint16Array(text.length + 1);
  const pairs = new Map([
    ['\u201c', '\u201d'], ['\u2018', '\u2019'], ['\u300c', '\u300d'], ['\u300e', '\u300f'],
    ['\uff08', '\uff09'], ['(', ')'], ['[', ']'], ['\u300a', '\u300b']
  ]);
  const closers = new Set(pairs.values());
  const stack = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (pairs.has(ch)) stack.push(pairs.get(ch));
    else if (closers.has(ch)) {
      const idx = stack.lastIndexOf(ch);
      if (idx !== -1) stack.splice(idx, 1);
    }
    depth[i + 1] = stack.length;
  }
  return depth;
}

function splitTextIntoTwo(text, options = {}) {
  const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
  const speedInput = Number(options && options.speed);
  const speed = Number.isFinite(speedInput) && speedInput > 0 ? Math.max(0.5, Math.min(2, speedInput)) : 1;
  const maxSeconds = Number(options && options.maxSeconds) > 0 ? Number(options.maxSeconds) : 180;
  const totalDuration = estimateDuration(normalized, { speed });
  if (!normalized || (totalDuration.clauses < 2 && !/\s/.test(normalized))) {
    return { split: false, parts: normalized ? [normalized] : [], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
  }

  const quoteDepth = findQuoteDepthMap(normalized);
  const transitionRe = /^(?:\[[^\]\n]{1,40}\]\s*)*(?:(?:第[一二三四五六七八九十百]+[部分点条步章节段]?|其[次二三四]|另外|此外|同时|与此同时|不仅如此|相反|然而|但是|不过|接下来|紧接着|再来看|下面我们|现在我们|最后|总之|总的来说|总而言之|综上所述|换句话说|一方面|另一方面|首先|其次|再者|所以|因此|那么|说完了|聊完了|讲完了)|(?:next|second|secondly|third|finally|moreover|furthermore|however|meanwhile|in addition|on the other hand|lastly)\b)/i;

  const boundaryRe = /(?:[。！？!?；;，,、：:.]+["'”’）)\]}》」』]*)?\n+|([。！？!?]+|[；;]+|\.{3,}|…+|——|--+|\.(?!\d)(?=\s|$|["'”’）)\]}》」』])|[，,、：:]+)(["'”’）)\]}》」』]*)/g;
  const rawCandidates = [];
  let match;
  while ((match = boundaryRe.exec(normalized)) !== null) {
    const fullMatch = match[0];
    const punct = match[1] || fullMatch;
    const splitPos = match.index + fullMatch.length;
    if (splitPos <= 0 || splitPos >= normalized.length) continue;

    let type = 'clause';
    let baseScore = 35;
    if (fullMatch.includes('\n')) {
      type = 'paragraph';
      baseScore = 100;
    } else if (/[。！？!?]/.test(punct) || punct === '.') {
      const rightPreview = normalized.slice(splitPos).trim();
      if (transitionRe.test(rightPreview)) {
        type = 'transition';
        baseScore = 95;
      } else {
        type = 'sentence';
        baseScore = 82;
      }
    } else if (/[；;]/.test(punct) || /…|\.{3,}|——|--/.test(punct)) {
      type = 'semicolon';
      baseScore = 65;
    }

    rawCandidates.push({
      pos: splitPos,
      type,
      baseScore,
      insideQuote: quoteDepth[splitPos] > 0
    });
  }

  if (rawCandidates.length === 0) {
    const spaceRe = /\s+/g;
    while ((match = spaceRe.exec(normalized)) !== null) {
      const splitPos = match.index + match[0].length;
      if (splitPos > 0 && splitPos < normalized.length) {
        rawCandidates.push({ pos: splitPos, type: 'space', baseScore: 20, insideQuote: quoteDepth[splitPos] > 0 });
      }
    }
  }

  if (rawCandidates.length === 0) {
    return { split: false, parts: [normalized], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
  }

  const totalLen = normalized.length;
  let windowCandidates = rawCandidates.filter(c => {
    const charRatio = c.pos / totalLen;
    return charRatio >= 0.20 && charRatio <= 0.80;
  });
  if (windowCandidates.length === 0) windowCandidates = rawCandidates;

  const highTierInCore = windowCandidates.filter(c => {
    const charRatio = c.pos / totalLen;
    return c.baseScore >= 65 && charRatio >= 0.28 && charRatio <= 0.72;
  });
  const poolToEvaluate = highTierInCore.length > 0 ? highTierInCore : windowCandidates;

  let best = null;
  const totalRaw = Math.max(0.1, totalDuration.rawSeconds);

  for (const cand of poolToEvaluate) {
    const leftText = normalized.slice(0, cand.pos).trim();
    const rightText = normalized.slice(cand.pos).trim();
    if (!leftText || !rightText) continue;

    const d1 = estimateDuration(leftText, { speed });
    const d2 = estimateDuration(rightText, { speed });
    if (d1.seconds <= 0 || d2.seconds <= 0) continue;

    const sumRaw = Math.max(0.1, d1.rawSeconds + d2.rawSeconds);
    const ratio = d1.rawSeconds / sumRaw;
    const distFromHalf = Math.abs(ratio - 0.5);

    let score = cand.baseScore - distFromHalf * 180;
    if (cand.insideQuote) score -= 50;
    if (ratio < 0.28 || ratio > 0.72) score -= 35;
    if (totalRaw <= maxSeconds * 1.95 && (d1.seconds > maxSeconds || d2.seconds > maxSeconds)) {
      score -= 45;
    }

    if (!best || score > best.score) {
      best = { score, part1: leftText, part2: rightText, type: cand.type, d1, d2 };
    }
  }

  if (!best) {
    return { split: false, parts: [normalized], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
  }

  return {
    split: true,
    parts: [best.part1, best.part2],
    boundaryType: best.type,
    reason: best.type,
    durations: [best.d1, best.d2],
    partDurations: [best.d1, best.d2],
    totalDuration
  };
}

function splitOverThreeMinutes(text, options = {}) {
  const maxSeconds = Number(options && options.maxSeconds) > 0 ? Number(options.maxSeconds) : 180;
  const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
  const totalDuration = estimateDuration(normalized, options);
  if (!normalized || totalDuration.seconds <= maxSeconds) {
    return { split: false, parts: normalized ? [normalized] : [], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
  }
  return splitTextIntoTwo(normalized, { ...options, maxSeconds });
}

function expandOverThreeMinutes(texts, options = {}) {
  const expanded = [];
  let splitCount = 0;
  for (const item of Array.isArray(texts) ? texts : []) {
    const text = String(item || '').trim();
    if (!text) continue;
    const result = splitOverThreeMinutes(text, options);
    if (result.split && result.parts.length === 2) {
      expanded.push(result.parts[0], result.parts[1]);
      splitCount++;
    } else {
      expanded.push(text);
    }
  }
  return { texts: expanded, splitCount };
}

function buildPreviewSignature(firstSentence) {
  if (!firstSentence) return '';
  return JSON.stringify({
    text: firstSentence,
    voiceId: DOM.voiceSelect.value,
    modelId: DOM.modelSelect.value,
    voiceSettings: getVoiceSettings()
  });
}

function stopActivePreview() {
  if (!appState.activePreview) return;
  const current = appState.activePreview;
  appState.activePreview = null;
  if (current.timer && typeof clearTimeout === 'function') clearTimeout(current.timer);
  if (current.audio) {
    current.audio.onended = null;
    current.audio.onerror = null;
    try { current.audio.pause(); } catch (e) {}
  }
  if (current.url) URL.revokeObjectURL(current.url);
  if (current.card && current.card.isConnected) {
    if (current.card.previewBtn) {
      current.card.previewBtn.classList.remove('playing');
      current.card.previewBtn.textContent = '🔊 试听首句';
    }
    updateCardMeta(current.card);
  }
}

async function playPreviewBlob(card, blob, firstSentence, fromCache = false) {
  stopActivePreview();
  const btn = card.previewBtn;
  const url = URL.createObjectURL(blob);
  const audio = typeof Audio === 'function' ? new Audio(url) : null;
  const session = { card, audio, url, timer: null };
  appState.activePreview = session;
  if (btn) {
    btn.disabled = false;
    btn.classList.add('playing');
    btn.textContent = '⏹️ 停止';
    btn.title = `正在试听第一句：${firstSentence}\n点击停止播放`;
  }
  showStatus(`🔊 正在试听首句 (${fromCache ? '缓存免扣费' : '网页 Token'})：${firstSentence}`);

  const finish = () => {
    if (appState.activePreview !== session) return;
    stopActivePreview();
    if (!appState.isGenerating) showStatus('✅ 试听完毕');
  };
  const scheduleFallbackFinish = () => {
    if (appState.activePreview !== session || session.timer || typeof setTimeout !== 'function') return;
    const fallbackMs = Math.min(2500, Math.max(600, estimateDuration(firstSentence).seconds * 350));
    session.timer = setTimeout(finish, fallbackMs);
  };
  if (audio) {
    audio.onended = finish;
    audio.onerror = scheduleFallbackFinish;
    try {
      await audio.play();
    } catch (err) {
      scheduleFallbackFinish();
    }
  } else {
    scheduleFallbackFinish();
  }
}

async function previewCardFirstSentence(card) {
  if (appState.activePreview && appState.activePreview.card === card) {
    stopActivePreview();
    showStatus('⏹️ 已停止试听');
    return;
  }
  if (appState.isGenerating || appState.previewRunning) return;
  stopActivePreview();
  const rawText = card.textarea ? card.textarea.value.trim() : '';
  const firstSentence = extractFirstSentence(rawText);
  if (!firstSentence) return showStatus('⚠️ 请先输入文案后再试听第一句');
  const auth = getActiveAuth();
  if (!auth) return alert('未检测到可用 Token，请先打开 ElevenLabs 网页并触发一次请求。');
  const voiceId = DOM.voiceSelect.value;
  if (!voiceId || voiceId.includes('失败') || voiceId.includes('等待')) {
    return showStatus('⚠️ 请先选择一个可用声音');
  }

  const signature = buildPreviewSignature(firstSentence);
  if (card.previewCache && card.previewCache.key === signature && card.previewCache.blob) {
    await playPreviewBlob(card, card.previewCache.blob, firstSentence, true);
    return;
  }

  appState.previewRunning = true;
  if (card.previewBtn) {
    card.previewBtn.disabled = true;
    card.previewBtn.textContent = '⏳ 合成中';
  }
  try {
    showStatus(`🎧 正在合成首句试听：${firstSentence}`);
    const prepared = await prepareGenerationItem(firstSentence, 0, {
      authMode: 'token',
      accountName: auth.name,
      modelId: DOM.modelSelect.value,
      voiceId
    });
    const response = await requestTtsStreamWithFallback({
      auth,
      voiceId,
      text: prepared.text,
      modelId: DOM.modelSelect.value || 'eleven_v4',
      voiceSettings: prepared.voiceSettings
    });
    const blob = await response.blob();
    appState.previewRunning = false;
    card.previewCache = { key: signature, blob, text: firstSentence };
    updateCardMeta(card);
    await playPreviewBlob(card, blob, firstSentence, false);
    fetchQuota(auth);
  } catch (err) {
    appState.previewRunning = false;
    if (card.previewBtn) {
      card.previewBtn.classList.remove('playing');
      card.previewBtn.textContent = '🔊 试听首句';
    }
    updateCardMeta(card);
    showStatus(`❌ 试听失败：${err.message}`);
  }
}

function updateCardMeta(card) {
  const raw = card.textarea ? card.textarea.value : '';
  if (card.charBadge) card.charBadge.textContent = `${raw.length} 字`;
  const est = estimateDuration(raw);
  const firstSentence = extractFirstSentence(raw);
  const splitInfo = est.seconds > 180 ? splitOverThreeMinutes(raw) : null;
  const canSplit = Boolean(splitInfo && splitInfo.split);

  if (card.durBadge) {
    card.durBadge.classList.toggle('over-limit', est.seconds > 180);
    card.durBadge.textContent = est.seconds > 180 ? `${est.formatted} · 超3分` : est.formatted;
    const splitHint = canSplit && splitInfo.partDurations
      ? `\n⚠️ 超过 3 分钟，建议在「${SPLIT_REASON_LABELS[splitInfo.reason] || '语义边界'}」拆分为 2 份（${splitInfo.partDurations[0].formatted} + ${splitInfo.partDurations[1].formatted}）`
      : '';
    card.durBadge.title = est.seconds > 0
      ? `预计时长：${est.formatted}（朗读 ${est.speechSeconds}秒 + 标点/短句停顿 ${est.pauseSeconds}秒 · 共 ${est.clauses} 个分句${est.shortClauses ? '，含 ' + est.shortClauses + ' 个短句' : ''}）${splitHint}${firstSentence ? '\n首句：' + firstSentence : ''}`
      : '输入文案后自动根据标点与短句智能估算时长';
  }
  if (card.splitBtn) {
    card.splitBtn.classList.toggle('hidden', !canSplit);
    card.splitBtn.disabled = appState.isGenerating || appState.previewRunning || !canSplit;
    if (canSplit && splitInfo.partDurations) {
      const reasonLabel = SPLIT_REASON_LABELS[splitInfo.reason] || '语义边界';
      card.splitBtn.title = `预计时长超过 3 分钟，点击在「${reasonLabel}」智能分为 2 段（${splitInfo.partDurations[0].formatted} + ${splitInfo.partDurations[1].formatted}）`;
    }
  }
  if (card.previewBtn && (!appState.activePreview || appState.activePreview.card !== card)) {
    const signature = buildPreviewSignature(firstSentence);
    const isCached = Boolean(firstSentence && card.previewCache && card.previewCache.key === signature);
    if (!appState.previewRunning) {
      card.previewBtn.textContent = '🔊 试听首句';
      card.previewBtn.classList.remove('playing');
    }
    card.previewBtn.disabled = appState.isGenerating || appState.previewRunning || !firstSentence;
    card.previewBtn.title = firstSentence
      ? `试听第一句：${firstSentence}${isCached ? '\n（已缓存，点击直接免扣费播放）' : ''}`
      : '请先输入文案后再试听第一句';
  }
  return { est, canSplit };
}

function insertCardAfter(targetCard, newCard) {
  if (typeof DOM.listContainer.insertBefore === 'function') {
    DOM.listContainer.insertBefore(newCard, targetCard.nextSibling);
    return;
  }
  const list = DOM.listContainer.children;
  const currentIdx = list.indexOf(newCard);
  if (currentIdx !== -1) list.splice(currentIdx, 1);
  const targetIdx = list.indexOf(targetCard);
  if (targetIdx !== -1) list.splice(targetIdx + 1, 0, newCard);
  else list.push(newCard);
}

function splitCardIntoTwo(card, persist = true) {
  if (!card || !card.isConnected || appState.isGenerating) return false;
  const raw = card.textarea ? card.textarea.value : '';
  const res = splitOverThreeMinutes(raw);
  if (!res.split || res.parts.length < 2) return false;
  if (appState.activePreview && appState.activePreview.card === card) stopActivePreview();
  card.textarea.value = res.parts[0];
  updateCardMeta(card);

  const secondCard = addEmptyCard(res.parts[1]);
  insertCardAfter(card, secondCard);
  if (persist) {
    updateStats();
    const d1 = res.partDurations[0] ? res.partDurations[0].formatted : '';
    const d2 = res.partDurations[1] ? res.partDurations[1].formatted : '';
    const reasonLabel = SPLIT_REASON_LABELS[res.reason] || '合适语义边界';
    showStatus(`✂️ 已在「${reasonLabel}」智能分为 2 段（${d1} + ${d2}）`);
  }
  return true;
}

function splitAllOverThreeMinutesCards() {
  if (appState.isGenerating) return 0;
  const cards = Array.from(DOM.listContainer.children || []);
  let splitCount = 0;
  for (const card of cards) {
    if (splitCardIntoTwo(card, false)) splitCount++;
  }
  if (splitCount > 0) updateStats();
  return splitCount;
}

function handleGlobalPaste(e) {
  const pasteText = (e.clipboardData || window.clipboardData).getData('text');
  if (!pasteText) return;
  const autoSplit = !DOM.autoSplit3Min || DOM.autoSplit3Min.checked !== false;
  const isMultiLine = pasteText.includes('\t') || pasteText.includes('\n');
  const singleOver3Min = !isMultiLine && autoSplit && splitOverThreeMinutes(pasteText).split;
  if (isMultiLine || singleOver3Min) {
    e.preventDefault();
    const rawSegments = isMultiLine
      ? pasteText.split(/\r?\n|\t/).map(s => s.trim()).filter(s => s.length > 0)
      : [pasteText.trim()];
    if (rawSegments.length === 0) return;
    const expanded = autoSplit ? expandOverThreeMinutes(rawSegments) : { texts: rawSegments, splitCount: 0 };
    const segments = expanded.texts;

    const textareas = DOM.listContainer.querySelectorAll('textarea');
    if (textareas.length === 1 && textareas[0].value.trim() === '') DOM.listContainer.replaceChildren();

    segments.forEach(text => addEmptyCard(text));
    updateStats();
    showStatus(expanded.splitCount > 0
      ? `✂️ 成功导入 ${segments.length} 条文案（自动将 ${expanded.splitCount} 段超 3 分钟文案各分为 2 份）`
      : `✅ 成功导入 ${segments.length} 条文案`);
  }
}

function addEmptyCard(text = '') {
  appState.draftsRevision++;
  const card = document.createElement('div');
  card.className = 'card-item';
  const textarea = document.createElement('textarea');
  textarea.placeholder = '输入文案... (支持直接从 Excel/Google Sheets 复制粘贴多行)';
  textarea.value = text;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '删除';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    if (appState.activePreview && appState.activePreview.card === card) stopActivePreview();
    card.remove();
    updateStats();
  };

  const metaBar = document.createElement('div');
  metaBar.className = 'card-meta-bar';
  const metaLeft = document.createElement('div');
  metaLeft.className = 'card-meta-left';
  const idxBadge = document.createElement('span');
  idxBadge.className = 'idx-tag';
  idxBadge.textContent = `#${(DOM.listContainer.children ? DOM.listContainer.children.length : 0) + 1}`;
  metaLeft.appendChild(idxBadge);

  const metaRight = document.createElement('div');
  metaRight.className = 'card-meta-right';
  const charBadge = document.createElement('span');
  charBadge.className = 'char-c';
  const durBadge = document.createElement('span');
  durBadge.className = 'dur-c';
  const splitBtn = document.createElement('button');
  splitBtn.type = 'button';
  splitBtn.className = 'card-tool-btn task-split hidden';
  splitBtn.textContent = '✂️ 分2段';
  splitBtn.addEventListener('click', () => splitCardIntoTwo(card, true));

  const previewBtn = document.createElement('button');
  previewBtn.type = 'button';
  previewBtn.className = 'card-tool-btn task-preview';
  previewBtn.textContent = '🔊 试听首句';
  previewBtn.addEventListener('click', () => previewCardFirstSentence(card));

  metaRight.appendChild(charBadge);
  metaRight.appendChild(durBadge);
  metaRight.appendChild(splitBtn);
  metaRight.appendChild(previewBtn);
  metaBar.appendChild(metaLeft);
  metaBar.appendChild(metaRight);

  card.textarea = textarea;
  card.idxBadge = idxBadge;
  card.charBadge = charBadge;
  card.durBadge = durBadge;
  card.splitBtn = splitBtn;
  card.previewBtn = previewBtn;

  card.appendChild(textarea);
  card.appendChild(deleteBtn);
  card.appendChild(metaBar);
  DOM.listContainer.appendChild(card);
  updateCardMeta(card);
  return card;
}

function updateStats() {
  appState.draftsRevision++;
  const textareas = Array.from(DOM.listContainer.querySelectorAll('textarea'));
  let totalChars = 0;
  let totalSeconds = 0;
  let totalClauses = 0;
  let totalShortClauses = 0;
  let overLimitCount = 0;
  const drafts = [];

  textareas.forEach((ta, index) => {
    const card = ta.parentElement;
    if (card && card.idxBadge) card.idxBadge.textContent = `#${index + 1}`;
    const meta = card && card.textarea ? updateCardMeta(card) : { est: estimateDuration(ta.value), canSplit: false };
    totalSeconds += meta.est.seconds;
    totalClauses += meta.est.clauses;
    totalShortClauses += meta.est.shortClauses;
    if (meta.canSplit) overLimitCount++;

    const text = ta.value.trim();
    totalChars += text.length;
    if (text) drafts.push(text);
  });

  if (DOM.splitLongBtn) {
    DOM.splitLongBtn.classList.toggle('hidden', overLimitCount === 0);
    DOM.splitLongBtn.disabled = appState.isGenerating || appState.previewRunning || overLimitCount === 0;
    DOM.splitLongBtn.textContent = overLimitCount > 0 ? `✂️ 超3分拆2段 (${overLimitCount})` : '✂️ 超3分拆2段';
  }

  DOM.totalCharsDisplay.textContent = `总字数: ${totalChars}`;
  if (DOM.totalDurationDisplay) {
    DOM.totalDurationDisplay.textContent = `预计时长: ${formatDuration(totalSeconds)}`;
    DOM.totalDurationDisplay.title = totalSeconds > 0
      ? `共 ${totalClauses} 个分句（含 ${totalShortClauses} 个短句）· 按标点停顿与短句节奏智能估算`
      : '输入文案后自动根据标点与短句智能估算总时长';
  }
  DOM.costEstimate.textContent = `(预计消耗: ${totalChars} 字符)`;

  if (appState.quotaRemaining > 0 && totalChars > appState.quotaRemaining) {
    DOM.totalCharsDisplay.style.color = '#ef4444';
    DOM.costEstimate.textContent += ' ⚠️ 额度可能不足!';
  } else {
    DOM.totalCharsDisplay.style.color = 'inherit';
  }

  chrome.storage.local.set({ savedDrafts: drafts });
}

async function loadDrafts() {
  const revision = appState.draftsRevision;
  const res = await chrome.storage.local.get('savedDrafts');
  // 清空或编辑发生后，迟到的读取结果不能把旧草稿恢复回来。
  if (revision !== appState.draftsRevision) return;
  DOM.listContainer.replaceChildren();
  const drafts = Array.isArray(res.savedDrafts) ? res.savedDrafts.filter(text => typeof text === 'string') : [];
  drafts.forEach(text => addEmptyCard(text));
  updateStats();
}

function normalizeV3Stability(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0.5;
  if (num <= 0.35) return 0;
  if (num >= 0.75) return 1;
  return 0.5;
}

function getVoiceSettings() {
  if (DOM.modelSelect.value === 'eleven_v3') {
    return { stability: normalizeV3Stability(DOM.v3StabilitySelect.value) };
  }

  const settings = {
    stability: toVoiceSettingValue(DOM.stabilitySlider.value),
    similarity_boost: toVoiceSettingValue(DOM.similaritySlider.value)
  };
  if (DOM.modelSelect.value !== 'eleven_v4') settings.style = toVoiceSettingValue(DOM.styleSlider.value);
  return settings;
}

function buildVoiceSettingsForModel(targetModelId, preferredSettings) {
  if (targetModelId === 'eleven_v3') {
    const raw = preferredSettings?.stability ?? DOM.v3StabilitySelect?.value ?? 0.5;
    return { stability: normalizeV3Stability(raw) };
  }
  const stability = preferredSettings?.stability !== undefined
    ? Number(preferredSettings.stability)
    : toVoiceSettingValue(DOM.stabilitySlider.value);
  const similarity_boost = preferredSettings?.similarity_boost !== undefined
    ? Number(preferredSettings.similarity_boost)
    : toVoiceSettingValue(DOM.similaritySlider.value);
  const settings = { stability, similarity_boost };
  if (targetModelId !== 'eleven_v4') {
    settings.style = preferredSettings?.style !== undefined
      ? Number(preferredSettings.style)
      : toVoiceSettingValue(DOM.styleSlider.value);
  }
  return settings;
}

async function requestTtsStreamWithFallback({ auth, voiceId, text, modelId, voiceSettings, signal }) {
  const primaryModel = appState.workingFallbackModelId || modelId || 'eleven_v4';
  const primarySettings = appState.workingFallbackModelId
    ? buildVoiceSettingsForModel(primaryModel, voiceSettings)
    : voiceSettings;

  const sendRequest = (targetModel, targetSettings) => {
    const fetchOptions = {
      method: 'POST',
      headers: buildAuthHeaders(auth, { 'content-type': 'application/json' }),
      body: JSON.stringify({
        text,
        model_id: targetModel,
        voice_settings: targetSettings
      })
    };
    if (signal) fetchOptions.signal = signal;
    return fetch(`${API_BASE}/v1/text-to-speech/${voiceId}/stream`, fetchOptions);
  };

  const firstResponse = await sendRequest(primaryModel, primarySettings);
  if (firstResponse.ok) return firstResponse;

  const firstError = await readResponseError(firstResponse);
  // 若是凭据失效或余额彻底耗尽，则直接报错，不作无谓重试
  if (firstResponse.status === 401 || /invalid_authorization|unauthorized|quota_exceeded|insufficient_credit/i.test(firstError)) {
    throw new Error(firstError);
  }

  const hasEmotionTag = /\[\s*[A-Za-z\u4e00-\u9fa5][^\]]{0,35}\]/.test(String(text || ''));
  const baseChain = hasEmotionTag
    ? ['eleven_v3', 'eleven_multilingual_v2', 'eleven_flash_v2_5', 'eleven_turbo_v2_5']
    : ['eleven_multilingual_v2', 'eleven_flash_v2_5', 'eleven_turbo_v2_5', 'eleven_v3'];
  const fallbackChain = baseChain.filter(candidate => candidate !== primaryModel);

  let lastError = firstError;
  for (const candidateModel of fallbackChain) {
    if (signal?.aborted) signal.throwIfAborted();
    const candidateSettings = buildVoiceSettingsForModel(candidateModel, voiceSettings);
    const retryResponse = await sendRequest(candidateModel, candidateSettings);
    if (retryResponse.ok) {
      appState.workingFallbackModelId = candidateModel;
      return retryResponse;
    }
    lastError = await readResponseError(retryResponse);
    if (retryResponse.status === 401 || /invalid_authorization|unauthorized|quota_exceeded|insufficient_credit/i.test(lastError)) {
      break;
    }
  }

  throw new Error(lastError || firstError);
}

function toVoiceSettingValue(value) {
  return Number(value) / 100;
}

async function prepareGenerationItem(text, index, context) {
  const voiceSettings = getVoiceSettings();
  if (!AI_TEXT_ENHANCER_PORT.enabled) return { text, voiceSettings };

  const enhanced = await AI_TEXT_ENHANCER_PORT.enhance({
    text,
    index,
    voiceSettings,
    ...context
  });

  return {
    text: enhanced?.text || text,
    voiceSettings: {
      ...voiceSettings,
      ...(enhanced?.voiceSettings || {})
    }
  };
}

function buildAudioFilename(text, index) {
  // 取第一行中的第一句话；没有句末标点时使用整行。
  const firstLine = text.trim().split(/\r?\n/)[0];
  const firstSentence = firstLine.match(/^.*?(?:[。！？!?]+|\.(?=\s|$)|$)/u)?.[0] || firstLine;
  const safeSentence = Array.from(firstSentence
    .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, '_')
    .replace(/\s+/g, ' ')
    .trim())
    .slice(0, 80)
    .join('')
    .replace(/[. ]+$/g, '') || '文案';
  return `${String(index).padStart(3, '0')}_${safeSentence}.mp3`;
}

async function startBatchGeneration() {
  if (appState.generationController) return;
  const auth = getActiveAuth();
  if (!auth) return alert('未检测到可用 Token，请先打开 ElevenLabs 网页并触发一次请求。');

  if (!DOM.autoSplit3Min || DOM.autoSplit3Min.checked !== false) {
    splitAllOverThreeMinutesCards();
  }

  const textareas = Array.from(DOM.listContainer.querySelectorAll('textarea'));
  const validCards = textareas.map(ta => ta.value.trim()).filter(t => t.length > 0);
  if (validCards.length === 0) return showStatus('⚠️ 没有需要生成的文案');

  const voiceId = DOM.voiceSelect.value;
  if (!voiceId || voiceId.includes('失败') || voiceId.includes('等待')) {
    return showStatus('⚠️ 请先选择一个可用声音');
  }

  stopActivePreview();
  appState.isGenerating = true;
  appState.workingFallbackModelId = null;
  const controller = new AbortController();
  appState.generationController = controller;
  DOM.generateBtn.classList.add('hidden');
  DOM.stopBtn.classList.remove('hidden');

  const modelId = DOM.modelSelect.value || 'eleven_v4';
  const subFolder = getExportSubFolder();
  saveExportFolder();
  const autoDelete = DOM.autoDelete.checked;
  const context = {
    authMode: 'token',
    accountName: auth.name,
    modelId,
    voiceId
  };

  for (let i = 0; i < validCards.length; i++) {
    if (!appState.isGenerating) {
      break;
    }

    const originalText = validCards[i];
    showStatus(`⏳ 正在生成: ${i + 1} / ${validCards.length} ...`);

    try {
      const prepared = await prepareGenerationItem(originalText, i, context);
      controller.signal.throwIfAborted();

      const response = await requestTtsStreamWithFallback({
        auth,
        voiceId,
        text: prepared.text,
        modelId,
        voiceSettings: prepared.voiceSettings,
        signal: controller.signal
      });

      const blob = await response.blob();
      controller.signal.throwIfAborted();
      const filename = `ElevenLabs_Pro/${subFolder}/${buildAudioFilename(originalText, i + 1)}`;
      await downloadAudio(blob, filename, subFolder, controller.signal);
      controller.signal.throwIfAborted();

      if (autoDelete) {
        const correspondingTextarea = textareas.find(ta => ta.isConnected && ta.value.trim() === originalText);
        if (correspondingTextarea) correspondingTextarea.parentElement.remove();
        updateStats();
      }

      await fetchQuota(auth);

      if (i < validCards.length - 1 && appState.isGenerating && typeof setTimeout === 'function') {
        showStatus(`✅ 已完成 ${i + 1} / ${validCards.length}，准备第 ${i + 2} 段...`);
        const randomDelay = Math.floor(Math.random() * 2000) + 2500;
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, randomDelay);
          if (controller.signal && typeof controller.signal.addEventListener === 'function') {
            controller.signal.addEventListener('abort', () => {
              if (typeof clearTimeout === 'function') clearTimeout(timer);
              resolve();
            }, { once: true });
          }
        });
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        const errorMsg = `❌ 第 ${i + 1} 段生成失败：${err.message}`;
        showStatus(errorMsg);
        alert(`第 ${i + 1} 段生成失败：${err.message}`);
      }
      appState.isGenerating = false;
      break;
    }
  }

  if (appState.isGenerating) showStatus('🎉 批量任务完成！文件已保存在你的下载目录中。');
  appState.isGenerating = false;
  appState.generationController = null;
  DOM.generateBtn.classList.remove('hidden');
  DOM.stopBtn.classList.add('hidden');
}

function showStatus(msg) {
  DOM.status.textContent = msg;
}

// ==========================================
// 其他工具工坊 (AI 音效 / 音乐 / 语音变声 / 人声提取 / 语音转文字)
// ==========================================
let currentToolAudio = null;
const toolHistory = [];
let toolTaskRunning = false;

function setToolStatus(msg, type = 'normal') {
  if (!DOM.otherToolsStatus) return;
  DOM.otherToolsStatus.textContent = msg;
  DOM.otherToolsStatus.className = 'other-tools-status';
  if (type === 'error') DOM.otherToolsStatus.classList.add('error');
  else if (type === 'success') DOM.otherToolsStatus.classList.add('success');
}

function openOtherToolsModal(defaultTab = '') {
  if (defaultTab) switchOtherToolTab(defaultTab);
  if (DOM.otherToolsModal) DOM.otherToolsModal.classList.remove('hidden');
}

function closeOtherToolsModal() {
  if (DOM.otherToolsAudioPlayer && typeof DOM.otherToolsAudioPlayer.pause === 'function') {
    try { DOM.otherToolsAudioPlayer.pause(); } catch (_) {}
  }
  if (DOM.otherToolsModal) DOM.otherToolsModal.classList.add('hidden');
}

function switchOtherToolTab(tabName) {
  if (!DOM.otherToolsModal || typeof DOM.otherToolsModal.querySelectorAll !== 'function') return;
  Array.from(DOM.otherToolsModal.querySelectorAll('.tool-tab-btn') || []).forEach(btn => {
    const active = btn.dataset && btn.dataset.tab === tabName;
    btn.classList.toggle('active', active);
    if (typeof btn.setAttribute === 'function') btn.setAttribute('aria-selected', String(active));
  });
  Array.from(DOM.otherToolsModal.querySelectorAll('.tool-pane') || []).forEach(pane => {
    const active = pane.dataset && pane.dataset.pane === tabName;
    pane.classList.toggle('active', active);
    pane.classList.toggle('hidden', !active);
  });
}

function sanitizeToolFilename(raw, fallback = 'audio') {
  const cleaned = String(raw || '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, '_')
    .replace(/\s+/g, '_')
    .slice(0, 32)
    .replace(/^_+|_+$/g, '');
  return cleaned || fallback;
}

async function saveToolAudioBlob(blob, subfolder, prefix, ext = 'mp3') {
  const baseSub = getExportSubFolder();
  const stamp = new Date().toISOString().slice(11, 19).replace(/:/g, '');
  const filename = `${prefix}_${stamp}.${ext}`;
  const fullPath = `ElevenLabs_Pro/${baseSub}/${subfolder}/${filename}`;
  await downloadAudio(blob, fullPath, baseSub);
  return { finalPath: fullPath };
}

function showToolAudioResult({ blob, title, subfolder, prefix, ext = 'mp3', accountName }) {
  const url = URL.createObjectURL(blob);
  const item = { blob, url, title, subfolder, prefix, ext, accountName, time: new Date().toLocaleTimeString() };
  currentToolAudio = item;
  toolHistory.unshift(item);
  if (toolHistory.length > 10) {
    const popped = toolHistory.pop();
    if (popped && popped.url && popped !== currentToolAudio) {
      try { URL.revokeObjectURL(popped.url); } catch (_) {}
    }
  }

  if (DOM.otherToolsAudioPanel) DOM.otherToolsAudioPanel.classList.remove('hidden');
  if (DOM.otherToolsAudioMeta) DOM.otherToolsAudioMeta.textContent = `${title} · 账号: ${accountName}`;
  if (DOM.otherToolsAudioPlayer) {
    DOM.otherToolsAudioPlayer.src = url;
    if (typeof DOM.otherToolsAudioPlayer.play === 'function') {
      DOM.otherToolsAudioPlayer.play().catch(() => {});
    }
  }
  renderToolHistory();
}

function renderToolHistory() {
  if (!DOM.otherToolsHistoryWrap || !DOM.otherToolsHistoryList) return;
  DOM.otherToolsHistoryWrap.classList.toggle('hidden', toolHistory.length === 0);
  DOM.otherToolsHistoryList.replaceChildren();
  toolHistory.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'tool-history-item';
    const titleSpan = document.createElement('span');
    titleSpan.className = 'tool-history-title';
    titleSpan.title = item.title;
    titleSpan.textContent = `[${item.time}] ${item.title} (${item.accountName})`;

    const actions = document.createElement('div');
    actions.className = 'tool-history-actions';
    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'btn-outlined';
    playBtn.textContent = '▶ 播放';
    playBtn.addEventListener('click', () => {
      currentToolAudio = item;
      if (DOM.otherToolsAudioMeta) DOM.otherToolsAudioMeta.textContent = `${item.title} · 账号: ${item.accountName}`;
      if (DOM.otherToolsAudioPlayer) {
        DOM.otherToolsAudioPlayer.src = item.url;
        if (typeof DOM.otherToolsAudioPlayer.play === 'function') DOM.otherToolsAudioPlayer.play().catch(() => {});
      }
    });

    const dlBtn = document.createElement('button');
    dlBtn.type = 'button';
    dlBtn.className = 'btn-outlined';
    dlBtn.textContent = '💾 下载';
    dlBtn.addEventListener('click', async () => {
      try {
        const saved = await saveToolAudioBlob(item.blob, item.subfolder, item.prefix, item.ext);
        setToolStatus(`✅ 已保存至 下载/${saved.finalPath}`, 'success');
      } catch (err) {
        setToolStatus(`❌ 下载失败：${err.message}`, 'error');
      }
    });

    actions.appendChild(playBtn);
    actions.appendChild(dlBtn);
    row.appendChild(titleSpan);
    row.appendChild(actions);
    DOM.otherToolsHistoryList.appendChild(row);
  });
}

function setToolButtonsBusy(busy) {
  toolTaskRunning = busy;
  [DOM.sfxGenerateBtn, DOM.musicGenerateBtn, DOM.stsGenerateBtn, DOM.isoGenerateBtn, DOM.sttGenerateBtn].forEach(btn => {
    if (btn) btn.disabled = busy;
  });
}

function initOtherTools() {
  if (DOM.otherToolsBtn) DOM.otherToolsBtn.addEventListener('click', () => openOtherToolsModal());
  if (DOM.sidebarOtherToolsBtn) DOM.sidebarOtherToolsBtn.addEventListener('click', () => openOtherToolsModal());
  if (DOM.closeOtherToolsBtn) DOM.closeOtherToolsBtn.addEventListener('click', closeOtherToolsModal);

  if (DOM.otherToolsModal && typeof DOM.otherToolsModal.querySelectorAll === 'function') {
    Array.from(DOM.otherToolsModal.querySelectorAll('.tool-tab-btn') || []).forEach(btn => {
      btn.addEventListener('click', () => switchOtherToolTab(btn.dataset.tab));
    });
    Array.from(DOM.otherToolsModal.querySelectorAll('.tool-chip') || []).forEach(chip => {
      chip.addEventListener('click', () => {
        const target = document.getElementById(chip.dataset.target);
        if (target) {
          target.value = chip.dataset.prompt || '';
          if (typeof target.focus === 'function') target.focus();
        }
      });
    });
  }

  if (DOM.sfxDurationMode) {
    DOM.sfxDurationMode.addEventListener('change', () => {
      if (DOM.sfxDuration) DOM.sfxDuration.classList.toggle('hidden', DOM.sfxDurationMode.value !== 'custom');
    });
  }
  if (DOM.sfxInfluence) {
    DOM.sfxInfluence.addEventListener('input', (e) => {
      if (DOM.valSfxInfluence) DOM.valSfxInfluence.textContent = parseFloat(e.target.value).toFixed(2);
    });
  }
  if (DOM.musicDurationMode) {
    DOM.musicDurationMode.addEventListener('change', () => {
      if (DOM.musicDurationSec) DOM.musicDurationSec.classList.toggle('hidden', DOM.musicDurationMode.value !== 'custom');
    });
  }

  if (DOM.otherToolsDownloadBtn) {
    DOM.otherToolsDownloadBtn.addEventListener('click', async () => {
      if (!currentToolAudio) return;
      try {
        const saved = await saveToolAudioBlob(currentToolAudio.blob, currentToolAudio.subfolder, currentToolAudio.prefix, currentToolAudio.ext);
        setToolStatus(`✅ 已保存至 下载/${saved.finalPath}`, 'success');
      } catch (err) {
        setToolStatus(`❌ 下载失败：${err.message}`, 'error');
      }
    });
  }

  // 1. 音效生成 (POST /v1/sound-generation)
  if (DOM.sfxGenerateBtn) {
    DOM.sfxGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const auth = getActiveAuth();
      if (!auth) return setToolStatus('⚠️ 未检测到可用 Token，请先打开 ElevenLabs 网页自动授权', 'error');
      const prompt = DOM.sfxPrompt ? DOM.sfxPrompt.value.trim() : '';
      if (!prompt) return setToolStatus('⚠️ 请先输入音效描述提示词', 'error');

      const isCustomDur = DOM.sfxDurationMode && DOM.sfxDurationMode.value === 'custom';
      const customDur = DOM.sfxDuration ? Math.min(30, Math.max(0.5, parseFloat(DOM.sfxDuration.value) || 5)) : 5;
      const influence = DOM.sfxInfluence ? Math.min(1, Math.max(0, parseFloat(DOM.sfxInfluence.value) || 0.3)) : 0.3;
      const loop = Boolean(DOM.sfxLoop && DOM.sfxLoop.checked);
      const autoDl = Boolean(DOM.sfxAutoDownload && DOM.sfxAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = DOM.sfxGenerateBtn.textContent;
      DOM.sfxGenerateBtn.textContent = '⏳ 音效生成中...';
      setToolStatus('⏳ 正在请求 ElevenLabs 生成 AI 音效...');

      try {
        const payload = { text: prompt, prompt_influence: influence };
        if (isCustomDur) payload.duration_seconds = customDur;
        if (loop) payload.loop = true;

        const resp = await fetch(`${API_BASE}/v1/sound-generation?output_format=mp3_44100_128`, {
          method: 'POST',
          headers: buildAuthHeaders(auth, { 'content-type': 'application/json' }),
          body: JSON.stringify(payload)
        });
        if (!resp.ok) throw new Error(await readResponseError(resp));
        const blob = await resp.blob();

        const prefix = `SFX_${sanitizeToolFilename(prompt, 'sound')}`;
        showToolAudioResult({ blob, title: `🔊 音效: ${prompt.slice(0, 28)}`, subfolder: 'SFX_音效', prefix, ext: 'mp3', accountName: auth.name });
        fetchQuota(auth);

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'SFX_音效', prefix, 'mp3');
          setToolStatus(`✅ 音效生成成功并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 音效生成成功（${auth.name}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 音效生成失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        DOM.sfxGenerateBtn.textContent = origText;
      }
    });
  }

  // 2. 音乐生成 (默认降级生成 BGM 音乐 + 付费模型兼容优化)
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

  async function requestBgmMusicWithCompatibility(auth, rawPrompt, isCustomDur, durSec, forceInstrumental) {
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
      const resp = await fetch(`${API_BASE}/v1/sound-generation?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: buildAuthHeaders(auth, { 'content-type': 'application/json' }),
        body: JSON.stringify(attempts[i])
      });
      if (resp.ok) return await resp.blob();
      lastResp = resp;
      if (resp.status !== 400 && resp.status !== 422) break;
    }
    throw new Error(await readResponseError(lastResp));
  }

  async function requestPaidMusicWithCompatibility(auth, prompt, modelId, isCustomDur, durSec, forceInstrumental) {
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

      const resp = await fetch(`${API_BASE}/v1/music?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: buildAuthHeaders(auth, { 'content-type': 'application/json' }),
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        return { blob: await resp.blob(), usedModel: candidateModel };
      }
      lastResp = resp;
      if (resp.status !== 400 && resp.status !== 404 && resp.status !== 422) break;
    }
    throw new Error(await readResponseError(lastResp));
  }

  if (DOM.musicGenerateBtn) {
    DOM.musicGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const auth = getActiveAuth();
      if (!auth) return setToolStatus('⚠️ 未检测到可用 Token，请先打开 ElevenLabs 网页自动授权', 'error');
      const prompt = DOM.musicPrompt ? DOM.musicPrompt.value.trim() : '';
      if (!prompt) return setToolStatus('⚠️ 请先输入音乐风格或描述提示词', 'error');

      const modelId = DOM.musicModel ? DOM.musicModel.value : 'bgm_default';
      const usePaidMusicApi = Boolean(modelId && modelId !== 'bgm_default');
      const isCustomDur = DOM.musicDurationMode && DOM.musicDurationMode.value === 'custom';
      const rawDurSec = DOM.musicDurationSec ? (parseInt(DOM.musicDurationSec.value, 10) || 22) : 22;
      const durSec = usePaidMusicApi
        ? Math.min(300, Math.max(3, rawDurSec))
        : Math.min(30, Math.max(3, rawDurSec));
      const forceInstrumental = Boolean(DOM.musicInstrumental && DOM.musicInstrumental.checked);
      const autoDl = Boolean(DOM.musicAutoDownload && DOM.musicAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = DOM.musicGenerateBtn.textContent;
      DOM.musicGenerateBtn.textContent = usePaidMusicApi
        ? '⏳ 付费模型音乐合成中 (约需10~40秒)...'
        : '⏳ 正在合成 BGM 配乐...';
      setToolStatus(usePaidMusicApi ? '⏳ 正在请求 ElevenLabs 付费音乐接口...' : '⏳ 正在通过默认 BGM 配乐引擎生成音乐...');

      try {
        let blob = null;
        let usedModeLabel = 'BGM 配乐模式';
        if (usePaidMusicApi) {
          const paidRes = await requestPaidMusicWithCompatibility(auth, prompt, modelId, isCustomDur, durSec, forceInstrumental);
          blob = paidRes.blob;
          usedModeLabel = `Eleven Music (${paidRes.usedModel === 'auto' ? '自动模型' : paidRes.usedModel})`;
        } else {
          blob = await requestBgmMusicWithCompatibility(auth, prompt, isCustomDur, durSec, forceInstrumental);
        }

        const prefix = `Music_${sanitizeToolFilename(prompt, 'track')}`;
        showToolAudioResult({ blob, title: `🎵 音乐 [${usedModeLabel}]: ${prompt.slice(0, 24)}`, subfolder: 'Music_音乐', prefix, ext: 'mp3', accountName: auth.name });
        fetchQuota(auth);

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'Music_音乐', prefix, 'mp3');
          setToolStatus(`✅ 音乐生成成功 [${usedModeLabel}] 并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 音乐生成成功 [${usedModeLabel}]（${auth.name}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        const extraHint = usePaidMusicApi && /free_users|permission|paid|subscription|402|403/i.test(err.message || '')
          ? '（当前网页账号可能为免费号，请切换回「免费 BGM 配乐模式」）'
          : '';
        setToolStatus(`❌ 音乐生成失败：${err.message}${extraHint}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        DOM.musicGenerateBtn.textContent = origText;
      }
    });
  }

  // 3. 语音变声 (POST /v1/speech-to-speech/{voice_id})
  if (DOM.stsGenerateBtn) {
    DOM.stsGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const auth = getActiveAuth();
      if (!auth) return setToolStatus('⚠️ 未检测到可用 Token，请先打开 ElevenLabs 网页自动授权', 'error');
      const file = DOM.stsAudioFile && DOM.stsAudioFile.files && DOM.stsAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要变声的源音频文件', 'error');

      const customVoice = DOM.stsCustomVoiceId ? DOM.stsCustomVoiceId.value.trim() : '';
      const baseVoice = customVoice || (DOM.voiceSelect && DOM.voiceSelect.value);
      if (!baseVoice || baseVoice.includes('等待') || baseVoice.includes('失败')) {
        return setToolStatus('⚠️ 请在主界面选择目标声音，或填写目标 Voice ID', 'error');
      }

      const stsModel = DOM.stsModel ? DOM.stsModel.value : 'eleven_multilingual_sts_v2';
      const removeNoise = Boolean(DOM.stsRemoveNoise && DOM.stsRemoveNoise.checked);
      const autoDl = Boolean(DOM.stsAutoDownload && DOM.stsAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = DOM.stsGenerateBtn.textContent;
      DOM.stsGenerateBtn.textContent = '⏳ 正在转换音色...';
      setToolStatus('⏳ 正在上传源音频并执行语音变声...');

      try {
        const formData = new FormData();
        formData.append('audio', file, file.name || 'input.mp3');
        formData.append('model_id', stsModel);
        formData.append('remove_background_noise', String(removeNoise));
        formData.append('voice_settings', JSON.stringify(getVoiceSettings()));

        const resp = await fetch(`${API_BASE}/v1/speech-to-speech/${encodeURIComponent(baseVoice)}?output_format=mp3_44100_128`, {
          method: 'POST',
          headers: buildAuthHeaders(auth),
          body: formData
        });
        if (!resp.ok) throw new Error(await readResponseError(resp));
        const blob = await resp.blob();

        const baseName = file.name ? file.name.replace(/\.[^.]+$/, '') : 'sts';
        const prefix = `STS_${sanitizeToolFilename(baseName, 'voicechange')}`;
        showToolAudioResult({ blob, title: `🎭 变声: ${file.name}`, subfolder: 'STS_变声', prefix, ext: 'mp3', accountName: auth.name });
        fetchQuota(auth);

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'STS_变声', prefix, 'mp3');
          setToolStatus(`✅ 语音变声完成并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 语音变声完成（${auth.name}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 语音变声失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        DOM.stsGenerateBtn.textContent = origText;
      }
    });
  }

  // 4. 人声提取 / 降噪 (POST /v1/audio-isolation)
  if (DOM.isoGenerateBtn) {
    DOM.isoGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const auth = getActiveAuth();
      if (!auth) return setToolStatus('⚠️ 未检测到可用 Token，请先打开 ElevenLabs 网页自动授权', 'error');
      const file = DOM.isoAudioFile && DOM.isoAudioFile.files && DOM.isoAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要提取人声的音频文件', 'error');

      const autoDl = Boolean(DOM.isoAutoDownload && DOM.isoAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = DOM.isoGenerateBtn.textContent;
      DOM.isoGenerateBtn.textContent = '⏳ 正在分离背景音与提纯人声...';
      setToolStatus('⏳ 正在上传音频并提取纯净人声...');

      try {
        const formData = new FormData();
        formData.append('audio', file, file.name || 'audio.mp3');

        const resp = await fetch(`${API_BASE}/v1/audio-isolation`, {
          method: 'POST',
          headers: buildAuthHeaders(auth),
          body: formData
        });
        if (!resp.ok) throw new Error(await readResponseError(resp));
        const blob = await resp.blob();

        const baseName = file.name ? file.name.replace(/\.[^.]+$/, '') : 'vocal';
        const prefix = `Vocal_${sanitizeToolFilename(baseName, 'isolated')}`;
        showToolAudioResult({ blob, title: `🧹 纯净人声: ${file.name}`, subfolder: 'Vocal_人声提取', prefix, ext: 'mp3', accountName: auth.name });
        fetchQuota(auth);

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'Vocal_人声提取', prefix, 'mp3');
          setToolStatus(`✅ 人声提取成功并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 人声提取成功（${auth.name}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 人声提取失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        DOM.isoGenerateBtn.textContent = origText;
      }
    });
  }

  // 5. 语音转文字 (POST /v1/speech-to-text)
  if (DOM.sttGenerateBtn) {
    DOM.sttGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const auth = getActiveAuth();
      if (!auth) return setToolStatus('⚠️ 未检测到可用 Token，请先打开 ElevenLabs 网页自动授权', 'error');
      const file = DOM.sttAudioFile && DOM.sttAudioFile.files && DOM.sttAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要识别的音频或视频文件', 'error');

      const preferredModel = DOM.sttModel ? DOM.sttModel.value : 'scribe_v1';
      const tagEvents = Boolean(DOM.sttTagEvents && DOM.sttTagEvents.checked);
      const diarize = Boolean(DOM.sttDiarize && DOM.sttDiarize.checked);

      setToolButtonsBusy(true);
      const origText = DOM.sttGenerateBtn.textContent;
      DOM.sttGenerateBtn.textContent = '⏳ 正在识别语音文字...';
      setToolStatus('⏳ 正在通过 Scribe 识别音频文字...');

      try {
        const sendRequest = async (modelToUse) => {
          const formData = new FormData();
          formData.append('file', file, file.name || 'audio.mp3');
          formData.append('model_id', modelToUse);
          formData.append('tag_audio_events', String(tagEvents));
          formData.append('diarize', String(diarize));
          return fetch(`${API_BASE}/v1/speech-to-text`, {
            method: 'POST',
            headers: buildAuthHeaders(auth),
            body: formData
          });
        };

        let resp = await sendRequest(preferredModel);
        if (!resp.ok && (resp.status === 400 || resp.status === 422) && preferredModel !== 'scribe_v1') {
          resp = await sendRequest('scribe_v1');
        }
        if (!resp.ok) throw new Error(await readResponseError(resp));
        const data = await resp.json();

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

        if (DOM.sttOutputText) DOM.sttOutputText.value = formattedText;
        setToolStatus(`✅ 语音识别完成（共 ${formattedText.length} 字）`, 'success');
      } catch (err) {
        setToolStatus(`❌ 语音转文字失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        DOM.sttGenerateBtn.textContent = origText;
      }
    });
  }

  if (DOM.sttCopyBtn) {
    DOM.sttCopyBtn.addEventListener('click', async () => {
      const txt = DOM.sttOutputText ? DOM.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可复制的识别文本', 'error');
      try {
        await navigator.clipboard.writeText(txt);
        setToolStatus('✅ 已复制识别文本到剪贴板', 'success');
      } catch (_) {
        setToolStatus('❌ 复制失败，请手动选中复制', 'error');
      }
    });
  }

  if (DOM.sttDownloadTxtBtn) {
    DOM.sttDownloadTxtBtn.addEventListener('click', async () => {
      const txt = DOM.sttOutputText ? DOM.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可导出的识别文本', 'error');
      try {
        const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
        const saved = await saveToolAudioBlob(blob, 'STT_转文字', 'STT_转文字', 'txt');
        setToolStatus(`✅ 已导出识别文本至 下载/${saved.finalPath}`, 'success');
      } catch (err) {
        setToolStatus(`❌ 导出失败：${err.message}`, 'error');
      }
    });
  }

  if (DOM.sttSendToQueueBtn) {
    DOM.sttSendToQueueBtn.addEventListener('click', () => {
      const txt = DOM.sttOutputText ? DOM.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可加入队列的识别文本', 'error');
      let segs = txt.split(/\r?\n+/).map(s => s.trim()).filter(Boolean);
      const autoSplit = !DOM.autoSplit3Min || DOM.autoSplit3Min.checked !== false;
      if (autoSplit) {
        segs = expandOverThreeMinutes(segs).texts;
      }
      const textareas = DOM.listContainer.querySelectorAll('textarea');
      if (textareas.length === 1 && textareas[0].value.trim() === '') {
        DOM.listContainer.replaceChildren();
      }
      segs.forEach(s => addEmptyCard(s));
      updateStats();
      setToolStatus(`✅ 已将 ${segs.length} 段识别文本加入主界面文案列表`, 'success');
      showStatus(`📥 已从语音转文字导入 ${segs.length} 段文案`);
    });
  }
}

// ==========================================
// 🧹 声音清理与重名去重管理
// ==========================================
let voicePreviewAudio = null;

function setVoiceCleanupStatus(msg, type = 'normal') {
  if (!DOM.voiceCleanupStatus) return;
  DOM.voiceCleanupStatus.textContent = msg;
  DOM.voiceCleanupStatus.classList.remove('error', 'success');
  if (type === 'error') DOM.voiceCleanupStatus.classList.add('error');
  if (type === 'success') DOM.voiceCleanupStatus.classList.add('success');
}

function updateVoiceCleanupButtonCount() {
  if (!DOM.confirmDeleteVoicesBtn) return;
  const count = appState.selectedVoiceCleanupIds instanceof Set ? appState.selectedVoiceCleanupIds.size : 0;
  DOM.confirmDeleteVoicesBtn.textContent = `🧹 一键清理已勾选声音 (${count})`;
  DOM.confirmDeleteVoicesBtn.disabled = count === 0;
}

function selectDefaultDuplicateVoices() {
  const { duplicateExtraIds } = analyzeVoicesForCleanup();
  appState.selectedVoiceCleanupIds = new Set(duplicateExtraIds);
  updateVoiceCleanupButtonCount();
}

function openVoiceCleanupModal() {
  if (!DOM.voiceCleanupModal) return;
  selectDefaultDuplicateVoices();
  renderVoiceCleanupModal();
  DOM.voiceCleanupModal.classList.remove('hidden');
}

function closeVoiceCleanupModal() {
  if (voicePreviewAudio) {
    try { voicePreviewAudio.pause(); } catch (_) {}
    voicePreviewAudio = null;
  }
  if (DOM.voiceCleanupModal) DOM.voiceCleanupModal.classList.add('hidden');
}

function createVoiceCleanupRow(voice, options = {}) {
  const row = document.createElement('div');
  row.className = `voice-cleanup-item${options.isDuplicateExtra ? ' is-dup' : ''}`;

  const left = document.createElement('div');
  left.className = 'voice-cleanup-left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = appState.selectedVoiceCleanupIds.has(voice.voice_id);
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) appState.selectedVoiceCleanupIds.add(voice.voice_id);
    else appState.selectedVoiceCleanupIds.delete(voice.voice_id);
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
  if (!DOM.voiceCleanupList) return;
  const { visibleVoices, duplicateGroups, duplicateExtraIds, singleCustomVoices, hiddenCount } = analyzeVoicesForCleanup();
  const query = (DOM.voiceCleanupSearch ? DOM.voiceCleanupSearch.value : '').trim().toLowerCase();

  if (DOM.voiceCleanupSummary) {
    DOM.voiceCleanupSummary.textContent = `当前声音库共 ${visibleVoices.length} 个声音 · 发现 ${duplicateGroups.length} 组同名声音（共 ${duplicateExtraIds.length} 个多余副本）${hiddenCount > 0 ? ` · 已在本地隐藏 ${hiddenCount} 个` : ''}`;
  }
  if (DOM.restoreHiddenVoicesBtn) {
    DOM.restoreHiddenVoicesBtn.classList.toggle('hidden', hiddenCount === 0);
    DOM.restoreHiddenVoicesBtn.textContent = `♻️ 恢复已隐藏 (${hiddenCount})`;
  }

  DOM.voiceCleanupList.replaceChildren();
  let renderedCount = 0;

  for (const group of duplicateGroups) {
    const matchedGroup = group.filter(v => !query || String(v.name || '').toLowerCase().includes(query) || String(v.voice_id || '').toLowerCase().includes(query));
    if (matchedGroup.length === 0) continue;

    const title = document.createElement('div');
    title.className = 'voice-cleanup-group-title';
    title.textContent = `🔁 同名重复组：「${group[0].name}」（共 ${group.length} 个，默认保留第 1 个）`;
    DOM.voiceCleanupList.appendChild(title);

    group.forEach((voice, idx) => {
      if (query && !matchedGroup.includes(voice)) return;
      DOM.voiceCleanupList.appendChild(createVoiceCleanupRow(voice, {
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
    DOM.voiceCleanupList.appendChild(singleTitle);

    for (const voice of matchedSingles) {
      DOM.voiceCleanupList.appendChild(createVoiceCleanupRow(voice, {
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
      ? '⚠️ 尚未加载到声音列表，请先确保已识别账号并点击刷新按钮。'
      : '🎉 没有匹配的重复或自定义声音。';
    DOM.voiceCleanupList.appendChild(empty);
  }

  updateVoiceCleanupButtonCount();
}

async function executeVoiceCleanup(targetIds) {
  const ids = Array.isArray(targetIds) ? targetIds.filter(Boolean) : [...appState.selectedVoiceCleanupIds];
  if (ids.length === 0) {
    setVoiceCleanupStatus('⚠️ 请先勾选需要清理的声音', 'error');
    return;
  }

  const auth = getActiveAuth();
  if (DOM.confirmDeleteVoicesBtn) DOM.confirmDeleteVoicesBtn.disabled = true;

  let cloudDeleted = 0;
  let localHidden = 0;
  const hiddenSet = new Set(Array.isArray(appState.hiddenVoiceIds) ? appState.hiddenVoiceIds : []);
  const cleanedSet = new Set();

  for (let i = 0; i < ids.length; i++) {
    const voiceId = ids[i];
    setVoiceCleanupStatus(`⏳ 正在清理声音 (${i + 1} / ${ids.length})...`);
    let deletedOnServer = false;

    if (auth) {
      try {
        const res = await fetch(`${API_BASE}/v1/voices/${voiceId}`, {
          method: 'DELETE',
          headers: buildAuthHeaders(auth)
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
    appState.selectedVoiceCleanupIds.delete(voiceId);
  }

  appState.hiddenVoiceIds = [...hiddenSet];
  appState.voicesList = (Array.isArray(appState.voicesList) ? appState.voicesList : []).filter(v => !cleanedSet.has(v.voice_id) || hiddenSet.has(v.voice_id));
  await chrome.storage.local.set({ hiddenVoiceIds: appState.hiddenVoiceIds });

  renderVoiceSelectOptions();
  renderVoiceCleanupModal();

  const summaryParts = [];
  if (cloudDeleted > 0) summaryParts.push(`云端彻底删除 ${cloudDeleted} 个`);
  if (localHidden > 0) summaryParts.push(`本地屏蔽隐藏 ${localHidden} 个`);
  const doneMsg = `✅ 清理完成：共处理 ${ids.length} 个声音（${summaryParts.join('，')}）`;
  setVoiceCleanupStatus(doneMsg, 'success');
  showStatus(doneMsg);
}

function initVoiceCleanup() {
  if (DOM.cleanVoicesBtn) {
    DOM.cleanVoicesBtn.addEventListener('click', openVoiceCleanupModal);
  }
  if (DOM.closeVoiceCleanupBtn) {
    DOM.closeVoiceCleanupBtn.addEventListener('click', closeVoiceCleanupModal);
  }
  if (DOM.cancelVoiceCleanupBtn) {
    DOM.cancelVoiceCleanupBtn.addEventListener('click', closeVoiceCleanupModal);
  }
  if (DOM.voiceCleanupModal) {
    DOM.voiceCleanupModal.addEventListener('click', (e) => {
      if (e.target === DOM.voiceCleanupModal) closeVoiceCleanupModal();
    });
  }
  if (DOM.voiceCleanupSearch) {
    DOM.voiceCleanupSearch.addEventListener('input', renderVoiceCleanupModal);
  }
  if (DOM.selectDuplicateVoicesBtn) {
    DOM.selectDuplicateVoicesBtn.addEventListener('click', () => {
      selectDefaultDuplicateVoices();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus(`🎯 已自动勾选 ${appState.selectedVoiceCleanupIds.size} 个同名多余副本（每组保留第 1 个）`);
    });
  }
  if (DOM.clearVoiceSelectionBtn) {
    DOM.clearVoiceSelectionBtn.addEventListener('click', () => {
      appState.selectedVoiceCleanupIds.clear();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus('已取消全部勾选');
    });
  }
  if (DOM.restoreHiddenVoicesBtn) {
    DOM.restoreHiddenVoicesBtn.addEventListener('click', async () => {
      appState.hiddenVoiceIds = [];
      await chrome.storage.local.set({ hiddenVoiceIds: [] });
      if (getActiveAuth()) {
        await fetchVoices(getActiveAuth());
      } else {
        renderVoiceSelectOptions();
      }
      selectDefaultDuplicateVoices();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus('♻️ 已恢复所有本地隐藏的声音', 'success');
    });
  }
  if (DOM.dedupeVoiceSelectToggle) {
    DOM.dedupeVoiceSelectToggle.addEventListener('change', async () => {
      appState.dedupeVoiceSelect = Boolean(DOM.dedupeVoiceSelectToggle.checked);
      await chrome.storage.local.set({ dedupeVoiceSelect: appState.dedupeVoiceSelect });
      renderVoiceSelectOptions();
      setVoiceCleanupStatus(appState.dedupeVoiceSelect
        ? '✨ 已开启：主界面下拉框已自动合并隐藏同名重复声音'
        : '已关闭下拉框自动合并，同名声音将显示序号与尾号区分');
    });
  }
  if (DOM.confirmDeleteVoicesBtn) {
    DOM.confirmDeleteVoicesBtn.addEventListener('click', () => {
      executeVoiceCleanup([...appState.selectedVoiceCleanupIds]);
    });
  }
}



