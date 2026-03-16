(function() {
    var priceEl = document.getElementById('mortPrice');
    var downEl = document.getElementById('mortDown');
    var downPctEl = document.getElementById('mortDownPct');
    var rateEl = document.getElementById('mortRate');
    var taxEl = document.getElementById('mortTax');
    var insEl = document.getElementById('mortInsurance');
    var monthlyEl = document.getElementById('mortMonthly');
    var piEl = document.getElementById('mortPI');
    var taxValEl = document.getElementById('mortTaxVal');
    var insValEl = document.getElementById('mortInsVal');
    var totalPaidEl = document.getElementById('mortTotalPaid');
    var totalIntEl = document.getElementById('mortTotalInt');
    var barEl = document.getElementById('mortBar');
    var termYears = 30;

    function fmt(n) {
        return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculate() {
        var price = parseFloat(priceEl.value) || 0;
        var down = parseFloat(downEl.value) || 0;
        var rate = parseFloat(rateEl.value) || 0;
        var taxAnnual = parseFloat(taxEl.value) || 0;
        var insAnnual = parseFloat(insEl.value) || 0;
        var P = price - down;
        if (P <= 0 || termYears <= 0) {
            monthlyEl.textContent = '--';
            piEl.textContent = '--';
            taxValEl.textContent = '--';
            insValEl.textContent = '--';
            totalPaidEl.textContent = '--';
            totalIntEl.textContent = '--';
            barEl.innerHTML = '';
            return;
        }
        var n = termYears * 12;
        var r = rate / 100 / 12;
        var M;
        if (r === 0) { M = P / n; } else { M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); }
        var taxMonth = taxAnnual / 12;
        var insMonth = insAnnual / 12;
        var total = M + taxMonth + insMonth;
        monthlyEl.textContent = fmt(total);
        piEl.textContent = fmt(M);
        taxValEl.textContent = fmt(taxMonth);
        insValEl.textContent = fmt(insMonth);
        var totalPaid = total * n;
        var totalInt = (M * n) - P;
        totalPaidEl.textContent = fmt(totalPaid);
        totalIntEl.textContent = fmt(totalInt);
        // Breakdown bar
        if (total > 0) {
            var pPct = (M / total * 100).toFixed(1);
            var tPct = (taxMonth / total * 100).toFixed(1);
            var iPct = (insMonth / total * 100).toFixed(1);
            barEl.innerHTML = '<div class="mort-bar-seg mort-bar-pi" style="width:' + pPct + '%"></div>'
                + '<div class="mort-bar-seg mort-bar-tax" style="width:' + tPct + '%"></div>'
                + '<div class="mort-bar-seg mort-bar-ins" style="width:' + iPct + '%"></div>';
        }
    }

    // Down payment sync
    var syncing = false;
    downEl.addEventListener('input', function() {
        if (syncing) return;
        syncing = true;
        var price = parseFloat(priceEl.value) || 0;
        var down = parseFloat(downEl.value) || 0;
        if (price > 0) downPctEl.value = (down / price * 100).toFixed(1);
        syncing = false;
        calculate();
    });
    downPctEl.addEventListener('input', function() {
        if (syncing) return;
        syncing = true;
        var price = parseFloat(priceEl.value) || 0;
        var pct = parseFloat(downPctEl.value) || 0;
        downEl.value = Math.round(price * pct / 100);
        syncing = false;
        calculate();
    });

    // Term buttons
    document.getElementById('mortTermBtns').addEventListener('click', function(e) {
        var btn = e.target.closest('.mort-term-btn');
        if (!btn) return;
        var btns = this.querySelectorAll('.mort-term-btn');
        for (var i = 0; i < btns.length; i++) btns[i].classList.remove('mort-term-active');
        btn.classList.add('mort-term-active');
        termYears = parseInt(btn.getAttribute('data-years'));
        calculate();
    });

    [priceEl, rateEl, taxEl, insEl].forEach(function(el) {
        el.addEventListener('input', calculate);
    });
})();
