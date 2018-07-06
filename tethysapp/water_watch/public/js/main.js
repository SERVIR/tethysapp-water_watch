$(function(){
    $('#app-content-wrapper').removeClass('show-nav');
    $(".toggle-nav").removeClass('toggle-nav');
});

//Get a CSRF cookie for request
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//find if method is csrf safe
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

//add csrf token to appropriate ajax requests
$(function() {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            }
        }
    });
}); //document ready

//send data to database with error messages
function ajax_update_database(ajax_url, ajax_data) {
    //backslash at end of url is required
    if (ajax_url.substr(-1) !== "/") {
        ajax_url = ajax_url.concat("/");
    }
    //update database
    var xhr = jQuery.ajax({
        type: "POST",
        url: ajax_url,
        dataType: "json",
        data: ajax_data
    });
    xhr.done(function(data) {
        if("success" in data) {
            // console.log("success");
        } else {
            console.log(xhr.responseText);
        }
    })
    .fail(function(xhr, status, error) {
        console.log(xhr.responseText);
    });

    return xhr;
}