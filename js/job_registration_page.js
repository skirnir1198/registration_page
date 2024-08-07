$(function () {
  var uid = localStorage.getItem('uid');
  const db = firebase.firestore();


  $(document).ready(function () {
    const inputs = $('input');
    const textareas = $('textarea');
    const select = $('select');

    inputs.each(function (index) {
      $(this).on('keydown', function (e) {
        if (e.key === 'Enter') {
          console.log(index);
          e.preventDefault(); // デフォルトのEnterキー動作を防ぐ
          if (index === 2) { // 3つ目のinputの場合
            textareas.eq(0).focus(); // 1つ目のtextareaにフォーカスを当てる
          } else if (index === 4) { // 3つ目のinputの場合
            select.eq(1).focus(); // 1つ目のtextareaにフォーカスを当てる
          } else if (index === 6) { // 3つ目のinputの場合
            addListItem();
          } else if (index === 27) { // 3つ目のinputの場合
            inputs.eq(28).focus();
          } else if (index === 28) { // 3つ目のinputの場合
            textareas.eq(2).focus();
          } else if (index === 29) { // 3つ目のinputの場合
            select.eq(3).focus();
          } else if (index === 34) { // 3つ目のinputの場合
            select.eq(4).focus();
          } else if (index === 36) { // 3つ目のinputの場合
            select.eq(7).focus();
          } else {
            const nextInput = inputs.eq(index + 1);
            if (nextInput.length) {
              nextInput.focus();
            }
          }
        }
      });

    });

    textareas.each(function (index) {
      $(this).on('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault(); // デフォルトのEnterキー動作を防ぐ
          if (index === 0) { // 1つ目のtextareaの場合
            select.eq(0).focus();
          } else if (index === 1) { // 1つ目のtextareaの場合
            inputs.eq(5).focus();
          } else if (index === 2) { // 1つ目のtextareaの場合
            inputs.eq(29).focus();
          } else if (index === 3) { // 1つ目のtextareaの場合
            inputs.eq(30).focus();
          } else if (index === 4) { // 1つ目のtextareaの場合
            select.eq(6).focus();
          } else {
            const nextTextarea = textareas.eq(index + 1);
            if (nextTextarea.length) {
              nextTextarea.focus();
            }
          }
        }
      });
    });

    select.each(function (index) {
      $(this).on('change', function (e) {
        console.log(index);
        if (index === 0) { // 1つ目のselectの場合
          inputs.eq(3).focus();
        } else if (index === 1) { // 1つ目のselectの場合
          textareas.eq(1).focus();
        } else if (index == 2) {
          inputs.eq(27).focus();
        } else if (index == 3) {
          textareas.eq(3).focus();
        } else if (index == 5) {
          textareas.eq(4).focus();
        } else if (index === 6) { // 1つ目のtextareaの場合
          inputs.eq(35).focus();
        } else {
          const nextSelect = select.eq(index + 1);
          if (nextSelect.length) {
            nextSelect.focus();
          }
        }
      });
    });
  });


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
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-occupation', selectedText);
      },
    },
    template: `
  <select @change="updateSelectedText">
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
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-employment', selectedText);
      },
    },
    template: `
  <select @change="updateSelectedText">
    <option value="派遣社員">派遣社員</option>
    <option value="正社員">正社員</option>
    <option value="アルバイト">アルバイト</option>
  </select>
  `
  });

  Vue.component('clothing-component', {
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-clothing', selectedText);
      },
    },
    template: `
  <select @change="updateSelectedText">
    <option value="洋装">洋装</option>
    <option value="二部式着物">二部式着物</option>
    <option value="本式着物">本式着物</option>
    <option value="作務衣">作務衣</option>
    <option value="作務衣またはスーツ">作務衣またはスーツ</option>
    <option value="その他">その他</option>
  </select>
  `
  });

  Vue.component('car-component', {
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-car', selectedText);
      },
    },
    template: `
  <select @change="updateSelectedText">
    <option value="可能">可能</option>
    <option value="不可能">不可能</option>
    <option value="必須">必須</option>
    <option value="その他">その他</option>
  </select>
  `
  });

  Vue.component('dormitory-component', {
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-dormitory', selectedText);
      },
    },
    template: `
  <select @change="updateSelectedText">
    <option value="アパート,マンションタイプ">アパート,マンションタイプ</option>
    <option value="個室(共有スペースあり)">個室(共有スペースあり)</option>
    <option value="相部屋">相部屋</option>
  </select>
  `
  });

  Vue.component('network-component', {
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-network', selectedText);
      },
    },
    template: `
  <select @change="updateSelectedText">
    <option value="あり(部屋内)">あり(部屋内)</option>
    <option value="あり(共有スペース)">あり(共有スペース)</option>
    <option value="なし">なし</option>
  </select>
  `
  });

  Vue.component('sarary-component', {
    methods: {
      updateSelectedText: function (event) {
        // 選択されたオプションのテキストを取得
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        // 選択されたテキストをカスタムイベントを使って親に通知
        this.$emit('update-salary_type', selectedText);
      },
    },
    template: `
    <select class="salary-type" name="salary_type"@change="updateSelectedText" style="min-width: 100px;">
      <option value="hourly">時給</option>
      <option value="daily">日給</option>
      <option value="monthly">月給</option>
      <option value="other">その他</option>
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
    props: ['inputClass', 'value'], // 'value' をプロパティとして追加
    template: `
      <textarea 
        :class="inputClass" 
        :value="value"
        @input="$emit('input', $event.target.value)"
        rows="5" 
        cols="70" 
        placeholder="ここにテキストを入力してください..."
      ></textarea>
    `
  });


  Vue.component('radio-group', {
    props: ['groupClass', 'leftLabel', 'rightLabel', 'value'],
    computed: {
      internalValue: {
        get() {
          // 親コンポーネントから受け取った値を内部的に使用する
          return this.value;
        },
        set(val) {
          // ラジオボタンが変更された場合、その値を親コンポーネントに伝える
          this.$emit('input', val);
        }
      }
    },
    template: `
      <div :class="groupClass">
        <div>{{ leftLabel }}</div>
        <label v-for="number in 5" :key="number" class="custom-radio">
          <div>{{ number }}</div>
          <input type="radio" :name="groupClass" :value="number" v-model="internalValue">
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
      company: '',
      email: '',
      title: '',
      region_detail: '',
      selectedRegion: '北海道',
      type: 'レストランサービス',
      region: '',
      employment: '派遣社員',
      clothing: '洋装',
      car: '可能',
      job_description: '',
      period: '',
      salary_type: '時給',
      wage: '',
      income: '',
      working_hours: '',
      condition: '',
      dietary_conditions: '',
      necessary_work: '',
      necessary_life: '',
      network: 'あり(部屋内)',
      domitoryType: 'アパート,マンションタイプ',
      domitory_fee: '',
      commuting_time: '',
      welfare: '',
      surrounding_environment: '',
      transportation: '',
      sexRatio: null,
      overtime: null,
      atmosphere: null,
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
    },
    created: function () {
      this.checkAuth();
    },
    methods: {
      checkAuth: function () {
        var uid = localStorage.getItem('uid');
        if (!uid) {
          window.location.href = 'sign_in.html'; // ログインページへリダイレクト
        } else {
          db.collection("user").doc(uid).get().then((doc) => {
            if (doc.exists) {
              this.company = doc.data().userName;
              this.email = doc.data().email;

            } else {
              console.log("No such document!");
            }
          }).catch((error) => {
            console.error("Error getting document:", error);
          });
        }
      },
      handleRegionUpdate: function (region) {
        this.selectedRegion = region; // 選択された地域名をデータプロパティに設定
      },
      handleOccupationUpdate: function (type) {
        this.type = type; // 選択された地域名をデータプロパティに設定
      },
      handleSalaryTypeUpdate: function (salary_type) {
        this.salary_type = salary_type; // 選択された地域名をデータプロパティに設定
      },
      handleEmploymentUpdate: function (employment) {
        this.employment = employment; // 選択された地域名をデータプロパティに設定
      },
      handleClothingUpdate: function (clothing) {
        this.clothing = clothing; // 選択された地域名をデータプロパティに設定
      },
      handleCarUpdate: function (car) {
        this.car = car; // 選択された地域名をデータプロパティに設定
      },
      handleDormitoryUpdate: function (domitoryType) {
        this.domitoryType = domitoryType; // 選択された地域名をデータプロパティに設定
      },
      handleNetworkUpdate: function (network) {
        this.network = network; // 選択された地域名をデータプロパティに設定
      },


      saveForm() {
        $('#loading').show();
        $('.error').empty();
        var liTexts = [];
        // 各li要素に対して処理を実行
        $('#list-container li').each(function () {
          // li要素の子ノードを取得し、テキストノードだけをフィルタリング
          var text = $(this).contents().filter(function () {
            return this.nodeType === 3; // ノードタイプ3はテキストノードを指します
          }).text().trim();
          // 配列にテキストを追加
          liTexts.push(text);
        });
        const db = firebase.firestore();
        // データを保存するための Firestore コレクションを指定
        const jobPostingsCollection = db.collection('jobPostings').doc();
        const checkedAges = this.agecheckbox
          .map((item, index) => item.checked ? index : -1) // チェックされたもののインデックスを取得、そうでなければ -1
          .filter(index => index !== -1); // -1 を除外して実際にチェックされたインデックスのみを取得
        // フィルタリングされたオブジェクトから 'text' のみを取り出す
        const checkedEnvironment = this.surroundingEnvironment
          .filter(item => item.checked) // checked が true の要素のみをフィルタリング
          .map(item => item.text); // フィルタリングされた要素の text のみを抽出

        const checkedInsideRoom = this.insideRoom
          .filter(item => item.checked) // checked が true の要素のみをフィルタリング
          .map(item => item.text); // フィルタリングされた要素の text のみを抽出

        const checkedOutSide = this.outsideRoom
          .filter(item => item.checked) // checked が true の要素のみをフィルタリング
          .map(item => item.text); // フィルタリングされた要素の text のみを抽出
        // Firestoreから現在のTimestampを取得
        const timestamp = firebase.firestore.Timestamp.now();
        // TimestampをDateオブジェクトに変換
        const date = timestamp.toDate();
        const isoString = date.toISOString();
        // フォームデータをオブジェクトにまとめる
        const formData = {
          uid: uid,
          docId: jobPostingsCollection.id,
          link: jobPostingsCollection.id,
          company: this.company,
          email: this.email,
          name: this.name,
          title: this.title.replace(/\n/g, '<br>'),
          region_detail: this.region_detail,
          selectedRegion: this.selectedRegion,
          salary_type: this.salary_type,
          wage: $('.wage').val(),
          type: this.type,
          region: this.region,
          employment: this.employment,
          clothing: this.clothing,
          car: this.car,
          job_description: this.job_description.replace(/\n/g, '<br>'),
          holiday: [$(".holiday-start").val(), $(".holiday-end").val()],
          period: this.period,
          income: this.income,
          working_hours: this.working_hours.replace(/\n/g, '<br>'),
          good_points: liTexts,
          condition: this.condition,
          dietary_conditions: this.dietary_conditions.replace(/\n/g, '<br>'),
          necessary_work: this.necessary_work,
          necessary_life: this.necessary_life,
          network: this.network,
          domitoryType: this.domitoryType,
          domitory_fee: this.domitory_fee,
          commuting_time: this.commuting_time,
          welfare: this.welfare.replace(/\n/g, '<br>'),
          surrounding_environment: this.surrounding_environment.replace(/\n/g, '<br>'),
          transportation_expenses: $('.transportation_expenses').val(),
          transportation: this.transportation.replace(/\n/g, '<br>'),
          sexRatio: this.sexRatio - 1,
          overtime: this.overtime - 1,
          atmosphere: this.atmosphere - 1,
          agecheckbox: checkedAges,
          insideRoom: checkedInsideRoom,
          outsideRoom: checkedOutSide,
          surroundingEnvironment: checkedEnvironment,
          createdAt: isoString,
          release: false,
        };

        // Firestore にデータを追加
        jobPostingsCollection.set(formData)
          .then(docRef => {
            console.log('求人情報が保存されました。ドキュメントID:', jobPostingsCollection.id);
            uploadImagesAndSaveFormData(jobPostingsCollection.id);

          })
          .catch(error => {
            console.error('データの保存中にエラーが発生しました:', error);
          });
      },
      submitForm() {
        $('#loading').show();
        $('.error').empty();
        var liTexts = [];
        // 各li要素に対して処理を実行
        $('#list-container li').each(function () {
          // li要素の子ノードを取得し、テキストノードだけをフィルタリング
          var text = $(this).contents().filter(function () {
            return this.nodeType === 3; // ノードタイプ3はテキストノードを指します
          }).text().trim();
          // 配列にテキストを追加
          liTexts.push(text);
        });
        const db = firebase.firestore();
        // データを保存するための Firestore コレクションを指定
        const jobPostingsCollection = db.collection('jobPostings').doc();
        const checkedAges = this.agecheckbox
          .map((item, index) => item.checked ? index : -1) // チェックされたもののインデックスを取得、そうでなければ -1
          .filter(index => index !== -1); // -1 を除外して実際にチェックされたインデックスのみを取得
        // フィルタリングされたオブジェクトから 'text' のみを取り出す
        const checkedEnvironment = this.surroundingEnvironment
          .filter(item => item.checked) // checked が true の要素のみをフィルタリング
          .map(item => item.text); // フィルタリングされた要素の text のみを抽出

        const checkedInsideRoom = this.insideRoom
          .filter(item => item.checked) // checked が true の要素のみをフィルタリング
          .map(item => item.text); // フィルタリングされた要素の text のみを抽出

        const checkedOutSide = this.outsideRoom
          .filter(item => item.checked) // checked が true の要素のみをフィルタリング
          .map(item => item.text); // フィルタリングされた要素の text のみを抽出

        if (!this.company) {
          $('.error').append($('<p>').text(`「会社名」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.email) {
          $('.error').append($('<p>').text(`「メールアドレス」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.name) {
          $('.error').append($('<p>').text(`「施設名」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.title) {
          $('.error').append($('<p>').text(`「タイトル」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.region_detail) {
          $('.error').append($('<p>').text(`「都道府県以降の住所」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.job_description) {
          $('.error').append($('<p>').text(`「お仕事内容」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.period) {
          $('.error').append($('<p>').text(`「期間」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (checkedAges.length == 0) {
          $('.error').append($('<p>').text(`「年齢層」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.sexRatio) {
          $('.error').append($('<p>').text(`「男女比」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.overtime) {
          $('.error').append($('<p>').text(`「残業」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (!this.atmosphere) {
          $('.error').append($('<p>').text(`「雰囲気」は必須項目です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (document.getElementById('image-input1').files.length == 0) {
          $('.error').append($('<p>').text(`「写真」は最低一枚必要です。`));
          $('#loading').hide();
          return; // 処理を停止
        }
        if (document.getElementById('image-input2').files.length == 0) {
          $('.error').append($('<p>').text(`「寮の写真」は最低一枚必要です。`));
          $('#loading').hide();
          return; // 処理を停止
        }

        // Firestoreから現在のTimestampを取得
        const timestamp = firebase.firestore.Timestamp.now();
        // TimestampをDateオブジェクトに変換
        const date = timestamp.toDate();
        const isoString = date.toISOString();
        // フォームデータをオブジェクトにまとめる
        const formData = {
          uid: uid,
          docId: jobPostingsCollection.id,
          link: jobPostingsCollection.id,
          company: this.company,
          email: this.email,
          name: this.name,
          title: this.title.replace(/\n/g, '<br>'),
          region_detail: this.region_detail,
          selectedRegion: this.selectedRegion,
          salary_type: this.salary_type,
          wage: $('.wage').val(),
          type: this.type,
          region: this.region,
          employment: this.employment,
          clothing: this.clothing,
          car: this.car,
          job_description: this.job_description.replace(/\n/g, '<br>'),
          holiday: [$(".holiday-start").val(), $(".holiday-end").val()],
          period: this.period,
          income: this.income,
          working_hours: this.working_hours.replace(/\n/g, '<br>'),
          good_points: liTexts,
          condition: this.condition,
          dietary_conditions: this.dietary_conditions.replace(/\n/g, '<br>'),
          necessary_work: this.necessary_work,
          necessary_life: this.necessary_life,
          network: this.network,
          domitoryType: this.domitoryType,
          domitory_fee: this.domitory_fee,
          commuting_time: this.commuting_time,
          welfare: this.welfare.replace(/\n/g, '<br>'),
          surrounding_environment: this.surrounding_environment.replace(/\n/g, '<br>'),
          transportation_expenses: $('.transportation_expenses').val(),
          transportation: this.transportation.replace(/\n/g, '<br>'),
          sexRatio: this.sexRatio - 1,
          overtime: this.overtime - 1,
          atmosphere: this.atmosphere - 1,
          agecheckbox: checkedAges,
          insideRoom: checkedInsideRoom,
          outsideRoom: checkedOutSide,
          surroundingEnvironment: checkedEnvironment,
          createdAt: isoString,
          release: true,
        };

        // Firestore にデータを追加
        jobPostingsCollection.set(formData)
          .then(docRef => {
            console.log('求人情報が保存されました。ドキュメントID:', jobPostingsCollection.id);
            uploadImagesAndSaveFormData(jobPostingsCollection.id);

          })
          .catch(error => {
            console.error('データの保存中にエラーが発生しました:', error);
          });
      }
    }
  });



  // ----------------------------------------------------------------------------

  let filesToUpload = []; // アップロードするファイルを保持する配列
  let filesToUpload2 = []; // アップロードするファイルを保持する配列

  // 1セット目の画像選択と処理
  const imageInput1 = document.getElementById('image-input1');
  if (imageInput1) {
    imageInput1.addEventListener('change', function(event) {
      handleFileSelection(event, filesToUpload, 'image-preview1', 'image-input1');
    });
  }

  // 2セット目の画像選択と処理
  const imageInput2 = document.getElementById('image-input2');
  if (imageInput2) {
    imageInput2.addEventListener('change', function(event) {
      handleFileSelection(event, filesToUpload, 'image-preview2', 'image-input2');
    });
  }

  // 共通のファイル選択処理関数
  function handleFileSelection(event, filesArray, previewId, uploadButtonId) {
    const currentImages = document.querySelectorAll(`#${previewId} .image-container`).length;
    const maxFiles = 5;
    const filesToAdd = Array.from(event.target.files).slice(0, maxFiles - currentImages);

    filesToAdd.forEach(file => {
      if (!file.type.startsWith('image/')) { return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        const container = document.createElement('div');
        container.classList.add('image-container');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '×';
        deleteBtn.onclick = () => {
          const index = filesArray.indexOf(file);
          if (index > -1) {
            filesArray.splice(index, 1); // 配列からファイルを削除
          }
          container.remove();
          checkFileButtonDisabled(uploadButtonId); // アップロードボタンの状態を更新
          checkAddMoreFiles(previewId, uploadButtonId); // 追加可能なファイル数を再チェック
        };

        container.appendChild(imgElement);
        container.appendChild(deleteBtn);
        document.getElementById(previewId).appendChild(container);
        filesArray.push(file);
        checkFileButtonDisabled(uploadButtonId);
      };
      reader.readAsDataURL(file);
    });
  }

  function checkFileButtonDisabled(buttonId) {
    const uploadButton = document.getElementById(buttonId);
    const numberOfImages = document.querySelectorAll(`#${buttonId} .image-container`).length;
    uploadButton.disabled = numberOfImages === 0;
  }

  function checkAddMoreFiles(previewId, buttonId) {
    const uploadButton = document.getElementById(buttonId);
    const numberOfImages = document.querySelectorAll(`#${previewId} .image-container`).length;
    const maxFiles = 5;
    if (numberOfImages < maxFiles) {
      uploadButton.disabled = false; // アップロードボタンを再度有効化
    }
  }

  // 画像をリサイズする関数
  function resizeImage(file, maxWidth = 250, quality = 0.9) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let width = image.width;
        let height = image.height;

        // 幅が最大幅を超える場合はサイズを調整
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        // canvasを使用して画像をリサイズ
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, {
            type: 'image/jpeg', lastModified: Date.now()
          }));
        }, 'image/jpeg', quality);
      };
      image.onerror = error => reject(error);
    });
  }

  // リサイズした画像をFirebaseへアップロード
  async function uploadImageToFirebase(file, url) {
    const resizedImage = await resizeImage(file);
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`jobPostingsimages/${url}/${file.name}`);
    await fileRef.put(resizedImage);
    return fileRef.getDownloadURL();
  }

  // アップロードとフォームデータの保存
  async function uploadImagesAndSaveFormData(id) {
    const urls = await Promise.all(filesToUpload.map(file => uploadImageToFirebase(file, `job_image/${id}`)));
    const urls2 = await Promise.all(filesToUpload2.map(file => uploadImageToFirebase(file, `domitory_image/${id}`)));

    const formData = {
      imageUrls1: urls,  // 1つ目のセットの画像URL
      imageUrls2: urls2  // 2つ目のセットの画像URL
    };

    db.collection('jobPostings').doc(id).update(formData)
      .then(() => {
        console.log('求人情報と画像のURLが保存されました。');
        $('#loading').hide();
        window.location.href = 'job_list_page.html';
      })
      .catch(error => {
        console.error('データの保存中にエラーが発生しました:', error);
        $('#loading').hide();
      });
  }

  // リストアイテム追加の処理
  function addListItem() {
    var itemText = $('#list-item-input').val().trim();
    if (itemText !== '' && $('#list-container li').length < 5) {
      $('<li>').text(itemText).appendTo('#list-container').append($('<button>').text('削除').click(function () {
        $(this).parent().remove();
      }));
      $('#list-item-input').val(''); // 入力フィールドをクリア
    } else if (itemText == '') { } else {
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

  function validateNumber(input) {
    // 数字以外の文字を削除
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  $('#loading').hide();

  // ランダムなIDを生成する関数
  function generateRandomId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // データを複製する関数
  // async function duplicateDocument(sourceCollection, sourceDoc, targetCollection) {
  //   try {
  //       const docRef = db.collection(sourceCollection).doc(sourceDoc);
  //       const docSnapshot = await docRef.get();

  //       if (docSnapshot.exists) {
  //           const data = docSnapshot.data();
  //           const randomId = generateRandomId(16); // 16文字のランダムなIDを生成
  //           await db.collection(targetCollection).doc(randomId).set(data);
  //           console.log(`ドキュメントが ${sourceCollection}/${sourceDoc} から ${targetCollection}/${randomId} に複製されました。`);
  //       } else {
  //           console.log(`${sourceCollection}/${sourceDoc} が存在しません。`);
  //       }
  //   } catch (error) {
  //       console.error('複製中にエラーが発生しました: ', error);
  //   }
  // }

  // // ドキュメント名を指定してデータを複製
  // duplicateDocument('jobPostings', 'XmgL9nCzRMOv9ediqnR0', 'jobPostings');


});

