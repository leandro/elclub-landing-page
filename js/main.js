!function($) {
  $('select').selectBoxIt({ showFirstOption: false });
  $('button[data-goto]').on('click', switchForms);
  $('.fake-date-field').on('focus', enableRealDateField);
  $('.fake-date-field + input').on('blur', getBackToFakeDateField);
  $('#screen-1 form').on('submit', processDiscountForm);
  $('#screen-2 form').on('submit', goToNextBirthdayScreen);
  $('#screen-3 form').on('submit', processBirthdayForm);
  getRelevantFieldsFrom($('#content')).on('blur', removeErrorStylesFromValidFields);
  $('select').on('change', removeErrorStylesFromCustomSelectBoxes);
  $('#terms-acceptance :checkbox').on('change', removeErrorStylesFromTermsCheckbox);

  function switchForms(ev) {
    var $self = $(this), nextScreen;
    ev.preventDefault();

    if (!(nextScreen = $self.data('goto'))) return;
    $self.closest('.active').removeClass('active');
    $('#' + nextScreen).addClass('active');

    // it doesn't reset the form if an error occurred
    if ($self.is('js-reset-form') && !$self.parent().prevAll('.msg-error .active').length) {
      $('#' + nextScreen).find('form').trigger('reset');
    }
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
    makeAsyncRequest($(this), 'screen-4');
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
    $('#terms-acceptance input[type=hidden]').attr('disabled', true);
    makeAsyncRequest($(this), 'screen-4');
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

  function removeErrorStylesFromTermsCheckbox() {
    var $input = $(this);

    if ($input.is(':checked')) {
      $input.closest('span').removeClass('with-error');
    }
  }

  function makeAsyncRequest(form, nextScreen) {
    var responseHandler = asyncResponseHandler(form, nextScreen);

    $.ajax({
      url: form.attr('action'),
      data: form.serialize(),
      type: 'GET',
      dataType: 'json'
    })
      .done(responseHandler)
      .fail(responseHandler);
  }

  function asyncResponseHandler(form, nextScreen) {
    return function (data) {
      var msgId, screenEl = form.closest('.screen-item');
      var msgMaps = { "screen-1": "discount", "screen-3": "birthday" };
      nextScreen = $('#' + nextScreen);

      $('#screen-4 .msg').removeClass('active')

      if (data.success) {
        msgId = '#' + msgMaps[screenEl.attr('id')] + '-success';
      } else if (data.error) {
        msgId = '#custom-error';
        $(msgId).text(data.error);
      } else {
        msgId = '#generic-error';
      }

      $(msgId).addClass('active');
      screenEl.removeClass('active');
      nextScreen.addClass('active')
    }
  }

  function pointFirstInvalidFieldIn(form) {
    var invalidField = firstInvalidFieldIn(form), highlightableElement;

    if (!invalidField) return;

    if (invalidField.is('select')) {
      highlightableElement = invalidField.next().find('.selectboxit');
    } else if (invalidField.is(':checkbox')) {
      highlightableElement = invalidField.closest('span');
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

      if (!$input.val() ||
          ($input.is('select') && $input.val() === '0') ||
          ($input.attr('name') === 'accept_terms' && !$input.is(':checked'))) {
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
