$(document).on('click', "#save-article", function(){
    let id = $(this).attr("data-id");
    console.log(id);
    $.ajax({
        url: "/saved/"+ id,
        type: "PUT",
        data: id,
    }).then(function(res){
        if(res){
            $("#"+id).remove();
        }
    })
})

$(document).on('click', "#remove-article", function(){
    let id = $(this).attr("data-id");
    console.log(id);
    $.ajax({
        url: "/removed/"+ id,
        type: "PUT",
        data: id,
    }).then(function(res){
        if(res){
            $("#"+id).remove();
        }
    })
})

$(document).on('click', '#clear-articles', function(){
    $.ajax({
        url: "/articles",
        type: "DELETE"
    }).then(function(res){
        location.reload();
    })
})

$(document).on('click', '#rescrape-articles', function(){
    $.ajax({
        url:"/scrape",
        type: "GET"
    }).then(function(res){
        location.reload();
    });

})