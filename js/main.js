!function($) {
  $('select').selectBoxIt({ showFirstOption: false });
  $('.registration-types .toggle').on('click', switchForms);
  $('.fake-date-field').on('focus', enableRealDateField);
  $('.fake-date-field + input').on('blur', getBackToFakeDateField);
  $('#screen-1 form').on('submit', processDiscountForm);
  $('#screen-2 form').on('submit', goToNextBirthdayScreen);
  $('#screen-3 form').on('submit', processBirthdayForm);
  getRelevantFieldsFrom($('#content')).on('blur', removeErrorStylesFromValidFields);
  $('select').on('change', removeErrorStylesFromCustomSelectBoxes);

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

  function processDiscountForm(ev) {
    ev.preventDefault();
    if(pointFirstInvalidFieldIn($(this))) return;
  }

  function goToNextBirthdayScreen(ev) {
    ev.preventDefault();

    if(pointFirstInvalidFieldIn($(this))) return;

    $('#logo-wrapper').hide();
    $('#screen-3').addClass('active');
    $('#screen-2').removeClass('active');
    getRelevantFieldsFrom($(this))
      .each(function() {
        $(this)
          .clone()
          .attr('type', 'hidden')
          .appendTo('#screen-3 .form-body');
      });
  }

  function processBirthdayForm(ev) {
    ev.preventDefault();

    if(pointFirstInvalidFieldIn($(this))) return;
  }

  function removeErrorStylesFromValidFields() {
    var $input = $(this);
    if ($input.val()) $input.removeClass('with-error');
  }

  function removeErrorStylesFromCustomSelectBoxes() {
    var $input = $(this);

    if ($input.val() !== '0') {
      $input.next().find('.selectboxit').removeClass('with-error');
    }
  }

  function pointFirstInvalidFieldIn(form) {
    var invalidField = firstInvalidFieldIn(form), highlightableElement;

    if (!invalidField) return;

    if (invalidField.is('select')) {
      highlightableElement = invalidField.next().find('.selectboxit');
    } else {
      highlightableElement = invalidField;
    }

    invalidField.trigger('focus');
    highlightableElement.addClass('with-error');

    return true;
  }

  function firstInvalidFieldIn(form) {
    var invalidField = null;

    getRelevantFieldsFrom(form).each(function() {
      var $input = $(this);

      if (!$input.val() || $input.is('select') && $input.val() === '0') {
        invalidField = $input;
        return false;
      }
    });

    return invalidField;
  }

  function getRelevantFieldsFrom(form) {
    return form
             .find('input,select')
             .not('.fake-date-field')
             .not('[type=submit]');
  }
}(jQuery);
