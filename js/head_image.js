$(function(){
  var $head_image = $(".head_image");
  function ani(name){
    $head_image.css("animation-name",name);
  }

  var num = 0;
  var num_h = 0;

  function expression(){
    num = parseInt(Math.random()*10);
    if(num>=0&&num<=3){
      ani("smile");
    }
    else if(num>=4&&num<=7){
      ani("normal_s");
    }
    else if(num==8){
      ani("sad");
    }
    else if(num==9){
      ani("mad");
    }
  }


  function click_change(str){
    var str_array = ["smile","normal_s","sad","mad",0,4,8,9];
    var str_index = str_array.indexOf(str);
    str_array.splice(str_index,1);
    str_array.splice(str_index+3,1);
    if(num_h>=0&&num_h<=3){ani(str_array[0]);num = str_array[3];}
    else if(num_h>=4&&num_h<=6){ani(str_array[1]);num = str_array[4];}
    else if(num_h>=7&&num_h<=9){ani(str_array[2]);num = str_array[5];}
  }

  var head_image_timer = setInterval(expression,15000);
  var head_image_timer_2;
  function click_1(){
    var flag = 0;
    clearInterval(head_image_timer);
    var name = $head_image.css("animation-name");
    if(name.indexOf("_m")==-1&&name.indexOf("mad")==-1){
      ani(name+"_m");
      flag = 1;
      if(flag == 1){
        clearTimeout(head_image_timer_2);
        head_image_timer_2 = setTimeout(function(){ani(name);},5000);
      }
    }
    head_image_timer = setInterval(expression,15000);
  }

  function click_2(){
    clearInterval(head_image_timer);
    clearTimeout(head_image_timer_2);
    num_h = parseInt(Math.random()*10);
    if(num>=0&&num<=3){
      click_change("smile");
    }
    else if(num>=4&&num<=7){
      click_change("normal_s");
    }
    else if(num==8){
      click_change("sad");
    }
    else if(num==9){
      click_change("mad");
    }
    head_image_timer = setInterval(expression,15000);
  }


  $head_image.hover(function(){
    click_2();
  },function(){});
});
