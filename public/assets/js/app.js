function shownote(event) {
    event.preventDefault();
    var id = $(this).attr("value");
    $("#addnote").fadeIn(300).css("display", "flex");
    $("#add-note").attr("value", id);

    $.get("/note/" + id, function (data) {
        $("#article-title").text(data.title);
        $("#note-title").val(data.note.title);
        $("#note-body").val(data.note.body);
    });

};

function addnote(event) {
    event.preventDefault();
    var id = $(this).attr("value");

    var obj = {
        title: $("#note-title").val().trim(),
        body: $("#note-body").val().trim()
    };
    $.post("/note/" + id, obj, function (data) {
        window.location.href = "/";
    });
}

function changestatus() {
    var status = $(this).attr("value");
    if (status === "Saved") {
        $(this).html("Unsave");
    }
};

function changeback() {
    $(this).html($(this).attr("value"));
}

$(document).on("click", ".addnote-button", shownote);
$(document).on("click", "#add-note", addnote);
$(".status").hover(changestatus, changeback);
$("#close-note").on("click", function () {
    $("#addnote").fadeOut(300);
});
