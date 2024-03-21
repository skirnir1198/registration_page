$(function () {
  const db = firebase.firestore();
  var name = '';
  var selectRegion = '北海道';
  // 入力欄コンポーネント ----------------------------------------------------------------------------

  Vue.component('area-component', {
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-region', selectedText);
      },
    },
    template: `
    <select @change="updateSelectedText">
      <option value="北海道">北海道</option>
      <option value="青森県">青森県</option>
      <option value="岩手県">岩手県</option>
      <option value="宮城県">宮城県</option>
      <option value="秋田県">秋田県</option>
      <option value="山形県">山形県</option>
      <option value="福島県">福島県</option>
      <option value="茨城県">茨城県</option>
      <option value="栃木県">栃木県</option>
      <option value="群馬県">群馬県</option>
      <option value="埼玉県">埼玉県</option>
      <option value="千葉県">千葉県</option>
      <option value="東京都">東京都</option>
      <option value="神奈川県">神奈川県</option>
      <option value="新潟県">新潟県</option>
      <option value="富山県">富山県</option>
      <option value="石川県">石川県</option>
      <option value="福井県">福井県</option>
      <option value="山梨県">山梨県</option>
      <option value="長野県">長野県</option>
      <option value="岐阜県">岐阜県</option>
      <option value="静岡県">静岡県</option>
      <option value="愛知県">愛知県</option>
      <option value="三重県">三重県</option>
      <option value="滋賀県">滋賀県</option>
      <option value="京都府">京都府</option>
      <option value="大阪府">大阪府</option>
      <option value="兵庫県">兵庫県</option>
      <option value="奈良県">奈良県</option>
      <option value="和歌山県">和歌山県</option>
      <option value="鳥取県">鳥取県</option>
      <option value="島根県">島根県</option>
      <option value="岡山県">岡山県</option>
      <option value="広島県">広島県</option>
      <option value="山口県">山口県</option>
      <option value="徳島県">徳島県</option>
      <option value="香川県">香川県</option>
      <option value="愛媛県">愛媛県</option>
      <option value="高知県">高知県</option>
      <option value="福岡県">福岡県</option>
      <option value="佐賀県">佐賀県</option>
      <option value="長崎県">長崎県</option>
      <option value="熊本県">熊本県</option>
      <option value="大分県">大分県</option>
      <option value="宮崎県">宮崎県</option>
      <option value="鹿児島県">鹿児島県</option>
      <option value="沖縄県">沖縄県</option>
    </select>
  `
  });

  Vue.component('occupation-component', {
    template: `
  <select>
  <option value="レストランサービス">レストランサービス</option>
  <option value="バイキングレストラン">バイキングレストラン</option>
  <option value="カフェ">カフェ</option>
  <option value="フロント・ベル">フロント・ベル</option>
  <option value="ナイトフロント">ナイトフロント</option>
  <option value="売店・販売">売店・販売</option>
  <option value="仲居・客室係">仲居・客室係</option>
  <option value="調理・調理補助">調理・調理補助</option>
  <option value="館内全般業務">館内全般業務</option>
  <option value="清掃">清掃</option>
  <option value="洗い場">洗い場</option>
  <option value="裏方全般">裏方全般</option>
  <option value="宿泊予約・事務">宿泊予約・事務</option>
  <option value="テーマパーク・アクティビティ">テーマパーク・アクティビティ</option>
  <option value="ゴルフ場">ゴルフ場</option>
  <option value="その他リゾートバイト">その他リゾートバイト</option>
  <option value="スキー場リフト係">スキー場リフト係</option>
  <option value="スキー場レンタル">スキー場レンタル</option>
  <option value="スキー場インストラクター">スキー場インストラクター</option>
  <option value="その他スキー場">その他スキー場</option>
</select>

  `
  });

  Vue.component('employment-component', {
    template: `
  <select>
    <option value="派遣社員">派遣社員</option>
    <option value="正社員">正社員</option>
    <option value="アルバイト">アルバイト</option>
  </select>
  `
  });

  Vue.component('clothing-component', {
    template: `
  <select>
    <option value="洋装">洋装</option>
    <option value="二部式着物">二部式着物</option>
    <option value="本式着物">本式着物</option>
    <option value="作務衣">作務衣</option>
    <option value="その他">その他</option>
  </select>
  `
  });

  Vue.component('car-component', {
    template: `
  <select>
    <option value="可能">可能</option>
    <option value="不可能">不可能</option>
    <option value="必須">必須</option>
    <option value="その他">その他</option>
  </select>
  `
  });

  Vue.component('dormitory-component', {
    template: `
  <select>
    <option value="アパート,マンションタイプ">アパート,マンションタイプ</option>
    <option value="個室(共有スペースあり)">個室(共有スペースあり)</option>
    <option value="必須">必須</option>
    <option value="相部屋">相部屋</option>
  </select>
  `
  });

  Vue.component('network-component', {
    template: `
  <select>
    <option value="あり(部屋内)">あり(部屋内)</option>
    <option value="あり(共有スペース)">あり(共有スペース)</option>
    <option value="なし">なし</option>
  </select>
  `
  });


  Vue.component('text-field', {
    props: ['inputClass', 'value'],
    template: `
      <input
        :class="inputClass"
        :value="value"
        @input="$emit('input', $event.target.value)"
        type="text"
        placeholder="テキストを入力"
      >
    `
  });


  Vue.component('text-area-component', {
    props: ['inputClass'],
    template: `
    <textarea :class="inputClass" rows="5" cols="70" placeholder="ここにテキストを入力してください..."></textarea>
  `
  });

  Vue.component('radio-group', {
    props: ['groupClass', 'leftLabel', 'rightLabel'],
    data: function () {
      return {
        picked: null
      };
    },
    methods: {
      clearSelection: function () {
        this.picked = null;
      }
    },
    template: `
      <div :class="groupClass" id="rating-system">
        <div>{{ leftLabel }}</div>
        <label v-for="number in 5" :key="number" class="custom-radio">
        <div>{{ number }}</div>
          <input type="radio" :name="groupClass" :value="number" v-model="picked">
        </label>
        <div>{{ rightLabel }}</div>

      </div>
  `
  });

  Vue.component('checkbox-component', {
    props: ['label', 'value'],
    model: {
      prop: 'value',
      event: 'change'
    },
    template: `
    <label class="checkbox-container">
      <input type="checkbox" :value="label" :checked="value" @change="$emit('change', $event.target.checked)">
      <span class="checkmark"></span> {{ label }}
    </label>
  `
  });


  new Vue({
    el: 'main', // ここを 'main' タグに合わせています。
    data: {
      name: '',
      title: '',
      region_detail: '',
      selectedRegion: '',
      region: '',
      job_description: '',
      period: '',
      income: '',
      working_hours: '',
      condition: '',
      necessary_work: '',
      necessary_life: '',
      domitory_fee: '',
      commuting_time: '',
      welfare: '',
      surrounding_environment: '',
      transportation: '',
      agecheckbox: [
        { text: '10代', checked: false },
        { text: '20代', checked: false },
        { text: '30代', checked: false },
        { text: '40代', checked: false },
        { text: '50代', checked: false },
      ],
      insideRoom: [
        { text: 'TV', checked: false },
        { text: '冷房', checked: false },
        { text: '暖房', checked: false },
        { text: 'Wi-Fi', checked: false },
        { text: '風呂', checked: false },
        { text: 'トイレ', checked: false },
        { text: 'キッチン', checked: false },
        { text: '冷蔵庫', checked: false },
        { text: '洗濯機', checked: false },
        { text: '乾燥機', checked: false },
        { text: '電子レンジ', checked: false },
      ],
      outsideRoom: [
        { text: 'TV', checked: false },
        { text: '冷房', checked: false },
        { text: '暖房', checked: false },
        { text: 'Wi-Fi', checked: false },
        { text: '風呂', checked: false },
        { text: 'トイレ', checked: false },
        { text: 'キッチン', checked: false },
        { text: '冷蔵庫', checked: false },
        { text: '洗濯機', checked: false },
        { text: '乾燥機', checked: false },
        { text: '電子レンジ', checked: false },
      ],
      surroundingEnvironment: [
        { text: 'コンビニ', checked: false },
        { text: 'スーパー', checked: false },
        { text: '銀行・ATM', checked: false },
        { text: '居酒屋', checked: false },
        { text: '温泉', checked: false },
        { text: 'バス停・駅', checked: false }
      ],
      necessaryThing: [
        { text: '必要なもの', checked: false },
      ],
    },
    methods: {
      handleRegionUpdate: function (region) {
        this.selectedRegion = region; // 選択された地域名をデータプロパティに設定
      },
      submitForm() {
        console.log(this.selectedRegion); // name の値をログに出力
        // ここでフォームのデータを使用する
        console.log(this.name); // name の値をログに出力
        console.log(this.title); // title の値をログに出力
        console.log(this.region_detail); // region_detail の値をログに出力
        // 他のデータも同様に取得して使用できます。

        // 送信処理など
      }
    }
  });



  // ----------------------------------------------------------------------------

  // 画像プレビューの処理を関数で一括管理
  function handleImagePreview(event, previewContainerSelector) {
    var files = event.target.files;
    var $previewContainer = $(previewContainerSelector);
    $previewContainer.empty(); // 既存のプレビューをクリア

    for (let i = 0; i < files.length && i < 5; i++) { // 最大5枚までの画像をプレビュー
      const file = files[i];
      const reader = new FileReader();
      reader.onload = function (e) {
        $('<img>').attr('src', e.target.result).appendTo($previewContainer);
      };
      reader.readAsDataURL(file);
    }
  }

  // 画像入力フィールドのイベントリスナーを設定
  $('#image-input, #image-input2').on('change', function (event) {
    var previewContainerId = $(this).is('#image-input') ? '#preview-container' : '#preview-container2';
    handleImagePreview(event, previewContainerId);
  });

  // リストアイテム追加の処理
  function addListItem() {
    var itemText = $('#list-item-input').val().trim();
    if (itemText !== '' && $('#list-container li').length < 5) {
      $('<li>').text(itemText).appendTo('#list-container').append($('<button>').text('削除').click(function () {
        $(this).parent().remove();
      }));
      $('#list-item-input').val(''); // 入力フィールドをクリア
    } else {
      alert('最大5個の項目を追加できます。');
    }
  }

  // 追加ボタンとEnterキーでのイベントハンドラー設定
  $('#add-item-button').on('click', addListItem);
  $('#list-item-input').on('keypress', function (event) {
    if (event.which === 13) { // Enterキーが押された場合
      addListItem();
      event.preventDefault(); // フォーム送信を防ぐ
    }
  });

  // リストアイテムの削除機能
  $('#list-container').on('click', '.remove-item-button', function () {
    $(this).parent('li').remove();
  });


  $('.submit-button').on('click', saveToFirestore);


  // データベース追加関数
  function saveToFirestore() {
    // 新しいドキュメントの参照を作成
    const jobPostingRef = db.collection('jobPostings').doc();
    // 保存するデータオブジェクトを作成
    const jobPostingData = {
      region: selectRegion,
      // region_detail: this.region_detail,
      // ...他のデータプロパティ
    };

    // データをFirestoreに保存
    jobPostingRef.set(jobPostingData)
      .then(() => {
        alert('求人情報が保存されました。');
      })
      .catch(error => {
        console.error('エラーが発生しました: ', error);
      });
  };


});



