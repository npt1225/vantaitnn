var checkMailContact = false;
var checkCompanyContact = false;
var checkPhoneContact = false;
var checkMessageContact = false;
var checkLocationContact = true;

function sendMessageInit() {
    /* Check Company Name */
    var company = $("#Name").val();
    if (company != '') {
        if (checkChar(company)) {
            swal("", "Name has an invalid character / Có kí tự không hợp lệ", "warning");
            $("#Name").focus();
            return false;
        }
        else {
            checkCompanyContact = true;
        }
    }
    else {
        swal("","Name is required / Phải nhập tên Công ty hoặc họ tên bạn","warning");
        $("#Name").focus();
        return false;
    }

    /* Check Email */
    var email = $("#Email").val();
    if (email != '') {
        if (checkEmail(email)) {
            swal("", "Email Address has an invalid / Địa chỉ Email không hợp lệ", "warning");
            $("#Email").focus();
            return false;
        }
        else {
            checkMailContact = true;
        }
    }
    else {
        swal("","Email Address is required / Phải nhập địa chỉ Email", "warning");
        $("#Email").focus();
        return false;
    }

    /* Check Phone */
    var phone = $("#Phone").val();
    if (phone != '') {
        if (checkPhone(phone)) {
            swal("", "Your phone is invalid / Số điện thoại không hợp lệ", "warning");
            $("#Phone").focus();
            return false;
        }
        else {
            checkPhoneContact = true;
        }
    }
    else {
        swal("", "Phone is required / Phải nhập số điện thoại", "warning");
        $("#Phone").focus();
        return false;
    }

    /* Check location */
    var location = $("#Location").val();
    if (location != '') {
        if (checkChar(location)) {
            swal("", "Your location has invalid character / Địa chỉ có kí tự không hợp lệ", "warning");
            $("#Location").focus();
            checkLocationContact = false;
            return false;
        }
    }

    /* Check Message */
    var message = $("#Content").val();
    if (message != '') {
        if (checkChar(message)) {
            swal("", "Your Message has invalid character / Tin nhắn của bạn có kí tự không hợp lệ", "warning");
            $("#Content").focus();
            return false;
        }
        else {
            checkMessageContact = true;
        }
    }
    else {
        swal("", "Your Message is required / Vui lòng nhập tin nhắn", "warning");
        $("#Content").focus();
        return false;
    }

    if (checkMailContact == true && checkPhoneContact == true && checkCompanyContact == true && checkMessageContact == true && checkLocationContact == true)
        return true;
    else
        return false;
}

function sendMessage() {
    var checkOk = sendMessageInit();
    if(checkOk == true)
    {
        $.ajax({
            type: 'post',
            url: $(".reply-form").attr('action'),
            data: $(".reply-form").serialize(),
            dataType: 'json',
            beforeSend: function () {
                $('#success').html('<img width="25px" src="/img/wait.gif">');
                $('#btn-send-contact').hide();
            },
            success: function (response) {
                setTimeout(function () {
                    $('#success').html('');
                    swal("Ok","Đã nhận thông tin của bạn !","success");
                    $(".reply-form")[0].reset();
                    $('#btn-send-contact').show();
                }, 2000)
            },
            error: function (response) {
                setTimeout(function () {
                    swal("Error", "Chưa thể nhận thông tin", "error");
                    $('#btn-send-contact').show();
                }, 2000)
            }
        });
    }
}

function sendMessageFAQ() {
    /* Check Company Name */
    var company = $("#modal_name").val();
    if (company != '') {
        if (checkChar(company)) {
            swal("", "Name has an invalid character / Có kí tự không hợp lệ", "warning");
            $("#modal_name").focus();
            return false;
        }
        else {
            checkCompanyContact = true;
            $("#faq_name").val(company);
        }
    }
    else {
        swal("", "Name is required / Phải nhập tên Công ty hoặc họ tên bạn", "warning");
        $("#modal_name").focus();
        return false;
    }

    /* Check Email */
    var email = $("#modal_email").val();
    if (email != '') {
        if (checkEmail(email)) {
            swal("", "Email Address has an invalid / Địa chỉ Email không hợp lệ", "warning");
            $("#modal_email").focus();
            return false;
        }
        else {
            checkMailContact = true;
            $("#faq_email").val(email);
        }
    }
    else {
        swal("", "Email Address is required / Phải nhập địa chỉ Email", "warning");
        $("#modal_email").focus();
        return false;
    }

    /* Check Phone */
    var phone = $("#modal_phone").val();
    if (phone != '') {
        if (checkPhone(phone)) {
            swal("", "Your phone is invalid / Số điện thoại không hợp lệ", "warning");
            $("#modal_phone").focus();
            return false;
        }
        else {
            checkPhoneContact = true;
            $("#faq_phone").val(phone);
        }
    }
    else {
        swal("", "Phone is required / Phải nhập số điện thoại", "warning");
        $("#modal_phone").focus();
        return false;
    }

    /* Check Message */
    var message = $("#faq_content").val();
    if (message != '') {
        if (checkChar(message)) {
            swal("", "Your Message has invalid character / Tin nhắn của bạn có kí tự không hợp lệ", "warning");
            $("#faq_content").focus();
            return false;
        }
        else {
            checkMessageContact = true;
            var _mes = "Câu hỏi từ FAQ của khách: ";
            message = _mes + message;
            $("#faq_content").val(message);
        }
    }
    else {
        swal("", "Your Message is required / Vui lòng nhập tin nhắn", "warning");
        $("#faq_content").focus();
        return false;
    }

    if (checkMailContact == true && checkPhoneContact == true && checkCompanyContact == true && checkMessageContact == true)
        return true;
    else
        return false;
}

$(function()
{
    /* Xử lý onClick */
    $('#faq_send').click(function (e) {
        e.preventDefault();
        var checkOk = sendMessageFAQ();
        if (checkOk == true) {

            //$form = $("#faq_form");

            $.ajax({
                type: "POST",
                url: $("#faq_form").attr('action'),
                data: $("#faq_form").serialize(),
                dataType: 'json',
                success: function (response) {
                    swal("Ok", "Đã nhận thông tin của bạn !", "success");
                    $("#faq_form")[0].reset();
                },
                error: function (response) {
                    swal("Error", "Chưa thể nhận thông tin", "error");
                }
            });
        }
    });
});