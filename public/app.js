$(document).ready(function(){
    
    $('.modal').modal();

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

    $(document).on('click', '#open-notes', function(){
        let id = $(this).attr("data-id");
        $('.notes-save').attr('data-id', id);
        $.ajax({
            url: "/articles/"+id,
            type:"GET"
        }).then(function(res){
            console.log(res);
            $('#note-title').text(res.title);
            $('#textarea1').val(res.note.body);
            M.updateTextFields();
        })
    })

    $(document).on('click', '.notes-save', function()  {
        let id = $(this).attr("data-id");
        $.ajax({
            url:"/articles/"+id,
            type: "POST",
            data: {
                title: $('#note-title').text(),
                body: $('#textarea1').val().trim()
            }
        }).then(function(res){
            console.log(res);
        })
    })

    let modal = document.querySelector('.modal');
    M.Modal.init(modal,{
        onCloseEnd: function() {
            $('#note-title').val("");
            $('#textarea1').val("");
        } 
    })




});