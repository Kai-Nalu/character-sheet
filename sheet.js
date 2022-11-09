$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const thisUid = String(urlParams.get('character'));
    updateCharData(thisUid);
    
    $("#dim").hide();
    $(".editor").hide();
    
    $(".field.text").dblclick(function(){
        $("#dim").show();
        $(".editor.text > p").text($(this).attr("id"));
        $(".editor.text > input[type=text]").val($(this).text());
        $(".editor.text").show();
    });
    $(".field.num").dblclick(function(){
        $("#dim").show();
        $(".editor.num > p").text($(this).attr("id"));
        $(".editor.num > input[type=number]").val($(this).text());
        $(".editor.num").show();
    });
    $(".editor > input[type=submit]").click(function(){
        $(this).parent(".editor").hide();
        let editedKey = $(this).parent(".editor").children("p").text();
        let userInput = $(this).parent(".editor").children(".userInput").val();
        $.get(`http://129.21.148.160:4461/updatedata/${thisUid}?key=${editedKey}&value=${userInput}`, function(data, status){
            updateCharData(thisUid);
        });
        $("#dim").hide();
    });
    $(".editor > input[value=Cancel]").click(function(){
        $(this).parent(".editor").hide();
        $("#dim").hide();
    });
});

function updateCharData(uid) {
    $.get("http://129.21.148.160:4461/characterData/"+uid, function(data, status){
        if (status == "success") {
            characterData = JSON.parse(data);
            for (let key in characterData) {
                if (key != "key") {
                    $("#"+key).text(characterData[key]);
                }
            }
        } else {alert("Request failed.");}
    });
}