module.exports = (function () {
    if (!Object.prototype.oroFixedNumber) {
      Object.defineProperty(Object.prototype, 'oroFixedNumber', {
        value: function(digits, base){
        var pow = Math.pow(base||10, digits);
        return Math.round(this*pow) / pow;
      }
    })
  }
  
  if (!Object.prototype.oroNumber) {
      Object.defineProperty(Object.prototype, 'oroNumber', {
      value: function(decimals,currency){
        var amount = this.valueOf();
        if(!this.valueOf()) {
          return "";
        }
        amount =  decimals ? 
                    (Number(!isNaN(amount) ? amount : 0).oroFixedNumber(decimals || 2)) || 0 
                      :
                    parseInt(amount);              
        amount = currency ?  indianNumberWithCommasNew(amount) : amount;
        return !currency ? !isNaN(amount) ? amount : 0 : amount;
      }
    })
  }
})();


function indianNumberWithCommasNew (x) {
  if(!x) return;
  let isNegative = false
  if (x<0) 
    isNegative = true
  x=x.toString();
  var afterPoint = '';
  if(x.indexOf('.') > 0)
     afterPoint = x.substring(x.indexOf('.'),x.length);
  x = !isNegative ? Math.floor(x) : Math.ceil(x);
  x = x.toString();
  var lastThree
  var otherNumbers
  var prefix  = ''
  if(isNegative) {
    var y = x.replace('-','')
    prefix = '-'
    lastThree = y.substring(y.length-3);
    otherNumbers = y.substring(0,y.length-3);
  } else {
    lastThree = x.substring(x.length-3);
    otherNumbers = x.substring(0,x.length-3);
  }
  if(otherNumbers != '')
      lastThree = ',' + lastThree;
  var res = prefix + "₹" + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  return res;
}
