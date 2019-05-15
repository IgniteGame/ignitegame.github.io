$(function() {
  $('.tracker-range').change(function() {
    $(this).prev().html($(this).val() );
  });
  $('#reset-btn-0').click(function() {
    $('.tracker-range').val(0).change();
  });
  $('#reset-btn-2').click(function() {
    $('.tracker-range').val(2).change();
  });
});