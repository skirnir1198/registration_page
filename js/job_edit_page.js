$(function () {
  const db = firebase.firestore();
  var jobId = '';
  var uploadImage1 = [];
  var uploadImage2 = [];
  var deleteImage = [];

  $(document).ready(function () {
    const inputs = $('input');
    const textareas = $('textarea');
    const select = $('select');
    inputs.each(function (index) {
      $(this).on('keydown', function (e) {
        if (e.key === 'Enter') {
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

  // Vueコンポーネントの定義
  Vue.component('area-component', {
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値をコピー
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; // 親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select @change="updateSelectedText" v-model="internalValue">
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
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値をコピー
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; // 親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select @change="updateSelectedText" v-model="internalValue">
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
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値を設定
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; // 親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select @change="updateSelectedText" v-model="internalValue">
        <option value="派遣社員">派遣社員</option>
        <option value="正社員">正社員</option>
        <option value="アルバイト">アルバイト</option>
      </select>
    `
  });

  Vue.component('clothing-component', {
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値をコピー
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; // 親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select @change="updateSelectedText" v-model="internalValue">
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
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値をコピー
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; // 親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select @change="updateSelectedText" v-model="internalValue">
        <option value="可能">可能</option>
        <option value="不可能">不可能</option>
        <option value="必須">必須</option>
        <option value="その他">その他</option>
      </select>
    `
  });


  Vue.component('dormitory-component', {
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値をコピー
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; // 親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select @change="updateSelectedText" v-model="internalValue">
        <option value="アパート,マンションタイプ">アパート,マンションタイプ</option>
        <option value="個室(共有スペースあり)">個室(共有スペースあり)</option>
        <option value="相部屋">相部屋</option>
      </select>
    `
  });

  Vue.component('network-component', {
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値をコピー
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; //親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select @change="updateSelectedText" v-model="internalValue">
        <option value="あり(部屋内)">あり(部屋内)</option>
        <option value="あり(共有スペース)">あり(共有スペース)</option>
        <option value="なし">なし</option>
      </select>
    `
  });


  Vue.component('sarary-component', {
    props: ['value'],
    data() {
      return {
        internalValue: this.value // 初期値をコピー
      };
    },
    watch: {
      value(newVal) {
        this.internalValue = newVal; // 親コンポーネントから値が変更されたときに更新
      }
    },
    methods: {
      updateSelectedText: function (event) {
        const selectedText = event.target.value;
        this.internalValue = selectedText;
        this.$emit('input', selectedText); // 親コンポーネントに変更を通知
      },
    },
    template: `
      <select class="salary-type" name="salary_type" @change="updateSelectedText" v-model="internalValue" style="min-width: 100px;">
        <option value="時給">時給</option>
        <option value="日給">日給</option>
        <option value="月給">月給</option>
        <option value="その他">その他</option>
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
    props: ['inputClass', 'value'],
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
          return this.value;
        },
        set(val) {
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

  var app = new Vue({
    el: 'main',
    data: {
      name: '',
      company: '',
      email: '',
      title: '',
      region_detail: '',
      selectedRegion: '',
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
      release: false,
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
      imageUrls1: [],
      imageUrls2: [],
    },
    created: function () {
      this.fetchJobData();
    },
    methods: {
      fetchJobData: function () {
        jobId = new URLSearchParams(window.location.search).get('param');
        db.collection('jobPostings').doc(jobId).get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if(data.uid != localStorage.getItem('uid')) window.location.href = 'sign_in.html'; // 遷移先のURLを入力してください
            this.name = data.name;
            this.company = data.company;
            this.email = data.email;
            this.title = data.title;
            this.region_detail = data.region_detail;
            this.selectedRegion = data.selectedRegion; // データベースから取得した値をセット
            this.type = data.type;
            this.region = data.region;
            this.employment = data.employment;
            this.clothing = data.clothing;
            this.car = data.car;
            this.job_description = data.job_description;
            this.period = data.period;
            this.salary_type = data.salary_type;
            this.wage = data.wage;
            this.income = data.income;
            this.working_hours = data.working_hours;
            this.condition = data.condition;
            this.dietary_conditions = data.dietary_conditions;
            this.necessary_work = data.necessary_work;
            this.necessary_life = data.necessary_life;
            this.network = data.network;
            this.domitoryType = data.domitoryType;
            this.domitory_fee = data.domitory_fee;
            this.commuting_time = data.commuting_time;
            this.welfare = data.welfare;
            this.surrounding_environment = data.surrounding_environment;
            this.transportation = data.transportation;
            this.sexRatio = data.sexRatio + 1;
            this.overtime = data.overtime + 1;
            this.atmosphere = data.atmosphere + 1;
            this.release = data.release;

            // 画像1の初期設定
            uploadImage1 = data.imageUrls1 || [];
            this.updateImagePreview('image-preview1', uploadImage1);

            // 画像2の初期設定
            uploadImage2 = data.imageUrls2 || [];
            this.updateImagePreview('image-preview2', uploadImage2);
            this.agecheckbox.forEach((item, index) => {
              item.checked = data.agecheckbox.includes(index);
            });

            this.insideRoom.forEach((item) => {
              item.checked = data.insideRoom.includes(item.text);
            });

            this.outsideRoom.forEach((item) => {
              item.checked = data.outsideRoom.includes(item.text);
            });

            this.surroundingEnvironment.forEach((item) => {
              item.checked = data.surroundingEnvironment.includes(item.text);
            });

            data.good_points.forEach(point => {
              $('<li>').text(point).appendTo('#list-container').append($('<button>').text('削除').click(function () {
                $(this).parent().remove();
              }));
            });
          } else {
            console.log("No such document!");
          }
        }).catch((error) => {
          console.error("Error getting document:", error);
        });
      },
      updateImagePreview(previewId, imageArray) {
        const imagePreview = document.getElementById(previewId);
        imagePreview.innerHTML = '';
        imageArray.forEach((item, index) => {
          const imgElement = document.createElement('img');
          imgElement.src = typeof item === 'string' ? item : URL.createObjectURL(item);
          const container = document.createElement('div');
          container.classList.add('image-container');
          const deleteBtn = document.createElement('button');
          deleteBtn.classList.add('delete-btn');
          deleteBtn.textContent = '×';
          deleteBtn.onclick = () => {
            // .image-container の要素リストを取得
            const containers = document.querySelectorAll(`#${previewId} .image-container`);
            // クリックされた要素のインデックスを取得
            const containerIndex = Array.prototype.indexOf.call(containers, container);
            if (imgElement.src.startsWith('https://firebasestorage.googleapis.com/')) deleteImage.push(imgElement.src);
            const uploadIndex = imageArray.findIndex(element => (typeof element === 'string' ? element : URL.createObjectURL(element)) === imgElement.src);
            if (uploadIndex > -1) {
              if (previewId == 'image-preview1') uploadImage1.splice(containerIndex, 1);
              else uploadImage2.splice(containerIndex, 1); this.updateImagePreview(previewId, imageArray);
            } else {
              if (previewId == 'image-preview1') uploadImage1.splice(containerIndex, 1);
              else uploadImage2.splice(containerIndex, 1);
              this.updateImagePreview(previewId, imageArray);
            }
          };
          container.appendChild(imgElement);
          container.appendChild(deleteBtn);
          imagePreview.appendChild(container);
        });
      },


      handleFileSelection(event, filesArray, urlsArray, previewId) {
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
              // .image-container の要素リストを取得
              const containers = document.querySelectorAll(`#${previewId} .image-container`);
              // クリックされた要素のインデックスを取得
              const containerIndex = Array.prototype.indexOf.call(containers, container);
              if (imgElement.src.startsWith('https://firebasestorage.googleapis.com/')) deleteImage.push(imgElement.src);
              const index = urlsArray.indexOf(e.target.result);
              if (index > -1) {
                urlsArray.splice(containerIndex, 1);
                filesArray.splice(containerIndex, 1);
              }
              container.remove();
              urlsArray = urlsArray.filter(url => url !== e.target.result);
              if (previewId == 'image-preview1') uploadImage1.splice(containerIndex, 1);
              else uploadImage2.splice(containerIndex, 1);
            };
            container.appendChild(imgElement);
            container.appendChild(deleteBtn);
            document.getElementById(previewId).appendChild(container);
            filesArray.push(file);
            // urlsArray.push(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      },
      handleRegionUpdate: function (region) {
        this.selectedRegion = region;
      },
      handleOccupationUpdate: function (type) {
        this.type = type;
      },
      handleSalaryTypeUpdate: function (salary_type) {
        this.salary_type = salary_type;
      },
      handleEmploymentUpdate: function (employment) {
        this.employment = employment;
      },
      handleClothingUpdate: function (clothing) {
        this.clothing = clothing;
      },
      handleCarUpdate: function (car) {
        this.car = car;
      },
      handleDormitoryUpdate: function (domitoryType) {
        this.domitoryType = domitoryType;
      },
      handleNetworkUpdate: function (network) {
        this.network = network;
      },
      validateNumber: function (input) {
        input.value = input.value.replace(/[^0-9]/g, '');
      },
      openModal: function () {
        document.getElementById("myModal").style.display = "block";
      },
      closeModal: function () {
        document.getElementById("myModal").style.display = "none";
      },
      handleChoice: function (choice) {
        this.closeModal();
        this.submitForm(choice);
      },
      submitForm(choice) {
        $('#loading').show();
        $('.error').empty();
        var liTexts = [];
        $('#list-container li').each(function () {
          var text = $(this).contents().filter(function () {
            return this.nodeType === 3;
          }).text().trim();
          liTexts.push(text);
        });
        const checkedAges = this.agecheckbox.map((item, index) => item.checked ? index : -1).filter(index => index !== -1);
        const checkedEnvironment = this.surroundingEnvironment.filter(item => item.checked).map(item => item.text);
        const checkedInsideRoom = this.insideRoom.filter(item => item.checked).map(item => item.text);
        const checkedOutSide = this.outsideRoom.filter(item => item.checked).map(item => item.text);
        if (choice == 1) {
          if (!this.company) {
            $('.error').append($('<p>').text(`「会社名」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.email) {
            $('.error').append($('<p>').text(`「メールアドレス」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.name) {
            $('.error').append($('<p>').text(`「施設名」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.title) {
            $('.error').append($('<p>').text(`「タイトル」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.region_detail) {
            $('.error').append($('<p>').text(`「都道府県以降の住所」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.job_description) {
            $('.error').append($('<p>').text(`「お仕事内容」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.period) {
            $('.error').append($('<p>').text(`「期間」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (checkedAges.length == 0) {
            $('.error').append($('<p>').text(`「年齢層」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.sexRatio) {
            $('.error').append($('<p>').text(`「男女比」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.overtime) {
            $('.error').append($('<p>').text(`「残業」は必須項目です。`));
            $('#loading').hide();
            return;
          }
          if (!this.atmosphere) {
            $('.error').append($('<p>').text(`「雰囲気」は必須項目です。`));
            $('#loading').hide();
            return;
          }

          if (document.querySelectorAll(`#image-preview1 .image-container`).length <= 0) {
            $('.error').append($('<p>').text(`「職場の写真」は最低一枚必要です。`));
            $('#loading').hide();
            return;
          }
          if (document.querySelectorAll(`#image-preview2 .image-container`).length <= 0) {
            $('.error').append($('<p>').text(`「寮の写真」は最低一枚必要です。`));
            $('#loading').hide();
            return;
          }
        }

        const timestamp = firebase.firestore.Timestamp.now();
        const date = timestamp.toDate();
        const isoString = date.toISOString();
        const formData = {
          uid: localStorage.getItem('uid'),
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
          release: choice == 1,
        };

        db.collection('jobPostings').doc(jobId).update(formData)
          .then(() => {
            console.log('求人情報が保存されました。ドキュメントID:', jobId);
            uploadImagesAndSaveFormData(jobId);
          })
          .catch(error => {
            console.error('データの保存中にエラーが発生しました:', error);
          });
      }
    }
  });


  // モーダルを開くボタン
  var openModalBtn = document.getElementById("openModalBtn");
  // モーダル本体
  var modal = document.getElementById("myModal");

  // モーダルを閉じるための<span>要素
  var span = document.getElementsByClassName("close")[0];

  // モーダルを開くボタンのクリックイベント
  if (openModalBtn)
    openModalBtn.onclick = function () {
      modal.style.display = "block";
    }

  // モーダルを閉じる<span>要素のクリックイベント
  if (span)
    span.onclick = function () {
      modal.style.display = "none";
    }

  // モーダル外をクリックした場合の処理
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // モーダル内のボタンのクリックイベント
  var modalButtons = document.getElementsByClassName("modal-button");
  for (var i = 0; i < modalButtons.length; i++) {
    modalButtons[i].onclick = function () {
      var selectedChoice = this.getAttribute("data-choice");
      modal.style.display = "none";
      app.handleChoice(selectedChoice);
    }
  }


  document.getElementById('image-input1').addEventListener('change', function (event) {
    handleFileSelection(event, uploadImage1, 'image-preview1', 'image-input1');
  });

  document.getElementById('image-input2').addEventListener('change', function (event) {
    handleFileSelection(event, uploadImage2, 'image-preview2', 'image-input2');
  });

  function handleFileSelection(event, filesArray, previewId, inputId) {
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
          // .image-container の要素リストを取得
          const containers = document.querySelectorAll(`#${previewId} .image-container`);
          // クリックされた要素のインデックスを取得
          const containerIndex = Array.prototype.indexOf.call(containers, container);
          if (imgElement.src.startsWith('https://firebasestorage.googleapis.com/')) deleteImage.push(imgElement.src);
          const index = urlsArray.indexOf(e.target.result);
          if (index > -1) {
            urlsArray.splice(containerIndex, 1);
            filesArray.splice(containerIndex, 1);
          }
          container.remove();
          checkFileButtonDisabled(inputId);
          checkAddMoreFiles(previewId, inputId);
          // if(previewId == 'image-preview1') uploadImage1.splice(index, 1);
          // else uploadImage2.splice(index, 1);
        };
        // container.appendChild(imgElement);
        // container.appendChild(deleteBtn);
        // document.getElementById(previewId).appendChild(container);
        filesArray.push(file);
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
      uploadButton.disabled = false;
    }
  }

  async function resizeImage(file, maxWidth = 250, quality = 0.9) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let width = image.width;
        let height = image.height;
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
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


  async function uploadImageToFirebase(file, url) {
    const resizedImage = await resizeImage(file);
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`jobPostingsimages/${url}/${getRandomString(10)}`);
    await fileRef.put(resizedImage);
    return fileRef.getDownloadURL();
  }

  async function uploadImagesAndSaveFormData(id) {
    const urls = await Promise.all(uploadImage1.map(item => {
      if (typeof item === 'string' && item.startsWith('https://')) {
        // すでにURLである場合はそのまま返す
        return Promise.resolve(item);
      } else {
        // ファイルの場合はアップロードしてURLを取得する
        return uploadImageToFirebase(item, `job_image/${id}`);
      }
    }));
    const urls2 = await Promise.all(uploadImage2.map(item => {
      if (typeof item === 'string' && item.startsWith('https://')) {
        return Promise.resolve(item);
      } else {

        return uploadImageToFirebase(item, `domitory_image/${id}`);
      }
    }));
    const formData = {
      imageUrls1: urls,
      imageUrls2: urls2
    };

    db.collection('jobPostings').doc(jobId).update(formData)
      .then(() => {
        console.log('求人情報が更新されました。ドキュメントID:', jobId);
        window.location.href = 'job_list_page.html'; // 遷移先のURLを入力してください

      })
      .catch(error => {
        console.error('データの更新中にエラーが発生しました:', error);
      });

    await deleteImagesFromFirebase(deleteImage);
  }

  function addListItem() {
    var itemText = $('#list-item-input').val().trim();
    if (itemText !== '' && $('#list-container li').length < 5) {
      $('<li>').text(itemText).appendTo('#list-container').append($('<button>').text('削除').click(function () {
        $(this).parent().remove();
      }));
      $('#list-item-input').val('');
    } else if (itemText == '') { } else {
      alert('最大5個の項目を追加できます。');
    }
  }

  

  $('#add-item-button').on('click', addListItem);
  $('#list-item-input').on('keypress', function (event) {
    if (event.which === 13) {
      addListItem();
      event.preventDefault();
    }
  });

  $('#list-container').on('click', '.remove-item-button', function () {
    $(this).parent('li').remove();
  });



  $('#loading').hide();
});

async function deleteImagesFromFirebase(deleteImage) {
  const storageRef = firebase.storage().ref();
  // URLからファイルパスを取得するヘルパー関数
  function getPathFromUrl(url) {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/rizoba-app.appspot.com/o/';
    const pathWithToken = url.split(baseUrl)[1];
    const filePath = pathWithToken.split('?')[0];
    return decodeURIComponent(filePath);
  }

  // 各URLに対して削除を実行
  await Promise.all(deleteImage.map(async (url) => {
    try {
      const filePath = getPathFromUrl(url);
      const fileRef = storageRef.child(filePath);
      await fileRef.delete();
    } catch (error) {
      console.error(`Error deleting ${url}:`, error);
    }
  }));
}

function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
