(function () {

    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    console.log("@everyone extension");
    function tagEveryone() {
        document.querySelector('._24-Ff').click();
        let el = document.querySelector('div.zzgSd._3e6xi span').innerText;
        let premembers = el.replace(/[^0-9\,]/g, '');
        let members0 = premembers.split(',');
        let members1 = members0.filter((a) => a);
        //console.log(el);
        //console.log(members1);
        let participants = document.querySelector('span.x2dsD._1lF7t.bze30y65.a4ywakfo');
        let actualCountParticipants = participants.innerText.replace('participants', '');
        let countparticipants = members1.length;
        //console.log(countparticipants);
        let tagcode = "";
        for (let i = 0; i < countparticipants; i++) {
            tagcode += '<span class="copyable-text selectable-text" data-mention-jid="' + members1[i] + '@c.us" data-original-name="@name" data-plain-text="@name" data-app-text-template="​' + members1[i] + '@c.us​"><span class="at-symbol">@</span><span dir="ltr">name</span></span>';
        };
        //console.log(tagcode);
        let typespace = document.querySelectorAll('._13NKt')[2];
        if (members1.length < actualCountParticipants - 1) {
            typespace.innerHTML = tagcode + '<br><i>Members whose name are saved on your device can\'t be tagged 🤖</i>';
        }
        else
            typespace.innerHTML = tagcode;
    }

    //tag admins
    function tagAdmins() {
        let countAdmins = document.querySelectorAll("._3bTNW").length;
        console.log(countAdmins);

        let adminNo = "";
        for (let i = 0; i < countAdmins; i++) {
            adminNo += document.querySelectorAll("._3bTNW")[i].parentNode.parentNode.childNodes[0].innerText + ',';
        }
        // console.log(adminNo);

        //sanitisation
        let preAdmins0 = adminNo.replace(/[^0-9\,]/g, '');
        let preAdmins1 = preAdmins0.replace(/\s/g, '');

        //make array
        let admins = preAdmins1.split(',');
        let admins1 = admins.filter((a) => a);
        //console.log(admins1);

        //tag them
        let tagAdmins = "";
        for (let j = 0; j < countAdmins; j++) {
            tagAdmins += '<span class="copyable-text selectable-text" data-mention-jid="' + admins1[j] + '@c.us" data-original-name="@adminName" data-plain-text="@adminName" data-app-text-template="' + admins1[j] + '@c.us"><span class="at-symbol">@</span><span dir="ltr">adminName</span></span> ';
        };

        let typespace = document.querySelectorAll('._13NKt')[2];
        if (admins1.length < countAdmins) {
            typespace.innerHTML = tagAdmins + ' <br><i>Members whose name are saved on your device can\'t be tagged 🤖</i> ';
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

})();
