    // var app1=angular.module('app.subject',[]);
    // app1.controller("subjectController",function($scope,appSer){
    //     appSer.subject(function(data){
    //         $scope.data=data
    //     })
    // });
    // app1.provider("appSer",function(){
    //     this.url="data/types.json"
    //     this.$get=function($http){
    //         var self=this
    //         return{
    //             subject:function(fun){
    //                 $http.get(self.url).success(function(data){
    //                     fun(data);
    //                 })
    //             }
    //         }
    //     }
    // });
    /*
    * 前台人员后台人员
    * 后台人员处理
    *   (要筛选的id)
    *   id:唯一标识
    *   realname
    *   等级表
    *       id等级
    *       realName
    *       name:
    * */
    var app1=angular.module("app.subject",[]);
        app1.controller("allSubject",["$scope","allSubjectService","getSubject","$routeParams","$location",function($scope,allSubjectService,getSubject,$routeParams,$location){
            //双向数据绑定的值
            $scope.subject1={
                typeId:1,
                levelId:1,
                depId:1,
                topicId:1,
                exem:"",
                answer:"",
                anyl:"",
                choiceContent:[],
                choiceCorrect:[],

            };
            //保存
            $scope.save=function(){
                getSubject.addSubject($scope,subject1)
                //需要制空某些选项(让页面回到最初的状态)
                $scope.subject={
                    typeId:1,
                    levelId:1,
                    depId:1,
                    topicsId:1,
                    exem:"",
                    answer:"",
                    anyl:"",
                    choiceContent:[],
                    choiceCorrect:[]

                };
                angular.copy(subject,$scope.subject1);
                /*
                * $scope.subject1.typeId=1
                * $scope.subject1.level=1
                * $scope.subject1.depId=1
                * */
            }
            //保存并跳回
            $scope.saveAndBack=function(){
                getSubject.addSubject($scope.subject1)
                //跳回
                $location.path("/allSubject/a/0/b/0/c/0/d/0");

            }
            //routeParams获取到的是浏览器中地址中的参数
            $scope.params=$routeParams
        allSubjectService.findAllTypes(function(types){
            $scope.types=types
        })
            //调用获取等级
        allSubjectService.levelsTypes(function(levels){
            $scope.levels=levels
        });
            //调用获取方向
        allSubjectService.departmentesTypes(function(departmentes){
            $scope.departmentes=departmentes
        })
            //调用获取知识点
        allSubjectService.topicsTypes(function(topics){
            $scope.topics=topics
        })
            //获取所有题目信息
            //$routeParams前侧路径
        getSubject.getAllSubject($routeParams,function(subjects) {
            subjects.forEach(function (subject) {
                subject.choices.forEach(function (choice, index) {
                    choice.no = allSubjectService.converIndexTo(index)
                })
                var answer = []
                //如果有值才进入
                if(subject.subjectType){
                    //当id!=3时，就只有单选和多选时才添加属性
                if (subject.subjectType.id!= 3) {
                    subject.choices.forEach(function (choice) {
                        if (choice.correct) {
                            answer.push(choice.no)
                        }
                    })
                    subject.answer = answer.join("、")
                }}
            })
            $scope.subjects = subjects
            console.log($scope.subjects)
        })


    }])

    app1.factory("allSubjectService",["$http",function($http){
        return{
            findAllTypes:function(fun){
                $http.get("data/types.json").success(function(data){
                    fun(data)
                })
            }, levelsTypes:function(fun){
                $http.get("data/levels.json").success(function(data){
                    fun(data)

                })
            }, departmentesTypes:function(fun){
                $http.get("data/departmentes.json").success(function(data){
                    fun(data);
                })
            }, topicsTypes:function(fun){
                $http.get("data/topics.json").success(function(data){
                    fun(data);
                })
            },converIndexTo:function(index){
                    return index==0?"A":(index==1?"B":(index==2)?"C":"D")
            }
        }
    }]);


    app1.service("getSubject",function($http,$httpParamSerializer){
        this.addSubject=function(params){
            var obj={};
            for(var key in params){
                var val=params[key];
                if(val){
                switch(key) {
                    case"typeId":
                        obj['subject.subjectType.id'] = val;
                        break;
                    case"levelId":
                        obj['subject.subjectLevel.id'] = val;
                        break;
                    case"depId":
                        obj['subject.department.id'] = val;
                        break;
                    case"topicId":
                        obj['subject.topic.id'] = val;
                        break;
                    case"exem":
                        obj['subject.stem'] = val;
                        break;
                    case"anyl":
                        obj['subject.analysis'] = val;
                        break;
                    case"answer":
                        obj['subject.answer'] = val;
                        break;
                    case"choiceContent":
                        obj['choiceContent'] = val;
                        break;
                    case"choiceCorrect":
                        obj['choiceCorrect'] = val;
                        break;
                    }
                }
            }
            console.log(obj);
           /* $http.get("#",{
                params:obj
            }).success(function(){
                alert("成功")
            })*/
           var obj=$httpParamSerializer(obj)
                console.log(obj);
            $http.post("#",obj,{
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).success(function(){

            })
        },
        this.getAllSubject=function(param,fun){
            console.log(param);
            var data={}
            for(var index in param){
                 console.log(index);
                var val=param[index]
                console.log(val);
                if(val!=0){
                    switch (index){
                        case"a":
                            data["subject.subjectType.id"]=val;
                            break;
                        case"b":
                            data["subject.subjectLevel.id"]=val;
                            break;
                        case"b":
                            data["subject.departmente.id"]=val;
                        case"d":
                            data["subject.topic.id"]=val;
                    }
                }
            }
            $http.get("data/subjects.json",{
                params:data
            }).success(function(data){
                fun(data)
            })
        }
    });
    //用来配置添加subject的路径及其controller
   app1.config(function($routeProvider){
       $routeProvider.when("/addSubject",{
           templateUrl:"tpl/addsubject.html",
           controller:"allSubject"
       })
   })
    //定义一个过滤器，用来筛选相应的选中的departement方向的知识点
    app1.filter("findTopic",function(){
        return function(topics,depId){
           if(topics){
             var arr=topics.filter(function(topic){
                   // if(topic.department.id==depId){
                 //     return true;
                 // }
                 return topic.department.id=depId
               })
               return arr;
           }
        }
    })
    //定义一个指令帮我们绑定一个事件，能够拿到element并且可以拿到里面的属性
    app1.directive("selectAnswer",function(){
        return{
            link:function(scope,element){
                //从第0个到第3个input
                // console.log(element);
                // console.log($scope.subject1)
                if(element.attr("name")=='radio'){
                    element.on("change",function(){
                       var val=$(this).attr("value");
                        // alert(val);
                        for(var i=0;i<4;i++){
                            if(val==i){
                                scope.subject1.choiceCorrect[i]=true
                            }else{
                                scope.subject1.choiceCorrect[i]=false
                            }
                        }
                        //强制更新scope里面的内容到他所属的作用域
                        scope.$digest()
                    })
                }else if(element.attr("name")=="check"){
                    $scope.subject1.choiceCurrent=[false,false,false,false]
                    element.on("change",function(){
                        var val=$(this).attr("value");
                        if($(this).prop("checked")){
                        // alert(val);
                        for(var i=0;i<4;i++){
                            if(val==i){
                                scope.subject1.choiceCorrect[i]=true
                            }
                        }
                        }else{
                            for(var i=0;i<4;i++){
                                if(val==i){
                                    scope.subject1.choiceCorrect[i]=false
                                }
                            }
                        }
                        //强制更新scope里面的内容到他所属的作用域
                        scope.$digest()
                    })
                }
            }
        }
    });
//定义一个指令来清除上次所选的内容
    app1.directive("removeSubject1",function(){
        return{
            link:function(scope,element){
                element.on("click",function(){
                    scope.subject1.choiceCurrent=[],
                    scope.subject1.choiceContent=[],
                    scope.subject1.exem="",
                    scope.subject1.answer="",
                    scope.subject1.analysis=""
                    scope.$digest();
                })
            }
        }
    })