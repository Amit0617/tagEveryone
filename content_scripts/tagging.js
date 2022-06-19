(function () {

    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    console.log("@everyone extension");
    function tagEveryone() {
        //open right side view
        document.querySelector('._24-Ff').click();

        //get all the numbers from the top div of group
        var el = document.querySelector('div.zzgSd._3e6xi span').innerText;

        //Regex to allow only 0-9 and comma(helpful for specially tagging international numbers consisting `(`, `)` or `+` )
        var premembers = el.replace(/[^0-9\,]/g, '');

        //Creating array from string of numbers separated by comma
        var members0 = premembers.split(',');

        //Filtering some undefined things out of that (if any)
        var members1 = members0.filter((a) => a);
        //console.log(el);
        //console.log(members1);

        // Get group participants consisting element
        var participants = document.querySelector('span.x2dsD._1lF7t.bze30y65.a4ywakfo');
        var actualCountParticipants = participants.innerText.replace('participants', '');

        var countparticipants = members1.length; //participants after removing saved names and 'You'
        //console.log(countparticipants);

        var tagcode = "";
        for (var i = 0; i < countparticipants; i++) {
            tagcode += '<span class="copyable-text selectable-text" data-mention-jid="' + members1[i] + '@c.us" data-original-name="@name" data-plain-text="@name" data-app-text-template="​' + members1[i] + '@c.us​"><span class="at-symbol">@</span><span dir="ltr">name</span></span>';

        };
        //console.log(tagcode);

        // Get typing box
        var typespace = document.querySelectorAll('._13NKt')[2];
        //         var typespace = document.querySelectorAll('div.fd365im1.to2l77zo.bbv8nyr4.mwp4sxku.gfz4du6o.ag5g9lrv')[0];
        if (countparticipants < actualCountParticipants - 1) {
            typespace.innerHTML = tagcode + '<br><i>Members whose name are saved on your device can\'t be tagged 🤖</i>';
        }
        else
            typespace.innerHTML = tagcode;
    }

    //tag admins
    function tagAdmins() {

        //open right side view
        document.querySelector('._24-Ff').click();

        //Count elements consisting "admin" tag
        var countAdmins = document.querySelectorAll("._3bTNW").length;
        console.log("No. of Admins", countAdmins);

        var adminNo = "";
        for (var i = 0; i < countAdmins; i++) {
            adminNo += document.querySelectorAll("._3bTNW")[i].parentNode.parentNode.childNodes[0].innerText + ',';
        }
        // console.log(adminNo);

        //sanitisation
        var preAdmins0 = adminNo.replace(/[^0-9\,]/g, '');
        var preAdmins1 = preAdmins0.replace(/\s/g, '');

        //make array
        var admins = preAdmins1.split(',');
        var admins1 = admins.filter((a) => a);
        //console.log(admins1);

        //tag them
        var tagAdmins = "";
        for (var j = 0; j < admins1.length; j++) {
            tagAdmins += '<span class="copyable-text selectable-text" data-mention-jid="' + admins1[j] + '@c.us" data-original-name="@adminName" data-plain-text="@adminName" data-app-text-template="' + admins1[j] + '@c.us"><span class="at-symbol">@</span><span dir="ltr">adminName</span></span> ';
        };

        var typespace = document.querySelectorAll('._13NKt')[2];
        //         var typespace = document.querySelectorAll('p.selectable-text.copyable-text')[0];
        if (admins1.length < countAdmins) {
            typespace.innerHTML = tagAdmins + ' <br><i>Members whose names are saved on your device or your name can\'t be tagged 🤖</i> ';
        }
        else
            typespace.innerHTML = tagAdmins;
    }

    //Listen for messages from popup
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "everyone") {
            console.log("tagging everyone")
            tagEveryone();
        }
        else if (message.command === "admins") {
            console.log("tagging Admins")
            tagAdmins();
        }
    })

    //Listen for installation of extension
    browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
        if (temporary) return; // skip during development
        switch (reason) {
            case "install":
                {
                    const url = browser.runtime.getURL("views/index.html");
                    await browser.tabs.create({ url });
                }
                break;

            case "update":
                {
                    const url = "https://github.com/Amit0617/tagEveryone/wiki/Updates/";
                    await browser.tabs.create({ url });
                }
                break;
        }
    });

})();
