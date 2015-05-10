require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// 记录奶量
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

// 获取奶量
AV.Cloud.define('', function(request, response) {
	var userId = request.params.userId;
if(userId){
}else{
    response.error('你还没登录呢！');
}

var page = request.params.page;
if(page){
}else{
    page = 0;
}

var Milk = AV.Object.extend("Milk");
var query = new AV.Query(Milk);
query.equalTo("userId", userId);
query.descending("createdAt");

var pageSize = 20;
query.limit(pageSize);
query.skip(page * pageSize);
query.find({
    success:function(results){
        
        // var code = 199;
        var obj = JSON.parse("{}"); 
        obj['code2'] = "hello";
        obj['result'] = results;
        //obj.put("code", code)
        // obj.put("re", results);
        response.success(results);
    },
    error: function(error){
        response.error(error)
    }
    
});
})

// 记录奶量回调
AV.Cloud.afterSave('Milk', function(request) {
	var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('amount')+'');
trend.set('type', trend_milk_type);
trend.save(); 
})

// 记录日记回调
AV.Cloud.afterSave('Diary', function(request) {
	var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('content'));
trend.set("imgs", request.object.get('imgs'));
trend.set('type', trend_diary_type);
trend.save(); 
})

// 记录身高
AV.Cloud.define('saveHeight', function(request, response) {
	var height = request.params.height;
if(height){
}else{
    response.error('还没有输入身高呢！');
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
var Height = AV.Object.extend("Height");

var query = new AV.Query(Height);

var date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
query.greaterThanOrEqualTo("updatedAt", date);
query.first({
  success: function(h) {
    //response.success(result);
    
    if(h){
           // // 创建该类的一个实例
//var h = new Height();
h.set("publisher", user);
h.set("height", height);
h.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(milk, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    //alert('Failed to create new object, with error code: ' + error.description);
    response.error('服务器度假去了2: ' + error.description);
  }
});
    }else{
            
var h = new Height();
h.set("publisher", user);
h.set("height", height);
h.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(milk, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    //alert('Failed to create new object, with error code: ' + error.description);
    response.error('服务器度假去了2: ' + error.description);
  }
});
    }
 
  },
  error: function(error) {
    response.error('服务器度假去了: ' + error.description);

    
  }
});
})


// 记录体重
AV.Cloud.define('saveWeight', function(request, response) {
	var weight = request.params.weight;
if(weight){
}else{
    response.error('还没有输入体重呢！');
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
var Weight = AV.Object.extend("Weight");

var query = new AV.Query(Weight);

var date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
query.greaterThanOrEqualTo("updatedAt", date);
query.first({
  success: function(w) {
    //response.success(w);
    
    // // 创建该类的一个实例
    if(w){
        w.set("publisher", user);
w.set("weight", weight);
w.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(milk, error) {;
    response.error('服务器度假去了2: ' + error.description);
  }
});
    }else{
        var w = new Weight();
w.set("publisher", user);
w.set("weight", weight);
w.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(w, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    //alert('Failed to create new object, with error code: ' + error.description);
    response.error('服务器度假去了2: ' + error.description);
  }
});
    }


  },
  error: function(error) {
    //response.error('服务器度假去了: ' + error.description);
    
var w = new Weight();
w.set("publisher", user);
w.set("weight", weight);
w.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(w, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    //alert('Failed to create new object, with error code: ' + error.description);
    response.error('服务器度假去了2: ' + error.description);
  }
});
    
  }
});
})


// 记录辣妈体重
AV.Cloud.define('saveMomWeight', function(request, response) {
	var weight = request.params.weight;
if(weight){
}else{
    response.error('还没有输入体重呢！');
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
var Weight = AV.Object.extend("MomWeight");

var query = new AV.Query(Weight);

var date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
query.greaterThanOrEqualTo("updatedAt", date);
query.first({
  success: function(w) {
    //response.success(w);
    
    // // 创建该类的一个实例
    if(w){
        w.set("publisher", user);
w.set("weight", weight);
w.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(milk, error) {;
    response.error('服务器度假去了2: ' + error.description);
  }
});
    }else{
        var w = new Weight();
w.set("publisher", user);
w.set("weight", weight);
w.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(w, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    //alert('Failed to create new object, with error code: ' + error.description);
    response.error('服务器度假去了2: ' + error.description);
  }
});
    }


  },
  error: function(error) {
    //response.error('服务器度假去了: ' + error.description);
    
var w = new Weight();
w.set("publisher", user);
w.set("weight", weight);
w.save(null, {
  success: function(result) {
    response.success(result);
  },
  error: function(w, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    //alert('Failed to create new object, with error code: ' + error.description);
    response.error('服务器度假去了2: ' + error.description);
  }
});
    
  }
});
})

// 全局
var trend_diary_type = 1;
var trend_milk_type = 2;
var trend_weight_type = 3;
var trend_height_type = 4;
var trend_mom_weight_type = 5;

// 记录体重回调
AV.Cloud.afterSave('Weight', function(request){
	var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('weight')+'');
trend.set('type', trend_weight_type);
trend.save();
})

// 更新体重回调
AV.Cloud.afterUpdate('Weight', function(request){
var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('weight')+'');
trend.set('type', trend_weight_type);
trend.save();
})


// 记录辣妈体重回调
AV.Cloud.afterSave('MomWeight', function(request){
	var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('weight')+'');
trend.set('type', trend_mom_weight_type);
trend.save();
})

// 更新辣妈体重回调
AV.Cloud.afterUpdate('MomWeight', function(request){
var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('weight')+'');
trend.set('type', trend_mom_weight_type);
trend.save();
})

// 记录身高回调
AV.Cloud.afterSave('Height', function(request){
	var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('height')+'');
trend.set('type', trend_height_type);
trend.save();
})

// 更新体重回调
AV.Cloud.afterUpdate('Height', function(request){
var Trend = AV.Object.extend("Trend");
var trend = new Trend();
trend.set("publisher", request.object.get('publisher'));
trend.set("content", request.object.get('height')+'');
trend.set('type', trend_height_type);
trend.save();
})