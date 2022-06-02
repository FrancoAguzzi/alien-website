<template>
  <div :class="showLangSelect ? 'lang active' : 'lang'">
    <div class="overlay"></div>
    <button class="lang-selected" id="js-btn-open-lang" @click="showLangSelect = !showLangSelect">
      <div class="flag">
        <img src="../../assets/img/brazil.svg" alt="" />
      </div>
      <img src="img/arrow-down.svg" class="arrow" alt="" />
    </button>
    <div class="drop-lang">
      <a href="">
        <img src="../../assets/img/usa.svg" alt="" />
      </a>
      <a href="">
        <img src="../../assets/img/spain.svg" alt="" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showLangSelect: false,
    };
  },
};
</script>
<style>
header nav > div .lang {
  position: relative;
  z-index: 10;
  margin-right: 1.5rem;
}
header nav > div .lang.active .overlay {
  opacity: 1;
}
header nav > div .lang.active .lang-selected .flag {
  border-color: #fff;
}
header nav > div .lang.active .lang-selected .arrow {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
header nav > div .lang.active .drop-lang {
  opacity: 1;
  pointer-events: all;
  top: 60px;
}
header nav > div .lang .overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
header nav > div .lang .lang-selected {
  position: relative;
  z-index: 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
}
header nav > div .lang .lang-selected .flag {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border: 1.5px solid transparent;
  -webkit-transition: border-color 0.3s;
  -o-transition: border-color 0.3s;
  transition: border-color 0.3s;
}
header nav > div .lang .lang-selected .arrow {
  margin-left: 12px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  -o-transition: transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}
header nav > div .lang .drop-lang {
  position: absolute;
  z-index: 2;
  left: 5px;
  top: 55px;
  pointer-events: none;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
header nav > div .lang .drop-lang a {
  margin-bottom: 0.5rem;
}
header nav > div .lang .drop-lang a:last-child {
  margin-bottom: 0px;
}
</style>
