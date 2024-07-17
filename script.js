document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("result");
    const buttons = document.querySelectorAll(".btn");

    let expression = '';
    let memory = localStorage.getItem('memory') ? parseFloat(localStorage.getItem('memory')) : 0;

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = this.getAttribute("data-value");

            if (value === "C") {
                expression = '';
                display.value = '';
            } else if (value === "=") {
                try {
                    display.value = eval(expression);
                    expression = display.value;
                } catch {
                    display.value = "Error";
                    expression = '';
                }
            } else if (value === "M+") {
                memory += parseFloat(display.value) || 0;
                localStorage.setItem('memory', memory);
            } else if (value === "M-") {
                memory -= parseFloat(display.value) || 0;
                localStorage.setItem('memory', memory);
            } else if (value === "MC") {
                memory = 0;
                localStorage.setItem('memory', memory);
            } else {
                expression += value;
                display.value = expression;
            }
        });
    });

    document.addEventListener("keydown", function(event) {
        const key = event.key;
        if (!isNaN(key)) {
            expression += key;
            display.value = expression;
        } else {
            alert("Only numbers are allowed");
        }
    });
});
