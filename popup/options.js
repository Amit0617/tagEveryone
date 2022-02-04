function listenClicks() {
    document.addEventListener("click", (e) => {
        function triggerTag(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: e.target.textContent
            });
        }

        function getError(error) {
            console.error(`Could not tag: ${error}`);
        }

        if (e.target.classList.contains("everyone")){
            browser.tabs.query({active: true, currentWindow: true}).then(triggerTag).catch(getError);
        }

        else if (e.target.classList.contains("admins")){
            browser.tabs.query({active: true, currentWindow: true}).then(triggerTag).catch(getError);
        }

        console.log("triggered");

    });
}

function executionError(error) {
    document.querySelector("#options").style.display = "hidden";
    document.querySelector("error").style.display = "visible";
    console.error(`Failed to execute tagging script: $(error.message)`);
}

browser.tabs.executeScript({file: "/content_scripts/tagging.js"}).then(listenClicks).catch(executionError);
