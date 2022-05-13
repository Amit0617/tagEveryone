
function listenClicks() {
    console.log("popup listening for clicks");

    document.addEventListener("click", function(e){

        function triggerTagging(tabs){
            browser.tabs.sendMessage(tabs[0].id, {
                command: e.target.textContent
            });
        }

        function getError(error) {
            console.error(`Could not tag: ${error}`);
        }

        if (e.target.classList.contains("everyone")) {
            browser.tabs.query({ active: true, currentWindow: true }).then(triggerTagging).catch(getError);
        }

        else if (e.target.classList.contains("admins")) {
            browser.tabs.query({ active: true, currentWindow: true }).then(triggerTagging).catch(getError);
        }

        console.log("clicked inside popup");
    });
}

function executionError(error) {
    document.querySelector("#options").style.display = "none";
    document.querySelector("#error").style.display = "block";
    console.log("error spotted");
    console.error(`Failed to execute tagging script: $(error.message)`);
}

browser.tabs.executeScript({file: "/content_scripts/tagging.js"}).then(listenClicks).catch(executionError);
