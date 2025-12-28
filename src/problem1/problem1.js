var sum_to_n_a = function (n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function (n) {
    if (n <= 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
    return n * (n + 1) / 2;
};

console.log('Running sum_to_n_a(4):', sum_to_n_a(4));
console.log('Running sum_to_n_b(3):', sum_to_n_b(3));
console.log('Running sum_to_n_c(2):', sum_to_n_c(2));