/* jshint esversion: 6 */

const app = new Vue({
  el: '#app',
  data: {
    current: '0',
    concat: '0',
    total: 0,
    lastNum: null,
    ceAllow: true,
    pointAllow: true,
    printTotal: false,
  },
  methods: {
    clearAll: function() {
      this.current = '0';
      this.concat = '0';
      this.ceAllow = true;
      this.pointAllow = true;
      this.printTotal = false;
    },
    clearEntry: function() {
      var len = this.current.length;
      var entryCleared = this.concat.substring(0, this.concat.length-len);
      if (this.ceAllow && !this.printTotal) {
        if (this.current == '*' || this.current == '/' || this.current == '+' || this.current == '-') {
          this.concat = entryCleared;
          this.current = this.lastNum;
          this.ceAllow = false;
          this.pointAllow = true;
        } else {
          this.concat = entryCleared;
          this.current = '0';
          this.ceAllow = false;
          this.pointAllow = true;
        }
      }
    },
    typeNumber: function(n) {
      var num = n.toString();
      if (this.printTotal) {
        this.clearAll();
        this.printTotal = false;
        this.typeNumber(n);
      } else {
        if (this.current == '*' || this.current == '/' || this.current == '+' || this.current == '-') {
          this.current = num;
          this.concat += num;
          this.ceAllow = true;
        } else if (this.concat != '0' && this.concat.length > 0 ) {
          if (this.current === '0') {
            this.current = num;
            this.concat += num;
            this.ceAllow = true;
          } else {
            this.current += num;
            this.concat += num;
            this.ceAllow = true;
          }
        } else {
          this.current = num;
          this.concat = num;
          this.ceAllow = true;
        }
      }
    },
    typePoint: function() {
      if (this.printTotal) {
        this.clearAll();
        this.printTotal = false;
        this.typePoint();
      } else {
        if (this.pointAllow) {
          if (this.current == '*' || this.current == '/' || this.current == '+' || this.current == '-') {
            this.current = "0.";
            this.concat += "0.";
            this.ceAllow = true;
            this.pointAllow = false;
          } else {
            this.current += ".";
            this.concat += ".";
            this.ceAllow = true;
            this.pointAllow = false;
          }
        }
      }
    },
    typeOperator: function(op) {
      var operator = op.toString();
      if (this.printTotal) {
        this.current = operator;
        this.concat = (Math.round(this.total * 1000)/1000).toString() + operator;
        this.printTotal = false;
        this.ceAllow = true;
        this.pointAllow = true;
      } else {
        if (this.concat.substr(-1) != '*' && this.concat.substr(-1) != '/' && this.concat.substr(-1) != '+' && this.concat.substr(-1) != '-') {
          this.lastNum = this.current;
          this.current = operator;
          this.concat += operator;
          this.ceAllow = true;
          this.pointAllow = true;
        }
      }
    },
    calculate: function() {
      if (!this.printTotal && this.concat.substr(-1) != '*' && this.concat.substr(-1) != '/' && this.concat.substr(-1) != '+' && this.concat.substr(-1) != '-') {
        this.total = eval(this.concat);
        this.current = (Math.round(this.total * 1000)/1000).toString();
        this.concat += '=' + (Math.round(this.total * 1000)/1000).toString();
        this.printTotal = true;
        this.lastNum = this.total;
      }
    }
  }
});
