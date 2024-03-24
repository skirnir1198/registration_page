$(function () {

  const db = firebase.firestore();
  const ageGroups = [
    { age: '10代', position: '0%' },
    { age: '20代', position: '25%' },
    { age: '30代', position: '50%' },
    { age: '40代', position: '75%' },
    { age: '50代', position: '100%' }
  ];
  db.collection("jobPostings").doc('N4Yvrfc4dr8Bhtel2kym').get().then((doc) => {
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
      $('.salary_amount').text(data.salary_amount); //期間
      const $slider = $('.age-container .custom-slider');
      $slider.find('.slider-dot').remove(); // 既存のドットを削除
      // 新しいスライダードットを追加
      ageGroups.forEach(function (group) {
        var $dot = $('<div>')
          .addClass('slider-dot')
          .css('left', group.position)
          .data('age', group.age)
          .append($('<span>').addClass('dot-text').text(group.age));
        // 条件が合致すれば .select-dot クラスを追加
        if (data.agecheckbox.includes(group.age)) {
          $dot.addClass('select-dot');
        }
        // 作成した要素を DOM に追加する例
        $slider.append($dot);
      });

    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});

