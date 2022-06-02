<template>
  <div class="form-group">
    <label for="">Data de nascimento</label>
    <div class="grid">
      <select v-model="birthDate.day" @change="setValidatedate()" :class="error">
        <option v-for="(day, index) in daysInternal" :value="day" :keys="index">
          {{ day }}
        </option>
      </select>
      <select v-model="birthDate.month" @change="setValidatedate()" :class="error">
        <option v-for="(month, index) in monthInternal" :value="month" :keys="index">
          {{ month }}
        </option>
      </select>
      <select v-model="birthDate.year" @change="setValidatedate()" :class="error">
        <option v-for="(year, index) in yearInterval" :value="year" :keys="index">
          {{ year }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  props: ['selected', 'error', 'userBirth'],
  data() {
    return {
      showSelect: false,
      getYear: false,
      yearInterval: [],
      monthInternal: [],
      daysInternal: [],
      birthDate: {
        year: null,
        month: null,
        day: null,
      },
    };
  },
  methods: {
    setBirth() {
      this.$emit(
        'setBirthDate',
        new Date(this.birthDate.year, this.birthDate.month - 1, this.birthDate.day).toISOString()
      );
    },
    getDateInterval() {
      const date = new Date();
      for (let index = date.getFullYear() - 14; index >= date.getFullYear() - 100; index--) {
        this.yearInterval.push(index);
      }
      for (let index = 1; index <= 12; index++) {
        this.monthInternal.push(index);
      }
      for (let index = 1; index <= 31; index++) {
        this.daysInternal.push(index);
      }
    },
    setValidatedate() {
      if (Object.keys(this.birthDate).filter((key) => this.birthDate[key] === null).length === 0) {
        let date = new Date(this.birthDate.year, this.birthDate.month, 0);
        this.birthDate.day =
          date.getDate() < this.birthDate.day ? date.getDate() : this.birthDate.day;
        this.birthDate.month = date.getMonth() + 1;
        this.setBirth();
      }
    },
  },
  mounted() {
    if (this.userBirth !== undefined) {
      this.birthDate.year = +this.userBirth[0];
      this.birthDate.month = +this.userBirth[1];
      this.birthDate.day = +this.userBirth[2];
    }
  },
  created() {
    this.getDateInterval();
  },
};
</script>
<style scope lang="scss">
ul li {
  cursor: pointer;
}
.grid {
  max-width: 370px;
  display: grid;
  grid-template-columns: calc(30% - 10px) calc(30% - 10px) 40%;
  gap: 10px;
}
@media (max-width: 450px) {
  .grid {
    grid-template-columns: 1fr 1fr 1.2fr;
  }
}
</style>
