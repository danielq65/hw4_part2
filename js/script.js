/*
File: script.js
GUI Assignment: Homework #4 Part 2
Daniel Quinonez, UMass Lowell Computer Science, daniel_quinonezrosario@student.uml.edu
Copyright (c) 2022 by Daniel. All rights reserved. May be freely copied or excerpted for educational purposes
with credit to the author.
Updated by DQ on December 23rd, 2022
*/

// add the document ready feature to make sure the page is ready to be manipulated with javascript
$(document).ready(function() {

    var $inputForm = $("#input_values");
    var $submitButton = $("#submit_button");
    var $tabButton = $("#tab_button");
    var $closeTabsButton = $("#close_tabs_button");

    // these custom handles that display the value were derived from this link https://jqueryui.com/slider/#custom-handle
    // create the slider
    var min_col_handle = $("#min_col_handle");
    $("#min_col_slider").slider({
        min: -50,
        max: 50,
        value: 0,
        create: function() {
            min_col_handle.text($(this).slider("value"));
        },
        // this is what makes the value of each input field appear on the slider as it moves
        slide: function(event, ui) {
            min_col_handle.text(ui.value);
            $("#minimum_column").val(ui.value);
        }
    });

    // this section implements the two way binding of the slider and the input field, it was modeled after the implementation
    // found at this link: https://infoheap.com/jquery-ui-slider-and-input-text-box-two-way-binding/
    var minCol_initialValue = $("#min_col_slider").slider("option", "value");
    $("#minimum_column").val(minCol_initialValue);
    $("#minimum_column").change(function() {
    //    var oldVal = $("#min_col_slider").slider("option", "value");
        var minCol_newVal = $(this).val();
        if(minCol_newVal >= -50 && minCol_newVal <= 50) {
            $("#min_col_slider").slider("option", "value", minCol_newVal);
            min_col_handle.text(minCol_newVal);
        }
    });

    var max_col_handle = $("#max_col_handle");
    $("#max_col_slider").slider({
        min: -50,
        max: 50,
        value: 0,
        create: function() {
            max_col_handle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            max_col_handle.text(ui.value);
            $("#maximum_column").val(ui.value);
        }
    });

    var maxCol_initialValue = $("#max_col_slider").slider("option", "value");
    $("#maximum_column").val(maxCol_initialValue);
    $("#maximum_column").change(function() {
    //    var oldVal = $("#max_col_slider").slider("option", "value");
        var maxCol_newVal = $(this).val();
        if(maxCol_newVal >= -50 && maxCol_newVal <= 50) {
            $("#max_col_slider").slider("option", "value", maxCol_newVal);
            max_col_handle.text(maxCol_newVal);
        }
    });

    var min_row_handle = $("#min_row_handle");
    $("#min_row_slider").slider({
        min: -50,
        max: 50,
        value: 0,
        create: function() {
            min_row_handle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            min_row_handle.text(ui.value);
            $("#minimum_row").val(ui.value);
        }
    });

    var minRow_initialValue = $("#min_row_slider").slider("option", "value");
    $("#minimum_row").val(minRow_initialValue);
    $("#minimum_row").change(function() {
    //    var oldVal = $("#min_row_slider").slider("option", "value");
        var minRow_newVal = $(this).val();
        if(minRow_newVal >= -50 && minRow_newVal <= 50) {
            $("#min_row_slider").slider("option", "value", minRow_newVal);
            min_row_handle.text(minRow_newVal);
        }
    });

    var max_row_handle = $("#max_row_handle");
    $("#max_row_slider").slider({
        min: -50,
        max: 50,
        value: 0,
        create: function() {
            max_row_handle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            max_row_handle.text(ui.value);
            $("#maximum_row").val(ui.value);
        }
    });

    var maxRow_initialValue = $("#max_row_slider").slider("option", "value");
    $("#maximum_row").val(maxRow_initialValue);
    $("#maximum_row").change(function() {
    //    var oldVal = $("#max_row_slider").slider("option", "value");
        var maxRow_newVal = $(this).val();
        if(maxRow_newVal >= -50 && maxRow_newVal <= 50) {
            $("#max_row_slider").slider("option", "value", maxRow_newVal);
            max_row_handle.text(maxRow_newVal);
        }
    });

    // These two custom methods are modeled after the method created by the user RobJohnston at this github link:
    // https://github.com/jquery-validation/jquery-validation/issues/2030#issuecomment-328132469
    // the purpose of the method is to enable us to validate whether the maximum column and row values are greater
    // than or equal to the minimum values
    $.validator.addMethod("greaterThanEqualTo", function (value, element, param) {
        var target = $(param);
    
        if (this.settings.onfocusout && target.not(".validate-greaterThanEqualTo-blur").length) {
            target.addClass("validate-greaterThanEqualTo-blur").on("blur.validate-greaterThanEqualTo", function () {
                $(element).valid();
            });
        }

        return value >= target.val();
    }, "Please enter a value greater than or equal to the minimum");

    // the validation form below is based off of the webucator video found at the home page of https://jqueryvalidation.org/
    $inputForm.validate({
        rules:{
            minimum_column:{
                required: true,
                range:[-50,50]
            },
            maximum_column:{
                required: true,
                range:[-50,50],
                greaterThanEqualTo: minimum_column
            },
            minimum_row:{
                required: true,
                range:[-50,50]
            },
            maximum_row:{
                required: true,
                range:[-50,50],
                greaterThanEqualTo: minimum_row
            }
        },
        messages:{
            minimum_column:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50"
            },
            maximum_column:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50",
                greaterThanEqualTo: "Please enter a value that is greater than or equal to the minimum column value"
            },
            minimum_row:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50"
            },
            maximum_row:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50",
                greaterThanEqualTo: "Please enter a value that is greater than or equal to the minimum row value"
            }
        }
    });
    
    // this click event is triggered whenever the Generate Table button is pressed, it is where we check to see if 
    // the form validated successfully so we can build the table
    $submitButton.click(function() {
        // console.log($inputForm.valid());
        // if all validations are passed, then build the table
        if($inputForm.valid()) {
            let min_col = document.getElementById("minimum_column").value;
            let max_col = document.getElementById("maximum_column").value;
            let min_row = document.getElementById("minimum_row").value;
            let max_row = document.getElementById("maximum_row").value;
        
            var output = "<div id='my_table'><table>";
            var first_row = 1;

            // this loop handles the actual generation of my multiplication table
            for(i = min_row - 1; i <= max_row; i++) {
                output += "<tr>";
                
                // handles the creation of every row after the first row
                if(first_row == 0) {
                    output += "<th class='table_header first_column'>" + i + "</th>";

                    for(j = min_col; j <= max_col; j++) {
                        output += "<td class='table_cell'>" + (i * j) + "</td>";
                    }
                }
                
                // handles the creation of first row
                if(first_row == 1) {
                    output += "<th class='first_cell'></th>";

                    for(j = min_col; j <= max_col; j++) {
                        output += "<th class='table_header first_row'>" + j + "</th>";
                    }

                    first_row = 0;
                }

                output += "</tr>";
            }
            
            output += "</table></div>";
            document.getElementById("mult_table").innerHTML = output;
        }
    });

    // make the myTabs div an actual tabs div
    $(function() {
        $("#myTabs").tabs();
    });

    // This section is still a work in progress, I have not gotten the tabs feature to work correctly
    // generate tab containing table
    $tabButton.click(function() {
        // make sure the tab only generates when the form validates successfully
        if($inputForm.valid()) {
            let min_col = document.getElementById("minimum_column").value;
            let max_col = document.getElementById("maximum_column").value;
            let min_row = document.getElementById("minimum_row").value;
            let max_row = document.getElementById("maximum_row").value;
            
            var tab_output = "<li><a href='#my_table'>" + min_col + " " + max_col + " " + min_row + " " + max_row;
            tab_output += "</a></li>";

            $("#tab").html(tab_output);
        }
    });
});
