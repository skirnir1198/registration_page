$(function () {

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
  db.collection("jobPostings").doc('cgn1SOcnIRvcPnPT5dUn').get().then((doc) => {
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
        const img = document.createElement('img');
        img.src = url;
        img.alt = "画像"; // Set an appropriate alt text

        // Add an event listener to each img tag
        img.addEventListener('click', () => {
          // Update the src of the .first_img image to the src of the clicked image
          firstImage.src = img.src;
          firstImage.alt = img.alt; // Update alt text if necessary
        });

        slideContainer[0].appendChild(img);
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
        // Add an event listener to each img tag
        img.addEventListener('click', () => {
          // Update the src of the .first_img image to the src of the clicked image
          firstImage2.src = img.src;
          firstImage2.alt = img.alt; // Update alt text if necessary
        });
        slideContainer[1].appendChild(img);
      });
      $('.work_place').text(data.name); //職場名
      $('.job_description').text(data.job_description); //仕事紹介
      $('.region').text(data.region); //都道府県
      $('.region_detail').text(data.region_detail); //地域名
      $('.occupation').text(data.occupation); //職種名
      $('.period').text(data.period); //期間
      $('.salary_type').text(data.salary_type); //給与体系
      $('.salary_amount').text(data.salary_amount); //給与
      $('.job_description').text(data.job_description); //仕事内容
      $('.income').text(data.income); //予想月収
      $('.working_hours').text(data.working_hours); //勤務時間
      $('.condition').text(data.condition); //応募条件
      $('.employment').text(data.employment); //雇用形態
      $('.dietary_conditions').text(data.dietary_conditions); //食事条件
      $('.transportation').text(data.transportation); //交通費
      $('.holiday-start').text(data.holiday[0]); //休日１
      $('.holiday-end').text(data.holiday[1]); //休日２
      $('.necessary_work').text(data.necessary_work); //仕事で必要なもの
      $('.necessary_life').text(data.necessary_life); //生活で必要なもの
      $('.clothing').text(data.clothing); //制服
      $('.car').text(data.car); //車の持ち込み
      $('.welfare').text(data.welfare); //福利厚生
      $('.domitoryType').text(data.domitoryType); //寮タイプ
      $('.domitory_fee').text(data.domitory_fee); //寮費
      $('.commuting_time').text(data.commuting_time); //通勤時間
      $('.network').text(data.network); //Wi-Fi
      $('.surrounding_environment').text(data.surrounding_environment); //周辺環境テキスト
      $('.region_detail').text(data.region_detail); //住所詳細
      $('.transportation').text(data.transportation); //交通手段
      $('.icon-item').hide();
      data.insideRoom.forEach(function(item) {
        $('.icon-list.inside_room').children('.icon-item[data-name="' + item + '"]').show();
      });  
      data.outsideRoom.forEach(function(item) {
        $('.icon-list.outside_room').children('.icon-item[data-name="' + item + '"]').show();
      });         
      data.surroundingEnvironment.forEach(function (item) {
        $('.surrounding-environment').children('.icon-item[data-name="' + item + '"]').show();
      });





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
          selectedPoint: ageGroups.findIndex(group => data.agecheckbox.includes(group.age))
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
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  // ----------------------------------------------------------------------------------



});

