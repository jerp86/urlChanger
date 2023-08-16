const VALUES = {
  local: ':3000/',
  aem: ':4502/editor.html/',
};

const replacedUrl = (url = '') => {
  if (url.includes(VALUES.aem)) {
    const replacedPort = url.replace(VALUES.aem, VALUES.local);
    return replacedPort.replace(/(\.html)$/gmi, '');
  }

  const replacedPort = url.replace(VALUES.local, VALUES.aem);
  return `${replacedPort}.html`;
}

document.getElementById('changeUrlButton').addEventListener('click', async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (activeTab) {
    const newUrl = replacedUrl(activeTab.url);

    if (newUrl) {
      chrome.tabs.update(activeTab.id, { url: newUrl });
    }
  }
});
