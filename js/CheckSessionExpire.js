$(document).ready(function () {
    $(document).userTimeout({
        logouturl: 'LoginPage.aspx',
        session: 1020000,
        notify: false
    });
    $($('.mainLink')[3]).removeClass('active').addClass('d-none');
});
