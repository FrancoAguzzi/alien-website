<template>
  <div class="form-group">
    <div :class="displayCountrySelect ? 'component-phone active' : 'component-phone'">
      <button
        id="js-selected-area"
        type="button"
        @click="displayCountrySelect = !displayCountrySelect"
      >
        <img :src="userSelected.country.flag" alt="" class="flag" />
        <span>{{ userSelected.country.code }}</span>
        <img src="img/caret-blue.svg" alt="" />
      </button>
      <input
        maxlength="10"
        v-model="phonenumber"
        type="text"
        placeholder="Insira seu telefone"
        class="phone"
        @input="inputPhone($event.target.value)"
      />
      <div class="dropdown-area" id="js-dropdown-area">
        <div class="area-search">
          <input type="text" placeholder="Pesquisa pelo seu país" id="js-search-area" />
          <img src="../assets/img/icon-lupa.svg" alt="" class="icon" />
        </div>
        <ul id="js-list-area">
          <li
            v-for="(country, index) in countries"
            :key="index"
            @click.prevent="selectCountry(country)"
          >
            <a href="" class="js-select-area">
              <div>
                <img :src="country.flag" alt="" />
                <span>{{ country.country }}</span>
              </div>
              <span>{{ country.code }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from '@/Utils';
export default {
  data() {
    return {
      phonenumber: null,
      displayCountrySelect: false,
      countries: [
        {
          flag: require('@/assets/img/brasil-area.svg'),
          country: 'Brasil',
          code: '+55',
        },
        {
          flag: require('@/assets/img/usa-area.svg'),
          country: 'Estados Unidos',
          code: '+1',
        },
        {
          flag: require('@/assets/img/argentina.svg'),
          country: 'Argentina',
          code: '+54',
        },
        {
          flag: require('@/assets/img/chile-area.svg'),
          country: 'Chile',
          code: '+56',
        },
      ],
    };
  },
  props: ['userSelected'],
  methods: {
    inputPhone(value) {
      this.phonenumber = Utils.numericOnly(value).replace(/[^0-9]/g, '');
      this.$emit('setInputPhone', this.phonenumber);
    },
    selectCountry(country) {
      this.$emit('setCountryCh', {
        flag: country.flag,
        country: country.country,
        code: country.code,
      });
      this.displayCountrySelect = false;
    },
  },
};
</script>
<style>
.component-phone .dropdown-area .area-search {
  position: relative;
  height: 48px;
  margin-bottom: 20px;
}
.component-phone .dropdown-area .area-search input[type='text'] {
  border: 1px solid #00e7f9;
}
.component-phone .dropdown-area .area-search .icon {
  position: absolute;
  top: 18px;
  right: 14px;
}
.component-phone .dropdown-area ul {
  height: 105px;
  overflow-y: auto;
  height: 105px;
  overflow-y: auto;
  padding-right: 15px;
}
.component-phone .dropdown-area ul::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}
.component-phone .dropdown-area ul::-webkit-scrollbar {
  width: 5px;
  background-color: #313338;
  border-radius: 40px;
}
.component-phone .dropdown-area ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #00e7f9;
}
.component-phone .dropdown-area ul li {
  margin-bottom: 22px;
}
.component-phone .dropdown-area ul li:last-child {
  margin-bottom: 0px;
}
.component-phone .dropdown-area ul li a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.component-phone .dropdown-area ul li a > div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.component-phone .dropdown-area ul li a > div span {
  margin-left: 0.75rem;
  font-size: 1rem;
}
.component-phone .dropdown-area ul li a span {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 115%;
  letter-spacing: -0.005em;
  color: #ffffff;
}
.component-phone {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 6px;
  width: 100%;
  height: 48px;
  background: rgba(32, 34, 39, 0.9);
  padding: 13px 16px;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
.component-phone.active {
  border-radius: 0px;
}
.component-phone.active .dropdown-area {
  opacity: 1;
  pointer-events: all;
}
.component-phone button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-right: 1px solid #424449;
  padding-right: 1rem;
  margin-right: 1rem;
}
.component-phone button span {
  width: 28px;
  display: block;
  margin-left: 0.75rem;
  margin-right: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  line-height: 115%;
  letter-spacing: -0.005em;
}
.component-phone .phone {
  padding: 0;
  border: none !important;
  background: transparent;
  height: 22px;
  border-radius: 0;
  outline: none;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.component-phone .phone[data-focus-visible-added],
.component-phone .phone:focus,
.component-phone .phone:active,
.component-phone .phone.focus-visible {
  border: 1px solid transparent;
}
.component-phone .dropdown-area {
  position: absolute;
  left: 0;
  top: 33px;
  background: #1f2125;
  width: 100%;
  padding: 16px;
  opacity: 0;
  pointer-events: none;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
.component-phone .dropdown-area .area-search {
  position: relative;
  height: 48px;
  margin-bottom: 20px;
}
.component-phone .dropdown-area .area-search input[type='text'] {
  border: 1px solid #00e7f9;
}
.component-phone .dropdown-area .area-search .icon {
  position: absolute;
  top: 18px;
  right: 14px;
}
</style>
