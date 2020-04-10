const assert = require('assert')

const invoice = require('./invoice.json');
const play = require('./play.json');
const printStatment = require('./statement');

it('should correctly compute and return plain text statement', () => {
  assert.equal("Statement for BigCo\n Hamlet: $650.00 (55) As You Like It: $490.00 (35) Othello: $500.00 (40)Amount owed is $1,640.00\nYou earned 390 credits\n",
   printStatment.statement(invoice[0], play));
})

it('should correctly compute and return plain text statement', () => {
  assert.equal("Statement for BigCo\n Hamlet: $650.00 (55) As You Like It: $490.00 (35) Othello: $500.00 (40)Amount owed is $1,640.00\nYou earned 390 credits\n",
   printStatment.htmlTextStatement(invoice[0], play));
})
 






















// it('should correctly compute and return html statement', () => {
//   assert.equal(`<h1>Statement for BigCo</h1>
// <table>
// <tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
//  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
//  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
// </table>
// <p>Amount owed is <em>$1,730.00</em></p>
// <p>You earned <em>47</em> credits</p>`, statementRendere.htmlStatement(invoice[0], play));
// })
