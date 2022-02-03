(function () {

    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
//console.log("hi");
    function tagEveryone() {
        document.querySelector('._24-Ff').click();
        var el = document.querySelector('div.zzgSd._3e6xi span').innerText;
        var premembers = el.replace(/[^0-9\,]/g, '');
        var members0 = premembers.split(',');
        var members1 = members0.filter((a) => a);
        //console.log(el);
        //console.log(members1);
        var participants = document.querySelectorAll('span._2MNpf')[1];
        var actualCountParticipants = participants.innerText.replace('participants', '');
        var countparticipants = members1.length;
        //console.log(countparticipants);
        var tagcode = "";
        for (let i= 0; i<countparticipants; i++){
            tagcode += '<span class="copyable-text selectable-text" data-mention-jid="'+members1[i]+'@c.us" data-original-name="@name" data-plain-text="@name" data-app-text-template="​'+members1[i]+'@c.us​"><span class="at-symbol">@</span><span dir="ltr">name</span></span>';
        };
        //console.log(tagcode);
        var typespace = document.querySelectorAll('._13NKt')[2];
        if (members1.length < actualCountParticipants-1) {
            typespace.innerHTML = tagcode + '<br><i>Members whose name are saved on your device can\'t be tagged 🤖</i>';}
        else
            typespace.innerHTML = tagcode;
}

//tag admins
    function tagAdmins() {
        var countAdmins = document.querySelectorAll("._3bTNW").length;
        console.log(countAdmins);

        var adminNo = "";
        var adminName = "";
        for (let i = 0; i < countAdmins; i++){
            adminNo += document.querySelectorAll("._3bTNW")[i].parentNode.parentNode.childNodes[0].innerText + ',';
            adminName += document.querySelectorAll('._3bTNW')[i].parentElement.parentElement.parentNode.childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerText +',';
        }
        console.log(adminNo);
        console.log(adminName);
        //sanitisation
        var preAdmins0 = adminNo.replace(/[^0-9\,]/g, '');
        var preAdmins1 = preAdmins0.replace(/\s/g, '');
        //make array
        var admins = preAdmins1.split(',');
        var admins1 = admins.filter((a) => a);
        adminName = adminName.split(',');
        adminName = adminName.filter((a) => a);
        console.log(admins1);
        console.log(adminName);
        //tag them
        var tagAdmins = "";
        for (let j= 0; j<countAdmins; j++){
            tagAdmins += '<span class="copyable-text selectable-text" data-mention-jid="'+admins1[j]+'@c.us" data-original-name="@'+adminName[j]+'" data-plain-text="@'+adminName[j]+'" data-app-text-template="​'+admins1[j]+'@c.us​"><span class="at-symbol">@</span><span dir="ltr">'+adminName[j]+'</span></span> ';
        };
        var typespace = document.querySelectorAll('._13NKt')[2];
        if (admins1.length< countAdmins) {
            typespace.innerHTML =tagAdmins + ' <br><i>Members whose name are saved on your device can\'t be tagged 🤖</i> ';}
        else
            typespace.innerHTML =tagAdmins;
    }
//Listen for messages from popup
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "everyone") {
        tagEveryone();
    }
    else if (message.command === "admins") {
        tagAdmins();
    }
})

})();
