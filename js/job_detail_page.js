$(function () {
  $('#loading').show();
  // 現在のページのURLからクエリストリングを取得
  const queryString = window.location.search;
  // URLSearchParamsオブジェクトを作成
  const urlParams = new URLSearchParams(queryString);

  // 特定のパラメーターの値を取得
  const param1 = urlParams.get('param'); // 'value1'
  const db = firebase.firestore();
  const ageGroups = [
    { age: '10代', position: '0%' },
    { age: '20代', position: '25%' },
    { age: '30代', position: '50%' },
    { age: '40代', position: '75%' },
    { age: '50代', position: '100%' }
  ];
  const sliderPoints = [
    { position: '0%', label: '男性が多い' },
    { position: '25%', label: '' },
    { position: '50%', label: '' },
    { position: '75%', label: '' },
    { position: '100%', label: '女性が多い' }
  ];
  db.collection("jobPostings").doc(param1).get().then((doc) => {
    if (doc.exists) {
      // ドキュメントのデータをコンソールに表示
      const data = doc.data();

      // 画像1----------------------------------------
      const imageUrls = data.imageUrls1; // Assuming 'imageUrls' is the field containing the array of image URLs
      const slideContainer = document.querySelectorAll('.slide-container');
      slideContainer[0].innerHTML = '';
      const firstImage = document.querySelector('section > .first_img');
      if (imageUrls.length > 0) {
        firstImage.src = imageUrls[0];
        firstImage.alt = "画像1"; // Set an appropriate alt text
      }
      imageUrls.forEach(url => {
        // imgタグを作成
        const img = document.createElement('img');
        img.src = url;
        img.alt = "画像"; // Set an appropriate alt text

        // imgタグを含む新しいdiv要素を作成
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('img-wrapper'); // クラス名を追加（スタイリング用）
        imgWrapper.appendChild(img);

        // imgタグにイベントリスナーを追加
        imgWrapper.addEventListener('click', () => {
          firstImage.style.opacity = 0; // 一旦透明度を0にする
          // 少し遅延してから画像ソースを変更し、透明度を元に戻す
          setTimeout(() => {
            firstImage.src = img.src;
            firstImage.alt = img.alt;
            firstImage.style.opacity = 1; // 透明度を1に戻す
          }, 250); // 250ミリ秒後に実行
        });

        // 新しいdiv要素をスライドコンテナに追加
        slideContainer[0].appendChild(imgWrapper);
      });


      // 画像2----------------------------------------
      const imageUrls2 = data.imageUrls2; // Assuming 'imageUrls' is the field containing the array of image URLs
      slideContainer[1].innerHTML = '';
      const firstImage2 = document.querySelector('section > .second_img');
      if (imageUrls2.length > 0) {
        firstImage2.src = imageUrls2[0];
        firstImage2.alt = "画像1"; // Set an appropriate alt text
      }
      imageUrls2.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = "画像"; // Set an appropriate alt text
        // imgタグを含む新しいdiv要素を作成
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('img-wrapper'); // クラス名を追加（スタイリング用）
        imgWrapper.appendChild(img);

        // imgタグにイベントリスナーを追加
        imgWrapper.addEventListener('click', () => {
          firstImage2.style.opacity = 0; // 一旦透明度を0にする
          // 少し遅延してから画像ソースを変更し、透明度を元に戻す
          setTimeout(() => {
            firstImage2.src = img.src;
            firstImage2.alt = img.alt;
            firstImage2.style.opacity = 1; // 透明度を1に戻す
          }, 250); // 250ミリ秒後に実行
        });

        // 新しいdiv要素をスライドコンテナに追加
        slideContainer[1].appendChild(imgWrapper);
      });
      $('.company').text(data.company); //会社名
      $('.work_place').text(data.name); //職場名
      $('.title').html(data.title.replaceAll(' ', '<br>')); //仕事紹介
      $('.region').text(data.selectedRegion); //都道府県
      $('.region_place').text(data.region);//場所名
      $('.region_detail').text(data.region_detail ? '/' + data.region_detail : ''); //地域名
      $('.type').text(data.type); //職種名
      $('.period').text(data.period); //期間
      $('.salary_type').text(data.wage ? data.salary_type : ''); //給与体系
      $('.wage').text(data.wage ? data.wage+ '円':''); //給与
      $('.job_description').html(data.job_description); //仕事内容
      $('.income').text(data.income); //予想月収
      $('.working_hours').html(data.working_hours); //勤務時間
      $('.condition').text(data.condition || 'なし'); //応募条件
      $('.employment').text(data.employment); //雇用形態
      $('.dietary_conditions').html(data.dietary_conditions || 'なし'); //食事条件
      $('.transportation').text(data.transportation || 'なし'); //交通費
      $('.holiday-start').text(data.holiday[0]); //休日１
      $('.holiday-end').text(data.holiday[1]); //休日２
      $('.necessary_work').text(data.necessary_work || 'なし'); //仕事で必要なもの
      $('.necessary_life').text(data.necessary_life || 'なし'); //生活で必要なもの
      $('.clothing').text(data.clothing); //制服
      $('.car').text(data.car); //車の持ち込み
      $('.welfare').html(data.welfare || 'なし'); //福利厚生
      $('.domitoryType').text(data.domitoryType); //寮タイプ
      $('.domitory_fee').text(data.domitory_fee || 'なし'); //寮費
      $('.commuting_time').text(data.commuting_time); //通勤時間
      $('.network').text(data.network); //Wi-Fi
      $('.surrounding_environment').html(data.surrounding_environment || 'なし'); //周辺環境テキスト
      $('.region_detail').text(data.region_detail); //住所詳細
      $('.transportation').html(data.transportation); //交通手段
      $('.icon-item').hide();
      data.insideRoom.forEach(function (item) {
        $('.icon-list.inside_room').children('.icon-item[data-name="' + item + '"]').show();
      });
      data.outsideRoom.forEach(function (item) {
        $('.icon-list.outside_room').children('.icon-item[data-name="' + item + '"]').show();
      });
      data.surroundingEnvironment.forEach(function (item) {
        $('.surrounding-environment').children('.icon-item[data-name="' + item + '"]').show();
      });
      var encodedAddress = encodeURIComponent(data.selectedRegion + ' ' + data.region_detail);
      var googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodedAddress;
      $('td').find('.map').attr('href', googleMapsUrl);
      $.each(data.good_points, function (i, item) {
        // <li>要素を作成してテキストを設定
        var $li = $('<li>').text(item);

        // <li>要素を.ul要素に追加
        $('.green-dot-list').append($li);
      });






      // スライダー関連----------------------------------------------------------------------------------
      function addSliderDots($slider, points, selectedPoint, startLabel = '', endLabel = '') {
        $slider.empty(); // 既存の内容をクリア
        $('<div>', { class: 'slider-track' }).appendTo($slider); // スライダートラック要素を追加

        points.forEach((point, index) => {
          const isSelected = index === selectedPoint;
          const $sliderDot = $('<div>', {
            class: 'slider-dot' + (isSelected ? ' select-dot' : ''),
            css: { left: point.position },
            'data-index': index
          });

          if (point.label || index === 0 || index === points.length - 1) {
            const label = point.label || (index === 0 ? startLabel : endLabel);
            $('<span>', {
              class: 'dot-text',
              text: label
            }).appendTo($sliderDot);
          }

          $sliderDot.appendTo($slider);
        });
      }

      // スライダーの設定
      const sliders = [
        {
          selector: '.age-container .custom-slider',
          points: ageGroups.map(group => ({ position: group.position, label: group.age })),
        },
        {
          selector: '.sex-container .custom-slider',
          points: sliderPoints,
          selectedPoint: data.sexRatio,
          startLabel: '男性が多い',
          endLabel: '女性が多い'
        },
        {
          selector: '.overtime-container .custom-slider',
          points: Array.from({ length: 5 }, (_, i) => ({ position: `${(100 / 4) * i}%` })),
          selectedPoint: data.overtime,
          startLabel: '少ない',
          endLabel: '多い'
        },
        {
          selector: '.atmosphere-container .custom-slider',
          points: Array.from({ length: 5 }, (_, i) => ({ position: `${(100 / 4) * i}%` })),
          selectedPoint: data.atmosphere,
          startLabel: '静か',
          endLabel: '賑やか'
        }
      ];

      // 各スライダーに対してスライダードットを追加
      sliders.forEach(slider => {
        const $slider = $(slider.selector);
        addSliderDots($slider, slider.points, slider.selectedPoint, slider.startLabel, slider.endLabel);
      });
      data.agecheckbox.forEach(function (index) {
        $('.age-container .custom-slider .slider-dot').eq(index).addClass('select-dot');
      });

    } else {
      console.log("No such document!");
    }
  }).then(() => {
    $('#loading').hide();

  }).catch((error) => {
    console.log("Error getting document:", error);
    $('#loading').hide();
  });
  // ----------------------------------------------------------------------------------



});

