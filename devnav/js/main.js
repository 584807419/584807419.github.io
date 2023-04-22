$(function() {
        
    //收藏
    $('#header .icon-favor').on('click', function(e) {
        var 
            title = document.title || '开发者网址导航',
            url = window.location.href;
        
        try {
            if(window.sidebar && window.sidebar.addPanel) {
                window.sidebar.addPanel(title, url, '');
            }else if(window.external) {
                window.external.AddFavorite(url, title);
            }else {
                throw 'NOT_SUPPORTED';
            }
        }catch(err) {
            alert('哎呦，浏览器不给力，请按Ctrl+D收藏');
        }
    
        e.preventDefault();
    });
    
    //加入首页
    $('#header .icon-homepage').on('click', function(e) {
        try {
            if(window.netscape) {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                
                Components.classes['@mozilla.org/preferences-service;1']
                .getService(Components. interfaces.nsIPrefBranch)
                .setCharPref('browser.startup.homepage',window.location.href); 
                
                alert('成功设为首页');
                
            }else if(window.external) {
                document.body.style.behavior='url(#default#homepage)';   
                document.body.setHomePage(location.href);
            }else {
                throw 'NOT_SUPPORTED';
            }
        }catch(err) {
            alert('您的浏览器不支持或不允许自动设置首页, 请通过浏览器菜单设置');
        }
    
        e.preventDefault();
    });
    

    //导航区域
    $('#catalog,#website-map').on('click', '.website-list>li, .more-item', function(e) {
        var tarEl = e.target;
        
        if(tarEl.tagName == 'A' && $(tarEl).parents('section.active')[0]) {
            e.stopPropagation();
            
        }else {
            if(tarEl.tagName != 'LI') {
                tarEl = $(tarEl).parents('li')[0];
            }
            
            if(tarEl) {
                var aEl = $('a', tarEl);
                
                if(aEl.length) {
                    var src = aEl.attr('href');
                    
                    if(aEl.attr('target') == '_blank') {
                        window.open(src);
                    }else {
                        location.href = src;
                    }
                }
            }
            
            e.preventDefault();
        }
    });
    
    //快捷导航
    catalogAnimationRunning = false;
    

    $('#toptoptop nav').on('click', function(e) {
        if(e.target.tagName != 'A') {
            return;
        }

        var keyword = $(e.target).attr('href').slice(1);
        var target = $('section[data-catalog="'+keyword+'"]');
        
        if(target[0] && !catalogAnimationRunning) {
            catalogAnimationRunning = true;
            
            var top = target.offset().top;
            $('html, body').animate({
                scrollTop: top-55
            }, 200, function() {
                highlightCatalog(target);
                catalogAnimationRunning = false;
            });
        }
        
        e.preventDefault();
    });

    var doc = $('body')[0],
        isLowerEffect = false;
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();

        if(scrollTop < 20) {
            doc.className = '';
        }else if(!doc.className && !isLowerEffect) {
            doc.className = 'toptoptop-fixed';
        }
    });

    if(window.browserFlag === 'lteIE8') {
        $(window).on('resize', function() {
            var w = parseInt(document.documentElement.offsetWidth, 10);

            if(w < 1440) {
                isLowerEffect = true;
                $('#toptoptop, #go-to-top').hide();
                doc.className = '';
            }else {
                isLowerEffect = false;
                $('#toptoptop').show();

                if(doc.className) {
                    $('#go-to-top').show();
                }else {
                    $('#go-to-top').hide();
                }
            }
        }).trigger('resize');
    }
    

});