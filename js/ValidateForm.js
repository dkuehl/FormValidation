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
    this.matchedElements = {};
    this.invalidCount = 0;
    this.invalidElements = [];
    this.isValid = false;
};


FormValidation.prototype = {
    constructor: FormValidation,
    validate: function () {
        this.findElements();
        return this.isValid;
    },
    findElements: function () {
        //Find all elements in form, then return valid.
        var foundElements = $(this.containerElement).find('.' + this.validationClass);
        this.matchedElements = foundElements;
        for (var i = 0; i < foundElements.length; i++) {
            this.isValidElement($(foundElements[i]));
        }
    },
    isValidElement: function (element) {
        //We can check element.val,as "",0, NULL, or undefined, will be falsy.
        if(element.val()){
        	//Run through gauntlet of checks.
        }
        else if(!element.val()){
           this.showError(element);
       }
    },
    isValidEmail: function (element) {},
    showError: function(element){
        element.parents('.control-group').addClass("error");
        //If error, find correct typematch and attach eventhandler for keydown to give success if correctformat.
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