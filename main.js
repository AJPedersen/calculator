$(document).ready(function(){
$('#b1').click(
    function(){
        $('#output').val($('#output').val()+$(this).val());
    }
);
});