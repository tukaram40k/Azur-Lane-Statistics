document.addEventListener('DOMContentLoaded', async () => {
    const launchPythonScript = document.getElementById('launch-python-script')
    const loadFileButton = document.getElementById('load-file');
    const outputArea = document.getElementById('output');

    const fileDropdown = document.getElementById("fileDropdown");
    const appendText = document.getElementById("appendText");
    const appendButton = document.getElementById("appendButton");

    // launch python script
    launchPythonScript.addEventListener('click', () => {
        window.electronAPI.launchPythonScript()
    })

    // display the output
    // TODO: брать пафы с мэйна надо а не хардкодить; одна кнопка нужна а не 2
    loadFileButton.addEventListener('click', async () => {
        const filePath = './resources/output/output.txt';
        const fileContent = await window.electronAPI.readFile(filePath);
        outputArea.textContent = fileContent;
    });

    // Load files into the dropdown
    const files = await window.electronAPI.listFiles();
    files.forEach(file => {
        const option = document.createElement("option");
        option.value = file;
        option.textContent = file;
        fileDropdown.appendChild(option);
    });

    // Append text to the selected file
    appendButton.addEventListener("click", async () => {
        const selectedFile = fileDropdown.value;
        const text = appendText.value;
        if (selectedFile && text) {
            const result = await window.electronAPI.appendToFile(selectedFile, text);
            alert(result);
        } else {
            alert("Please select a file and enter text.");
        }
    });
})