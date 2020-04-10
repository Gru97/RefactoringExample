

function plainTextStatement(invoice, plays) {

    return renderPlainTextStatement(createStatementData(invoice, plays));
}

function htmlTextStatement(invoice, plays) {

    return renderHtmlStatement(createStatementData(invoice, plays));
}

function createStatementData(invoice, plays) {
    const statmentData = {};
    statmentData.customer = invoice.customer;
    statmentData.performances = invoice.performances.map(enrichPerformance);
    statmentData.totalAmount = totalAmount(statmentData);
    statmentData.totalValumeCredits = totalValumeCredits(statmentData);
    return statmentData;

    function totalAmount(data) {
        let result = 0;
        for (var perf of data.performances) {
            result += perf.amount;
        }
        return result;
    }
    function totalValumeCredits(data) {
        let valumeCredits = 0;
        for (var perf of data.performances) {
            // add volume credits
            valumeCredits += Math.max(perf.audience - 30, 0);
            //add extra credit for every ten comedy attendees
            if ("comedy" == perf.play.type) valumeCredits += Math.floor(perf.audience * 10);
        }
        return valumeCredits;
    }
    function enrichPerformance(aPerformance) {
        let result = Object.assign({}, aPerformance);
        result.play = playFor(result.playID);
        result.amount = amountFor(result);
        return result;
    }
    function playFor(playID) {
        return plays[playID];
    }
    function amountFor(aPerformance) {
        var playBehavoiur=factory(aPerformance.play.type);
        return playBehavoiur.amountFor(aPerformance.audience);
    }
    function amountForTragedy(audience)
    {
        let result = 40000;
        if (audience > 30) {
            result += 1000 * (audience - 30);
        }
        return result;
                
    }
    function amountForComedy(audience)
    {
        let result = 30000;
        if (audience > 30) {
            result += 1000 + 500 * (audience - 20);
        }
        result += 300 * audience;
        return result;
                
    }
    function factory(type)
    {
        const playBehavoiur=require('./playBehavoiur');

        switch (type) {
            case "tragedy":
                return new playBehavoiur.TragedyClass();
            case "comedy":
                return new playBehavoiur.ComedyClass();
            default:
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }
    }
}

function renderPlainTextStatement(data) {
    let result = `Statement for ${data.customer}\n`;
    for (var perf of data.performances) {
        result += ` ${perf.play.name}: ${format(perf.amount / 100)} (${perf.audience})`;
    }

    result += `Amount owed is ${format(data.totalAmount / 100)}\n`;
    result += `You earned ${data.totalValumeCredits} credits\n`;

    return result;

    function format(aNumber) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD", minimumFractionDigits: 2
            }).format(aNumber);
    }

}

function renderHtmlStatement(data) {
    let result = `Statement for ${data.customer}\n`;
    for (var perf of data.performances) {
        result += ` ${perf.play.name}: ${format(perf.amount / 100)} (${perf.audience})`;
    }

    result += `Amount owed is ${format(data.totalAmount / 100)}\n`;
    result += `You earned ${data.totalValumeCredits} credits\n`;

    return result;

    function format(aNumber) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD", minimumFractionDigits: 2
            }).format(aNumber);
    }

}

module.exports = { statement: plainTextStatement , htmlTextStatement     }