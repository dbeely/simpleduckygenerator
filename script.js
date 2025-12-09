document.addEventListener("DOMContentLoaded", () => {
  // получение элементов
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const outputArea = document.getElementById("output-area");
  const resultBox = document.getElementById("result");

  // назначение обработчиков
  generateBtn.addEventListener("click", generateScript);
  downloadBtn.addEventListener("click", downloadScript);

  /**
   * основной генератор
   */
  function generateScript() {
    const url = document.getElementById("url").value;
    const os = document.getElementById("os").value;
    const initDelay = document.getElementById("initDelay").value;
    const cmdDelay = document.getElementById("cmdDelay").value;

    if (!url) {
      alert("Пожалуйста, введите URL");
      return;
    }

    let script = `DELAY ${initDelay}\n`;
    // логика запуска в зависимости от ОС
    switch (os) {
      case "windows":
        script += `GUI r\n`;
        script += `DELAY ${cmdDelay}\n`;
        script += `STRING ${url}\n`;
        script += `ENTER`;
        break;

      case "macos":
        script += `GUI SPACE\n`;
        script += `DELAY ${cmdDelay}\n`;
        script += `STRING ${url}\n`;
        script += `ENTER`;
        break;

      case "linux":
        script += `ALT F2\n`;
        script += `DELAY ${cmdDelay}\n`;
        script += `STRING ${url}\n`;
        script += `ENTER`;
        break;
    }

    // обновление интерфейса
    outputArea.style.display = "block";
    resultBox.value = script;
    downloadBtn.disabled = false;
    downloadBtn.style.backgroundColor = "var(--accent-color)";
    downloadBtn.style.color = "#fff";
  }

  /**
   * создание и инициация скачивания файла
   */
  function downloadScript() {
    const scriptContent = resultBox.value;
    let filename = document.getElementById("filename").value || "script";

    if (!filename.endsWith(".txt")) {
      filename += ".txt";
    }

    const blob = new Blob([scriptContent], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
