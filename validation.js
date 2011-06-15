(function() {
  $(document).ready(function() {
    /*
      RegEx
      */    var addErrorStyle, allinputs, choices, code, codes, email, emailRegEx, emails, emptyRegEx, input, inputs, number, numberRegEx, numbers, postalCodeRegEx, removeErrorStyle, select, selects, validateChoiceSelect, validateForm, validateInputs, validateSelect, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _m, _n;
    emailRegEx = new RegExp("^[-_.a-z0-9]+@[-_a-z0-9]+\.[a-z]{2,4}$");
    emptyRegEx = new RegExp("[-_.a-zA-Z0-9]{3,}");
    numberRegEx = new RegExp("^[0-9]{3,}$");
    postalCodeRegEx = new RegExp("^[A-Z]{1}[0-9]{1}[A-Z]{1} [0-9]{1}[A-Z]{1}[0-9]{1}");
    /*
      Arrays of inputs, by types
      */
    inputs = [];
    emails = [];
    codes = [];
    selects = [];
    choices = [$("#premier-choix"), $("#deuxieme-choix"), $("#troisieme-choix"), $("#quatrieme-choix")];
    numbers = [];
    /*
      Fetching and sorting all form inputs
      */
    allinputs = $(".validate").filter(":input");
    for (_i = 0, _len = allinputs.length; _i < _len; _i++) {
      input = allinputs[_i];
      if ($(input).hasClass("text")) {
        inputs.push($(input));
      }
      if ($(input).hasClass("email")) {
        emails.push($(input));
      }
      if ($(input).hasClass("code")) {
        codes.push($(input));
      }
      if ($(input).hasClass("select")) {
        selects.push($(input));
      }
      if ($(input).hasClass("number")) {
        numbers.push($(input));
      }
    }
    /*
      Inputs onblur validation
      */
    for (_j = 0, _len2 = inputs.length; _j < _len2; _j++) {
      input = inputs[_j];
      input.blur(function() {
        return validateInputs($(this), emptyRegEx);
      });
    }
    /*
      Email onblur validation
      */
    for (_k = 0, _len3 = emails.length; _k < _len3; _k++) {
      email = emails[_k];
      email.blur(function() {
        return validateInputs($(this), emailRegEx);
      });
    }
    /*
      Postal Code onblur validation
      */
    for (_l = 0, _len4 = codes.length; _l < _len4; _l++) {
      code = codes[_l];
      code.blur(function() {
        return validateInputs($(this), postalCodeRegEx);
      });
    }
    /*
      Selects onchange validation
      */
    for (_m = 0, _len5 = selects.length; _m < _len5; _m++) {
      select = selects[_m];
      select.change(function() {
        return validateSelect($(this));
      });
    }
    /*
      Numbers onblur validation
      */
    for (_n = 0, _len6 = numbers.length; _n < _len6; _n++) {
      number = numbers[_n];
      number.blur(function() {
        return validateInputs($(this), numberRegEx);
      });
    }
    validateForm = function() {
      var badFields, valid;
      $.extend(badFields = [], validateInputs(inputs, emptyRegEx), validateInputs(emails, emailRegEx), validateInputs(codes, postalCodeRegEx), validateSelect(selects), validateInputs(numbers, numberRegEx), validateChoiceSelect(choices));
      if (badFields.length === 0) {
        valid = true;
      } else {
        valid = false;
      }
      return valid;
    };
    validateInputs = function(inputs, regex) {
      var error, input, _len7, _o;
      error = [];
      for (_o = 0, _len7 = inputs.length; _o < _len7; _o++) {
        input = inputs[_o];
        if (regex.test($(input).val())) {
          removeErrorStyle(input);
        } else {
          error.push($(input).attr("id"));
          addErrorStyle(input);
        }
      }
      return error;
    };
    validateSelect = function(selects) {
      var error, select, _len7, _o;
      error = [];
      for (_o = 0, _len7 = selects.length; _o < _len7; _o++) {
        select = selects[_o];
        if ($(select).val() !== "0") {
          removeErrorStyle(select);
        } else {
          error.push($(select).attr("id"));
          addErrorStyle(select);
        }
      }
      return error;
    };
    validateChoiceSelect = function(choices) {
      var choice, current, error, verif, _len7, _len8, _o, _p;
      error = [];
      for (_o = 0, _len7 = choices.length; _o < _len7; _o++) {
        choice = choices[_o];
        current = choice;
        for (_p = 0, _len8 = choices.length; _p < _len8; _p++) {
          verif = choices[_p];
          if ($(current).attr("id") === $(verif).attr("id") || $(current).val() !== $(verif).val()) {} else {
            error.push($(current).attr("id"));
            $("#error-choice").html(errorMessages['choices']);
          }
        }
      }
      if (error.length === 0) {
        $("#error-choice").html("");
      }
      return error;
    };
    /*
      Error Styling, I changed the border of the input and put an error message within a span in the label of the same input, it's opt to you.
      */
    addErrorStyle = function(element) {
      $(element).addClass('form-error');
      return $(element).prev('label').find('.error-message').html(errorMessages[$(element).attr("id")]);
    };
    removeErrorStyle = function(element) {
      $(element).removeClass('form-error');
      return $(element).prev('label').find('.error-message').html("");
    };
    return $('.validate-form').submit(function() {
      return validateForm();
    });
  });
}).call(this);