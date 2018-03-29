document.addEventListener("DOMContentLoaded",function(){


  var svg_radius = 100;

  var svg_width,svg_height,svg_x,svg_y;
  svg_width = svg_height = svg_radius*2 + 10;
  svg_x = svg_y = svg_radius + 5;


  //把半径转化为相应x,y坐标
  function to_coordinate(radius,index,total){

    var angle = Math.PI*2/total*index;
    var x = Math.sin(angle)*radius + svg_x;
    var y = -Math.cos(angle)*radius + svg_y;
    return x + "," + y;

  }

  //把半径数组最终转换为svg多边形需要的point属性字符串.
  function to_points(radius_items){

    var coordinate_items = radius_items.map(function(radius,index){
      var total = radius_items.length;
      return to_coordinate(radius,index,total);
    });
    return coordinate_items.join(" ");

  }


  var default_radius_num = 10;
  var default_radius_items = Array(default_radius_num).fill(svg_radius);

  new Vue({

    el: "#app",
    data: {
      //js中原先设置好的基本属性.(控制多边形的大小)
      width: svg_width,
      height: svg_height,
      cx: svg_x,
      cy: svg_y,
      r: svg_radius,

      //与input["range"]相关的属性.
      radius_num: default_radius_num,
      min_radius: 50,
      interval_time: 500,

      //后面函数需要用到的相关属性.
      radius_old_num: default_radius_num,
      radius_items: default_radius_items,
      points: to_points(default_radius_items),//最关键的points属性,直接控制html中多边形points.
      timer: null,
    },
    watch: {
      radius_num: function(){
        var radius_num_dif = this.radius_num - this.radius_old_num;
        if(radius_num_dif > 0){
          //ES6相关语法.
          this.radius_items = [...this.radius_items,...Array(radius_num_dif).fill(svg_radius)];
        }
        else{
          this.radius_items.length = this.radius_num;
        }
        this.radius_old_num = this.radius_num;

        //这两句代码用于清除当前定时器,然后再重启定时器.
        clearInterval(this.timer);
        this.interval();
      },
      min_radius: function(){
        clearInterval(this.timer);
        this.interval();
      },
      interval_time: function(){
        clearInterval(this.timer);
        this.interval();
      },
    },
    methods: {

      //用于设置定时器.
      interval: function(){
        var that = this;
        this.timer = setInterval(

          //使用立即执行函数,用于定时器在设置后先立即执行一遍相关函数.
          (function timer(){
            var random_radius_items = that.radius_items.map(function(){
              return that.min_radius/100*svg_radius + Math.random()*(svg_radius - that.min_radius/100*svg_radius);
            });
            TweenLite.to(that.$data,that.interval_time/1000,{points: to_points(random_radius_items)});
            return timer;
          })(),that.interval_time);
      }

    },
    mounted: function(){
      this.interval();
    },

  });

});
