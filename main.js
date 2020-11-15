$(function () {
    // slideshow
    // ======================================================================
    $('.slideshow').each(function () {
        // 変数の定義
        // --------------------------------------------------
        var $container = $(this),                                 //スライドショー全体のコンテナ
            $slideGroup = $container.find('.slideshow__slides'),      // スライドのラッパー
            $slides = $slideGroup.find('.slide'),                 // 各スライドのまとまり
            $nav = $container.find('.slideshow-nav'),            // prev nextボタン
            $indicator = $container.find('.slideshow-indicator'), // インジケーター

            slideCount = $slides.length, // スライドの枚数
            indicatorHTML = '',          // インジケーターのコンテンツ
            currentIndex = 0,            // 現在のインデックス
            duration = 500,              // アニメーションにかける時間
            easing = 'easeInOutExpo',    // アニメーションのイージング
            interval = 5000,              // 次のスライドに変わるまでの時間
            timer;                       // タイマーの箱

        // 各スライドの位置を指定
        // 対応するインジケーターのアンカーを作成
        // --------------------------------------------------
        $slides.each(function (i) {
            $(this).css({ left: 100 * i + '%' });
            indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
        });

        $indicator.html(indicatorHTML);

        // 関数の定義
        // --------------------------------------------------
        // 任意のスライドを表示する関数
        function goToSlide (index) {
            // $slideGroupをターゲットの位置に合わせて移動
            $slideGroup.animate({ left: - 100 * index + '%' }, duration, easing);
            // 現在のインデックスを上書き
            currentIndex = index;
            // ナビゲーションとインジケーターの状態を更新
            updateNav();
        }

        // スライドに合わせてナビゲーションとインジケーターを更新する関数
        function updateNav () {
            var $navPrev = $nav.find('.slideshow-nav__prev'),
                $navNext = $nav.find('.slideshow-nav__next');
            // 最初のスライドならprevナビを無効
            if (currentIndex === 0) {
                $navPrev.addClass('disabled');
            } else {
                $navPrev.removeClass('disabled');
            }

            // 最後のスライドならnextナビを無効
            if (currentIndex === slideCount - 1) {
                $navNext.addClass('disabled');
            } else {
                $navNext.removeClass('disabled');
            }

            // 現在のスライドのインジケーターを無効
            $indicator.find('a').removeClass('active')
                .eq(currentIndex).addClass('active');
        }

        // タイマーを開始する関数
        function startTimer () {
            timer = setInterval(function () {
                var nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }, interval);
        }

        // タイマーを停止する関数
        function stopTimer () {
            clearInterval(timer);
        }

        // イベントの登録
        // --------------------------------------------------
        // ナビゲーションがクリックされたら該当するスライドを表示
        $nav.on('click', 'a', function (event) {
            event.preventDefault();
            if ($(this).hasClass('slideshow-nav__prev')) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        });

        // インジケーターがクリックされたら該当するスライドを表示
        $indicator.on('click', 'a', function (event) {
            event.preventDefault();
            if (!$(this).hasClass('active')) {
                goToSlide($(this).index());
            }
        });

        // スライドショーの開始
        // --------------------------------------------------
        // 最初のスライドを表示
        goToSlide(currentIndex);

        // タイマーをスタート
        startTimer();
    });

    // メイン画像のアニメーション
    // ======================================================================
    $('.main__contents-img').find('img')
        .on('mouseover', function() {
            $(this).find('+ strong').stop(true).animate({
                opacity: 1,
                left: 0,
            }, 250);
        })
        .on('mouseout', function() {
            $(this).find('+ strong').stop(true).animate({
                opacity: 0,
                left: '-100%'
            }, 250);
        });

    // メインボタンのアニメーション
    // ======================================================================
    $('.main__btn')
        .on('mouseenter', function() {
            $(this).find('> .main__btn-bg').stop(true).animate({
                width: '100%',
                opacity: 1,
            }, 300, 'easeOutQuad');
        })
        .on('mouseleave', function() {
            $(this).find('> .main__btn-bg').stop(true).animate({
                width: '0%',
                opacity: 0,
            }, 300, 'easeOutQuad');
        });

    // スティッキーヘッダー
    // ======================================================================
    $('.header__inner').each(function () {
        var $window = $(window),
            $header = $(this);

        // ウィンドウのスクロールイベントを監視
        $window.on('scroll', $.throttle(1000 / 15, function () {
            if ($window.scrollTop() > 90) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }
        }));
        
        // ウィンドウのスクロールイベントを発生させる(初期位置の決定)
        $window.trigger('scroll');
    });

    // スムーズスクロール
    // ======================================================================
    $('.back-to-top').on('click', function () {
        // Smooth Scroll プラグインを実行
        $.smoothScroll({
            easing: 'easeOutExpo',
            speed: 500
        });
    });

    // スクロールアニメーション
    // ======================================================================
    $(window).scroll(function (){
        $('.fadein').each(function(){
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll > position - windowHeight + 200){
                $(this).addClass('active');
            }
        });
    });
});
