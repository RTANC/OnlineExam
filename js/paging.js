(function ($) {

    $.fn.paging = function () {
        var tbl = this;
        this.next().remove();
        var totalRow = $($(tbl.children())[1]).children().length;
        var limit = 5;
        var currPage = 1;
        if (totalRow > limit) {
            var startRow = 0;
            var endRow = (startRow + limit) - 1;
            var numPage = Math.ceil(totalRow / limit);
            var page_nav = $('<ul>').addClass('pagination flex-wrap');
            page_nav.append($('<li>').addClass('page-item').append($('<a>', { text: 'ก่อนหน้า', href: '#!' }).addClass('page-link').click(function () {
                --currPage;
                changePage();
            })).addClass('disabled'));
            for (var i = 0; i < numPage; i++) {
                var li = $('<li>').addClass('page-item').append($('<a>', { text: i + 1, href: '#!' }).addClass('page-link').click(function () {
                    currPage = $(this).text();
                    changePage();
                }));
                page_nav.append(li);
            }
            page_nav.append($('<li>').addClass('page-item').append($('<a>', { text: 'ถัดไป', href: '#!' }).addClass('page-link').click(function () {
                ++currPage;
                changePage();
            })));

            function changePage() {
                startRow = (currPage * limit) - limit;
                endRow = (startRow + limit) - 1;
                page_nav.children().removeClass('disabled active2');
                if (currPage == 1) {
                    //First Page
                    $($(page_nav.children())[0]).addClass('disabled');
                    $($(page_nav.children())[1]).addClass('active2');
                } else if (currPage == numPage) {
                    //Last Page
                    page_nav.children().last().addClass('disabled');
                    $($(page_nav.children())[numPage]).addClass('active2');
                } else {
                    $($(page_nav.children())[currPage]).addClass('active2');
                }
                tbl.find('tbody > tr:lt(' + startRow + ')').hide();
                tbl.find('tbody > tr:eq(' + startRow + ')').show();
                tbl.find('tbody > tr:gt(' + startRow + ')').show();
                tbl.find('tbody > tr:gt(' + endRow + ')').hide();
            }
            //Intitial
            $($(page_nav.children())[0]).addClass('disabled');
            $($(page_nav.children())[1]).addClass('active2');
            tbl.find('tbody > tr:gt(' + endRow + ')').hide();

            this.after(page_nav);
        }
        return this;
    };

}(jQuery));