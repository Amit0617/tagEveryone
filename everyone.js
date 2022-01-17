(function () {
//console.log("hi");
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
if (members1.length< actualCountParticipants-1) {
typespace.innerHTML = tagcode + '<br><i>Members whose name are saved on your device can\'t be tagged 🤖</i>';}
else 
typespace.innerHTML = tagcode;
})();
