function CheckValidEmail(email) {
    if (email != '') {
        let filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (filter.test(email) !== true) {
            swal("", "Email Address is required / Phải nhập địa chỉ Email", "warning");
            return false;
        } else {
            return true;
        }
    }
    else {
        swal("", "Email Address is required / Phải nhập địa chỉ Email", "warning");
        return false;
    }
}
$("#footerSignUpForm").on("submit", function () {
    let inputEmail = $("#footerSignUpEmail");
    let inputVal = inputEmail.val();
    let check = CheckValidEmail(inputVal);
    if (check === true) {
        swal("Waiting! Please wait a moment", { button: false, closeOnClickOutside: false });
        $.ajax({
            type: "POST",
            url: $("#footerSignUpForm").attr('action'),
            data: { email: inputVal },
            success: function (response) {
                if (response.status === true) {
                    swal("Ok", "Đã nhận thông tin của bạn !", "success");
                } else {
                    swal("Error", response.status, "error");
                }

            },
            error: function (response) {
                swal("Error", "Chưa thể nhận thông tin", "error");
            }
        });
    }
})

$('#footerSignUpSubmit').on('click', function () {
    let inputEmail = $("#footerSignUpEmail");
    let inputVal = inputEmail.val();
    let check = CheckValidEmail(inputVal);
    if (check === true) {
        swal("Waiting! Please wait a moment", { button: false, closeOnClickOutside: false });
        $.ajax({
            type: "POST",
            url: $("#footerSignUpForm").attr('action'),
            data: { email: inputVal },
            success: function (response) {
                if (response.status === true) {
                    swal("Ok", "Đã nhận thông tin của bạn !", "success");
                    inputEmail.val('');
                } else {
                    swal("Error", response.status, "error");
                }
                
            },
            error: function (response) {
                swal("Error", "Chưa thể nhận thông tin", "error");
            }
        });
    }
});

$('#footerSignUpSubmitNeo').on('click', function () {
    let inputEmail = $("#footerSignUpEmailNeo");
    let inputVal = inputEmail.val();
    let check = CheckValidEmail(inputVal);
    if (check === true) {
        swal("Waiting! Please wait a moment", { button: false, closeOnClickOutside: false });
        $.ajax({
            type: "POST",
            url: $("#footerSignUpFormNeo").attr('action'),
            data: { email: inputVal },
            success: function (response) {
                if (response.status === true) {
                    swal("Ok", "Đã nhận thông tin của bạn !", "success");
                    inputEmail.val('');
                } else {
                    swal("Error", response.status, "error");
                }

            },
            error: function (response) {
                swal("Error", "Chưa thể nhận thông tin", "error");
            }
        });
    }
});

