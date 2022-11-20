document.body.style.height = '300px';
document.body.style.width = '300px';
document.getElementById("firstform").addEventListener("submit", myFunction);
document.getElementById("secondform").addEventListener("submit", calcCurrency);
abrev_to_unit = {"ft": "meters", "feet": "meters", "m": "feet", "metres": "feet", "meters": "feet", "yds": "meters", "yards": "meters", "pounds": "kg", 
"lbs": "kg", "lb": "kg", "kg": "lbs", "kgs": "lbs", "kilos": "lbs", "kilograms": "lbs", "inch": "cm", "inches": "cm", "cm": "inches", "centimer": "inches", "centimers": "inches", "F": "\u00B0 C", "C": "\u00B0 F", "kilometer": "miles", "kilometers": "miles", 
"km":"miles", "mile": "km", "miles": "km", "mi": "km", "ounce": "g", "ounces": "g", "oz": "g", "gram": "oz", "grams": "oz", "g": "oz", "square feet": "m\u00B2", "sq ft": "m\u00B2", "ft^2": "m\u00B2", "square meters": "ft\u00B2", "sq m": "ft\u00B2", "m^2": "ft\u00B2", "acres": "hectares", "hectares": "acres", "acre": "hectares", "hectare": "acres",
"square kilometers": "mi\u00B2", "sq km": "mi\u00B2", "km^2": "mi\u00B2", "square miles": "km\u00B2", "sq mi": "km\u00B2", "mi^2": "km\u00B2", "miles per hour": "km/h", "mph": "km/h", "kilometers per hour": "mph", "km/h": "mph", "gallon": "liters", "gallons": "liters", "gal": "liters", "l": "gallons", "liter": "gallons", "liters": "gallons", 
"fluid ounces": "ml", "fl oz": "ml", "milliliter": "fl oz", "milliliters": "fl oz", "ml": "fl oz", "quart": "liters", "quarts": "liters", "cup": "ml", "cups": "ml", "teaspoon": "ml", "teaspoons": "ml", "tsp": "ml", "tablespoon": "ml", "tablespoons": "ml", "tbsp": "ml"};
abrev_to_conv = {"ft": 0.3048, "feet": 0.3048, "m": 3.28084, "meters": 3.28084, "metres": 3.28084, "yds": 0.9144, 
"yards": 0.9144, "pounds": 0.453592, "lbs": 0.453592, "lb": 0.453592, "kg": 2.20462, "kgs": 2.20462, "kilos": 2.20462, "kilograms": 2.20462, "inch": 2.54, "inches": 2.54, "cm": 0.393701, "centimer": 0.393701, "centimers": 0.393701, "F": 5.0/9, "C": 9.0/5, "kilometer": 0.621371, 
"kilometers": 0.621371, "km": 0.621371, "mile": 1.60934, "miles": 1.60934, "mi": 1.60934, "ounce": 28.3495, "ounces": 28.3495, "oz": 28.3495, "gram": 0.035274, "grams": 0.035274, "g": 0.035274, "square feet": 0.092903, "sq ft": 0.092903, "ft^2": 0.092903, "square meters": 10.7639, "sq m": 10.7639, "m^2": 10.7639,
"hectares": 2.47105, "acres": 0.404686, "hectare": 2.47105, "acre": 0.404686, "square kilometers": 0.386102, "sq km": 0.386102, "km^2": 0.386102, "square miles": 2.58999, "sq mi": 2.58999, "mi^2": 2.58999, "miles per hour": 1.60934, "mph": 1.60934, "kilometers per hour": 0.621371, "km/h": 0.621371, "gallon": 3.78541, "gallons": 3.78541, "gal": 3.78541, 
"l": 0.264172, "liter": 0.264172, "liters": 0.264172, "fluid ounces": 29.5735, "fl oz": 29.5735, "milliliter": 0.033814, "milliliters": 0.033814, "ml": 0.033814, "quart": 0.946353, "quarts": 0.946353, "cup": 240, "cups": 240, "teaspoon": 4.92892, "teaspoons": 4.92892, "tsp": 4.92892, "tablespoon": 14.7868, "tablespoons": 14.7868, "tbsp": 14.7868};

$(document).ready(function () {
    $("select").select2();
});

function myFunction(event) {
        event.preventDefault();
        mes_value = document.getElementById('units').value
        word_array = mes_value.split(" ")
        if(word_array.length == 1) {
            mystring = word_array[0]
            i = 0;
            while(i < mystring.length && !isLetter(mystring.charAt(i))) {
                i++;
            }
            if(i == mystring.length) {
                document.getElementById("result").innerHTML = "ERROR: UNITS NOT RECOGNIZED";
                return;
            } else if(i == 0) {
                document.getElementById("result").innerHTML = "ERROR: INVALID NUMBER"
                return;
            }
            quantity = mystring.substring(0, i)
            units = mystring.substring(i, mystring.length)
        } else {
            units = word_array[1]
            quantity = word_array[0]
        }
        if(word_array.length > 2) {
            units = units + " " + word_array[2];
        }
        if(!(units in abrev_to_conv)) {
            document.getElementById("result").innerHTML = "ERROR: UNITS NOT RECOGNIZED";
            return;
        }
        if(isNaN(quantity)) {
            document.getElementById("result").innerHTML = "ERROR: INVALID NUMBER"
            return;
        }
        if(units == "F") {
            quantity = quantity - 32;
        } else if(units == "C") {
            quantity = parseFloat(quantity) + (32 * 5.0/9);
        }
        convert_constant = abrev_to_conv[units]
        units = abrev_to_unit[units]
        quantity = (quantity * convert_constant).toFixed(3)
        document.getElementById("result").innerHTML = quantity + " " + units
}

function calcCurrency(event) {
    event.preventDefault();
    fromCur = document.getElementById('from').value
    toCur = document.getElementById('to').value
    quantity = document.getElementById('currency').value
    if(isNaN(quantity)) {
        document.getElementById("result").innerHTML = "ERROR: INVALID NUMBER"
        return;
    }
    var myHeaders = new Headers();
    myHeaders.append("apikey", "5Tlzbw4OPU2ijjdzraL8Tr7ehi8p1Pg8");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    fetch("https://api.apilayer.com/exchangerates_data/convert?to=" + toCur + "&from=" + fromCur + "&amount=" + quantity, requestOptions)
      .then(response => response.text())
      .then(result => appendRes(result, toCur))
      .catch(error => console.log('error', error));
}




function appendRes(result, curUnits) {
    index = result.search("result")
    ss = result.substring(index + 8, result.length - 2)
    document.getElementById("result").innerHTML = parseFloat(ss).toFixed(2) + " " + curUnits
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }
