document.querySelectorAll(".value").forEach(function(input) {
    input.addEventListener("input", function() {
        var values = document.querySelectorAll(".value");
        var numbers = [];
        values.forEach(function(value) {
            if (value.value !== "") {
                numbers.push(Number(value.value));
            }
        });

        if (numbers.length > 0) {
            var sum = numbers.reduce((a, b) => a + b, 0);
            var average = sum / numbers.length;
            var min = Math.min(...numbers);
            var max = Math.max(...numbers);

            document.getElementById("sum").textContent = sum;
            document.getElementById("average").textContent = average;
            document.getElementById("min").textContent = min;
            document.getElementById("max").textContent = max;
        } else {
            document.getElementById("sum").textContent = 0;
            document.getElementById("average").textContent = 0;
            document.getElementById("min").textContent = 0;
            document.getElementById("max").textContent = 0;
        }
    });
});
