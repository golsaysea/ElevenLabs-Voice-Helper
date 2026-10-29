let isCreating = false;

chrome.action.onClicked.addListener(async () => {
  // 如果正在创建中，阻止第二次点击，防止双开
  if (isCreating) return; 
  
  const popupUrl = chrome.runtime.getURL("popup.html");
  
  try {
    // 1. 获取所有 Popup 类型的窗口
    const windows = await chrome.windows.getAll({ populate: true, windowTypes: ['popup'] });
    
    // 2. 模糊匹配：只要窗口里的 Tab URL 包含 popup.html 就算找到
    const existingWin = windows.find(win => {
      return win.tabs && win.tabs.some(tab => tab.url && tab.url.includes("popup.html"));
    });

    if (existingWin) {
      // 3. 找到旧窗口：置顶、聚焦、高亮
      await chrome.windows.update(existingWin.id, { 
        focused: true,
        drawAttention: true
      });
    } else {
      // 4. 没找到：新建窗口
      isCreating = true;
      const displayInfo = await chrome.system.display.getInfo();
      const primaryDisplay = displayInfo.find(d => d.isPrimary) || displayInfo[0];
      
      // 设定窗口大小和位置（居中）
      const width = 1200;
      const height = 850;
      const left = Math.round(primaryDisplay.workArea.left + (primaryDisplay.workArea.width - width) / 2);
      const top = Math.round(primaryDisplay.workArea.top + (primaryDisplay.workArea.height - height) / 2);

      await chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: width,
        height: height,
        left: left,
        top: top
      });
      
      // 稍微延迟释放锁，防止极速连点
      setTimeout(() => { isCreating = false; }, 500);
    }
  } catch (e) {
    isCreating = false;
    console.error(e);
  }
});