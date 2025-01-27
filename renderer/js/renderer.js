document.addEventListener('DOMContentLoaded', () => {
    const launchPythonScript = document.getElementById('launch-python-script')
    const loadFileButton = document.getElementById('load-file');
    const outputArea = document.getElementById('output');

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
})