// jQuery实现左侧导航栏动态效果
$(function(){
    $(".baseUI>li>a").off();
    $(".baseUI>li>ul").hide();
    $(".baseUI>li>a").on("click",function(){
        $(".baseUI>li>ul").slideUp();
        $(this).next().slideDown(300);
    });
    $(".baseUI>li>ul>li").off();
    $(".baseUI>li>ul>li").on("click",function(){
        if(!$(this).hasClass("current")){
            $(".baseUI>li>ul>li").removeClass("current");
            $(this).addClass("current");
        }
    });
    $(".baseUI>li>a").eq(0).trigger("click");
   $(".baseUI>li>ul>li>a").eq(0).trigger("click");
})


//angularjs
//     var app=angular.module("app",["ngRoute,app.subject"]);
//     app.config(function($routeProvider){
//         $routeProvider.when("/AllSubject",{
//             templateUrl:'tpl/subjectList.html',
//             // controller:"subjectController"
//         })
//     })
var app=angular.module("app",["ngRoute","app.subject"]);
app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/allSubject/a/:a/b/:b/c/:c/d/:d",{
        templateUrl:'tpl/subjectList.html',
        controller:"allSubject"
    })
}])



