<template>
  <div class="form-group">
    <label for="">País</label>
    <div class="select-custom" :class="showSelect ? 'active' : ''">
      <div class="item-selected js-select-custom" :class="error" @click="showSelect = !showSelect">
        <div>
          <img :src="countryIcon" alt="" />
          <span>{{ countryName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { countries } from '@/Utils/selectsValues';
export default {
  props: ['selected', 'error'],
  data() {
    return {
      showSelect: false,
      countries,
      countryName: null,
      countryIcon: '',
    };
  },
  methods: {
    setCountry(country) {
      this.countryName = country.label;
      this.countryIcon = country.icon;
      this.showSelect = false;
      this.$emit('selectCountry', country.value);
    },
  },
  mounted() {
    if (this.selected) {
      this.setCountry(this.selected[0]);
    }
  },
};
</script>
<style scope>
.select-custom {
  max-width: 100%;
}
ul li {
  cursor: pointer;
}
</style>
