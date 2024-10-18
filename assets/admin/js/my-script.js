// JS Confirm Box
function Confirm(title, msg, $true, $false, $link) { /*change*/
    var $content = "<div class='dialog-ovelay'>" +
        "<div class='dialog'><header>" +
        " <h3> " + title + " </h3> " +
        "<i class='fa fa-close'></i>" +
        "</header>" +
        "<div class='dialog-msg'>" +
        " <p> " + msg + " </p> " +
        "</div>" +
        "<footer>" +
        "<div class='controls'>" +
        " <button class='button button-default doAction'>" + $true + "</button> " +
        " <button class='button button-danger pull-left cancelAction'>" + $false + "</button> " +
        "</div>" +
        "</footer>" +
        "</div>" +
        "</div>";
    $('body').prepend($content);
    $('.doAction').click(function () {
        window.open($link, "_self"); /*new*/
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
            $(this).remove();
        });
    });
    $('.cancelAction, .fa-close').click(function () {
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
            $(this).remove();
        });
    });
}
// Kiểm tra Kí tự !
function checkChar(value) {
    var isValid = false;
    var regex = /[.\0\n\f\r\t\(\)\{\}\[\]\'\"\!\@\#\$\%\^\&\*\:\?\<\>\\\-\=]/;
    if (regex.test(value)) {
        isValid = true;
    }
    return isValid;
}
// Kiểm tra điện thoại !
function checkPhone(value) {
    var isValid = false;
    var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    if (!re.test(value)) {
        isValid = true;
    }/*
    else{
        if(value.length < 10 || value.length > 11)
            isValid = true;
    }*/
    return isValid;
}
// Kiểm tra Email !
function checkEmail(value) {
    var isValid = false;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    if (!re.test(value)) {
        isValid = true;
    }
    return isValid;
}
// Bỏ dấu !
function locdau(str) {
    //  var str = (document.getElementById("title").value);
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");//cắt bỏ ký tự - ở đầu và cuối chuỗi
    //     return alert("Kết Quả: "+ str);
    return str;
}

$(document).ready(function () {

    $('#Name').blur(function () {
        var str = $(this).val();
        if (str != '') {
            a = locdau(str);
            $('#NameUrl').val(a);
            $('#MetaTitle').val(str);
        }
    });

    $('#NameUrl').blur(function () {
        var str = $(this).val();
        if (str != '') {
            a = locdau(str);
            $(this).val(a);
        }
    });

/* Show Modal */
    // View Details Modal
    var placeholderElement = $('#modal-placeholder');

    $('a[data-toggle="ajax-modal"]').click(function (event) {
        var url = $(this).data('url');
        //console.log(url);
        $.get(url).done(function (data) {
            placeholderElement.html(data);
            placeholderElement.find('.modal').modal('show');
        });
    });

    // Create Data
    placeholderElement.on('click', '[data-save="modal"]', function (event) {
        event.preventDefault();

        var form = $(this).parents('.modal').find('form');
        var actionUrl = form.attr('action');
        var dataToSend = form.serialize();
        //console.log(dataToSend);

        $.post(actionUrl, dataToSend)
            .done(function (data) {

                //placeholderElement.find('.modal').modal('hide');
                var newBody = $('.modal-body', data);
                placeholderElement.find('.modal-body').replaceWith(newBody);
                try {
                    $('.select2').select2();
                }
                catch (err) {
                    console.log(err)
                }
                //$.getScript("/admin/my/my-js/add-more.js", function () { });

                // find IsValid input field and check it's value
                // if it's valid then hide modal window
                var isValid = newBody.find('[name="IsValid"]').val() == 'True';
                //console.log(isValid);
                if (isValid) {
                    placeholderElement.find('.modal').modal('hide');
                    swal("Thông Báo!", "Bạn Đã Thành Công!", "success");
                    setTimeout(function () { location.reload(); }, 1200);
                    //location.reload();
                }
                else {
                    //console.log('Lỗi');
                    console.log(isValid);
                }

            });
    });

    /*Edit From */

    placeholderElement.on('click', '[data-save="GetAll"]', function (event) {
        event.preventDefault();
        dataToSend = $(this).data('url');
        //console.log(dataToSend);


        $.get(dataToSend).done(function (data) {
            var newBody = $('.modal-dialog', data);
            //console.log(data);
            placeholderElement.find('.modal-dialog').replaceWith(newBody);
            try {
                $('.select2').select2();
            }
            catch (err) {
                console.log(err)
            }
            hienallthumb();

            /*$.getScript("/admin/my/my-js/add-more.js", function () {
                $(".keyUp").keyup(function () { this.value = this.value.toUpperCase(); });
            });*/

            //$.getScript("/js/site.js", function () { });

        });

    });
});