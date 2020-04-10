class TragedyClass{

    amountFor(audience)
    {
        let result = 40000;
        if (audience > 30) {
            result += 1000 * (audience - 30);
        }
        return result;
                
    }
}
class ComedyClass{
    amountFor(audience)
    {
        let result = 30000;
        if (audience > 30) {
            result += 1000 + 500 * (audience - 20);
        }
        result += 300 * audience;
        return result;
                
    }
}
module.exports = { playBehavoiur: ComedyClass , TragedyClass }