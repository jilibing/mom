require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define('saveMilk', function(request, response) {
var amount = request.params.amount;
if(amount){
}else{
    response.error('还没有输入奶量呢！');
    return;
}

var user = request.params.publisher;
if(user){
}else{
    response.error('你还没有登录呢！');
    return;
}

// 创建AV.Object子类.
// 该语句应该只声明一次
var Milk = AV.Object.extend("Milk");

// 创建该类的一个实例
var milk = new Milk();
milk.set("publisher", user);
milk.set("amount", amount);
milk.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(milk, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    //alert('Failed to create new object, with error code: ' + error.description);
    response.error('服务器度假去了: ' + error.description);
  }
});
})

