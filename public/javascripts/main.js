
$(document).ready(function(){
$("#baloon").click(function(){
    $("#settings").toggle();
});
$(".dash_img").click(function(event){
    console.log($(this).attr('src'))
});
});



$(document).ready(function () {
    $('.delete-footer').on('click',function (e) {
        $target = $(e.target);
        const address = $target.attr('data-url');
        alert(1234)
        $.ajax({
            type:'DELETE',
            url:address,
            success:function (response) {
                alert('deleting your information...');
                window.location.href = '/dashboard'
            },
            error:function (err) {
                console.log(err)
            }
        })
        // console.log(url)
        // alert('You sure you want to delete this OLT')
       
    });
});