$(document).ready(function(){
    $("#cscharacterSelection").hide();
    
    $("#cskeyButton").click(function(){
        $.get("http://129.21.148.160:4461/checkkey/"+$("#cskey").val(), function(data, status){
            if (status == "success") {
                if (JSON.parse(data).auth) {
                    $("#cscharacter").empty();
                    for (let i in JSON.parse(data).names) {
                        $("#cscharacter").append(`<option value='${JSON.parse(data).uids[i]}'>${JSON.parse(data).names[i]}</option>`);
                    }
                    $("#cscharacterSelection").show();
                } else {alert("Invalid key.");}
            } else {alert("Request failed.");}
        });
    });
    
    $("#cscharacterButton").click(function(){
        window.location.href = "./sheet.html?character="+$("#cscharacter").val();
    });
});