/**
 * Validate form and attach active validation to elements
 * @param {Object} options
 * @param {String} containerElement Selector for containing element.
 * @param {String} validationClass jQuery selector, which class for elements to be validated.
 * @param {String} errorClass Class to attach when match isn't found.
 * @param {Object} matchedElements Holds all matched elements.
 * @param {Number} invalidCount Holds the count for amount of invalid elements.
 * @param {Array} invalidElements Array of all invalid elements.
 * @param {Bool} isValid Determines if the form is valid or not.
 */
var FormValidation = function (options) {		
    this.containerElement = options.containerElement;
    this.validationClass = options.validationClass;
    this.errorClass = options.errorClass;
    this.errorMsg = options.errorMsg;
    this.MatchedElements = {};
    this.invalidCount = 0;
    this.invalidElements = [];
    this.isValid = false;
}

FormValidation.prototype = {
    constructor: FormValidation,
    validate: function () {
        this.findElements();
        return this.isValid;
    },
    findElements: function () {
        //Find all elements in form, then return valid.
        var foundElements = $(this.containerElement).find('.validate');
        this.MatchedElements = foundElements;
        for (var i = 0; i < foundElements.length; i++) {
            this.isValidElement($(foundElements[i]));
        }
    },
   isValidElement: function (element) {
        //We can check element.val,as "",0, NULL, or undefined, will be falsy.
        this.checkType(element);
        if (element.val()) {
            this.checkType(element);
        } else if (!element.val()) {
            this.showError(element);
        }
    },
    checkType: function (element) {
        //console.log('element type', element.attr("type"));
        var elementType = element.attr("type");
        if (elementType.toLowerCase() === "email") {
            this.isValidEmail(element);
        }
    },    
    isValidEmail: function (element) {
        var isMatched = element.val().match(element.val(), /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!isMatched[0]) {
            this.showError(element, "Invalid Email");
        } else if (isMatched[0]) {
            this.removeError(element);
        }
    },
    showError: function (element, customMessage) {
        var elementParent = element.parents(".control-group"),
            message = customMessage || this.errorMsg;
        if (!elementParent.hasClass("error")) {
            var newElement = $(document.createElement("span"))
                .addClass(this.errorClass)
                .text(message);
            element.parents('.control-group')
                .addClass("error")
                .append(newElement);
        }

        //TODO: If error, find correct type; match and attach eventhandler for keydown to give success indicator.
    }

};

/*
	Below code for use testing
 
$('#test').on('click', function () {
    var x = Validation.validate();   
});

var myOptions = {
    validationClass: "validate",
    errorClass: "errorMsg",
    containerElement: "#myForm"
};
var Validation = new FormValidation(myOptions);

*/
