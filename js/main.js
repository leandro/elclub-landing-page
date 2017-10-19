!function($) {
  $('select').selectBoxIt({ showFirstOption: false });
  $('.registration-types .toggle').on('click', switchForms);
  $('.fake-date-field').on('focus', enableRealDateField);
  $('.fake-date-field + input').on('blur', getBackToFakeDateField);

  function switchForms(ev) {
    var $self = $(this), nextScreen;
    ev.preventDefault();

    if (!(nextScreen = $self.data('goto'))) return;
    $self.closest('.active').removeClass('active');
    $('#' + nextScreen).addClass('active');
  }

  function enableRealDateField(ev) {
    ev.preventDefault();
    $(this).attr('disabled', true);
    $(this).next().trigger('focus');
  }

  function getBackToFakeDateField(ev) {
    var $dateField = $(this);
    if (!$dateField.val()) $dateField.prev().removeAttr('disabled');
  }
}(jQuery);
